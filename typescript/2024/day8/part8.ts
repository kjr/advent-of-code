import {readFile} from 'node:fs/promises';
import Iterator = NodeJS.Iterator;

type Coord = [number, number];

class Grid {
    private readonly data: string[][];

    constructor(data: string[][]) {
        this.data = data;
    }

    static fromString(stringData: string): Grid {
        const data = stringData.split('\n').map(line => line.trim().split(''));

        return new Grid(data);
    };

    isInBounds(x: number, y: number): boolean {
        if (x < 0 || y < 0) {
            return false;
        }

        if (y >= this.data.length) {
            return false;
        }

        return x < this.data[y].length;
    }

    iterate(): Iterator<[number, number, string]> {
        let x = -1, y = 0;
        const data = this.data;

        return {
            next() {
                x += 1;
                if (x >= data[y].length) {
                    x = 0;
                    y += 1;
                }

                return {
                    value: y < data.length ? [x, y, data[y][x]] : undefined,
                    done: y >= data.length,
                };
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    }
}

const getPairs = (count: number): number[][] => {
    const pairs: number[][] = [];

    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            pairs.push([i, j]);
        }
    }

    return pairs;
};

const readInput = async (fileName: string) => {
    const contents = await readFile(fileName);

    return Grid.fromString(contents.toString());
};

const getAntiNodes = ([a1x, a1y]: Coord, [a2x, a2y]: Coord): Coord[] => {
    const dx = a2x - a1x;
    const dy = a2y - a1y;

    const p1: Coord = [a1x - dx, a1y - dy];
    const p2: Coord = [a2x + dx, a2y + dy];

    return [p1, p2];
}

const getAntiNodesPart2 = ([a1x, a1y]: Coord, [a2x, a2y]: Coord): Coord[] => {
    const results: Coord[] = [];

    const dx = a2x - a1x;
    const dy = a2y - a1y;

    for (let i = -60; i < 60; i++) { // Just totally cheat and generate loads of nodes that we trim later
        const p1: Coord = [a1x - (dx * i), a1y - (dy * i)];
        const p2: Coord = [a2x + (dx * i), a2y + (dy * i)];

        results.push(p1);
        results.push(p2);
    }

    return results;
}



const part1 = (grid: Grid): number => {
    // Build a list of all the antenna
    const antenna: Record<string, Coord[]> = {};
    const antiNodes: Coord[] = [];

    // @ts-ignore
    for (const [x, y, c] of grid.iterate()) {
        if (c !== '.') {
            if (!antenna[c]) {
                antenna[c] = [];
            }

            antenna[c].push([x, y]);
        }
    }

    Object.keys(antenna).forEach((antannaId) => {
        const antennae = antenna[antannaId];
        for (const [a1i, a2i] of getPairs(antennae.length)) {
            const pairAntiNodes = getAntiNodesPart2(antennae[a1i], antennae[a2i]);

            pairAntiNodes.forEach((antiNode) => {
                if (grid.isInBounds(antiNode[0], antiNode[1])) {
                    if (!antiNodes.find((an) => an[0] === antiNode[0] && an[1] === antiNode[1])) {
                        antiNodes.push(antiNode);
                    }
                }
            });
        }
    });

    return antiNodes.length;
};

readInput('input.txt').then(part1).then(console.log);

// console.log(JSON.stringify(getAntiNodes([9, 9], [10, 10])))