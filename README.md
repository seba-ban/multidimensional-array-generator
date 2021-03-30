Just some exercise in typescript. The idea was to create a generator that takes multi-array as an argument and on each iteration yields an array of each nested values together with all the indices pointing to that value. So, for example, here:

```js
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
```

`el` on the first iteration would be: `[ "a", 0, 0 ]` etc.

So as typescript exercise, I wanted `el` to be properly types as `[ string, number, number ]`, for three-dimensional arrays `[ T, number, number, number ]` etc. 
Check out examples. 