import {readFile} from 'node:fs/promises';
import Iterator = NodeJS.Iterator;

const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
];

const gridIterator = (grid: string[]): Iterator<any> => {
    let x = -1, y = 0;

    return {
        next() {
            x += 1;
            if (x > grid[y].length) {
                x = 0;
                y += 1;
            }

            return {
                value: y < grid.length ? [x, y, grid[y][x]] : undefined,
                done: y >= grid.length,
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}

const searchDirection = (g, coords, remainingWord, direction) => {
    const nextCharPos = [coords[0] + direction[0], coords[1] + direction[1]];
    const nextChar = g?.[nextCharPos[1]]?.[nextCharPos[0]];
    if (nextChar === undefined) {
        return false;
    }

    if (nextChar === remainingWord[0]) {
        if (remainingWord.length === 1) {
            return true;
        } else {
            return searchDirection(g, nextCharPos, remainingWord.substring(1), direction);
        }
    } else {
        return false;
    }
}

const part1 = (grid, word) => {
    let total = 0;
    // @ts-ignore
    for (const [x, y, c] of gridIterator(grid)) {
        if (c === word[0]) {
            for (let d = 0; d < directions.length; d++) {
                if (searchDirection(grid, [x, y], word.substring(1), directions[d])) {
                    total += 1;
                }
            }
        }
    }

    console.log('total', total);
};

const crosses = [
    [[-1, -1], [1, 1]],
    [[-1, 1], [1, -1]],
]

const part2 = (grid: string[]) => {
    let total = 0;
    // @ts-ignore
    for (const [x, y, c] of gridIterator(grid)) {
        if (c === 'A') {
            const candidates = crosses.map((crossCoords) => {
                return crossCoords.map((coordOffsets) => {
                    return grid?.[y + coordOffsets[1]]?.[x + coordOffsets[0]];
                }).join('');
            });

            if (candidates.every((cross) => (cross === 'SM' || cross === 'MS'))) {
                total += 1;
            }
        }
    }

    return total;
}

const loadFile = async (fileName: string): Promise<string[]> => {
    const data = await readFile(fileName);

    return data.toString().split('\n');
}

loadFile('test.txt').then(part2).then(console.log);
