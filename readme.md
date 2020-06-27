# DAGger: Sparse Voxel DAG Rendering on the Web

[Try it out!](https://rvanderlaan.github.io/DAGger/)

This is a web version of the viewer application from my [SVDAG-Compression](https://github.com/RvanderLaan/SVDAG-Compression) repository, which originates from the source code released alongside the [SSVDAG paper](http://jcgt.org/published/0006/02/01/).

<img alt="The cube fractal scene rendered in DAGger using path tracing" src="images/dagger-cube-fractal.png?raw=true" height="200" />
<img alt="Epic Citadel at 32K^3 rendered using path tracing" src="images/epic-citadel-15.png?raw=true" height="200" />

## Goals
 - [x] Render Sparse Voxel DAG in the browser using WebGL.
       Changes from OpenGL implementation: Replaced SamplerBuffer with Texture3D for represesenting nodes (no support in WebGL).
 - [x] Beam optimization: A low-res depth pre-pass for starting off primary visibility rays close to the geometry they will hit. The beams are 8 by 8 pixel blocks.
 - [x] First person controller [wip]
 - [x] Stream the data to the GPU while downloading [wip]
 - [x] Fractal generator [wip]
 - [x] Path tracing: Implementation based on [Alan Wolfe's blogpost](https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/)
 - [ ] CPU raycasting for collision detection (gravity) and scene interaction (cursor rays) [wip]
 - [ ] Attribute encoding (colors)
 - [ ] Import 3D models (voxelize on the fly)
 - [ ] Scene modification
 - [ ] Stream based on demand - only nodes that are visible or close to the camera (e.g. could separate scene into a root file and 64 "chunk" files)
 
Running it locally:
- Get NPM and Yarn installed
- Install dependencies with `yarn install`
- Run `yarn watch` to watch for file changes (will keep running), a new JS bundle will be generated each time you save a file into the `/static` folder
- Start a web server on the `/static` folder, which can be done by running `yarn serve` in a new terminal
