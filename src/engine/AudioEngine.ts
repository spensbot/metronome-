import { getAudioContext, loadBuffer } from './audioUtils'
import metronomePath from '/metronome.mp3'
import { store } from '../redux/store'
import { AudioTime, Duration, PerfTime, Tempo } from './Clock'

interface GraphData {
  ctx: AudioContext
  metronome: AudioBuffer
  gainNode: GainNode
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
    metronome
  }
}

let desiredTime = 0
let drift = 0

export default class AudioEngine {
  nextClick: AudioTime = AudioTime.zero()
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
      console.log(`prepNextClick`)
      const { tempo, metronomeGain } = store.getState().settings
      this.tempo = tempo

      this.playMetronomeSound(metronomeGain, time)

      const period = tempo.period()

      const nextClickTime = time.plus(period)

      // TODO: Fix this so it keeps setTimeout synchronized
      // This current approach will drift
      drift += performance.now() - desiredTime
      desiredTime = performance.now() + period.ms()
      // console.log(`drift: ${drift.toFixed(1)} | now: ${AudioTime.now(this.graph!.ctx).duration} | nextClickTime: ${nextClickTime.duration}`)

      this.timeoutId = window.setTimeout(() => prepNextClick(nextClickTime), period.ms())
    }

    const { tempo, metronomeGain } = store.getState().settings
    this.tempo = tempo

    prepNextClick(this.currentTime().plus(tempo.period()))
  }

  stop() {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId)
    }
  }

  // Similar to beatRatio, but gives the position of the time in the visualizer
  visualizerRatio(time: PerfTime): number {
    const beatRatio = this.beatRatio(time)
    if (beatRatio < 0.5) {
      return beatRatio + 0.5 // 0.5 to 1
    } else {
      return beatRatio - 0.5
    }
  }

  closestClick(): AudioTime {
    const now = this.currentTime().duration.s()
    const last = this.lastClick.duration.s()
    const next = this.nextClick.duration.s()
    if (Math.abs(now - last) < Math.abs(now - next)) {
      return this.lastClick
    } else {
      return this.nextClick
    }
  }

  private currentTime(): AudioTime {
    if (this.graph) {
      const ctx = this.graph.ctx
      return AudioTime.now(ctx)
    } else {
      return AudioTime.zero()
    }
  }

  // Returns the how far the time is between metronome beats
  // From 0 to 1. Assuming time is between lastClick and nextClick
  private beatRatio(time: PerfTime): number {
    if (this.graph) {
      const period = this.tempo.period()
      const nextClick = this.nextClick.toPerf(this.graph.ctx).duration
      const lastClick = nextClick.minus(period)

      const delta = time.duration.minus(lastClick)

      return delta.s() / period.s()
    } else {
      return 0
    }
  }

  private playMetronomeSound(gain: number, time: AudioTime) {
    if (!this.graph) return

    const { ctx, metronome, gainNode } = this.graph

    const source = ctx.createBufferSource()
    source.buffer = metronome
    source.connect(gainNode)
    gainNode.gain.setValueAtTime(gain, time.duration.s())
    source.start(time.duration.s())
    this.lastClick = this.nextClick
    this.nextClick = time

    console.log(`requestTime: ${time.duration} | now: ${AudioTime.now(this.graph!.ctx).duration}`)
  }
}
