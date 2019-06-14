// Same margin widths for between the bars, and surrounding the first and last bar.
// Same margin above and below the largest bar.
const MARGIN = {
  X: 10,
  Y: 10
}

const INNER_MARGIN = MARGIN.X / 2

exports.contentDimensionSize = ({ boxDimensionSize, dimension }) => {
  const margin = MARGIN[dimension]
  return boxDimensionSize - 2 * margin
}

// Bar Sizes
// =========

exports.barWidth = ({ data, boxWidth }) => {
  const contentWidth = exports.contentDimensionSize({
    boxDimensionSize: boxWidth,
    dimension: "X"
  })

  const totalInnerMarginSize = (data.length - 1) * INNER_MARGIN
  return (contentWidth - totalInnerMarginSize) / data.length
}

exports.yMaxValue = data => {
  const values = data.map(dataPoint => dataPoint.y)
  return Math.max(...values)
}

exports.barHeight = ({ yValue, data, boxHeight }) => {
  const maxHeight = exports.contentDimensionSize({
    boxDimensionSize: boxHeight,
    dimension: "Y"
  })

  if (yValue === 0) {
    return 0
  }

  const portionOfMax = yValue / exports.yMaxValue(data)
  return portionOfMax * maxHeight
}

// Positions
// =========

exports.positionX = ({ index, boxWidth, data }) => {
  // number of preceeding bars + number of preceeding gaps
  const accumBars = index
  const barWidthResult = exports.barWidth({ data, boxWidth })
  const accumBarsWidth = accumBars * barWidthResult

  const accumGaps = accumBars == 1 ? 0 : accumBars - 1
  const accumGapsWidth = accumGaps * INNER_MARGIN

  return accumBarsWidth + accumGapsWidth
}

exports.positionY = ({ boxHeight, yValue, data }) => {
  const contentHeight = exports.contentDimensionSize({
    boxDimensionSize: boxHeight,
    dimension: "Y"
  })

  const barHeightResult = exports.barHeight({ yValue, data, boxHeight })
  return contentHeight - barHeightResult + MARGIN.Y
}

// Root function:
// This should be the only exportable function
// =============

exports.generateDataPointStyles = model => {
  const {
    dataPoints: { collection: data },
    container: {
      style: { width: widthString, height: heightString }
    }
  } = model

  const boxWidth = parseFloat(widthString)
  const boxHeight = parseFloat(heightString)

  const collectionStyled = data.map((dataPoint, index) => {
    const yValue = dataPoint.y

    return {
      ...dataPoint,
      style: {
        left: exports.positionX({ index, boxWidth, data }),
        top: exports.positionY({ boxHeight, data, yValue }),
        height: exports.barHeight({ yValue, data, boxHeight }),
        width: exports.barWidth({ data, boxWidth })
      }
    }
  })

  return {
    ...model,
    dataPoints: {
      ...model.dataPoints,
      collection: collectionStyled
    }
  }
}
