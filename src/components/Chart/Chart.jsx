import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

import modelGenerate from '../../model_generator'
import Bar from './Bar.jsx'

class Chart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoveredX: '',
      hoveredY: '',
      clientX: '',
      clientY: ''
    }
  }

  render(){
    const {
      dataPoints: { collection },
      container: { style: containerStyle }
    } = modelGenerate(this.props.model)

    return (
      <svg {...containerStyle}>
        {collection.map((dataPoint, index) => {
          return (
            <Bar
              key={index}
              {...dataPoint.style}
              dataX={index + 1}
              dataY={dataPoint.y}
            />
          )
        })}
      </svg>
    )
  }
}

Chart.propTypes = {
  model: PropTypes.shape({
    dataPoints: PropTypes.shape({
      collection: PropTypes.arrayOf(
        PropTypes.shape({
          y: PropTypes.any.isRequired
        })
      )
    }),
    container: PropTypes.shape({
      style: PropTypes.shape({
        height: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired
      })
    })
  })
}

export default hot(module)(Chart)