import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./main.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#77f",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
