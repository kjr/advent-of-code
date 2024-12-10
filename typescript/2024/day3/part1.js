import { readFile } from "node:fs/promises";

const re = /mul\(([0-9]+),([0-9]+)\)/gm;

const run = async (name) => {
	const data = await readFile(name);
	const contents = data.toString();

	let match = re.exec(contents);
	let total = 0;

	while (match !== null) {
		const [_, a, b] = match;

		total += parseInt(a) * parseInt(b);
		match = re.exec(contents);
	}

	console.log("total: ", total);
};

run("input.txt");
