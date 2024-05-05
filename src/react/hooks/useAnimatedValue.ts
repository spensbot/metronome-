import { useEffect, useRef, useState } from "react"

export default function useAnimatedValue<T>(getter: () => T): T {
  const [value, setValue] = useState(getter())
  const requestRef = useRef<number>()

  useEffect(() => {
    function onFrame() {
      const newValue = getter()
      if (newValue !== value) setValue(newValue)

      requestRef.current = requestAnimationFrame(onFrame)
    }

    requestRef.current = requestAnimationFrame(onFrame)

    return () => cancelAnimationFrame(requestRef.current!)
  }, [getter])

  return value
}