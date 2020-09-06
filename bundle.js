/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/gl-matrix/esm/common.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-matrix/esm/common.js ***!
  \**********************************************/
/*! exports provided: EPSILON, ARRAY_TYPE, RANDOM, setMatrixArrayType, toRadian, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANDOM", function() { return RANDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatrixArrayType", function() { return setMatrixArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadian", function() { return toRadian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "./node_modules/gl-matrix/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-matrix/esm/index.js ***!
  \*********************************************/
/*! exports provided: glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return _common_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _mat2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat2.js */ "./node_modules/gl-matrix/esm/mat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return _mat2_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _mat2d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat2d.js */ "./node_modules/gl-matrix/esm/mat2d.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return _mat2d_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mat3.js */ "./node_modules/gl-matrix/esm/mat3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return _mat3_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mat4.js */ "./node_modules/gl-matrix/esm/mat4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return _mat4_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quat.js */ "./node_modules/gl-matrix/esm/quat.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return _quat_js__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _quat2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./quat2.js */ "./node_modules/gl-matrix/esm/quat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat2", function() { return _quat2_js__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vec2.js */ "./node_modules/gl-matrix/esm/vec2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return _vec2_js__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vec3.js */ "./node_modules/gl-matrix/esm/vec3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return _vec3_js__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vec4.js */ "./node_modules/gl-matrix/esm/vec4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return _vec4_js__WEBPACK_IMPORTED_MODULE_9__; });












/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat2.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat2.js ***!
  \********************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, transpose, invert, adjoint, determinant, multiply, rotate, scale, fromRotation, fromScaling, str, frob, LDU, add, subtract, exactEquals, equals, multiplyScalar, multiplyScalarAndAdd, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LDU", function() { return LDU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */

function fromValues(m00, m01, m10, m11) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */

function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3]; // Calculate the determinant

  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
/**
 * Calculates the determinant of a mat2
 *
 * @param {ReadonlyMat2} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2
 *
 * @param {ReadonlyMat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3]);
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {ReadonlyMat2} L the lower triangular matrix
 * @param {ReadonlyMat2} D the diagonal matrix
 * @param {ReadonlyMat2} U the upper triangular matrix
 * @param {ReadonlyMat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Alias for {@link mat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat2d.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat2d.js ***!
  \*********************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, invert, determinant, multiply, rotate, scale, translate, fromRotation, fromScaling, fromTranslation, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 2x3 Matrix
 * @module mat2d
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */

function fromValues(a, b, c, d, tx, ty) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */

function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Calculates the determinant of a mat2d
 *
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/

function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2d} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat2d} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2d
 *
 * @param {ReadonlyMat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
}
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}
/**
 * Alias for {@link mat2d.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat3.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat3.js ***!
  \********************************************/
/*! exports provided: create, fromMat4, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, rotate, scale, fromTranslation, fromRotation, fromScaling, fromMat2d, fromQuat, normalFromMat4, projection, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat2d", function() { return fromMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalFromMat4", function() { return normalFromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projection", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */

function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */

function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/

function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */

function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat4.js ***!
  \********************************************/
/*! exports provided: create, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, scale, rotate, rotateX, rotateY, rotateZ, fromTranslation, fromScaling, fromRotation, fromXRotation, fromYRotation, fromZRotation, fromRotationTranslation, fromQuat2, getTranslation, getScaling, getRotation, fromRotationTranslationScale, fromRotationTranslationScaleOrigin, fromQuat, frustum, perspective, perspectiveFromFieldOfView, ortho, lookAt, targetTo, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXRotation", function() { return fromXRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromYRotation", function() { return fromYRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromZRotation", function() { return fromZRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat2", function() { return fromQuat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaling", function() { return getScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScale", function() { return fromRotationTranslationScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScaleOrigin", function() { return fromRotationTranslationScaleOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frustum", function() { return frustum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspective", function() { return perspective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspectiveFromFieldOfView", function() { return perspectiveFromFieldOfView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ortho", function() { return ortho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookAt", function() { return lookAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTo", function() { return targetTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/quat.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/quat.js ***!
  \********************************************/
/*! exports provided: create, identity, setAxisAngle, getAxisAngle, getAngle, multiply, rotateX, rotateY, rotateZ, calculateW, exp, ln, pow, slerp, random, invert, conjugate, fromMat3, fromEuler, str, clone, fromValues, copy, set, add, mul, scale, dot, lerp, length, len, squaredLength, sqrLen, normalize, exactEquals, equals, rotationTo, sqlerp, setAxes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxisAngle", function() { return setAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxisAngle", function() { return getAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAngle", function() { return getAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateW", function() { return calculateW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp", function() { return exp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ln", function() { return ln; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat3", function() { return fromMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEuler", function() { return fromEuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationTo", function() { return rotationTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqlerp", function() { return sqlerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxes", function() { return setAxes; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat3.js */ "./node_modules/gl-matrix/esm/mat3.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vec3.js */ "./node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vec4.js */ "./node_modules/gl-matrix/esm/vec4.js");




/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */

function getAngle(a, b) {
  var dotproduct = dot(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function exp(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function ln(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */

function pow(out, a, b) {
  ln(out, a);
  scale(out, out, b);
  exp(out, out);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */

var clone = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["clone"];
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["fromValues"];
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["copy"];
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["set"];
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */

var add = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["add"];
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["scale"];
/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["dot"];
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["lerp"];
/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["length"];
/**
 * Alias for {@link quat.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["squaredLength"];
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["normalize"];
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat} a The first quaternion.
 * @param {ReadonlyQuat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["exactEquals"];
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat} a The first vector.
 * @param {ReadonlyQuat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var equals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["equals"];
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["create"]();
  var xUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](1, 0, 0);
  var yUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](0, 1, 0);
  return function (out, a, b) {
    var dot = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["dot"](a, b);

    if (dot < -0.999999) {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, xUnitVec3, a);
      if (_vec3_js__WEBPACK_IMPORTED_MODULE_2__["len"](tmpvec3) < 0.000001) _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, yUnitVec3, a);
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = _mat3_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/esm/quat2.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-matrix/esm/quat2.js ***!
  \*********************************************/
/*! exports provided: create, clone, fromValues, fromRotationTranslationValues, fromRotationTranslation, fromTranslation, fromRotation, fromMat4, copy, identity, set, getReal, getDual, setReal, setDual, getTranslation, translate, rotateX, rotateY, rotateZ, rotateByQuatAppend, rotateByQuatPrepend, rotateAroundAxis, add, multiply, mul, scale, dot, lerp, invert, conjugate, length, len, squaredLength, sqrLen, normalize, str, exactEquals, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationValues", function() { return fromRotationTranslationValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReal", function() { return getReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDual", function() { return getDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReal", function() { return setReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDual", function() { return setDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatAppend", function() { return rotateByQuatAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatPrepend", function() { return rotateByQuatPrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAroundAxis", function() { return rotateAroundAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quat.js */ "./node_modules/gl-matrix/esm/quat.js");
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat4.js */ "./node_modules/gl-matrix/esm/mat4.js");



/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */

function create() {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }

  dq[3] = 1;
  return dq;
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */

function clone(a) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q a normalized quaternion
 * @param {ReadonlyVec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Creates a dual quat from a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyVec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
/**
 * Creates a dual quat from a quaternion
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {ReadonlyMat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */

function fromMat4(out, a) {
  //TODO Optimize this
  var outer = _quat_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getRotation"](outer, a);
  var t = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getTranslation"](t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */

function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} real part
 */

var getReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} dual part
 */

function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */

var setReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */

function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */

function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {quat2} out
 */

function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateX"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateY"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateZ"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @returns {quat2} out
 */

function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */

function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */

function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return copy(out, a);
  }

  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 * @function
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 */

function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
/**
 * Alias for {@link quat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _quat_js__WEBPACK_IMPORTED_MODULE_1__["dot"];
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */

function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */

function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
/**
 * Calculates the length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */

var length = _quat_js__WEBPACK_IMPORTED_MODULE_1__["length"];
/**
 * Alias for {@link quat2.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _quat_js__WEBPACK_IMPORTED_MODULE_1__["squaredLength"];
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */

function normalize(out, a) {
  var magnitude = squaredLength(a);

  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }

  return out;
}
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {ReadonlyQuat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */

function str(a) {
  return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat2} a the first dual quaternion.
 * @param {ReadonlyQuat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat2} a the first dual quat.
 * @param {ReadonlyQuat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec2.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec2.js ***!
  \********************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat2, transformMat2d, transformMat3, transformMat4, rotate, angle, zero, str, exactEquals, equals, len, sub, mul, div, dist, sqrDist, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2", function() { return transformMat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2d", function() { return transformMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */

function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec3.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec3.js ***!
  \********************************************/
/*! exports provided: create, clone, length, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, squaredLength, negate, inverse, normalize, dot, cross, lerp, hermite, bezier, random, transformMat4, transformMat3, transformQuat, rotateX, rotateY, rotateZ, angle, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hermite", function() { return hermite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezier", function() { return bezier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec4.js ***!
  \********************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat4, transformQuat, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),

/***/ "./src/Camera.ts":
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");

class Camera {
    constructor(fov = 60) {
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.target = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.upDir = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.viewMat = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.viewMatInv = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.projMat = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.projMatInv = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.camMatInv = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.prevCamMat = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.fovY = fov * 3.14159265359 / 180.0;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].set(this.upDir, 0, 1, 0);
    }
    fromHomog(v) {
        return gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].divide(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(v[0], v[1], v[2]), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(v[3], v[3], v[3]));
    }
    updateMatrices() {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].invert(this.prevCamMat, this.camMatInv);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].lookAt(this.viewMat, this.position, this.target, this.upDir);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].perspective(this.projMat, this.fovY, window.innerWidth / window.innerHeight, 0.1, 1000);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].invert(this.projMatInv, this.projMat);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].invert(this.viewMatInv, this.viewMat);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].mul(this.camMatInv, this.viewMatInv, this.projMatInv);
    }
    computeCameraRay(screenCoords) {
        const pixel_s0 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromValues(screenCoords[0], screenCoords[1], 0, 1);
        const pixel_s1 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromValues(screenCoords[0], screenCoords[1], 1, 1);
        const pixel_w0 = this.fromHomog(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].transformMat4(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create(), pixel_s0, this.projMatInv));
        const pixel_w1 = this.fromHomog(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].transformMat4(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create(), pixel_s1, this.projMatInv));
        const r = {
            o: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(0, 0, 0),
            d: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), pixel_w1, pixel_w0)),
        };
        const o_prime = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].transformMat4(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create(), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromValues(r.o[0], r.o[1], r.o[2], 1), this.viewMatInv);
        const e_prime = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].transformMat4(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create(), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromValues(r.d[0], r.d[1], r.d[2], 1), this.viewMatInv);
        return r;
    }
    updatePosition() {
        const forward = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), this.position, this.target);
        console.log(forward);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].transformMat4(this.position, forward, this.viewMat);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].add(this.position, this.position, this.target);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Camera);


/***/ }),

/***/ "./src/OrbitController.ts":
/*!********************************!*\
  !*** ./src/OrbitController.ts ***!
  \********************************/
/*! exports provided: OrbitController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrbitController", function() { return OrbitController; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");

class OrbitController {
    constructor(camera, moveSpeed) {
        this.camera = camera;
        this.moveSpeed = moveSpeed;
        this.prevMousePos = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].create();
        this.mousePos = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].create();
        this.tmpDir = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.keyDownStatus = {};
        this.radius = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].dist(this.camera.position, this.camera.target);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(this.tmpDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(this.tmpDir, this.camera.target, this.camera.position));
    }
    init() {
        this.radius = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].dist(this.camera.position, this.camera.target);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(this.tmpDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(this.tmpDir, this.camera.target, this.camera.position));
    }
    handleClick(pos) {
        const forward = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), this.camera.target, this.camera.position);
    }
    update(dt) {
        let updated = false;
        if (this.keyDownStatus['shift']) {
            dt *= 10;
        }
        const tmpKeyDir = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        if (this.keyDownStatus['w'] || this.numTouches === 2) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.target, this.camera.position));
            this.moveInDirection(tmpKeyDir, this.moveSpeed * dt);
        }
        if (this.keyDownStatus['s']) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.target, this.camera.position));
            this.moveInDirection(tmpKeyDir, -this.moveSpeed * dt);
        }
        if (this.keyDownStatus['a']) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].cross(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.position, this.camera.target)), this.camera.upDir);
            this.moveInDirection(tmpKeyDir, this.moveSpeed * dt);
        }
        if (this.keyDownStatus['d']) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].cross(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.position, this.camera.target)), this.camera.upDir);
            this.moveInDirection(tmpKeyDir, -this.moveSpeed * dt);
        }
        if (this.keyDownStatus['q']) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.target, this.camera.position));
            this.rotateAlongLocalY(0.5, dt);
        }
        if (this.keyDownStatus['e']) {
            updated = true;
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(tmpKeyDir, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(tmpKeyDir, this.camera.target, this.camera.position));
            this.rotateAlongLocalY(0.5, -dt);
        }
        if (this.keyDownStatus['mouse-0']) {
            const delta = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].create(), this.prevMousePos, this.mousePos);
            if (delta[0] !== 0 || delta[1] !== 0) {
                updated = true;
                gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].divide(delta, delta, [document.documentElement.clientWidth, document.documentElement.clientHeight]);
                const lookSpeed = 5;
                this.rotateAlongLocalY(delta[0], lookSpeed);
                this.rotateAlongLocalX(delta[1], -lookSpeed);
            }
        }
        this.camera.updateMatrices();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].copy(this.prevMousePos, this.mousePos);
        return updated;
    }
    moveInDirection(dir, speed) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(this.camera.position, this.camera.position, dir, speed);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(this.camera.target, this.camera.target, dir, speed);
    }
    rotateAlongLocalY(amount, speed) {
        const mat = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].rotate(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create(), gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].identity(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create()), amount * speed, this.camera.upDir);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].transformMat4(this.tmpDir, this.tmpDir, mat);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
    }
    rotateAlongLocalX(amount, speed) {
        const forward = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].subtract(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), this.camera.target, this.camera.position);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(forward, forward);
        const localX = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].cross(localX, this.camera.upDir, forward);
        const mat = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].rotate(mat, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].identity(mat), amount * speed, localX);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].transformMat4(this.tmpDir, this.tmpDir, mat);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(this.camera.target, this.camera.position, this.tmpDir, this.radius);
    }
    rotateAroundPivot(dir) {
    }
    onKeyDown(e) {
        this.keyDownStatus[e.key.toLocaleLowerCase()] = true;
    }
    onKeyUp(e) {
        this.keyDownStatus[e.key.toLocaleLowerCase()] = false;
    }
    onMouseDown(e) {
        this.keyDownStatus[`mouse-${e.button}`] = true;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].set(this.prevMousePos, e.clientX, e.clientY);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].copy(this.mousePos, this.prevMousePos);
        this.handleClick(this.mousePos);
    }
    onTouchStart(e) {
        this.keyDownStatus[`mouse-0`] = true;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].set(this.prevMousePos, e.touches[0].clientX, e.touches[0].clientY);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].copy(this.mousePos, this.prevMousePos);
        this.numTouches = e.touches.length;
    }
    onMouseUp(e) {
        this.keyDownStatus[`mouse-${e.button}`] = false;
    }
    onTouchEnd(e) {
        this.keyDownStatus[`mouse-0`] = false;
        this.numTouches = 0;
    }
    onMouseMove(e) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].set(this.mousePos, e.clientX, e.clientY);
    }
    onTouchMove(e) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec2"].set(this.mousePos, e.touches[0].clientX, e.touches[0].clientY);
        this.numTouches = e.touches.length;
    }
    onMouseWheel(e) {
        window.setMoveSpeed(this.moveSpeed *= e.deltaY < 0 ? 1.1 : 0.9);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (OrbitController);


/***/ }),

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/*! exports provided: RenderMode, SkyMode, MAX_PATH_TRACE_SAMPLES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderMode", function() { return RenderMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkyMode", function() { return SkyMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_PATH_TRACE_SAMPLES", function() { return MAX_PATH_TRACE_SAMPLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Renderer; });
/* harmony import */ var _ShaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShaderUtils */ "./src/ShaderUtils.ts");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");


const UNIFORMS = [
    'time', 'resolution',
    'viewMatInv', 'projMatInv', 'camMatInv', 'prevCamMat',
    'sceneBBoxMin', 'sceneBBoxMax', 'sceneCenter', 'rootHalfSide',
    'maxIters', 'drawLevel', 'projectionFactor',
    'nodes',
    'viewerRenderMode',
    'selectedVoxelIndex', 'uniqueColors',
    'lightPos', 'enableShadows', 'normalEpsilon',
    'minDepthTex', 'useBeamOptimization',
    'depthTex', 'hitNormTex',
    'ptFrame', 'prevFrameTex', 'nPathTraceBounces', 'depthOfField',
    'skyMode'
];
const NORMAL_UNIFORMS = ['depthTex', 'viewProjMatInv'];
const TEX_UNIFORMS = ['tex'];
var RenderMode;
(function (RenderMode) {
    RenderMode[RenderMode["ITERATIONS"] = 0] = "ITERATIONS";
    RenderMode[RenderMode["DEPTH"] = 1] = "DEPTH";
    RenderMode[RenderMode["DIFFUSE_LIGHTING"] = 2] = "DIFFUSE_LIGHTING";
    RenderMode[RenderMode["PATH_TRACING"] = 3] = "PATH_TRACING";
    RenderMode[RenderMode["NORMAL"] = 4] = "NORMAL";
})(RenderMode || (RenderMode = {}));
var SkyMode;
(function (SkyMode) {
    SkyMode[SkyMode["WHITE"] = 0] = "WHITE";
    SkyMode[SkyMode["RAY_DIRECTION"] = 1] = "RAY_DIRECTION";
    SkyMode[SkyMode["ATHMOSPHERE"] = 2] = "ATHMOSPHERE";
})(SkyMode || (SkyMode = {}));
const MAX_PATH_TRACE_SAMPLES = 64;
class Renderer {
    constructor(camera, canvas) {
        this.camera = camera;
        this.canvas = canvas;
        this.state = {
            startTime: new Date().getTime() / 1000,
            time: 0,
            frame: 0,
            cameraUpdateFrame: 0,
            pixelTolerance: 1,
            renderScale: 1,
            drawLevel: 1,
            maxIterations: 250,
            renderMode: RenderMode.NORMAL,
            useBeamOptimization: true,
            showUniqueNodeColors: false,
            nPathTraceBounces: 1,
            depthOfField: 0,
            selectedVoxelIndex: -1,
            lightPos: gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create(),
            skyMode: 0,
        };
        this.gl = canvas.getContext("webgl2");
        this.maxT3DTexels = this.gl.getParameter(this.gl.MAX_3D_TEXTURE_SIZE);
    }
    initialize() {
        const { gl, canvas } = this;
        const BEAM_SIZE = 8;
        const minDepthW = Math.ceil(canvas.width / BEAM_SIZE), minDepthH = Math.ceil(canvas.height / BEAM_SIZE);
        [this.minDepthFBO, this.minDepthTex] = this.setupTexFBO(gl.TEXTURE1, { width: minDepthW, height: minDepthH });
        [this.fullDepthFBO, this.fullDepthTex] = this.setupTexFBO(gl.TEXTURE2);
        [this.normalFBO, this.normalTex] = this.setupTexFBO(gl.TEXTURE3, { internalFormat: gl.RGB8, format: gl.RGB, type: gl.UNSIGNED_BYTE });
        [this.ptFBO1, this.ptTex1] = this.setupTexFBO(gl.TEXTURE4, { internalFormat: gl.RGBA32F, format: gl.RGBA, type: gl.FLOAT });
        [this.ptFBO2, this.ptTex2] = this.setupTexFBO(gl.TEXTURE5, { internalFormat: gl.RGBA32F, format: gl.RGBA, type: gl.FLOAT });
    }
    prepPathTraceRender() {
        const { gl, state: { frame } } = this;
        if (frame % 2 === 0) {
            gl.uniform1i(this.pathTraceUniformDict.prevFrameTex, 5);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.ptFBO1);
            gl.activeTexture(gl.TEXTURE4);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.activeTexture(gl.TEXTURE5);
            gl.bindTexture(gl.TEXTURE_2D, this.ptTex2);
            return { uniform: 4, slot: gl.TEXTURE4, texture: this.ptTex1 };
        }
        else {
            gl.uniform1i(this.pathTraceUniformDict.prevFrameTex, 4);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.ptFBO2);
            gl.activeTexture(gl.TEXTURE4);
            gl.bindTexture(gl.TEXTURE_2D, this.ptTex1);
            gl.activeTexture(gl.TEXTURE5);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return { uniform: 5, slot: gl.TEXTURE5, texture: this.ptTex2 };
        }
    }
    render() {
        const { gl, canvas, state, viewerUniformDict, depthUniformDict, normalUniformDict, texUniformDict } = this;
        if (this.state.useBeamOptimization &&
            !(state.renderMode === RenderMode.PATH_TRACING && state.frame > state.cameraUpdateFrame)) {
            gl.useProgram(this.depthProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.minDepthFBO);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, null);
            const width = Math.ceil(canvas.width / 8);
            const height = Math.ceil(canvas.height / 8);
            this.setInitialUniforms(depthUniformDict);
            gl.uniform2f(depthUniformDict.resolution, width, height);
            gl.uniform1i(depthUniformDict.useBeamOptimization, 0);
            gl.uniform1f(depthUniformDict.projectionFactor, this.getProjectionFactor(1, 8));
            gl.viewport(0, 0, width, height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.minDepthTex);
        }
        if (state.renderMode === RenderMode.NORMAL) {
            gl.useProgram(this.depthProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fullDepthFBO);
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.setInitialUniforms(depthUniformDict);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, this.fullDepthTex);
            gl.useProgram(this.normalProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.normalFBO);
            gl.activeTexture(gl.TEXTURE3);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.setNormalUniforms(normalUniformDict);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.activeTexture(gl.TEXTURE3);
            gl.bindTexture(gl.TEXTURE_2D, this.normalTex);
        }
        if (state.renderMode === RenderMode.PATH_TRACING) {
            if (state.frame > state.cameraUpdateFrame + MAX_PATH_TRACE_SAMPLES)
                return;
            gl.useProgram(this.pathTraceProgram);
            const { uniform, slot, texture } = this.prepPathTraceRender();
            gl.useProgram(this.pathTraceProgram);
            this.setInitialUniforms(this.pathTraceUniformDict);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.activeTexture(slot);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.useProgram(this.texProgram);
            gl.uniform1i(texUniformDict.tex, uniform);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(this.viewerProgram);
            this.setInitialUniforms(viewerUniformDict);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        state.frame++;
    }
    initScene(svdag) {
        this.svdag = svdag;
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].copy(this.state.lightPos, svdag.bboxEnd);
    }
    async initShaders() {
        const { gl, svdag } = this;
        const vertShader = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadVertShader"])(gl);
        const viewerFragShader = await Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadRaycastFragShader"])(gl, svdag.nLevels, 'viewer');
        const depthFragShader = await Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadRaycastFragShader"])(gl, svdag.nLevels, 'depth');
        const normalFragShader = await Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadNormalFragShader"])(gl);
        const pathTraceFragShader = await Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadRaycastFragShader"])(gl, svdag.nLevels, 'pathtracing');
        const texFragShader = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadTextureFragShader"])(gl);
        this.viewerProgram = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadProgram"])(gl, vertShader, viewerFragShader);
        this.depthProgram = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadProgram"])(gl, vertShader, depthFragShader);
        this.normalProgram = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadProgram"])(gl, vertShader, normalFragShader);
        this.pathTraceProgram = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadProgram"])(gl, vertShader, pathTraceFragShader);
        this.texProgram = Object(_ShaderUtils__WEBPACK_IMPORTED_MODULE_0__["loadProgram"])(gl, vertShader, texFragShader);
        gl.useProgram(this.viewerProgram);
    }
    setupTexFBO(texNum = this.gl.TEXTURE0, { internalFormat = this.gl.RGBA32F, format = this.gl.RGBA, type = this.gl.FLOAT, width = this.canvas.width, height = this.canvas.height, magFilter = this.gl.NEAREST, minFilter = this.gl.NEAREST, wrapS = this.gl.CLAMP_TO_EDGE, wrapT = this.gl.CLAMP_TO_EDGE, } = {}) {
        const { gl } = this;
        const fbo = gl.createFramebuffer();
        const tex = gl.createTexture();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.activeTexture(texNum);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
        const fboStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (fboStatus !== gl.FRAMEBUFFER_COMPLETE)
            console.error('FBO error', fboStatus);
        return [fbo, tex];
    }
    initUniforms() {
        const { gl } = this;
        this.viewerUniformDict = {};
        this.depthUniformDict = {};
        this.normalUniformDict = {};
        this.pathTraceUniformDict = {};
        this.texUniformDict = {};
        UNIFORMS.forEach(u => this.viewerUniformDict[u] = gl.getUniformLocation(this.viewerProgram, u));
        UNIFORMS.forEach(u => this.depthUniformDict[u] = gl.getUniformLocation(this.depthProgram, u));
        NORMAL_UNIFORMS.forEach(u => this.normalUniformDict[u] = gl.getUniformLocation(this.normalProgram, u));
        UNIFORMS.forEach(u => this.pathTraceUniformDict[u] = gl.getUniformLocation(this.pathTraceProgram, u));
        TEX_UNIFORMS.forEach(u => this.texUniformDict[u] = gl.getUniformLocation(this.texProgram, u));
    }
    getProjectionFactor(pixelTolerance, screenDivisor) {
        const { canvas, camera } = this;
        const inv_2tan_half_fovy = 1.0 / (2.0 * Math.tan(0.5 * camera.fovY));
        const screen_tolerance = pixelTolerance / (canvas.height / screenDivisor);
        return inv_2tan_half_fovy / screen_tolerance;
    }
    setInitialUniforms(ud) {
        const { canvas, gl, camera, svdag, state } = this;
        gl.uniform2f(ud.resolution, canvas.width, canvas.height);
        gl.uniform1i(ud.nodes, 0);
        gl.uniform3fv(ud.sceneBBoxMin, svdag.bboxStart);
        gl.uniform3fv(ud.sceneBBoxMax, svdag.bboxEnd);
        gl.uniform3fv(ud.sceneCenter, svdag.bboxCenter);
        gl.uniform1f(ud.rootHalfSide, svdag.rootSide / 2.0);
        gl.uniform3fv(ud.lightPos, state.lightPos);
        gl.uniform1ui(ud.maxIters, state.maxIterations);
        gl.uniform1ui(ud.drawLevel, state.drawLevel);
        gl.uniform1f(ud.projectionFactor, this.getProjectionFactor(state.pixelTolerance, 1));
        gl.uniform1i(ud.uniqueColors, state.showUniqueNodeColors ? 1 : 0);
        gl.uniform1i(ud.viewerRenderMode, state.renderMode);
        gl.uniformMatrix4fv(ud.camMatInv, false, camera.camMatInv);
        gl.uniformMatrix4fv(ud.prevCamMat, false, camera.prevCamMat);
        gl.uniform1f(ud.time, new Date().getTime() / 1000 - state.startTime);
        gl.uniform1ui(ud.ptFrame, state.frame);
        gl.uniform1i(ud.nPathTraceBounces, state.nPathTraceBounces);
        gl.uniform1f(ud.depthOfField, state.depthOfField);
        gl.uniform1i(ud.skyMode, state.skyMode);
        gl.uniform1i(ud.useBeamOptimization, state.useBeamOptimization ? 1 : 0);
        gl.uniform1i(ud.minDepthTex, 1);
        gl.uniform1i(ud.depthTex, 2);
        gl.uniform1i(ud.hitNormTex, 3);
    }
    setNormalUniforms(ud) {
        const { gl, camera } = this;
        gl.uniformMatrix4fv(ud.viewProjMatInv, false, camera.projMatInv);
        gl.uniform1i(ud.depthTex, 2);
    }
    createNodesTexture() {
        const { gl } = this;
        this.texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_3D, this.texture);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);
    }
    deleteNodesTexture() {
        if (this.texture !== undefined) {
            this.gl.deleteTexture(this.texture);
        }
    }
    uploadTexData(nNewNodes) {
        const { gl, svdag, maxT3DTexels } = this;
        const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;
        const neededTexels = svdag.nodes.length;
        const depthLayers = Math.ceil(neededTexels / maxT3DTexelsPow2);
        const nTexelsToAllocate = maxT3DTexelsPow2 * depthLayers;
        const chunkStart = svdag.dataLoadedOffset / 4 - nNewNodes;
        console.log(chunkStart, svdag.dataLoadedOffset / 4, nNewNodes);
        gl.activeTexture(gl.TEXTURE0);
        if (chunkStart === 0) {
            console.log(`Initial uploading of nodes to 3D texture (Resolution: ${maxT3DTexels} x ${maxT3DTexels} x ${depthLayers}, nNodes: ${svdag.dataLoadedOffset}/${svdag.nodes.length})...`);
            if (svdag.nodes.length != nTexelsToAllocate) {
                console.log('Resizing node buffer from ', svdag.nodes.length, 'to', nTexelsToAllocate, '(3D Texture padding)');
                const paddedNodes = new Uint32Array(nTexelsToAllocate);
                paddedNodes.set(svdag.nodes);
                svdag.nodes = paddedNodes;
            }
            gl.texStorage3D(gl.TEXTURE_3D, 1, gl.R32UI, maxT3DTexels, maxT3DTexels, depthLayers);
            gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, maxT3DTexels, maxT3DTexels, depthLayers, gl.RED_INTEGER, gl.UNSIGNED_INT, svdag.nodes);
        }
        else {
            const xOffset = 0;
            const yOffset = 0;
            const zOffset = Math.floor(chunkStart / maxT3DTexelsPow2);
            const chunkStartZ = zOffset;
            const chunkEndZ = Math.floor((svdag.dataLoadedOffset / 4) / maxT3DTexelsPow2);
            const updateWidth = maxT3DTexels;
            const updateHeight = maxT3DTexels;
            const updateDepth = (chunkEndZ - chunkStartZ) + 1;
            const newNodes = svdag.nodes.slice(yOffset * maxT3DTexels + chunkStartZ * maxT3DTexelsPow2, maxT3DTexels + updateHeight * maxT3DTexels + chunkEndZ * maxT3DTexelsPow2);
            const progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
            console.log(`Uploading data to 3D texture (${svdag.dataLoadedOffset / 4}/${svdag.originalNodeLength} [${progressPct}%])...`);
            console.log('#layers', depthLayers, 'start', zOffset, 'chunkStart', chunkStart, 'newNodes', nNewNodes, 'end', chunkEndZ, 'depth', updateDepth);
            gl.texSubImage3D(gl.TEXTURE_3D, 0, xOffset, yOffset, zOffset, updateWidth, updateHeight, updateDepth, gl.RED_INTEGER, gl.UNSIGNED_INT, newNodes);
        }
    }
}


/***/ }),

/***/ "./src/SVDAG.ts":
/*!**********************!*\
  !*** ./src/SVDAG.ts ***!
  \**********************/
/*! exports provided: EncodedOctree, SVDAG, ESVDAG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncodedOctree", function() { return EncodedOctree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVDAG", function() { return SVDAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESVDAG", function() { return ESVDAG; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");

function bitCount(num) {
    let n = num;
    n = ((0xaa & n) >> 1) + (0x55 & n);
    n = ((0xcc & n) >> 2) + (0x33 & n);
    n = ((0xf0 & n) >> 4) + (0x0f & n);
    return n;
}
const dec2bin = (dec) => (dec >>> 0).toString(2);
class EncodedOctree {
    constructor() {
        this.bboxStart = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.bboxEnd = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.bboxCenter = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
    }
}
class SVDAG extends EncodedOctree {
    constructor() {
        super(...arguments);
        this.initialized = false;
        this.dataLoadedOffset = 0;
        this.renderPreferences = {};
    }
    load(buffer) {
        const i = this.parseHeader(buffer);
        this.nodes.set(new Uint32Array(buffer.slice(i)));
        return this;
    }
    parseHeader(buffer) {
        let i = 0;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(this.bboxStart, new Float32Array(buffer.slice(i, i + 12)));
        i += 12;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(this.bboxEnd, new Float32Array(buffer.slice(i, i + 12)));
        i += 12;
        this.rootSide = new Float32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.nLevels = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.nNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        const firstLeafPointer = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        const nodeBufLength = new Uint32Array(buffer.slice(i, i + 4))[0];
        this.originalNodeLength = nodeBufLength;
        i += 4;
        this.nodes = new Uint32Array(nodeBufLength);
        const maxBboxSz = 25000;
        if (gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].len(this.bboxStart) === 0 && gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].len(this.bboxEnd) > maxBboxSz) {
            console.log('Correcting large bbox (scaling 20x down)');
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].div(this.bboxEnd, this.bboxEnd, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(10, 10, 10));
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(this.bboxStart, this.bboxStart, gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(0.1, 0.1, 0.1));
            this.rootSide /= 10;
        }
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(this.bboxCenter, this.bboxEnd, this.bboxStart);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(this.bboxCenter, this.bboxStart, this.bboxCenter, 0.5);
        return i;
    }
    loadChunk(buffer) {
        if (!this.initialized) {
            const lastOffset = this.parseHeader(buffer.buffer);
            this.initialized = true;
            if ((buffer.length - lastOffset) / 4 !== this.nodes.length) {
                this.nodes.fill(Math.pow(2, 31) - 1);
            }
            this.loadChunk(buffer.slice(lastOffset));
        }
        else {
            this.nodes.set(new Uint32Array(buffer.buffer), this.dataLoadedOffset / 4);
            this.dataLoadedOffset += buffer.length;
        }
    }
    castRay(o, d, maxIters = 100) {
        const stepSize = this.rootSide / Math.pow(2, this.nLevels - 1);
        const p = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create(), o);
        for (let i = 0; i < maxIters; i++) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(p, p, d, stepSize);
            const node = this.getVoxel(p);
            if (node) {
                return { ...node, maxRayLength: stepSize * maxIters };
            }
        }
        return null;
    }
    getVoxel(pos) {
        const nodeCenter = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(nodeCenter, this.bboxCenter);
        let nodeIndex = 0;
        let hs = this.rootSide / 2;
        for (let lev = 0; lev < this.nLevels; lev++) {
            const childIndex = (pos[0] > nodeCenter[0] ? 4 : 0)
                + (pos[1] > nodeCenter[1] ? 2 : 0)
                + (pos[2] > nodeCenter[2] ? 1 : 0);
            const header = this.nodes[nodeIndex];
            const hasChild = (header & (1 << childIndex)) !== 0;
            if (!hasChild) {
                return null;
            }
            else if (lev === this.nLevels - 1) {
                return { nodeIndex, hitPos: nodeCenter };
            }
            hs /= 2;
            nodeCenter[0] += (pos[0] > nodeCenter[0]) ? hs : -hs;
            nodeCenter[1] += (pos[1] > nodeCenter[1]) ? hs : -hs;
            nodeCenter[2] += (pos[2] > nodeCenter[2]) ? hs : -hs;
            const childPtrOffset = bitCount(header >> childIndex);
            nodeIndex = this.nodes[nodeIndex + childPtrOffset];
        }
        return null;
    }
}
class ESVDAG extends EncodedOctree {
    load(buffer) {
        console.log(`Loading SVDAG (${buffer.byteLength} bytes)`);
        let i = 0;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(this.bboxStart, new Float32Array(buffer.slice(i, i + 12)));
        i += 12;
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(this.bboxEnd, new Float32Array(buffer.slice(i, i + 12)));
        i += 12;
        const rootSide = new Float32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.nLevels = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        const nNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        const nInnerNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.innerNodes = new Uint16Array(buffer.slice(i, i + 2 * nInnerNodes));
        i += 2 * nInnerNodes;
        const nLeafNodes = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.leafNodes = new BigUint64Array(buffer.slice(i, i + 8 * nLeafNodes));
        i += 8 * nLeafNodes;
        const nLevelOffsets = new Uint32Array(buffer.slice(i, i + 4))[0];
        i += 4;
        this.levelOffsets = new Uint32Array(buffer.slice(i, i + nLevelOffsets * 4));
        i += nLevelOffsets * 4;
        console.log('OK!');
    }
}


/***/ }),

/***/ "./src/SceneProvider.ts":
/*!******************************!*\
  !*** ./src/SceneProvider.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SceneProvider; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.ts");


class SceneProvider {
    static async getGeneratedSceneList() {
        const generatedSceneOptions = [
            {
                label: 'Cross fractal',
                getScene: async (svdag) => SceneProvider.generateCrossFractal(svdag),
                loadType: 'preloaded',
            },
            {
                label: 'Menger sponge fractal',
                getScene: async (svdag) => SceneProvider.generateMengerSpongeFractal(svdag),
                loadType: 'preloaded',
            },
            {
                label: 'Cube fractal',
                getScene: async (svdag) => SceneProvider.generateCubeFractal(svdag),
                loadType: 'preloaded',
            },
            {
                label: 'Pyramid fractal',
                getScene: async (svdag) => SceneProvider.generatePyramidFractal(svdag),
                loadType: 'preloaded',
            },
        ];
        return generatedSceneOptions;
    }
    static async getPrebuiltSceneList() {
        try {
            const prebuiltScenes = await SceneProvider.fetchPrebuiltScenes();
            return prebuiltScenes.map(f => ({
                label: `${f.fileName} (${f.size})`,
                downloadPath: f.absolutePath,
                loadType: 'stream',
            }));
        }
        catch (e) {
            console.error('Could not fetch prebuilt scenes :(', e);
            return [];
        }
    }
    static async fetchPrebuiltScenes() {
        const hostUrl = `https://allaboutsteinsgate.info/dev/dagger/scenes/`;
        const res = await fetch(`${hostUrl}?C=N;O=A`);
        const pageString = await res.text();
        const doc = new DOMParser().parseFromString(pageString, 'text/html');
        return Array.from(doc.querySelectorAll('tr'))
            .slice(3, -1)
            .map((row) => ({
            fileName: row.childNodes[1].innerText.trim().replace('.svdag', ''),
            absolutePath: `${hostUrl}${row.querySelector('a').href.split('/').pop()}`,
            size: row.childNodes[3].innerText,
        }));
    }
    static generateBaseFractal(svdag, nNodes, nodeData) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].set(svdag.bboxStart, 0, 0, 0);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].set(svdag.bboxEnd, 100, 100, 100);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].sub(svdag.bboxCenter, svdag.bboxEnd, svdag.bboxStart);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].scaleAndAdd(svdag.bboxCenter, svdag.bboxStart, svdag.bboxCenter, 0.5);
        svdag.rootSide = 100;
        svdag.nLevels = 20;
        svdag.nNodes = nNodes;
        svdag.nodes = nodeData;
        return svdag;
    }
    static generatePyramidFractal(svdag) {
        svdag.renderPreferences = {
            renderMode: _Renderer__WEBPACK_IMPORTED_MODULE_1__["RenderMode"].ITERATIONS,
            maxIterations: 100,
            spawnPosition: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(125, 125, 125),
        };
        return SceneProvider.generateBaseFractal(svdag, 1, new Uint32Array([
            0b11101000,
            0, 0, 0, 0,
        ]));
    }
    static generateCubeFractal(svdag) {
        svdag.renderPreferences = {
            renderMode: _Renderer__WEBPACK_IMPORTED_MODULE_1__["RenderMode"].PATH_TRACING,
            maxIterations: 30,
            spawnPosition: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(150, 150, 150),
            moveSpeed: 16,
        };
        return SceneProvider.generateBaseFractal(svdag, 2, new Uint32Array([
            0b11111111,
            9, 9, 9, 9, 9, 9, 9, 9,
            0b01111111,
            0, 0, 0, 0, 0, 0, 0
        ]));
    }
    static generateCrossFractal(svdag) {
        svdag.renderPreferences = {
            renderMode: _Renderer__WEBPACK_IMPORTED_MODULE_1__["RenderMode"].PATH_TRACING,
            maxIterations: 30,
            spawnPosition: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(150, 150, 150),
            moveSpeed: 16,
        };
        return SceneProvider.generateBaseFractal(svdag, 9, new Uint32Array([
            0b11111111,
            ...Array.from(Array(8).keys()).map((i) => (9 + i * 8)),
            0b01111111,
            0, 0, 0, 0, 0, 0, 0,
            0b10111111,
            0, 0, 0, 0, 0, 0, 0,
            0b11011111,
            0, 0, 0, 0, 0, 0, 0,
            0b11101111,
            0, 0, 0, 0, 0, 0, 0,
            0b11110111,
            0, 0, 0, 0, 0, 0, 0,
            0b11111011,
            0, 0, 0, 0, 0, 0, 0,
            0b11111101,
            0, 0, 0, 0, 0, 0, 0,
            0b11111110,
            0, 0, 0, 0, 0, 0, 0,
        ]));
    }
    static generateMengerSpongeFractal(svdag) {
        svdag.renderPreferences = {
            renderMode: _Renderer__WEBPACK_IMPORTED_MODULE_1__["RenderMode"].PATH_TRACING,
            maxIterations: 30,
            spawnPosition: gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(150, 150, 150),
            moveSpeed: 16,
        };
        return SceneProvider.generateBaseFractal(svdag, 5, new Uint32Array([
            0b11111111,
            ...Array.from(Array(8).keys()).map((i) => (9 + i * 5)),
            0b11101000,
            0, 0, 0, 0,
            0b11010100,
            0, 0, 0, 0,
            0b10110010,
            0, 0, 0, 0,
            0b01110001,
            0, 0, 0, 0,
            0b10001110,
            0, 0, 0, 0,
            0b01001101,
            0, 0, 0, 0,
            0b00101011,
            0, 0, 0, 0,
            0b00010111,
            0, 0, 0, 0,
        ]));
    }
}


/***/ }),

/***/ "./src/ShaderUtils.ts":
/*!****************************!*\
  !*** ./src/ShaderUtils.ts ***!
  \****************************/
/*! exports provided: loadVertShader, loadTextureFragShader, loadRaycastFragShader, loadNormalFragShader, loadProgram */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadVertShader", function() { return loadVertShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTextureFragShader", function() { return loadTextureFragShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRaycastFragShader", function() { return loadRaycastFragShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNormalFragShader", function() { return loadNormalFragShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadProgram", function() { return loadProgram; });
function loadVertShader(gl) {
    const vertSrc = `#version 300 es
    uniform float time;
    void main(void) {
      vec2 outUV = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
      outUV = outUV * 2.0f - 1.0f;
      // gl_Position = vec4(outUV * (1.0 / time) + vec2(cos(time * time), sin(time * time)), 0.0f, 1.0f); // wiggly test
      gl_Position = vec4(outUV, 0.0f, 1.0f);
    }
  `;
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertSrc);
    gl.compileShader(vertShader);
    console.log('Vert shader: ', gl.getShaderInfoLog(vertShader) || 'OK');
    return vertShader;
}
function loadTextureFragShader(gl) {
    const shaderSrc = `#version 300 es
    precision highp float;
    out vec4 fragColor;
    uniform sampler2D tex;

    void main () {
      vec3 color = texelFetch(tex, ivec2(gl_FragCoord.xy), 0).rgb;
      fragColor = vec4(color, 1);
    }
  `;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    console.log(`Texture shader: `, gl.getShaderInfoLog(shader) || 'OK');
    return shader;
}
async function loadRaycastFragShader(gl, nLevels, mode) {
    const maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
    const maxT3DTexelsPow2 = maxT3DTexels * maxT3DTexels;
    const shaderSrcRes = await fetch('static/raycast.glsl');
    let shaderSrc = await shaderSrcRes.text();
    const defines = `#version 300 es
#define INNER_LEVELS ${nLevels * 2 - 1}u
#define TEX3D_SIZE ${maxT3DTexels}
#define TEX3D_SIZE_POW2 ${maxT3DTexelsPow2}
#define VIEWER_MODE ${mode === 'viewer' ? 1 : 0}
#define DEPTH_MODE ${mode === 'depth' ? 1 : 0}
#define PATH_TRACE_MODE ${mode === 'pathtracing' ? 1 : 0}
`;
    shaderSrc = defines + '\n' + shaderSrc.split('\n').splice(defines.split('\n').length).join('\n');
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    console.log(`Raycast shader (${mode}): `, gl.getShaderInfoLog(shader) || 'OK');
    return shader;
}
async function loadNormalFragShader(gl) {
    const shaderSrcRes = await fetch('static/normalFromDepth.glsl');
    const shaderSrc = await shaderSrcRes.text();
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, shaderSrc);
    gl.compileShader(shader);
    console.log(`Normal shader: `, gl.getShaderInfoLog(shader) || 'OK');
    return shader;
}
function loadProgram(gl, vertShader, fragShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw 'Could not compile WebGL program. \n\n' + gl.getProgramInfoLog(program);
    }
    gl.useProgram(program);
    return program;
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: GL, loadScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL", function() { return GL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScene", function() { return loadScene; });
/* harmony import */ var _SVDAG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVDAG */ "./src/SVDAG.ts");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.ts");
/* harmony import */ var _OrbitController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrbitController */ "./src/OrbitController.ts");
/* harmony import */ var _SceneProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SceneProvider */ "./src/SceneProvider.ts");






const GL = WebGL2RenderingContext;
const MAX_DRAW_LEVEL = 20;
let canvas;
let controller;
let scene;
const sceneList = [];
const camera = new _Camera__WEBPACK_IMPORTED_MODULE_2__["default"](75);
let renderer;
const win = window;
let fpsCountTime = Date.now();
let fpsCount = 0;
let latestFps = 1;
let lastFrameTime = Date.now();
let haveSettingsChanged = false;
const params = ['renderScale', 'drawLevel', 'renderMode', 'moveSpeed', 'maxIterations', 'pixelTolerance',
    'showUniqueNodeColors', 'useBeamOptimization'];
function setRenderScale(num) {
    renderer.state.renderScale = num;
    canvas.width = window.innerWidth * renderer.state.renderScale;
    canvas.height = window.innerHeight * renderer.state.renderScale;
    canvas.style.transform = `translate(-50%, -50%) scale(${1 / renderer.state.renderScale})`;
    document.getElementById('renderScale').value = `${renderer.state.renderScale}`;
    haveSettingsChanged = true;
}
win.setRenderScale = setRenderScale.bind(undefined);
function setDrawLevel(num) {
    renderer.state.drawLevel = Math.max(1, Math.min(num, MAX_DRAW_LEVEL));
    document.getElementById('drawLevel').value = `${renderer.state.drawLevel}`;
    haveSettingsChanged = true;
}
win.setDrawLevel = setDrawLevel.bind(undefined);
function setRenderMode(num) {
    console.log('setting render mode', num);
    renderer.state.renderMode = typeof num === 'string' ? parseInt(num, 10) : num;
    document.getElementById('renderMode').value = `${renderer.state.renderMode}`;
    haveSettingsChanged = true;
}
win.setRenderMode = setRenderMode.bind(undefined);
function setSkyMode(num) {
    console.log('setting sky mode', num);
    renderer.state.skyMode = typeof num === 'string' ? parseInt(num, 10) : num;
    document.getElementById('skyMode').value = `${renderer.state.skyMode}`;
    haveSettingsChanged = true;
}
win.setSkyMode = setSkyMode.bind(undefined);
function setMoveSpeed(num) {
    controller.moveSpeed = typeof num === 'number' ? num : parseFloat(num);
    document.getElementById('moveSpeed').value = controller.moveSpeed.toFixed(1);
    haveSettingsChanged = true;
}
win.setMoveSpeed = setMoveSpeed.bind(undefined);
function setMaxIterations(num) {
    renderer.state.maxIterations = Math.max(1, Math.min(num, 1000));
    document.getElementById('maxIterations').value = renderer.state.maxIterations.toFixed(0);
    haveSettingsChanged = true;
}
win.setMaxIterations = setMaxIterations.bind(undefined);
function setPixelTolerance(num) {
    renderer.state.pixelTolerance = typeof num === 'number' ? num : parseFloat(num);
    document.getElementById('pixelTolerance').value = renderer.state.pixelTolerance.toFixed(2);
    haveSettingsChanged = true;
}
win.setPixelTolerance = setPixelTolerance.bind(undefined);
function setShowUniqueColors(val) {
    renderer.state.showUniqueNodeColors = val;
    haveSettingsChanged = true;
}
win.setShowUniqueColors = setShowUniqueColors.bind(undefined);
function setUseBeamOptimization(val, disable) {
    renderer.state.useBeamOptimization = val;
    if (disable) {
        const checkbox = document.getElementById('beamOptim');
        checkbox.checked = val;
        checkbox.disabled = true;
    }
    haveSettingsChanged = true;
}
win.setUseBeamOptimization = setUseBeamOptimization.bind(undefined);
function setNPathTraceBounces(num) {
    renderer.state.nPathTraceBounces = Math.max(0, Math.min(parseInt(num.toString()), 100));
    document.getElementById('nPathTraceBounces').value = renderer.state.nPathTraceBounces.toString();
    haveSettingsChanged = true;
}
win.setNPathTraceBounces = setNPathTraceBounces.bind(undefined);
function setDepthOfField(num) {
    console.log(num);
    renderer.state.depthOfField = Math.max(0, Math.min(parseFloat(num.toString()), 100));
    document.getElementById('depthOfField').value = renderer.state.depthOfField.toString();
    haveSettingsChanged = true;
}
win.setDepthOfField = setDepthOfField.bind(undefined);
const progressBar = document.querySelector('#progress');
async function loadSceneStream(downloadPath) {
    console.log('Streaming', downloadPath, '...');
    const response = await fetch(downloadPath);
    const reader = response.body.getReader();
    const { done, value } = await reader.read();
    const svdag = new _SVDAG__WEBPACK_IMPORTED_MODULE_0__["SVDAG"]();
    renderer.initScene(svdag);
    svdag.loadChunk(value);
    renderer.uploadTexData(svdag.dataLoadedOffset / 4);
    let progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
    const loadButton = document.getElementById('load');
    loadButton.disabled = true;
    loadButton.innerText = `Load (${progressPct}%)`;
    const loadNodesPromise = async () => {
        let lastUpload = new Date();
        let lastUploadIndex = svdag.dataLoadedOffset;
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            console.log(`Received ${value.byteLength} bytes (${value.length / 1000000} MB)`);
            svdag.loadChunk(value);
            progressPct = Math.round((svdag.dataLoadedOffset / 4) / svdag.originalNodeLength * 100);
            loadButton.innerText = `Load (${progressPct}%)`;
            const d = new Date();
            if (d.getTime() - lastUpload.getTime() > 1000) {
                renderer.uploadTexData((svdag.dataLoadedOffset - lastUploadIndex) / 4);
                lastUploadIndex = svdag.dataLoadedOffset;
                lastUpload = d;
            }
        }
        renderer.uploadTexData((svdag.dataLoadedOffset - lastUploadIndex) / 4);
        return;
    };
    const finish = () => {
        console.log('Finished loading!');
        loadButton.innerText = 'Load';
        loadButton.disabled = false;
    };
    if (done || progressPct >= 99) {
        finish();
    }
    else {
        loadNodesPromise().then(finish);
    }
    return svdag;
}
async function loadScene(sceneOption) {
    console.log(`Loading "${sceneOption.label}" (${sceneOption.loadType})...`);
    renderer.deleteNodesTexture();
    const oldBboxCenter = (scene === null || scene === void 0 ? void 0 : scene.bboxCenter) || gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create();
    renderer.createNodesTexture();
    let svdag;
    if (sceneOption.loadType === 'stream') {
        svdag = await loadSceneStream(sceneOption.downloadPath);
    }
    else if (sceneOption.loadType === 'fetch') {
        svdag = new _SVDAG__WEBPACK_IMPORTED_MODULE_0__["SVDAG"]();
        renderer.initScene(svdag);
        const response = await fetch(sceneOption.downloadPath);
        svdag.load(await response.arrayBuffer());
        svdag.dataLoadedOffset = svdag.nNodes * 4;
        renderer.uploadTexData(svdag.nNodes);
        svdag.renderPreferences.maxIterations = 250;
    }
    else if (sceneOption.loadType === 'preloaded') {
        svdag = new _SVDAG__WEBPACK_IMPORTED_MODULE_0__["SVDAG"]();
        renderer.initScene(svdag);
        await sceneOption.getScene(svdag);
        svdag.originalNodeLength = svdag.nodes.length;
        svdag.dataLoadedOffset = svdag.nNodes * 4;
        svdag.initialized = true;
        renderer.uploadTexData(svdag.nNodes);
        svdag.renderPreferences.maxIterations = 250;
    }
    if (svdag.renderPreferences.renderMode !== undefined)
        setRenderMode(svdag.renderPreferences.renderMode);
    if (svdag.renderPreferences.maxIterations)
        setMaxIterations(svdag.renderPreferences.maxIterations);
    if (svdag.renderPreferences.moveSpeed)
        setMoveSpeed(svdag.renderPreferences.moveSpeed);
    if (svdag.renderPreferences.spawnPosition)
        camera.position = svdag.renderPreferences.spawnPosition;
    gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].copy(renderer.state.lightPos, svdag.bboxEnd);
    console.log('Loaded!');
    console.log(`Levels: ${svdag.nLevels}, nodes: ${svdag.nNodes}`);
    console.log(`Bbox:\n\t[${svdag.bboxStart}]\n\t[${svdag.bboxEnd}]\n\t(center: [${svdag.bboxCenter}])`);
    setDrawLevel(svdag.nLevels);
    if (gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].dist(oldBboxCenter, svdag.bboxCenter) > 0.001 || svdag.renderPreferences.spawnPosition) {
        if (!svdag.renderPreferences.spawnPosition) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].copy(camera.position, svdag.bboxEnd);
        }
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].copy(camera.target, svdag.bboxCenter);
        if (!svdag.renderPreferences.moveSpeed) {
            setMoveSpeed(gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].distance(svdag.bboxStart, svdag.bboxEnd) * 0.01);
        }
    }
    camera.updateMatrices();
    controller.init();
    scene = svdag;
}
async function loadSelectedScene() {
    if (sceneList.length === 0)
        throw new Error('No scenes available!');
    const selector = document.getElementById('sceneSelector');
    const selectedSceneIndex = parseInt(selector.options[selector.selectedIndex].value) || 0;
    console.log(selectedSceneIndex, sceneList);
    await loadScene(sceneList[selectedSceneIndex]);
}
win.loadSelectedScene = loadSelectedScene.bind(undefined);
const fileInput = document.querySelector('#file-input');
fileInput.onchange = async (event) => {
    var _a;
    const target = event.target;
    console.log(target, target.files, (_a = target.files) === null || _a === void 0 ? void 0 : _a.length);
    if (target.files && target.files.length) {
        const file = target.files.item(0);
        const sceneOption = {
            label: file.name,
            getScene: async (svdag) => svdag.load(await file.arrayBuffer()),
            loadType: 'preloaded',
        };
        await loadScene(sceneOption);
    }
};
function render() {
    if (Date.now() > fpsCountTime + 1000) {
        fpsCountTime = Date.now();
        document.title = `DAGger - ${fpsCount} FPS`;
        latestFps = fpsCount;
        fpsCount = 0;
    }
    fpsCount++;
    const dt = 0.001 * (Date.now() - lastFrameTime);
    lastFrameTime = Date.now();
    const didUpdate = controller.update(dt);
    if (didUpdate || haveSettingsChanged) {
        haveSettingsChanged = false;
        renderer.state.cameraUpdateFrame = renderer.state.frame;
    }
    if (renderer.state.renderMode === _Renderer__WEBPACK_IMPORTED_MODULE_3__["RenderMode"].PATH_TRACING) {
        progressBar.style.width = `${100 * (renderer.state.frame - renderer.state.cameraUpdateFrame) / _Renderer__WEBPACK_IMPORTED_MODULE_3__["MAX_PATH_TRACE_SAMPLES"]}%`;
    }
    else {
        progressBar.style.width = '0%';
    }
    renderer.render();
    requestAnimationFrame(render);
}
async function init() {
    canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl2");
    renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_3__["default"](camera, canvas);
    setRenderScale(renderer.state.renderScale);
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    console.log(gl.getParameter(gl.VERSION), gl.getParameter(gl.SHADING_LANGUAGE_VERSION), gl.getParameter(gl.VENDOR));
    console.log('Supported extensions:', gl.getSupportedExtensions());
    const maxT3DTexels = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
    const maxNodes = Math.floor(Math.pow(maxT3DTexels, 3) / 5);
    console.log(`Max 3D tex = ${maxT3DTexels}. Max avg. nodes ~= ${maxNodes} = ${Math.round(maxNodes / 1e6)} MNodes`);
    const colorExt = gl.getExtension('EXT_color_buffer_float');
    if (!colorExt) {
        console.error('The the EXT_color_buffer_float extension is not available - some features might not work');
        window.setUseBeamOptimization(false, true);
        return;
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    sceneList.push(...(await _SceneProvider__WEBPACK_IMPORTED_MODULE_5__["default"].getGeneratedSceneList()));
    const sceneSelector = document.querySelector('#sceneSelector');
    const addSceneToUI = (item, index) => {
        const opt = document.createElement('option');
        opt.value = `${index}`;
        opt.innerText = item.label;
        sceneSelector.appendChild(opt);
    };
    sceneList.forEach(addSceneToUI);
    _SceneProvider__WEBPACK_IMPORTED_MODULE_5__["default"].getPrebuiltSceneList().then(scenes => {
        sceneList.push(...scenes);
        sceneSelector.innerHTML = '';
        sceneList.forEach(addSceneToUI);
    });
    controller = new _OrbitController__WEBPACK_IMPORTED_MODULE_4__["default"](camera, 1);
    await loadSelectedScene();
    controller.init();
    await renderer.initShaders();
    renderer.initialize();
    renderer.initUniforms();
    renderer.setInitialUniforms(renderer.viewerUniformDict);
    gl.disable(gl.DEPTH_TEST);
    canvas.tabIndex = 0;
    canvas.addEventListener('keydown', controller.onKeyDown.bind(controller));
    canvas.addEventListener('keyup', controller.onKeyUp.bind(controller));
    canvas.addEventListener('mousedown', controller.onMouseDown.bind(controller));
    canvas.addEventListener('mouseup', controller.onMouseUp.bind(controller));
    canvas.addEventListener('mousemove', controller.onMouseMove.bind(controller));
    canvas.addEventListener('wheel', controller.onMouseWheel.bind(controller));
    canvas.oncontextmenu = () => false;
    canvas.addEventListener('touchstart', controller.onTouchStart.bind(controller));
    canvas.addEventListener('touchend', controller.onTouchEnd.bind(controller));
    canvas.addEventListener('touchmove', controller.onTouchMove.bind(controller));
    canvas.addEventListener('keydown', (e) => {
        if (e.key === '1') {
            setDrawLevel(renderer.state.drawLevel - 1);
        }
        else if (e.key === '2') {
            setDrawLevel(renderer.state.drawLevel + 1);
        }
        else if (e.key === 'l') {
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].copy(renderer.state.lightPos, camera.position);
        }
    });
    setTimeout(() => {
        if (latestFps < 15) {
            setRenderScale(0.25);
        }
        else if (latestFps < 30) {
            setRenderScale(0.5);
        }
        else if (latestFps < 45) {
            setRenderScale(0.75);
        }
    }, 2500);
    render();
}
window.addEventListener('load', init);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map