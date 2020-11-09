export const monthConvertor = (monthNum: number): string => {
  let monthString: string = ''
  switch (monthNum) {
    case 1:
      monthString = 'january'
      break
    case 2:
      monthString = 'february'
      break
    case 3:
      monthString = 'march'
      break
    case 4:
      monthString = 'april'
      break
    case 5:
      monthString = 'may'
      break
    case 6:
      monthString = 'june'
      break
    case 7:
      monthString = 'july'
      break
    case 8:
      monthString = 'august'
      break
    case 9:
      monthString = 'september'
      break
    case 10:
      monthString = 'october'
      break
    case 11:
      monthString = 'november'
      break
    case 12:
      monthString = 'december'
      break
    default:
      monthString = ''
  }
  return monthString
}
