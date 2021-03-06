import { vec3, mat4, vec2, glMatrix } from "gl-matrix";
import Camera from "./Camera";
import { SVDAG } from "./SVDAG";

interface IKeyDownStatus {
  [key: string]: boolean;
}

export class OrbitController {

  radius: number;

  keyDownStatus: IKeyDownStatus;
  numTouches: number; // amount of touches for touchscreens

  prevMousePos: vec2 = vec2.create();
  mousePos: vec2 = vec2.create();

  // cached variable that can be reused in between update calls to store the movement direction into
  tmpDir: vec3 = vec3.create();

  constructor(
    public camera: Camera,
    public moveSpeed: number,
    // public scene: SVDAG,
  ) {
    this.keyDownStatus = {};
    this.radius = vec3.dist(this.camera.position, this.camera.target);

    vec3.normalize(
      this.tmpDir, 
      vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
  }

  init() {
    this.radius = vec3.dist(this.camera.position, this.camera.target);

    vec3.normalize(
      this.tmpDir, 
      vec3.sub(this.tmpDir, this.camera.target, this.camera.position));
  }

  handleClick(pos: Readonly<vec2>) {
    const forward = vec3.subtract(vec3.create(), this.camera.target, this.camera.position);
    // this.scene.castRay(this.camera.position, forward)
  }

  /**
   * 
   * @param dt Delta time (milliseconds since previous frame)
   * @returns Whether an update has occured (camera or scene changed)
   */
  update(dt: number): boolean {
    let updated = false;

    if (this.keyDownStatus['shift']) {
      dt *= 10;
    }

    const tmpKeyDir = vec3.create();
    // tmpKeyDir.set(this.tmpDir);

    if (this.keyDownStatus['w'] || this.numTouches === 2) { // move forward with 2 fingers
      updated = true;
      vec3.normalize(
        tmpKeyDir, 
        vec3.sub(tmpKeyDir, this.camera.target, this.camera.position));
      this.moveInDirection(tmpKeyDir, this.moveSpeed * dt);
    } 
    if (this.keyDownStatus['s']) {
      updated = true;
      vec3.normalize(
        tmpKeyDir, 
        vec3.sub(tmpKeyDir, this.camera.target, this.camera.position));
        this.moveInDirection(tmpKeyDir, -this.moveSpeed * dt);
    }
    
    if (this.keyDownStatus['a']) {
      updated = true;
      vec3.cross(tmpKeyDir,
        vec3.normalize(
          tmpKeyDir, 
          vec3.sub(tmpKeyDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
        this.moveInDirection(tmpKeyDir, this.moveSpeed * dt);
    }
    if (this.keyDownStatus['d']) {
      updated = true;
      vec3.cross(tmpKeyDir,
        vec3.normalize(
          tmpKeyDir, 
          vec3.sub(tmpKeyDir, this.camera.position, this.camera.target)),
        this.camera.upDir);
        this.moveInDirection(tmpKeyDir, -this.moveSpeed * dt);
    }

    if (this.keyDownStatus['q']) {
      updated = true;
      vec3.normalize(
        tmpKeyDir, 
        vec3.sub(tmpKeyDir, this.camera.target, this.camera.position));
      this.rotateAlongLocalY(0.5, dt);
    }
    if (this.keyDownStatus['e']) {
      updated = true;
      vec3.normalize(
        tmpKeyDir, 
        vec3.sub(tmpKeyDir, this.camera.target, this.camera.position));
      this.rotateAlongLocalY(0.5, -dt);
    }

    if (this.keyDownStatus['mouse-0']) {
      // Only update camera matrix if mouse moved
      const delta = vec2.subtract(vec2.create(), this.prevMousePos, this.mousePos);
      if (delta[0] !==  0 || delta[1] !== 0) {
        updated = true;
        vec2.divide(delta, delta, [document.documentElement.clientWidth, document.documentElement.clientHeight]);
        const lookSpeed = 5;
  
        this.rotateAlongLocalY(delta[0], lookSpeed);
        this.rotateAlongLocalX(delta[1], -lookSpeed);
      }
    }

    // if (updated) {
      this.camera.updateMatrices();
    // }
    vec2.copy(this.prevMousePos, this.mousePos);
    return updated;
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

    const mat = mat4.create();
    mat4.rotate(mat, mat4.identity(mat), amount * speed, localX);
    vec3.transformMat4(this.tmpDir, this.tmpDir, mat);
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
    vec2.set(this.prevMousePos, e.clientX, e.clientY);
    vec2.copy(this.mousePos, this.prevMousePos);

    // console.log(this.camera.viewMatInv, this.camera.projMatInv);

    this.handleClick(this.mousePos);
  }
  onTouchStart(e: TouchEvent) {
    this.keyDownStatus[`mouse-0`] = true;
    vec2.set(this.prevMousePos, e.touches[0].clientX, e.touches[0].clientY);
    vec2.copy(this.mousePos, this.prevMousePos);
    this.numTouches = e.touches.length;
  }
  
  onMouseUp(e: MouseEvent) {
    this.keyDownStatus[`mouse-${e.button}`] = false;
  }
  onTouchEnd(e: TouchEvent) {
    this.keyDownStatus[`mouse-0`] = false;
    this.numTouches = 0;
  }

  onMouseMove(e: MouseEvent) {
    vec2.set(this.mousePos, e.clientX, e.clientY);
  }
  onTouchMove(e: TouchEvent) {
    vec2.set(this.mousePos, e.touches[0].clientX, e.touches[0].clientY);
    this.numTouches = e.touches.length;
  }

  onMouseWheel(e: WheelEvent) {
    // TODO: Need proper 2 way binding from ui and state
    (window as any).setMoveSpeed(this.moveSpeed *= e.deltaY < 0 ? 1.1 : 0.9);
  }
}

export default OrbitController;
