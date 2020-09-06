// import { getBit } from "./bitUtils";

// class SVDAGNode {
//   childMask = 0x0;
//   children: BigInt64Array;

//   constructor() {
//     this.children = new BigInt64Array(8);
//   }

//   hash(depth: number, childLevelHashes: BigInt64Array) {

//     if (depth) return BigInt(this.childMask);
    
//     let hash = BigInt(0);
//     if (depth === 1) {
//       // At depth 1, concat all 8-bit child masks into a 64 bit int
//       for (let i = 0; i < 8; i++) {
//         hash <<= BigInt(8); // shift hash 8 bits
//         if (getBit(this.childMask, i)) { // 
//           hash += this.children[i];
//         }
//       }
//     } else {
//        // For higher depths, combine all children keys with XOR
//        for (let i = 0; i < 8; i++) {
//         //  let childHash = BigInt(0);
//         if (getBit(this.childMask, i)) { // 
//           // childHash = hash()
//         }
//       }
//     }

//     return hash;
//   }
// }

// class UnencodedSVDAG {
//   nLevels: number;

//   nodeLevels: SVDAGNode[][];

//   mergeIdenticalNodes() {


//     const childLevelHashes = new BigInt64Array(0);
//     const currentLevelHashes = new BigInt64Array(this.nodeLevels[this.nodeLevels.length - 1].length); 

//     // For every level...
//     for (let lev = this.nodeLevels.length - 1; lev > 0; lev--) {
//       // Prepare new list
//       const newLevel: SVDAGNode[] = [];


//     }
//   }
// }
