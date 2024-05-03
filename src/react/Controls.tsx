import Button from "./base/Button"
import engine from "../engine/engine"

export default function Controls() {
  return (
    <>
      <Button onClick={() => engine.start()}>Start</Button>
      <Button onClick={() => engine.stop()}>Stop</Button>
    </>
  )
}
