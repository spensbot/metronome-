import { useSelector } from "react-redux"
import { RootState } from "./store"
import { SettingsState } from "./settingsSlice"

export function useSettings<T>(cb: (settings: SettingsState) => T) {
  return useSelector((state: RootState) => cb(state.settings))
}

export { useDispatch } from "react-redux"