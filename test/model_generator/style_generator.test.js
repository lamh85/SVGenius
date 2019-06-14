// How to mock a functon's return value WHEN the mocked and caller are in the same module
// https://stackoverflow.com/a/50856001
const testModule = require('../../src/model_generator/style_generator.js')

const mockFunction = ({ functionName, returnValue }) => {
  testModule[functionName] = jest.fn().mockReturnValueOnce(returnValue)
}

describe('contentDimensionSize', () => {
  it('produces correct X dimension', () => {
    const params = {
      boxDimensionSize: 100,
      dimension: 'X'
    }

    expect(testModule.contentDimensionSize(params)).toEqual(80)
  })

  it('produces correct Y dimension', () => {
    const params = {
      boxDimensionSize: 500,
      dimension: 'Y'
    }

    expect(testModule.contentDimensionSize(params)).toEqual(480)
  })
})

describe('barWidth', () => {
  it('produces correct amount', () => {
    const params = {
      data: ['first', 'second', 'third', 'fourth'],
      boxWidth: 555
    }

    mockFunction({ functionName: 'contentDimensionSize', returnValue: 130 })
    const result = testModule.barWidth(params)
    // total inner margins = 3 * 5 = 15
    // (130 - 15) / 3
    expect(result).toEqual(28.75)
  })
})

describe('yMaxValue', () => {
  it('returns the max Y value', () => {
    const params = [{y: 1}, {y: 2}, {y: 3}]
    const result = testModule.yMaxValue(params)
    expect(result).toEqual(3)
  })
})

describe('barHeight', () => {
  it('returns the bar height', () => {
    // Stub the max height as 20
    mockFunction({ functionName: 'contentDimensionSize', returnValue: 20 })
    // Stub the max Y value as 10
    mockFunction({ functionName: 'yMaxValue', returnValue: 10 })

    const params = {
      yValue: 5,
      data: ['this will be mocked anyway'],
      boxHeight: 'this will be mocked anyway'
    }

    // yValue is 50% of yMaxValue. Therefore, 50% of max height 20 is 10
    const result = testModule.barHeight(params)
    expect(result).toEqual(10)
  })
})

describe('positionX', () => {
  it('returns the X position', () => {
    mockFunction({ functionName: 'barWidth', returnValue: 10 })

    const params = {
      index: 2,
      boxWidth: 'will be mocked',
      data: [ 'one', 'two', 'three', 'four' ]
    }

    // Find the X position of the 3rd (index = 2) bar
    // Each bar is 10px wide
    
  })
})