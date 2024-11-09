import { Vector2d } from "../math/vector2d.ts";

/**
 * An object representing the result of an intersection.
 * @typedef {object} ResponseObject
 * @property {Renderable} a The first object participating in the intersection
 * @property {Renderable} b The second object participating in the intersection
 * @property {number} overlap Magnitude of the overlap on the shortest colliding axis
 * @property {Vector2d} overlapV The overlap vector (i.e. `overlapN.scale(overlap, overlap)`). If this vector is subtracted from the position of a, a and b will no longer be colliding
 * @property {Vector2d} overlapN The shortest colliding axis (unit-vector)
 * @property {boolean} aInB Whether the first object is entirely inside the second
 * @property {boolean} bInA Whether the second object is entirely inside the first
 * @property {number} indexShapeA The index of the colliding shape for the object a body
 * @property {number} indexShapeB The index of the colliding shape for the object b body
 */
class ResponseObject {
	constructor() {
		this.a = null;
		this.b = null;
		this.overlapN = new Vector2d();
		this.overlapV = new Vector2d();
		this.aInB = true;
		this.bInA = true;
		this.indexShapeA = -1;
		this.indexShapeB = -1;
		this.overlap = Number.MAX_VALUE;
	}

	/**
	 * Set some values of the response back to their defaults. <br>
	 * Call this between tests if you are going to reuse a single <br>
	 * Response object for multiple intersection tests <br>
	 * (recommended as it will avoid allocating extra memory) <br>
	 * @name clear
	 * @public
	 * @returns {object} this object for chaining
	 */
	clear() {
		this.aInB = true;
		this.bInA = true;
		this.overlap = Number.MAX_VALUE;
		this.indexShapeA = -1;
		this.indexShapeB = -1;
		return this;
	}
}

export default ResponseObject;
