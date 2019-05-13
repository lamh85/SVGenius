// Same margin widths for between the bars, and surrounding the first and last bar.
// Same margin above and below the largest bar.
const MARGIN = {
  X: 10,
  Y: 10
}

const contentDimensionSize = ({ boxDimensionSize, dimension }) => {
  const margin = MARGIN[dimension]
  return boxDimensionSize - (2 * margin)
}

const totalInnerMargins = data => {
  const gaps = data.length - 1
  return MARGIN * gaps
}

// Bar Sizes
// =========

const barWidth = ({ data, boxWidth }) => {
  const contentWidth = contentDimensionSize({
    boxDimensionSize: boxWidth,
    dimension: "X"
  })

  const totalInnerMarginSize = (data.length - 1) * MARGIN.X
  return (contentWidth - totalInnerMarginSize) / data.length
}

const yMaxValue = data => {
  const values = data.map(dataPoint => dataPoint.y)
  return Math.max(...values)
}

const barHeight = ({ yValue, data, boxHeight }) => {
  const maxHeight = contentDimensionSize({
    boxDimensionSize: boxHeight,
    dimension: "Y"
  })

  const portionOfMax = yValue / yMaxValue(data)
  return portionOfMax * maxHeight
}

// Positions
// =========

const positionX = ({ index, boxWidth, data }) => {
  const humanizedIndex = index + 1
  const precedingBarsCount = humanizedIndex - 1
  const widthWithMargin = barWidth({ data, boxWidth })
  return MARGIN.X + (precedingBarsCount * widthWithMargin)
}

const positionY = ({ boxHeight, yValue, data }) => {
  const contentHeight = ({
    boxDimensionSize: boxHeight,
    dimension: "Y"
  })

  const barHeight = ({ yValue, data, boxHeight })
  return contentHeight - barHeight + MARGIN.Y
}

// Root function:
// This should be the only exportable function
// =============

const generateDataPointStyles = model => {
  const {
    dataPoints: { collection: data },
    container: {
      style: {
        width: boxWidth,
        height: boxHeight
      }
    }
  } = model

  const collectionStyled = data.map((dataPoint, index) => {
    const yValue = dataPoint.y

    return {
      ...dataPoint,
      style: {
        left: positionX({ index, boxWidth, data }),
        top: positionY({ boxHeight, data, yValue }),
        height: barHeight({ yValue, data, boxHeight }),
        width: barWidth({ data, boxWidth })
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