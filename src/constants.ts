export enum CellType {
  BEGIN,
  WALL,
  EXIT,
  EMPTY,
  EXPLORED,
  PATH
}


export enum AlgorithmType {
  BACKTRACKING = "Backtracking",
  BRANCH_AND_BOUND = 'Branch&Bound',
  A_STAR = 'A Star (A*)'
}

export const MAX_ROWS = {
  BACKTRACKING: 10,
  BRANCH_AND_BOUND: 25,
  A_STAR: 100
}

export const MOVES = [
  // { row: 1,  col: -1 }, // down left
  { row: 1, col: 0 }, // down
  // { row: 1,  col:  1 }, // down right
  { row: 0, col: 1 }, // right
  // { row: -1, col:  1 }, // up right
  { row: -1, col: 0 }, // up
  // { row: -1, col: -1 }, // up left
  { row: 0, col: -1 }, // left
]

// [min, max) range
export function getRandomInt(min: number = 0, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomizeElements(elements) {
  let array = [...elements]
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0)
  {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

