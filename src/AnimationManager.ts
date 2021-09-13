import { ICoordinate } from "./algorithms/IAlgorithm";
import { CellType } from "./CellType";

class AnimationManager {
  private constructor() {}

  static #getElementByCoord(coord: ICoordinate): HTMLElement {
    return document.getElementById(`cell${coord.row}_${coord.col}`)
  }

  static setCellStyle(coord: ICoordinate, type: CellType) {
    let elem = this.#getElementByCoord(coord)
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
        break

      case CellType.EXPLORED:
        elem.className = 'bg-warning'
        break

      case CellType.PATH:
        elem.className = 'bg-danger'
        break
      default:
        console.log("ERROR")
    }
  }
}

export default AnimationManager;