import styled from "@emotion/styled"
import { useMetronome, useSteady } from "../../redux/hooks"
import { Press_t } from "../../redux/MetronomeState"
import {
  getBeatTimesInWindow,
  visualizerRange,
} from "../../utils/visualizerUtils"
import { unlerp } from "../../utils/math"

function Press({ press }: { press: Press_t }) {
  // const ratio = engine.audioEngine.visualizerRatio(note.time)
  const state = useMetronome((state) => state)
  const range = visualizerRange(state)

  const ratio = unlerp(range, press.time.duration.s())

  return <PressRoot style={{ left: `${ratio * 100}%` }} />
}

const PressRoot = styled.div`
  width: 1px;
  height: 100%;
  background-color: #55f;
  position: absolute;
`

function Targets() {
  const state = useMetronome((state) => state)
  const beats = getBeatTimesInWindow(state)
  const range = visualizerRange(state)

  return <></>
}

const Target = styled.div`
  width: 1px;
  height: 100%;
  background-color: #fff5;
  position: absolute;
`

export default function Visualizer() {
  const playheadRatio = useSteady((state) => state.playheadRatio)
  const presses = useSteady((state) => state.layers[0].presses)

  return (
    <Backdrop>
      <Playhead style={{ left: `${playheadRatio * 100}%` }} />
      {presses.map((press) => (
        <Press press={press} />
      ))}
      <Targets />
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

const Playhead = styled.div`
  width: 1px;
  height: 100%;
  background-color: #fff;
  position: absolute;
`
