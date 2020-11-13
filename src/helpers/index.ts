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
    hours: todayDate.getHours(),
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

export const getDateTimeSameHours = (date: IDay) => {
  return new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0)
}

export const handelInitialValues = (
  defaultValue: any,
  correctedType: string
) => {
  let initTime
  let initCalender = new Date()
  if (correctedType === 'single') {
    if (defaultValue?.year) {
      initCalender = new Date(
        defaultValue.year,
        defaultValue.month,
        defaultValue.day
      )
    }
    initTime = {
      hours: defaultValue?.hours || initCalender.getHours(),
      minutes: defaultValue?.minutes || initCalender.getMinutes()
    }
  }
  if (correctedType === 'range') {
    if (defaultValue?.from) {
      initCalender = new Date(
        defaultValue.from.year,
        defaultValue.from.month,
        defaultValue.from.day
      )
    }
    const today = new Date()
    initTime = {
      from: {
        hours: defaultValue?.from?.hours || today.getHours(),
        minutes: defaultValue?.from?.minutes || today.getMinutes()
      },
      to: {
        hours: defaultValue?.to?.hours || today.getHours(),
        minutes: defaultValue?.to?.minutes || today.getMinutes()
      }
    }
  }
  return { initCalender, initTime }
}
