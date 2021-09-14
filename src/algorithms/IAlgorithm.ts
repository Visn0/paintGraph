import Board from "../Board";

/////////////////////////////////
// INTERFACE
/////////////////////////////////

export type BoardPath = Array<ICoordinate>

export interface IAlgorithm {
  findPath(board: Board, animationDelay: number): BoardPath
}

export interface ICoordinate {
  row: number
  col: number
}

export enum AlgorithmType {
  BACKTRACKING = "Backtracking",
  BACKTRACKING_RAW = "BacktrackingRaw",
  BRANCH_AND_BOUND = 'Branch&Bound'
}


/////////////////////////////////
// UTILS
/////////////////////////////////

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


export function EuclideanDistance(a: ICoordinate, b: ICoordinate): number {
  return Math.sqrt(Math.abs(a.row - b.row) + Math.abs(a.col - b.col))
}

export function ManhattanDistance(a: ICoordinate, b: ICoordinate): number {
  return (Math.abs(a.row - b.row) + Math.abs(a.col - b.col))
}

export function validCoord(coord: ICoordinate, maxRow: number, maxCol: number): boolean {
  return (coord.row < maxRow && coord.row >= 0
    && coord.col < maxCol && coord.col >= 0)
}

