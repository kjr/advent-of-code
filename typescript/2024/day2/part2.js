import { readInput } from "./readInput.js";

const checkLine = (line) => {
    const isSafeIncrement = line.every((value, index) => {
        if (index === 0) {
            return true;
        }

        const prev = line[index - 1];
        const diff = Math.abs(value - prev)
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

    return isSafeIncrement && (isAllGreater || isAllLesser);
};

readInput('input.txt').then((data) => {
    const safeLines = data.filter((line) => {
        const isSafe = checkLine(line);

        if (isSafe) {
            return true;
        }

        if (!isSafe) {
            for (let i = 0; i < line.length; i++) {
                const reducedLine = line.toSpliced(i, 1);

                if (checkLine(reducedLine)) {
                    return true;
                }
            }
        }

        return false;
    });


    console.log(safeLines.length);
});