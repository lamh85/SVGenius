# Model (shallow)

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

⬇️

```
Computed states:
  Bar width (model.dataPoints.collection)
  Bar height (model.dataPoints.collection)
  X-Y positions of the bars (model.dataPoints.collection)
```

⬇️

The finished model: Source of truth for all of chart's properties, and each bar's property.

⬇️

Render

⬇️

(return to the top)