import { SVDAG } from "./SVDAG";
import { vec3 } from "gl-matrix";
import Camera from "./Camera";
import Renderer, { RenderMode } from "./Renderer";
import OrbitController from "./OrbitController";
import SceneProvider, { SceneOption } from "./SceneProvider";

const MAX_DRAW_LEVEL = 20;

let canvas: HTMLCanvasElement;
let controller: OrbitController;
let scene: SVDAG;

const sceneList: SceneOption[] = [];

const camera = new Camera();
let renderer: Renderer;

const win = window as any;

let fpsCountTime = Date.now();
let fpsCount = 0;
let latestFps = 1;
let lastFrameTime = Date.now();

// UI handlers
function setRenderScale(num: number) {
  renderer.state.renderScale = num;
  canvas.width  = window.innerWidth * renderer.state.renderScale;
  canvas.height = window.innerHeight * renderer.state.renderScale;
  canvas.style.transform = `translate(-50%, -50%) scale(${1/renderer.state.renderScale})`;
  (document.getElementById('renderScale') as HTMLInputElement).value = `${renderer.state.renderScale}`;
}
win.setRenderScale = setRenderScale.bind(this);

function setDrawLevel(num: number) {
  renderer.state.drawLevel = Math.max(1, Math.min(num, MAX_DRAW_LEVEL));
  (document.getElementById('drawLevel') as HTMLInputElement).value = `${renderer.state.drawLevel}`;
}
win.setDrawLevel = setDrawLevel.bind(this);

function setRenderMode(num: RenderMode) {
  console.log('setting render mode', num)
  renderer.state.renderMode = num;
  (document.getElementById('renderMode') as HTMLInputElement).value = `${renderer.state.renderMode}`;
}
win.setRenderMode = setRenderMode.bind(this);

function setMoveSpeed(num: number | string) {
  controller.moveSpeed = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('moveSpeed') as HTMLInputElement).value = controller.moveSpeed.toFixed(1);
}
win.setMoveSpeed = setMoveSpeed.bind(this);

function setMaxIterations(num: number) {
  renderer.state.maxIterations = Math.max(1, Math.min(num, 1000));
  (document.getElementById('maxIterations') as HTMLInputElement).value = renderer.state.maxIterations.toFixed(0);
}
win.setMaxIterations = setMaxIterations.bind(this);

function setPixelTolerance(num: number | string) {
  renderer.state.pixelTolerance = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('pixelTolerance') as HTMLInputElement).value = renderer.state.pixelTolerance.toFixed(2);
}
win.setPixelTolerance = setPixelTolerance.bind(this);

function setShowUniqueColors(val: boolean) {
  renderer.state.showUniqueNodeColors = val;
}
win.setShowUniqueColors = setShowUniqueColors.bind(this);

function setUseBeamOptimization(val: boolean, disable?: boolean) {
  renderer.state.useBeamOptimization = val;

  if (disable) {
    const checkbox = (document.getElementById('beamOptim') as HTMLInputElement);
    checkbox.checked = val;
    checkbox.disabled = true;
  }
}
win.setUseBeamOptimization = setUseBeamOptimization.bind(this);

// SCENE LOADING
/////////////////
async function loadSceneStream(downloadPath: string) {
  console.log('Streaming', downloadPath, '...');
  const response = await fetch(downloadPath);
  const reader = response.body.getReader();

  // Load header before continuing
  const { done, value } = await reader.read();

  const svdag = new SVDAG();
  renderer.initScene(svdag);
  svdag.loadChunk(value);

  // Upload all data the first time (filled with max_int -1)
  renderer.uploadTexData(svdag.dataLoadedOffset / 4);

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
        renderer.uploadTexData((svdag.dataLoadedOffset - lastUploadIndex) / 4);
        lastUploadIndex = svdag.dataLoadedOffset;
        lastUpload = d;
      }
    }

    // Final upload
    renderer.uploadTexData((svdag.dataLoadedOffset - lastUploadIndex) / 4);
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
    renderer.initScene(svdag);
    const response = await fetch(sceneOption.downloadPath);
    svdag.load(await response.arrayBuffer());
    svdag.dataLoadedOffset = svdag.nNodes * 4;
    renderer.uploadTexData(svdag.nNodes);
    svdag.renderPreferences.maxIterations = 250;
  } else if (sceneOption.loadType === 'preloaded') {
    // Option 3: Preloaded data (currently used for generated SVDAGs)
    svdag = new SVDAG();
    renderer.initScene(svdag);
    sceneOption.getScene(svdag);
    svdag.originalNodeLength = svdag.nodes.length;
    svdag.dataLoadedOffset = svdag.nNodes * 4;
    svdag.initialized = true; // header should already be loaded for preloaded scenes
    renderer.uploadTexData(svdag.nNodes);
    svdag.renderPreferences.maxIterations = 250;
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

async function loadSelectedScene() {
  const selector = document.getElementById('sceneSelector') as HTMLSelectElement;
  const selectedSceneIndex = parseInt(selector.options[selector.selectedIndex].value);

  // Dispose current scene first
  renderer.deleteNodesTexture();

  // TODO: Should add a version number to the SVDAG file header
  // TODO: In theory, you could only host the highest res, and just do a partial load 

  // Need to recompile the frag shader, since it relies on #defines for the max # levels
  // TODO: hacky fix: set the drawLevel to 20 for every scene 
  // gl.detachShader(program, fragShader);
  // gl.deleteShader(fragShader);
  // fragShader

  const oldBboxCenter = scene?.bboxCenter || vec3.create();

  renderer.createNodesTexture();
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
}
win.loadSelectedScene = loadSelectedScene.bind(this);


// Main render function - updates things every frame and calls the SVDAG renderer.render
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

  renderer.render();

  // Request rerender
  requestAnimationFrame(render);
}

async function init() {
  canvas = document.querySelector("#glCanvas");
  const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
  renderer = new Renderer(camera, canvas);
  setRenderScale(renderer.state.renderScale);

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  console.log(gl.getParameter(gl.VERSION), gl.getParameter(gl.SHADING_LANGUAGE_VERSION), gl.getParameter(gl.VENDOR));
  console.log('Supported extensions:', gl.getSupportedExtensions());

  const maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);

  const maxNodes = Math.floor(Math.pow(maxT3DTexels, 3) / 5); // average of 4 pointers per node + 1 header texel (32 bit texels)
  console.log(`Max 3D tex = ${maxT3DTexels}. Max avg. nodes ~= ${maxNodes} = ${Math.round(maxNodes / 1e6)} MNodes`);

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
  await renderer.initShaders();
  renderer.initUniforms();
  renderer.setInitialUniforms(renderer.viewerUniformDict);
  
  // We don't have any vertex attrs, but webgl complains if we don't enable at least one
  // const buf = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0]), gl.STATIC_DRAW);
  // gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(0);
  // gl.bindAttribLocation()
  
  gl.disable(gl.DEPTH_TEST);
  
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
      setDrawLevel(renderer.state.drawLevel - 1);
    } else if (e.key === '2') {
      setDrawLevel(renderer.state.drawLevel + 1);
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
  render();
}

window.addEventListener('load', init);
