class Board {
  #element = null
  height = null
  width = null
  table = []

  constructor(h, w) {
    this.#element =  document.getElementById('board')
    this.height = h
    this.width = w
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
        let htmlcell = `\t<td id="cell${ir}_${ic}"></td>\n`
        htmlrow += htmlcell
      }
      result += htmlrow + "</tr>\n"
    }
    return result
  }
}