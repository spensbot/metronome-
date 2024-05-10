import styled from "@emotion/styled"
import { useMetronome } from "../redux/hooks"
import { Press_t } from "../redux/MetronomeState"
import { getWindowInfo } from "../utils/windowUtils"

function Press({ press }: { press: Press_t }) {
  // const ratio = engine.audioEngine.visualizerRatio(note.time)
  const state = useMetronome((state) => state)
  const window = getWindowInfo(state)
  console.log(
    `Start: ${window.start} | P ${window.period} | s ${press.time.duration}`
  )
  const ratio = (press.time.duration.s() - window.start) / window.length

  return <PressRoot style={{ left: `${ratio * 100}%` }} />
}

const PressRoot = styled.div`
  width: 2px;
  height: 100%;
  background-color: #55f;
  position: absolute;
`

export default function Visualizer() {
  // const notes = usePress((state) => state.focusedPresss)
  const playheadRatio = useMetronome((state) => state.playheadRatio)
  const presses = useMetronome((state) => state.layers[0].presses)

  return (
    <Backdrop>
      <Playhead style={{ left: `${playheadRatio * 100}%` }} />
      {presses.map((press) => (
        <Press press={press} />
      ))}
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
