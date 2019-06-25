import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Bar extends Component {
  handleMouseEnter = () => {
    
    console.log("========")
    console.log("X: ", this.props.dataX)
    console.log("Y: ", this.props.dataY)
  }

  render(){
    const { left, top, width, height } = this.props

// {"style":{"left":16.416666666666664,"top":481.864406779661,"height":8.135593220338983,"width":11.416666666666666}}

    return (
      <rect
        width={width}
        height={height}
        x={left}
        y={top}
        fill='blue'
        onMouseEnter={this.handleMouseEnter}
      />
    )
  }
}

Bar.propTypes = {
  // style: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  // })
}

export default Bar