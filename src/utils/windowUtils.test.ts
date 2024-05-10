import { getWindowInfo, isTimeInWindow } from './windowUtils'
import { Duration, PerfTime, Tempo } from './timeUtils'

test('getWindowInfo', () => {
  const wi = getWindowInfo({
    time: new PerfTime(Duration.s(2)),
    tempo: Tempo.bpm(120),
    metronomeGain: 1,
    visualizerBeats: 8,
    playheadRatio: 0.25,
    layers: []
  })

  expect(wi.now).toBe(2)
  expect(wi.period).toBe(0.5)
  expect(wi.beatsBeforeNow).toBe(2)
  expect(wi.beatsAfterNow).toBe(6)
  expect(wi.length).toBe(4)
  expect(wi.start).toBe(1)
  expect(wi.end).toBe(5)
})

test('isTimeInWindow', () => {
  const ms = {
    time: new PerfTime(Duration.s(2)),
    tempo: Tempo.bpm(120),
    metronomeGain: 1,
    visualizerBeats: 8,
    playheadRatio: 0.25,
    layers: []
  }

  const pt = (s: number) => new PerfTime(Duration.s(s))

  // Should be from 1 to 5
  expect(isTimeInWindow(ms, pt(1.01))).toBe(true)
  expect(isTimeInWindow(ms, pt(4.99))).toBe(true)
  expect(isTimeInWindow(ms, pt(0.9))).toBe(false)
  expect(isTimeInWindow(ms, pt(5.1))).toBe(false)
  expect(isTimeInWindow(ms, pt(-10))).toBe(false)
})