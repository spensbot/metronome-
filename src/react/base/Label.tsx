import styled from "@emotion/styled"
import { CSSProperties } from "react"

export interface LabelProps {
  style?: CSSProperties
  text?: string
}

export default function Label({ style, text }: LabelProps) {
  return text ? <Root style={style}>{text}</Root> : null
}

const Root = styled.p``
