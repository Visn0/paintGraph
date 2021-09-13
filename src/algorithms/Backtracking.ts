import { IAlgorithm, ICoordinate, BoardPath } from './IAlgorithm'
import Board from '../Board'

export class Backtracking implements IAlgorithm {
  constructor(){}

  #solve(board: Board, coord: ICoordinate, currentPath: BoardPath, bestPath: BoardPath) {
    if(coord.row > board.height || coord.row < 0 || coord.col > board.width || coord.col < 0) {
      return
    }

    if (currentPath.length < bestPath.length - 1) {

    }
  }

  findPath(board: Board): BoardPath {
    let bestPath: BoardPath = []
    this.#solve(board, board.getBegin(), [], bestPath)
    return bestPath
  }
}