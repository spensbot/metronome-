import { MidiInput } from '../utils/midiUtils'
import { KeyInput, KeyPress } from '../engine/KeyboardEngine'
import { PerfTime, Tempo } from '../utils/timeUtils'
import { MidiPress } from '../engine/MidiEngine'

export type Input_t = MidiInput | KeyInput

export type Press_t = MidiPress | KeyPress

export interface Layer_t {
  fractions: number[] // Fractions of 
  inputs: Input_t[] // Empty means this layer accepts all inputs
  presses: Press_t[]
}

export interface MetronomeState {
  time: PerfTime,
  tempo: Tempo,
  metronomeGain: number,
  visualizerBeats: number // how many beats can be seen on the visualizer at once
  playheadRatio: number
  layers: Layer_t[]
}

export function initLayer(): Layer_t {
  return {
    fractions: [1.0],
    inputs: [],
    presses: []
  }
}

export const initialState: MetronomeState = {
  time: PerfTime.now(),
  tempo: Tempo.bpm(60),
  metronomeGain: 0.5,
  visualizerBeats: 8,
  playheadRatio: 0.33,
  layers: [initLayer()]
}

export function isInputEqual(a: Input_t, b: Input_t) {
  if (a.type === 'KeyInput' && b.type === 'KeyInput') {
    return a.key === b.key
  }
  if (a.type === 'MidiInput' && b.type === 'MidiInput') {
    return a.channel === b.channel && a.note === b.note
  }
}
