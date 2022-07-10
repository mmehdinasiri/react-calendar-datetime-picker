import { IDay, ITime } from '@/types/type'
import { addZero } from './addZero'

export const genFullDay = (year: number, month: number, day: number) => {
  return `${year}${addZero(month)}${addZero(day)}`
}
export const genFullIDay = (
  date: IDay | null | undefined,
  isCorrectMonth = false,
  withTime?: boolean,
  showTimeInput?: boolean,
  time?: ITime | null | undefined
) => {
  if (date) {
    if (showTimeInput && withTime && time) {
      return `${date.year}/${addZero(
        date.month + (isCorrectMonth ? +1 : 0)
      )}/${addZero(date.day)} ${addZero(time.hour)}:${addZero(time.minute)}`
    } else {
      return `${date.year}/${addZero(
        date.month + (isCorrectMonth ? +1 : 0)
      )}/${addZero(date.day)}`
    }
  }
  return ''
}
export const genDayObject = (year: number, month: number, day: number) => {
  return {
    year: year,
    month: month,
    day: day
  }
}
