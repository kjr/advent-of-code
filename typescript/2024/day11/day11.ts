import { readFile } from 'node:fs/promises';

const readInput = async (fileName: string): Promise<number[]> => {
  const data = await readFile(fileName);
  return data.toString().split(' ').map(Number);
}

const blinkValue = (value: number): number[] => {
  if (value === 0) {
    return [1];
  } else {
    const stringValue = String(value);
    if (stringValue.length % 2 === 0) {
      return [
        Number(stringValue.substring(0, stringValue.length / 2)),
        Number(stringValue.substring(stringValue.length / 2)),
      ];
    } else {
      return [ value * 2024];
    }
  }
}

const cache: Record<number, Record<number, number>> = {};

const getValueLength = (value: number, depth: number): number => {
  if (depth === 0) {
    return 1;
  } else {
    if (cache[depth]?.[value]) {
      return cache[depth][value];
    }

    const pv = blinkValue(value);
    let total = 0;
    for (let i = 0; i < pv.length; i++) {
      total += getValueLength(pv[i], depth - 1);
    }

    if (cache[depth] === undefined) {
      cache[depth] = {};
    }

    cache[depth][value] = total;

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