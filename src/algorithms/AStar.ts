import { IAlgorithm, ICoordinate, BoardPath, compareCoords, ManhattanDistance, MOVES } from './IAlgorithm'
import Board from '../Board'
// import PriorityQueue from '../data_structures/PriorityQueue'
import PriorityQueue from 'ts-priority-queue'
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
    return coord.path.length < this.#memoization[coord.row][coord.col]
      || coord.bound < this.#bestPath.length
      && this.#bestPath.length > 0
  }

  #solve(board: Board) {
    let pq = new PriorityQueue({ comparator: (a, b) => { return compareCoords(a, b)} } )
    let bound: number = ManhattanDistance(board.begin, board.exit)
    let coord: ICoordinate = { ...board.begin, bound: bound, path: [] }
    // let path: BoardPath = [coord]
    // coord.path = path

    pq.queue(coord)

    while (pq.length !== 0) {
      let coord: ICoordinate = pq.dequeue()
      AnimationManager.setExploredCell(coord, this.#animationDelay)

      if (!this.#isCellPromising(coord)) continue

      if (board.getCellType(coord) === CellType.EXIT) {
        if (coord.path.length < this.#bestPath.length) {
          // this.#bestPath = JSON.parse(JSON.stringify(coord.path))
          // this.#bestPath = coord.path.concat([])
        }
        continue
      }

      // Explore surrounding cells
      for (let m of MOVES)
      {
        let newCoord: ICoordinate = {
          row: coord.row + m.row,
          col: coord.col + m.col,
          path: coord.path
        }

        if (board.getCellType(newCoord) === CellType.WALL)
          continue

        newCoord.bound = coord.path.length + ManhattanDistance(newCoord, board.begin)

        if (this.#isCellPromising(coord)) {
          newCoord.path = coord.path.concat([coord])
          pq.queue(newCoord)
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