import { SVDAG } from "./SVDAG";
import { vec3 } from "gl-matrix";
import { RenderMode } from "./Renderer";

export type PreloadedSceneOption = {
  label: string;
  loadType: 'preloaded';
  getScene: (svdag: SVDAG) => Promise<SVDAG>;
}

export type LoadableSceneOption = {
  label: string;
  loadType: 'stream' | 'fetch';
  downloadPath: string;
}

export type SceneOption = PreloadedSceneOption | LoadableSceneOption;

type SceneFile = {
  fileName: string;
  absolutePath: string;
  size: string;
}

export default class SceneProvider {
  static async getGeneratedSceneList() {
    const generatedSceneOptions: SceneOption[] = [
      {
        label: 'Cross fractal',
        getScene: async (svdag) => SceneProvider.generateCrossFractal(svdag),
        loadType: 'preloaded',
      },
      {
        label: 'Menger sponge fractal',
        getScene: async (svdag) => SceneProvider.generateMengerSpongeFractal(svdag),
        loadType: 'preloaded',
      },
      {
        label: 'Cube fractal',
        getScene: async (svdag) => SceneProvider.generateCubeFractal(svdag),
        loadType: 'preloaded',
      },
      {
        label: 'Pyramid fractal',
        getScene: async (svdag) => SceneProvider.generatePyramidFractal(svdag),
        loadType: 'preloaded',
      }, 
    ];
    return generatedSceneOptions;
  }
  static async getPrebuiltSceneList(): Promise<SceneOption[]> {
    try {
      const prebuiltScenes = await SceneProvider.fetchPrebuiltScenes();
      return prebuiltScenes.map<SceneOption>(f => ({
        label: `${f.fileName} (${f.size})`,
        downloadPath: f.absolutePath,
        loadType: 'stream', // todo: if size is small, maybe use fetch loadType
      }));
    } catch (e) {
      console.error('Could not fetch prebuilt scenes :(', e);
      return [];
    }
  }

  static async fetchPrebuiltScenes() {
    // Needs to be https
    const hostUrl = `https://allaboutsteinsgate.info/dev/dagger/scenes/`;
    // sort by name
    const res = await fetch(`${hostUrl}?C=N;O=A`);
    const pageString = await res.text();
    const doc = new DOMParser().parseFromString(pageString, 'text/html');

    // Apache index structure is a table has rows with 'Name' and 'Size'.
    return Array.from(doc.querySelectorAll('tr'))
      // The first three and last row are headers or seperators or a parent link
      .slice(3, -1)
      .map((row: HTMLTableRowElement): SceneFile => ({
        fileName: (row.childNodes[1] as HTMLTableDataCellElement).innerText.trim().replace('.svdag', ''),
        absolutePath: `${hostUrl}${row.querySelector('a').href.split('/').pop()}`,
        size: (row.childNodes[3] as HTMLTableDataCellElement).innerText,
      }));
  }

  private static generateBaseFractal(svdag: SVDAG, nNodes: number, nodeData: Uint32Array) {
     svdag.bboxStart.set([0, 0, 0]);
     svdag.bboxEnd.set([100, 100, 100]);
     vec3.sub(svdag.bboxCenter, svdag.bboxEnd, svdag.bboxStart);
     vec3.scaleAndAdd(svdag.bboxCenter, svdag.bboxStart, svdag.bboxCenter, 0.5);
     svdag.rootSide = 100;
 
     svdag.nLevels = 20; // could be infinite, but this affects the size of the renderer stack
     svdag.nNodes = nNodes;
     svdag.nodes = nodeData;
     return svdag;
  }

  static generatePyramidFractal(svdag: SVDAG): SVDAG {
    svdag.renderPreferences = {
      renderMode: RenderMode.ITERATIONS,
      maxIterations: 100,
      spawnPosition: vec3.fromValues(125, 125, 125),
    };

    // We'll generate a recursive fractal here:
    // - Level 0: A root node with 4 child pointers, all pointing back to the root

    return SceneProvider.generateBaseFractal(
      svdag,
      1,
      new Uint32Array([
        // child pointers at index 0, 1, 2 and 4
        0b11101000,
        // 4 pointers, all pointing to index 0 (the root node)
        0, 0, 0, 0,
    ]));
  }

  static generateCubeFractal(svdag: SVDAG): SVDAG {
    svdag.renderPreferences = {
      renderMode: RenderMode.PATH_TRACING,
      maxIterations: 30,
      spawnPosition: vec3.fromValues(150, 150, 150),
      moveSpeed: 16,
    };

    // A cube fractal is a bit more complex, we need more than 1 node
    // - Level 0: A root node with 8 child pointers, pointing to the same node
    // - Level 1: A node where all but 1 child pointer are set, all pointing back to the root

    return SceneProvider.generateBaseFractal(
      svdag,
      2,
      new Uint32Array([
        // all child pointers set
        0b11111111,
        // 8 pointers, all pointing to index 9 (the node at level 1)
        9, 9, 9, 9, 9, 9, 9, 9,
        // a node with 7 pointer pointing back to the root node
        0b01111111,
        0, 0, 0, 0, 0, 0, 0
    ]));
  }

  static generateCrossFractal(svdag: SVDAG): SVDAG {
    svdag.renderPreferences = {
      renderMode: RenderMode.PATH_TRACING,
      maxIterations: 30,
      spawnPosition: vec3.fromValues(150, 150, 150),
      moveSpeed: 16,
    };

    // Cross fractal: Similar to cube fractal, but root has 8 rotated variants of its child node

    return SceneProvider.generateBaseFractal(
      svdag,
      9,
      new Uint32Array([
        // root node: all child pointers set
        0b11111111,
        // 8 pointers, all pointing to a unique node (each of size 5)
        ...Array.from(Array(8).keys()).map((i: number) => (9 + i * 8)),
        // 8 nodes, each with 7 pointers that point to the root node
        0b01111111,
        0, 0, 0, 0, 0, 0, 0,
        0b10111111,
        0, 0, 0, 0, 0, 0, 0,
        0b11011111,
        0, 0, 0, 0, 0, 0, 0,
        0b11101111,
        0, 0, 0, 0, 0, 0, 0,
        0b11110111,
        0, 0, 0, 0, 0, 0, 0,
        0b11111011,
        0, 0, 0, 0, 0, 0, 0,
        0b11111101,
        0, 0, 0, 0, 0, 0, 0,
        0b11111110,
        0, 0, 0, 0, 0, 0, 0,
    ]));
  }

  static generateMengerSpongeFractal(svdag: SVDAG): SVDAG {
    svdag.renderPreferences = {
      renderMode: RenderMode.PATH_TRACING,
      maxIterations: 30,
      spawnPosition: vec3.fromValues(150, 150, 150),
      moveSpeed: 16,
    };
    // Menger sponge: A 4^3 cube with a hole on each face
    // (the real menger sponge is of 3^3 but can't really do that here, since each octree node is of size 2^3)

    return SceneProvider.generateBaseFractal(
      svdag,
      5,
      new Uint32Array([
        // root node: all child pointers set
        0b11111111,
        // 8 pointers, all pointing to a unique node (each of size 5)
        ...Array.from(Array(8).keys()).map((i: number) => (9 + i * 5)),
        // 8 nodes, each with 7 pointers that point to the root node
        0b11101000,
        0, 0, 0, 0,
        0b11010100,
        0, 0, 0, 0,
        0b10110010,
        0, 0, 0, 0,
        0b01110001,
        0, 0, 0, 0,
        0b10001110,
        0, 0, 0, 0,
        0b01001101,
        0, 0, 0, 0,
        0b00101011,
        0, 0, 0, 0,
        0b00010111,
        0, 0, 0, 0,
      ]));
  }
}