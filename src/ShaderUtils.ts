
export function loadVertShader(gl: WebGL2RenderingContext) {
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

export async function loadRaycastFragShader(gl: WebGL2RenderingContext, nLevels: number, mode: 'viewer' | 'depth' | 'pathtracing') {
  const maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
  const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;

  const shaderSrcRes = await fetch('raycast.glsl');
  // const shaderSrcRes = await fetch('raycast2.glsl');
  let shaderSrc = await shaderSrcRes.text();

  const defines = `#version 300 es
#define INNER_LEVELS ${nLevels *2 - 1}u
#define TEX3D_SIZE ${maxT3DTexels}
#define TEX3D_SIZE_POW2 ${maxT3DTexelsPow2}
#define VIEWER_MODE ${mode === 'viewer' ? 1 : 0}
#define DEPTH_MODE ${mode === 'depth' ? 1 : 0}
`;

  // Replace the first few lines from shaderSrc with defines
  shaderSrc = defines + '\n' + shaderSrc.split('\n').splice(defines.split('\n').length).join('\n');

  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, shaderSrc);
  gl.compileShader(shader);
  console.log(`Raycast shader (${mode}): `, gl.getShaderInfoLog(shader) || 'OK');
  return shader;
}

export async function loadNormalFragShader(gl: WebGL2RenderingContext) {
  const shaderSrcRes = await fetch('normalFromDepth.glsl');
  const shaderSrc = await shaderSrcRes.text();
  const shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shader, shaderSrc);
  gl.compileShader(shader);
  console.log(`Normal shader: `, gl.getShaderInfoLog(shader) || 'OK');
  return shader;
}

export async function loadProgram(gl: WebGL2RenderingContext, vertShader: WebGLShader, fragShader: WebGLShader) {

  // Proper error is printed when we don't check for errors
  // (Disabled since the error is less obvious than the built-in error message for some reason)
  // if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)
  //   || !gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
  //   throw new Error('Shader compilation failure');
  // }

  const program = gl.createProgram();
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
