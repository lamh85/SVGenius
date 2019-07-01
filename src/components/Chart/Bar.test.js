import React from 'react'
import { shallow } from 'enzyme'
import Bar from './Bar.jsx'

const setup = (propOverrides = {}) => {
  const props = {
    left: 1,
    top: 2,
    height: 3,
    width: 4,
    dataX: 5,
    dataY: 6,
    handleMouseEnter: jest.fn(),
    handleMouseLeave: jest.fn(),
  }

  const component = shallow(<Bar {...props} />)
  return { component, props }
}

describe('<Bar />', () => {
  it('renders the component', () => {
    const { component } = setup()
    expect(component.find('rect').length).toEqual(1)
  })

  it('calls the handler when mouse enter', () => {
    const { component, props } = setup()
    component.find('rect').simulate('mouseEnter')
    expect(props.handleMouseEnter.mock.calls.length).toEqual(1)
  })

  it('calls the handler when mouse leave', () => {
    const { component, props } = setup()
    component.find('rect').simulate('mouseLeave')
    expect(props.handleMouseLeave.mock.calls.length).toEqual(1)
  })
})