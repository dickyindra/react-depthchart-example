import React from "react"
import { render } from "react-dom"

const App = () => <h1>Hello, World!</h1>

const rootEl = document.getElementById("root")

render(rootEl, <App />)
