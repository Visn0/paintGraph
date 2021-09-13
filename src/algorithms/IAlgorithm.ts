import Board from "../Board";


export interface ICoordinate {
  row: number
  col: number
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