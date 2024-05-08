import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tempo } from '../engine/Clock'

export interface SettingsState {
  tempo: Tempo,
  metronomeGain: number,
  visualizerBeats: number, // how many beats can be seen on the visualizer at once
}

const initialState: SettingsState = {
  tempo: Tempo.bpm(60),
  metronomeGain: 0.5,
  visualizerBeats: 8
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTempo: (state, action: PayloadAction<Tempo>) => {
      state.tempo = action.payload
    },
    setMetronomeGain: (state, action: PayloadAction<number>) => {
      state.metronomeGain = action.payload
    },
    setVisualizerBeats: (state, action: PayloadAction<number>) => {
      state.visualizerBeats = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTempo, setMetronomeGain, setVisualizerBeats } = settingsSlice.actions

export default settingsSlice.reducer