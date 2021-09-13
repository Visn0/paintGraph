import { IAlgorithm, ICoordinate, IPath } from './IAlgorithm'
import Board from '../Board'

export class Backtracking implements IAlgorithm {
  constructor(){}

  #solve(board: Board, coord: ICoordinate, path: IPath) {

  }

  findPath(board: Board): IPath {
    let path: IPath = []
    this.#solve(board, board.getBegin(), path)
    return path
  }
}