import { IAlgorithm, ICoordinate, BoardPath, validCoord, moves } from './IAlgorithm'
import Board from '../Board'
import { CellType } from '../CellType';
import AnimationManager from '../AnimationManager';

export class BacktrackingRaw implements IAlgorithm {
  #memoization: Array<Array<number>> = []
  #bestPath: BoardPath = []
  #start: ICoordinate
  #end: ICoordinate

  constructor() { }

  #init(board: Board) {
    this.#bestPath = []
    this.#start = board.begin
    this.#end = board.exit

    this.#memoization = new Array<Array<number>>()
    for (let r = 0; r < board.height; ++r)
    {
      this.#memoization.push(new Array<number>(board.width).fill(Number.MAX_SAFE_INTEGER))
    }
  }

  #renderCell(coord: ICoordinate) {
    let elem = AnimationManager.getElementByCoord(coord);
    let prevColor: string = elem.style.backgroundColor ? elem.style.backgroundColor : "rgba(163, 80, 220, 0.20)"
    prevColor = prevColor.split(',')[3]
    elem.style.backgroundColor = `rgba(163, 80, 255, ${parseFloat(prevColor) + 0.04})`
  }

  #solve(board: Board, coord: ICoordinate, currentPath: BoardPath) {
    // Is inside the board
    if (!validCoord(coord, board.height, board.width)) return;

    const currCell = board.getCellType(coord)
    // Is not a wall neither start
    if (currCell === CellType.WALL || currCell === CellType.BEGIN) return;
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
    this.#renderCell(coord);

    // Explore surrounding cells
    for (let m of moves)
    {
      let newCoord = { row: coord.row + m[0], col: coord.col + m[1] }
      this.#solve(board, newCoord, currentPath.concat([coord]))
    }
  }

  findPath(board: Board, animationDelay: number): BoardPath {
    this.#init(board)
    this.#solve(board, this.#start, [])
    return this.#bestPath
  }
}