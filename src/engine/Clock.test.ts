import { vi } from 'vitest'
import { Tempo, Duration, AudioTime, PerfTime } from './Clock'
import { getAudioContext } from './audioUtils'

class AudioContextMock {
  currentTime = 1
}

vi.stubGlobal('window', {
  performance: {
    now: () => 1005
  },
  AudioContext: AudioContextMock
})

const ctx = getAudioContext()

test('Duration.s()', () => {
  expect(Duration.s(1000).s()).toBe(1000)
})

test('Duration.ms()', () => {
  expect(Duration.ms(1000).ms()).toBe(1000)
})

test('Tempo.bpm()', () => {
  expect(Tempo.bpm(120).bpm()).toBe(120)
})

test('Tempo.period()', () => {
  expect(Tempo.bpm(120).period().s()).toBe(0.5)
})

test('PerfTime.now()', () => {
  expect(PerfTime.now().duration.ms()).toBeCloseTo(window.performance.now())
})

test('AudioTime.now()', () => {
  expect(AudioTime.now(ctx).duration.s()).toBe(ctx.currentTime)
})

test('AudioTime.toPerf()', () => {
  expect(AudioTime.now(ctx).toPerf(ctx).duration.ms()).toBeCloseTo(window.performance.now())
})