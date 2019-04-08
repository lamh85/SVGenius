
import React, { Component } from "react"
import { hot } from "react-hot-loader"

class ExperimentsPage extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <React.Fragment>
        <svg height="500" width="500">
          <polygon points="10,10 400,250 10,400" fill="red" />
        </svg>

        <svg width="100" height="100">
          <rect x="10" y="10" width="50" height="50" fill="blue" />
        </svg>

        <svg width="200" height="200">
          <circle cx="100" cy="100" r="50" fill="brown" strokeWidth="10" />
        </svg>
      </React.Fragment>
    )
  }
}

export default hot(module)(ExperimentsPage)