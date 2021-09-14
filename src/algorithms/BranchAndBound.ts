import { IAlgorithm, ICoordinate, BoardPath, EuclideanDistance, MOVES } from './IAlgorithm'
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

  #setMemoization(coord: ICoordinate, value: number) {
    this.#memoization[coord.row][coord.col] = value
  }

  #getMemoization(coord: ICoordinate): number {
    return this.#memoization[coord.row][coord.col]
  }

  #isNodePromising(board: Board, coord: ICoordinate, currentPath: BoardPath) {
    if (currentPath.length >= this.#getMemoization(coord) - 1 || (currentPath.length >= this.#bestPath.length && this.#bestPath.length > 0))
      return false

    let optimisticDistance = EuclideanDistance(coord, board.exit) + currentPath.length + 1

    return optimisticDistance < this.#bestPath.length || this.#bestPath.length === 0
  }

  #solve(board: Board, coord: ICoordinate, currentPath: BoardPath) {
    // Out of board
    if (coord.row >= board.height || coord.row < 0 || coord.col >= board.width || coord.col < 0)
    {
      return
    }

    const currentCell = board.getCellType(coord)

    // Wall found
    if (currentCell === CellType.WALL)
    {
      return
    }

    // The path used to reach the current cell is longer than a previous found path
    if (!this.#isNodePromising(board, coord, currentPath))
    {
      return
    }

    // Update cache of explorated paths
    this.#setMemoization(coord, currentPath.length + 1)

    // Check if exit is found
    if (currentCell === CellType.EXIT)
    {
      // Deep copy
      this.#bestPath = JSON.parse(JSON.stringify(currentPath));
      this.#bestPath.push({ ...coord })
      return
    }

    // Render the explorated paths
    if (currentCell !== CellType.BEGIN)
    {
      AnimationManager.setExploredCell(coord, this.#animationDelay)
    }

    // Explore surrounding cells
    for (let m of MOVES)
    {
      let newCoord = { row: coord.row + m.row, col: coord.col + m.col] }
      this.#solve(board, newCoord, currentPath.concat([coord]))
    }
  }

  findPath(board: Board, animationDelay: number): BoardPath {
    this.#init(board)
    this.#animationDelay = animationDelay
    this.#solve(board, board.begin, [])

    return this.#bestPath
  }
}