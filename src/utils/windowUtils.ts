import { MetronomeState } from "../redux/MetronomeState"
import { PerfTime } from "./timeUtils"

// Seconds
interface WindowInfo {
  now: number,
  period: number,
  beatsBeforeNow: number,
  beatsAfterNow: number,
  start: number,
  end: number,
  length: number
}

export function getWindowInfo(state: MetronomeState): WindowInfo {
  const now = state.time.duration.s()
  const period = state.tempo.period().s()
  const beatsBeforeNow = state.visualizerBeats * state.playheadRatio
  const beatsAfterNow = state.visualizerBeats - beatsBeforeNow
  const length = state.visualizerBeats * period
  const start = now - beatsBeforeNow * period
  const end = start + length

  return {
    now, period, beatsBeforeNow, beatsAfterNow, start, end, length
  }
}

export function isTimeInWindow(state: MetronomeState, time: PerfTime) {
  // All calculations done in seconds
  const window = getWindowInfo(state)
  const pressTime = time.duration.s()
  return pressTime > window.start && pressTime < window.end
}
