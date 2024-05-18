import styled from "@emotion/styled"
import { useMetronome } from "../redux/hooks"
import { visualizerRange } from "../utils/visualizerUtils"

export function Time(s: number) {
  return <P>{s.toFixed(2)}</P>
}

export function Section({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <SectionRoot>
      <P>{title}</P>
      {children}
    </SectionRoot>
  )
}

const SectionRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: auto;
`

export function Debugger() {
  const state = useMetronome((state) => state)

  const range = visualizerRange(state)

  return (
    <Root>
      <Section title="VisualizerRange">
        {Time(range.start)}
        {Time(range.end)}
      </Section>
      <Section title="Presses">
        {state.steady.layers[0].presses.map((press) =>
          Time(press.time.duration.s())
        )}
      </Section>
    </Root>
  )
}

const Root = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 0.9rem;
  background-color: #222;
  color: #eee;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
  margin: 1rem;
`

const P = styled.p`
  margin: 0;
`
