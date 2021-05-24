import jalaali from 'jalaali-js'
import { addZero } from 'src/helpers'

export const convertToEn = (date: IDay | null, divider: string = '/') => {
  if (date) {
    const faDate = jalaali.toGregorian(date?.year, date?.month, date?.day)
    let fixedDate =
      faDate.gy + divider + addZero(faDate.gm) + divider + addZero(faDate.gd)

    if (date.hour !== undefined && date.minute !== undefined) {
      fixedDate =
        fixedDate + ' ' + addZero(date.hour) + ':' + addZero(date.minute)
    }
    return fixedDate
  }
  return ''
}
export const convertToFa = (date: IDay | null, divider: string = '/') => {
  if (date) {
    const day = new Date(date.year, date.month - 1, date.day)
    const faDate = jalaali.toJalaali(day)
    let fixedDate =
      faDate.jy + divider + addZero(faDate.jm) + divider + addZero(faDate.jd)
    if (date.hour !== undefined && date.minute !== undefined) {
      fixedDate =
        fixedDate + ' ' + addZero(date.hour) + ':' + addZero(date.minute)
    }
    return fixedDate
  }
  return ''
}
