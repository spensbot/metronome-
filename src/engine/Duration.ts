export default class Duration {
  private seconds

  private constructor(seconds: number) {
    this.seconds = seconds
  }

  static s(seconds: number) {
    return new Duration(seconds)
  }

  static ms(millis: number) {
    return new Duration(millis / 1000)
  }

  s() {
    return this.seconds
  }

  ms() {
    return this.seconds * 1000
  }

  minus(other: Duration) {
    return new Duration(this.seconds - other.seconds)
  }

  plus(other: Duration) {
    return new Duration(this.seconds + other.seconds)
  }
}

export function bpmInterval(bpm: number): Duration {
  return Duration.s(60 / bpm)
}