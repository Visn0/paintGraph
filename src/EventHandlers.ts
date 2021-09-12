const onCellClick =  (event: Event, row: number, col: number) => {
  console.log("CELL_CLICK")
}

const onCellDrag = (event: Event, row: number, col: number) => {
  console.log("CELL_DRAG")
}

const algo = (j: any) => {
  console.log(j)
}

export default {
  onCellClick,
  onCellDrag,
  algo
}