import { Matrix2d } from "../../math/matrix2d.ts";
import Sprite from "./../../renderable/sprite.js";
import { Bounds } from "./../../physics/bounds.ts";
import {
	TMX_FLIP_V,
	TMX_FLIP_H,
	TMX_FLIP_AD,
	TMX_CLEAR_BIT_MASK,
} from "./constants.js";

/**
 * a basic tile object
 */
export default class Tile extends Bounds {
	/**
	 * @param {number} x - x index of the Tile in the map
	 * @param {number} y - y index of the Tile in the map
	 * @param {number} gid - tile gid
	 * @param {TMXTileset} tileset - the corresponding tileset object
	 */
	constructor(x, y, gid, tileset) {
		let width;
		let height;

		// call the parent constructor
		super();

		// determine the tile size
		if (tileset.isCollection) {
			const image = tileset.getTileImage(gid & TMX_CLEAR_BIT_MASK);
			width = image.width;
			height = image.height;
		} else {
			width = tileset.tilewidth;
			height = tileset.tileheight;
		}

		this.setMinMax(0, 0, width, height);

		/**
		 * tileset
		 * @type {TMXTileset}
		 */
		this.tileset = tileset;

		/**
		 * the tile transformation matrix (if defined)
		 * @ignore
		 */
		this.currentTransform = null;

		// Tile col / row pos
		this.col = x;
		this.row = y;

		/**
		 * tileId
		 * @type {number}
		 */
		this.tileId = gid;

		/**
		 * True if the tile is flipped horizontally
		 * @type {boolean}
		 */
		this.flippedX = (this.tileId & TMX_FLIP_H) !== 0;

		/**
		 * True if the tile is flipped vertically
		 * @type {boolean}
		 */
		this.flippedY = (this.tileId & TMX_FLIP_V) !== 0;

		/**
		 * True if the tile is flipped anti-diagonally
		 * @type {boolean}
		 */
		this.flippedAD = (this.tileId & TMX_FLIP_AD) !== 0;

		/**
		 * Global flag that indicates if the tile is flipped
		 * @type {boolean}
		 */
		this.flipped = this.flippedX || this.flippedY || this.flippedAD;

		// create and apply transformation matrix if required
		if (this.flipped === true) {
			if (this.currentTransform === null) {
				this.currentTransform = new Matrix2d();
			}
			this.setTileTransform(this.currentTransform.identity());
		}

		// clear out the flags and set the tileId
		this.tileId &= TMX_CLEAR_BIT_MASK;
	}

	/**
	 * set the transformation matrix for this tile
	 * @ignore
	 */
	setTileTransform(transform) {
		transform.translate(this.width / 2, this.height / 2);
		if (this.flippedAD) {
			transform.rotate((-90 * Math.PI) / 180);
			transform.scale(-1, 1);
		}
		if (this.flippedX) {
			transform.scale(this.flippedAD ? 1 : -1, this.flippedAD ? -1 : 1);
		}
		if (this.flippedY) {
			transform.scale(this.flippedAD ? -1 : 1, this.flippedAD ? 1 : -1);
		}
		transform.translate(-this.width / 2, -this.height / 2);
	}

	/**
	 * return a renderable object for this Tile object
	 * @param {object} [settings] - see {@link Sprite}
	 * @returns {Renderable} a me.Sprite object
	 */
	getRenderable(settings) {
		let renderable;
		const tileset = this.tileset;

		if (tileset.animations.has(this.tileId)) {
			const frames = [];
			const frameId = [];
			tileset.animations.get(this.tileId).frames.forEach((frame) => {
				frameId.push(frame.tileid);
				frames.push({
					name: "" + frame.tileid,
					delay: frame.duration,
				});
			});
			renderable = tileset.texture.createAnimationFromName(frameId, settings);
			renderable.addAnimation(this.tileId - tileset.firstgid, frames);
			renderable.setCurrentAnimation(this.tileId - tileset.firstgid);
		} else {
			if (tileset.isCollection === true) {
				const image = tileset.getTileImage(this.tileId);
				renderable = new Sprite(
					0,
					0,
					Object.assign({
						image: image,
					}), //, settings)
				);
				renderable.anchorPoint.set(0, 0);
				renderable.scale(
					settings.width / this.width,
					settings.height / this.height,
				);
				if (typeof settings.rotation !== "undefined") {
					renderable.anchorPoint.set(0.5, 0.5);
					renderable.currentTransform.rotate(settings.rotation);
					renderable.currentTransform.translate(
						settings.width / 2,
						settings.height / 2,
					);
					// TODO : move the rotation related code from TMXTiledMap to here (under)
					settings.rotation = undefined;
				}
			} else {
				renderable = tileset.texture.createSpriteFromName(
					this.tileId - tileset.firstgid,
					settings,
				);
				renderable.anchorPoint.set(0, 0);
			}
		}

		// any H/V flipping to apply?
		this.setTileTransform(renderable.currentTransform);

		return renderable;
	}
}
