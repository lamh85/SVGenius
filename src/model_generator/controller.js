import { ResponseSuccess, ResponseFailed } from './responses.js'
import { modelValidate } from './validator.js'

export default modelGenerate = model => {
  if (!modelValidate(model)) {
    return new ResponseFailed('Invalid model')
  }

  // compute
  // merge
}