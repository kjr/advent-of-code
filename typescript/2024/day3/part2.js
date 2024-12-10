import { readFile } from "node:fs/promises";

const re = /mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\)/gm;

const run = async (name) => {
	const data = await readFile(name);
	const contents = data.toString();

	let match = re.exec(contents);
	let enabled = true;
	let total = 0;

	while (match !== null) {
		const [value, a, b] = match;
		if (value === "do()") {
			enabled = true;
		} else if (value === "don't()") {
			enabled = false;
		} else if (enabled) {
			total += parseInt(a) * parseInt(b);
		}

		match = re.exec(contents);
	}

	console.log("total: ", total);
};

run("input.txt");
