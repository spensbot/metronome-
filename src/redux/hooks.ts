import { useSelector } from "react-redux"
import { RootState } from "./store"
import { SettingsState } from "./settingsSlice"
import { AnimationState } from "./animationStore"

export function useSettings<T>(cb: (settings: SettingsState) => T) {
  return useSelector((state: RootState) => cb(state.settings))
}

export function useAnimation<T>(cb: (state: AnimationState) => T) {
  return useSelector((state: AnimationState) => cb(state))
}

export { useDispatch } from "react-redux"