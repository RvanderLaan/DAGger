
interface IRendererState {
  startTime: number;
  time: number;
  frame: number;
}

const state: IRendererState = {
  startTime: new Date().getTime() / 1000,
  time: 0,
  frame: 0,
};

let canvas: HTMLCanvasElement;
let gl: WebGLRenderingContext;
let program: WebGLProgram;

function init() {
  canvas = document.querySelector("#glCanvas");
  gl = canvas.getContext("webgl2") as WebGLRenderingContext;

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  console.log(gl.getParameter(gl.VERSION), gl.getParameter(gl.SHADING_LANGUAGE_VERSION), gl.getParameter(gl.VENDOR));
  console.log(gl.getSupportedExtensions());

  // @ts-ignore
  console.log('2D texels: ', gl.getParameter(gl.MAX_TEXTURE_SIZE), ' - 3D texels: ', gl.getParameter(gl.MAX_3D_TEXTURE_SIZE));

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Setup shader
  loadShader(gl);

  // Setup scene
  drawTriangle(canvas, gl);
  // loadScene()

  // Start render loop
  requestAnimationFrame(render);
}

async function loadShader(gl: WebGLRenderingContext) {
  const shaderSrcRes = await fetch('raycast.glsl');
  const shaderSrc = await shaderSrcRes.text();
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, shaderSrc);
  gl.compileShader(shader);
  console.log('Raycast shader: ', gl.getShaderInfoLog(shader) || 'OK');
  return shader;
}

function loadScene() {

}

function drawTriangle(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
  
  const vertSrc = `#version 300 es


    uniform float time;

    void main(void) {
      // attribute vec3 coordinates;

      // https://www.saschawillems.de/blog/2016/08/13/vulkan-tutorial-on-rendering-a-fullscreen-quad-without-buffers/
      vec2 outUV = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
      outUV = outUV * 2.0f - 1.0f;
      gl_Position = vec4(outUV * (1.0 / time) + vec2(cos(time * time), sin(time * time)), 0.0f, 1.0f);
    }
  `;
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertSrc);
  gl.compileShader(vertShader);
  console.log('Vert shader: ', gl.getShaderInfoLog(vertShader) || 'OK');

  //fragment shader source code
  const fragSrc = `#version 300 es
    precision highp float;

    uniform float time;
    uniform vec2 resolution;

    out vec4 fragColor;

    void main(void) {
      vec2 uv = (gl_FragCoord.xy - resolution * 0.5) / resolution.y;
      float t = smoothstep(0.2, 0.2 + sin(time * 3.141) * 0.1, length(uv));
      fragColor = vec4(1.0, t, sin(time) * 0.5f + 0.5f, 1.0);
    }
  `;
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragSrc); 
  gl.compileShader(fragShader);
  console.log('Frag shader: ', gl.getShaderInfoLog(fragShader) || 'OK');

  program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  console.log('Program: ', gl.getProgramInfoLog(program) || 'OK');

  gl.enable(gl.DEPTH_TEST);

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)
    || !gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    throw new Error('Shader compilation failure');
  }

  // Const uniform
  const uResolutionLoc = gl.getUniformLocation(program, 'resolution');
  gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
}

function render() {
  // gl.useProgram(program);
  // Set uniforms
  const uTimeLoc = gl.getUniformLocation(program, 'time');
  gl.uniform1f(uTimeLoc, new Date().getTime() / 1000 - state.startTime);

  // Update 
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  state.frame++;

  requestAnimationFrame(render);
}

window.addEventListener('load', init);
