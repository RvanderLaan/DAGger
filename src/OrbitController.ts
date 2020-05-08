import { vec3, mat4, vec2, glMatrix } from "gl-matrix";
import Camera from "./Camera";

interface IKeyDownStatus {
  [key: string]: boolean;
}

export class OrbitController {

  radius: number;

  keyDownStatus: IKeyDownStatus;

  prevMousePos: vec2 = vec2.create();
  mousePos: vec2 = vec2.create();

  constructor(
    public camera: Camera,
    public moveSpeed: number,
  ) {
    this.radius = vec3.dist(this.camera.position, this.camera.target);
    this.keyDownStatus = {};

    vec3.normalize(
      this.tmpDir, 
      vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
  }

  // cached variable that can be reused in between update calls to store the movement direction into
  tmpDir: vec3 = vec3.create();
  tmpRotMat = mat4.create();
  update(dt: number) {
    let updated = false;

    if (this.keyDownStatus['shift']) {
      dt *= 10;
    }

    if (this.keyDownStatus['w']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      this.moveInDirection(this.tmpDir, this.moveSpeed * dt);
    } 
    if (this.keyDownStatus['s']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
        this.moveInDirection(this.tmpDir, -this.moveSpeed * dt);
    }
    
    if (this.keyDownStatus['a']) {
      updated = true;
      vec3.cross(this.tmpDir,
        vec3.normalize(
          this.tmpDir, 
          vec3.sub(this.tmpDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
        this.moveInDirection(this.tmpDir, this.moveSpeed * dt);
    }
    if (this.keyDownStatus['d']) {
      updated = true;
      vec3.cross(this.tmpDir,
        vec3.normalize(
          this.tmpDir, 
          vec3.sub(this.tmpDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
        this.moveInDirection(this.tmpDir, -this.moveSpeed * dt);
    }

    if (this.keyDownStatus['q']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      this.rotateAlongLocalY(0.5, dt);
    }
    if (this.keyDownStatus['e']) {
      updated = true;
      vec3.normalize(
        this.tmpDir, 
        vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
      this.rotateAlongLocalY(0.5, -dt);
    }

    if (this.keyDownStatus['mouse-0']) {
      updated = true;
      const delta = vec2.subtract(vec2.create(), this.prevMousePos, this.mousePos);
      vec2.divide(delta, delta, [document.documentElement.clientWidth, document.documentElement.clientHeight]);

      const lookSpeed = 5;

      this.rotateAlongLocalY(delta[0], lookSpeed);
      this.rotateAlongLocalX(delta[1], -lookSpeed);
    }

    if (updated) {
      this.camera.updateMatrices();
    }
    this.prevMousePos.set(this.mousePos);
  }

  moveInDirection(dir: vec3, speed: number) {
    vec3.scaleAndAdd(this.camera.position, this.camera.position, dir, speed);
    vec3.scaleAndAdd(this.camera.target, this.camera.target, dir, speed);
  }

  rotateAlongLocalY(amount: number, speed: number) {
    const mat = mat4.rotate(mat4.create(), mat4.identity(mat4.create()), amount * speed, this.camera.upDir);
    vec3.transformMat4(this.tmpDir, this.tmpDir, mat);
    vec3.scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
  }

  rotateAlongLocalX(amount: number, speed: number) {
    const forward = vec3.subtract(vec3.create(), this.camera.target, this.camera.position);
    vec3.normalize(forward, forward);

    const localX = vec3.create();
    vec3.cross(localX, this.camera.upDir, forward);

    mat4.rotate(this.tmpRotMat, mat4.identity(this.tmpRotMat), amount * speed, localX);
    vec3.transformMat4(this.tmpDir, this.tmpDir, this.tmpRotMat);
    vec3.scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
  }

  rotateAroundPivot(dir: vec2) {
    
  }

  onKeyDown(e: KeyboardEvent) {
    this.keyDownStatus[e.key.toLocaleLowerCase()] = true;
  }

  onKeyUp(e: KeyboardEvent) {
    this.keyDownStatus[e.key.toLocaleLowerCase()] = false;
  }

  onMouseDown(e: MouseEvent) {
    this.keyDownStatus[`mouse-${e.button}`] = true;
    this.prevMousePos.set([e.clientX, e.clientY]);
  }
  
  onMouseUp(e: MouseEvent) {
    this.keyDownStatus[`mouse-${e.button}`] = false;
  }

  onMouseMove(e: MouseEvent) {
    this.mousePos.set(vec2.fromValues(e.clientX, e.clientY));
  }

  onMouseWheel(e: WheelEvent) {
    // TODO: Need proper 2 way binding from ui and state
    (window as any).setMoveSpeed(this.moveSpeed *= e.deltaY < 0 ? 1.1 : 0.9);
  }
}

export default OrbitController;
