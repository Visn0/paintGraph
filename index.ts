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
let algorithm: IAlgorithm = FactoryAlgorithm(AlgorithmType.BACKTRACKING)
let thickness: number = 1
let animationDelay: number = 150

function init() {
  thickness = document.getElementById('thickness').value
  let rows: number = 30;
  // let rows: number = 10;
  let cols: number = rows * 2;
  board = new Board(rows, cols)
  board.init()

  animationDelay /= rows
}

function dfs(row, column, K) {
  if (K <= 0)
  {
    return;
  }

  if (cellType === board.getCellType({ row: row, col: column })) return

  board.setCellType(row, column, cellType)
  moves.forEach(move => {
    dfs(row + move[0], column + move[1], K - 1)
  });
}

function validForThickness(type) {
  let validTypes = [CellType.EMPTY, CellType.WALL]
  return validTypes.includes(type)
}

window.onCellClick = (event: Event, row: number, column: number) => {
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
  thickness = event.target.value

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
  for(let i = 1; i < path.length-1; i++) {
    AnimationManager.setCellStyle(path[i], CellType.PATH, animationDelay)
  }
}