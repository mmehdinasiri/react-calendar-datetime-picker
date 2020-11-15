import jalaali from 'jalaali-js'
import { WEEK_DAY_SHORT, MONTHS_SHORT } from '../Constant'

export const getNumberOfDaysInMonth = (
  year: number,
  month: number,
  day: number,
  local?: string
): number => {
  console.log(jalaali.jalaaliMonthLength(year, month))
  if (local) {
    console.log('0-----')
    return jalaali.jalaaliMonthLength(year, month)
  } else {
    return new Date(year, month + 1, day).getDate()
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

export const getDateTimeStamp = (date: IDay, local?: string) => {
  if (local) {
    return jalaali.j2d(date.year, date.month, date.day)
  }
  return new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0)
}

export const handelInitialValues = (
  defaultValue: any,
  correctedType: string
) => {
  let initTime
  let initCalender = new Date()
  const today = new Date()
  if (correctedType === 'single') {
    if (defaultValue?.year) {
      initCalender = new Date(
        defaultValue.year,
        defaultValue.month,
        defaultValue.day
      )
    }
    initTime = {
      hours: defaultValue?.hours || today.getHours(),
      minutes: defaultValue?.minutes || today.getMinutes()
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
      initCalender = new Date(
        defaultValue[0].year,
        defaultValue[0].month,
        defaultValue[0].day
      )
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
