import { loadProgram } from "./ShaderUtils";

// Dict of uniform name to its ID
type UniformDict<U extends string> = {
  [T in U]: WebGLUniformLocation;
}

/**
 * Wrapper for a WebGL shader.
 * Pass the uniforms as a string array, and the locations are automatically put
 * into the uniform dict, with autocomplete!
 */
class Shader<U extends string> {

  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uniforms: UniformDict<U>;

  constructor(gl: WebGL2RenderingContext, vertShader: WebGLShader, fragShader: WebGLShader, uniformNames: U[]) {
    this.gl = gl;
    this.program = loadProgram(gl, vertShader, fragShader);
    uniformNames.forEach(u => this.uniforms[u] = gl.getUniformLocation(this.program, u));
  }

  use() {
    this.gl.useProgram(this.program);
  }
}

export default Shader;
