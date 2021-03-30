import iterateArrays from "../src";

const multi = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
  [
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ],
];

for (const [val, i, j, k] of iterateArrays(multi)) console.log(val, i, j, k);
