import React from 'react'
import { shallow } from 'enzyme'
import Bar from './Bar.jsx'

const props = {
  left: 5,
  top: 6,
  height: 7,
  width: 8
}

const component = shallow(<Bar {...props} />)

describe('<Bar />', () => {
  it('renders the component', () => {
    expect(component.find('rect').length).toEqual(1)
  })
})