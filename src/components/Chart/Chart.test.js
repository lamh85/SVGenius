import React from 'react'
import { shallow } from 'enzyme'
import Chart from './Chart.jsx'

import modelGenerator from '../../model_generator'
import { BAR_PROPS_MOCK } from '../../constants/fixtures.js'

const setup = (propsOverride = {}) => {
  const props = {
    model: {
      container: {
        style: {
          height: 100,
          width: 100
        }
      },
      dataPoints: {
        collection: [{ y: 1 }, { y: 1 }, { y: 1 }]
      }
    },
    ...propsOverride
  }

  const component = shallow(<Chart {...props} />)
  return { component, props }
}

describe('<Chart/>', () => {
  it('number of rendered bars match with length of datapoints', () => {
    const { component } = setup()
    expect(component.find('Bar').length).toEqual(3)
  })
})