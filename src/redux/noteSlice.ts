import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MidiMessage } from '../engine/midiUtils'

export interface NoteState {
  focusedNotes: MidiMessage[]
}

const initialState: NoteState = {
  focusedNotes: []
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<MidiMessage>) => {
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