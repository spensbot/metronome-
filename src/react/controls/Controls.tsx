import Button from "../base/Button"
import styled from "@emotion/styled"
import { useDispatch, useSteady } from "../../redux/hooks"
import { setPlayState } from "../../redux/metronomeSlice"

function StartStop() {
  const playState = useSteady((state) => state.playState)
  const dispatch = useDispatch()

  if (playState === "Playing") {
    return (
      <Button onClick={() => dispatch(setPlayState("Stopped"))}>Stop</Button>
    )
  }
  if (playState === "Stopped") {
    return (
      <Button onClick={() => dispatch(setPlayState("Playing"))}>Start</Button>
    )
  }
}

export default function Controls() {
  return (
    <Root>
      <StartStop />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
