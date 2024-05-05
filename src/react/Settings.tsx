import Slider from "./base/Slider"
import { setTempo, setMetronomeGain } from "../redux/settingsSlice"
import { useSettings, useDispatch } from "../redux/hooks"
import styled from "@emotion/styled"
import { Tempo } from "../engine/Clock"

export default function Settings() {
  const { tempo, metronomeGain } = useSettings((settings) => settings)
  const bpm = tempo.bpm()
  const dispatch = useDispatch()

  return (
    <>
      <Slider
        min={30}
        max={200}
        label="BPM: "
        valueDisplay={`${bpm}`}
        value={bpm}
        onChange={(_e, value) => {
          dispatch(setTempo(Tempo.bpm(value as number)))
        }}
      />
      <Gain>
        <Slider
          label="Metronome Gain: "
          min={0}
          max={1}
          step={0.01}
          value={metronomeGain}
          onChange={(_e, value) => {
            dispatch(setMetronomeGain(value as number))
          }}
        />
      </Gain>
    </>
  )
}

const Gain = styled.div``
