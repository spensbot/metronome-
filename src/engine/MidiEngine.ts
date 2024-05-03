import { MidiMessage, parseMidiMessage } from './midiUtils'

function onMidi(access: MIDIAccess, cb: (message: MidiMessage) => void) {
  console.log('setting midi')
  access.inputs.forEach(input => {
    input.onmidimessage = e => {
      let message = parseMidiMessage(e as MIDIMessageEvent)
      cb(message)
    }
  })
}

export default class MidiEngine {
  midiAccess: MIDIAccess | null = null

  async init() {
    this.midiAccess = await navigator.requestMIDIAccess()

    onMidi(this.midiAccess, message => {
      if (message.type === 'on') {
        const diff = performance.now() - message.timeStamp
        console.log(`${message.note} | ${message.velocity} | ${diff}`)
      }
    })
  }
}

// OUTPUT FOR CONTROLLING LEDS?
// Array.from(access.outputs.values()).forEach(output => {
//   console.log(output)
//   for (let i=0; i<127; i++) {
//     output.send([0x90, 60, 127])
//   }
// })
