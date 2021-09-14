import { FactoryAlgorithm } from './src/algorithms/FactoryAlgorithm';
import { AlgorithmType, BoardPath, IAlgorithm, moves } from './src/algorithms/IAlgorithm';
import AnimationManager from './src/AnimationManager';
import Board from './src/Board';
import { CellType } from './src/CellType';

window.onload = init
window.CellType = CellType
window.AlgorithmType = AlgorithmType

let board: Board = null
let cellType: CellType = CellType.EMPTY
let algorithm: IAlgorithm = FactoryAlgorithm(AlgorithmType.A_STAR)
let thickness: number = 1
let animationDelay: number = 150

function init() {
  thickness = parseInt(document.getElementById('thickness').value)
  let rows: number = 50;
  // let rows: number = 10;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()

  animationDelay /= rows
}

function dfs(row: number, column: number, K: number) {
  // if (K <= 0 || cellType === board.getCellType({ row: row, col: column }))
  // {
  //   return;
  // }

  // board.setCellType(row, column, cellType)
  // moves.forEach(move => {
  //   dfs(row + move[0], column + move[1], K - 1)
  // });
  K = parseInt(K - 1)

  // console.log(row, column, K)
  // console.log(Math.min(board.height, row + K), Math.min(board.width, column + K))
  for (let i = Math.max(0, row - K); i <= Math.min(board.height - 1, row + K); i++)
  {
    for (let j = Math.max(0, column - K); j <= Math.min(board.width - 1, column + K); j++)
    {
      board.setCellType(i, j, cellType)
      // board.setTableCellType(i, j, cellType)
    }
  }
}

function validForThickness(type) {
  let validTypes = [CellType.EMPTY, CellType.WALL]
  return validTypes.includes(type)
}

window.onCellClick = (event: Event, row: number, column: number) => {
  if (board.getCellType({ row: row, col: column }) === cellType)
  {
    return
  }
  event.preventDefault()
  if (validForThickness(cellType))
  {
    dfs(row, column, thickness)
  }
  else
  {
    board.setCellType(row, column, cellType)
  }
}

window.onCellDragStart = (event: Event) => {
  event.dataTransfer.setDragImage(new Image(), 0, 0)
  event.dataTransfer.effectAllowed = 'move'
}

window.onCellDrag = (event: Event, row: number, colum: number) => {
  event.preventDefault()
}

window.onCellOver = (event: Event, row: number, column: number) => {
  event.preventDefault()
  if (validForThickness(cellType))
  {
    dfs(row, column, thickness)
  }
  else
  {
    board.setCellType(row, column, cellType)
  }
}

window.setCellToDraw = (event: Event, type: CellType) => {
  cellType = type
}

window.setThickness = (event: Event) => {
  thickness = parseInt(event.target.value)

  let elemValueThickness = document.getElementById('thickness_label_value')
  elemValueThickness.innerHTML = thickness
  console.log(event.target.value)
}

window.clearBoard = (event: Event) => {
  board.clear()
}

window.setAlgorithm = (event: Event, algorithmType: AlgorithmType) => {
  algorithm = FactoryAlgorithm(algorithmType)

  let elem = document.getElementById('navbarDropdown')
  elem.innerText = algorithmType
}

window.runAlgorithm = (event: Event) => {
  if (!board.isThereBegin || !board.isThereExit)
  {
    console.log('Missing beginning or exit.')
    return
  }

  console.log(`Executing algorihm`)
  const path: BoardPath = algorithm.findPath(board, animationDelay)
  for (let i = 1; i < path.length - 1; i++)
  {
    AnimationManager.setCellStyle(path[i], CellType.PATH, animationDelay)
  }
  console.log(`Finished algorihm`)
}