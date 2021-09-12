class Board {
  #element = null
  height = null
  width = null
  table = []

  constructor(height, width) {
    this.#element =  document.getElementById('board')
    this.height = height
    this.width = width
    this.table = Array(this.height).fill(Array(this.width)) // h*w
  }

  init() {
    let result = this.#tableToHTML()
    this.#element.innerHTML = result
  }

  #tableToHTML() {
    let result = ""

    for (let ir = 0; ir < this.height; ir++) {
      let htmlrow = `<tr id="row${ir}">\n`
      for (let ic = 0; ic < this.width; ic++) {
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

  getElement(row, col): HTMLElement {
    let elem = document.getElementById(`cell${row}_${col}`)
    return elem
  }
}

export default Board;