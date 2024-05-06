import { PerfTime } from "./Clock"

export type MessageType = 'off' | 'on' | 'unknown'

const VELOCITY_MAX = 127

// Velocity from 0 to 1
function velocity(velocityInt: number) {
  return velocityInt / VELOCITY_MAX
}

export interface MidiMessage<Time = PerfTime> {
  time: Time,
  type: MessageType,
  note: number, // 0-127
  velocity: number // 0-127
  typeInt: number
}

const messageTypeMap: { [key: number]: MessageType } = {
  144: 'on',
  128: 'off'
}

export function parseMidiMessage(e: MIDIMessageEvent): MidiMessage<PerfTime> {
  const typeInt = e.data[0]
  const noteInt = e.data[1]
  const velocityInt = e.data[2]

  return {
    time: PerfTime.fromMidi(e),
    type: messageTypeMap[typeInt] ?? "unknown",
    note: noteInt,
    velocity: velocity(velocityInt),
    typeInt
  }
}
