import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import modelGenerate from '../../model_generator'

// use helper to generate the final model
// render the model

class Chart extends Component {
  model = () => {
    // return modelGenerate(this.props.model)
  }

  render(){
    return (
      <div>
        model: { JSON.stringify(this.model()) }
        <br/>props: { JSON.stringify(this.props) }
      </div>
    )
  }
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