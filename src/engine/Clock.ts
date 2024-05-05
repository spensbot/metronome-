export class Duration {
  private seconds

  private constructor(seconds: number) {
    this.seconds = seconds
  }

  static s(seconds: number): Duration {
    return new Duration(seconds)
  }

  static ms(millis: number): Duration {
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

export class Tempo {
  private _period: Duration

  private constructor(period: Duration) {
    this._period = period
  }

  static bpm(bpm: number): Tempo {
    return new Tempo(Duration.s(60 / bpm))
  }

  bpm(): number {
    return 60 / this._period.s()
  }

  period(): Duration {
    return this._period
  }
}

export class ClockDelta {
  duration: Duration

  constructor(ctx: AudioContext) {
    const perf = PerfTime.now().duration
    const audio = AudioTime.now(ctx).duration
    this.duration = perf.minus(audio)
  }
}

export class PerfTime {
  duration: Duration

  constructor(duration: Duration) {
    this.duration = duration
  }

  static now(): PerfTime {
    return new PerfTime(Duration.ms(window.performance.now()))
  }

  toAudio(delta: ClockDelta): AudioTime {
    return new AudioTime(this.duration.minus(delta.duration))
  }
}

export class AudioTime {
  duration: Duration

  constructor(duration: Duration) {
    this.duration = duration
  }

  static zero(): AudioTime {
    return new AudioTime(Duration.s(0))
  }

  static now(ctx: AudioContext): AudioTime {
    return new AudioTime(Duration.s(ctx.currentTime))
  }

  plus(duration: Duration): AudioTime {
    return new AudioTime(this.duration.plus(duration))
  }

  toPerf(delta: ClockDelta): PerfTime {
    return new PerfTime(this.duration.plus(delta.duration))
  }
}