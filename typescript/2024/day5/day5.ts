import { readFile } from 'node:fs/promises';

export type Rule = [ number, number ];
export type Line = number[];

export type Day5Input = {
    rules: Rule[];
    lines: Line[];
}

export const readData = async (filename: string): Promise<Day5Input> => {
    const dataText = await readFile(filename);

    const [rulesText, linesText] = dataText.toString().split('\n\n');

    const rules = rulesText.split('\n').map((line) => line.split('|').map(Number));
    const lines = linesText.split('\n').map((line) => line.split(',').map(Number));

    return {
        rules: rules as Rule[],
        lines,
    }
}

const checkLineIsValid = (line: Line, rules: Rule[]): boolean => {
    return rules.every(([x, y]) => {
        //  x must appear before y
        const iX = line.indexOf(x);
        if (iX === -1) return true;

        const iY = line.indexOf(y);
        return iY === -1 ? true : iX < iY;
    });
};

const getMiddleDigit = (line: Line): number => line[Math.floor(line.length / 2)];

const ruleMatches = (a: number, b: number) => (rule: Rule): boolean => {
    return (rule[0] === a && rule[1] === b) || (rule[0] === b && rule[1] === a);
}

const makeRulesSorter = (rules: Rule[]) => (a: number, b: number) => {
    const rule = rules.find(ruleMatches(a, b));
    if (rule) {
        return rule[0] === a ? -1 : 1;
    }
    return 0;
};

export const part1 = async ({ rules, lines }: Day5Input) => lines
    .filter((line) => checkLineIsValid(line, rules))
    .reduce((acc, line) => acc + getMiddleDigit(line), 0);

export const part2 = async ({ rules, lines }: Day5Input) => lines
    .filter((line) => !checkLineIsValid(line, rules))
    .map((line) => line.sort(makeRulesSorter(rules)))
    .reduce((acc, line) => acc + getMiddleDigit(line), 0);

readData('input.txt').then(part2).then(console.log);
