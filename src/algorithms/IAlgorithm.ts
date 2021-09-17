import Board from "../Board";

/////////////////////////////////
// INTERFACE
/////////////////////////////////

export type BoardPath = Array<ICoordinate>

export interface IAlgorithm {
  findPath(board: Board, animationDelay: number): BoardPath
}

export class IBaseCoordinate {
  row: number
  col: number

  constructor(r: number, c: number) {
    this.row = r
    this.col = c
  }
}

export interface ICoordinate {
  row: number
  col: number
  bound?: number // bound used in heuristic algorithms such as "Branch and Bound" or "A*"
  prev?: ICoordinate // reference to the previous node visited in order to reach "this" node
  pathLength?: number
}

/////////////////////////////////
// UTILS
/////////////////////////////////

export function EuclideanDistance(a: ICoordinate, b: ICoordinate): number {
  return Math.sqrt(Math.abs(a.row - b.row) + Math.abs(a.col - b.col))
}

export function ManhattanDistance(a: ICoordinate, b: ICoordinate): number {
  return (Math.abs(a.row - b.row) + Math.abs(a.col - b.col))
}

export function validCoord(coord: ICoordinate, maxRow: number, maxCol: number): boolean {
  return (coord.row < maxRow && coord.row >= 0
    && coord.col < maxCol && coord.col >= 0)
}

export function compareCoords(a: ICoordinate, b: ICoordinate): boolean {
  return a.bound < b.bound
}

export function getPath(coord: ICoordinate): BoardPath {
  let path: BoardPath = new Array<ICoordinate>(coord.pathLength)
  path[coord.pathLength - 1] = { ...coord }

  for (let i = coord.pathLength - 2; i >= 0; i--)
  {
    path[i] = path[i + 1].prev
  }

  return path
}

export class Stack<T> {
  _store: T[] = [];
  lenght = 0
  push(val: T) {
    this._store.push(val);
    this.lenght += 1
  }
  pop(): T | undefined {
    if (this.lenght != 0)
      this.lenght -= 1
    return this._store.pop();
  }
}

export class Queue<T> {
  _store: T[] = [];
  lenght = 0
  push(val: T) {
    this.lenght += 1
    this._store.push(val);
  }
  pop(): T | undefined {
    if (this.lenght != 0)
      this.lenght -= 1
    return this._store.shift();
  }
}

