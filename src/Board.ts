import { type } from "os"
import { ICoordinate } from "./algorithms/IAlgorithm"
import { CellType } from "./CellType"

class Board {
  #element: HTMLElement = null
  #rows: number = null
  #columns: number = null
  #table: Array<Array<CellType>> = []
  // #table: CellType[][]
  #begin: ICoordinate = null
  #exit: ICoordinate = null

  constructor(height: number, width: number) {
    this.#element =  document.getElementById('board')
    this.#rows = height
    this.#columns = width
    this.#table = new Array<Array<CellType>>()
    for(let r = 0; r < height; ++r) {
      this.#table.push(new Array<CellType>(width).fill(CellType.EMPTY))
    }
  }

  get height(): number {
    return this.#rows
  }

  get width(): number {
    return this.#columns
  }

  get isThereBegin(): boolean {
    return !!this.#begin
  }

  get isThereExit(): boolean {
    return !!this.#exit
  }

  get begin(): ICoordinate {
    return { ...this.#begin }
  }

  get exit(): ICoordinate {
    return { ...this.#exit }
  }

  getCellType(coord: ICoordinate): CellType {
    return this.#table[coord.row][coord.col]
  }

  init() {
    let result = this.#tableToHTML()
    this.#element.innerHTML = result
  }

  clear() {
    for(let r = 0; r < this.#rows; r++) {
      for(let c = 0; c < this.#columns; c++) {
        let elem = this.#getElementByCoords(r, c)
        this.#removeCellCSSClass(elem, this.#table[r][c])
        this.#table[r][c] = CellType.EMPTY
      }
    }
  }

  setCellType(row: number, column: number, type: CellType) {
    if (type == CellType.BEGIN) {
      // Only one begin cell is allowed
      if (this.#begin) return
      this.#begin = { row: row, col: column }
    } else if (type == CellType.EXIT) {
      // Only one begin cell is allowed
      if (this.#exit) return
      this.#exit = { row: row, col: column }
    }

    let elem = this.#getElementByCoords(row, column)

    this.#removeCellCSSClass(elem, this.#table[row][column])
    this.#addCellCSSClass(elem, type)

    this.#table[row][column] = type
  }

  #tableToHTML() {
    let result = ""

    for (let ir = 0; ir < this.#rows; ir++) {
      let htmlrow = `<tr id="row${ir}">\n`
      for (let ic = 0; ic < this.#columns; ic++) {
        let htmlcell = `\t
        <td id="cell${ir}_${ic}"
          onclick="onCellClick(event, ${ir}, ${ic})"
          ondragstart="onCellDragStart(event)"
          ondrag="onCellDrag(event, ${ir}, ${ic})"
          ondragover="onCellOver(event, ${ir}, ${ic})"
          draggable="true">
        </td>\n`
        htmlrow += htmlcell
      }
      result += htmlrow + "</tr>\n"
    }

    return result
  }

  #getElementByCoords(row: number, column: number): HTMLElement {
    return document.getElementById(`cell${row}_${column}`)
  }

  #addCSSClass(elem: HTMLElement, cssClass: string) {
    elem.className = cssClass
  }

  #removeCellCSSClass(elem: HTMLElement, type: CellType) {
    switch (type) {
      case CellType.BEGIN:
        this.#begin = null
        elem.className = ''
        break

      case CellType.WALL:
        elem.className = ''
        break

      case CellType.EXIT:
        this.#exit = null
        elem.className = ''
        break

      case CellType.EMPTY:
        elem.className = ''
        break

      case CellType.EXPLORED:
        elem.className = ''
        break

      case CellType.PATH:
        elem.className = ''
        break
    }
  }

  #addCellCSSClass(elem: HTMLElement, type: CellType) {
    switch (type) {
      case CellType.BEGIN:
        this.#addCSSClass(elem, 'bg-primary')
        break

      case CellType.WALL:
        this.#addCSSClass(elem, 'bg-secondary')
        break

      case CellType.EXIT:
        this.#addCSSClass(elem, 'bg-success')
        break

      case CellType.EMPTY:
        break

      case CellType.EXPLORED:
        this.#addCSSClass(elem, 'bg-warning')
        break

      case CellType.PATH:
        break
      default:
        console.log("ERROR")
  }
  }
}

export default Board;