import Camera from './Camera';
import { SVDAG } from './SVDAG'
import { loadProgram } from './ShaderUtils';

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

export interface IRendererState {
  renderMode: RenderMode;
  startTime: number;
  time: number;
  frame: number;
  pixelTolerance: number;
  renderScale: number;
  drawLevel: number;
  maxIterations: number;
  useMinDepthOptimization: boolean;
  showUniqueNodeColors: boolean;
}

export default class Renderer {
  gl: WebGL2RenderingContext;
  uniformDict: UniformDict;
  svdag: SVDAG;

  program: WebGLProgram;
  fragShader: WebGLShader;
  texture: WebGLTexture;
  // controller: OrbitController;

  maxT3DTexels: number;

  minDepthTexId?: number;
  fullDepthTexId?: number;

  state: IRendererState = {
    startTime: new Date().getTime() / 1000,
    time: 0,
    frame: 0,
    pixelTolerance: 1,
    renderScale: 1,
    drawLevel: 1,
    maxIterations: 250,
    renderMode: RenderMode.ITERATIONS,
    useMinDepthOptimization: true,
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
    const { gl, canvas, state } = this;

    // TODO: Only update uniforms when they change, not all of them every time
    this.setInitialUniforms();

    // Render 
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    state.frame++;
  }

  initScene(svdag: SVDAG) {
    this.svdag = svdag;
  }

  async initShaders() {
    const { gl, svdag } = this;
    [this.program, this.fragShader] = await loadProgram(gl, svdag.nLevels);
  }

  //////////////////////////////////////////////////////////////
  ////////////////////////// UNIFORMS //////////////////////////
  //////////////////////////////////////////////////////////////
  initUniforms() {
    const { gl } = this;
    this.uniformDict = {} as any;
    UNIFORMS.forEach(u => this.uniformDict[u] = gl.getUniformLocation(this.program, u));
  }

  getProjectionFactor(pixelTolerance: number, screenDivisor: number) {
    const { canvas, camera } = this;
    const inv_2tan_half_fovy = 1.0 / (2.0 * Math.tan(0.5 * camera.fovY));
    const screen_tolerance = pixelTolerance / (canvas.height / screenDivisor);
    return inv_2tan_half_fovy / screen_tolerance;
  }

  setInitialUniforms() {
    const { canvas, gl, camera, uniformDict: ud, svdag, state } = this;
    if (this.program === undefined) return;

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