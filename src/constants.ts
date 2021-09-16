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
  BACKTRACKING: 6,
  BRANCH_AND_BOUND: 10,
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
