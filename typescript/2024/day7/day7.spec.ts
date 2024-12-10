import { ops } from "./day7";

describe("day7", () => {
	// 7290: 6 8 6 15 -  6 * 8 || 6 * 15

	describe("ops", () => {
		const addOp = ops[0];
		const multOp = ops[1];
		const concatOp = ops[2];

		describe("3267: 81 40 27 can be made true using 81 + 40 * 27", () => {
			it("step1", () => {
				expect(addOp[2](3267, [81, 40, 27])).toEqual([3267, [121, 27]]);
			});

			it("step2", () => {
				expect(multOp[2](3267, [121, 27])).toEqual([3267, [3267]]);
			});
		});

		describe("7290: 6 8 6 15 can be made true using 6 * 8 || 6 * 15", () => {
			it("step1", () => {
				expect(multOp[2](7290, [6, 8, 6, 15])).toEqual([7290, [48, 6, 15]]);
			});

			it("step2", () => {
				expect(concatOp[2](7290, [48, 6, 15])).toEqual([7290, [486, 15]]);
			});

			it("step3", () => {
				expect(multOp[2](7290, [486, 15])).toEqual([7290, [7290]]);
			});
		});
	});
});
