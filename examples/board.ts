import iterateArrays, { FindFilterPredicate } from "../src";

interface FieldInterface {
  setValue(value: string): void;
  value: string;
}

class Field implements FieldInterface {
  constructor(private _value = "") {}

  setValue(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

const createEmptyBoard = (columns: number, rows: number): Field[][] => {
  const board: Field[][] = [];
  for (let i = 0; i < rows; i++)
    board.push(
      Array(columns)
        .fill(null)
        .map(() => new Field())
    );
  return board;
};

const getFieldName = (column: number, row: number) =>
  `${String.fromCodePoint(65 + column)}${row + 1}`;

const board = createEmptyBoard(3, 3);

// `filter` method example
const placeX = ["A2", "B3", "C2"];
const filterPredicate: FindFilterPredicate<typeof board> = ([
  field,
  row,
  column,
]) => {
  const found = placeX.find((el) => getFieldName(column, row) === el);
  return found === undefined ? false : true;
};

for (const [field] of iterateArrays.filter(board, filterPredicate))
  field.setValue("X");

// `find` method example
const setValue = (fieldName: string, value: string) => {
  const found = iterateArrays.find(
    board,
    ([field, row, column]) => getFieldName(column, row) === fieldName
  );

  if (!found) return false;

  found[0].setValue(value);
  return true;
};

setValue("A1", "O");

// iterating over the whole board
for (const [field, row, column] of iterateArrays(board))
  console.log(`${getFieldName(column, row)}: ${field.value}`);
