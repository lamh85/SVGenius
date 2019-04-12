/* 

Requirements:
- 10px margin all around:
  - Above the tallest bar
  - Below the X axis
  - To the left and right of the first and last bars
- 10px margin between the bars

  Needed outputs:
  - bar width
  - bar height
  
 */

const MARGIN = 10

const contentSize = ({boxWidth, boxHeight}) => {
  const width = boxWidth - (MARGIN * 2)
  const height = boxHeight - (MARGIN * 2)
  return { width, height }
}

const totalInnerMargins = data => {
  const gaps = data.length - 1
  return MARGIN * gaps
}

const barWidth = ({data, boxWidth, boxHeight}) => {
  const { width: contentWidth } = contentSize({boxWidth, boxHeight})
  return contentWidth / data.length
}