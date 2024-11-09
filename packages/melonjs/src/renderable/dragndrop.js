import { DRAGEND, eventEmitter } from "../system/event.ts";
import Renderable from "./../renderable/renderable.js";

/**
 * additional import for TypeScript
 * @import { Draggable } from "./draggable.js";
 */

/**
 * a base drop target object
 * @see Draggable
 */
export class DropTarget extends Renderable {
	/**
	 * @param {number} x - the x coordinates of the drop target
	 * @param {number} y - the y coordinates of the drop target
	 * @param {number} width - drop target width
	 * @param {number} height - drop target height
	 */
	constructor(x, y, width, height) {
		super(x, y, width, height);

		this.isKinematic = false;

		/**
		 * constant for the overlaps method
		 * @constant
		 * @type {string}
		 * @name CHECKMETHOD_OVERLAP
		 */
		this.CHECKMETHOD_OVERLAP = "overlaps";

		/**
		 * constant for the contains method
		 * @constant
		 * @type {string}
		 * @name CHECKMETHOD_CONTAINS
		 */
		this.CHECKMETHOD_CONTAINS = "contains";

		/**
		 * the checkmethod we want to use
		 * @constant
		 * @type {string}
		 * @name checkMethod
		 * @default "CHECKMETHOD_OVERLAP"
		 */
		this.checkMethod = this.CHECKMETHOD_OVERLAP;

		this.removeDragEndListener = eventEmitter.addListener(
			DRAGEND,
			this.checkOnMe.bind(this),
		);
	}

	/**
	 * Sets the collision method which is going to be used to check a valid drop
	 * @param {string} checkMethod - the checkmethod (defaults to CHECKMETHOD_OVERLAP)
	 */
	setCheckMethod(checkMethod) {
		//  We can improve this check,
		//  because now you can use every method in theory
		if (typeof this.getBounds()[this.checkMethod] === "function") {
			this.checkMethod = checkMethod;
		}
	}

	/**
	 * Checks if a dropped entity is dropped on the current entity
	 * @param {object} e - the triggering event
	 * @param {Draggable} draggable - the draggable object that is dropped
	 */
	checkOnMe(e, draggable) {
		if (
			draggable &&
			this.getBounds()[this.checkMethod](draggable.getBounds())
		) {
			// call the drop method on the current entity
			this.drop(draggable);
		}
	}

	/**
	 * Gets called when a draggable entity is dropped on the current entity
	 * @param {Draggable} draggable - the draggable object that is dropped
	 */
	drop() {}

	/**
	 * Destructor
	 * @ignore
	 */
	destroy() {
		this.removeDragEndListener();
		super.destroy();
	}
}
