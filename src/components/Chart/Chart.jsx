import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

import modelGenerate from '../../model_generator'
import Bar from './Bar.jsx'

// use helper to generate the final model
// render the model

class Chart extends Component {
  model = () => {
    return modelGenerate(this.props.model)
  }

  render(){
    const {
      dataPoints: { collection },
      container: { style: containerStyle }
    } = this.model()

    return (
      <svg {...containerStyle}>
        {collection.map((dataPoint, index) => {
          return <Bar key={index} {...dataPoint.style} />
        })}
      </svg>
    )
  }
}

Chart.propTypes = {
  model: PropTypes.shape({
    dataPoints: PropTypes.shape({
      collection: PropTypes.array.isRequired
    })
  }),
  container: PropTypes.shape({
    style: PropTypes.shape({
      height: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired
    })
  })
}

export default hot(module)(Chart)


/* 
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
 */