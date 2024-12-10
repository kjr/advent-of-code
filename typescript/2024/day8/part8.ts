import {readFile} from 'node:fs/promises';
import {Grid} from "@Utils/Grid";
import {Coords} from "@Utils/Coords";

const getPairs = (count: number): number[][] => {
    const pairs: number[][] = [];

    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            pairs.push([i, j]);
        }
    }

    return pairs;
};

const readInput = async (fileName: string): Promise<Grid<string>> => {
    const contents = await readFile(fileName);
    const data = contents
        .toString()
        .split('\n')
        .map(line => line.trim().split(''))

    return new Grid<string>(data);
};

const getAntiNodes = (c1: Coords, c2: Coords): Coords[] => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;

    const p1 = new Coords(c1.x - dx, c1.y - dy);
    const p2 = new Coords(c2.x + dx, c2.y + dy);

    return [p1, p2];
}

const getAntiNodesPart2 = (c1: Coords, c2: Coords): Coords[] => {
    const results: Coords[] = [];

    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;

    for (let i = -60; i < 60; i++) { // Just totally cheat and generate loads of nodes that we trim later
        const p1 = new Coords(c1.x - (dx * i), c1.y - (dy * i));
        const p2 = new Coords(c2.x + (dx * i), c2.y + (dy * i));

        results.push(p1);
        results.push(p2);
    }

    return results;
}



const part1 = (grid: Grid<string>): number => {
    // Build a list of all the antenna
    const antenna: Record<string, Coords[]> = {};
    const antiNodes: Coords[] = [];

    for (const { coords, value } of grid) {
        if (value !== '.') {
            if (!antenna[value]) {
                antenna[value] = [];
            }

            antenna[value].push(coords);
        }
    }

    Object.keys(antenna).forEach((antannaId) => {
        const antennae = antenna[antannaId];
        for (const [a1i, a2i] of getPairs(antennae.length)) {
            const pairAntiNodes = getAntiNodesPart2(antennae[a1i], antennae[a2i]);

            pairAntiNodes.forEach((antiNode) => {
                if (grid.isInBounds(antiNode)) {
                    if (!antiNodes.find((an) => an.equals(antiNode))) {
                        antiNodes.push(antiNode);
                    }
                }
            });
        }
    });

    return antiNodes.length;
};

readInput('input.txt').then(part1).then(console.log);
