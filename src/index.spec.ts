import "mocha";
import { expect } from "chai";
import iterateArrays from ".";

describe("Main test suite", () => {
  describe("Testing iterateArrays function", () => {
    it("should iterate single-dimensional arrays", () => {
      const arr = [1, 2, 3, "a"];
      const yielded = [...iterateArrays(arr)];
      for (let i = 0; i < arr.length; i++)
        expect(yielded[i]).to.be.deep.equal([arr[i], i]);
    });

    it("should iterate two-dimensional arrays", () => {
      const arr = [[1, 2, 3], [1]];
      const yielded = [...iterateArrays(arr)];
      let index = -1;
      for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr[i].length; j++) {
          index++;
          expect(yielded[index]).to.be.deep.equal([arr[i][j], i, j]);
        }
    });

    it("should iterate three-dimensional arrays", () => {
      const arr = [
        [
          [1, 2, 3],
          [1, 2, 3],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
        ],
      ];
      const yielded = [...iterateArrays(arr)];
      let index = -1;
      for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr[i].length; j++)
          for (let k = 0; k < arr[i][j].length; k++) {
            index++;
            expect(yielded[index]).to.be.deep.equal([arr[i][j][k], i, j, k]);
          }
    });
  });

  describe("Testing filter method", () => {
    it("should properly filter elements", () => {
      const arr = [
        [1, "2", 3],
        ["4", 5, "6"],
      ];

      for (const [val] of iterateArrays.filter(
        arr,
        ([val]) => typeof val === "number"
      ))
        expect(val).to.be.an("number");
    });
  });

  describe("Testing find method", () => {
    it("should properly find an element", () => {
      const arr = [
        [1, "2", 3],
        [true, "2", 3],
        ["4", 5, "6"],
      ];

      expect(
        iterateArrays.find(arr, ([val]) => typeof val === "boolean")
      ).to.be.deep.equal([true, 1, 0]);
    });

    it("should return undefined", () => {
      const arr = [
        [1, "2", 3],
        [true, "2", 3],
        ["4", 5, "6"],
      ];

      expect(
        iterateArrays.find(arr, ([val]) => typeof val === "object")
      ).to.be.equal(undefined);
    });
  });
});
