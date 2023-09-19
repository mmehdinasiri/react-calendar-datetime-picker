export const isNotUndefined = (value: any, alternativeValue: any) => {
  if (typeof value !== 'undefined') {
    return value
  }
  return alternativeValue
}
