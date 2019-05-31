import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { MINIMUM_INPUT } from '../constants'
import Chart from './Chart'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <React.Fragment >
      <Chart
        model={MINIMUM_INPUT}
      />
    </React.Fragment>
  }
}

export default hot(module)(App)