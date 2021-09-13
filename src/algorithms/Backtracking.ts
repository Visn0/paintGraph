import { IAlgorithm, ICoordinate, BoardPath } from './IAlgorithm'
import Board from '../Board'
import { CellType } from '../CellType';
import { stringify } from 'querystring';
import AnimationManager from '../AnimationManager';

export class Backtracking implements IAlgorithm {
  // This matrix will store the best path found to reach a given cell
  #memoization: Array<Array<number>> = []
  #bestPath: BoardPath = []
  #moves: Array<ICoordinate>

  constructor(){}

  #init(board: Board) {
    this.#bestPath = []
    this.#memoization = new Array<Array<number>>()
    for(let r = 0; r < board.height; ++r) {
      this.#memoization.push(new Array<number>(board.width).fill(Number.MAX_SAFE_INTEGER))
    }
    this.#moves = [
      // { row: 1,  col: -1 }, // up left
      { row: 1,  col:  0 }, // up
      // { row: 1,  col:  1 }, // up right
      { row: 0,  col:  1 }, // right
      // { row: -1, col:  1 }, // down right
      { row: -1, col:  0 }, // down
      // { row: -1, col: -1 }, // down left
      { row: 0,  col: -1 }, // left
    ]
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

    const currentCell = board.getCellType(coord)
    // Wall found
    if (currentCell === CellType.WALL) {
      return
    }

    // The path used to reach the current cell is longer than a previous found path
    if (currentPath.length >= this.#getMemoization(coord) - 1 || (currentPath.length >= this.#bestPath.length && this.#bestPath.length > 0)) {
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
      AnimationManager.setCellStyle(coord, CellType.EXPLORED)
    }

    // Explore surrounding cells
    currentPath.push({ ...coord })
    // for(let r = coord.row - 1; r <= coord.row + 1; r++) {
    //   for(let c = coord.col - 1; c <= coord.col + 1; c++) {
    //     if (r !== coord.row || c !== coord.col) {
    //       this.#solve(board, { row: r, col: c }, currentPath)
    //     }
    //   }
    // }
    for (let m of this.#moves) {
      let newCoord = { row: m.row + coord.row, col: m.col + coord.col }
      this.#solve(board, newCoord, currentPath)
    }

    currentPath.splice(currentPath.length - 1, 1)
  }

  findPath(board: Board): BoardPath {
    this.#init(board)

    this.#solve(board, board.begin, [])
    console.log(this.#bestPath)
    return this.#bestPath
  }
}