import React from "react"

import DepthChart from "./depthchart"
import data from "./data.json"

const DepthChartModule = () => {
    return <DepthChart data={data} width={1280} height={360} />
}

export default DepthChartModule
