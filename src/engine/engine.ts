import AudioEngine from "./AudioEngine"
import MidiEngine from "./MidiEngine"
import onNextGesture from "./onNextGesture"
import { animationStore, setAnimationState } from "../redux/animationStore"

export class Engine {
  audioEngine: AudioEngine = new AudioEngine()
  private midiEngine: MidiEngine = new MidiEngine()

  init() {
    this.audioEngine.init()
    this.midiEngine.init()
  }

  start() {
    this.audioEngine.start()
  }

  stop() {
    this.audioEngine.stop()
  }
}

const engine = new Engine()
const audio = engine.audioEngine

onNextGesture(() => { engine.init() })

function animate() {
  animationStore.dispatch(setAnimationState({
    cursorRatio: audio.visualizerRatio(audio.currentTime())
  }))
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

export default engine