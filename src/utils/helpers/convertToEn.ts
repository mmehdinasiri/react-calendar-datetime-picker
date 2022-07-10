import jalaali from 'jalaali-js'
import { IDay } from '@/types/type'
import { addZero } from './addZero'

export const convertToEn = (date: IDay | null, divider = '/') => {
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
