import { Slider as _Slider, SliderProps as _SliderProps } from "@mui/material"
import styled from "@emotion/styled"
import Label from "./Label"

export interface SliderProps extends _SliderProps {
  label?: string
  valueDisplay?: string
}

const Slider: React.FC<SliderProps> = (props) => {
  const sliderProps = {
    ...props,
  }
  delete sliderProps.valueDisplay

  return (
    <Root>
      <Label text={props.label} style={{ marginRight: "1rem" }} />
      <Label text={props.valueDisplay} style={{ marginRight: "1rem" }} />
      <_Slider {...sliderProps} />
    </Root>
  )
}

export default Slider

const Root = styled.div`
  display: flex;
  align-items: center;
`
