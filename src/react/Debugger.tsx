import styled from "@emotion/styled"
import { useMetronome } from "../redux/hooks"
import { getWindowInfo } from "../utils/windowUtils"

export function Time(s: number) {
  return <P>{s.toFixed(2)}</P>
}

export function Debugger() {
  const state = useMetronome((state) => state)

  const window = getWindowInfo(state)

  const press = state.layers[0].presses[-1]?.time?.duration?.s() ?? 0

  return (
    <div>
      <Row>
        {Time(window.start)}
        {Time(window.now)}
        {Time(window.end)}
        {Time(window.length)}
      </Row>
      <Row>
        {state.layers[0].presses.map((press) => Time(press.time.duration.s()))}
      </Row>
      {Time((press - window.start) / window.length)}
    </div>
  )
}

const Row = styled.div`
  display: flex;
  align-items: center;
`

const P = styled.p`
  margin: 0.5rem;
`
