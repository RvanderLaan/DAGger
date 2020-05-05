// Re-implementation of voxel raycasting from scratch!
// First few lines are intentionally left as comments
// They will be replaced with more #defines during compilation
// So that the shader compilation errors point to correct lines
// We'll define INNER_LEVELS, TEX3D_SIZE, TEX3D_SIZE_POW2

#define MAX_STACK_DEPTH (INNER_LEVELS+1u) // Maximum stack size is the amount of levels in the graph
#define LEAF_SIZE 2                       // The size ((2^3)^n) of the leaf nodes

precision highp float;

out vec4 fragColor;             // Where the output color of the main program is set in

uniform float time;             // Time since initialization in seconds (TODO: Make it a vec4 like shadertoy for minute etc.)
uniform vec2 resolution;        // The resolution of the screen (in pixels)

uniform mat4 viewMatInv;        // Inverse of the view matrix       (camera position & orientation)
uniform mat4 projMatInv;        // Inverse of the projection matrix (camera projection matrix)

uniform vec3 sceneBBoxMin;      // The start of the scene bounding box
uniform vec3 sceneBBoxMax;      // The end of the scene bounding box
uniform vec3 sceneCenter;       // The position of the center of the scene
uniform float rootHalfSide;     // Half the length of the longest side of the scene bounding box

uniform uint maxIters;          // The maximum amount of traversal iteration to take per ray (else a fallback color is used)
uniform uint drawLevel;         // How many levels to traverse the graph (usually set to max-levels) - can be influenced by `projectionFactor`

// `projectionFactor` controls how deep to traverse the graph based on the size of a node on the screen (?)
//    so traversal can be stopped when nodes appear smaller than a single pixel on the screen 
// TODO: not exactly sure how this works/is determined
uniform float projectionFactor;

// `nodes` Represents the SVAG nodes, it utilized as a 1D list.
// A 3D texture is used for this purpose since it can hold the most data
uniform highp usampler3D nodes; 


// Checks whether a ?
// bool resolution_ok(float t, float cell_size, float projection_factor) {
//   return (cell_size * projection_factor) < t;
// }


//// Ray stuff ////
///////////////////
// (okay this part is not from scratch but it works really well)
struct Ray {
	vec3 o; // origin point
	vec3 d; // direction vector (normalized)
};

vec3 fromHomog(in vec4 v) {
	return v.xyz/v.w;
}

// Transforms screen UV coordinates with the projection and the view matrix into to a Ray
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

bool in_bounds(in ivec3 local_index, in int sz) {
	bvec3 cond0 = lessThan(local_index, ivec3(sz));
	bvec3 cond1 = lessThanEqual(ivec3(0), local_index);
	return cond0.x && cond0.y && cond0.z && cond1.x && cond1.y && cond1.z;
}

// Finds the in- and out intersection points of a ray with a bounding box (returns the positions along the ray)
vec2 intersectAABB(in Ray r, in vec3 aabbMin, in vec3 aabbMax) {
  vec3 t1 = (aabbMin - r.o)/r.d;
  vec3 t2 = (aabbMax - r.o)/r.d;
  vec3 tMin = min(t1, t2);
  vec3 tMax = max(t1, t2);

  vec2 t = vec2(
    max(max(tMin.x, 0.0), max(tMin.y, tMin.z)),
    min(tMax.x, min(tMax.y, tMax.z))
  );
  return t;
}

// Transforms a ray from world to local space (within bounding box)
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


//// Stack stuff ////
/////////////////////
// A `full-stack` tree traversal algorithm is used to keep track of the nodes visited
//    as we traverse through the levels of the graph 
// ivec3 stack[MAX_STACK_DEPTH];
// uint stack_size = 0u;


//// Traversal stuff ////
/////////////////////////
struct traversal_status {
	uint level;         // At which level of the graph we're at
	float cell_size;    // The size of child nodes at this level (normalized, e.g. 0.5 for the root)

  float t_current;          // How far along the ray we are (from origin to direction)
  uint node_index;          // At which index we're at in the list of nodes
  ivec3 global_index;       // Current global grid voxel
  ivec3 local_index;        // Local index in current node (Global index % 2) 
  uint child_linear_index;  // Local index as an integer (linearized as x + y * n + z * n^2 for n = current_node_size)
  vec3 inv_ray_d;           // Inverse of ray direction

	ivec3 delta_idx;          // The signs of the ray direction
	int current_node_size;    // Size of node in terms of resolution has (always 2, except LEAF_SIZE for leaf level, which is 2 by default as well)

  uint hdr;           // The 32 bit header of the node. First 8 bits are the children mask, rest is padding :( 
                      //    could use 16 bit nodes instead
  uint iteration;
};

uint fetch(uint index) {
  return uint(
    texelFetch(
      nodes, 
      ivec3(
        index                % TEX3D_SIZE,
        (index / TEX3D_SIZE) % TEX3D_SIZE,
        index  / (TEX3D_SIZE_POW2) // % TEX3D_SIZE not needed
      ), 0
    ).x);
}

// Counts amount of bits in 8 bit int
uint bitCount(in uint num) {
	uint n = num;
	n = ((0xaau & n) >> 1) + (0x55u & n);
	n = ((0xccu & n) >> 2) + (0x33u & n);
	n = ((0xf0u & n) >> 4) + (0x0fu & n);
	return n;
}

bool check_voxel(in vec3 target_pos) {
  uint node_index = 0u;    // start at the root node
  float cell_size = 0.5;  // size of children at the root is 0.5 of the whole grid
  ivec3 global_index = ivec3(target_pos / cell_size); // the index of target_pos in the full sub-grid of the current node

  for (uint i = 0u; i < drawLevel - 2u; i++) {
    cell_size *= 0.5;

    // Find in which child cell the target position falls
    vec3 parent_center = vec3(global_index * 2 + 1) * cell_size;
    ivec3 child_pos = ivec3(lessThan(parent_center, target_pos));
    uint linear_child_index = uint(child_pos.z + 2 * (child_pos.y + 2 * child_pos.x));

    global_index = global_index * 2 + child_pos;

    // Find out whether there is a child pointer available
    uint hdr = fetch(node_index);
    bool hasChild = (hdr & (1u << linear_child_index)) != 0u;

    if (hasChild) {
      uint childPtrOffset = bitCount(hdr & 0xFFu >> linear_child_index); // offset of child pointer to node_index
      // Look up the next node pointer
      node_index = fetch(node_index + childPtrOffset);
    } else {
      return false;
    }
  }
  return true;
  // If we got here, we're at a leaf node. Here, just check if the header bit is set
  cell_size *= 0.5;
  vec3 parent_center = vec3(target_pos * 2. + 1.) * cell_size;
  ivec3 child_pos = ivec3(lessThan(parent_center, vec3(global_index)));
  uint linear_child_index = uint(child_pos.z + 2 * (child_pos.y + 2 * child_pos.x));
  uint hdr = fetch(node_index);
  bool hasChild = (int(hdr) & (1 << int(linear_child_index))) != 0;
  return hasChild;
}

traversal_status trace_ray(in Ray r) { // todo: t_min_max & projection factor input
  vec2 t_min_max = vec2(0, 1e30);
  traversal_status ts;
  ts.iteration = 0u;

  // TODO: Maybe lift this out of the trace_ray func, so trace_ray is more reusable for other rays
  // Moves the ray to the start of the bounding box
  if (!transform_ray(r, t_min_max)) {
    ts.t_current = -4.;
		return ts;  // out of scene Bbox
	}

  float scale = 2.0 * rootHalfSide;
	ts.t_current = 0.; // start at beginning of ray. Maybe add epsilon?

	// init(r, ts);
  ts.level = 0u;
  // ts.inv_ray_d = vec3(1. / r.d);
  // ts.cell_size = 0.5;
	// ts.current_node_size = 2;

  ts.node_index = 0u; // start at root node

  // Just evenly spaced naive steps size for now, TODO: DDA to find next node position
  float step_size = 10. / float(1 << drawLevel); // (t_min_max.y - t_min_max.x);

  for (; ts.iteration < maxIters; ts.iteration++) {
    // Advance the ray 1 step
    ts.t_current += step_size;

    if (ts.t_current >= t_min_max.y) {
      ts.t_current = -1.; // reached bbox end without intersection
      return ts;
    }
    
    if (check_voxel(r.o + r.d * ts.t_current)) {
      return ts;
    }
  }

  ts.t_current = -3.; // too many iterations

  return ts;
}


//// Main stuff ////
////////////////////
void main(void) {
	vec2 screenCoords = (gl_FragCoord.xy / resolution) * 2.0 - 1.0;
  float blue = 0.5 + 0.5 * sin(time * 6.28 * 0.1);
  
  // Visualize screen coordinates
	// fragColor = vec4(screenCoords, blue, 1);
  // return;

  Ray r = computeCameraRay(screenCoords);

  // Visualize ray direction
	// fragColor = vec4(r.d, 1);
  // return;



  traversal_status ts = trace_ray(r);

  // return;
  vec3 its = vec3(maxIters - ts.iteration) / vec3(maxIters);

  if (ts.t_current >= 0.) {           // intersection
    fragColor = vec4(vec3(1. - ts.t_current / rootHalfSide), 1);
  } else if (ts.t_current >= -2.) {   // reached bbox end, no intersection (green)
  
    fragColor = vec4(0, its.x, 0, 1);
    // fragColor = vec4(0, 1, 0, 1);
  } else if (ts.t_current >= -3.) {   // too many iters (red)
    fragColor = vec4(1, 0, 0, 1);
  } else if (ts.t_current >= -4.) {   // out of bbox (purple)
    fragColor = vec4(1, 0, 1, 1);
  } else {                            // else (ray dir: shouldn't happen)
    fragColor = vec4(r.d, 1);
  }
}
