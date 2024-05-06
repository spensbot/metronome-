import { getAudioContext, loadBuffer } from './audioUtils'
import metronomePath from '/metronome.mp3'
import { store } from '../redux/store'
import { AudioTime, ClockDelta, Duration, PerfTime, Tempo } from './Clock'

interface GraphData {
  ctx: AudioContext
  metronome: AudioBuffer
  gainNode: GainNode
  clockDelta: ClockDelta
}

async function createGraph(): Promise<GraphData> {
  console.log(`createGraph()`)
  const ctx = getAudioContext()
  const gainNode = ctx.createGain()
  const metronome = await loadBuffer(ctx, metronomePath)
  gainNode.connect(ctx.destination)


  return {
    ctx,
    gainNode,
    metronome,
    clockDelta: new ClockDelta(ctx)
  }
}

export default class AudioEngine {
  lastClick: AudioTime = AudioTime.zero()
  tempo: Tempo = Tempo.bpm(120)
  timeoutId: number | null = null
  graph: GraphData | null = null

  async init() {
    if (this.graph === null) {
      this.graph = await createGraph()
    } else {
      this.graph.ctx.resume()
    }
  }

  async start() {
    await this.init()

    this.stop()

    const prepNextClick = (time: AudioTime) => {
      const { tempo, metronomeGain } = store.getState().settings
      this.tempo = tempo

      this.playMetronomeSound(metronomeGain, time)

      const period = tempo.period()

      const nextClickTime = time.plus(period)

      this.timeoutId = window.setTimeout(() => prepNextClick(nextClickTime), period.ms())
    }

    prepNextClick(this.currentTime())
  }

  stop() {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId)
    }
  }

  currentTime(): AudioTime {
    if (this.graph) {
      return AudioTime.now(this.graph.ctx)
    } else {
      return AudioTime.zero()
    }
  }

  // Returns the how far the time is between metronome beats
  // From 0 to 1. Assuming time is between lastClick and nextClick
  beatRatio(time: AudioTime): number {
    if (this.graph) {
      const period = this.tempo.period()
      const lastClick = this.lastClick.duration

      const delta = time.duration.minus(lastClick)

      return delta.s() / period.s()
    } else {
      return 0
    }
  }

  // Similar to beatRatio, but gives the position of the time in the visualizer
  visualizerRatio(time: AudioTime): number {
    const beatRatio = this.beatRatio(time)
    if (beatRatio < 0.5) {
      return beatRatio + 0.5 // 0.5 to 1
    } else {
      return beatRatio - 0.5
    }
  }

  audioTime(perfTime: PerfTime): AudioTime {
    if (this.graph) {
      return perfTime.toAudio(this.graph.clockDelta)
    } else {
      return AudioTime.zero()
    }
  }

  clockDelta(): Duration {
    return this.graph ? this.graph.clockDelta.duration : Duration.s(0)
  }

  private playMetronomeSound(gain: number, time: AudioTime) {
    if (!this.graph) return

    const { ctx, metronome, gainNode } = this.graph

    this.graph.clockDelta = new ClockDelta(ctx)

    const source = ctx.createBufferSource()
    source.buffer = metronome
    source.connect(gainNode)
    gainNode.gain.setValueAtTime(gain, 0)
    source.start(time.duration.s())
    this.lastClick = time
  }
}
