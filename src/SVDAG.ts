import { vec3, quat, mat4 } from 'gl-matrix';

import Camera from './Camera';
import { IRendererState } from './Renderer';

function bitCount(num: number) {
  let n = num;
  n = ((0xaa & n) >> 1) + (0x55 & n);
  n = ((0xcc & n) >> 2) + (0x33 & n);
  n = ((0xf0 & n) >> 4) + (0x0f & n);
  return n;
}

const dec2bin = (dec: number) => (dec >>> 0).toString(2);

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
  // Since the `nodes` array might get padded, store the original amount of data in here
  originalNodeLength: number;

  initialized = false;
  // byte offset (not 32 bit ints, but bytes)
  dataLoadedOffset = 0;

  renderPreferences: Partial<IRendererState & { spawnPosition: vec3; moveSpeed: number }> = {};

  load(buffer: ArrayBuffer) {
    // Header
    const i = this.parseHeader(buffer);

    // Nodes
    this.nodes.set(new Uint32Array(buffer.slice(i)));

    return this;
  }

  parseHeader(buffer: ArrayBuffer) {

    let i = 0;
    vec3.copy(this.bboxStart, new Float32Array(buffer.slice(i, i + 12))); // first 12 bytes is bbox start
    i += 12;
    vec3.copy(this.bboxEnd, new Float32Array(buffer.slice(i, i + 12))); // second 12 bytes is bbox end
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
    this.originalNodeLength = nodeBufLength;
    i += 4;

    this.nodes = new Uint32Array(nodeBufLength);

    // Fix for some scenes I built personally with a too big BBOX
    const maxBboxSz = 25000;
    if (vec3.len(this.bboxStart) === 0 && vec3.len(this.bboxEnd) > maxBboxSz) {
      console.log('Correcting large bbox (scaling 20x down)');

      vec3.div(this.bboxEnd, this.bboxEnd, vec3.fromValues(10, 10, 10));
      vec3.sub(this.bboxStart, this.bboxStart, vec3.fromValues(0.1, 0.1, 0.1));
      this.rootSide /= 10;
      // vec3.sub(this.bboxEnd, this.bboxEnd, vec3.fromValues(maxBboxSz, maxBboxSz, maxBboxSz));
    }

    // Utils
    vec3.sub(this.bboxCenter, this.bboxEnd, this.bboxStart);
    vec3.scaleAndAdd(this.bboxCenter, this.bboxStart, this.bboxCenter, 0.5);



    return i;
  }

  loadChunk(buffer: Uint8Array) {
    if (!this.initialized) {
      const lastOffset = this.parseHeader(buffer.buffer);
      this.initialized = true;

      if ((buffer.length - lastOffset) / 4 !== this.nodes.length) {
        // If the first chunk is not the whole scene, set all bytes to full (max 32 bit signed int: TODO: unsigned)
        // In the renderer, this indicates that these should be counted as intersections immediately
        this.nodes.fill(Math.pow(2, 31) - 1);
      }

      // The rest of this chunk is node data, can be loaded as another chunk
      this.loadChunk(buffer.slice(lastOffset));
    } else {
      // console.log(`Loading chunk containing ${buffer.length} bytes...`);
      this.nodes.set(new Uint32Array(buffer.buffer), this.dataLoadedOffset / 4);
      this.dataLoadedOffset += buffer.length;
    }
  }

  castRay(o: vec3, d: vec3, maxIters = 100): { nodeIndex: number; hitPos: vec3; maxRayLength: number } | null {
    // const stack: number[] = []; // TODO: Reuse list of traversed node indices per level 
    
    // TODO: Find intersection of ray with next node instead of naively stepping with a small step size
    const stepSize = this.rootSide / Math.pow(2, this.nLevels - 1);

    const p = vec3.copy(vec3.create(), o);
    for (let i = 0; i < maxIters; i++) {
      vec3.scaleAndAdd(p, p, d, stepSize);
      const node = this.getVoxel(p);
      if (node) {
        return { ...node, maxRayLength: stepSize * maxIters };
      }
    }
    return null;
  }

  getVoxel(pos: vec3): { nodeIndex: number; hitPos: vec3 } | null {
    // Transform world position to the [0, 1] range
    // const gridPos = vec3.scale(vec3.create(), pos, 1 / (2 * this.rootSide));
    const nodeCenter = vec3.create();
    vec3.copy(nodeCenter, this.bboxCenter);

    let nodeIndex = 0;

    let hs = this.rootSide / 2;

    for (let lev = 0; lev < this.nLevels; lev++) {
      // console.log(lev, vec3.scale(vec3.create(), nodeCenter, 1 / this.rootSide));
      const childIndex = (pos[0] > nodeCenter[0] ? 4 : 0)
                       + (pos[1] > nodeCenter[1] ? 2 : 0)
                       + (pos[2] > nodeCenter[2] ? 1 : 0);

      const header = this.nodes[nodeIndex];

      const hasChild = (header & (1 << childIndex)) !== 0;
      if (!hasChild) {
        return null;
      } else if (lev === this.nLevels - 1) {
        return { nodeIndex, hitPos: nodeCenter };
      }

      hs /= 2;

      nodeCenter[0] += (pos[0] > nodeCenter[0]) ? hs : -hs;
      nodeCenter[1] += (pos[1] > nodeCenter[1]) ? hs : -hs;
      nodeCenter[2] += (pos[2] > nodeCenter[2]) ? hs : -hs;
      
      const childPtrOffset = bitCount(header >> childIndex);
      nodeIndex = this.nodes[nodeIndex + childPtrOffset];
    }
    return null;
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
    vec3.copy(this.bboxStart, new Float32Array(buffer.slice(i, i + 12))); // first 12 bytes is bbox start
    i += 12;
    vec3.copy(this.bboxEnd, new Float32Array(buffer.slice(i, i + 12))); // second 12 bytes is bbox end
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


