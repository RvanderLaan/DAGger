#version 300 es

precision highp float;

uniform sampler2D depthTex;
uniform mat4 viewProjMatInv;

out vec3 fragColor;

// Implementation of this article
// https://wickedengine.net/2019/09/22/improved-normal-reconstruction-from-depth/
// Just the naive implementation now, still improvements possible (sampling neighboring pixels in a cross pattern)

vec3 reconstructPosition(in vec2 uv, in float z) {
  float x = uv.x * 2.0f - 1.0f;
  float y = uv.y * 2.0f - 1.0f;
  vec4 position_s = vec4(x, y, z, 1.0f);
  vec4 position_v = viewProjMatInv * position_s;
  return position_v.xyz / position_v.w;
}

// Estimates the normal direciton of a fragment based on its depth. Also returns depth as 4th component
vec3 getNormal(in vec2 p) {
  vec2 uv0 = vec2(p.x, p.y); // center
  vec2 uv1 = vec2(p.x + 1., p.y); // right
  vec2 uv2 = vec2(p.x, p.y + 1.); // top

  // Find depths at this and neighboring pixels
	float depth0 = texelFetch(depthTex, ivec2(uv0), 0).x;
	float depth1 = texelFetch(depthTex, ivec2(uv1), 0).x;
	float depth2 = texelFetch(depthTex, ivec2(uv2), 0).x;

  // Compute 3D position of these depths relative to the camera
  // TODO: This won't be needed when the hitPosTex is available
  vec3 P0 = reconstructPosition(uv0, depth0);
  vec3 P1 = reconstructPosition(uv1, depth1);
  vec3 P2 = reconstructPosition(uv2, depth2);

  vec3 normal = normalize(cross(P2 - P0, P1 - P0));

  return normal;
}

void main() {
  fragColor = getNormal(gl_FragCoord.xy);
}
