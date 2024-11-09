import Sprite from "./sprite.js";
import Body from "./../physics/body.js";
import { collision } from "./../physics/collision.js";
import { vector2dPool } from "../math/vector2d.ts";
import { polygonPool } from "../geometries/polygon.ts";

/**
 * a basic collectable helper class for immovable object (e.g. a coin)
 */
export default class Collectable extends Sprite {
	/**
	 * @param {number} x - the x coordinates of the collectable
	 * @param {number} y - the y coordinates of the collectable
	 * @param {object} settings - See {@link Sprite}
	 */
	constructor(x, y, settings) {
		// call the super constructor
		super(x, y, settings);

		this.name = settings.name;
		this.type = settings.type;
		this.id = settings.id;

		// add and configure the physic body
		let shape = settings.shapes;
		if (typeof shape === "undefined") {
			shape = polygonPool.get(0, 0, [
				vector2dPool.get(0, 0),
				vector2dPool.get(this.width, 0),
				vector2dPool.get(this.width, this.height),
			]);
		}
		this.body = new Body(this, shape);
		this.body.collisionType = collision.types.COLLECTABLE_OBJECT;
		// by default only collides with PLAYER_OBJECT
		this.body.setCollisionMask(collision.types.PLAYER_OBJECT);
		this.body.setStatic(true);

		// Update anchorPoint
		if (settings.anchorPoint) {
			this.anchorPoint.set(settings.anchorPoint.x, settings.anchorPoint.y);
		} else {
			// for backward compatibility
			this.anchorPoint.set(0, 0);
		}
	}
}
