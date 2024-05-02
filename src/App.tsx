import { useEffect, useRef, useState } from "react"
import Engine from "./engine/engine"
import { getMidi } from "./engine/midi"
// import { Theme, Button } from "@radix-ui/themes"
import { Slider, Button } from "@mui/material"
import Visualizer from "./Visualizer"
import onNextGesture from "./engine/onNextGesture"

interface AppState {
  bpm: number
}

function initAppState(): AppState {
  return {
    bpm: 120,
  }
}

function App() {
  const [appState, setAppState] = useState(initAppState)
  const engine = useRef<Engine>(new Engine())

  useEffect(() => {
    onNextGesture(() => {
      engine.current.initialize()
    })
  }, [])

  return (
    <>
      <Visualizer />
      <Button
        variant="contained"
        onClick={() => engine.current.startMetronome(appState.bpm)}
      >
        Start
      </Button>
      <Button
        variant="contained"
        onClick={() => engine.current.stopMetronome()}
      >
        Stop
      </Button>
      <Button variant="contained" onClick={() => getMidi()}>
        Midi
      </Button>
      <Slider
        min={30}
        max={200}
        value={appState.bpm}
        onChange={(_e, value) => {
          setAppState({
            ...appState,
            bpm: value as number,
          })
        }}
      />
    </>
  )
}

export default App
