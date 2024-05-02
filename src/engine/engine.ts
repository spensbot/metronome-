import metronomePath from '/metronome.mp3'

function getAudioContext() {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext
  return new AudioContext()
}

function bpmToIntervalMs(bpm: number) {
  return 60000 / bpm
}

function playSoundFromStart(audio: HTMLAudioElement, context: AudioContext) {
  console.log(context.currentTime)
  audio.currentTime = 0
  audio.play()
}

interface Data {
  audioContext: AudioContext
  metronomeAudio: HTMLAudioElement
  metronomeSource: MediaElementAudioSourceNode
  gainNode: GainNode
}

function createData(): Data {
  let audioContext = getAudioContext()
  let gainNode = audioContext.createGain()
  let metronomeAudio = new Audio(metronomePath)
  let metronomeSource = audioContext.createMediaElementSource(metronomeAudio)
  metronomeSource.connect(gainNode).connect(audioContext.destination)

  return {
    audioContext,
    gainNode,
    metronomeAudio,
    metronomeSource
  }
}

export default class Engine {
  intervalId: number | null = null
  data: Data | null = null

  constructor() { }

  initialize() {
    if (this.data === null) {
      this.data = createData()
    }
  }

  startMetronome(tempo: number) {
    if (this.data === null) {
      this.data = createData()
    }

    this.data.audioContext.resume()
    this.stopMetronome()

    const data = this.data

    const playSound = () => {
      console.log('play sound')
      playSoundFromStart(data.metronomeAudio, data.audioContext)
    }

    playSound()

    this.intervalId = window.setInterval(playSound, bpmToIntervalMs(tempo))
  }

  stopMetronome() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId)
    }
  }
}
