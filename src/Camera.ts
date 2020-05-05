import { vec3, quat, mat4 } from 'gl-matrix';

class Camera {
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
    // TODO: Recompute upDir
  }



  // Updates the camera position from the view matrix
  updatePosition() {
    const forward = vec3.subtract(vec3.create(), this.position, this.target);
    // const radius = vec3.len(forward);
    // vec3.normalize(forward, forward);
    console.log(forward);
    vec3.transformMat4(this.position, forward, this.viewMat);
    vec3.add(this.position, this.position, this.target);
  }
}

export default Camera;
