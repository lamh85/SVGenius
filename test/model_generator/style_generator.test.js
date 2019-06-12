// Mocking specific functions:
// https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4

import * as testModule from '../../src/model_generator/style_generator.js'
// const testModule = require('../../src/model_generator/style_generator.js')

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

    // https://stackoverflow.com/questions/51269431/jest-mock-inner-function
    // https://stackoverflow.com/questions/48756241/how-to-test-that-an-inner-function-has-been-called-from-an-imported-function-w
    // https://www.exratione.com/2015/12/es6-use-of-import-property-from-module-is-not-a-great-plan/
    // testModule.contentDimensionSize = jest.fn().mockReturnValueOnce(130)

    // console.log(testModule.contentDimensionSize())
    // const mockedModule = {
    //   ...testModule,
    //   contentDimensionSize: jest.fn().mockReturnValueOnce(130)
    // }

    exports.barWidth = testModule.barWidth
    exports.contentDimensionSize = jest.fn().mockReturnValueOnce(130)

    const result = exports.barWidth(params)
    console.log(exports.contentDimensionSize())
    // total inner margins = 3 * 10 = 30
    // (130 - 30) / 4
    expect(result).toEqual(25)
  })
})