import {Coords} from "@Utils/Coords";

export class Grid<T> {
    private readonly data: T[][];

    constructor(data: T[][]) {
        this.data = data;
    }

    get(coords: Coords): T {
        return this.data?.[coords.y]?.[coords.x];
    }

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

    [Symbol.iterator](): Iterator<{ coords: Coords, value: T }> {
        let x = -1, y = 0;
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
                    value: {coords, value},
                    done: y >= g.data.length,
                };
            },
        }
    }
}