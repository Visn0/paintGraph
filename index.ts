import Board from './src/Board';
import { CellType } from './src/CellType';

import './src/EventHandlers';

window.onload = init
window.CellType = CellType

let board: Board = null
let cellType: CellType = CellType.EMPTY

function init() {
  let rows: number = 70;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()
}

window.onCellClick = (event: Event, row: number, column: number) => {
  event.preventDefault()
  board.setCellType(row, column, cellType)
}

window.onCellDragStart = (event: event) => {
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