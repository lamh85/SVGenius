import React from 'react'
import { mount } from 'enzyme'
import Chart from './Chart.jsx'

const setup = (propsOverride = {}) => {
  const props = {
    model: {
      container: {
        style: {
          height: '100px',
          width: '100px'
        }
      },
      dataPoints: {
        collection: [{ y: 1 }, { y: 1 }, { y: 1 }]
      }
    },
    ...propsOverride
  }

  const component = mount(<Chart {...props} />)
  return { component, props }
}

describe('<Chart/>', () => {
  it('number of rendered bars match with length of datapoints', () => {
    const { component } = setup()
    expect(component.find('Bar').length).toEqual(3)
  })

  it('calls handler when mouse enters', () => {
    const { component } = setup()
    component.simulate('mouseLeave')
    component.simulate('mouseEnter')
    expect(component.instance().state.isHoveringChart).toEqual(true)
  })

  it('calls handler when mouse leaves', () => {
    const { component } = setup()
    component.simulate('mouseEnter')
    component.simulate('mouseLeave')
    expect(component.instance().state.isHoveringChart).toEqual(false)
  })
})