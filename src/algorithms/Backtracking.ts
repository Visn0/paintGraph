import { IAlgorithm, ICoordinate, BoardPath, validCoord, MOVES } from './IAlgorithm'
import Board from '../Board'
import { CellType } from '../CellType';
import AnimationManager from '../AnimationManager';

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

  #solve (board: Board, coord: ICoordinate, currentPath: BoardPath) {
    // if (this.#bestPath.length > 0) return

    // Is inside the board
    if (!validCoord(coord, board.height, board.width)) return;

    const currCell = board.getCellType(coord)
    // Is not a wall neither start
    if (currCell === CellType.WALL) return;
    // We found better path to current coordinate
    if (this.#memoization[coord.row][coord.col] <= (currentPath.length + 1)) return;

    this.#memoization[coord.row][coord.col] = (currentPath.length + 1);

    if (currCell === CellType.EXIT)
    {
      // Deep copy
      this.#bestPath = JSON.parse(JSON.stringify(currentPath));
      this.#bestPath.push({ ...coord })
      return
    }

    if (currCell !== CellType.BEGIN) {
      AnimationManager.setExploredCell(coord)//, this.#animationDelay)
    }

    // Explore surrounding cells
    for (let m of MOVES)
    {
      let newCoord = { row: coord.row + m.row, col: coord.col + m.col }
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