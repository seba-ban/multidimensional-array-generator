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

const iterate = iterateArrays(multi)[Symbol.iterator]();

for (let i = 0; i < multi.length; i++)
  for (let j = 0; j < multi[i].length; j++)
    for (let k = 0; k < multi[i][j].length; k++) {
      console.log("For loop: ", multi[i][j][k], i, j, k);
      console.log("Iterator: ", iterate.next().value.join(" "), "\n");
    }
