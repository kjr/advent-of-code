import { readFile } from 'node:fs/promises';

const readInput = async (fileName: string): Promise<number[][]> => {
    const data = await readFile(fileName);

    return data.toString().split('\n').map((line) => {
        const [ resultString, rest ] = line.split(':');

        return [
            parseInt(resultString),
            ...rest.trim().split(' ').map(Number),
        ]
    });
}

// const splice = (v, nv) => {
//   const x = v.slice();
//   x.splice(0, 2, nv);
//
//   return x;
// };

const splice = (v: number[], nv: number): number[] => v.toSpliced(0, 2, nv);

export const ops: ((v : number[]) => number[])[] = [
    (v) => splice(v,  v[0] + v[1]), // +
    (v) => splice(v, v[0] * v[1]), // *
    (v) => splice(v, parseInt(`${v[0]}${v[1]}`)), // ||
]

const solveLine = (result: number, values: number[]): boolean => {
    if (values[0] > result) {
        return false;
    }

    if (values.length === 1) {
        return result === values[0];
    }

    return ops.some((op) => solveLine(result, op(values)));
}

const part1 = (lines: number[][]): number => {
    return lines.reduce((acc, [result, ...values]) => {
        return acc + (solveLine(result, values) ? result : 0);
    }, 0);
}

readInput('input.txt').then(part1).then(console.log);
