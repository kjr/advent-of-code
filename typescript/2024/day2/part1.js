import { readInput } from "./readInput.js";

readInput("input.txt").then((data) => {
	const safeLines = data.filter((line) => {
		const isSafeIncrement = line.every((value, index) => {
			if (index === 0) {
				return true;
			}

			const prev = line[index - 1];
			const diff = Math.abs(value - prev);
			return diff > 0 && diff < 4;
		}, undefined);

		const isAllGreater = line.every((value, index) => {
			if (index === 0) {
				return true;
			}

			const prev = line[index - 1];
			return value > prev;
		});

		const isAllLesser = line.every((value, index) => {
			if (index === 0) {
				return true;
			}

			const prev = line[index - 1];
			return value < prev;
		});

		const isSafe = isSafeIncrement && (isAllGreater || isAllLesser);

		console.log(line, isSafe, isSafeIncrement, isAllGreater, isAllLesser);

		return isSafe;
	});

	console.log(safeLines.length);
});
