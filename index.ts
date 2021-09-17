import AStar from './src/algorithms/AStar';
import { Backtracking } from './src/algorithms/Backtracking';
import { BranchAndBound } from './src/algorithms/BranchAndBound';
import { FactoryAlgorithm } from './src/algorithms/FactoryAlgorithm';
import { BoardPath, IAlgorithm } from './src/algorithms/IAlgorithm';
import AnimationManager from './src/AnimationManager';
import Board from './src/Board';
import { AlgorithmType, CellType, MAX_ROWS } from './src/constants';

// ################################################
// ### VARIABLES
// ################################################
const modal: HTMLElement = document.getElementById('modal')
let board: Board = null
let cellType: CellType = CellType.WALL // CellType.EMPTY
let algorithm: IAlgorithm = FactoryAlgorithm(AlgorithmType.A_STAR)
let thickness: number = 1
let animationDelay: number = 0
let boardRows: number = 50 // MAX_ROWS.A_STAR

// ################################################
// ### WINDOW INIT
// ################################################
window.onload = () => {
  document.getElementById('thickness').value = thickness
  document.getElementById('boardrows').value = boardRows
  document.getElementById('animation-delay').value = animationDelay
  document.getElementById('animation-delay_label_value').innerHTML = `${animationDelay}`
  board = new Board(boardRows, boardRows * 2)
  board.init()
}

// ################################################
// ### ANIMATION DELAY CONFIGURATION EVENTS AND FUNCTIONS
// ################################################
document.getElementById('animation-delay').onchange = (event: Event) => {
  animationDelay = parseInt(event.target.value)
  let elemValueDelay = document.getElementById('animation-delay_label_value')
  elemValueDelay.innerHTML = animationDelay
}

// ################################################
// ### BOARD SIZE EVENTS AND FUNCTIONS
// ################################################
document.getElementById('boardrows').onchange = (event: Event) => {
  boardRows = parseInt(event.target.value)
  updateBoardRows(boardRows)
}

function updateBoardRows(rows: number) {
  let boardRowsElement: HTMLElement = document.getElementById('boardrows')
  let maxRowsElement = document.getElementById('max-rows-label')

  if (algorithm instanceof Backtracking)
  {
    boardRowsElement.max = MAX_ROWS.BACKTRACKING
    maxRowsElement.innerText = MAX_ROWS.BACKTRACKING
    if (rows > MAX_ROWS.BACKTRACKING)
    {
      boardRows = MAX_ROWS.BACKTRACKING
    }
  } else if (algorithm instanceof BranchAndBound)
  {
    boardRowsElement.max = MAX_ROWS.BRANCH_AND_BOUND
    maxRowsElement.innerText = MAX_ROWS.BRANCH_AND_BOUND
    if (rows > MAX_ROWS.BRANCH_AND_BOUND)
    {
      boardRows = MAX_ROWS.BRANCH_AND_BOUND
    }
  } else if (algorithm instanceof AStar)
  {
    boardRowsElement.max = MAX_ROWS.A_STAR
    maxRowsElement.innerText = MAX_ROWS.A_STAR
    if (rows > MAX_ROWS.A_STAR)
    {
      boardRows = MAX_ROWS.A_STAR
    }
  }

  boardRowsElement.value = boardRows
  board.resize(boardRows, boardRows * 2)
}

// ################################################
// ### DRAWING EVENTS AND FUNCTIONS
// ################################################
function dfs(row: number, column: number, K: number) {
  K = parseInt(K - 1)
  for (let i = Math.max(0, row - K); i <= Math.min(board.height - 1, row + K); i++)
  {
    for (let j = Math.max(0, column - K); j <= Math.min(board.width - 1, column + K); j++)
    {
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

  if (validForThickness(cellType))
  {
    dfs(row, column, thickness)
  } else
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
  } else
  {
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
}


// ################################################
// ### ALGORITHM SELECTION BUTTONS
// ################################################
function setAlgorithmBtn(innerText: string) {
  let elem = document.getElementById('algorithms-dropdown')
  elem.innerText = innerText
  updateBoardRows(boardRows)
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
  if (!board.isThereBegin)
  {
    showModal('ERROR', "Missing beginning cell.")
    return
  }

  if (!board.isThereExit)
  {
    showModal('ERROR', "Missing exit cell.")
    return
  }

  board.clearExploredNodes()

  console.log(`Executing algorihm`)
  const path: BoardPath = algorithm.findPath(board, animationDelay)
  if (path.length === 0)
  {
    showModal('Uuups!', 'There are not paths.')
  }

  for (let i = 0; i < path.length - 1; i++)
  {
    AnimationManager.setCellStyle(path[i], CellType.PATH, animationDelay)
  }
  console.log(`Finished algorihm`)
}

// ################################################
// ### MODAL EVENTS AND FUNCTIONS
// ################################################
document.getElementById('close-modal').onclick = hideModal
document.getElementById('modal').onclick = hideModal

function showModal(title: string, body: string) {
  console.log(title, body)
  let elemTitle = document.getElementById('modal-title')
  elemTitle.innerText = title

  let elemBody = document.getElementById('modal-body')
  elemBody.innerText = body

  modal.style.display = 'block'
  modal.classList.add('show')
}

function hideModal() {
  modal.style.display = 'none'
  modal.classList.remove('show')
}