import { readFile } from 'node:fs/promises';

type InitialState = {
  registers: number[],
  instructions: number[]
}

const readInput = async (fileName: string): Promise<InitialState> => {
  const data = await readFile(fileName);

  const [opSection, codeSection] = data.toString().split('\n\n');

  const registers = opSection.match(/([0-9]+)/gm).map(Number);
  const instructions = codeSection.substring(9).trim().split(',').map(Number);

  if (registers.length !== 3) {
    throw new Error('Invalid register length');
  }

  return {
    registers: registers as [number, number, number],
    instructions,
  };
};

const getComboOperand = (registers: number[], operand: number) => {
  if (operand <= 3) {
    return operand;
  }

  if (operand === 7) {
    throw new Error('Invalid cooperand');
  }

  return registers[operand - 4];
}

const process = ({ registers, instructions }: InitialState) : string => {
  let out: number[] = [];
  //
  // console.log('registers:', registers);
  // console.log('instructions:', instructions);

  const dv = (operand: number) => Math.floor(registers[0] / Math.pow(2, getComboOperand(registers, operand)));

  for (let i = 0; i < instructions.length; i+= 2) {
    const [instruction, operand] = instructions.slice(i, i + 2);
    // console.log('step', i, instruction, operand, instructions, instructions.slice(i, i + 2));

    if (instruction === 0) { // adv
      registers[0] = dv(operand);
    } else if (instruction === 1) { // bxl
      registers[1] = registers[1] ^ operand;
    } else if (instruction === 2) { // bst
      registers[1] = getComboOperand(registers, operand) % 8;
    } else if (instruction === 3) { // jnz
      if (registers[0] !== 0) {
        i = operand - 2;
      }
    } else if (instruction === 4) { // bxc
      registers[1] = registers[1] ^ registers[2];
    } else if (instruction === 5) {
      out.push(getComboOperand(registers, operand) % 8);

      // const l = out.length -1;
      // if (out[l] !== instructions[l]) {
      //   return out.join(',');
      // }
    } else if (instruction === 6) {
      registers[1] = dv(operand);
    } else if (instruction === 7) {
      registers[2] = dv(operand);
    }
  }

  // console.log('registers', registers);
  return out.join(',');
};

const run = (regA: number, instructions: number[]) => {
  const out = [];
  let a = regA;
  let b = 0;
  // let c = 0;
  // 2,4,1,6,7,5,4,4,1,7,0,3,5,5,3,0

  do {
    // 2, 4 - bst
    // b = (a % 8) ^ 6;

    // 1, 6 // bxl
    // b = b ^ 6;

    // 7, 5
    // c = Math.floor(a / Math.pow(2, b));

    // 4, 4
    b = ((a % 8) ^ 6 ^ Math.floor(a / Math.pow(2, (a % 8) ^ 6))) ^ 7;

    // 1, 7
    // b = b ^ 7;

    // 0, 3
    a = Math.floor(a / 8);

    // 5, 5
    out.push(b % 8);

    const l = out.length -1;
    if (out[l] !== instructions[l]) {
      return out.join(',');
    }
    // 3, 0
  } while (a !== 0);

  return out.join(',');
}

const process2 = ({ registers, instructions }: InitialState) => {
  // console.log(process({ registers, instructions }));
  // console.log(run(37293246, instructions));

  // 13555000000
  const best = 0;
  // let n = 0; // 2800000000
  let n = 2800000000

  const target = instructions.join(',');
  while (true) {
    // 42,420,000,000
    //  1,552,690,066
  // for (let n = 42420000000; n < 200000000000; n++) {
    const newRegisters = [ n, registers[1], registers[2]];
    if (n % 10000000 === 0) {
      console.log(n);
    }

    // const result = process({ registers: newRegisters, instructions });
    const result = run(n, instructions);
    if (result.length > 11) {
     console.log(n, result);
    }
    if (result === target) {
      return n;
    }

    n++
  }
}

readInput('input.txt')
  .then(process2)
  .then(console.log);

// console.log(process({
//   registers: [0, 0, 9],
//   instructions: [2, 6],
// }));