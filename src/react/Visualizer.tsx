import styled from "@emotion/styled"
import engine from "../engine/engine"
import useAnimatedValue from "./hooks/useAnimatedValue"

function Cursor() {
  const cursorRatio = useAnimatedValue(() => {
    const audio = engine.audioEngine
    return audio.visualizerRatio(audio.currentTime())
  })

  return <CursorRoot style={{ left: `${cursorRatio * 100}%` }} />
}

const CursorRoot = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ee5;
  position: absolute;
`

export default function Visualizer() {
  return (
    <Backdrop>
      <Center />
      <Cursor />
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
