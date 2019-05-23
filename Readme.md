# Data Model (shallow)

```javascript
{
  container: {
    style: Style
  },
  legend: {
    style: Style
  },
  axes: {
    style: Style,
    y: Axis,
    x: Axis
  },
  dataPoints: {
    style: Style,
    formatterX: value => {},
    formatterY: value => {},
    collection: [
      DataPoint,
      DataPoint,
      DataPoint
    ]
  }
}
```

# Box Model
```
In the diagrams below, one pipe or one underscore denotes boundaries between regions.

On the left:
Outside the chart component | Y-axis title | margin | Y-axis scale markers | margin | Y-axis

On the bottom:
TBD

```

# Deeper Objects

```javascript
Style =
{
  padding: '10px',
  height: '10px',
  width: '10px',
  backgroundColor: 'red',
  border: '1px solid black'
}

Axis =
{
  title: 'some text',
  scale: 10 // Size represented between two markers.
}

DataPoint =
{
  x: 1, // defaults to index + 1
  y: 50,
  tooltip: Tooltip,
  style: Style
}

Tooltip =
{
  style: Style,
  content: '<p>some html</p>'
}

```

# Component Structure

```
Container
  Tooltip
  Legend
  Graph
    Y Axis
    X Axis
    Bars
```

Note: Should pass only the needed props down the tree. We don't want to duplicate because the number of data points = number of times of duplication.

# Lifecycle

The library receives the input.

⬇️

Vaidate: Required object properties for required inputs should exist:
```
model.dataPoints.collection
model.container.style.height
model.container.style.width
```
If none of the styles exist, then take the container's height and width.

⬇️

```
Computed states:
  model.dataPoints.collection is an array of DataPoints
  Each DataPoint has a 'style' property, whose value is an object.

  Need to generate these properties in the Style:
  {
    width: ...
    height: ...
    left: ...
    top: ...
  }
```

⬇️

The finished model: Source of truth for all of chart's properties, and each bar's property.

⬇️

Render

⬇️

(return to the top)