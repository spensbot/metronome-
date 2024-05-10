import { Button as _Button, ButtonProps as _ButtonProps } from "@mui/material"

export interface ButtonProps extends _ButtonProps {}

const Button: React.FC<ButtonProps> = (props) => {
  props = {
    variant: "contained",
    ...props,
  }

  return <_Button {...props} />
}

export default Button
