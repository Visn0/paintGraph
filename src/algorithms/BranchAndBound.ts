import { IAlgorithm, ICoordinate, BoardPath, EuclideanDistance, MOVES, validCoord, ManhattanDistance, getPath } from './IAlgorithm'
import Board from '../Board'
import { CellType } from '../CellType';
import AnimationManager from '../AnimationManager';

export class BranchAndBound implements IAlgorithm {
  // This matrix will store the best path found to reach a given cell
  #memoization: Array<Array<number>> = []
  #bestPath: BoardPath = []
  #animationDelay: number

  constructor() { }

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
      && (coord.bound < this.#bestPath.length || this.#bestPath.length === 0)
  }

  #solve (board: Board, coord: ICoordinate) {
    // Check if coord is inside the board
    if (!validCoord(coord, board.height, board.width)) return

    const currentCell = board.getCellType(coord)
    if (currentCell === CellType.WALL) return

    // Render the explorated paths
    if (currentCell !== CellType.BEGIN && currentCell !== CellType.EXIT)
      AnimationManager.setExploredCell(coord, this.#animationDelay)

    // Optimistic bound
    coord.bound = coord.pathLength + ManhattanDistance(coord, board.exit)
    if (!this.#isCellPromising(coord)) return

    this.#memoization[coord.row][coord.col] = coord.pathLength

    if (currentCell === CellType.EXIT)
    {
      this.#bestPath = getPath(coord)
      return
    }

    // Explore surrounding cells
    for (let m of MOVES)
    {
      let newCoord = {
        row: coord.row + m.row,
        col: coord.col + m.col,
        pathLength: coord.pathLength + 1,
        prev: coord
      }
      this.#solve(board, newCoord)
    }
  }

  findPath(board: Board, animationDelay: number): BoardPath {
    this.#init(board)
    this.#animationDelay = animationDelay
    this.#solve(board, { ...board.begin, pathLength: 0, prev: null })

    return this.#bestPath
  }
}