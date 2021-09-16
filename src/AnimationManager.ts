import { ICoordinate } from "./algorithms/IAlgorithm";
// import { CellType } from "./CellType";
import { CellType } from './constants'

class AnimationManager {
  static #animationCounter: number = 0

  private constructor() { }

  static #getDelay (animationDelay: number) {
    return animationDelay * this.#animationCounter
  }

  static getElementByCoord(coord: ICoordinate): HTMLElement {
    return document.getElementById(`cell${coord.row}_${coord.col}`)
  }

  static setExploredCell(coord: ICoordinate, animationDelay: number = 0) {
    let elem = this.getElementByCoord(coord)

    this.#animationCounter += 1
    setTimeout(() => {
      this.#animationCounter -= 1
      // let prevColor: string = elem.style.backgroundColor ? elem.style.backgroundColor : "rgba(163, 80, 220, 0.20)"
      // prevColor = prevColor.split(',')[3]
      // elem.style.backgroundColor = `rgba(163, 80, 255, ${parseFloat(prevColor) + 0.04})`
      elem.className = 'explored-node'
    }, this.#getDelay(animationDelay))
  }

  static setEmptyCell(coord: ICoordinate) {
    let elem = this.getElementByCoord(coord)
    elem.className = ''
    elem.style.backgroundColor = ''
  }

  static setCellStyle(coord: ICoordinate, type: CellType, animationDelay: number = 0) {
    let elem = this.getElementByCoord(coord)

    this.#animationCounter += 1
    setTimeout(() => {
      this.#animationCounter -= 1
      switch (type)
      {
        case CellType.BEGIN:
          elem.className = 'begin-node'
          elem.style.backgroundColor = ''
          break

        case CellType.WALL:
          elem.className = 'wall-node'
          elem.style.backgroundColor = ''
          break

        case CellType.EXIT:
          elem.className = 'exit-node'
          elem.style.backgroundColor = ''
          break

        case CellType.EMPTY:
          elem.className = 'empty-node'
          elem.style.backgroundColor = ''
          break

        case CellType.PATH:
          elem.className = 'path-node'
          elem.style.backgroundColor = ''
          break
      }
    }, this.#getDelay(animationDelay))
  }
}

export default AnimationManager;