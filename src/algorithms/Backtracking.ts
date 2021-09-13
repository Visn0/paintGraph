import { IAlgorithm, ICoordinate, BoardPath } from './IAlgorithm'
import Board from '../Board'
import { CellType } from '../CellType';
import { stringify } from 'querystring';

export class Backtracking implements IAlgorithm {
  // This matrix will store the best path found to reach a given cell
  #memoization: Array<Array<number>> = []
  #bestPath: BoardPath = []
  #time: number = 0

  constructor(){}

  #init(board: Board) {
    this.#bestPath = []
    this.#memoization = new Array<Array<number>>()
    for(let r = 0; r < board.height; ++r) {
      this.#memoization.push(new Array<number>(board.width).fill(Number.MAX_SAFE_INTEGER))
    }
  }

  #setMemoization(coord: ICoordinate, value: number) {
    this.#memoization[coord.row][coord.col] = value
  }

  #getMemoization(coord: ICoordinate): number {
    return this.#memoization[coord.row][coord.col]
  }

  #solve(board: Board, coord: ICoordinate, currentPath: BoardPath) {
    // Out of board
    if(coord.row >= board.height || coord.row < 0 || coord.col >= board.width || coord.col < 0) {
      return
    }

    console.log("row:", coord.row, "col:", coord.col, "lenght:", currentPath.length)

    const currentCell = board.getCellType(coord)
    // Wall found
    if (currentCell === CellType.WALL) {
      console.log("wall")
      return
    }

    // The path used to reach the current cell is longer than a previous found path
    if (currentPath.length > this.#getMemoization(coord) - 1) {
      return
    }

    // Update cache of explorated paths
    this.#setMemoization(coord, currentPath.length)

    // Check if exit is found
    if (currentCell === CellType.EXIT) {
      // Deep copy
      this.#bestPath = JSON.parse(JSON.stringify(currentPath));
      this.#bestPath.push({ ...coord })
      return
    }

    // Render the explorated paths
    if (currentCell !== CellType.BEGIN) {
      setTimeout(
        () => board.setCellType(coord.row, coord.col, CellType.EXPLORED)
      , this.#time += 100)
    }

    // Explore surrounding cells
    currentPath.push({ ...coord })
    for(let r = coord.row - 1; r <= coord.row + 1; r++) {
      for(let c = coord.col - 1; c <= coord.col + 1; c++) {
        if (r !== coord.row || c !== coord.col) {
          console.log(r, c)
          this.#solve(board, { row: r, col: c }, currentPath)
        }
      }
    }

    currentPath.splice(currentPath.length - 1, 1)
  }

  findPath(board: Board): BoardPath {
    this.#init(board)

    this.#solve(board, board.begin, [])
    console.log(this.#bestPath)
    console.log(JSON.stringify( this.#memoization ))
    return this.#bestPath
  }
}