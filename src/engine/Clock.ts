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

  debug(): string {
    return `${this.s().toFixed(3)}s`
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

// DOMHighResTimesStamp
// https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
export class PerfTime {
  duration: Duration

  constructor(duration: Duration) {
    this.duration = duration
  }

  static now(): PerfTime {
    return new PerfTime(Duration.ms(window.performance.now()))
  }

  // I havne't found docs to confirm. But many sources mention that the midi timestamp
  // is based on the same DOMHighResTimeStamp as window.performance.now()
  static fromMidi(midiMessageEvent: MIDIMessageEvent): PerfTime {
    return new PerfTime(Duration.ms(midiMessageEvent.timeStamp))
  }

  toAudio(delta: ClockDelta): AudioTime {
    return new AudioTime(this.duration.minus(delta.duration))
  }
}

// Web Audio Context currentTime property
// https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/currentTime
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