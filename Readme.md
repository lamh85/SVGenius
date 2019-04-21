Model:
{
  global: {
    style: Style
  },
  axes: {
    y: Axis,
    x: Axis
  }
  dataPoints: [
    DataPoint,
    DataPoint,
    DataPoint,
    ...
  ]
}

Objects:
  DataPoint
  {
    x: DataPointDimension,
    y: DataPointDimension,
    tooltip: Tooltip
    style: Style
  }

  Tooltip
  {
    style: Style
  }

  Style
  {
    padding:
    height:
    width:
    backgroundColor:
    border
  }

  Axis
  {
    title:
    scale: // Value per section. EG: one space between two markers represents 10
  }

  DataPointDimension
  {
    value:
    dataType:
    style: Style
  }

Component Structure

Container
  Tooltip
  Legend
  Graph
    Y Axis
    X Axis
    Bars

Lifecycle:

  Pattern: Should pass only the needed props down the tree. We don't want to duplicate because the number of data points = number of times of duplication.

  Inputs:
    Required
      data values
      container size
    Optional
      container - style
      axes - 
      margin size
  ⬇️
  Bar width + Bar height + X-Y positions of the bars
  The finished model:
  Source of truth for all of chart's properties, and each bar's property.
  ⬇️
  Render
  ⬇️
  (return to the top)