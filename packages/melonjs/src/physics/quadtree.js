import { remove } from "../utils/array.ts";
import { Vector2d } from "../math/vector2d.ts";

/**
 * @import World from "./world.js";
 * @import Container from "./../renderable/container.js";
 * @import {Bounds} from "./bounds.ts";
 */

/*
 * A QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
 * Based on the QuadTree Library by Timo Hausmann and released under the MIT license
 * https://github.com/timohausmann/quadtree-js/
 **/

/**
 * a pool of `QuadTree` objects
 * @ignore
 */
const QT_ARRAY = [];

/**
 * will pop a quadtree object from the array
 * or create a new one if the array is empty
 * @ignore
 */
function QT_ARRAY_POP(
	world,
	bounds,
	max_objects = 4,
	max_levels = 4,
	level = 0,
) {
	if (QT_ARRAY.length > 0) {
		const _qt = QT_ARRAY.pop();
		_qt.world = world;
		_qt.bounds = bounds;
		_qt.max_objects = max_objects;
		_qt.max_levels = max_levels;
		_qt.level = level;
		return _qt;
	} else {
		return new QuadTree(world, bounds, max_objects, max_levels, level);
	}
}

/**
 * Push back a quadtree back into the array
 * @ignore
 */
function QT_ARRAY_PUSH(qt) {
	QT_ARRAY.push(qt);
}

/**
 * a temporary vector object to be reused
 * @ignore
 */
const QT_VECTOR = new Vector2d();

/**
 * a QuadTree implementation in JavaScript, a 2d spatial subdivision algorithm.
 * @see game.world.broadphase
 */
export default class QuadTree {
	/**
	 * @param {World} world - the physic world this QuadTree belongs to
	 * @param {Bounds} bounds - bounds of the node
	 * @param {number} [max_objects=4] - max objects a node can hold before splitting into 4 subnodes
	 * @param {number} [max_levels=4] - total max levels inside root Quadtree
	 * @param {number} [level] - deepth level, required for subnodes
	 */
	constructor(world, bounds, max_objects = 4, max_levels = 4, level = 0) {
		this.world = world;
		this.bounds = bounds;

		this.max_objects = max_objects;
		this.max_levels = max_levels;

		this.level = level;

		this.objects = [];
		this.nodes = [];
	}

	/*
	 * Split the node into 4 subnodes
	 */
	split() {
		const nextLevel = this.level + 1;
		const subWidth = this.bounds.width / 2;
		const subHeight = this.bounds.height / 2;
		const left = this.bounds.left;
		const top = this.bounds.top;

		//top right node
		this.nodes[0] = QT_ARRAY_POP(
			this.world,
			{
				left: left + subWidth,
				top: top,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel,
		);

		//top left node
		this.nodes[1] = QT_ARRAY_POP(
			this.world,
			{
				left: left,
				top: top,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel,
		);

		//bottom left node
		this.nodes[2] = QT_ARRAY_POP(
			this.world,
			{
				left: left,
				top: top + subHeight,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel,
		);

		//bottom right node
		this.nodes[3] = QT_ARRAY_POP(
			this.world,
			{
				left: left + subWidth,
				top: top + subHeight,
				width: subWidth,
				height: subHeight,
			},
			this.max_objects,
			this.max_levels,
			nextLevel,
		);
	}

	/*
	 * Determine which node the object belongs to
	 * @param {Rect} rect bounds of the area to be checked
	 * @returns Integer index of the subnode (0-3), or -1 if rect cannot completely fit within a subnode and is part of the parent node
	 */
	getIndex(item) {
		let pos;
		const bounds = item.getBounds();

		// use game world coordinates for floating items
		if (item.isFloating === true) {
			pos = this.world.app.viewport.localToWorld(
				bounds.left,
				bounds.top,
				QT_VECTOR,
			);
		} else {
			pos = QT_VECTOR.set(item.left, item.top);
		}

		let index = -1;
		const rx = pos.x;
		const ry = pos.y;
		const rw = bounds.width;
		const rh = bounds.height;
		const verticalMidpoint = this.bounds.left + this.bounds.width / 2;
		const horizontalMidpoint = this.bounds.top + this.bounds.height / 2;
		//rect can completely fit within the top quadrants
		const topQuadrant = ry < horizontalMidpoint && ry + rh < horizontalMidpoint;
		//rect can completely fit within the bottom quadrants
		const bottomQuadrant = ry > horizontalMidpoint;

		//rect can completely fit within the left quadrants
		if (rx < verticalMidpoint && rx + rw < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			} else if (bottomQuadrant) {
				index = 2;
			}
		} else if (rx > verticalMidpoint) {
			//rect can completely fit within the right quadrants
			if (topQuadrant) {
				index = 0;
			} else if (bottomQuadrant) {
				index = 3;
			}
		}

		return index;
	}

	/**
	 * Insert the given object container into the node.
	 * @param {Container} container - group of objects to be added
	 */
	insertContainer(container) {
		const children = container.children;
		const childrenLength = children.length;
		for (let i = childrenLength, child; i--, (child = children[i]); ) {
			if (child.isKinematic !== true) {
				if (typeof child.addChild === "function") {
					if (child.name !== "rootContainer") {
						this.insert(child);
					}
					// recursivly insert all childs
					this.insertContainer(child);
				} else {
					// only insert object with a bounding box
					// Probably redundant with `isKinematic`
					if (typeof child.getBounds === "function") {
						this.insert(child);
					}
				}
			}
		}
	}

	/**
	 * Insert the given object into the node. If the node
	 * exceeds the capacity, it will split and add all
	 * objects to their corresponding subnodes.
	 * @param {object} item - object to be added
	 */
	insert(item) {
		let index = -1;

		//if we have subnodes ...
		if (this.nodes.length > 0) {
			index = this.getIndex(item);

			if (index !== -1) {
				this.nodes[index].insert(item);
				return;
			}
		}

		this.objects.push(item);

		if (
			this.objects.length > this.max_objects &&
			this.level < this.max_levels
		) {
			//split if we don't already have subnodes
			if (this.nodes.length === 0) {
				this.split();
			}

			let i = 0;

			//add all objects to there corresponding subnodes
			while (i < this.objects.length) {
				index = this.getIndex(this.objects[i]);

				if (index !== -1) {
					this.nodes[index].insert(this.objects.splice(i, 1)[0]);
				} else {
					i = i + 1;
				}
			}
		}
	}

	/**
	 * Return all objects that could collide with the given object
	 * @param {object} item - object to be checked against
	 * @param {object} [fn] - a sorting function for the returned array
	 * @returns {object[]} array with all detected objects
	 */
	retrieve(item, fn) {
		let returnObjects = this.objects;

		//if we have subnodes ...
		if (this.nodes.length > 0) {
			const index = this.getIndex(item);

			//if rect fits into a subnode ..
			if (index !== -1) {
				returnObjects = returnObjects.concat(this.nodes[index].retrieve(item));
			} else {
				//if rect does not fit into a subnode, check it against all subnodes
				for (let i = 0; i < this.nodes.length; i = i + 1) {
					returnObjects = returnObjects.concat(this.nodes[i].retrieve(item));
				}
			}
		}

		if (typeof fn === "function") {
			returnObjects.sort(fn);
		}

		return returnObjects;
	}

	/**
	 * Remove the given item from the quadtree.
	 * (this function won't recalculate the impacted node)
	 * @param {object} item - object to be removed
	 * @returns {boolean} true if the item was found and removed.
	 */
	remove(item) {
		let found = false;

		if (typeof item.getBounds === "undefined") {
			// ignore object that cannot be added in the first place
			return false;
		}

		//if we have subnodes ...
		if (this.nodes.length > 0) {
			// determine to which node the item belongs to
			const index = this.getIndex(item);

			if (index !== -1) {
				found = remove(this.nodes[index], item);
				// trim node if empty
				if (found && this.nodes[index].isPrunable()) {
					this.nodes.splice(index, 1);
				}
			}
		}

		if (found === false) {
			// try and remove the item from the list of items in this node
			if (this.objects.indexOf(item) !== -1) {
				remove(this.objects, item);
				found = true;
			}
		}

		return found;
	}

	/**
	 * return true if the node is prunable
	 * @returns {boolean} true if the node is prunable
	 */
	isPrunable() {
		return !(this.hasChildren() || this.objects.length > 0);
	}

	/**
	 * return true if the node has any children
	 * @returns {boolean} true if the node has any children
	 */
	hasChildren() {
		for (let i = 0; i < this.nodes.length; i = i + 1) {
			const subnode = this.nodes[i];
			if (subnode.length > 0 || subnode.objects.length > 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * clear the quadtree
	 * @param {Bounds} [bounds=this.bounds] - the bounds to be cleared
	 */
	clear(bounds) {
		this.objects.length = 0;

		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
			// recycle the quadTree object
			QT_ARRAY_PUSH(this.nodes[i]);
		}
		// empty the array
		this.nodes.length = 0;

		// resize the root bounds if required
		if (typeof bounds !== "undefined") {
			this.bounds.setMinMax(
				bounds.min.x,
				bounds.min.y,
				bounds.max.x,
				bounds.max.y,
			);
		}
	}
}
