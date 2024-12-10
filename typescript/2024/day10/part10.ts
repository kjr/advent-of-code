import { readFile } from 'node:fs/promises';


class Coords {
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
              value:done ? undefined : c.add(other),
              done,
            };
          },
        };
      }
    }
  }
}

class Grid<T> {
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

const readInput = async (fileName: string): Promise<Grid<number>> => {
  const data = await readFile(fileName);

  return new Grid<number>(data.toString().split('\n').map(line => {
    return line.trim().split('').map(Number);
  }));
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]].map(([x, y]) => new Coords(x, y));


const search = (grid: Grid<number>, coords: Coords): Coords[] => {
  const results: Coords[] = [];
  const value = grid.get(coords);

  if (value === 9) {
    return [ coords ];
  }

  for (const newCoords of coords.iterateOffsets(directions)) {
    if (grid.isInBounds(newCoords) && grid.get(newCoords) === value + 1) {
      results.push(...search(grid, newCoords));
    }
  }

  return results;
}

const dedupeCoords = (coords: Coords[]): Coords[] => coords.reduce((acc, coord) => {
  if (!acc.some((c) => coord.equals(c))) {
    acc.push(coord);
  }

  return acc;
}, []);

const process = (data: Grid<number>) => {
  let total = 0;

  for (const { coords, value } of data) {
    if (value === 0) {
      console.log(coords);
      const results = search(data, coords);
      const score = dedupeCoords(results);

      //total += score; // part 1
      total += results.length; // part 2
    }
  }

  return total;
};

readInput('input.txt')
  .then(process)
  .then(console.log); // 1477
