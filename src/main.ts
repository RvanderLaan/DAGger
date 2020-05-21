import { SVDAG } from "./SVDAG";
import { vec3 } from "gl-matrix";
import Camera from "./Camera";
import OrbitController from "./OrbitController";
import SceneProvider, { SceneOption } from "./SceneProvider";

export enum RenderMode {
  ITERATIONS = 0,
  DEPTH = 1,
  DIFFUSE_LIGHTING = 2,
  PATH_TRACING = 3,
}

export interface IRendererState {
  startTime: number;
  time: number;
  frame: number;
  pixelTolerance: number,
  renderScale: number,
  drawLevel: number,
  maxIterations: number,
  moveSpeed: number,
  renderMode: RenderMode;
  showUniqueNodeColors: boolean;
}

const defaultState: IRendererState = {
  startTime: new Date().getTime() / 1000,
  time: 0,
  frame: 0,
  pixelTolerance: 1,
  renderScale: 1,
  drawLevel: 1,
  maxIterations: 250,
  moveSpeed: 1,
  renderMode: RenderMode.ITERATIONS,
  showUniqueNodeColors: false,
};

const MAX_DRAW_LEVEL = 20;

const state = { ...defaultState };

let canvas: HTMLCanvasElement;
let gl: WebGL2RenderingContext;
let program: WebGLProgram;
let fragShader: WebGLShader;
let texture: WebGLTexture;
let controller: OrbitController;
let scene: SVDAG;
let maxT3DTexels: number;

const sceneList: SceneOption[] = [];

const camera = new Camera();

export const rerender = () => requestAnimationFrame(render);

// UI handlers
function setRenderScale(num: number) {
  state.renderScale = num;
  canvas.width  = window.innerWidth * state.renderScale;
  canvas.height = window.innerHeight * state.renderScale;
  canvas.style.transform = `translate(-50%, -50%) scale(${1/state.renderScale})`;
  (document.getElementById('renderScale') as HTMLInputElement).value = `${state.renderScale}`;
}
(window as any).setRenderScale = setRenderScale.bind(this);

function setDrawLevel(num: number) {
  state.drawLevel = Math.max(1, Math.min(num, MAX_DRAW_LEVEL));
  (document.getElementById('drawLevel') as HTMLInputElement).value = `${state.drawLevel}`;
}
(window as any).setDrawLevel = setDrawLevel.bind(this);

function setRenderMode(num: RenderMode) {
  console.log('setting render mode', num)
  state.renderMode = num;
  (document.getElementById('renderMode') as HTMLInputElement).value = `${state.renderMode}`;
}
(window as any).setRenderMode = setRenderMode.bind(this);

function setMoveSpeed(num: number | string) {
  state.moveSpeed = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('moveSpeed') as HTMLInputElement).value = state.moveSpeed.toFixed(1);
  controller.moveSpeed = state.moveSpeed;
}
(window as any).setMoveSpeed = setMoveSpeed.bind(this);

function setMaxIterations(num: number) {
  state.maxIterations = Math.max(1, Math.min(num, 1000));
  (document.getElementById('maxIterations') as HTMLInputElement).value = state.maxIterations.toFixed(0);
}
(window as any).setMaxIterations = setMaxIterations.bind(this);

function setPixelTolerance(num: number | string) {
  state.pixelTolerance = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('pixelTolerance') as HTMLInputElement).value = state.pixelTolerance.toFixed(2);
}
(window as any).setPixelTolerance = setPixelTolerance.bind(this);

function setShowUniqueColors(val: boolean) {
  state.showUniqueNodeColors = val;
  console.log(val)
}
(window as any).setShowUniqueColors = setShowUniqueColors.bind(this);


async function loadSelectedScene() {
  const selector = document.getElementById('sceneSelector') as HTMLSelectElement;
  const selectedSceneIndex = parseInt(selector.options[selector.selectedIndex].value);

  // TODO: Dispose current scene first
  if (texture !== undefined) {
    gl.deleteTexture(texture);
  }

  // TODO: In theory, you could only host the highest res, and just do a partial load 

  // Need to recompile the frag shader, since it relies on #defines for the max # levels
  // TODO: hacky fix: set the drawLevel to 20 for every scene 
  // gl.detachShader(program, fragShader);
  // gl.deleteShader(fragShader);
  // fragShader

  const oldBboxCenter = scene?.bboxCenter || vec3.create();

  texture = await createTexture(gl);
  scene = await loadScene(sceneList[selectedSceneIndex]);

  setDrawLevel(scene.nLevels);

  // If the bbox center is different, it's probably a new scene, so reset camera
  if (vec3.dist(oldBboxCenter, scene.bboxCenter) > 0.001 || scene.renderPreferences.spawnPosition) {
    if (!scene.renderPreferences.spawnPosition) {
      camera.position.set(scene.bboxEnd);
    }
    camera.target.set(scene.bboxCenter);
    setMoveSpeed(vec3.distance(scene.bboxStart, scene.bboxEnd) * 0.01);
  }
  camera.updateMatrices();
  controller.init();

  if (program !== undefined) {
    setInitialUniforms();
  }
}
(window as any).loadSelectedScene = loadSelectedScene.bind(this);

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

  const maxNodes = Math.floor(Math.pow(maxT3DTexels, 3) / 5); // average of 4 pointers per node + 1 header texel (32 bit texels)
  console.log(`Max 3D tex = ${maxT3DTexels}. Max avg. nodes ~= ${maxNodes} = ${Math.round(maxNodes / 1e6)} MNodes`);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Load available scenes
  sceneList.push(...(await SceneProvider.getGeneratedSceneList()));
  const sceneSelector: HTMLSelectElement = document.querySelector('#sceneSelector');
  const addSceneToUI = (item: SceneOption, index: number) => {
    const opt = document.createElement('option');
    opt.value = `${index}`;
    opt.innerText = item.label;
    sceneSelector.appendChild(opt);
  }
  sceneList.forEach(addSceneToUI);

  // Fetch pre-built scenes async so we don't have to wait for the request
  SceneProvider.getPrebuiltSceneList().then(scenes => {
    sceneList.push(...scenes);
    sceneSelector.innerHTML = '';
    sceneList.forEach(addSceneToUI);
  });
  
  controller = new OrbitController(camera, 1);

  await loadSelectedScene();
  controller.init();

  // Load the program & shaders
  [program, fragShader] = await loadProgram(gl, scene.nLevels);
  setInitialUniforms();
  
  
  // We don't have any vertex attrs, but webgl complains if we don't enable at least one
  // const buf = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0]), gl.STATIC_DRAW);
  // gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(0);
  // gl.bindAttribLocation()
  
  gl.enable(gl.DEPTH_TEST);
  

  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', controller.onKeyDown.bind(controller));
  canvas.addEventListener('keyup', controller.onKeyUp.bind(controller));
  canvas.addEventListener('mousedown', controller.onMouseDown.bind(controller));
  canvas.addEventListener('mouseup', controller.onMouseUp.bind(controller));
  canvas.addEventListener('mousemove', controller.onMouseMove.bind(controller));
  canvas.addEventListener('wheel', controller.onMouseWheel.bind(controller));
  canvas.oncontextmenu = () => false;

  // Mobile
  canvas.addEventListener('touchstart', controller.onTouchStart.bind(controller));
  canvas.addEventListener('touchend', controller.onTouchEnd.bind(controller));
  canvas.addEventListener('touchmove', controller.onTouchMove.bind(controller));

  // "main" key event listener
  canvas.addEventListener('keydown', (e) => {
    if (e.key === '1') {
      setDrawLevel(state.drawLevel - 1);
    } else if (e.key === '2') {
      setDrawLevel(state.drawLevel + 1);
    }
  });

  // Automatically lower the render scale to half res when fps is low after 1.5 sec
  setTimeout(() => {
    if (latestFps < 15) {
      setRenderScale(0.25);
    } else if (latestFps < 30) {
      setRenderScale(0.5);
    } else if (latestFps < 45) {
      setRenderScale(0.75);
    }
  }, 2500);

  // Start render loop
  // TODO: Only rerender when input changes
  // TODO: Beam optimization (coarse pre-render to avoid tracing empty space in front of camera for all pixels)
  // TODO: Re-use previous frame for path tracing
  rerender();
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
  // const shaderSrcRes = await fetch('raycast2.glsl');
  let shaderSrc = await shaderSrcRes.text();

  const defines = `#version 300 es
#define INNER_LEVELS ${nLevels *2 - 1}u
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

  // Proper error is printed when we don't check for errors
  // if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)
  //   || !gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
  //   throw new Error('Shader compilation failure');
  // }

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

  return [program, fragShader];
}

export async function loadScene(sceneOption: SceneOption) {
  console.log(`Loading "${sceneOption.label}" (${sceneOption.loadType})...`);

  let svdag;

  if (sceneOption.loadType === 'stream') {
    // Option 1: Progressively upload to GPU as every chunk of the file is fetched 
    // TODO: Web worker
    svdag = await loadSceneStream(sceneOption.downloadPath);
  } else if (sceneOption.loadType === 'fetch') { 
    // Option 2: Wait until file is completely fetched before uploading to GPU memory
    svdag = new SVDAG();
    const response = await fetch(sceneOption.downloadPath);
    svdag.load(await response.arrayBuffer());
    svdag.dataLoadedOffset = svdag.nNodes * 4;
    uploadTexData(svdag, svdag.nNodes);
    svdag.renderPreferences.maxIterations = defaultState.maxIterations;
  } else if (sceneOption.loadType === 'preloaded') {
    // Option 3: Preloaded data (currently used for generated SVDAGs)
    svdag = new SVDAG();
    sceneOption.getScene(svdag);
    svdag.originalNodeLength = svdag.nodes.length;
    svdag.dataLoadedOffset = svdag.nNodes * 4;
    svdag.initialized = true; // header should already be loaded for preloaded scenes
    uploadTexData(svdag, svdag.nNodes);
    svdag.renderPreferences.maxIterations = defaultState.maxIterations;
  }

  if (svdag.renderPreferences.renderMode !== undefined) setRenderMode(svdag.renderPreferences.renderMode);
  if (svdag.renderPreferences.maxIterations) setMaxIterations(svdag.renderPreferences.maxIterations);
  if (svdag.renderPreferences.moveSpeed) setMoveSpeed(svdag.renderPreferences.moveSpeed);
  if (svdag.renderPreferences.spawnPosition) camera.position = svdag.renderPreferences.spawnPosition;
  
  console.log('Loaded!');
  console.log(`Levels: ${svdag.nLevels}, nodes: ${svdag.nNodes}`);
  console.log(`Bbox:\n\t[${svdag.bboxStart}]\n\t[${svdag.bboxEnd}]\n\t(center: [${svdag.bboxCenter}])`);

  return svdag;
}

async function loadSceneStream(downloadPath: string) {
  console.log('Streaming', downloadPath, '...');
  const response = await fetch(downloadPath);
  const reader = response.body.getReader();

  // Load header before continuing
  const { done, value } = await reader.read();

  const svdag = new SVDAG();
  svdag.loadChunk(value);

  // Upload all data the first time (filled with max_int -1)
  uploadTexData(svdag, svdag.dataLoadedOffset / 4);

  let progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
  const loadButton = document.getElementById('load') as HTMLButtonElement;
  loadButton.disabled = true;
  loadButton.innerText = `Load (${progressPct}%)`;
  
  const loadNodesPromise = async () => {
    // Keep track of when the last data upload to GPU was done, to throttle it a bit
    let lastUpload = new Date();
    let lastUploadIndex = svdag.dataLoadedOffset;

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      console.log(`Received ${value.byteLength} bytes (${value.length / 1000000} MB)`);

      // Load in SVDAG in RAM
      svdag.loadChunk(value);

      progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
      loadButton.innerText = `Load (${progressPct}%)`;
  
      // Upload to GPU x milliseconds
      // TODO: Improve streaming performance we can upload every time
      const d = new Date();
      if (d.getTime() - lastUpload.getTime() > 1000) {
        uploadTexData(svdag, (svdag.dataLoadedOffset - lastUploadIndex) / 4);
        lastUploadIndex = svdag.dataLoadedOffset;
        lastUpload = d;
      }
    }

    // Final upload
    uploadTexData(svdag, (svdag.dataLoadedOffset - lastUploadIndex) / 4);
    // uploadTexData(svdag, svdag.dataLoadedOffset);
    return;
  };

  const finish = () => {
    console.log('Finished loading!');
    loadButton.innerText = 'Load';
    loadButton.disabled = false;
  }

  if (done || progressPct >= 99) {
    finish();
  } else {
    loadNodesPromise().then(finish);
  }
  return svdag;
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
  gl.uniform1f(uRootHalfSide, scene.rootSide / 2.0);

  // TODO: Make light pos configurable, currently always bboxEnd
  const uLightPos = gl.getUniformLocation(program, 'lightPos');
  gl.uniform3fv(uLightPos, scene.bboxEnd);

  const uMaxIters = gl.getUniformLocation(program, 'maxIters');
  gl.uniform1ui(uMaxIters, state.maxIterations);
  const uDrawLevel = gl.getUniformLocation(program, 'drawLevel');
  gl.uniform1ui(uDrawLevel, state.drawLevel);
  const uProjectionFactor = gl.getUniformLocation(program, 'projectionFactor');
  gl.uniform1f(uProjectionFactor, getProjectionFactor(state.pixelTolerance, 1));
  
  const uUniqueColors = gl.getUniformLocation(program, 'uniqueColors');
  gl.uniform1i(uUniqueColors, state.showUniqueNodeColors ? 1 : 0);
  
  const uRenderMode = gl.getUniformLocation(program, 'viewerRenderMode');
  gl.uniform1i(uRenderMode, state.renderMode);

  const uViewMatInv = gl.getUniformLocation(program, 'viewMatInv');
  gl.uniformMatrix4fv(uViewMatInv, false, camera.viewMatInv);
  const uProjMatInv = gl.getUniformLocation(program, 'projMatInv');
  gl.uniformMatrix4fv(uProjMatInv, false, camera.projMatInv);
}

async function createTexture(gl: WebGL2RenderingContext) {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_3D, texture);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);
  return texture;
}

/**
 * Updates the 3D texture with only the nodes that have been loaded since the last texture update
 */
async function uploadTexData(svdag: SVDAG, nNewNodes: number) {
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
    
    // gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, maxT3DTexels, maxT3DTexels, depthLayers, gl.RED_INTEGER, gl.UNSIGNED_INT, svdag.nodes);
  }

  // gl.texSubImage3D()

  // create texture data
  // every time new data is fetched...
  // - put nodes into SVDAG.nodes
  // - put 
}

let fpsCountTime = Date.now();
let fpsCount = 0;
let latestFps = 1;
let lastFrameTime = Date.now();
function render() {
  if (Date.now() > fpsCountTime + 1000) {
    fpsCountTime = Date.now();
    document.title = `DAGger - ${fpsCount} FPS`;
    latestFps = fpsCount;
    fpsCount = 0;

    // console.log('Voxel at cam pos: ', scene.getVoxel(camera.position));
  }
  fpsCount++;

  // TODO: Move CPU ray casting to update func
  // const hit = scene.castRay(camera.position, vec3.fromValues(0, -1, 0), 100);

  // const linearGravity = scene.rootSide / 1000;
  // const delta = vec3.fromValues(0, 0, 0);
  // if (!hit) {
  //   delta[1] = -linearGravity;
  // } else {
  //   const dist = vec3.dist(hit.hitPos, camera.position);
  //   console.log(dist, hit.maxRayLength)
  //   if (dist < 0.8 * hit.maxRayLength) {
  //     delta[1] = 1000 / dist;
  //   }
  // }
  // // const delta = vec3.sub(vec3.create(), hit.hitPos, camera.position);
  // vec3.add(camera.position, camera.position, delta);
  // vec3.add(camera.target, camera.target, delta);
  // camera.updateMatrices();

  // Process input
  const dt = 0.001 * (Date.now() - lastFrameTime);
  lastFrameTime = Date.now();
  controller.update(dt);

  // Set uniforms
  const uTimeLoc = gl.getUniformLocation(program, 'time');
  gl.uniform1f(uTimeLoc, new Date().getTime() / 1000 - state.startTime);

  // TODO: Only update uniforms when they change, not all of them every time
  setInitialUniforms();

  // Render 
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  state.frame++;

  rerender();
}

window.addEventListener('load', init);
