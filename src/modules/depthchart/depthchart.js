import React from "react"
import { ChartCanvas, Chart } from "react-stockcharts"
import { TypeChooser } from "react-stockcharts/lib/helper"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { AreaSeries } from "react-stockcharts/lib/series"
import { HoverTooltip } from "react-stockcharts/lib/tooltip"
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates"
import { createVerticalLinearGradient, hexToRGBA, last } from "react-stockcharts/lib/utils"
import MouseCoordinateX from "react-stockcharts/lib/coordinates/MouseCoordinateX"
import MouseCoordinateY from "react-stockcharts/lib/coordinates/MouseCoordinateY"
import CrossHairCursor from "react-stockcharts/lib/coordinates/CrossHairCursor"
import { scaleLinear } from "d3-scale"
import { curveStep } from "d3-shape"
import PropTypes from "prop-types"

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

const DepthChart = ({ width, height }) => {
    const xAccessor = (d) => d.price

    const start = xAccessor(last(data))
    const end = xAccessor(data[0])

    const xExtents = [start, end]

    const margin = { left: 30, right: 0, top: 5, bottom: 30 }
    const gridWidth = width - margin.left - margin.right

    const showGrid = true
    const yGrid = showGrid
        ? {
              innerTickSize: -1 * gridWidth,
              tickStrokeDasharray: "Solid",
              tickStrokeOpacity: 0.2,
              tickStrokeWidth: 1,
          }
        : {}

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
                        <XAxis axisAt='bottom' orient='bottom' tickStroke={textColor} ticks={5} strokeWidth={1} stroke={lineColor} />
                        <YAxis
                            axisAt={"left"}
                            fontSize={10}
                            orient='left'
                            ticks={5}
                            yZoomWidth={0}
                            showDomain={false}
                            tickStroke={textColor}
                            stroke={lineColor}
                            {...yGrid}
                        />
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
                        <CrossHairCursor strokeDasharray='ShortDash' stroke={"#2196F3"} opacity={1} />
                        <MouseCoordinateX
                            at='bottom'
                            orient='bottom'
                            displayFormat={(d) => parseFloat(d).toLocaleString("id")}
                            fill={"#000000"}
                            fontSize={10}
                            stroke={"#000000"}
                            textFill={"#FFFFFF"}
                        />
                        <MouseCoordinateY
                            at='left'
                            orient='right'
                            displayFormat={(d) => parseInt(d).toLocaleString("id")}
                            fill={"#000000"}
                            dx={10}
                            fontSize={10}
                            stroke={"#000000"}
                            textFill={"#FFFFFF"}
                        />
                    </Chart>
                </ChartCanvas>
            )}
        </TypeChooser>
    )
}

DepthChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default DepthChart
