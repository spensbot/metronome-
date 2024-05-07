import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tempo } from '../engine/Clock'

export interface SettingsState {
  tempo: Tempo,
  metronomeGain: number,
  snareGain: number,
  kickGain: number
}

const initialState: SettingsState = {
  tempo: Tempo.bpm(60),
  metronomeGain: 0.5,
  snareGain: 1.0,
  kickGain: 1.0
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
    setSnareGain: (state, action: PayloadAction<number>) => {
      state.snareGain = action.payload
    },
    setKickGain: (state, action: PayloadAction<number>) => {
      state.kickGain = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTempo, setMetronomeGain, setSnareGain, setKickGain } = settingsSlice.actions

export default settingsSlice.reducer