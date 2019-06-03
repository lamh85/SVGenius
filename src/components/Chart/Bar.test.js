import React from 'react'
import { shallow } from 'enzyme'
import Bar from './Bar.jsx'

import { BAR_PROPS_MOCK } from '../../constants/fixtures.js'

const component = shallow(<Bar {...BAR_PROPS_MOCK} />)

describe('<Bar />', () => {
  it('renders the component', () => {
    expect(component.find('rect').length).toEqual(1)
  })
})