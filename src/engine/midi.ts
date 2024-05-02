type MessageType = 'off' | 'on' | 'unknown'

interface MidiMessage {
  timeStamp: number,
  type: MessageType,
  note: number, // 0-127
  velocity: number // 0-127
}

const messageTypeMap: { [key: number]: MessageType } = {
  144: 'on',
  128: 'off'
}

function parseMidiMessage(e: MIDIMessageEvent): MidiMessage {
  return {
    timeStamp: e.timeStamp,
    type: messageTypeMap[e.data[0]] ?? "unknown",
    note: e.data[1],
    velocity: e.data[2]
  }
}

export async function getMidi() {
  const access = await navigator.requestMIDIAccess()

  access.inputs.forEach(input => {
    console.log(input)
    input.onmidimessage = e => {
      let message = parseMidiMessage(e as MIDIMessageEvent)
      if (message.type === 'on') {
        const diff = Math.abs(message.timeStamp - performance.now())
        console.log(`${message.timeStamp} | ${diff} | ${message.note} | ${message.velocity}`)
        // console.log(`${message.timeStamp} | ${performance.now()} | `)
      }
    }
  })

  // OUTPUT FOR CONTROLLING LEDS?
  // Array.from(access.outputs.values()).forEach(output => {
  //   console.log(output)
  //   for (let i=0; i<127; i++) {
  //     output.send([0x90, 60, 127])
  //   }
  // })
}

