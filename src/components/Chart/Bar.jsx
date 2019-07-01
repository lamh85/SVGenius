import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Bar extends Component {
  render(){
    const {
      left,
      top,
      width,
      height,
      handleMouseEnter,
      handleMouseLeave,
    } = this.props

    return (
      <rect
        width={width}
        height={height}
        x={left}
        y={top}
        fill='blue'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    )
  }
}

Bar.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  dataX: PropTypes.number.isRequired,
  dataY: PropTypes.number.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
}

export default Bar