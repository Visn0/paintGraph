class PriorityQueue<T> {
  #data: Array<T> = []
  #comparator: (a: T, b: T) => boolean

  constructor (comparator: (a: T, b: T) => boolean) {
    this.#data = new Array<T>()
    this.#comparator = comparator
  }

  push (item: T) {
    if (this.empty()) {
      this.#data.push(item)
      return
    }

    for (let i = 0; i < this.#data.length; i++) {
      if (this.#comparator(item, this.#data[i])) {
        this.#data.splice(i + 1, 0, JSON.parse(JSON.stringify(item)))
        console.log(this.#data)
        break
      }
    }
  }

  pop (): T {
    if (this.#data.length > 0)
      return this.#data.splice(0, 1)[0]
    else
      return null
  }

  empty (): boolean {
    return this.#data.length === 0
  }

  get data () {
    return this.#data
  }
}

export default PriorityQueue