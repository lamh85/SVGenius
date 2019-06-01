import React from 'react'
import PropTypes from 'prop-types'

const Bar = props => {
  const { left: x, top: y } = props
  const rectProps = { ...props, x, y }
  return <rect {...rectProps} fill='blue' />
}

Bar.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default Bar