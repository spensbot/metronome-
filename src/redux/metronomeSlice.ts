import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PerfTime, Tempo } from '../utils/timeUtils'
import { isTimeInWindow } from '../utils/windowUtils'
import { Layer_t, MetronomeState, Press_t, isInputEqual, initialState, initLayer } from './MetronomeState'
import { deleteElement } from '../utils/listUtils'

function removePressesOutsideWindow(state: MetronomeState) {
  for (const layer of state.layers) {
    layer.presses = layer.presses.filter(
      press => isTimeInWindow(state, press.time)
    )
  }
}

function doesLayerAcceptPress(layer: Layer_t, press: Press_t): boolean {
  if (layer.inputs.length === 0) return true
  for (const input of layer.inputs) {
    if (isInputEqual(input, press.input)) return true
  }
  return false
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<PerfTime>) => {
      state.time = action.payload
    },
    setTempo: (state, action: PayloadAction<Tempo>) => {
      state.tempo = action.payload
    },
    setMetronomeGain: (state, action: PayloadAction<number>) => {
      state.metronomeGain = action.payload
    },
    addLayer: (state) => {
      state.layers.push(initLayer())
    },
    deleteLayer: (state, action: PayloadAction<number>) => {
      deleteElement(state.layers, action.payload)
    },
    addPress: (state, action: PayloadAction<Press_t>) => {
      removePressesOutsideWindow(state as MetronomeState)

      const press = action.payload
      for (const layer of state.layers) {
        if (doesLayerAcceptPress(layer as Layer_t, press)) {
          layer.presses.push(press)
        }
      }
    },
    setVisualizerBeats: (state, action: PayloadAction<number>) => {
      state.visualizerBeats = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setTime,
  setTempo,
  setMetronomeGain,
  addLayer,
  deleteLayer,
  addPress,
  setVisualizerBeats
} = noteSlice.actions

export default noteSlice.reducer