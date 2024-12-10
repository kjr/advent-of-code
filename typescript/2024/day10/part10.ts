import { readFile } from 'node:fs/promises';
import { Coords } from "@Utils/Coords";
import { Grid } from "@Utils/Grid";
import { cardinalDirections } from "@Utils/directions";

const readInput = async (fileName: string): Promise<Grid<number>> => {
  const data = await readFile(fileName);

  return new Grid<number>(data.toString().split('\n').map(line => {
    return line.trim().split('').map(Number);
  }));
}

const search = (grid: Grid<number>, coords: Coords): Coords[] => {
  const results: Coords[] = [];
  const value = grid.get(coords);

  if (value === 9) {
    return [ coords ];
  }

  for (const newCoords of coords.iterateOffsets(cardinalDirections)) {
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
  let part1Total = 0;
  let part2Total = 0;

  for (const { coords, value } of data) {
    if (value === 0) {
      const results = search(data, coords);
      const score = dedupeCoords(results);

      part1Total += score.length;
      part2Total += results.length;
    }
  }

  return [part1Total, part2Total];
};

readInput('input.txt')
  .then(process)
  .then(console.log);
