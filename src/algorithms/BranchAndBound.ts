import { IAlgorithm, ICoordinate, IPath } from './IAlgorithm'
import Board from '../Board'

export class BranchAndBound implements IAlgorithm {
  constructor(){}

  #solve(board: Board): IPath {
    return []
  }

  findPath(board: Board): IPath {
    return this.#solve(board)
  }
}