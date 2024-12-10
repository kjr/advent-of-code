import { Coords } from "@Utils/Coords";

export const cardinalDirections = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
].map(([x, y]) => new Coords(x, y));
