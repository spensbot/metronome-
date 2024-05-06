import { MidiMessage, parseMidiMessage } from './midiUtils'

type MidiCb = (message: MidiMessage) => void

function onMidi(access: MIDIAccess, cb: MidiCb) {
  access.inputs.forEach(input => {
    input.onmidimessage = e => {
      const message = parseMidiMessage(e as MIDIMessageEvent)
      cb(message)
    }
  })
}

export default class MidiEngine {
  midiAccess: MIDIAccess | null = null

  async init(onPress: MidiCb) {
    this.midiAccess = await navigator.requestMIDIAccess()

    onMidi(this.midiAccess, (message: MidiMessage) => {
      if (message.type === 'on') {
        onPress(message)
      }
    })
  }
}

// OUTPUT FOR CONTROLLING LEDS?
// Array.from(access.outputs.values()).forEach(output => {
//   for (let i=0; i<127; i++) {
//     output.send([0x90, 60, 127])
//   }
// })
