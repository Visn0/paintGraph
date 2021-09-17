import { IAlgorithm, ICoordinate, BoardPath, validCoord, getPath } from './IAlgorithm'
import Board from '../Board'
import AnimationManager from '../AnimationManager';
import { CellType, getRandomInt, MOVES } from '../constants'

export class MazeRandom {
  // #memoization: Array<Array<number>> = []
  // #bestPath: BoardPath = []
  #animationDelay: number

  constructor() { }

  generate(board: Board, percentage: number) {
    board.clear()
    for (let i = 0; i < board.height; i++)
    {
      for (let j = 0; j < board.width; j++)
      {
        let n = getRandomInt(0, 10)
        if (n < percentage)
        {
          board.setTableCellType(i, j, CellType.WALL)
        }
      }
    }
  }

  // #solve (board: Board, coord: ICoordinate) {
  //   // Check if coord is inside the board
  //   if (!validCoord(coord, board.height, board.width)) return

  //   const currentCell = board.getCellType(coord)
  //   if (currentCell === CellType.WALL) return

  //   // Render the explorated paths
  //   if (currentCell !== CellType.BEGIN && currentCell !== CellType.EXIT) {
  //     AnimationManager.setExploredCell(coord, this.#animationDelay)
  //     board.setTableCellType(coord.row, coord.col, CellType.EXPLORED)
  //   }

  //   if(coord.pathLength >= this.#memoization[coord.row][coord.col]) return

  //   this.#memoization[coord.row][coord.col] = coord.pathLength

  //   if (currentCell === CellType.EXIT)
  //   {
  //     this.#bestPath = getPath(coord)
  //     return
  //   }

  //   // Explore surrounding cells
  //   for (let m of MOVES)
  //   {
  //     let newCoord = {
  //       row: coord.row + m.row,
  //       col: coord.col + m.col,
  //       pathLength: coord.pathLength + 1,
  //       prev: coord
  //     }
  //     this.#solve(board, newCoord)
  //   }
  // }

}

