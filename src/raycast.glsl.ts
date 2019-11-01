export default `
attribute vec4 position;
uniform mat4 matrix;
void main() {
  gl_Position = matrix * position;
}
`;