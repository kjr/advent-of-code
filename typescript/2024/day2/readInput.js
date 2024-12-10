import fs from "fs";
import * as readline from "node:readline";

export const readInput = (name) => {
	return new Promise((resolve) => {
		const fileStream = fs.createReadStream(name);
		const lineReader = readline.createInterface({
			input: fileStream,
			terminal: false,
		});

		const lines = [];

		lineReader.on("line", (line) => lines.push(line.split(" ").map(Number)));

		lineReader.on("close", () => {
			resolve(lines);
		});
	});
};
