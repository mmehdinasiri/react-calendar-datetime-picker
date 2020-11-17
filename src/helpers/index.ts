import jalaali from 'jalaali-js'
// import persianDate from 'persian-date'
import { LOCAL_CONSTANT } from '../Constant'

export const getNumberOfDaysInMonth = (
  year: number,
  month: number,
  local?: string
): number => {
  if (local === 'fa') {
    return jalaali.jalaaliMonthLength(year, month)
  } else {
    return new Date(year, month + 1, 0).getDate()
  }
}

export const genFullDay = (year: number, month: number, day: number) => {
  return `${year}${addZero(month)}${addZero(day)}`
}
export const genDayObject = (year: number, month: number, day: number) => {
  return {
    year: year,
    month: month,
    day: day,
    fullDay: genFullDay(year, month, day)
  }
}

export const getWeekday = (number: number, local: string) => {
  const weekDay = LOCAL_CONSTANT[local].WEEK_DAY_SHORT[number]
  return {
    weekDay,
    weekDayIndex: LOCAL_CONSTANT[local].WEEK_DAY_SHORT.indexOf(weekDay)
  }
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

export const getPreviousSundayDay = (date: IDay, local: string) => {
  const day = LOCAL_CONSTANT[local].getDay(date)
  const dayOfMonth = LOCAL_CONSTANT[local].getDayOfMonth(date)
  const prevSunday = LOCAL_CONSTANT[local].today()
  let previousSundayDay
  if (day === 0) {
    previousSundayDay = LOCAL_CONSTANT[local].setDayOfMonth(
      prevSunday,
      dayOfMonth - 7
    )
  } else {
    previousSundayDay = LOCAL_CONSTANT[local].setDayOfMonth(
      prevSunday,
      dayOfMonth - day
    )
  }
  if (local === 'fa') {
    return LOCAL_CONSTANT[local].getDayOfMonth(
      previousSundayDay.State.persianAstro
    )
  }
  const temp = {
    year: previousSundayDay.getFullYear(),
    month: previousSundayDay.getMonth(),
    day: previousSundayDay.getDate()
  }
  return LOCAL_CONSTANT[local].getDayOfMonth(temp)
}

export const getDateTimeStamp = (date: IDay, local?: string) => {
  if (local === 'fa') {
    return jalaali.j2d(date.year, date.month, date.day)
  }
  return new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0)
}

export const handelInitialValues = (
  defaultValue: any,
  correctedType: string,
  local: string
) => {
  let initTime
  let initCalender
  const today = new Date()
  const todayJ = jalaali.toJalaali(new Date())
  if (correctedType === 'single') {
    if (defaultValue?.year) {
      initCalender = {
        year: defaultValue.year,
        month: defaultValue.month,
        day: defaultValue.day
      }
    }
    initTime = {
      hours: defaultValue?.hours || today.getHours(),
      minutes: defaultValue?.minutes || today.getMinutes()
    }
  }
  if (correctedType === 'range') {
    if (defaultValue?.from) {
      initCalender = {
        year: defaultValue.from.year,
        month: defaultValue.from.month,
        day: defaultValue.from.day
      }
    }
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
  if (correctedType === 'multi') {
    if (defaultValue.length && defaultValue[0]?.year) {
      initCalender = {
        year: defaultValue[0].year,
        month: defaultValue[0].month,
        day: defaultValue[0].day
      }
    }
  }
  if (
    !defaultValue?.year &&
    !defaultValue?.from &&
    !defaultValue?.length &&
    local === 'fa'
  ) {
    initCalender = {
      year: todayJ.jy,
      month: todayJ.jm,
      day: todayJ.jd
    }
  } else {
    initCalender = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate()
    }
  }
  return { initCalender, initTime }
}
export const mergeProviders = (
  type: string,
  selectedDate: IDay | IRange | IDay[] | null | undefined,
  selectedTime: ITime | ITimeRange | null | undefined,
  withTime: boolean,
  onChange: (date: any) => void
) => {
  if (type === 'single' && (selectedDate as IDay)?.year) {
    if (withTime) {
      onChange({ ...selectedDate, ...selectedTime })
    } else {
      onChange(selectedDate)
    }
  } else if (
    type === 'range' &&
    (selectedDate as IRange).from?.year &&
    (selectedDate as IRange).to?.year
  ) {
    if (withTime) {
      onChange({
        from: {
          ...(selectedDate as IRange).from,
          ...(selectedTime as ITimeRange).from
        },
        to: {
          ...(selectedDate as IRange).to,
          ...(selectedTime as ITimeRange).to
        }
      })
    } else {
      onChange(selectedDate)
    }
  } else if (type === 'multi') {
    onChange(selectedDate)
  }
}

export const addZero = (number: number) => {
  if (number < 10) {
    return `0${number}`
  } else return number
}
