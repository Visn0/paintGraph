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

}

