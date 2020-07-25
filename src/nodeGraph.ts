import { SVDAG } from "./SVDAG";
import { vec2 } from "gl-matrix";
import { getBit } from "./bitUtils";

class Node {
  /** Index in the original SVDAG list, if availible */
  id: number;
  children: Node[];

  public absolutePosition = vec2.create();

  public isHovered = false;
  public isActive = false;
  public isRendered = false;

  /**
   * 
   * @param position The position relative to the node's parent.
   */
  constructor(public position: vec2) {
    this.children = new Array<Node | undefined>(8);
  }

  resetRendered() {
    this.isRendered = false;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child?.isRendered) {
        child.resetRendered();
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, radius = 0.2) {
    // Prevent endless loop
    if (this.isRendered) {
      return;
    }
    this.isRendered = true;

    ctx.translate(this.position[0], this.position[1]);

    const transform = ctx.getTransform();
    vec2.set(this.absolutePosition, transform.e / transform.a, transform.f / transform.a);

    // Draw edges
    ctx.lineWidth = radius / 10;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        if (child.id >= this.id) {
          ctx.strokeStyle = 'black';
          ctx.lineTo(child.position[0], child.position[1]);
        } else {
          ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
          ctx.lineTo(child.absolutePosition[0] - this.absolutePosition[0], child.absolutePosition[1] - this.absolutePosition[1]);
        }
        ctx.stroke();
      }
    }

    // Draw this node
    ctx.beginPath();
  
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.lineWidth = radius / 10;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.font = `${radius * 1.5}px Arial`;
    ctx.fillText(this.childCount() + '', -radius / 2, radius / 2);

    // Draw children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child) {
        child.render(ctx);
      }
    }

    // Undo transform
    ctx.translate(-this.position[0], -this.position[1]);

  }

  setChild(index: number) {
    this.children[index] = new Node(vec2.fromValues((index-3.5), 1));
    // Update other node positions (?) needs to be globally optimized
    // if (this.children[index]) {
    // }
    return this.children[index];
  }

  childCount() {
    return this.children.reduce((count, child) => count + (child === undefined ? 0 : 1), 0);
  }

  import(nodeData: Uint32Array, index: number, nodes: Map<number, Node>) {
    this.id = index;
    nodes.set(this.id, this);
    const childMask = nodeData[index];
    let numChildren = 0;
    for (let i = 0; i < 8; i++) {
      if (getBit(childMask, i)) {
        numChildren++;
        
        const childPointer = nodeData[index + numChildren];
        if (childPointer < this.id) { // the node is pointing back up into the graph
          this.children[i] = nodes.get(childPointer);
        } else {
          const child = this.setChild(i);
          child.import(nodeData, index + numChildren, nodes);
        }
      }
    }
  }
}

class NodeGraph {

  root: Node;
  
  center: vec2;
  zoom: number;

  ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    this.root = new Node(vec2.create());
    this.root.children[0] = new Node(vec2.create())

    this.ctx = canvas.getContext('2d');

    this.center = vec2.create();
    this.zoom = 30; // 1 unit = 100 pixels (node positioned on grid points)

    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight;

    const requestRender = () => requestAnimationFrame(this.render.bind(this));

    let isDraggingBackground = false;
    const dragStart = vec2.create();
    this.canvas.addEventListener('mousedown', e => {
      vec2.set(dragStart, e.x, e.y);
      isDraggingBackground = true;
    });
    this.canvas.addEventListener('mouseup', () => {
      isDraggingBackground = false;
    });
    this.canvas.addEventListener('mousemove', e => {
      if (isDraggingBackground) {
        vec2.set(this.center, this.center[0] + e.x - dragStart[0], this.center[1] + e.y - dragStart[1]);
        vec2.set(dragStart, e.x, e.y);
        requestRender();
      }
    });
    this.canvas.addEventListener('wheel', e => {
      this.zoom *= e.deltaY < 0 ? 1.05 : .95;
      requestRender();
    })
  }

  update() {}

  render() {
    const { width, height } = this.canvas;
    
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.translate(width / 2, height * 0.1);

    this.ctx.translate(this.center[0], this.center[1]);
    this.ctx.scale(this.zoom, this.zoom);

    this.root.render(this.ctx);
    this.root.resetRendered();
  }

  import(svdag: SVDAG) {
    this.root.import(svdag.nodes, 0, new Map<number, Node>());
    console.log(svdag, this.root);
  }

  export(svdag: SVDAG): SVDAG {

    return svdag;
  }
}

export default NodeGraph;
