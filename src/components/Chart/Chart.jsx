import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

import modelGenerate from '../../model_generator'
import Bar from './Bar.jsx'
import Tooltip from './Tooltip.jsx'

class Chart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoveredDataX: '',
      hoveredDataY: '',
      clientX: '',
      clientY: '',
      isHoveringChart: false,
      isHoveringBar: false,
    }
  }

  handleMouseEnterChart = () => {
    this.setState({isHoveringChart: true})
  }

  handleMouseLeaveChart = () => {
    this.setState({isHoveringChart: false})
  }

  handleMouseMove = event => {
    this.setState({
      clientX: event.clientX,
      clientY: event.clientY
    })
  }

  handleMouseEnterBar = data => {
    this.setState({
      hoveredDataX: data.dataX,
      hoveredDataY: data.dataY,
      isHoveringBar: true
    })
  }

  handleMouseLeaveBar = () => {
    this.setState({isHoveringBar: false})
  }


  render(){
    const {
      dataPoints: { collection },
      container: { style: containerStyle }
    } = modelGenerate(this.props.model)

    const chartProps = {
      ...containerStyle,
      onMouseEnter: this.handleMouseEnterChart,
      onMouseLeave: this.handleMouseLeaveChart,
      onMouseMove: this.handleMouseMove
    }

    const {
      isHoveringBar,
      isHoveringChart,
      hoveredDataX,
      hoveredDataY
    } = this.state

    return (
      <>
        <svg {...chartProps}>
          {collection.map((dataPoint, index) => {
            const data = {
              dataX: index + 1,
              dataY: dataPoint.y
            }
            
            return (
              <Bar
                key={index}
                {...dataPoint.style}
                {...data}
                handleMouseLeave={this.handleMouseLeaveBar}
                handleMouseEnter={() => this.handleMouseEnterBar(data)}
              />
            )
          })}
        </svg>

        {isHoveringBar && isHoveringChart &&
          <Tooltip dataX={hoveredDataX} dataY={hoveredDataY} />
        }
      </>
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