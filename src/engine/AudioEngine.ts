import { getAudioContext, loadBuffer } from './audioUtils'
import metronomePath from '/metronome.mp3'
import { store } from '../redux/store'
import Duration, { bpmInterval } from './Duration'

interface GraphData {
  ctx: AudioContext
  metronome: AudioBuffer
  gainNode: GainNode
}

async function createGraph(): Promise<GraphData> {
  console.log(`createGraph()`)
  let ctx = getAudioContext()
  let gainNode = ctx.createGain()
  let metronome = await loadBuffer(ctx, metronomePath)
  gainNode.connect(ctx.destination)

  return {
    ctx,
    gainNode,
    metronome
  }
}

export default class AudioEngine {
  lastClick: Duration = Duration.s(0)
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

    const prepNextClick = (time: Duration) => {
      const { bpm, metronomeGain } = store.getState().settings

      this.playMetronomeSound(metronomeGain, time)

      const interval = bpmInterval(bpm)

      const nextClickTime = time.plus(interval)

      this.timeoutId = window.setTimeout(() => prepNextClick(nextClickTime), interval.ms())
    }

    prepNextClick(this.currentTime())
  }

  stop() {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId)
    }
  }

  private currentTime(): Duration {
    return Duration.s(this.graph?.ctx.currentTime ?? 0)
  }

  private playMetronomeSound(gain: number, time: Duration) {
    if (!this.graph) return

    const { ctx, metronome, gainNode } = this.graph

    const source = ctx.createBufferSource()
    source.buffer = metronome
    source.connect(gainNode)
    gainNode.gain.setValueAtTime(gain, 0)
    source.start(time.s())
    this.lastClick = time
  }
}
