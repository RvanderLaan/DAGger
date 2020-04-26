import { vec3, quat, mat4 } from 'gl-matrix';

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
    const nodeCount = new Uint32Array(buffer.slice(i, i + 4))[0];
    i += 4;
    this.nodes = new Uint32Array(buffer.slice(i, i + nodeCount * 4));
    i += nodeCount * 4;
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

    // Utils
    vec3.sub(this.bboxCenter, this.bboxEnd, this.bboxStart);
    vec3.scaleAndAdd(this.bboxCenter, this.bboxStart, this.bboxCenter, 0.5);

    return i;
  }

  loadChunk(buffer: Uint8Array) {
    if (!this.initialized) {
      const lastOffset = this.parseHeader(buffer.buffer);
      this.nodes = new Uint32Array(this.nNodes);
      this.initialized = true;

      console.log('nnodes: ', this.nNodes);

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

export class Camera {
  position: vec3 = vec3.create();
  target: vec3 = vec3.create();
  upDir: vec3 = vec3.create();

  fovY: number;

  viewMat: mat4 = mat4.create();
  viewMatInv: mat4 = mat4.create();
  projMat: mat4 = mat4.create();
  projMatInv: mat4 = mat4.create();

  constructor() {
    this.fovY = 60.0 * 3.14159265359 / 180.0;
    vec3.set(this.upDir, 0, 1, 0); // y-up by default
  }

  updateMatrices() {
    mat4.lookAt(this.viewMat, this.position, this.target, this.upDir);
    mat4.perspective(this.projMat, this.fovY, window.innerWidth / window.innerHeight, 0.1, 1);
    mat4.invert(this.projMatInv, this.projMat);
    mat4.invert(this.viewMatInv, this.viewMat);
  }
}

interface IKeyDownStatus {
  [key: string]: boolean;
}

export class OrbitController {

  radius: number;

  keyDownStatus: IKeyDownStatus

  constructor(
    public camera: Camera,
    public moveSpeed: number,
  ) {
    this.radius = vec3.dist(this.camera.position, this.camera.target);
    this.keyDownStatus = {};
  }

  tmpDir: vec3 = vec3.create();
  update(dt: number) {
    let updated = false;

    if (this.keyDownStatus['shift']) {
      dt *= 2;
    }

    if (this.keyDownStatus['w']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      vec3.scaleAndAdd(this.camera.position, this.camera.position, this.tmpDir, this.moveSpeed * dt);
      vec3.scaleAndAdd(this.camera.target, this.camera.target, this.tmpDir, this.moveSpeed * dt);
    } 
    if (this.keyDownStatus['s']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      vec3.scaleAndAdd(this.camera.position, this.camera.position, this.tmpDir, -this.moveSpeed * dt);
      vec3.scaleAndAdd(this.camera.target, this.camera.target, this.tmpDir, -this.moveSpeed * dt);
    }
    
    if (this.keyDownStatus['a']) {
      updated = true;
      vec3.cross(this.tmpDir,
        vec3.normalize(
          this.tmpDir, 
          vec3.sub(this.tmpDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
      vec3.scaleAndAdd(this.camera.position, this.camera.position, this.tmpDir, this.moveSpeed * dt);
      vec3.scaleAndAdd(this.camera.target, this.camera.target, this.tmpDir, this.moveSpeed * dt);
    }
    if (this.keyDownStatus['d']) {
      updated = true;
      vec3.cross(this.tmpDir,
        vec3.normalize(
          this.tmpDir, 
          vec3.sub(this.tmpDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
      vec3.scaleAndAdd(this.camera.position, this.camera.position, this.tmpDir, -this.moveSpeed * dt);
      vec3.scaleAndAdd(this.camera.target, this.camera.target, this.tmpDir, -this.moveSpeed * dt);
    }

    if (this.keyDownStatus['q']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      
      const rotMat = mat4.create();
      mat4.rotate(rotMat, mat4.identity(rotMat), dt * 0.5, this.camera.upDir);
      vec3.transformMat4(this.tmpDir, this.tmpDir, rotMat);
      vec3.scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
    }
    if (this.keyDownStatus['e']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      
      const rotMat = mat4.create();
      mat4.rotate(rotMat, mat4.identity(rotMat), -dt * 0.5, this.camera.upDir);
      vec3.transformMat4(this.tmpDir, this.tmpDir, rotMat);
      vec3.scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
    }

    if (updated) {
      this.camera.updateMatrices();
    }
  }

  onKeyDown(e: KeyboardEvent) {
    this.keyDownStatus[e.key.toLocaleLowerCase()] = true;
  }

  onKeyUp(e: KeyboardEvent) {
    this.keyDownStatus[e.key.toLocaleLowerCase()] = false;

  }

  onMouseDown(e: MouseEvent) {

  }
  
  onMouseUp(e: MouseEvent) {

  }
}

