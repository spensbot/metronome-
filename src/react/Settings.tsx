import Slider from "./base/Slider"
import { setTempo, setMetronomeGain } from "../redux/metronomeSlice"
import { useMetronome, useDispatch } from "../redux/hooks"
import styled from "@emotion/styled"
import { Tempo } from "../utils/timeUtils"

export default function Settings() {
  const tempo = useMetronome((state) => state.tempo)
  const gain = useMetronome((state) => state.metronomeGain)
  const bpm = tempo.bpm()
  const dispatch = useDispatch()

  return (
    <>
      <Slider
        min={30}
        max={200}
        label="BPM: "
        valueDisplay={`${Math.round(bpm)}`}
        value={Math.round(bpm)}
        onChange={(_e, value) => {
          dispatch(setTempo(Tempo.bpm(Math.round(value as number))))
        }}
      />
      <Gain>
        <Slider
          label="Metronome Gain: "
          min={0}
          max={1}
          step={0.01}
          value={gain}
          onChange={(_e, value) => {
            dispatch(setMetronomeGain(value as number))
          }}
        />
      </Gain>
    </>
  )
}

const Gain = styled.div``
