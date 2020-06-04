import Camera from './Camera';
import { SVDAG } from './SVDAG'
import { loadProgram, loadVertShader, loadRaycastFragShader, loadNormalFragShader } from './ShaderUtils';

// Coupled to the glsl shader
const UNIFORMS = [
  'time', 'resolution',
  'viewMatInv', 'projMatInv',
  'sceneBBoxMin', 'sceneBBoxMax', 'sceneCenter', 'rootHalfSide',
  'maxIters', 'drawLevel', 'projectionFactor',
  'nodes',
  'viewerRenderMode',
  'selectedVoxelIndex', 'uniqueColors',
  'lightPos', 'enableShadows', 'normalEpsilon',
  'minDepthTex', 'useBeamOptimization',
] as const;
type Uniform = typeof UNIFORMS[number];

// Dict of uniform name to its ID
type UniformDict = {
  [T in Uniform]: WebGLUniformLocation;
}

export enum RenderMode {
  ITERATIONS = 0,
  DEPTH = 1,
  DIFFUSE_LIGHTING = 2,
  PATH_TRACING = 3,
}

/**
 * Path tracing todo:
 * - Separate shader define for path tracing
 * - Set up full depth framebuffer with normals (maybe screen space normals in second pass?)
 * - Generate random sample
 * - Reset screen frame buffer when camera transformation changes
 * 
 * Pseudocode:
 * renderPathTrace() {
 *  if (cameraOrientationChanged) {
 * 
 *    renderMinDepthTex();
 *    
 *    bindOffscreenFrameBuffer   
 * 
 *    clearDefaultFB();
 * 
 *    renderPrimary(); // full depth tex
 * 
 *    // render normals to texture based on screen space depth - basically dX and dY gradient (needs clipped tex coords)
 *    // Improvement: https://wickedengine.net/2019/09/22/improved-normal-reconstruction-from-depth/
 *    screenSpaceNormals(); 
 * 
 *  } else {
 *    renderPathTrace();
 *  }
 * }
 */

export interface IRendererState {
  renderMode: RenderMode;
  startTime: number;
  time: number;
  frame: number;
  pixelTolerance: number;
  renderScale: number;
  drawLevel: number;
  maxIterations: number;
  useBeamOptimization: boolean;
  showUniqueNodeColors: boolean;
}

export default class Renderer {
  gl: WebGL2RenderingContext;

  svdag: SVDAG;

  viewerProgram: WebGLProgram;
  viewerUniformDict: UniformDict;

  pathTraceProgram: WebGLProgram;
  pathTraceUniformDict: UniformDict;

  depthProgram: WebGLProgram;
  depthUniformDict: UniformDict;

  normalProgram: WebGLProgram;
  normalUniformDict: UniformDict;

  /** The 3D texture containing scene data */
  texture: WebGLTexture;

  maxT3DTexels: number;

  minDepthFBO: WebGLFramebuffer;
  minDepthTex: WebGLTexture;

  fullDepthFBO: WebGLFramebuffer;
  fullDepthTexId: WebGLTexture;

  normalFBO: WebGLFramebuffer;
  normalTexId: WebGLTexture;

  state: IRendererState = {
    startTime: new Date().getTime() / 1000,
    time: 0,
    frame: 0,
    pixelTolerance: 1,
    renderScale: 1,
    drawLevel: 1,
    maxIterations: 250,
    renderMode: RenderMode.ITERATIONS,
    useBeamOptimization: true,
    showUniqueNodeColors: false,
  };

  constructor(
    public camera: Camera,
    public canvas: HTMLCanvasElement,
  ) {
    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.maxT3DTexels = this.gl.getParameter(this.gl.MAX_3D_TEXTURE_SIZE);
  }

  public render() {
    const { gl, canvas, state, viewerUniformDict, depthUniformDict } = this;

    // Pre-render low res depth pass
    if (this.state.useBeamOptimization) {
      gl.useProgram(this.depthProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.minDepthFBO);
      // gl.bindTexture(gl.TEXTURE_3D, this.texture);
      gl.activeTexture(gl.TEXTURE1);
      
      this.setInitialUniforms(depthUniformDict);

      const width = Math.ceil(canvas.width / 8);
      const height = Math.ceil(canvas.height / 8);
      
      gl.viewport(0, 0, width, height);
      gl.uniform2f(depthUniformDict.resolution, width, height);
      gl.uniform1i(depthUniformDict.useBeamOptimization, 0);
      gl.uniform1f(depthUniformDict.projectionFactor, this.getProjectionFactor(1, 8));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Restore normal viewer program
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(this.viewerProgram);
      gl.bindTexture(gl.TEXTURE_2D, this.minDepthTex);
    }
    
    // TODO: Only update uniforms when they change, not all of them every time
    this.setInitialUniforms(viewerUniformDict);

    // Render 
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    state.frame++;

    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  initScene(svdag: SVDAG) {
    this.svdag = svdag;
  }

  async initShaders() {
    const { gl, svdag } = this;
    const vertShader = loadVertShader(gl); // single triangle filling up the screen
    const viewerFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'viewer');
    const pathTraceFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'pathtracing');
    const depthFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'depth');
    const normalFragShader = await loadNormalFragShader(gl);

    this.viewerProgram = await loadProgram(gl, vertShader, viewerFragShader);
    this.pathTraceProgram = await loadProgram(gl, vertShader, pathTraceFragShader);
    this.depthProgram = await loadProgram(gl, vertShader, depthFragShader);
    this.normalProgram = await loadProgram(gl, vertShader, normalFragShader);
    
    gl.useProgram(this.viewerProgram);

  }

  // TODO: Generic function for creating FBO and texture; needed for minDepth, fullDepth and normal tex
  setupMinDepthFbo() {
    const { gl, canvas } = this;

    // Set up min depth fbo
    const BEAM_SIZE = 8;
    this.minDepthFBO = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.minDepthFBO);

    const colorExt: WEBGL_color_buffer_float = gl.getExtension('EXT_color_buffer_float');
    if (!colorExt) {
      console.error('The the EXT_color_buffer_float is not available - not setting up beam optimization');
      (window as any).setUseBeamOptimization(false, true); // TODO: Proper UI controller
      return;
    }

    gl.activeTexture(gl.TEXTURE1);
    this.minDepthTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.minDepthTex);
    const width = Math.ceil(canvas.width / BEAM_SIZE);
    const height = Math.ceil(canvas.height / BEAM_SIZE);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, width, height, 0, gl.RGBA, gl.FLOAT, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.minDepthTex, 0);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

    const fboStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (fboStatus !== gl.FRAMEBUFFER_COMPLETE) console.error('FBO error', fboStatus)

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  //////////////////////////////////////////////////////////////
  ////////////////////////// UNIFORMS //////////////////////////
  //////////////////////////////////////////////////////////////
  initUniforms() {
    const { gl } = this;
    this.viewerUniformDict = {} as any;
    this.depthUniformDict = {} as any;
    UNIFORMS.forEach(u => this.viewerUniformDict[u] = gl.getUniformLocation(this.viewerProgram, u));
    UNIFORMS.forEach(u => this.depthUniformDict[u] = gl.getUniformLocation(this.depthProgram, u));
  }

  getProjectionFactor(pixelTolerance: number, screenDivisor: number) {
    const { canvas, camera } = this;
    const inv_2tan_half_fovy = 1.0 / (2.0 * Math.tan(0.5 * camera.fovY));
    const screen_tolerance = pixelTolerance / (canvas.height / screenDivisor);
    return inv_2tan_half_fovy / screen_tolerance;
  }

  setInitialUniforms(ud: UniformDict) {
    const { canvas, gl, camera, svdag, state } = this;

    gl.uniform2f(ud.resolution, canvas.width, canvas.height);

    gl.uniform1i(ud.nodes, 0);

    gl.uniform3fv(ud.sceneBBoxMin, svdag.bboxStart);
    gl.uniform3fv(ud.sceneBBoxMax, svdag.bboxEnd);
    gl.uniform3fv(ud.sceneCenter, svdag.bboxCenter);
    gl.uniform1f(ud.rootHalfSide, svdag.rootSide / 2.0);

    // TODO: Make light pos configurable, currently always bboxEnd
    gl.uniform3fv(ud.lightPos, svdag.bboxEnd);

    gl.uniform1ui(ud.maxIters, state.maxIterations);
    gl.uniform1ui(ud.drawLevel, state.drawLevel);
    gl.uniform1f(ud.projectionFactor, this.getProjectionFactor(state.pixelTolerance, 1));

    gl.uniform1i(ud.uniqueColors, state.showUniqueNodeColors ? 1 : 0);

    gl.uniform1i(ud.viewerRenderMode, state.renderMode);

    gl.uniformMatrix4fv(ud.viewMatInv, false, camera.viewMatInv);
    gl.uniformMatrix4fv(ud.projMatInv, false, camera.projMatInv);

    // Todo: make this a vec4 like shadertoy
    gl.uniform1f(ud.time, new Date().getTime() / 1000 - state.startTime);

    gl.uniform1i(ud.useBeamOptimization, state.useBeamOptimization ? 1 : 0);
    gl.uniform1i(ud.minDepthTex, 1);
  }

  // setFrameUniforms() {

  // }


  //////////////////////////////////////////////////////////////
  ////////////////////// 3D TEXTURE DATA ///////////////////////
  //////////////////////////////////////////////////////////////
  createNodesTexture() {
    const { gl } = this;
    this.texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    
    // gl.useProgram(this.viewerProgram);
    gl.bindTexture(gl.TEXTURE_3D, this.texture);

    // gl.useProgram(this.depthProgram);
    // gl.bindTexture(gl.TEXTURE_3D, this.texture);
    
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);
  }

  deleteNodesTexture() {
    if (this.texture !== undefined) {
      this.gl.deleteTexture(this.texture);
    }
  }

  /**
 * Updates the 3D texture with only the nodes that have been loaded since the last texture update
 */
  uploadTexData(nNewNodes: number) {
    const { gl, svdag, maxT3DTexels } = this;
    const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;
    const neededTexels = svdag.nodes.length;
    const depthLayers = Math.ceil(neededTexels / maxT3DTexelsPow2);
    const nTexelsToAllocate = maxT3DTexelsPow2 * depthLayers;

    const chunkStart = svdag.dataLoadedOffset / 4 - nNewNodes;
    console.log(chunkStart, svdag.dataLoadedOffset / 4, nNewNodes);

    gl.activeTexture(gl.TEXTURE0);

    if (chunkStart === 0) {
      // For the first chunk, define the texture type and upload what data we have 
      console.log(`Initial uploading of nodes to 3D texture (Resolution: ${maxT3DTexels} x ${maxT3DTexels} x ${depthLayers}, nNodes: ${svdag.dataLoadedOffset}/${svdag.nodes.length})...`);

      // Pad the data to fit the 3D texture dimensions (not required but makes it a bit easier)
      if (svdag.nodes.length != nTexelsToAllocate) {
        console.log('Resizing node buffer from ', svdag.nodes.length, 'to', nTexelsToAllocate, '(3D Texture padding)');
        const paddedNodes = new Uint32Array(nTexelsToAllocate);
        paddedNodes.set(svdag.nodes);
        svdag.nodes = paddedNodes;
      }

      // Every "pixel" in the 3D texture will be used as a 32 bit int, so we set the type to a single 32 bit red pixel (R32UI)
      gl.texStorage3D(gl.TEXTURE_3D, 1, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers);
      // For the initial load, we'll load all of the data
      gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, maxT3DTexels, maxT3DTexels, depthLayers, gl.RED_INTEGER, gl.UNSIGNED_INT, svdag.nodes);

      // gl.texImage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers, 0, gl.RED_INTEGER, gl.UNSIGNED_INT, svdag.nodes);
    } else {
      // For following chunks of data, upload one or more Z slices of the 3D texture
      // TODO: Also take into account the yOffset - may need two texSubImage3D calls
      const xOffset = 0;
      const yOffset = 0; // Math.floor(chunkStart / maxT3DTexels) % maxT3DTexels;
      const zOffset = Math.floor(chunkStart / maxT3DTexelsPow2);

      const chunkStartZ = zOffset;
      const chunkEndZ = Math.floor((svdag.dataLoadedOffset / 4) / maxT3DTexelsPow2);

      const updateWidth = maxT3DTexels;
      const updateHeight = maxT3DTexels; // Math.ceil(svdag.dataLoadedOffset / maxT3DTexels) % maxT3DTexels - yOffset;
      const updateDepth = (chunkEndZ - chunkStartZ) + 1;

      const newNodes = svdag.nodes.slice(
        yOffset * maxT3DTexels + chunkStartZ * maxT3DTexelsPow2,
        maxT3DTexels + updateHeight * maxT3DTexels + chunkEndZ * maxT3DTexelsPow2,
      );

      const progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
      console.log(`Uploading data to 3D texture (${svdag.dataLoadedOffset / 4}/${svdag.originalNodeLength} [${progressPct}%])...`);
      console.log('#layers', depthLayers, 'start', zOffset, 'chunkStart', chunkStart, 'newNodes', nNewNodes, 'end', chunkEndZ, 'depth', updateDepth)
      gl.texSubImage3D(gl.TEXTURE_3D, 0, xOffset, yOffset, zOffset, updateWidth, updateHeight, updateDepth, gl.RED_INTEGER, gl.UNSIGNED_INT, newNodes);
    }
  }
}