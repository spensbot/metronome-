import AudioEngine from "./AudioEngine"
import MidiEngine, { MidiPress } from "./MidiEngine"
import onNextGesture from "./onNextGesture"
import { store } from '../redux/store'
import { addPress, setTime } from "../redux/metronomeSlice"
import { KeyPress, KeyboardEngine } from "./KeyboardEngine"
import { PerfTime } from "../utils/timeUtils"

export class Engine {
  audioEngine: AudioEngine = new AudioEngine()
  private midiEngine: MidiEngine = new MidiEngine()
  private keyboardEngine: KeyboardEngine = new KeyboardEngine()
  lastCursorRatio: number = 0
  animationHandle: number = 0

  init() {
    this.audioEngine.init()
    this.midiEngine.init((press: MidiPress) => {
      store.dispatch(addPress(press))
    })
    this.keyboardEngine.init((press: KeyPress) => {
      store.dispatch(addPress(press))
    })

    const animate = () => {
      store.dispatch(setTime(PerfTime.now()))
      this.animationHandle = requestAnimationFrame(animate)
    }

    this.animationHandle = requestAnimationFrame(animate)
  }

  cleanup() {
    cancelAnimationFrame(this.animationHandle)
  }
}

const engine = new Engine()

onNextGesture(() => { engine.init() })

export default engine