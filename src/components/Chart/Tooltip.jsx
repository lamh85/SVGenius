import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Tooltip = styled.div`
  border: 1px solid black;
  background-color: white;
  padding: 15px;
  width: auto;
`

class Unwrapped extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dataX, dataY } = this.props

    return (
      <Tooltip>
        X value: {dataX}
        <br/>Y value: {dataY}
      </Tooltip>
    )
  }
}

Unwrapped.propTypes = {
  dataX: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  dataY: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default hot(module)(Unwrapped)