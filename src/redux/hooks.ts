import { useSelector } from "react-redux"
import { RootState } from "./store"
import { MetronomeState } from "./MetronomeState"

export function useMetronome<T>(cb: (state: MetronomeState) => T) {
  return useSelector((state: RootState) => cb(state.metronome))
}

export { useDispatch } from "react-redux"