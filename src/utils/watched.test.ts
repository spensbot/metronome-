import Watched from "./watched"

test('Watched int', () => {
  const w = new Watched()
  expect(w.getIfUpdated(2)).toBe(2)
  expect(w.getIfUpdated(2)).toBe(null)
})