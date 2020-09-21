import { vec3, quat, mat4, vec2, vec4 } from 'gl-matrix';

class Camera {
  position: vec3 = vec3.create();
  target: vec3 = vec3.create();
  upDir: vec3 = vec3.create();

  fovY: number;

  viewMat: mat4 = mat4.create();
  viewMatInv: mat4 = mat4.create();
  projMat: mat4 = mat4.create();
  projMatInv: mat4 = mat4.create();
  
  camMatInv: mat4 = mat4.create();
  prevCamMat: mat4 = mat4.create();

  constructor(fov = 60) {
    this.fovY = fov * 3.14159265359 / 180.0;
    vec3.set(this.upDir, 0, 1, 0); // positive-Y up by default
  }

  fromHomog(v: vec4) {
    return vec3.divide(
      vec3.create(),
      vec3.fromValues(v[0], v[1], v[2]),
      vec3.fromValues(v[3], v[3], v[3]));
  }

  updateMatrices() {
    mat4.invert(this.prevCamMat, this.camMatInv);
    mat4.lookAt(this.viewMat, this.position, this.target, this.upDir);
    mat4.perspective(this.projMat, this.fovY, window.innerWidth / window.innerHeight, 0.1, 1);
    mat4.invert(this.projMatInv, this.projMat);
    mat4.invert(this.viewMatInv, this.viewMat);
    mat4.mul(this.camMatInv, this.viewMatInv, this.projMatInv);
    // TODO: Recompute upDir
  }

  computeCameraRay(screenCoords: vec2) {
    const pixel_s0 = vec4.fromValues(screenCoords[0], screenCoords[1], 0, 1);
    const pixel_s1 = vec4.fromValues(screenCoords[0], screenCoords[1], 1, 1);
    
    const pixel_w0 = this.fromHomog(vec4.transformMat4(vec4.create(), pixel_s0, this.projMatInv));
    const pixel_w1 = this.fromHomog(vec4.transformMat4(vec4.create(), pixel_s1, this.projMatInv));
    
    const r = {
      o: vec3.fromValues(0,0,0),
      d: vec3.normalize(vec3.create(), vec3.subtract(vec3.create(), pixel_w1, pixel_w0)),
    };
    
    const o_prime = vec4.transformMat4(vec4.create(), vec4.fromValues(r.o[0], r.o[1], r.o[2], 1), this.viewMatInv);
    const e_prime = vec4.transformMat4(vec4.create(), vec4.fromValues(r.d[0], r.d[1], r.d[2], 1), this.viewMatInv);
    // r.o = vec3.normalize(vec3.create(), vec3.from(o_prime.values()));
    // r.d = normalize(e_prime - o_prime);
    return r;
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
