import { readFile } from 'node:fs/promises';

const readInput = async (fileName: string): Promise<number[]> => {
  const data = await readFile(fileName);
  return data.toString().split(' ').map(Number);
}

const processValues = (value: number): number[] => {
  if (value === 0) {
    return [1];
  } else if (String(value).length % 2 === 0) {
    const s= String(value);
    return [
      Number(s.substring(0, s.length / 2)),
      Number(s.substring(s.length / 2)),
    ];
  } else {
    return [ value * 2024];
  }
}

const cache: Record<number, Record<number, number>> = {};

const getValueLength = (value: number, depth: number): number => {
  if (depth === 0) {
    return 1;
  } else {
    if (depth < 60 && cache[depth]?.[value]) {
      return cache[depth][value];
    }

    const pv = processValues(value);
    let total = 0;
    for (let i = 0; i < pv.length; i++) {
      total += getValueLength(pv[i], depth - 1);
    }

    if (depth < 60) {
      if (cache[depth] === undefined) {
        cache[depth] = {};
      }

      cache[depth][value] = total;
    }

    return total;
  }
}

const process = (data: number[]): number => {
  let total = 0;

  for (let n = 0; n < data.length; n++) {
    total += getValueLength(data[n], 75);
  }

  return total;
};

readInput('input.txt')
  .then(process)
  .then(console.log);