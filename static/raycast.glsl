// First few lines will be replaced with #defines
#define INNER_LEVELS 0u
#define TEX3D_SIZE 0
#define TEX3D_SIZE_POW2 0
#define VIEWER_MODE 1
#define DEPTH_MODE 1
#define PATH_TRACE_MODE 1

#define MAX_STACK_DEPTH (INNER_LEVELS+1u)

precision highp float;

out vec4 fragColor;

uniform float time;
uniform vec2 resolution;

uniform mat4 viewMatInv;
uniform mat4 projMatInv;

uniform vec3 sceneBBoxMin;
uniform vec3 sceneBBoxMax;
uniform vec3 sceneCenter;
uniform float rootHalfSide;

uniform uint maxIters;
uniform uint drawLevel;
uniform float projectionFactor;

uniform highp usampler3D nodes;

uniform int viewerRenderMode;
uniform uint selectedVoxelIndex;
uniform bool uniqueColors;
uniform vec3 lightPos;
uniform bool enableShadows;
uniform float normalEpsilon;

uniform bool useBeamOptimization;
uniform sampler2D minDepthTex;  
uniform sampler2D depthTex;     // is depth tex even needed when hitPosTex is available? 
                                // Ah yes it is, it's used to get cellSize as well, not just depth. 
                                // TODO: Rename to primaryVisibilityTexture? primVisTex?
uniform sampler2D hitNormTex;      // this one does not need to be 32 bit float, always a unit vector
uniform sampler2D hitPosTex;    // this one does need 32 bit high accuracy

// uniform uint levelOffsets[INNER_LEVELS];

ivec3 stack[MAX_STACK_DEPTH];
uint stack_size = 0u;

struct Ray {
  vec3 o;
  vec3 d;
};

struct traversal_status {
  float t_current;
  int node_index;
  uint hdr;
  ivec3 mirror_mask;
  uvec2 leaf_data;
  
  ivec3 idx; 
  ivec3 local_idx;  uint child_linear_index; // Could be merged
  vec3 t_next_crossing; // exit of current voxel on x,y,z
  vec3 inv_ray_d;
  ivec3 delta_idx;
  int current_node_size;
  
  float cell_size;
  uint level;
};

// TODO: Get rid of mirror mask stuff
void stack_push(in int node, in uint hdr, in ivec3 mirror_mask, in uint level) {
  int mask = int(level << 3);
  stack[stack_size] = ivec3(node, hdr, mask);
  ++stack_size;
}

void stack_pop_in(out int node, out uint hdr, out ivec3 mirror_mask, out uint level) {
  --stack_size;
  ivec3 node_mask = stack[stack_size];
  node = (node_mask.x);
  hdr = uint(node_mask.y);
  int mask = node_mask.z;
  mirror_mask = ivec3(mask & 1, (mask >> 1) & 1, (mask >> 2) & 1);
  level = uint(mask >> 3) & 255u;
}

bool stack_is_empty() {
  return stack_size == 0u;
}

uint voxel_to_linear_idx(in ivec3 mirror_mask, in ivec3 idx, in int sz) {
  idx = (ivec3(1) - 2 * mirror_mask) * idx + mirror_mask * (sz-1);
  return uint(idx.z + sz * (idx.y + sz * idx.x));
}


// SVDAG data fetching
#define LEAF_SIZE 2

uint myFetch(in int idx) {
  return texelFetch( nodes, 
    ivec3(
      idx % TEX3D_SIZE,
      (idx/TEX3D_SIZE) % TEX3D_SIZE,
      idx/(TEX3D_SIZE_POW2)
    ), 0
  ).x;
}

bool fetch_voxel_bit(in traversal_status ts) {
  return (ts.hdr & (1u << ts.child_linear_index)) != 0u;
}

void fetch_data(inout traversal_status ts) {
  ts.hdr = myFetch(ts.node_index);
}

// Counts amount of bits in 8 bit int
uint bitCount(in uint num) {
  uint n = num;
  n = ((0xaau & n) >> 1) + (0x55u & n);
  n = ((0xccu & n) >> 2) + (0x33u & n);
  n = ((0xf0u & n) >> 4) + (0x0fu & n);
  return n;
}

void fetch_child_index_in(inout traversal_status ts) {
  uint childPtrPos = bitCount((ts.hdr & 0xFFu) >> ts.child_linear_index);
  ts.node_index = int(myFetch(ts.node_index + int(childPtrPos)));
}


///////////////////////////// DDA PRIMITIVES

bool in_bounds(in ivec3 local_idx, in int sz) { 
  bvec3 cond0 = lessThan(local_idx, ivec3(sz));
  bvec3 cond1 = lessThanEqual(ivec3(0), local_idx);
  return cond0.x && cond0.y && cond0.z && cond1.x && cond1.y && cond1.z;
}

vec2 intersectAABB(in Ray r, in vec3 aabbMin, in vec3 aabbMax) {
  vec3 t1 = (aabbMin - r.o)/r.d;
  vec3 t2 = (aabbMax - r.o)/r.d;
  vec3 tMin = min(t1, t2);
  vec3 tMax = max(t1, t2);

  vec2 t = vec2(max(max(tMin.x, 0.0), max(tMin.y, tMin.z)), min(tMax.x, min(tMax.y, tMax.z)));
  return t;
}

bool resolution_ok(float t, float cell_size, float projection_factor) {
  return (cell_size * projection_factor) < t;
}

// ==========================================================================

void dda_init(in Ray r, inout traversal_status ts) {
  // Init dda FIXME USE OCTREE POINT LOCATION
  const float voxel_eps = 1.0f/(256.*1024.);
  vec3 p_a = r.o + (ts.t_current + voxel_eps) * r.d; // find current pos
  ts.idx = ivec3(p_a / ts.cell_size); // current global grid voxel
  
  // During initialization do not step back for dir < 0, because it would move of more than once cell
  ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
  ivec3 idx_next = ts.idx + delta_idx_conservative;
  vec3 p_next_a = vec3(idx_next) * ts.cell_size;	// this should be the plane
  
  ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
  ts.local_idx = ts.idx % 2;
}

// https://stackoverflow.com/questions/24599502/is-there-a-built-in-function-in-glsl-for-and-or-is-there-some-optimized-method-f
bvec3 bvec3_and(const bvec3 one, const bvec3 two) {
  return bvec3(uvec3(one) & uvec3(two));
}

// Returns the direction of the step
ivec3 dda_next(inout traversal_status ts) {
  bvec3 b1 = lessThan(ts.t_next_crossing.xyz, ts.t_next_crossing.yzx);
  bvec3 b2 = lessThanEqual(ts.t_next_crossing.xyz, ts.t_next_crossing.zxy);
  bvec3 mask = bvec3_and(b1, b2);
  vec3 mask_v3 = vec3(mask); 			
  
  //All components of mask are false except the one components to the shortest t_next_crossing
  // which is the direction in which the step have to be done
  ivec3 delta = ivec3(mask) * ts.delta_idx;
  ts.idx += delta;
  ts.local_idx += delta;
  
  ts.t_current = dot(mask_v3, ts.t_next_crossing);
  ts.t_next_crossing += mask_v3 * ts.cell_size * abs(ts.inv_ray_d);
  return delta;
}
        
ivec3 dda_next_delta_index(in traversal_status ts) {
  bvec3 b1 = lessThan(ts.t_next_crossing.xyz, ts.t_next_crossing.yzx);
  bvec3 b2 = lessThanEqual(ts.t_next_crossing.xyz, ts.t_next_crossing.zxy);
  bvec3 mask = bvec3_and(b1, b2);
  return ivec3(mask) * ts.delta_idx;
}

void up_in(in Ray r, inout traversal_status ts) {
  uint delta_level = ts.level;
  stack_pop_in(ts.node_index, ts.hdr, ts.mirror_mask, ts.level);
  delta_level -= ts.level;
  
  ts.idx >>= delta_level; // always delta_level >= 1
  ts.cell_size *= float(1u << delta_level); // float(cellSizeMod);
  ts.current_node_size = ts.level < INNER_LEVELS ? 2 : LEAF_SIZE;
  ts.local_idx = ts.idx & 1;
  
  ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
  ivec3 idx_next = ts.idx + delta_idx_conservative;
  vec3 p_next_a = vec3(idx_next) * ts.cell_size;	// this should be the plane
  ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
}

void go_down_one_level(in Ray r, inout traversal_status ts) {
  ++ts.level;
  ts.cell_size *= 0.5;
  
  // Init ts idx, t_next_crossing, local_idx using octree point location
  vec3 p_a = r.o + ts.t_current * r.d;		
  vec3 p_center = vec3(ts.idx * 2 + 1) * ts.cell_size;
  bvec3 child_pos = lessThan(p_center, p_a);
  ivec3 delta = ivec3(child_pos);
  ts.idx = ts.idx*2 + delta;
  
  ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
  ivec3 idx_next = ts.idx + delta_idx_conservative;
  vec3 p_next_a = vec3(idx_next) * ts.cell_size;	// this should be the plane
  
  ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
  ts.local_idx = ts.idx & (ts.current_node_size-1);
}

void down_in(in Ray r, inout traversal_status ts) {
  // Check/push next
  ivec3 local_idx = ts.local_idx;
  ivec3 delta = dda_next_delta_index(ts);    
  
  if (in_bounds(local_idx + delta, 2)) { 
    stack_push(ts.node_index, ts.hdr, ts.mirror_mask, ts.level); 
  }
    
  // Go down to next level: Fetch child index (store in node_idx)
  // and update accumulated_mirror_mask
  fetch_child_index_in(ts);
  
  go_down_one_level(r, ts);
  
  if (ts.level == INNER_LEVELS) {
    // GO TO LEAVES
    ts.current_node_size = LEAF_SIZE;
    int voxel_count = LEAF_SIZE / 2;
    while (voxel_count > 1) {
      go_down_one_level(r, ts);
      voxel_count >>= 1;
    }
  }
}


bool transform_ray(inout Ray r, inout vec2 t_min_max)  {
  const float epsilon = 1E-4f;
  vec3 sign_rd = sign(r.d);
  
  // Move ray to LOCAL box
  float scale = 1.0/(2.0 * rootHalfSide);
  vec3 octree_min = sceneCenter - vec3(rootHalfSide);
  vec3 octree_max = sceneCenter + vec3(rootHalfSide);
  r.o = r.o - octree_min;
  r.o *= scale;
  t_min_max *= scale;
  
  // avoid div by zero
  if (r.d.x * sign_rd.x < epsilon) r.d.x = sign_rd.x * epsilon;
  if (r.d.y * sign_rd.y < epsilon) r.d.y = sign_rd.y * epsilon;
  if (r.d.z * sign_rd.z < epsilon) r.d.z = sign_rd.z * epsilon;
  
  vec3 clip_box_min = (sceneBBoxMin - octree_min) * scale; 
  vec3 clip_box_max = (sceneBBoxMax - octree_min) * scale; 
  
  vec2 t_intersection = intersectAABB(r, clip_box_min, clip_box_max);
  
  t_min_max.x = max(t_intersection.x, t_min_max.x + 1e-10);
  t_min_max.y = min(t_intersection.y, t_min_max.y);
  
  return t_intersection.x < t_intersection.y;
}


void init(inout Ray r, inout traversal_status ts) {
  ts.inv_ray_d = vec3(1.0/r.d);
  vec3 sign_ray_d = sign(r.d);
  ts.delta_idx = ivec3(sign_ray_d);
  
  // Level status
  ts.mirror_mask = ivec3(0);
  ts.level = 0u;
  ts.cell_size = 0.5;
  
  // Step status
  dda_init(r, ts);
  ts.current_node_size = 2;
  
  ts.node_index = 0;
  fetch_data(ts);
  ts.child_linear_index =  voxel_to_linear_idx(ts.mirror_mask, ts.local_idx, ts.current_node_size);
}

/////////////////////////////////
// TRACE RAY
// returns vec3
//	X: intersection t
//		 >= 0 := intersection!
//		-1   := inside scene bbox, but no intersection
//		-2   := -2 out of t bounds
//		-3   := too many iterations used (> maxIters)
//		-4   := out of scene bbox
//	Y: level of the intersection (-1 => no intersection)
//	Z: num Iterations used.
//  W: node index (-1 => no intersection)
vec4 trace_ray(in Ray r, in vec2 t_min_max, const in float projection_factor, out vec3 norm) {
  
  if (!transform_ray(r, t_min_max)) {
    return vec4(-4.0,0,0,-1); // out of scene Bbox
  }
  
  float scale = 2.0 * rootHalfSide;
  traversal_status ts;
  ts.t_current = t_min_max.x;
  init(r, ts);

  float i = 0.;

  ivec3 stepDir = ivec3(0);
  
  uint iteration_count = 0u;
  uint max_level = min(INNER_LEVELS, drawLevel-1u);
  do {
    bool full_voxel = fetch_voxel_bit(ts);

    if (!full_voxel) {
      stepDir = dda_next(ts);
      if (!in_bounds(ts.local_idx, ts.current_node_size)) {
        if (stack_is_empty()) {
          return vec4(-1.,0, iteration_count,-1); // inside scene BBox, but no intersection
        }
        up_in(r, ts);
      }
    } else {
      bool hit = (ts.level >= max_level || resolution_ok(ts.t_current, ts.cell_size, projection_factor));
      if (hit) {
        norm = -vec3(stepDir);
        return vec4(ts.t_current * scale, ts.level, float(iteration_count), ts.node_index);  // intersection
      } else {
        down_in(r, ts);
        fetch_data(ts);
      }
    }

    // If the scene is not fully loaded yet, there are pointers to MAX_INT. We can fake an intersection then. (TODO: Set node_index to uint)
    if (ts.node_index == 2147483647) {
      norm = -vec3(stepDir);
      return vec4(ts.t_current * scale, ts.level, float(iteration_count), ts.node_index);
    }
      
    ts.child_linear_index = voxel_to_linear_idx(ts.mirror_mask, ts.local_idx, ts.current_node_size);
    ++iteration_count;
  } while ((ts.t_current < t_min_max.y) && (iteration_count < maxIters));
  
  if (iteration_count >= maxIters) return vec4(-3., 0, iteration_count, -1); // too much itarations
  return vec4(-2.,0, iteration_count, -1); // intersection out of t bounds
}

vec3 fromHomog(in vec4 v) {
  return v.xyz/v.w;
}

Ray computeCameraRay(in vec2 pixelScreenCoords) {
  vec4 pixel_s0 = vec4(pixelScreenCoords.x, pixelScreenCoords.y, 0, 1);
  vec4 pixel_s1 = vec4(pixelScreenCoords.x, pixelScreenCoords.y, 1, 1);
  
  vec3 pixel_w0 = fromHomog(projMatInv * pixel_s0);
  vec3 pixel_w1 = fromHomog(projMatInv * pixel_s1);
  
  Ray r;
  r.o = vec3(0,0,0);
  r.d = normalize(pixel_w1 - pixel_w0);
  
  vec3 o_prime = vec3(viewMatInv * vec4(r.o, 1));
  vec3 e_prime = vec3(viewMatInv * vec4(r.d, 1));
  r.o = o_prime;
  r.d = normalize(e_prime - o_prime);
  return r;
}

float getMinT(in int delta) {
	ivec2 p = ivec2((ivec2(gl_FragCoord.xy) - delta / 2) / delta);

	float tl = texelFetch(minDepthTex, ivec2(p.x, p.y), 0).x;
	float tr = texelFetch(minDepthTex, ivec2(p.x+1, p.y), 0).x;
	float bl = texelFetch(minDepthTex, ivec2(p.x, p.y+1), 0).x;
	float br = texelFetch(minDepthTex, ivec2(p.x+1, p.y+1), 0).x;

	return min(min(tl, tr), min(bl, br));
}

#if VIEWER_MODE
void main(void) {
  // vec2 uv = (gl_FragCoord.xy - resolution * 0.5) / resolution.y;
  vec2 screenCoords = (gl_FragCoord.xy / resolution) * 2.0 - 1.0;

#if 0 // DEBUG for seeing the low-res first-depth pre-pass
	if (useBeamOptimization) {
		//color = texture(minDepthTex, (gl_FragCoord.xy/screenRes) ).xxx/10000.0f;
		fragColor = vec4(vec3(getMinT(8) / length(sceneBBoxMax - sceneBBoxMin)), 1);
		return;
	}
#endif

#if 0 // DEBUG for seeing full-depth pass
  float fullDepthTexSample = texelFetch(depthTex, ivec2(gl_FragCoord.xy), 0).x;
  fragColor = vec4(vec3(fullDepthTexSample) / length(sceneBBoxMax - sceneBBoxMin), 1);
  return;
#endif

#if 1 // DEBUG for seeing normal pass
  vec3 hitNormTexSample = texelFetch(hitNormTex, ivec2(gl_FragCoord.xy), 0).xyz;
  fragColor = vec4(hitNormTexSample, 1);
  return;
#endif
  
  // Unit direction ray.
  // vec3 rd = normalize(vec3(screenCoords, 1.));

  // // Some cheap camera movement, for a bit of a look around. I use this far
  // // too often. I'm even beginning to bore myself, at this point. :)
  // float a = -0.25;
  // float cs = cos(a),
  // 		  si = sin(a);
  // rd.yz = mat2(cs, si, -si, cs)*rd.yz;
  // rd.xz = mat2(cs, si, -si, cs)*rd.xz;

  // Ray r;
  // r.o = sceneCenter
  // 	//  + vec3(0, sceneCenter.y * 0.5, 0)
  // 	 + cos(time * 0.5) * vec3(sceneCenter.x, 0, 0);
  // r.d = normalize(rd); // normalize(sceneBBoxMax - sceneBBoxMin);

  Ray r = computeCameraRay(screenCoords);
  float epsilon = 1E-3f;
  vec2 t_min_max = vec2(useBeamOptimization ? 0.95 * getMinT(8) : 0., 1e30f);

  vec3 hitNorm;
  vec4 result = t_min_max.x > 1e25
    ? vec4(-4)
    : trace_ray(r, t_min_max, projectionFactor, hitNorm);

  // Hit position = camera origin + depth * ray direction
  vec3 hitPos = r.o + result.x * r.d;
  float cellSize = 2. * rootHalfSide / pow(2., result.y);

  int nodeIndex = int(result.w);

  vec3 color = vec3(0);

  if (result.x >= 0.) // Intersection!!!
  {
    if (viewerRenderMode == 0) { // ITERATIONS
      // combine em all
      // float its = 1. - (result.z / float(maxIters));

      // float depth = result.x / length(sceneBBoxMax-sceneBBoxMin);
      // depth = 1. - pow(depth, 1. / 2.2); // gamma correction

      // vec3 lightDir = normalize(lightPos - hitPos);
      // float diff = 0.5 + 0.5 * max(dot(hitNorm, lightDir), 0.);

      // color = vec3(its * (0.5 + 0.5 * depth) * diff);

      float t = 1. - (result.z / float(maxIters));
      color = vec3(t);
    } else if (viewerRenderMode == 1) { // depth
      float t = result.x / length(sceneBBoxMax-sceneBBoxMin);
      // gamma correction
      t = 1. - pow(t, 1. / 2.2);
      color = vec3(t);
    } else if (viewerRenderMode == 2) { // diffuse lighting
      vec3 lightDir = normalize(lightPos - hitPos);
      float t = 0.5 + 0.5 * max(dot(hitNorm, lightDir), 0.);
      color = vec3(t);
    } else { // TODO: PATH TRACING???!!!
      color = r.d;
    }

    if (uniqueColors) {
      vec3 randomColor = normalize(vec3(
        nodeIndex % 100,
        (3 * nodeIndex) % 200,
        (2 * nodeIndex) % 300
      ) / vec3(100, 200, 300));
      color *= randomColor;
    }
  }
  else if (result.x >= -2. ) { // inside BBox, but no intersection
    float t = result.z / float(maxIters);
    color = vec3(t, t*0.5, 1);
  }
  else if (result.x >= -3.) // too many iterations
  {
    color = vec3(1.,0,0);
  }
  else if (result.x >= -4.) // out of bbox
  {
    color = vec3(0.5,0,1.);
  }
  else { // other: ??? should never happen?
  // This happens, since the Intersection case somehow returns negative values...
    // blue gradient
    // color = vec3(0.2, 0.4, 0.5) * (screenCoords.y + 0.75);

    // orange gradient
    color = vec3(0.5, 0.3, 0.1) * (screenCoords.y + 0.75);

     // first slice of 3D texture
    // uint idx = texelFetch(nodes, ivec3((uv + 0.5) * float(TEX3D_SIZE), int(time / 1.) % 4), 0).x; // 
    // color = vec3(
    // 	idx % TEX3D_SIZE,
    // 	(idx/TEX3D_SIZE) % TEX3D_SIZE,
    // 	idx/(TEX3D_SIZE_POW2)
    // );
    // color /= float(TEX3D_SIZE);
  }

  fragColor = vec4(color, 1);

  // fragColor = vec4(1.0, 1.0, sin(time) * 0.5f + 0.5f, 1.0);
  // fragColor += vec4(vec3(distance(uv, vec2(0)) * sin(time)), 0.0);
}

#elif DEPTH_MODE

void main() {
  vec2 screenCoords = (gl_FragCoord.xy / resolution) * 2.0 - 1.0;
	Ray r = computeCameraRay(screenCoords);	
	vec2 t_min_max = vec2(useBeamOptimization ? getMinT(8) : 0., 1e30f);

	vec3 hitNorm;

	vec4 result = trace_ray(r, t_min_max, projectionFactor, hitNorm);
	if (result.x > 0.) // Intersection!!!
		fragColor = result;
	else
		fragColor = vec4(1e30f); // no intersection - depth is infinite
}

#elif PATH_TRACE_MODE

uint wang_hash(inout uint seed)
{
    seed = uint(seed ^ uint(61)) ^ uint(seed >> uint(16));
    seed *= uint(9);
    seed = seed ^ (seed >> 4);
    seed *= uint(0x27d4eb2d);
    seed = seed ^ (seed >> 15);
    return seed;
}
 
float RandomFloat01(inout uint state)
{
    return float(wang_hash(state)) / 4294967296.0;
}
 
vec3 RandomUnitVector(inout uint state)
{
    float z = RandomFloat01(state) * 2.0f - 1.0f;
    float a = RandomFloat01(state) * c_twopi;
    float r = sqrt(1.0f - z * z);
    float x = r * cos(a);
    float y = r * sin(a);
    return vec3(x, y, z);
}

void main() {
  vec2 coord = ivec2(gl_FragCoord.xy);
	vec3 hitPos = texelFetch(hitPosTex, coord, 0).xyz;
	if (hitPos == vec3(0,0,0)) discard;
	float cellSize = texelFetch(depthTex, coord, 0).y;
	vec3 hitNorm = texelFetch(hitNormTex, coord, 0).xyz;
	// hitPos += hitNorm * 1e-3; // add epsilon, not sure why yet?

	Ray r;
	r.o = hitPos;


  // Path tracing based on https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/
  // initialize a random number state based on frag coord and frame
  uint rngState = uint(uint(fragCoord.x) * uint(1973) + uint(fragCoord.y) * uint(9277) + uint(iFrame) * uint(26699)) | uint(1);






  // Sampling based on Screen space AO from https://lingtorp.com/2019/01/18/Screen-Space-Ambient-Occlusion.html

  // Random vector to orient the hemisphere
	//vec3 rvec = gl_FragCoord.xyz; // TODO review this !!!
	vec3 rvec = vec3(0,1,0); // TODO review this !!!
	//vec3 rvec = normalize(vec3(gl_FragCoord.xy, gl_FragCoord.x * gl_FragCoord.y));
	//vec3 rvec = normalize(vec3(gl_FragCoord.x, 0, gl_FragCoord.y));

  // vec3 rvec = texture(noise_sampler, gl_FragCoord.xy * noise_scale).xyz; 

	vec3 tangent = normalize(rvec - hitNorm * dot(rvec, hitNorm));
	vec3 bitangent = cross(hitNorm, tangent);
	//mat3 tbn = mat3(tangent, bitangent, hitNorm);
	mat3 tbn = mat3(tangent, hitNorm, bitangent); // f: Tangent -> View space

	float largo = 0.5;
	vec2 t_min_max = vec2(0,largo);
	float projFactor = largo / cellSize;
	float k = 0; // "ao" value
	
	traversal_status ts_ignore;

	for (int i = 0; i < numAORays; i++) {
		aoRay.d = normalize(tbn *  hsSamples[(i+int(gl_FragCoord.x*gl_FragCoord.y))%N_HS_SAMPLES]);
		//aoRay.d = normalize(tbn *  hsSamples[i]);
		vec3 norm;
		vec4 result = trace_ray(aoRay, t_min_max, projFactor, norm, ts_ignore);
		if(result.x > 0) k += 1.0;// - (result.x/0.3);
	}
	float visibility = (numAORays>0) ? 1.0 - (k/float(numAORays)) : 1.0;
	output_t = visibility * visibility;
}

#endif
