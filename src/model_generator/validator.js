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
  
  // levels.map((item, index) => {
  //   const key = levels[index]
  //   const currentValue = valueFinal[key]
  //   valueFinal = currentValue
  //   if (!currentValue) {
  //     break
  //   }
  // })
  for (let index = 0; index < levels.length; index++) {
    const key = levels[index]
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