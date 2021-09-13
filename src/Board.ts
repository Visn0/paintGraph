import { ICoordinate } from "./algorithms/IAlgorithm"
import { CellType } from "./CellType"

class Board {
  #element: HTMLElement = null
  #rows: number = null
  #columns: number = null
  #table: Array<CellType> = []
  #begin: ICoordinate = null
  #countExits: number = 0

  constructor(height, width) {
    this.#element =  document.getElementById('board')
    this.#rows = height
    this.#columns = width
    this.#table = Array(this.#rows).fill(Array(this.#columns))
  }

  get height() {
    return this.#rows
  }

  get width() {
    return this.#columns
  }

  get areThereExits() {
    return this.#countExits > 0
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
    }

    let elem = this.#getElementByCoords(row, column)

    this.#removeCellCSSClass(elem, this.#table[row][column])
    this.#addCellCSSClass(elem, type)

    this.#table[row][column] = type
  }

  getBegin(): ICoordinate {
    return this.#begin
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
    if (!elem.classList.contains(cssClass)) {
      elem.classList.add(cssClass)
    }
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
        elem.className = ''
        this.#countExits -= 1
        break

      case CellType.EMPTY:
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
        this.#countExits += 1
        break

      case CellType.EMPTY:
        break
    }
  }
}

export default Board;