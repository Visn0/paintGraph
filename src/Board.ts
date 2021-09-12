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
    console.log(result)
    this.#element.innerHTML = result
  }

  #tableToHTML() {
    let result = ""

    for (let ir = 0; ir < this.height; ir++) {
      let htmlrow = `<tr id="row${ir}">\n`
      for (let ic = 0; ic < this.width; ic++) {
        let htmlcell = `\t<td id="cell${ir}_${ic}" onclick="onCellClick(event, ${ir}, ${ic})" ondrag="onCellDrag(event, 1, 2)" draggable="true"></td>\n` // event, ${ir}, ${ic}
        htmlrow += htmlcell
      }
      result += htmlrow + "</tr>\n"
    }
    return result
  }
}

export default Board;