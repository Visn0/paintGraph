import { IAlgorithm, ICoordinate, BoardPath, compareCoords, ManhattanDistance, MOVES, validCoord } from './IAlgorithm'
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
    return coord.pathLength < this.#memoization[coord.row][coord.col]
      || (coord.bound < this.#bestPath.length
      && this.#bestPath.length > 0)
  }

  #solve(board: Board) {
    let pq = new PriorityQueue({ comparator: (a, b) => { return compareCoords(a, b)} } )
    let bound: number = ManhattanDistance(board.begin, board.exit)
    let coord: ICoordinate = { ...board.begin, bound: bound, pathLength: 0, prev: null}
    // let path: BoardPath = [coord]
    // coord.path = path

    pq.queue(coord)

    let iterations: number = 100
    while (pq.length !== 0 && iterations > 0) {
      if (this.#bestPath.length > 0) break
      iterations -= 1
      // console.log(JSON.parse(JSON.stringify(pq)))

      let coord: ICoordinate = pq.dequeue()
      // console.log(JSON.parse(JSON.stringify(coord)))
      AnimationManager.setExploredCell(coord, this.#animationDelay)

      // if (!this.#isCellPromising(coord)) continue

      if (board.getCellType(coord) === CellType.EXIT) {
        if (coord.pathLength < this.#bestPath.length || this.#bestPath.length === 0) {
          this.#bestPath = new Array<ICoordinate>(coord.pathLength)
          this.#bestPath[coord.pathLength-1] = { row: coord.row, col: coord.col }

          for (let i = coord.pathLength - 2; i > 0; i--) {
            // coord = coord.prev
            // console.log(JSON.parse(JSON.stringify(coord)))
            this.#bestPath[i] = this.#bestPath[i+1].prev // { row: coord.row, col: coord.col }
          }
          // this.#bestPath = JSON.parse(JSON.stringify(coord.path))
          // this.#bestPath = coord.path.concat([])
        }
        continue
      }

      // Explore surrounding cells
      for (let m of MOVES) {
        let newCoord: ICoordinate = {
          row: coord.row + m.row,
          col: coord.col + m.col,
          pathLength: coord.pathLength + 1,
          prev: coord
          // path: JSON.parse(JSON.stringify(coord.path)) // coord.path
        }

        if (!validCoord(newCoord, board.height, board.width)) continue

        if (board.getCellType(newCoord) === CellType.WALL)
          continue

        newCoord.bound = coord.pathLength + ManhattanDistance(newCoord, board.exit)

        if (this.#isCellPromising(newCoord)) {
          // newCoord.path = coord.path.concat([{ row: coord.row, col: coord.col }])
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