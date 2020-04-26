
const UNIFORMS = ['drawLevel'];
type Uniform = typeof UNIFORMS[number];

type UniformDict = {
  [T in Uniform]: number;
}

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

export default class Renderer {
  uniformDict: UniformDict;

  state: IRendererState = {
    startTime: new Date().getTime() / 1000,
    time: 0,
    frame: 0,
    pixelTolerance: 1,
    renderScale: 1,
    drawLevel: 1,
    maxIterations: 250,
    scenePath: 'examples/sponza_11.svdag',
  };

  // camera: Camera;



}