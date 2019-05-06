const isObjectPathPresent = ({ object, path }) => {
  if (
    typeof (object) != 'object' ||
    Object.keys(object).length == 0 ||
    typeof (path) != 'string'
  ) {
    return false
  }

  const levels = path.split('.')
  let valueFinal = object
  for (i = 0; i < levels.length; i++) {
    const key = levels[i]
    valueFinal = valueFinal[key]
  }

  return !!valueFinal
}

export const modelValidate = model => {
  const results = [
    'dataPoints.collection',
    'container.style.height',
    'container.style.width'
  ].map(path => {
    return isObjectPathPresent({
      object: model, path
    })
  })

  return !results.includes(false)
}