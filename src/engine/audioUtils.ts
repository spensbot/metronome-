export function getAudioContext() {
  // TODO: Handle browsers with limited support
  const audioContextClass = window.AudioContext
  return new audioContextClass()
}

export async function loadBuffer(ctx: AudioContext, url: string): Promise<AudioBuffer> {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'
  const response = await fetch(url)

  return ctx.decodeAudioData(await response.arrayBuffer())
}