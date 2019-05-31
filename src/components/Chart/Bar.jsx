import React from 'react'
import PropTypes from 'prop-types'

const Bar = props => {
  const { left, top } = props
  const rectProps = { ...props, x: left, y: top }
  return <rect {...rectProps} fill='blue' />
}

Bar.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Bar