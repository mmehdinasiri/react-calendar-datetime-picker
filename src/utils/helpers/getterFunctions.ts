/* eslint-disable react-hooks/rules-of-hooks */
import jalaali from 'jalaali-js'
import { useLangOption } from '@/utils/hooks'
import { IDay, calendarLocal } from '@/types/type'

export const getNumberOfDaysInMonth = (
  year: number,
  month: number,
  local?: calendarLocal
): number => {
  if (local === 'fa') {
    return jalaali.jalaaliMonthLength(year, month + 1)
  } else {
    return new Date(year, month + 1, 0).getDate()
  }
}

export const getWeekday = (number: number, local: calendarLocal) => {
  const weekStartIndex = local === 'fa' ? 1 : 0
  const { WEEK_DAY_SHORT } = useLangOption(local)
  const weekDay = WEEK_DAY_SHORT[number]
  return {
    weekDay,
    weekDayIndex: WEEK_DAY_SHORT.indexOf(weekDay) + weekStartIndex
  }
}

export const getDateTimeStamp = (date: IDay, local?: calendarLocal) => {
  if (local === 'fa') {
    return jalaali.j2d(date.year, date.month + 1, date.day)
  }

  return new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0)
}
