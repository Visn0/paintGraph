import { IAlgorithm, ICoordinate, BoardPath, validCoord, getPath } from './IAlgorithm'
import Board from '../Board'
import AnimationManager from '../AnimationManager';
import { CellType, MOVES } from '../constants'

export class Backtracking implements IAlgorithm {
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

  #solve (board: Board, coord: ICoordinate) {
    // Check if coord is inside the board
    if (!validCoord(coord, board.height, board.width)) return

    const currentCell = board.getCellType(coord)
    if (currentCell === CellType.WALL) return

    // Render the explorated paths
    if (currentCell !== CellType.BEGIN && currentCell !== CellType.EXIT)
      AnimationManager.setExploredCell(coord, this.#animationDelay)

    if(coord.pathLength >= this.#memoization[coord.row][coord.col]) return

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