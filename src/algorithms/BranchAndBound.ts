import { IAlgorithm, ICoordinate, BoardPath } from './IAlgorithm'
import Board from '../Board'

export class BranchAndBound implements IAlgorithm {
  constructor(){}

  #solve(board: Board): BoardPath {
    return []
  }

  findPath(board: Board): BoardPath {
    return this.#solve(board)
  }
}