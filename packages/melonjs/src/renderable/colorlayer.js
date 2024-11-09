import { colorPool } from "../math/color.ts";
import Renderable from "./renderable.js";

/**
 * additional import for TypeScript
 * @import {Color} from "./../math/color.ts";
 * @import CanvasRenderer from "./../video/canvas/canvas_renderer.js";
 * @import WebGLRenderer from "./../video/webgl/webgl_renderer.js";
 * @import Camera2d from "./../camera/camera2d.js";
 */

/**
 * a generic Color Layer Object.  Fills the entire Canvas with the color not just the container the object belongs to.
 */
export default class ColorLayer extends Renderable {
	/**
	 * @param {string} name - Layer name
	 * @param {Color|string} color - CSS color
	 * @param {number} [z = 0] - z-index position
	 */
	constructor(name, color, z) {
		// parent constructor
		super(0, 0, Infinity, Infinity);

		/**
		 * the layer color component
		 * @type {Color}
		 */
		this.color = colorPool.get().parseCSS(color);

		this.onResetEvent(name, color, z);
	}

	onResetEvent(name, color, z = 0) {
		// apply given parameters
		this.name = name;
		this.pos.z = z;
		this.floating = true;
		// string (#RGB, #ARGB, #RRGGBB, #AARRGGBB)
		this.color.parseCSS(color);
	}

	/**
	 * draw this color layer (automatically called by melonJS)
	 * @param {CanvasRenderer|WebGLRenderer} renderer - a renderer instance
	 * @param {Camera2d} [viewport] - the viewport to (re)draw
	 */
	draw(renderer, viewport) {
		renderer.save();
		renderer.clipRect(0, 0, viewport.width, viewport.height);
		renderer.clearColor(this.color);
		renderer.restore();
	}

	/**
	 * Destroy function
	 * @ignore
	 */
	destroy() {
		colorPool.release(this.color);
		this.color = undefined;
		super.destroy();
	}
}
