import { FactoryAlgorithm } from './src/algorithms/FactoryAlgorithm';
import { AlgorithmType, IAlgorithm } from './src/algorithms/IAlgorithm';
import Board from './src/Board';
import { CellType } from './src/CellType';

window.onload = init
window.CellType = CellType
window.AlgorithmType = AlgorithmType

let board: Board = null
let cellType: CellType = CellType.EMPTY
let algorithm: IAlgorithm = FactoryAlgorithm(AlgorithmType.BACKTRACKING)

function init() {
  // let rows: number = 70;
  let rows: number = 4;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()
}

window.onCellClick = (event: Event, row: number, column: number) => {
  event.preventDefault()
  board.setCellType(row, column, cellType)
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
  board.setCellType(row, column, cellType)
}

window.setCellToDraw = (event: Event, type: CellType) => {
  cellType = type
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
  console.log(board.begin)
  console.log(board.exit)
  if (!board.isThereBegin || !board.isThereExit) {
    console.log('Missing beginning or exit.')
    return
  }


  console.log(`Executing algorihm`)
  algorithm.findPath(board)
}