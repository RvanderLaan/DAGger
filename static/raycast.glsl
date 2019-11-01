#version 300 es
precision highp float;

out vec4 fragColor;

uniform float time;
uniform vec2 resolution;

uniform mat4 viewMatInv;
uniform mat4 projMatInv;
uniform vec2 screenRes;

uniform vec3 sceneBBoxMin;
uniform vec3 sceneBBoxMax;
uniform vec3 sceneCenter;
uniform float rootHalfSide;

uniform uint maxIters;
uniform uint drawLevel;
uniform float projectionFactor;

uniform usamplerBuffer nodes;

uniform int viewerRenderMode;
uniform uint selectedVoxelIndex;
uniform bool randomColors;
uniform vec3 lightPos;
uniform bool enableShadows;
uniform float normalEpsilon;

#define INNER_LEVELS 8
#define MAX_STACK_DEPTH (INNER_LEVELS+1)

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

void stack_push(in int node, in uint hdr, in ivec3 mirror_mask, in uint level) {
	int mask = mirror_mask.x | (mirror_mask.y << 1) | (mirror_mask.z << 2) | int(level << 3);
	stack[stack_size] = ivec3(node, hdr, mask);
	++stack_size;
}

void stack_pop_in(out int node, out uint hdr, out ivec3 mirror_mask, out uint level) {
	--stack_size;
	ivec3 node_mask = stack[stack_size];
	node = node_mask.x;
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

uint myFetch(in const int idx) {
	// On AMD GPUs this causes some problems for files > 32 MM. Took some time to find this out
	// The idx is signed, so cast it to unsigned
	// const uvec4 tmp = texelFetch(nodes, idx/4);
	const uvec4 tmp = texelFetch(nodes, int(uint(idx)/4));

	const int selected = idx%4;
	uint result;
	if      (selected == 0) result = tmp.x;
	else if (selected == 1) result = tmp.y;
	else if (selected == 2) result = tmp.z;
	else if (selected == 3) result = tmp.w;
	return result;
}

bool fetch_voxel_bit(in const traversal_status ts) {
	return (ts.hdr & (1 << ts.child_linear_index)) != 0;
}

void fetch_data(inout traversal_status ts) {
	ts.hdr = myFetch(ts.node_index);
}

void fetch_child_index_in(inout traversal_status ts) {
	const int childPtrPos = bitCount((ts.hdr & 0xFF) >> ts.child_linear_index);
	ts.node_index = int(myFetch(ts.node_index + childPtrPos));
}

///////////////////////////// DDA PRIMITIVES

bool in_bounds(in const ivec3 local_idx, in const int sz) { 
	const bvec3 cond0 = lessThan(local_idx, ivec3(sz));
	const bvec3 cond1 = lessThanEqual(ivec3(0,0,0), local_idx);
	return cond0.x && cond0.y && cond0.z && cond1.x && cond1.y && cond1.z;
}

vec2 intersectAABB(in const Ray r, in const vec3 aabbMin, in const vec3 aabbMax) {
  const vec3 t1 = (aabbMin - r.o)/r.d;
  const vec3 t2 = (aabbMax - r.o)/r.d;
  const vec3 tMin = min(t1, t2);
  const vec3 tMax = max(t1, t2);

  vec2 t = vec2(max(max(tMin.x, 0.0), max(tMin.y, tMin.z)), min(tMax.x, min(tMax.y, tMax.z)));
  return t;
}

bool resolution_ok(float t, float cell_size, float projection_factor) {
  return (cell_size * projection_factor) < t;
}

// ==========================================================================

void dda_init(in const Ray r, inout traversal_status ts) {
	// Init dda FIXME USE OCTREE POINT LOCATION
	const float voxel_eps = 1.0f/(256.*1024.);
	const vec3 p_a = r.o + (ts.t_current + voxel_eps) * r.d; // find current pos
	ts.idx = ivec3(p_a / ts.cell_size); // current global grid voxel
	
	// During initialization do not step back for dir < 0, because it would move of more than once cell
	const ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
	const ivec3 idx_next = ts.idx + delta_idx_conservative;
	const vec3 p_next_a = idx_next * ts.cell_size;	// this should be the plane
	
	ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
	ts.local_idx = ts.idx % 2;
}

// https://stackoverflow.com/questions/24599502/is-there-a-built-in-function-in-glsl-for-and-or-is-there-some-optimized-method-f
bvec3 bvec3_and(const bvec3 one, const bvec3 two) {
	return bvec3(uvec3(one) & uvec3(two));
}

// Returns the direction of the step
ivec3 dda_next(inout traversal_status ts) {
	const bvec3 b1 = lessThan(ts.t_next_crossing.xyz, ts.t_next_crossing.yzx);
	const bvec3 b2 = lessThanEqual(ts.t_next_crossing.xyz, ts.t_next_crossing.zxy);
	const bvec3 mask = bvec3_and(b1, b2);
	const vec3 mask_v3 = vec3(mask); 			
	
	//All components of mask are false except the one components to the shortest t_next_crossing
	// which is the direction in which the step have to be done
	const ivec3 delta = ivec3(mask) * ts.delta_idx;
	ts.idx += delta;
	ts.local_idx += delta;
	
	ts.t_current = dot(mask_v3, ts.t_next_crossing);
	ts.t_next_crossing += mask_v3 * ts.cell_size * abs(ts.inv_ray_d);
	return delta;
}
 	     
ivec3 dda_next_delta_index(in const traversal_status ts) {
	const bvec3 b1 = lessThan(ts.t_next_crossing.xyz, ts.t_next_crossing.yzx);
	const bvec3 b2 = lessThanEqual(ts.t_next_crossing.xyz, ts.t_next_crossing.zxy);
	const bvec3 mask = bvec3_and(b1, b2);
	return ivec3(mask) * ts.delta_idx;
}

void up_in(in const Ray r, inout traversal_status ts) {
	uint delta_level = ts.level;
	stack_pop_in(ts.node_index, ts.hdr, ts.mirror_mask, ts.level);
	delta_level -= ts.level;
	
	ts.idx >>= delta_level; // always delta_level >= 1
	ts.cell_size *= (1 << delta_level);  
	ts.current_node_size = ts.level < INNER_LEVELS ? 2 : LEAF_SIZE;
	ts.local_idx = ts.idx & 1; 
	
	const ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
	const ivec3 idx_next = ts.idx + delta_idx_conservative;
	const vec3 p_next_a = idx_next * ts.cell_size;	// this should be the plane
	ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
}

void go_down_one_level(in const Ray r, inout traversal_status ts) {
	++ts.level;
	ts.cell_size*=0.5;
	
	// Init ts idx, t_next_crossing, local_idx using octree point location
	const vec3 p_a = r.o + ts.t_current * r.d;		
	const vec3 p_center = (ts.idx * 2 + 1) * ts.cell_size;
	const bvec3 child_pos = lessThan(p_center, p_a);
	const ivec3 delta = ivec3(child_pos);
	ts.idx = ts.idx*2 + delta;
	
	const ivec3 delta_idx_conservative = max(ivec3(0), ts.delta_idx);
	const ivec3 idx_next = ts.idx + delta_idx_conservative;
	const vec3 p_next_a = idx_next * ts.cell_size;	// this should be the plane
	
	ts.t_next_crossing = (p_next_a - r.o) * ts.inv_ray_d;
	ts.local_idx = ts.idx & (ts.current_node_size-1);
}

void down_in(in const Ray r, inout traversal_status ts) {
	// Check/push next
	const ivec3 local_idx = ts.local_idx;
	const ivec3 delta = dda_next_delta_index(ts);    
	
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
	const vec3 sign_rd = sign(r.d);
	
	// Move ray to LOCAL box
	const float scale = 1.0/(2.0 * rootHalfSide);
	const vec3 octree_min = sceneCenter - vec3(rootHalfSide);
	const vec3 octree_max = sceneCenter + vec3(rootHalfSide);
	r.o = r.o - octree_min;
	r.o *= scale;
	t_min_max *= scale;
	
	// avoid div by zero
	if (r.d.x * sign_rd.x < epsilon) r.d.x = sign_rd.x * epsilon;
	if (r.d.y * sign_rd.y < epsilon) r.d.y = sign_rd.y * epsilon;
	if (r.d.z * sign_rd.z < epsilon) r.d.z = sign_rd.z * epsilon;
	
	const vec3 clip_box_min = (sceneBBoxMin - octree_min) * scale; 
	const vec3 clip_box_max = (sceneBBoxMax - octree_min) * scale; 
	
	const vec2 t_intersection = intersectAABB(r, clip_box_min, clip_box_max);
	
	t_min_max.x = max(t_intersection.x, t_min_max.x + 1e-10);
	t_min_max.y = min(t_intersection.y, t_min_max.y);
	
	return t_intersection.x < t_intersection.y;
}


void init(inout Ray r, inout traversal_status ts) {
	ts.inv_ray_d = vec3(1.0/r.d);
	ts.delta_idx = ivec3(sign(r.d));
	
	// Level status
	ts.mirror_mask = ivec3(0,0,0);
	ts.level = 0;
	ts.cell_size = 0.5;
	
	// Step status
	dda_init(r, ts);
	ts.current_node_size = 2;
	
	ts.node_index = 0;
	fetch_data(ts);
	ts.child_linear_index =  voxel_to_linear_idx(ts.mirror_mask, ts.local_idx, ts.current_node_size);
}


void main(void) {
  vec2 uv = (gl_FragCoord.xy - resolution * 0.5) / resolution.y;

  // Unit direction ray.
  vec3 rd = normalize(vec3(uv, 1.));

  // Some cheap camera movement, for a bit of a look around. I use this far
  // too often. I'm even beginning to bore myself, at this point. :)
  float cs = cos(time * .25), si = sin(time * .25);
  rd.xy = mat2(cs, si, -si, cs)*rd.xy;
  rd.xz = mat2(cs, si, -si, cs)*rd.xz;



  fragColor = vec4(1.0, 1.0, sin(time) * 0.5f + 0.5f, 1.0);
}