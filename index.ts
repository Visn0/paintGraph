import Board from './src/Board';
import './src/EventHandlers';

window.onload = init

let board

function init() {
  board = new Board(3, 4)
  board.init()
}

window.onCellClick = (event?: Event, row?: number, col?: number) =>{
  event.preventDefault()
  console.log("CELL_CLICK")
}

window.onCellDrag = (event: Event, row: number, col: number) => {
  console.log(event)
  event.preventDefault()
  console.log("CELL_DRAG, ", row, col)
}