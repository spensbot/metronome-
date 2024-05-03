import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  bpm: number,
  metronomeGain: number,
  snareGain: number,
  kickGain: number
}

const initialState: SettingsState = {
  bpm: 120,
  metronomeGain: 1.0,
  snareGain: 1.0,
  kickGain: 1.0
}

export const settingsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload
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
export const { setBpm, setMetronomeGain, setSnareGain, setKickGain } = settingsSlice.actions

export default settingsSlice.reducer