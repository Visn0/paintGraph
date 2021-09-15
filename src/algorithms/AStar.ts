import { IAlgorithm, ICoordinate, BoardPath, compareCoords, ManhattanDistance, MOVES, validCoord } from './IAlgorithm'
import Board from '../Board'
import PriorityQueue from '../data_structures/PriorityQueue'
import { CellType } from '../CellType'
import AnimationManager from '../AnimationManager'

export class AStar implements IAlgorithm {
  #memoization: Array<Array<number>> = []
  #bestPath: BoardPath = []
  #animationDelay: number

  constructor () { }

  #init(board: Board) {
    this.#bestPath = []
    this.#memoization = new Array<Array<number>>()
    for (let r = 0; r < board.height; ++r)
    {
      this.#memoization.push(new Array<number>(board.width).fill(Number.MAX_SAFE_INTEGER))
    }
  }

  #isCellPromising (coord: ICoordinate): boolean {
    return coord.pathLength < this.#memoization[coord.row][coord.col]
      || (coord.bound < this.#bestPath.length
      && this.#bestPath.length > 0)
  }

  #solve(board: Board) {
    let pq = new PriorityQueue<ICoordinate>(compareCoords)
    let bound: number = ManhattanDistance(board.begin, board.exit)
    let coord: ICoordinate = { ...board.begin, bound: bound, pathLength: 0, prev: null }

    pq.push(coord)

    let iterations: number = 40000
    while (!pq.empty() && iterations > 0) {
      if (this.#bestPath.length > 0) break
      iterations -= 1

      let coord: ICoordinate = pq.pop()
      this.#memoization[coord.row][coord.col] = coord.pathLength
      AnimationManager.setExploredCell(coord, this.#animationDelay)

      // if (!this.#isCellPromising(coord)) continue

      if (board.getCellType(coord) === CellType.EXIT) {
        if (coord.pathLength < this.#bestPath.length || this.#bestPath.length === 0) {
          this.#bestPath = new Array<ICoordinate>(coord.pathLength)
          this.#bestPath[coord.pathLength-1] = { ...coord }

          for (let i = coord.pathLength - 2; i >= 0; i--) {
            this.#bestPath[i] = this.#bestPath[i+1].prev
          }
        }
        continue
      }

      // Explore surrounding cells
      for (let m of MOVES) {
        let newCoord: ICoordinate = {
          row: coord.row + m.row,
          col: coord.col + m.col,
          pathLength: coord.pathLength + 1,
          prev: coord,
        }

        if (!validCoord(newCoord, board.height, board.width)) continue

        if (board.getCellType(newCoord) === CellType.WALL)
          continue

        newCoord.bound = coord.pathLength + ManhattanDistance(newCoord, board.exit)
        if (this.#isCellPromising(newCoord)) {
          pq.push(newCoord)
        }
      }
    }
  }

  findPath(board: Board, animationDelay: number): BoardPath {
    this.#init(board)
    this.#animationDelay = animationDelay
    this.#solve(board)

    return this.#bestPath
  }
}

export default AStar