import { readFile } from "node:fs/promises";

const readData = async (
	fileName: string,
): Promise<{ list1: number[]; list2: number[] }> => {
	const data = await readFile(fileName);
	const list1: number[] = [];
	const list2: number[] = [];

	for (const line of data.toString().split("\n")) {
		const [v1, v2] = line.split("   ");
		list1.push(Number(v1));
		list2.push(Number(v2));
	}

	return { list1, list2 };
};

const part1 = (list1: number[], list2: number[]): number => {
	const list1Sorted = list1.sort();
	const list2Sorted = list2.sort();

	return list1Sorted.reduce((acc, value, index) => {
		const value2 = list2Sorted[index];
		const diff = Math.abs(value2 - value);

		return acc + diff;
	}, 0);
};

const part2 = (list1: number[], list2: number[]): number => {
	return list1.reduce((acc, value1) => {
		const timesInL2 = list2.filter((value2) => value2 === value1).length;

		return acc + value1 * timesInL2;
	}, 0);
};

readData("input.txt")
	.then(({ list1, list2 }) => part1(list1, list2))
	.then((v) => console.log(`part 1 answer:`, v));

readData("input.txt")
	.then(({ list1, list2 }) => part2(list1, list2))
	.then((v) => console.log(`part 2 answer:`, v));
