import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { DATA_POINTS } from '../constants'

const POSITIONS = {
  Y_AXIS: 10,
  X_AXIS: 90
}

class App extends Component {
  constructor(props) {
    super(props)

  }

  renderBars = () => {
    return (
      <svg width='600' height='100'>
        {
          DATA_POINTS.map((dataPoint, index) => {
            // Renders one bar
            return <rect
              // top-left position
              x={String(index * 10)}
              y={String(POSITIONS.X_AXIS - dataPoint.y)}

              // size
              width='5'
              height={String(dataPoint.y)}

              // Other
              fill='blue'
              key={index}
            />
          })
        }
      </svg>
    )
  }

  render() {
    return <React.Fragment>
      {this.renderBars()}
    </React.Fragment>
  }
}

export default hot(module)(App)