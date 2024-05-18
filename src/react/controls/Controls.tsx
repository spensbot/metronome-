import Button from "../base/Button"
import engine from "../../engine/engine"
import styled from "@emotion/styled"

export default function Controls() {
  return (
    <Root>
      <Button onClick={() => engine.start()}>Start</Button>
      <Button onClick={() => engine.stop()}>Stop</Button>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
