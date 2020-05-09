# DAGger: Sparse Voxel DAG Rendering on the Web

[Try it out!](https://rvanderlaan.github.io/DAGger/)

This is a web version of the viewer application from the [SVDAG-Compression](https://github.com/RvanderLaan/SVDAG-Compression) repository.

Goals:
 - [x] Render Sparse Voxel DAG in the browser using WebGL.
       Changes from OpenGL implementation: Currently very simplified. Replaced SamplerBuffer with Texture3D for represesenting nodes (no support in WebGL). No shadows or beam optimization yet.
 - [x] First person controller [wip]
 - [x] Stream the data to the GPU while downloading [wip]
 - [ ] CPU raycasting for collision detection (gravity) and scene interaction cursor rays [wip]
 - [ ] Fractal generator [wip]
 - [ ] Attribute encoding (colors)
 - [ ] Import 3D models (voxelize on the fly)
 - [ ] Scene modification
 
