import React from "react"
import { ChartCanvas, Chart } from "react-stockcharts"
import { TypeChooser } from "react-stockcharts/lib/helper"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { AreaSeries } from "react-stockcharts/lib/series"
import { HoverTooltip } from "react-stockcharts/lib/tooltip"
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates"
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils"
import { last } from "react-stockcharts/lib/utils"
import { scaleLinear } from "d3-scale"
import { curveStep } from "d3-shape"

import data from "./data.json"
import { tooltipContent } from ".//helpers/tooltip"

const buyColor = "#008069"
const sellColor = "#d45858"
const bgColor = "#FFFFFF"
const textColor = "#000000"
const lineColor = "#555555"

const buyGradient = createVerticalLinearGradient([
    { stop: 0, color: hexToRGBA(bgColor, 1) },
    { stop: 1, color: hexToRGBA(buyColor, 1) },
])

const sellGradient = createVerticalLinearGradient([
    { stop: 1, color: hexToRGBA(bgColor, 1) },
    { stop: 0, color: hexToRGBA(sellColor, 1) },
])

const DepthChart = () => {
    const width = 1280
    const height = 360

    const xAccessor = (d) => d.price

    const start = xAccessor(last(data))
    const end = xAccessor(data[0])

    const xExtents = [start, end]

    const margin = { left: 5, right: 0, top: 5, bottom: 30 }

    return (
        <TypeChooser>
            {(type) => (
                <ChartCanvas
                    ratio={1}
                    width={width}
                    height={height}
                    margin={margin}
                    seriesName='BTC'
                    data={data}
                    type={type}
                    xAccessor={xAccessor}
                    panEvent={false}
                    xExtents={xExtents}
                    zoomEvent={false}
                    xScale={scaleLinear()}
                    displayXAccessor={(d) => d.price}
                >
                    <Chart id={1} yExtents={(d) => [0, d.totalVolume + d.totalVolume / 4]}>
                        <AreaSeries
                            yAccessor={(d) => (d.type == "buy" ? d.totalVolume : undefined)}
                            fill={`url(${buyColor})`}
                            canvasGradient={buyGradient}
                            strokeWidth={2}
                            stroke={buyColor}
                            interpolation={curveStep}
                        />
                        <AreaSeries
                            yAccessor={(d) => (d.type == "sell" ? d.totalVolume : undefined)}
                            fill={`url(${sellColor})`}
                            canvasGradient={sellGradient}
                            strokeWidth={2}
                            stroke={sellColor}
                            interpolation={curveStep}
                        />
                        <HoverTooltip
                            tooltipContent={tooltipContent()}
                            bgFill={"transparent"}
                            stroke={"#2196F3"}
                            fill='#ffffff'
                            bgOpacity={1}
                            fontFill='#000000'
                            opacity={1}
                            fontFamily={"inherit"}
                        />
                        <CurrentCoordinate yAccessor={(d) => d.totalVolume} fill={"#2196F3"} r={5} onHover />
                        <XAxis axisAt='bottom' orient='bottom' tickStroke={textColor} ticks={5} strokeWidth={1} stroke={lineColor} />
                        <YAxis
                            axisAt={"left"}
                            fontSize={10}
                            orient='right'
                            ticks={5}
                            yZoomWidth={0}
                            showDomain={false}
                            tickStroke={textColor}
                            stroke={lineColor}
                        />
                    </Chart>
                </ChartCanvas>
            )}
        </TypeChooser>
    )
}

export default DepthChart
