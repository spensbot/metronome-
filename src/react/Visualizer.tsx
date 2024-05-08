import styled from "@emotion/styled"
import engine from "../engine/engine"
import useAnimatedValue from "./hooks/useAnimatedValue"
import { MidiMessage } from "../engine/midiUtils"
import { PerfTime } from "../engine/Clock"
import { useNote } from "../redux/hooks"

const CURSOR_WIDTH = 10

function Cursor() {
  const cursorRatio = useAnimatedValue(() => {
    const audio = engine.audioEngine
    return 0.5
  })

  return <CursorRoot style={{ left: `${cursorRatio * 100}%` }} />
}

const CursorRoot = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ee5;
  position: absolute;
`

function Note({ note }: { note: MidiMessage }) {
  // const ratio = engine.audioEngine.visualizerRatio(note.time)

  return <NoteRoot style={{ left: `${100}%` }} />
}

const NoteRoot = styled.div`
  width: 2px;
  height: 100%;
  background-color: #55f;
  position: absolute;
`

export default function Visualizer() {
  const notes = useNote((state) => state.focusedNotes)

  return (
    <Backdrop>
      <Center />
      <Cursor />
      {notes.map((note) => {
        return <Note note={note} key={note.time.duration.s()} />
      })}
    </Backdrop>
  )
}

const Backdrop = styled.div`
  width: auto;
  height: 10vh;
  background-color: #222;
  display: flex;
  justify-content: center;
  position: relative;
`

const Center = styled.div`
  width: 1px;
  height: 100%;
  background-color: #eee;
`
