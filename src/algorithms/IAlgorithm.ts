import Board from "../Board";


export interface ICoordinate {
  row: number
  col: number
}

export interface IPath {
  [index: number]: ICoordinate
}

export interface IAlgorithm {
  findPath(board: Board): IPath
}

export enum AlgorithmType {
  BACKTRACKING = "Backtracking",
  BRANCH_AND_BOUND = 'Branch&Bound'
}