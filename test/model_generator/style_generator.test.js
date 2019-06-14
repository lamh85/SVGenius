// How to mock a functon's return value WHEN the mocked and caller are in the same module
// https://stackoverflow.com/a/50856001
const testModule = require('../../src/model_generator/style_generator.js')

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

    testModule.contentDimensionSize = jest.fn().mockReturnValueOnce(130)
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