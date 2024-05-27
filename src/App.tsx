import Visualizer from "./react/visualizer/Visualizer"
import { Debugger } from "./react/Debugger"
import Interface from "./react/controls/Interface"
import "./engine/engine"

function App() {
  return (
    <>
      <Visualizer />
      <Interface />
      <Debugger />
    </>
  )
}

export default App
