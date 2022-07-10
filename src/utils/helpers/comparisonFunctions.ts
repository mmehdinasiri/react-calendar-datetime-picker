import jalaali from 'jalaali-js'
import { IDay } from '@/types/type'

export const compareDateEN = (date1: IDay, date2: IDay) => {
  const fixDate1 = new Date(date1.year, date1.month, date1.day)
  const fixDate2 = new Date(date2.year, date2.month, date2.day)
  if (fixDate1 > fixDate2) {
    return 1
  } else if (fixDate1 < fixDate2) {
    return 2
  }
  return 0
}
export const compareDateFA = (date1: IDay, date2: IDay) => {
  const fixDate1 = jalaali.j2d(date1.year, date1.month + 1, date1.day)
  const fixDate2 = jalaali.j2d(date2.year, date2.month + 1, date2.day)
  if (fixDate1 > fixDate2) {
    return 1
  } else if (fixDate1 < fixDate2) {
    return 2
  }
  return 0
}
export const isDayBetween = (
  min: IDay,
  day: IDay,
  max: IDay,
  local: string
) => {
  const selectCompar = {
    en: compareDateEN,
    fa: compareDateFA
  }
  if (
    selectCompar[local](min, day) === 1 &&
    selectCompar[local](max, day) === 2
  )
    return false
  return true
}
