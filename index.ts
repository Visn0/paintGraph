import Board from './src/Board';
import './src/EventHandlers';

window.onload = init

let board

function init() {
  board = new Board(3, 4)
  board.init()
}

declare global {
  function onCellClick (event: Event, row: number, col: number);
}

const onCellClick = (event: Event, row: number, col: number) =>{
  console.log("CELL_CLICK")
}

const onCellDrag = (event: Event, row: number, col: number) {
  console.log("CELL_DRAG")
}

const algo = (j: any) => {
  console.log("ASDASD")
}

// export default {
//   onCellClick,
//   onCellDrag,
//   algo
// }
