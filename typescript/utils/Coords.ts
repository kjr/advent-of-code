export class Coords {
	readonly x: number;
	readonly y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(c: Coords) {
		return new Coords(this.x + c.x, this.y + c.y);
	}

	equals(other: Coords) {
		return this.x === other.x && this.y === other.y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	iterateOffsets(others: Coords[]): Iterable<Coords> {
		let i = 0;
		let c = this;

		return {
			[Symbol.iterator]() {
				return {
					next() {
						const other = others[i++];
						const done = i > others.length;

						return {
							value: done ? undefined : c.add(other),
							done,
						};
					},
				};
			},
		};
	}
}
