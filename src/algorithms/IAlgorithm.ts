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

export const moves = [[-1, 0], [0, -1], [1, 0], [0, 1]]

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

