import React from "react"
import { render } from "react-dom"

import DepthChart from "./modules/depthchart"

const App = () => <DepthChart />

const appEl = document.getElementById("app")

render(<App />, appEl)
