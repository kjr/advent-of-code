import { readFile } from "node:fs/promises";

const readInput = async (fileName: string): Promise<number[]> => {
	const data = await readFile(fileName);

	return data.toString().split("").map(Number);
};

const expand = (data: number[]): number[] => {
	const result: number[] = [];
	let count = 0;
	data.forEach((item, index) => {
		const isSpace = index % 2 !== 0;
		const value = isSpace ? undefined : count++;

		for (let i = 0; i < item; i++) {
			result.push(value);
		}
	});

	return result;
};

const findLast = (data: number[], from: number, to: number): number => {
	for (let e = from; e > to; e--) {
		if (data[e] !== undefined) {
			return e;
		}
	}

	return undefined;
};

const defrag = (data: number[]): number[] => {
	let endPosition = data.length - 1;
	for (let i = 0; i < data.length; i++) {
		if (data[i] === undefined) {
			// Search back to find the index of the last actual character
			endPosition = findLast(data, endPosition, i);
			if (endPosition !== undefined) {
				const value = data[endPosition];
				data.splice(endPosition, 1, undefined);
				data.splice(i, 1, value);
			} else {
				// We must be done

				return data;
			}
		}
	}
	return data;
};

const checkSum = (data: number[]): number => {
	return data.reduce((acc, c, index) => {
		if (c === undefined) {
			return acc;
		}

		return acc + c * index;
	}, 0);
};

const dataToString = (data: number[]) =>
	data.map((c) => (c === undefined ? "." : String(c).substring(0, 1))).join("");

const buildIndex = (driveDescription: number[]) => {
	let acc = 0;
	const gapIndex: number[][] = [];
	const fileIndex: number[][] = [];

	for (let i = 0; i < driveDescription.length; i++) {
		const isSpace = i % 2 !== 0;
		const index = isSpace ? gapIndex : fileIndex;
		index.push([acc, driveDescription[i]]);

		acc += driveDescription[i];
	}

	return { gapIndex, fileIndex };
};

const defragWholeFiles = (driveDescription: number[]) => {
	const driveContents = expand(driveDescription);
	const { gapIndex, fileIndex } = buildIndex(driveDescription);

	const files = fileIndex.reverse();

	if (driveDescription.length < 21) {
		console.log(dataToString(driveContents));
	}

	for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
		const [filePosition, fileLength] = files[fileIndex];

		// search for a gap
		const gap = gapIndex.find(([_, gapSize]) => gapSize >= fileLength);
		if (gap && gap[0] < filePosition) {
			const [gapPosition, gapSize] = gap;

			// Move the file
			const file = driveContents.splice(
				filePosition,
				fileLength,
				...new Array(fileLength),
			);
			driveContents.splice(gapPosition, fileLength, ...file);

			// Update the gapIndex
			gap[1] = gap[1] - fileLength;
			gap[0] = gap[0] + fileLength;

			if (driveDescription.length < 21) {
				console.log(dataToString(driveContents));
			}
		}
	}

	return driveContents;
};

// part 1
// readInput('input.txt')
//     .then(expand)
//     .then(defrag)
//     .then(checkSum)
//     .then(console.log);

// part 2
readInput("input.txt").then(defragWholeFiles).then(checkSum).then(console.log);
