import { readFile } from "node:fs/promises";
import { Grid } from "@Utils/Grid";
import { Coords } from "@Utils/Coords";
import { cardinalDirections } from "@Utils/directions";

const readInput = async (fileName: string): Promise<Grid<string>> => {
	const data = await readFile(fileName);
	const gridData = data
		.toString()
		.split("\n")
		.map((line) => line.trim().split(""));

	return new Grid<string>(gridData);
};

const buildPlot = (
	grid: Grid<string>,
	mask: Grid<string>,
	current: Coords,
	value: string,
): Coords[] => {
	const additionalPlaces: Coords[] = [current];
	mask.set(current, undefined);

	for (const direction of cardinalDirections) {
		const newSquare = current.add(direction);
		if (grid.get(newSquare) === value && mask.get(newSquare) !== undefined) {
			additionalPlaces.push(...buildPlot(grid, mask, newSquare, value));
		}
	}

	return additionalPlaces;
};

const getPlotPerimeter = (
	grid: Grid<string>,
	squares: Coords[],
	value: string,
): number => {
	return squares.reduce((acc, square) => {
		return (
			acc +
			cardinalDirections.filter(
				(direction) => grid.get(square.add(direction)) !== value,
			).length
		);
	}, 0);
};

const getDiscountedPlotPerimeter = (pointsInPlot: Coords[]): number => {
	let plotGrid = Grid.buildFromCoords(pointsInPlot, "X", " ");
	let totalFaces = 0;

	for (let n = 0; n < 4; n++) {
		let previousLine: string[];

		for (const line of plotGrid.lines()) {
			// If there was a previous line, make a copy with all X removed that had an X in the same position in the previous line
			// This means we only have X's in exposed positions
			const lineCopy = previousLine
				? line.map((c, i) => (previousLine[i] === "X" ? " " : c))
				: line;

			//  Split it by /[X]+/ to work out haw many continuous bits of faces we have
			totalFaces += lineCopy.join("").split(/[X]+/).length - 1;
			previousLine = line;
		}

		plotGrid = plotGrid.rotateClockwise();
	}

	return totalFaces;
};

const solve = (grid: Grid<string>): number[] => {
	const mask = grid.clone();
	let total = 0;
	let discountedTotal = 0;

	for (const { coords, value } of grid) {
		if (mask.get(coords) !== undefined) {
			const plot = buildPlot(grid, mask, coords, value);
			const perimeter = getPlotPerimeter(grid, plot, value);
			const discountedPerimeter = getDiscountedPlotPerimeter(plot);

			console.log(
				"found plot",
				value,
				plot.length,
				perimeter,
				discountedPerimeter,
			);

			total += plot.length * perimeter;
			discountedTotal += plot.length * discountedPerimeter;
		}
	}

	return [total, discountedTotal];
};

readInput("input.txt").then(solve).then(console.log);
