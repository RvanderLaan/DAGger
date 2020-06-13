import { GL } from './main';

export interface ITextureConfig {
  internalFormat: GLenum;
  format: GLenum;
  type: GLenum;
  width: number;
  height: number;
  magFilter: GLenum;
  minFilter: GLenum;
  wrapS: GLenum;
  wrapT: GLenum;
}

const rgbTextureConfig = {
  internalFormat: GL.RGB8,
  format: WebGL2RenderingContext.RGB,
  type: WebGL2RenderingContext.UNSIGNED_BYTE,
}

const defaultTextureConfig: Partial<ITextureConfig> = {
  internalFormat: GL.RGBA32F,
  format: GL.RGBA,
  type: GL.FLOAT,
  magFilter: GL.NEAREST,
  minFilter: GL.NEAREST,
  wrapS: GL.CLAMP_TO_EDGE,
  wrapT: GL.CLAMP_TO_EDGE,
};

class Framebuffer {
  gl: WebGL2RenderingContext;

  framebuffer: WebGLFramebuffer;
  texture: WebGLTexture;

  constructor(gl: WebGL2RenderingContext, textureConfig = defaultTextureConfig) {
    this.gl = gl;
  }

}