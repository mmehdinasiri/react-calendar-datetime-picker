import PersianDate from 'persian-date'
import { addZero } from 'src/helpers'

export const convertToEn = (date: IDay | null, divider: string = '/') => {
  if (date) {
    const faDate = new PersianDate([
      date?.year,
      date?.month,
      date?.day
    ]).toCalendar('gregorian').State.gregorian
    let fixedDate =
      faDate.year +
      divider +
      addZero(faDate.month + 1) +
      divider +
      addZero(faDate.day)
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
    const faDate = new PersianDate(day).State.persianAstro
    let fixedDate =
      faDate.year +
      divider +
      addZero(faDate.month + 1) +
      divider +
      addZero(faDate.day)
    if (date.hour !== undefined && date.minute !== undefined) {
      fixedDate =
        fixedDate + ' ' + addZero(date.hour) + ':' + addZero(date.minute)
    }
    return fixedDate
  }
  return ''
}
