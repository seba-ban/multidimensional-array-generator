import { Concat, FillTuple } from "typescript-tuple";

/** Recursively tries to infer type of array elements */
type InferredArrayType<T> = T extends (infer U)[] ? InferredArrayType<U> : T;

/**
 * Tuple of numbers of length of nested arrays
 * basically number of indexes to get to actual values stored in nested arrays
 */
type IndexTuple<T, P extends number[]> = T extends (infer U)[]
  ? IndexTuple<U, Concat<P, [0]>>
  : FillTuple<P, number>;

/**
 * Return tuple from the generator function
 */
type ValueIndexTuple<T extends any> = [
  value: InferredArrayType<T>,
  ...indexes: IndexTuple<T, []>
];

/**
 *
 * @param arr
 * @param indexes
 */
function* multiarrayGenerator<T extends any[]>(
  arr: T,
  indexes: number[] = []
): Generator<ValueIndexTuple<T>> {
  let i = 0;
  for (const el of arr)
    if (Array.isArray(el))
      yield* multiarrayGenerator(el, [...indexes, i++]) as Generator<
        ValueIndexTuple<T>
      >;
    // basically we're turning off typescript for this line
    else yield [el, ...indexes, i++] as unknown as ValueIndexTuple<T>;
}

// PUBLIC INTERFACE

/**
 * Predicate function used in `filter` and `find` methods
 */
 type FindFilterPredicate<T extends any> = (
  valueIndexTuple: ValueIndexTuple<T>
) => boolean;

interface IterateArrays extends Function {
  /**
   * @param arr array to iterate
   *
   * @example
   * ```js
   * const multi = [ [ [ 1, 2 ] ] ]
   * for (const [val, i, j, k] of iterateArrays(multi))
   *   console.log(val, i, j, k);
   * // output: 1 0 0 0
   * // output: 2 0 0 1
   * // equivalent to:
   * for (let i = 0; i < multi.length; i++)
   *   for (let j = 0; j < multi[i].length; j++)
   *     for (let k = 0; k < multi[i][j].length; k++)
   *       console.log(multi[i][j][k], i, j, k);
   * ```
   */
  <T extends any[]>(arr: T): Generator<ValueIndexTuple<T>>;
  /**
   * Filtres all elements
   * @param arr
   * @param predicate
   */
  filter<T extends any[]>(
    arr: T,
    predicate: FindFilterPredicate<T>
  ): ValueIndexTuple<T>[];
  /**
   * Finds an element
   * @param arr
   * @param predicate
   */
  find<T extends any[]>(
    arr: T,
    predicate: FindFilterPredicate<T>
  ): ValueIndexTuple<T> | undefined;
}

// IMPLEMENTATION

const iterateArrays: IterateArrays = <T extends any[]>(arr: T) => {
  if (!Array.isArray(arr)) throw new TypeError("Argument should be an array.");

  return multiarrayGenerator<T>(arr);
};

iterateArrays.filter = <T extends any[]>(
  arr: T,
  predicate: (valueIndexTuple: ValueIndexTuple<T>) => boolean
) => {
  const matches: ValueIndexTuple<T>[] = [];
  for (const valueIndexTuple of iterateArrays(arr))
    if (predicate(valueIndexTuple)) matches.push(valueIndexTuple);
  return matches;
};

iterateArrays.find = <T extends any[]>(
  arr: T,
  predicate: (valueIndexTuple: ValueIndexTuple<T>) => boolean
) => {
  for (const valueIndexTuple of iterateArrays(arr))
    if (predicate(valueIndexTuple)) return valueIndexTuple;
  return undefined;
};

export default iterateArrays;
export { FindFilterPredicate, ValueIndexTuple };
