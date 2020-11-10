import { WEEK_DAY_SHORT, MONTHS_SHORT } from '../Constant'

export const getNumberOfDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

export const getWeekday = (number: number) => {
  const weekDay = WEEK_DAY_SHORT[number]
  return { weekDay, weekDayIndex: WEEK_DAY_SHORT.indexOf(weekDay) }
}

export const getMonth = (number: number) => {
  return MONTHS_SHORT[number]
}

export const todayObject = () => {
  const todayDate = new Date()
  const today = {
    year: todayDate.getFullYear(),
    month: todayDate.getMonth(),
    day: todayDate.getDate(),
    hour: todayDate.getHours(),
    minutes: todayDate.getMinutes()
  }
  return today
}

export const getPreviousSundayDay = (date: Date) => {
  var day = date.getDay()
  const prevMonday = new Date()
  if (date.getDay() === 0) {
    prevMonday.setDate(date.getDate() - 7)
  } else {
    prevMonday.setDate(date.getDate() - day)
  }
  return prevMonday.getDate()
}
