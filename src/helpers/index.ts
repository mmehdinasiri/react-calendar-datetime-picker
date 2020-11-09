import { WEEK_DAY_SHORT, MONTHS } from '../Constant'
export const getNumberOfDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate()
}
export const getWeekday = (number: number) => {
  const weekDay = WEEK_DAY_SHORT[number]
  return { weekDay, weekDayIndex: WEEK_DAY_SHORT.indexOf(weekDay) }
}
export const getMonth = (number: number) => {
  return MONTHS[number]
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
