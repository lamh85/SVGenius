import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

import modelGenerate from '../../model_generator'
import Bar from './Bar.jsx'

class Chart extends Component {
  render(){
    const {
      dataPoints: { collection },
      container: { style: containerStyle }
    } = modelGenerate(this.props.model)

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
      collection: PropTypes.arrayOf(
        PropTypes.shape({
          y: PropTypes.any.isRequired
        })
      )
    }),
    container: PropTypes.shape({
      style: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired
      })
    })
  })
}

export default hot(module)(Chart)