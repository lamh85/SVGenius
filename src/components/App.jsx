import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { DATA_POINTS, MINIMUM_INPUT } from '../constants'

const POSITIONS = {
  Y_AXIS: 10,
  X_AXIS: 90
}

class App extends Component {
  constructor(props) {
    super(props)

  }

  renderBars = () => {
    return <div></div>
  }

  render() {
    return <React.Fragment>
      {this.renderBars()}
    </React.Fragment>
  }
}

export default hot(module)(App)