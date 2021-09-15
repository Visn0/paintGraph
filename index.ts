import { FactoryAlgorithm } from './src/algorithms/FactoryAlgorithm';
import { BoardPath, IAlgorithm } from './src/algorithms/IAlgorithm';
import AnimationManager from './src/AnimationManager';
import Board from './src/Board';
import { AlgorithmType, CellType } from './src/constants';

window.onload = init

let board: Board = null
let cellType: CellType = CellType.EMPTY
let algorithm: IAlgorithm = FactoryAlgorithm(AlgorithmType.A_STAR)
let thickness: number = 1
let animationDelay: number = 3

function init() {
  thickness = parseInt(document.getElementById('thickness').value)
  let rows: number = 50;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()
}

// ################################################
// ### DRAWING EVENTS AND FUNCTIONS
// ################################################

function dfs(row: number, column: number, K: number) {
  K = parseInt(K - 1)
  for (let i = Math.max(0, row - K); i <= Math.min(board.height - 1, row + K); i++) {
    for (let j = Math.max(0, column - K); j <= Math.min(board.width - 1, column + K); j++) {
      board.setCellType(i, j, cellType)
    }
  }
}

function validForThickness(type) {
  let validTypes = [CellType.EMPTY, CellType.WALL]
  return validTypes.includes(type)
}

window.onCellClick = (event: Event, row: number, column: number) => {
  event.preventDefault()

  if (board.getCellType({ row: row, col: column }) === cellType) return

  if (validForThickness(cellType)) {
    dfs(row, column, thickness)
  } else {
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

  if (validForThickness(cellType)) {
    dfs(row, column, thickness)
  } else {
    board.setCellType(row, column, cellType)
  }
}

// ################################################
// ### CELL TYPE DRAWING BUTTONS
// ################################################
document.getElementById('begin-btn').onclick = (event: Event) => cellType = CellType.BEGIN
document.getElementById('wall-btn').onclick = (event: Event) => cellType = CellType.WALL
document.getElementById('exit-btn').onclick = (event: Event) => cellType = CellType.EXIT
document.getElementById('empty-btn').onclick = (event: Event) => cellType = CellType.EMPTY
document.getElementById('clear-map-btn').onclick = (event: Event) => board.clear()
document.getElementById('thickness').onchange = (event: Event) => {
  thickness = parseInt(event.target.value)

  let elemValueThickness = document.getElementById('thickness_label_value')
  elemValueThickness.innerHTML = thickness
  console.log(event.target.value)
}


// ################################################
// ### ALGORITHM SELECTION BUTTONS
// ################################################
function setAlgorithmBtn (innerText: string) {
  let elem = document.getElementById('navbarDropdown')
  elem.innerText = innerText
}

// Backtracking button
document.getElementById('backtracking-btn').onclick = (event: Event) => {
  algorithm = FactoryAlgorithm(AlgorithmType.BACKTRACKING)
  setAlgorithmBtn(AlgorithmType.BACKTRACKING)
}

// Branch and Bound button
document.getElementById('branch-and-bound-btn').onclick = (event: Event) => {
  algorithm = FactoryAlgorithm(AlgorithmType.BRANCH_AND_BOUND)
  setAlgorithmBtn(AlgorithmType.BRANCH_AND_BOUND)
}

// A Star button
document.getElementById('a-star-btn').onclick = (event: Event) => {
  algorithm = FactoryAlgorithm(AlgorithmType.A_STAR)
  setAlgorithmBtn(AlgorithmType.A_STAR)
}

// Run algorithm button
document.getElementById('run-btn').onclick = (event: Event) => {
  if (!board.isThereBegin) {
    console.log('Missing beginning cell.')
    return
  }

  if (!board.isThereExit) {
    console.log('Missing exit cell.')
    return
  }

  board.clearExploredNodes()

  console.log(`Executing algorihm`)
  const path: BoardPath = algorithm.findPath(board, animationDelay)
  for (let i = 0; i < path.length - 1; i++) {
    AnimationManager.setCellStyle(path[i], CellType.PATH, animationDelay)
  }
  console.log(`Finished algorihm`)
}