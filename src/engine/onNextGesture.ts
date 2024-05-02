export default function onNextGesture(cb: () => void) {
  function wrappedCb() {
    cb()
    document.removeEventListener('click', wrappedCb)
  }

  document.addEventListener('click', wrappedCb)
}