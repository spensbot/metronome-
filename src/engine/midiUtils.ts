export type MessageType = 'off' | 'on' | 'unknown'

export interface MidiMessage {
  timeStamp: number,
  type: MessageType,
  note: number, // 0-127
  velocity: number // 0-127
}

const messageTypeMap: { [key: number]: MessageType } = {
  144: 'on',
  128: 'off'
}

export function parseMidiMessage(e: MIDIMessageEvent): MidiMessage {
  return {
    timeStamp: e.timeStamp,
    type: messageTypeMap[e.data[0]] ?? "unknown",
    note: e.data[1],
    velocity: e.data[2]
  }
}
