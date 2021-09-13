import { ICoordinate } from "./algorithms/IAlgorithm";
import { CellType } from "./CellType";

class AnimationManager {
  static #animationCounter:  number = 0

  private constructor() {}

  static #getElementByCoord(coord: ICoordinate): HTMLElement {
    return document.getElementById(`cell${coord.row}_${coord.col}`)
  }

  static setCellStyle(coord: ICoordinate, type: CellType, animationDelay: number = 0) {
    let elem = this.#getElementByCoord(coord)

    // this.#sleep(animationDelay)
    this.#animationCounter += 1
    setTimeout(() => {
    this.#animationCounter -= 1
    switch (type) {
      case CellType.BEGIN:
        elem.className = 'bg-primary'
        break

      case CellType.WALL:
        elem.className = 'bg-secondary'
        break

      case CellType.EXIT:
        elem.className = 'bg-success'
        break

      case CellType.EMPTY:
        elem.className = ''
        elem.style.backgroundColor = ''
        break

      case CellType.EXPLORED:
        let prevColor: string = elem.style.backgroundColor ? elem.style.backgroundColor : "rgba(163, 80, 220, 0.20)"
        prevColor = prevColor.split(',')[3]
        elem.style.backgroundColor = `rgba(163, 80, 255, ${parseFloat(prevColor) + 0.04})`
        break

      case CellType.PATH:
        elem.className = 'bg-danger'
        break
    }
    }, animationDelay * this.#animationCounter)
  }
}

export default AnimationManager;