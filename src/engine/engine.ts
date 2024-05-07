import AudioEngine from "./AudioEngine"
import MidiEngine from "./MidiEngine"
import onNextGesture from "./onNextGesture"
import { animationStore, setAnimationState } from "../redux/animationStore"
import { store } from '../redux/store'
import { MidiMessage } from "./midiUtils"
import { addNote, clearNotes } from "../redux/noteSlice"
import { AudioTime, PerfTime } from "./Clock"

export class Engine {
  audioEngine: AudioEngine = new AudioEngine()
  private midiEngine: MidiEngine = new MidiEngine()
  lastCursorRatio: number = 0
  animationHandle: number = 0

  init() {
    this.audioEngine.init()
    this.midiEngine.init((message: MidiMessage) => {
      if (this.audioEngine.graph !== null) {
        const audio = this.audioEngine
        const ctx = audio.graph!.ctx

        // const perfNow = PerfTime.now().duration.debug()
        // const messagePerf = message.time.duration.debug()
        // const messageAudio = this.audioEngine.audioTime(message.time).duration.debug()
        // const audioNow = this.audioEngine.currentTime().duration.debug()
        // const delta = this.audioEngine.clockDelta().debug()
        // const deltaNow = new ClockDelta(this.audioEngine.graph?.ctx).duration.debug()
        // console.log(`Perf: ${perfNow} | Audio: ${audioNow} | Delta: ${delta}`)
        // console.log(`Message Perf: ${messagePerf} | Audio: ${messageAudio} | DeltaNow: ${deltaNow}`)
        // console.log(`${message.time}`)
        // const nowPerf = window.performance.now()
        // const outPerf = ctx.getOutputTimestamp().performanceTime
        // const latency = ctx.outputLatency
        // console.log(`nowPerf ${nowPerf} latency: ${latency} outPerf ${outPerf}`)

        const midiTime = message.time
        const closestAudio = audio.closestClick().toPerf(ctx)
        const delta = midiTime.duration.minus(closestAudio.duration)
        console.log(`${delta}`)
      }

      store.dispatch(addNote(message))
    })

    const animate = () => {
      const audio = this.audioEngine
      const cursorRatio = audio.visualizerRatio(PerfTime.now())
      if (cursorRatio < 0.5 && this.lastCursorRatio > 0.5) {
        // Focus Shift
        store.dispatch(clearNotes())
      }
      this.lastCursorRatio = cursorRatio

      // animationStore.dispatch(setAnimationState({
      //   cursorRatio
      // }))

      // this.animationHandle = requestAnimationFrame(animate)
    }

    this.animationHandle = requestAnimationFrame(animate)
  }

  cleanup() {
    cancelAnimationFrame(this.animationHandle)
  }

  start() {
    this.audioEngine.start()
  }

  stop() {
    this.audioEngine.stop()
  }
}

const engine = new Engine()

onNextGesture(() => { engine.init() })

export default engine