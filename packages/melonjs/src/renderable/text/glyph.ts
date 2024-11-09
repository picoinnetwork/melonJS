const LOG2_PAGE_SIZE = 9;
const PAGE_SIZE = 1 << LOG2_PAGE_SIZE;

/**
 * a glyph representing a single character in a font
 * @ignore
 */
export default class Glyph {
	/**
	 * @ignore
	 */
	id: number;
	x: number;
	y: number;
	width: number;
	height: number;
	u: number;
	v: number;
	u2: number;
	v2: number;
	xoffset: number;
	yoffset: number;
	xadvance: number;
	fixedWidth: boolean;
	kerning: { [key: number]: { [key: number]: number } };

	/**
	 * @ignore
	 */
	constructor() {
		this.id = 0;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.u = 0;
		this.v = 0;
		this.u2 = 0;
		this.v2 = 0;
		this.xoffset = 0;
		this.yoffset = 0;
		this.xadvance = 0;
		this.fixedWidth = false;
	}

	/**
	 * @ignore
	 */
	getKerning(ch: number): number {
		if (this.kerning) {
			const page = this.kerning[ch >>> LOG2_PAGE_SIZE];
			if (page) {
				return page[ch & (PAGE_SIZE - 1)] || 0;
			}
		}
		return 0;
	}

	/**
	 * @ignore
	 */
	setKerning(ch: number, value: number): void {
		if (!this.kerning) {
			this.kerning = {};
		}
		let page = this.kerning[ch >>> LOG2_PAGE_SIZE];
		if (typeof page === "undefined") {
			this.kerning[ch >>> LOG2_PAGE_SIZE] = {};
			page = this.kerning[ch >>> LOG2_PAGE_SIZE];
		}
		page[ch & (PAGE_SIZE - 1)] = value;
	}
}
