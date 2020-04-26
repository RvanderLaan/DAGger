import { SVDAG, Camera, OrbitController } from "./SVDAG";
import { vec3 } from "gl-matrix";

interface IRendererState {
  startTime: number;
  time: number;
  frame: number;
  pixelTolerance: number,
  renderScale: number,
  drawLevel: number,
  maxIterations: number,
  scenePath: string,
}

const state: IRendererState = {
  startTime: new Date().getTime() / 1000,
  time: 0,
  frame: 0,
  pixelTolerance: 1,
  renderScale: 1,
  drawLevel: 1,
  maxIterations: 250,
  scenePath: 'examples/sponza_11.svdag',
};

let canvas: HTMLCanvasElement;
let gl: WebGL2RenderingContext;
let program: WebGLProgram;
let texture: WebGLTexture;
let controller: OrbitController;
let scene: SVDAG;
let maxT3DTexels: number;

const camera = new Camera();

function setRenderScale(num: number) {
  state.renderScale = num;
  canvas.width  = window.innerWidth * state.renderScale;
  canvas.height = window.innerHeight * state.renderScale;
  canvas.style.transform = `translate(-50%, -50%) scale(${1/state.renderScale})`
}
(window as any).setRenderScale = setRenderScale.bind(this);

function setDrawLevel(num: number) {
  state.drawLevel = Math.max(1, Math.min(num, scene.nLevels));
}
(window as any).setDrawLevel = setDrawLevel.bind(this);

function setMaxIterations(num: number) {
  state.maxIterations = Math.max(0, Math.min(num, 1000));
}
(window as any).setMaxIterations = setMaxIterations.bind(this);

async function init() {
  canvas = document.querySelector("#glCanvas");
  gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
  setRenderScale(state.renderScale);

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  console.log(gl.getParameter(gl.VERSION), gl.getParameter(gl.SHADING_LANGUAGE_VERSION), gl.getParameter(gl.VENDOR));
  // console.log(gl.getSupportedExtensions());
  maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  texture = await createTexture(gl, scene);
  scene = await loadScene();

  setDrawLevel(scene.nLevels);

  program = await loadProgram(gl, scene.nLevels);

  gl.enable(gl.DEPTH_TEST);


  camera.position.set(scene.bboxStart);
  camera.target.set(scene.bboxCenter);
  camera.updateMatrices();

  setInitialUniforms();

  controller = new OrbitController(camera, vec3.distance(scene.bboxStart, scene.bboxEnd) * 0.1);

  window.addEventListener('keydown', controller.onKeyDown.bind(controller));
  window.addEventListener('keyup', controller.onKeyUp.bind(controller));

  // Start render loop
  requestAnimationFrame(render);
}

function loadVertShader(gl: WebGL2RenderingContext) {
  // // https://www.saschawillems.de/blog/2016/08/13/vulkan-tutorial-on-rendering-a-fullscreen-quad-without-buffers/
  const vertSrc = `#version 300 es
    uniform float time;
    void main(void) {
      vec2 outUV = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
      outUV = outUV * 2.0f - 1.0f;
      // gl_Position = vec4(outUV * (1.0 / time) + vec2(cos(time * time), sin(time * time)), 0.0f, 1.0f);
      gl_Position = vec4(outUV, 0.0f, 1.0f);
    }
  `;
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertSrc);
  gl.compileShader(vertShader);
  console.log('Vert shader: ', gl.getShaderInfoLog(vertShader) || 'OK');
  return vertShader;
}

async function loadFragShader(gl: WebGL2RenderingContext, nLevels: number) {
  const maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
  const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;

  const shaderSrcRes = await fetch('raycast.glsl');
  let shaderSrc = await shaderSrcRes.text();

  const defines = `#version 300 es
#define INNER_LEVELS ${nLevels - 1}u
#define TEX3D_SIZE ${maxT3DTexels}
#define TEX3D_SIZE_POW2 ${maxT3DTexelsPow2}
`;

  // Replace the first few lines from shaderSrc with defines
  shaderSrc = defines + '\n' + shaderSrc.split('\n').splice(defines.split('\n').length).join('\n');

  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, shaderSrc);
  gl.compileShader(shader);
  console.log('Raycast shader: ', gl.getShaderInfoLog(shader) || 'OK');
  return shader;
}

async function loadProgram(gl: WebGL2RenderingContext, nLevels: number) {  
  // Setup shaders
  const vertShader = loadVertShader(gl);
  const fragShader = await loadFragShader(gl, nLevels);

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)
    || !gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    throw new Error('Shader compilation failure');
  }

  program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  // gl.validateProgram(program);
  // More descriptive error is given without validateProgram o.o

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw 'Could not compile WebGL program. \n\n' + gl.getProgramInfoLog(program);
  }

  gl.useProgram(program);

  return program;
}

async function loadScene() {

  const svdag = new SVDAG();
  await loadSceneStream(svdag);

  // const response = await fetch(state.scenePath);
  // svdag.load(await response.arrayBuffer());
  // svdag.nodesLoadedOffset = svdag.nNodes;
  // uploadTexData(svdag, svdag.nNodes);

  console.log(`Levels: ${svdag.nLevels}, nodes: ${svdag.nNodes}`);
  console.log(`Bbox:\n\t[${svdag.bboxStart}]\n\t[${svdag.bboxEnd}]\n\t(center: [${svdag.bboxCenter}])`);

  return svdag;
}

async function loadSceneStream(svdag: SVDAG) {
  const response = await fetch(state.scenePath);
  const reader = response.body.getReader();

  // Load header before continuing
  const { done, value } = await reader.read();
  svdag.loadChunk(value);
  
  // console.log(`Levels: ${svdag.nLevels}, nodes: ${svdag.nodes.length}`);
  // console.log(`Bbox:\n\t[${svdag.bboxStart}]\n\t[${svdag.bboxEnd}]\n\t(center: [${svdag.bboxCenter}])`);

  const loadNodesPromise = new Promise(async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      console.log(`Received ${value.byteLength} bytes`);

      // Load in SVDAG in RAM
      svdag.loadChunk(value);
  
      // Upload to GPU
      uploadTexData(svdag, value.byteLength / 4);
      
      // gl.texImage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers, 0, gl.RED_INTEGER, gl.UNSIGNED_INT, textureData);
      // gl.texSubImage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers, 0, gl.RED_INTEGER, gl.UNSIGNED_INT, textureData);

    }
  });

  loadNodesPromise.then(() => console.log('Finished loading!'));
}

function getProjectionFactor(pixelTolerance: number, screenDivisor: number) {
	const inv_2tan_half_fovy = 1.0 / (2.0 * Math.tan(0.5 * camera.fovY));
	const screen_tolerance = pixelTolerance / (canvas.height/ screenDivisor);
	return inv_2tan_half_fovy / screen_tolerance;
}

async function setInitialUniforms() {
  const uResolutionLoc = gl.getUniformLocation(program, 'resolution');
  gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);

  const uNodes = gl.getUniformLocation(program, 'nodes');
  gl.uniform1i(uNodes, 0);

  const uSceneBBoxMin = gl.getUniformLocation(program, 'sceneBBoxMin');
  gl.uniform3fv(uSceneBBoxMin, scene.bboxStart);
  const uSceneBBoxMax = gl.getUniformLocation(program, 'sceneBBoxMax');
  gl.uniform3fv(uSceneBBoxMax, scene.bboxEnd);
  const uSceneCenter = gl.getUniformLocation(program, 'sceneCenter');
  gl.uniform3fv(uSceneCenter, scene.bboxCenter);
  const uRootHalfSide = gl.getUniformLocation(program, 'rootHalfSide');
  gl.uniform1f(uRootHalfSide, scene.rootSide / 2); // todo: divide by 1 << (drawLevel + 1)

  const uMaxIters = gl.getUniformLocation(program, 'maxIters');
  gl.uniform1ui(uMaxIters, state.maxIterations);
  const uDrawLevel = gl.getUniformLocation(program, 'drawLevel');
  gl.uniform1ui(uDrawLevel, state.drawLevel);
  const uProjectionFactor = gl.getUniformLocation(program, 'projectionFactor');
  gl.uniform1f(uProjectionFactor, getProjectionFactor(state.pixelTolerance, 1));

  const uViewMatInv = gl.getUniformLocation(program, 'viewMatInv');
  gl.uniformMatrix4fv(uViewMatInv, false, camera.viewMatInv);
  const uProjMatInv = gl.getUniformLocation(program, 'projMatInv');
  gl.uniformMatrix4fv(uProjMatInv, false, camera.projMatInv);

}

async function createTexture(gl: WebGL2RenderingContext, svdag: SVDAG) {
  // const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;
  // const neededTexels = svdag.nodes.length;
  // const depthLayers = Math.ceil(neededTexels / maxT3DTexelsPow2);
  // const texelsToAllocate = maxT3DTexelsPow2 * depthLayers;

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_3D, texture);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);

  // uploadTexData(svdag, );
  // gl.texImage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers, 0, gl.RED_INTEGER, gl.UNSIGNED_INT, textureData);
  return texture;
}

async function uploadTexData(svdag: SVDAG, nNewNodes: number) {
  const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;
  const neededTexels = svdag.nodes.length;
  const depthLayers = Math.ceil(neededTexels / maxT3DTexelsPow2);
  const nTexelsToAllocate = maxT3DTexelsPow2 * depthLayers;
  if (svdag.nodes.length != nTexelsToAllocate) {
    const paddedNodes = new Uint32Array(nTexelsToAllocate);
    paddedNodes.set(svdag.nodes);
    svdag.nodes = paddedNodes;
  }

  const chunkStart = svdag.nodesLoadedOffset - nNewNodes;
  const newNodes = svdag.nodes.slice(chunkStart, svdag.nodesLoadedOffset);

  const xOffset = chunkStart % maxT3DTexels;
  const yOffset = Math.floor(chunkStart / maxT3DTexels) % maxT3DTexels;
  const zOffset = Math.floor(chunkStart / maxT3DTexelsPow2) % maxT3DTexels;

  gl.texStorage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers);
  
  if (chunkStart < 0) {
    console.log(`Initial uploading of nodes to 3D texture (Resolution: ${maxT3DTexels} x ${maxT3DTexels} x ${depthLayers}, nNodes: ${svdag.nodesLoadedOffset}/${svdag.nNodes})...`);
    gl.texImage3D(gl.TEXTURE_3D, 0, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers, 0, gl.RED_INTEGER, gl.UNSIGNED_INT, svdag.nodes);
  } else {
    console.log(`Update uploading of nodes to 3D texture (nNodes: ${svdag.nodesLoadedOffset}/${svdag.nNodes} [${Math.round(svdag.nodesLoadedOffset / svdag.nNodes * 100) }%])...`);
    gl.texSubImage3D(gl.TEXTURE_3D, 0, xOffset, yOffset, zOffset, maxT3DTexels, maxT3DTexels, depthLayers, gl.RED_INTEGER, gl.UNSIGNED_INT, newNodes);
  }

  // gl.texSubImage3D()

  // create texture data
  // every time new data is fetched...
  // - put nodes into SVDAG.nodes
  // - put 
}

let fpsCountTime = Date.now();
let fpsCount = 0;
let lastFrameTime = Date.now();
function render() {
  if (Date.now() > fpsCountTime + 1000) {
    fpsCountTime = Date.now();
    document.title = `DAGger - ${fpsCount} FPS`;
    fpsCount = 0;
  }
  fpsCount++;


  // Process input
  const dt = 0.001 * (Date.now() - lastFrameTime);
  lastFrameTime = Date.now();
  controller.update(dt);

  // Set uniforms
  const uTimeLoc = gl.getUniformLocation(program, 'time');
  gl.uniform1f(uTimeLoc, new Date().getTime() / 1000 - state.startTime);

  setInitialUniforms();

  // Render 
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  state.frame++;

  requestAnimationFrame(render);
}

window.addEventListener('load', init);
