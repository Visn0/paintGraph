import Board from './src/Board';
import './src/EventHandlers';

window.onload = init

let board

function init() {
  let rows: number = 70;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()
}

window.onCellClick = (event: Event, row: number, col: number) => {
  event.preventDefault()
}

window.onCellDragStart = (event: event) => {
  event.dataTransfer.setDragImage(new Image(), 0, 0)
  event.dataTransfer.effectAllowed = 'move'
}

window.onCellDrag = (event: Event, row: number, col: number) => {
  event.preventDefault()
}

window.onCellOver = (event: Event, row: number, col: number) => {
  event.preventDefault()
  let element = board.getElement(row, col)
  element.style.backgroundColor = "red"
}