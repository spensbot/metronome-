import { vi } from 'vitest'
import { Tempo, Duration, AudioTime, PerfTime, ClockDelta } from './Clock'
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
  expect(Tempo.bpm(60).bpm()).toBe(60)
})

test('Tempo.period()', () => {
  expect(Tempo.bpm(60).period().s()).toBe(1)
})

test('ClockDelta', () => {
  const delta = new ClockDelta(ctx)
  const perf_ms = window.performance.now()
  const audio_ms = ctx.currentTime * 1000
  expect(delta.duration.ms()).toBeCloseTo(perf_ms - audio_ms)
})

test('PerfTime.now()', () => {
  expect(PerfTime.now().duration.ms()).toBeCloseTo(window.performance.now())
})

test('PerfTime.toAudio()', () => {
  const delta = new ClockDelta(ctx)
  expect(PerfTime.now().toAudio(delta).duration.s()).toBe(ctx.currentTime)
})

test('AudioTime.now()', () => {
  expect(AudioTime.now(ctx).duration.s()).toBe(ctx.currentTime)
})

test('AudioTime.toPerf()', () => {
  const delta = new ClockDelta(ctx)
  expect(AudioTime.now(ctx).toPerf(delta).duration.ms()).toBeCloseTo(window.performance.now())
})