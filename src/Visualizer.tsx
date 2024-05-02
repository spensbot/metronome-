import styled from "@emotion/styled"

export default function Visualizer() {
  return (
    <Backdrop>
      <Center />
    </Backdrop>
  )
}

const Backdrop = styled.div`
  width: auto;
  height: 10vh;
  background-color: #222;
  display: flex;
  justify-content: center;
`

const Center = styled.div`
  width: 1px;
  height: 100%;
  background-color: #eee;
`
