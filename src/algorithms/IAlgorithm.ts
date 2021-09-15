import Board from "../Board";

/////////////////////////////////
// INTERFACE
/////////////////////////////////

export type BoardPath = Array<ICoordinate>

export interface IAlgorithm {
  findPath(board: Board, animationDelay: number): BoardPath
}

export interface ICoordinate {
  row: number
  col: number
  bound?: number // bound used in heuristic algorithms such as "Branch and Bound" or "A*"
  prev?: ICoordinate // reference to the previous node visited in order to reach "this" node
  pathLength?: number
}

export enum AlgorithmType {
  BACKTRACKING = "Backtracking",
  BRANCH_AND_BOUND = 'Branch&Bound',
  A_STAR = 'A Star (A*)'
}


/////////////////////////////////
// UTILS
/////////////////////////////////

export const MOVES = [
  // { row: 1,  col: -1 }, // down left
  { row: 1, col: 0 }, // down
  // { row: 1,  col:  1 }, // down right
  { row: 0, col: 1 }, // right
  // { row: -1, col:  1 }, // up right
  { row: -1, col: 0 }, // up
  // { row: -1, col: -1 }, // up left
  { row: 0, col: -1 }, // left
]


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

export function compareCoords (a: ICoordinate, b: ICoordinate): boolean {
  return a.bound < b.bound
}

export function getPath (coord: ICoordinate): BoardPath {
  let path: BoardPath = new Array<ICoordinate>(coord.pathLength)
  path[coord.pathLength-1] = { ...coord }

  for (let i = coord.pathLength - 2; i >= 0; i--) {
    path[i] = path[i+1].prev
  }

  return path
}
