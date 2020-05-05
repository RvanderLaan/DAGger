import { vec3, quat, mat4 } from 'gl-matrix';

import Camera from './Camera';

export abstract class EncodedOctree {
  bboxStart: vec3 = vec3.create()
  bboxEnd: vec3 = vec3.create();
  bboxCenter: vec3 = vec3.create();
  rootSide: number;
  nLevels: number;
  nNodes: number;
}

export class SVDAG extends EncodedOctree {
  nodes: Uint32Array;

  initialized: boolean = false;
  nodesLoadedOffset: number = 0;

  load(buffer: ArrayBuffer) {
    // Header
    let i = this.parseHeader(buffer);

    // Nodes
    this.nodes.set(new Uint32Array(buffer.slice(i)));
  }

  parseHeader(buffer: ArrayBuffer) {

    let i = 0;
    this.bboxStart.set(new Float32Array(buffer.slice(i, i + 12))); // first 12 bytes is bbox start
    i += 12;
    this.bboxEnd.set(new Float32Array(buffer.slice(i, i + 12))); // second 12 bytes is bbox end
    i += 12;
    this.rootSide = new Float32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.nLevels = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.nNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    const firstLeafPointer = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    const nodeBufLength = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;

    this.nodes = new Uint32Array(nodeBufLength);

    // Utils
    vec3.sub(this.bboxCenter, this.bboxEnd, this.bboxStart);
    vec3.scaleAndAdd(this.bboxCenter, this.bboxStart, this.bboxCenter, 0.5);

    return i;
  }

  loadChunk(buffer: Uint8Array) {
    console.log('buf length', buffer.length);
    if (!this.initialized) {
      const lastOffset = this.parseHeader(buffer.buffer);
      this.initialized = true;

      console.log('parsed hdr');

      console.log('nnodes: ', this.nNodes);

      console.log('first offset: ', lastOffset);

      this.loadChunk(buffer.slice(lastOffset));
    } else {
      console.log(`Loading chunk containing ${buffer.length / 4} nodes...`);
      this.nodes.set(new Uint32Array(buffer.buffer), this.nodesLoadedOffset);
      this.nodesLoadedOffset += buffer.byteLength / 4;
    }
  }
}

export class ESVDAG extends EncodedOctree {
  innerNodes: Uint16Array;
  leafNodes: BigUint64Array;
  levelOffsets: Uint32Array;

  load(buffer: ArrayBuffer) {
    console.log(`Loading SVDAG (${buffer.byteLength} bytes)`);

    // Header
    let i = 0;
    this.bboxStart.set(new Float32Array(buffer.slice(i, i + 12))); // first 12 bytes is bbox start
    i += 12;
    this.bboxEnd.set(new Float32Array(buffer.slice(i, i + 12))); // second 12 bytes is bbox end
    i += 12;
    const rootSide = new Float32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.nLevels = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    const nNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
  
    // Inner nodes
    const nInnerNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.innerNodes = new Uint16Array(buffer.slice(i, i + 2 * nInnerNodes)); // 16 bytes = 2 * 8 bits
    i += 2 * nInnerNodes;

    // Leaf nodes
    const nLeafNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.leafNodes = new BigUint64Array(buffer.slice(i, i + 8 * nLeafNodes));
    i += 8 * nLeafNodes;

    // Level offsets
    const nLevelOffsets = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.levelOffsets = new Uint32Array(buffer.slice(i, i + nLevelOffsets * 4));
    i += nLevelOffsets * 4;

    console.log('OK!');
  }

}


