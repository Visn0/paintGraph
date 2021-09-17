import { IAlgorithm, ICoordinate, BoardPath, validCoord, getPath, Stack, IBaseCoordinate, Queue } from './IAlgorithm'
import Board from '../Board'
import AnimationManager from '../AnimationManager';
import { CellType, getRandomInt, MOVES, randomizeElements } from '../constants'

export class RandomizedBFS {
  #animationDelay: number

  constructor() { }

  generate(board: Board, animationDelay: number = 0) {
    let visited = new Array<Array<boolean>>()
    for (let r = 0; r < board.height; ++r)
    {
      visited.push(new Array<boolean>(board.width).fill(false))
    }
    board.fillWalls()

    let stack: Queue<IBaseCoordinate> = new Queue<IBaseCoordinate>()
    let coord = new IBaseCoordinate(getRandomInt(1, board.height - 1), getRandomInt(1, board.width))
    visited[coord.row][coord.col] = true;
    stack.push(coord)
    let randommoves = randomizeElements([...MOVES])

    while (stack.lenght != 0)
    {
      coord = stack.pop()
      board.setTableCellType(coord.row, coord.col, CellType.EMPTY, animationDelay)

      randommoves = randomizeElements([...randommoves])
      for (let m of randommoves)
      {
        let newCoord: IBaseCoordinate = {
          row: coord.row + m.row,
          col: coord.col + m.col,
        }
        if (newCoord.row >= board.height - 1 || newCoord.row <= 0
          || newCoord.col >= board.width - 1 || newCoord.col <= 0
          || visited[newCoord.row][newCoord.col]
          || this.hasVisitedNeighbors(visited, newCoord, coord)
        )
        {
          continue;
        }

        visited[newCoord.row][newCoord.col] = true;
        stack.push(newCoord)
        stack.push(coord)
        break;
      }
    }
  }

  hasVisitedNeighbors(visited: Array<Array<boolean>>, coord: IBaseCoordinate, lastcoord: IBaseCoordinate) {
    for (let m of MOVES)
    {
      let newCoord: IBaseCoordinate = {
        row: coord.row + m.row,
        col: coord.col + m.col,
      }
      if (newCoord.row === lastcoord.row && newCoord.col === lastcoord.col) continue;
      if (visited[newCoord.row][newCoord.col])
      {
        return true;
      }
    }
    return false;
  }
}

