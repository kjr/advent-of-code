import { readFile } from "node:fs/promises";

type Grid = string[];
type Coord = [number, number];

type Day6Input = {
	grid: Grid;
	startingPosition: Coord;
};

type VisitedRecord = Record<number, Record<number, number[]>>;

type State = {
	grid: Grid;
	position: Coord;
	directionIndex: number;
	visited: VisitedRecord;
};

const empty = ".";
const obstacle = "#";

const directions: Coord[] = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0],
];

const readInput = async (fileName: string): Promise<Day6Input> => {
	const rawData = await readFile(fileName);

	const grid = rawData.toString().split("\n");
	let startingPosition: Coord;

	const y = grid.findIndex((line) => line.includes("^"));
	const x = grid[y].indexOf("^");

	return {
		grid,
		startingPosition: [x, y],
	};
};

const addCoords = (c1: Coord, c2: Coord): Coord => [
	c1[0] + c2[0],
	c1[1] + c2[1],
];

const addVisited = (r: VisitedRecord, x, y, d) => {
	if (!r[x]) {
		r[x] = {};
	}

	if (!r[x][y]) {
		r[x][y] = [d];
	} else {
		r[x][y].push(d);
	}
};

const isVisited = (r: VisitedRecord, x, y, d): boolean => {
	const directions = r?.[x]?.[y];
	return directions ? directions.includes(d) : false;
};

const getNextPosition = ({
	grid,
	position,
	directionIndex,
	visited,
}: State): State => {
	const direction = directions[directionIndex];
	let newPosition = addCoords(position, direction);
	const thingAtPosition = grid?.[newPosition[1]]?.[newPosition[0]];

	if (thingAtPosition === obstacle) {
		const newDirectionIndex =
			directionIndex === directions.length - 1 ? 0 : directionIndex + 1;
		return getNextPosition({
			grid,
			position,
			directionIndex: newDirectionIndex,
			visited,
		});
	}

	if (isVisited(visited, position[0], position[1], directionIndex)) {
		throw new Error("loop");
	}

	addVisited(visited, position[0], position[1], directionIndex);

	return {
		grid,
		position: newPosition,
		directionIndex,
		visited,
	};
};

const isInBounds = ({ grid, position }: State): boolean => {
	const [x, y] = position;
	if (x < 0 || y < 0) {
		return false;
	}

	if (y < grid.length) {
		const line = grid[y];
		return x < line.length;
	}

	return false;
};

const calculatePath = (input: Day6Input) => {
	let state: State = {
		grid: input.grid,
		position: input.startingPosition,
		directionIndex: 0,
		visited: [],
	};

	let moves = 0;

	do {
		state = getNextPosition(state);
		moves += 1;
	} while (isInBounds(state));

	return 0;
};

const testObstacle = async (input: Day6Input, x, y): Promise<boolean> => {
	// console.log(x, y);
	return new Promise((resolve) => {
		const line = input.grid[y].split("");
		const newGrid = input.grid.map((line) => `${line}`);
		const newLine = [...line];
		newLine[x] = "#";
		newGrid[y] = newLine.join("");

		try {
			calculatePath({
				grid: newGrid,
				startingPosition: input.startingPosition,
			});

			resolve(false);
		} catch (e) {
			resolve(true);
		}
	});
};

const obstacles = async (input: Day6Input) => {
	const tests = [];

	for (let y = 0; y < input.grid.length; y++) {
		const line = input.grid[y].split("");
		for (let x = 0; x < line.length; x++) {
			if (input.grid[y][x] === ".") {
				tests.push(testObstacle(input, x, y));
			}
		}
	}

	const results = await Promise.all(tests);
	const count = results.reduce((acc, r) => acc + (r ? 1 : 0), 0);

	return count;
};

readInput("input.txt").then(obstacles).then(console.log);
