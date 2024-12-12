import { Coords } from "@Utils/Coords";

export class Grid<T> {
	private readonly data: T[][];

	constructor(data: T[][]) {
		this.data = data;
	}

	/**
	 * Builds a trimmed grid where the cells at the given coordinates are `filledValue` and all the other
	 * cells are `emptyValue`
	 *
	 * @param coords
	 * @param filledValue
	 * @param emptyValue
	 */
	static buildFromCoords<T>(coords: Coords[], filledValue: T, emptyValue: T): Grid<T> {
		// Get the bounding box of the coords
		let minX, minY, maxX, maxY;
		for (const coord of coords) {
			minX = minX === undefined ? coord.x : Math.min(minX, coord.x);
			minY = minY === undefined ? coord.y : Math.min(minY, coord.y);
			maxX = maxX === undefined ? coord.x : Math.max(maxX, coord.x);
			maxY = maxY === undefined ? coord.y : Math.max(maxY, coord.y);
		}

		let data: T[][] = [];

		for (let y = minY; y <= maxY; y++) {
			let row = [];
			for (let x = minX; x <= maxX; x++) {
				let thisCoord = new Coords(x, y);
				const includeCoord = coords.some((c) => c.equals(thisCoord));
				row.push(includeCoord ? filledValue : emptyValue);
			}

			data.push(row);
		}

		return new Grid(data);
	}

	get(coords: Coords): T {
		return this.data?.[coords.y]?.[coords.x];
	}

	rotateClockwise(): Grid<T> {
		const newData: T[][] = [];
		for (let x = 0; x < this.data[0].length; x++) {
			const newLine: T[] = [];
			for (let y = 0; y < this.data.length; y++) {
				newLine.push(this.data[this.data.length - y - 1][x]);
			}

			newData.push(newLine);
		}

		return new Grid(newData);
	};


	//  AB   CA
	//  CD   DB

	isInBounds(coords: Coords): boolean {
		// Is it quicker to just do `this.get(coords) !== undefined`? But what if we have undefined values
		if (coords.x < 0 || coords.y < 0) {
			return false;
		}

		if (coords.y >= this.data.length) {
			return false;
		}

		return coords.x < this.data[coords.y].length;
	}

	clone(): Grid<T> {
		const newData = this.data.map((line) => Array.from(line));
		return new Grid(newData);
	}

	set(coords: Coords, value: T) {
		if (this.isInBounds(coords)) {
			this.data[coords.y][coords.x] = value;
		} else {
			throw new Error('tried to update out of bounds');
		}
	}

	lines() {
		return this.data;
	}

	[Symbol.iterator](): Iterator<{ coords: Coords; value: T }> {
		let x = -1,
			y = 0;
		let g = this;

		return {
			next() {
				x += 1;
				if (x >= g.data?.[y].length) {
					x = 0;
					y = y + 1;
				}

				const coords = new Coords(x, y);

				const value = g.get(coords);

				return {
					value: { coords, value },
					done: y >= g.data.length,
				};
			},
		};
	}
}
