import styled from "@emotion/styled"
import Controls from "./Controls"
import Settings from "./Settings"

export default function Interface() {
  return (
    <Root>
      <Controls />
      <Settings />
    </Root>
  )
}

const Root = styled.div`
  margin: 1rem;
`
