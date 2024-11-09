import { ETA } from "../../../math/math.ts";
import { Vector2d } from "../../../math/vector2d.ts";

/**
 * parse the given data and return a corresponding atlas
 * @param {Object} data - atlas data information. See {@link loader.getJSON}
 * @param {TextureAtlas} textureAtlas - the texture atlas class calling the parser
 * @returns {Object} the corresponding Atlas
 * @ignore
 */
export function parseAseprite(data, textureAtlas) {
	const atlas = {};

	const frames = data.frames;
	for (const name in frames) {
		const frame = frames[name].frame;
		const trimmed = !!frame.trimmed;

		let trim;

		if (trimmed) {
			trim = {
				x: frame.spriteSourceSize.x,
				y: frame.spriteSourceSize.y,
				w: frame.spriteSourceSize.w,
				h: frame.spriteSourceSize.h,
			};
		}

		let originX;
		let originY;
		// Pixel-based offset origin from the top-left of the source frame
		const hasTextureAnchorPoint = frame.sourceSize && frame.pivot;
		if (hasTextureAnchorPoint) {
			originX = frame.sourceSize.w * frame.pivot.x - (trimmed ? trim.x : 0);
			originY = frame.sourceSize.h * frame.pivot.y - (trimmed ? trim.y : 0);
		}

		atlas[name] = {
			name: name, // frame name
			texture: data.meta.image || "default", // the source texture
			offset: new Vector2d(frame.x, frame.y),
			anchorPoint: hasTextureAnchorPoint
				? new Vector2d(originX / frame.w, originY / frame.h)
				: null,
			trimmed: trimmed,
			trim: trim,
			width: frame.w,
			height: frame.h,
			angle: frame.rotated === true ? -ETA : 0,
		};
		textureAtlas.addUVs(atlas, name, data.meta.size.w, data.meta.size.h);
	}

	const anims = {};
	for (const name in data.meta.frameTags) {
		const anim = data.meta.frameTags[name];
		// aseprite provide a range from [from] to [to], so build the corresponding index array
		const indexArray = Array.from(
			{ length: anim.to - anim.from + 1 },
			(_, i) => {
				return anim.from + i;
			},
		);
		anims[name] = {
			name: anim.name,
			index: indexArray,
			// aseprite provide animation speed between frame, melonJS expect total duration for a given animation
			speed: 10 * (indexArray.length - 1),
			// only "forward" is supported for now
			direction: anim.direction,
		};
	}
	atlas.anims = anims;

	return atlas;
}
