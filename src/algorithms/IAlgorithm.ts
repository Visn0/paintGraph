import Board from "../Board";


export interface ICoordinate {
  row: number
  col: number
}

export function PitagorasDistance(a: ICoordinate, b: ICoordinate): number{
  return Math.sqrt(Math.abs(a.row - b.row) + Math.abs(a.col - b.col))
}

export type BoardPath = Array<ICoordinate>

export interface IAlgorithm {
  findPath(board: Board, animationDelay: number): BoardPath
}

export enum AlgorithmType {
  BACKTRACKING = "Backtracking",
  BRANCH_AND_BOUND = 'Branch&Bound'
}

export const moves = [[-1, 0], [0, -1], [1, 0], [0, 1]]