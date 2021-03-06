import { SVDAG } from "./SVDAG";
import { vec3 } from "gl-matrix";
import Camera from "./Camera";
import Renderer, { RenderMode, MAX_PATH_TRACE_SAMPLES, SkyMode } from "./Renderer";
import OrbitController from "./OrbitController";
import SceneProvider, { SceneOption, PreloadedSceneOption } from "./SceneProvider";
import NodeGraph from "./nodeGraph";

export const GL = WebGL2RenderingContext;

const MAX_DRAW_LEVEL = 20;

let canvas: HTMLCanvasElement;
let controller: OrbitController;
let scene: SVDAG;

const sceneList: SceneOption[] = [];

const camera = new Camera(75);
let renderer: Renderer;

const win = window as any;

let fpsCountTime = Date.now();
let fpsCount = 0;
let latestFps = 1;
let lastFrameTime = Date.now();

let haveSettingsChanged = false; // flag to restart path tracing when settings change

const params = ['renderScale', 'drawLevel', 'renderMode', 'moveSpeed', 'maxIterations', 'pixelTolerance',
                'showUniqueNodeColors', 'useBeamOptimization'];

/**
 * Todo: (path tracing)
 * - Decrease bounces to and and render scale to 0.5 when interacting
 * - Make voxels around mouse click emissive
 */

// UI handlers
function setRenderScale(num: number) {
  renderer.state.renderScale = num;
  canvas.width  = window.innerWidth * renderer.state.renderScale;
  canvas.height = window.innerHeight * renderer.state.renderScale;
  canvas.style.transform = `translate(-50%, -50%) scale(${1/renderer.state.renderScale})`;
  (document.getElementById('renderScale') as HTMLInputElement).value = `${renderer.state.renderScale}`;
  haveSettingsChanged = true;
  renderer.resizeFBOs();
}
win.setRenderScale = setRenderScale.bind(this);

function setDrawLevel(num: number) {
  renderer.state.drawLevel = Math.max(1, Math.min(num, MAX_DRAW_LEVEL));
  (document.getElementById('drawLevel') as HTMLInputElement).value = `${renderer.state.drawLevel}`;
  haveSettingsChanged = true;
}
win.setDrawLevel = setDrawLevel.bind(this);

function setRenderMode(num: RenderMode | string) {
  console.log('setting render mode', num)
  renderer.state.renderMode = typeof num === 'string' ? parseInt(num, 10) : num;
  (document.getElementById('renderMode') as HTMLInputElement).value = `${renderer.state.renderMode}`;
  haveSettingsChanged = true;
}
win.setRenderMode = setRenderMode.bind(this);

function setSkyMode(num: SkyMode | string) {
  console.log('setting sky mode', num)
  renderer.state.skyMode = typeof num === 'string' ? parseInt(num, 10) : num;
  (document.getElementById('skyMode') as HTMLInputElement).value = `${renderer.state.skyMode}`;
  haveSettingsChanged = true;
}
win.setSkyMode = setSkyMode.bind(this);

function setReprojectionMode(val: boolean) {
  renderer.state.dynamicTRP = val;
  haveSettingsChanged = true;
}
win.setReprojectionMode = setReprojectionMode.bind(this);

function setMoveSpeed(num: number | string) {
  controller.moveSpeed = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('moveSpeed') as HTMLInputElement).value = controller.moveSpeed.toFixed(1);
  haveSettingsChanged = true;
}
win.setMoveSpeed = setMoveSpeed.bind(this);

function setMaxIterations(num: number) {
  renderer.state.maxIterations = Math.max(1, Math.min(num, 1000));
  (document.getElementById('maxIterations') as HTMLInputElement).value = renderer.state.maxIterations.toFixed(0);
  haveSettingsChanged = true;
}
win.setMaxIterations = setMaxIterations.bind(this);

function setPixelTolerance(num: number | string) {
  renderer.state.pixelTolerance = typeof num === 'number' ? num : parseFloat(num);
  (document.getElementById('pixelTolerance') as HTMLInputElement).value = renderer.state.pixelTolerance.toFixed(2);
  haveSettingsChanged = true;
}
win.setPixelTolerance = setPixelTolerance.bind(this);

function setShowUniqueColors(val: boolean) {
  renderer.state.showUniqueNodeColors = val;
  haveSettingsChanged = true;
}
win.setShowUniqueColors = setShowUniqueColors.bind(this);

function setUseBeamOptimization(val: boolean, disable?: boolean) {
  renderer.state.useBeamOptimization = val;

  if (disable) {
    const checkbox = (document.getElementById('beamOptim') as HTMLInputElement);
    checkbox.checked = val;
    checkbox.disabled = true;
  }
  haveSettingsChanged = true;
}
win.setUseBeamOptimization = setUseBeamOptimization.bind(this);

function setNPathTraceBounces(num: number | string) {
  renderer.state.nPathTraceBounces = Math.max(0, Math.min(parseInt(num.toString()), 100));
  (document.getElementById('nPathTraceBounces') as HTMLInputElement).value = renderer.state.nPathTraceBounces.toString();
  haveSettingsChanged = true;
}
win.setNPathTraceBounces = setNPathTraceBounces.bind(this);

function setDepthOfField(num: number | string) {
  console.log(num);
  renderer.state.depthOfField = Math.max(0, Math.min(parseFloat(num.toString()), 100));
  (document.getElementById('depthOfField') as HTMLInputElement).value = renderer.state.depthOfField.toString();
  haveSettingsChanged = true;
}
win.setDepthOfField = setDepthOfField.bind(this);

const progressBar: HTMLDivElement = document.querySelector('#progress');

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
        haveSettingsChanged = true; // re-fresh the path tracing
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
    await sceneOption.getScene(svdag);
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
  
  vec3.copy(renderer.state.lightPos, svdag.bboxEnd);

  console.log('Loaded!');
  console.log(`Levels: ${svdag.nLevels}, nodes: ${svdag.nNodes}`);
  console.log(`Bbox:\n\t[${svdag.bboxStart}]\n\t[${svdag.bboxEnd}]\n\t(center: [${svdag.bboxCenter}])`);

  setDrawLevel(svdag.nLevels);

  // If the bbox center is different, it's probably a new scene, so reset camera
  if (vec3.dist(oldBboxCenter, svdag.bboxCenter) > 0.001 || svdag.renderPreferences.spawnPosition) {
    if (!svdag.renderPreferences.spawnPosition) {
      vec3.copy(camera.position, svdag.bboxEnd);
    }
    vec3.copy(camera.target, svdag.bboxCenter);
    if (!svdag.renderPreferences.moveSpeed) {
      setMoveSpeed(vec3.distance(svdag.bboxStart, svdag.bboxEnd) * 0.01);
    }
  }
  camera.updateMatrices();
  controller.init();

  scene = svdag;
}

async function loadSelectedScene() {
  if (sceneList.length === 0) throw new Error('No scenes available!');

  const selector = document.getElementById('sceneSelector') as HTMLSelectElement;
  const selectedSceneIndex = parseInt(selector.options[selector.selectedIndex].value) || 0;

  console.log(selectedSceneIndex, sceneList)
  await loadScene(sceneList[selectedSceneIndex]); 
}
win.loadSelectedScene = loadSelectedScene.bind(this);

const fileInput: HTMLInputElement = document.querySelector('#file-input');
fileInput.onchange = async (event) => {
  const target = event.target as HTMLInputElement;
  console.log(target, target.files, target.files?.length);
  if (target.files && target.files.length) {
    const file = target.files.item(0);
    const sceneOption: PreloadedSceneOption = {
      label: file.name,
      getScene: async (svdag) => svdag.load(await file.arrayBuffer()),
      loadType: 'preloaded',
    };
    await loadScene(sceneOption);
  }
};


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
  const didUpdate = controller.update(dt);

  if (didUpdate || haveSettingsChanged) {
    haveSettingsChanged = false;
    if (!renderer.state.dynamicTRP) { // reset frame nr to reset the back buffer when not using dynamic temporal reprojection
      renderer.state.frame = 0;
    }
    // restart path tracing if scene changed, since previous frames are used which are invalidated when an update occurs
    renderer.state.cameraUpdateFrame = renderer.state.frame; 
  }
  if (renderer.state.renderMode === RenderMode.PATH_TRACING) {
    progressBar.style.width = `${100 * (renderer.state.frame - renderer.state.cameraUpdateFrame) / MAX_PATH_TRACE_SAMPLES}%`;
  } else {
    progressBar.style.width = '0%';
  }

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

  const colorExt: WEBGL_color_buffer_float = gl.getExtension('EXT_color_buffer_float');
  if (!colorExt) {
    console.error('The the EXT_color_buffer_float extension is not available - some features might not work');
    (window as any).setUseBeamOptimization(false, true); // TODO: Proper UI controller
    return;
  }

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

  // TODO: Many of these things can be done in parallel instead of awaiting each.

  await loadSelectedScene();
  controller.init();

  // Load the program & shaders
  await renderer.initShaders();
  // Set up FBOs and textures
  renderer.initialize();
  // Set up dicts of uniform locations for each shader program
  renderer.initUniforms();
  // Set the initial uniforms for the active shader program
  renderer.setInitialUniforms(renderer.viewerUniformDict);
  
  // We don't have any vertex attrs, but webgl complains if we don't enable at least one (doesn't work for some reason)
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
    } else if (e.key === 'l') {
      vec3.copy(renderer.state.lightPos, camera.position);
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


  ///////////////////////////////
  // NodeGraph:
  // const nodeGraph = new NodeGraph(document.querySelector('#node-graph'));
  // nodeGraph.import(scene);
  // nodeGraph.render();
}

window.addEventListener('load', init);
