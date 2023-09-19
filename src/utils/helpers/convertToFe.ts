import { IDay } from '@/types/type'
import jalaali from 'jalaali-js'
import { addZero } from './addZero'

export const convertToFa = (date: IDay | null, divider = '/') => {
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
