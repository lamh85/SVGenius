import { ResponseSuccess, ResponseFailed } from './responses.js'
import { generateDataPointStyles } from './style_generator'
import { modelValidate } from './validator.js'

export const modelGenerate = model => {
  // if (!modelValidate(model)) {
  //   return new ResponseFailed('Invalid model')
  // }

  return generateDataPointStyles(model)
}