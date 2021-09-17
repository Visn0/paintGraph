import { IAlgorithm, ICoordinate, BoardPath, validCoord, getPath, Stack, IBaseCoordinate } from './IAlgorithm'
import Board from '../Board'
import AnimationManager from '../AnimationManager';
import { CellType, getRandomInt, MOVES, randomizeElements } from '../constants'

export class MazeRandomizedDFS {
  // #bestPath: BoardPath = []
  #animationDelay: number

  constructor() { }

  generate(board: Board) {
    let visited = new Array<Array<boolean>>()
    for (let r = 0; r < board.height; ++r)
    {
      visited.push(new Array<boolean>(board.width).fill(false))
    }
    // board.clear()
    board.fillWalls()

    let stack: Stack<IBaseCoordinate> = new Stack<IBaseCoordinate>()
    let coord = new IBaseCoordinate(getRandomInt(1, board.height - 1), getRandomInt(1, board.width))
    visited[coord.row][coord.col] = true;
    stack.push(coord)
    let randommoves = randomizeElements([...MOVES])

    while (stack.lenght != 0)
    {
      console.log(stack.lenght)
      coord = stack.pop()
      board.setTableCellType(coord.row, coord.col, CellType.EMPTY)


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
          randommoves = randomizeElements([...MOVES])
          continue;
        }
        visited[newCoord.row][newCoord.col] = true;
        stack.push(newCoord)
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

