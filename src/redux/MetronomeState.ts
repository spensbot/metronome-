import { MidiInput } from '../utils/midiUtils'
import { KeyInput, KeyPress } from '../engine/KeyboardEngine'
import { PerfTime, Tempo } from '../utils/timeUtils'
import { MidiPress } from '../engine/MidiEngine'

export type Input_t = MidiInput | KeyInput

export type Press_t = MidiPress | KeyPress

export type PlayState = 'Playing' | 'Stopped'

export interface SessionState {

}

export interface Layer_t {
  fractions: number[] // Fractions of a beat to hit
  inputs: Input_t[] // Empty means this layer accepts all inputs
  presses: Press_t[]
}

export interface AnimatedState {
  time: PerfTime
}

export interface SteadyState {
  tempo: Tempo
  scheduledBeat: PerfTime
  metronomeGain: number
  visualizerLength: number // how many seconds can be seen on the visualizer at once
  playheadRatio: number
  layers: Layer_t[]
  bars: number
  playState: PlayState
}

export interface MetronomeState {
  animated: AnimatedState
  steady: SteadyState
}

export function initLayer(): Layer_t {
  return {
    fractions: [1.0],
    inputs: [],
    presses: []
  }
}

export const initialState: MetronomeState = {
  animated: {
    time: PerfTime.now(),
  },
  steady: {
    tempo: Tempo.bpm(60),
    scheduledBeat: PerfTime.now(),
    metronomeGain: 0.5,
    visualizerLength: 8, // Seconds
    playheadRatio: 0.33,
    layers: [initLayer()],
    bars: 8,
    playState: 'Stopped'
  }
}

export function isInputEqual(a: Input_t, b: Input_t) {
  if (a.type === 'KeyInput' && b.type === 'KeyInput') {
    return a.key === b.key
  }
  if (a.type === 'MidiInput' && b.type === 'MidiInput') {
    return a.channel === b.channel && a.note === b.note
  }
}
