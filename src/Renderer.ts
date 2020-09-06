import Camera from './Camera';
import { SVDAG } from './SVDAG'
import { loadProgram, loadVertShader, loadRaycastFragShader, loadNormalFragShader, loadTextureFragShader } from './ShaderUtils';
import { mat4, vec3 } from 'gl-matrix';

// Coupled to the glsl shader
const UNIFORMS = [
  'time', 'resolution',
  'viewMatInv', 'projMatInv', 'camMatInv', 'prevCamMat',
  'sceneBBoxMin', 'sceneBBoxMax', 'sceneCenter', 'rootHalfSide',
  'maxIters', 'drawLevel', 'projectionFactor',
  'nodes',
  'viewerRenderMode',
  'selectedVoxelIndex', 'uniqueColors',
  'lightPos', 'enableShadows', 'normalEpsilon',
  'minDepthTex', 'useBeamOptimization',
  'depthTex', 'hitNormTex',
  'ptFrame', 'prevFrameTex', 'nPathTraceBounces', 'depthOfField'
] as const;
type Uniform = typeof UNIFORMS[number];

const NORMAL_UNIFORMS = ['depthTex', 'viewProjMatInv'] as const;
type NormalUniform = typeof NORMAL_UNIFORMS[number];

const TEX_UNIFORMS = ['tex'] as const;
type TexUniform = typeof TEX_UNIFORMS[number];

// Dict of uniform name to its ID
type UniformDict<U extends string> = {
  [T in U]: WebGLUniformLocation;
}

type ViewUniformDict = UniformDict<Uniform>;
type NormalUniformDict = UniformDict<NormalUniform>;
type TexUniformDict = UniformDict<TexUniform>;

export enum RenderMode {
  ITERATIONS = 0,
  DEPTH = 1,
  DIFFUSE_LIGHTING = 2,
  PATH_TRACING = 3,
  NORMAL = 4,
}

export const MAX_PATH_TRACE_SAMPLES = 64;

export interface IRendererState {
  renderMode: RenderMode;
  startTime: number;
  time: number;
  frame: number;
  cameraUpdateFrame: number;
  pixelTolerance: number;
  renderScale: number;
  drawLevel: number;
  maxIterations: number;
  useBeamOptimization: boolean;
  showUniqueNodeColors: boolean;
  nPathTraceBounces: number;
  depthOfField: number;
  selectedVoxelIndex: number;
  lightPos: vec3;
}

export default class Renderer {
  gl: WebGL2RenderingContext;

  svdag: SVDAG;

  viewerProgram: WebGLProgram;
  viewerUniformDict: ViewUniformDict;

  pathTraceProgram: WebGLProgram;
  pathTraceUniformDict: ViewUniformDict;

  depthProgram: WebGLProgram;
  depthUniformDict: ViewUniformDict;

  normalProgram: WebGLProgram;
  normalUniformDict: NormalUniformDict;

  texProgram: WebGLProgram; // render texture to screen (for path trace result)
  texUniformDict: TexUniformDict;

  /** The 3D texture containing scene data */
  texture: WebGLTexture;

  maxT3DTexels: number;

  minDepthFBO: WebGLFramebuffer;
  minDepthTex: WebGLTexture;

  fullDepthFBO: WebGLFramebuffer;
  fullDepthTex: WebGLTexture;

  normalFBO: WebGLFramebuffer;
  normalTex: WebGLTexture;

  // Two tex FBOs are needed for path tracing to average the color of one frame and the previous one
  // since you cannot read and write to the same texture, they're swapped after every path trace render
  ptFBO1: WebGLFramebuffer;
  ptTex1: WebGLTexture;
  ptFBO2: WebGLFramebuffer;
  ptTex2: WebGLTexture;

  state: IRendererState = {
    startTime: new Date().getTime() / 1000,
    time: 0,
    frame: 0,
    cameraUpdateFrame: 0,
    pixelTolerance: 1,
    renderScale: 1,
    drawLevel: 1,
    maxIterations: 250,
    renderMode: RenderMode.NORMAL,
    useBeamOptimization: true,
    showUniqueNodeColors: false,
    nPathTraceBounces: 1,
    depthOfField: 0,
    selectedVoxelIndex: -1,
    lightPos: vec3.create(),
  };

  constructor(
    public camera: Camera,
    public canvas: HTMLCanvasElement,
  ) {
    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.maxT3DTexels = this.gl.getParameter(this.gl.MAX_3D_TEXTURE_SIZE);
  }

  /**
   * Set up FBOs and textures (depth, normal, etc.)
   */
  initialize() {
    const { gl, canvas } = this;

    const BEAM_SIZE = 8;
    const minDepthW = Math.ceil(canvas.width / BEAM_SIZE), minDepthH = Math.ceil(canvas.height / BEAM_SIZE);

    [this.minDepthFBO, this.minDepthTex] = this.setupTexFBO(gl.TEXTURE1, { width: minDepthW, height: minDepthH });
    [this.fullDepthFBO, this.fullDepthTex] = this.setupTexFBO(gl.TEXTURE2);
    [this.normalFBO, this.normalTex] = this.setupTexFBO(gl.TEXTURE3, { internalFormat: gl.RGB8, format: gl.RGB, type: gl.UNSIGNED_BYTE });

    [this.ptFBO1, this.ptTex1] = this.setupTexFBO(gl.TEXTURE4, { internalFormat: gl.RGBA32F, format: gl.RGBA, type: gl.FLOAT });
    [this.ptFBO2, this.ptTex2] = this.setupTexFBO(gl.TEXTURE5, { internalFormat: gl.RGBA32F, format: gl.RGBA, type: gl.FLOAT });
  }

  /**
   * Swaps the front and back buffers for path tracing
   * @returns Which texture to render to the screen: [texture number, texture slot]
   */
  prepPathTraceRender() {
    const { gl, state: { frame } } = this;
    if (frame % 2 === 0) { // if frame number is even, read from buffer tex 2 and render to tex 1
      gl.uniform1i(this.pathTraceUniformDict.prevFrameTex, 5);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.ptFBO1);

      gl.activeTexture(gl.TEXTURE4);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.activeTexture(gl.TEXTURE5);
      gl.bindTexture(gl.TEXTURE_2D, this.ptTex2);
      return { uniform: 4, slot: gl.TEXTURE4, texture: this.ptTex1 };
    } else { // if frame number is even, read from buffer tex 1 and render to tex 2
      gl.uniform1i(this.pathTraceUniformDict.prevFrameTex, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.ptFBO2);

      gl.activeTexture(gl.TEXTURE4);
      gl.bindTexture(gl.TEXTURE_2D, this.ptTex1);
      gl.activeTexture(gl.TEXTURE5);
      gl.bindTexture(gl.TEXTURE_2D, null);
      return { uniform: 5, slot: gl.TEXTURE5, texture: this.ptTex2 };
    }
  }

  public render() {
    const { gl, canvas, state, viewerUniformDict, depthUniformDict, normalUniformDict, texUniformDict } = this;

    // Pre-render low res depth pass
    if (this.state.useBeamOptimization &&
      !(state.renderMode === RenderMode.PATH_TRACING && state.frame > state.cameraUpdateFrame)) { // no need for beam opt after first path trace frame
      // Min-depth pass
      gl.useProgram(this.depthProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.minDepthFBO);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, null);
      
      const width = Math.ceil(canvas.width / 8); // beams of 8x8 pixels
      const height = Math.ceil(canvas.height / 8);
      
      this.setInitialUniforms(depthUniformDict);
      // Some custom uniforms for rendering min depth texture
      gl.uniform2f(depthUniformDict.resolution, width, height);
      gl.uniform1i(depthUniformDict.useBeamOptimization, 0);
      gl.uniform1f(depthUniformDict.projectionFactor, this.getProjectionFactor(1, 8));
      
      // Render to min depth tex
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Enable min depth tex for use
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.minDepthTex);
    }

    // For normal rendering, render a full-depth texture
    if (state.renderMode === RenderMode.NORMAL) {
      // Full-depth pass
      gl.useProgram(this.depthProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fullDepthFBO);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, null);

      this.setInitialUniforms(depthUniformDict);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, this.fullDepthTex);

      ////////////

      // Normal pass
      gl.useProgram(this.normalProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.normalFBO);

      // Enable full-depth tex and disable norm tex
      gl.activeTexture(gl.TEXTURE3);
      gl.bindTexture(gl.TEXTURE_2D, null);

      this.setNormalUniforms(normalUniformDict);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.activeTexture(gl.TEXTURE3);
      gl.bindTexture(gl.TEXTURE_2D, this.normalTex);
    }

    // console.log(state.frame, state.cameraUpdateFrame);

    if (state.renderMode === RenderMode.PATH_TRACING) {
      if (state.frame > state.cameraUpdateFrame + MAX_PATH_TRACE_SAMPLES) return; // more than 256 samples doesn't improve the image

      // Swap the front and back buffer, and bind the correct frame buffer
      gl.useProgram(this.pathTraceProgram);
      const { uniform, slot, texture } = this.prepPathTraceRender();

      // if (state.pathTraceFrame === 0) {
      //   // Initial render for path tracing:
      //   // TODO: Render hitPosTex and hitNormTex for primary visibility rays

      //   // Initial frame could just be diffuse lighting, to get the base colors in there and quick feedback when moving around
      //   // Use the viewer program for rendering to the screen
      //   gl.useProgram(this.viewerProgram);
        
      //   // TODO: Only update uniforms when they change, not all of them every time
      //   this.setInitialUniforms(viewerUniformDict);
        
      //   gl.uniform1i(this.viewerUniformDict.viewerRenderMode, RenderMode.DIFFUSE_LIGHTING);

      //   // Render 
      //   gl.viewport(0, 0, canvas.width, canvas.height);
      //   gl.clearColor(0, 0, 0, 1);
      //   gl.clear(gl.COLOR_BUFFER_BIT);
      //   gl.drawArrays(gl.TRIANGLES, 0, 3);
      // } else {
        // Subsequent frames render light bounces:

        // Idea: Since you cannot read and write to the same texture,
        // two textures are needed and we need to swap between them every frame
        // and then render the latest one to the screen with ANOTHER full-screen quad shader

        // Use the viewer program for rendering to the screen
        gl.useProgram(this.pathTraceProgram);
        
        // TODO: Only update uniforms when they change, not all of them every time
        this.setInitialUniforms(this.pathTraceUniformDict);

        // Render path trace program
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      // }

      // Render to screen as well:
      // Reset frame buffer so we can render to the screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      gl.activeTexture(slot);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.useProgram(this.texProgram);
      gl.uniform1i(texUniformDict.tex, uniform);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {

      
      // Reset frame buffer so we can render to the screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    // Use the viewer program for rendering to the screen
    gl.useProgram(this.viewerProgram);
    
    // TODO: Only update uniforms when they change, not all of them every time
    this.setInitialUniforms(viewerUniformDict);
    
    // Render 
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  
  state.frame++;
}
  
  initScene(svdag: SVDAG) {
    this.svdag = svdag;
    vec3.copy(this.state.lightPos, svdag.bboxEnd);
  }

  async initShaders() {
    const { gl, svdag } = this;
    const vertShader = loadVertShader(gl); // single triangle filling up the screen
    const viewerFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'viewer');
    const depthFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'depth');
    const normalFragShader = await loadNormalFragShader(gl);
    const pathTraceFragShader = await loadRaycastFragShader(gl, svdag.nLevels, 'pathtracing');
    const texFragShader = loadTextureFragShader(gl);

    this.viewerProgram = loadProgram(gl, vertShader, viewerFragShader);
    this.depthProgram = loadProgram(gl, vertShader, depthFragShader);
    this.normalProgram = loadProgram(gl, vertShader, normalFragShader);

    this.pathTraceProgram = loadProgram(gl, vertShader, pathTraceFragShader);
    this.texProgram = loadProgram(gl, vertShader, texFragShader);
    
    gl.useProgram(this.viewerProgram);
  }

  /**
   * 
   * @param texNum Which texture slot to use (gl.TEXTURE0/1/2/3...)
   * @param opts Texture config, default variables are for screen space texture
   */
  setupTexFBO(
    texNum = this.gl.TEXTURE0,
    {
      internalFormat = this.gl.RGBA32F,
      format = this.gl.RGBA,
      type = this.gl.FLOAT,
      width = this.canvas.width,
      height = this.canvas.height,
      magFilter = this.gl.NEAREST,
      minFilter = this.gl.NEAREST,
      wrapS = this.gl.CLAMP_TO_EDGE,
      wrapT = this.gl.CLAMP_TO_EDGE,
    } = {}) {
    const { gl } = this;

    const fbo = gl.createFramebuffer();
    const tex = gl.createTexture();

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    
    gl.activeTexture(texNum);
    gl.bindTexture(gl.TEXTURE_2D, tex);

    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0]);

    const fboStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (fboStatus !== gl.FRAMEBUFFER_COMPLETE) console.error('FBO error', fboStatus);

    return [fbo, tex];
  }

  //////////////////////////////////////////////////////////////
  ////////////////////////// UNIFORMS //////////////////////////
  //////////////////////////////////////////////////////////////
  initUniforms() {
    const { gl } = this;
    this.viewerUniformDict = {} as any;
    this.depthUniformDict = {} as any;
    this.normalUniformDict = {} as any;
    this.pathTraceUniformDict = {} as any;
    this.texUniformDict = {} as any;
    UNIFORMS.forEach(u => this.viewerUniformDict[u] = gl.getUniformLocation(this.viewerProgram, u));
    UNIFORMS.forEach(u => this.depthUniformDict[u] = gl.getUniformLocation(this.depthProgram, u));
    NORMAL_UNIFORMS.forEach(u => this.normalUniformDict[u] = gl.getUniformLocation(this.normalProgram, u));
    UNIFORMS.forEach(u => this.pathTraceUniformDict[u] = gl.getUniformLocation(this.pathTraceProgram, u));
    TEX_UNIFORMS.forEach(u => this.texUniformDict[u] = gl.getUniformLocation(this.texProgram, u));
  }

  getProjectionFactor(pixelTolerance: number, screenDivisor: number) {
    const { canvas, camera } = this;
    const inv_2tan_half_fovy = 1.0 / (2.0 * Math.tan(0.5 * camera.fovY));
    const screen_tolerance = pixelTolerance / (canvas.height / screenDivisor);
    return inv_2tan_half_fovy / screen_tolerance;
  }

  setInitialUniforms(ud: ViewUniformDict) {
    const { canvas, gl, camera, svdag, state } = this;

    gl.uniform2f(ud.resolution, canvas.width, canvas.height);

    gl.uniform1i(ud.nodes, 0);

    gl.uniform3fv(ud.sceneBBoxMin, svdag.bboxStart);
    gl.uniform3fv(ud.sceneBBoxMax, svdag.bboxEnd);
    gl.uniform3fv(ud.sceneCenter, svdag.bboxCenter);
    gl.uniform1f(ud.rootHalfSide, svdag.rootSide / 2.0);

    // TODO: Make light pos configurable, currently always bboxEnd
    gl.uniform3fv(ud.lightPos, state.lightPos);

    gl.uniform1ui(ud.maxIters, state.maxIterations);
    gl.uniform1ui(ud.drawLevel, state.drawLevel);
    gl.uniform1f(ud.projectionFactor, this.getProjectionFactor(state.pixelTolerance, 1));

    gl.uniform1i(ud.uniqueColors, state.showUniqueNodeColors ? 1 : 0);

    gl.uniform1i(ud.viewerRenderMode, state.renderMode);

    // gl.uniformMatrix4fv(ud.viewMatInv, false, camera.viewMatInv);
    // gl.uniformMatrix4fv(ud.projMatInv, false, camera.projMatInv);

    // Set the previous camera matrix (for reprojection), update the current mat on the cam, and set in the shader
    // mat4.invert(camera.prevCamMat, camera.camMatInv);
    gl.uniformMatrix4fv(ud.camMatInv, false, camera.camMatInv);
    gl.uniformMatrix4fv(ud.prevCamMat, false, camera.prevCamMat);

    // Double checking re-projection math. It checks out. SO WHY DOESN'T IT WORK!!?!
    // const p = vec4.fromValues(2, 4, 0, 1);
    // const projectedP = vec4.transformMat4(vec4.create(), p, camera.camMatInv);
    // const reprojectedP = mat4.multiply(mat4.create(), mat4.fromValues(
    //   projectedP[0], projectedP[1], projectedP[2], projectedP[3],
    //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), camera.prevCamMat);
    // console.log({ p, projectedP, reprojectedP } );
    // Trying again with THREE math: really checks out
    // const p = new Vector4(2, 4, 0, 1);
    // const camMatInv = new Matrix4().fromArray(this.camera.camMatInv);
    // const prevCamMat = new Matrix4().fromArray(this.camera.prevCamMat);
    // const projectedP = p.applyMatrix4(camMatInv);
    // const projectedPT = new Matrix4().fromArray([...projectedP.toArray(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // const reprojectedP = new Matrix4().multiplyMatrices(prevCamMat, projectedPT);
    // console.log({ p, projectedP, reprojectedP });

    // Todo: make this a vec4 like shadertoy
    gl.uniform1f(ud.time, new Date().getTime() / 1000 - state.startTime);
    gl.uniform1ui(ud.ptFrame, state.frame);

    gl.uniform1i(ud.nPathTraceBounces, state.nPathTraceBounces);
    gl.uniform1f(ud.depthOfField, state.depthOfField);

    gl.uniform1i(ud.useBeamOptimization, state.useBeamOptimization ? 1 : 0);
    gl.uniform1i(ud.minDepthTex, 1);
    gl.uniform1i(ud.depthTex, 2);
    gl.uniform1i(ud.hitNormTex, 3);
  }

  setNormalUniforms(ud: NormalUniformDict) {
    const { gl, camera } = this;
    
    gl.uniformMatrix4fv(ud.viewProjMatInv, false, camera.projMatInv);
    gl.uniform1i(ud.depthTex, 2);
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
    gl.bindTexture(gl.TEXTURE_3D, this.texture);
    
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
