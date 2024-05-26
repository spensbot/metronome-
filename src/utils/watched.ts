export default class Watched<T> {
  private val: T | null = null

  getIfUpdated(val: T): T | null {
    if (val != this.val) {
      this.val = val
      return val
    } else {
      return null
    }
  }
}