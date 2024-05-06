import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AudioTime } from '../engine/Clock'
import { MidiMessage } from '../engine/midiUtils'

export interface NoteState {
  focusedNotes: MidiMessage<AudioTime>[]
}

const initialState: NoteState = {
  focusedNotes: []
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<MidiMessage<AudioTime>>) => {
      state.focusedNotes.push(action.payload)
    },
    clearNotes: (state) => {
      state.focusedNotes = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote, clearNotes } = noteSlice.actions

export default noteSlice.reducer