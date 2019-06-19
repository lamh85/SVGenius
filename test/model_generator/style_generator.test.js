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

    const result = testModule.positionX(params)

    // Find the X position of the 3rd (index = 2) bar
    // Each bar is 10px wide
    // At this point, there were already 2 bars and two margins:
    // 2 * 10 + 2 * 5 = 20 + 10 = 30
    expect(result).toEqual(30)
  })
})

describe('positionY', () => {
  it('returns the Y position', () => {
    mockFunction({ functionName: 'contentDimensionSize', returnValue: 100})
    mockFunction({ functionName: 'barHeight', returnValue: 50 })

    const params = {
      boxHeight: 'will be mocked',
      yValue: 'wlll be mocked',
      data: 'will be mocked'
    }

    const result = testModule.positionY(params)

    // 100 - 50 + 10 (Y Margin)
    expect(result).toEqual(60)
  })
})

describe('generateDataPointStyles', () => {

  const params = {
    dataPoints: {
      collection: [{ y: 1 }, { y: 2 }]
    },
    container: {
      style: {
        width: '200px',
        height: '100px'
      }
    }
  }

  it('sends the correct arguments to other functions', () => {
    testModule.positionX = jest.fn()
    testModule.positionY = jest.fn()
    testModule.barHeight = jest.fn()
    testModule.barWidth = jest.fn()

    testModule.generateDataPointStyles(params)

    const positionXCalls = testModule.positionX.mock.calls
    expect(positionXCalls[0][0].index).toEqual(0)
    expect(positionXCalls[0][0].boxWidth).toEqual(200)
    expect(positionXCalls[0][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(positionXCalls[1][0].index).toEqual(1)
    expect(positionXCalls[1][0].boxWidth).toEqual(200)
    expect(positionXCalls[1][0].data).toEqual([{ y: 1 }, { y: 2 }])

    const positionYCalls = testModule.positionY.mock.calls
    expect(positionYCalls[0][0].boxHeight).toEqual(100)
    expect(positionYCalls[0][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(positionYCalls[0][0].yValue).toEqual(1)
    expect(positionYCalls[1][0].boxHeight).toEqual(100)
    expect(positionYCalls[1][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(positionYCalls[1][0].yValue).toEqual(2)

    const barHeightCalls = testModule.barHeight.mock.calls
    expect(barHeightCalls[0][0].yValue).toEqual(1)
    expect(barHeightCalls[0][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(barHeightCalls[0][0].boxHeight).toEqual(100)
    expect(barHeightCalls[1][0].yValue).toEqual(2)
    expect(barHeightCalls[1][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(barHeightCalls[1][0].boxHeight).toEqual(100)

    const barWidthCalls = testModule.barWidth.mock.calls
    expect(barWidthCalls[0][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(barWidthCalls[0][0].boxWidth).toEqual(200)
    expect(barWidthCalls[1][0].data).toEqual([{ y: 1 }, { y: 2 }])
    expect(barWidthCalls[1][0].boxWidth).toEqual(200)
  })

  it('returns the model with datapoint styles', () => {
    ['positionX', 'positionY', 'barHeight', 'barWidth'].map(name => {
      mockFunction({ functionName: name, returnValue: name })
    })


    // const {
    //   dataPoints: { collection: data },
    //   container: {
    //     style: { width: widthString, height: heightString }
    //   }
    // } = model
  })
})