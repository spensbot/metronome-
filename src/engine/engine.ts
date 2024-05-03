import AudioEngine from "./AudioEngine"
import MidiEngine from "./MidiEngine"
import onNextGesture from "./onNextGesture"

export class Engine {
  private audioEngine: AudioEngine = new AudioEngine()
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

onNextGesture(() => { engine.init() })

export default engine