import iterateArrays, { ValueIndexTuple } from "../src";

const multi = [
  [
    ["a", "b"],
    ["c", "d"],
  ],
  [
    ["e", "f"],
    ["g", "h"],
  ],
];

const doSomethingOnIteration = (
  iterationValue: ValueIndexTuple<typeof multi>
) => {
  console.log(iterationValue);
};

for (const el of iterateArrays(multi)) doSomethingOnIteration(el);
