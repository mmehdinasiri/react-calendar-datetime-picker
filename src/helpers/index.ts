import persianDate from 'persian-date'
// import persianDate from 'persian-date'
import { useLangOption } from '../hooks/useLangOption'

export const getNumberOfDaysInMonth = (
  year: number,
  month: number,
  local?: string
): number => {
  if (local === 'fa') {
    return new persianDate([year, month + 1]).daysInMonth()
  } else {
    return new Date(year, month + 1, 0).getDate()
  }
}

export const genFullDay = (year: number, month: number, day: number) => {
  return `${year}${addZero(month)}${addZero(day)}`
}

export const genFullIDay = (
  date: IDay | null | undefined,
  withTime?: boolean
) => {
  if (date) {
    if (withTime && date.hours && date.minutes) {
      return `${date.year}/${addZero(date.month)}/${addZero(
        date.day
      )} ${addZero(date.hours)}:${addZero(date.minutes)}`
    } else {
      return `${date.year}/${addZero(date.month)}/${addZero(date.day)}`
    }
  }
  return ''
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
  const { WEEK_DAY_SHORT } = useLangOption(local)
  const weekDay = WEEK_DAY_SHORT[number]
  return {
    weekDay,
    weekDayIndex: WEEK_DAY_SHORT.indexOf(weekDay)
  }
}

// export const todayObject = () => {
//   const todayDate = new Date()
//   const today = {
//     year: todayDate.getFullYear(),
//     month: todayDate.getMonth(),
//     day: todayDate.getDate(),
//     hours: todayDate.getHours(),
//     minutes: todayDate.getMinutes()
//   }
//   return today
// }

export const getPreviousSundayDay = (date: IDay, local: string) => {
  const { getDay, getDayOfMonth, today, setDayOfMonth } = useLangOption(local)
  const day = getDay(date)
  const dayOfMonth = getDayOfMonth(date)
  const prevSunday = today()
  let previousSundayDay
  if (day === 0) {
    previousSundayDay = setDayOfMonth(prevSunday, dayOfMonth - 7)
  } else {
    previousSundayDay = setDayOfMonth(prevSunday, dayOfMonth - day)
  }
  if (local === 'fa') {
    return getDayOfMonth(previousSundayDay.State.persianAstro)
  }
  const temp = {
    year: previousSundayDay.getFullYear(),
    month: previousSundayDay.getMonth(),
    day: previousSundayDay.getDate()
  }
  return getDayOfMonth(temp)
}

export const getDateTimeStamp = (date: IDay, local?: string) => {
  if (local === 'fa') {
    return new persianDate([date.year, date.month + 1, date.day])
  }
  return new Date(date.year, date.month, date.day).setHours(0, 0, 0, 0)
}
export const compareDateEN = (date1: IDay, date2: IDay) => {
  const fixDate1 = new Date(date1.year, date1.month, date1.day)
  const fixDate2 = new Date(date2.year, date2.month, date2.day)
  if (fixDate1 > fixDate2) {
    return 1
  } else if (fixDate1 < fixDate2) {
    return 2
  }
  return 0
}
export const compareDateFA = (date1: IDay, date2: IDay) => {
  const fixDate1 = new persianDate([date1.year, date1.month + 1, date1.day])
  const fixDate2 = new persianDate([date2.year, date2.month + 1, date2.day])
  if (fixDate1.diff(fixDate2) > 0) {
    return 1
  } else if (fixDate1.diff(fixDate2) < 0) {
    return 2
  }
  return 0
}

export const handelInitialValues = (
  defaultValue: any,
  correctedType: string,
  local: string,
  maxDate?: IDay
) => {
  let initTime
  let initCalender
  let today = new Date()
  let todayP = new persianDate(today).State.persianAstro

  if (maxDate) {
    today = new Date(maxDate.year, maxDate.month, maxDate.day)
    todayP = new persianDate([maxDate.year, maxDate.month, maxDate.day]).State
      .persianAstro
  }

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
    if (defaultValue && defaultValue.length && defaultValue[0]?.year) {
      initCalender = {
        year: defaultValue[0].year,
        month: defaultValue[0].month,
        day: defaultValue[0].day
      }
    }
  }
  if (!initCalender) {
    if (local === 'fa') {
      initCalender = {
        year: todayP.year,
        month: todayP.month,
        day: todayP.day
      }
    } else {
      initCalender = {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate()
      }
    }
  }
  return { initCalender, initTime }
}

export const mergeProviders = (
  onChange: (date: any) => void,
  type: string,
  selectedDate: IDay | IRange | IDay[] | null | undefined,
  selectedTime: ITime | ITimeRange | null | undefined,
  withTime?: boolean
) => {
  if (type === 'single') {
    if ((selectedDate as IDay)?.year) {
      if (withTime) {
        onChange({ ...selectedDate, ...selectedTime })
      } else {
        onChange(selectedDate)
      }
    } else {
      onChange(selectedDate)
    }
  }
  if (type === 'range') {
    if (
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

export const isDayBetween = (
  min: IDay,
  day: IDay,
  max: IDay,
  local: string
) => {
  const selectCompar = {
    en: compareDateEN,
    fa: compareDateFA
  }
  if (
    selectCompar[local](min, day) === 1 &&
    selectCompar[local](max, day) === 2
  )
    return false
  return true
}

// the worst function in this app
export const checkInputValues = (
  defaultValue: any,
  correctedLocal: string,
  correctedType: string,
  maxDate?: IDay,
  minDate?: IDay,
  disabledDates?: IDay[]
) => {
  const selectCompar = {
    en: compareDateEN,
    fa: compareDateFA
  }

  if (!(correctedLocal === 'en' || correctedLocal === 'fa')) {
    throw Error('Local must be "en" or "fa".')
  }
  if (
    !(
      correctedType === 'single' ||
      correctedType === 'range' ||
      correctedType === 'multi'
    )
  ) {
    throw Error('Type must be "single" or "range" or "multi".')
  }
  if (
    maxDate &&
    minDate &&
    selectCompar[correctedLocal](maxDate, minDate) !== 1
  ) {
    throw Error('Max date must be greater than min date.')
  }
  if (
    (correctedType === 'single' &&
      defaultValue &&
      !(
        'year' in defaultValue &&
        'month' in defaultValue &&
        'day' in defaultValue
      )) ||
    defaultValue === 'null' ||
    defaultValue === 'undefined'
  ) {
    throw Error(
      'Default date in single type must contain at least "year", "month", "day" or null.'
    )
  }
  if (
    correctedType === 'range' &&
    defaultValue &&
    (!('to' in defaultValue) || !('from' in defaultValue))
  ) {
    throw Error(
      'Default date in range type must contain "from" and "To" object.'
    )
  }
  if (
    correctedType === 'range' &&
    defaultValue &&
    selectCompar[correctedLocal](defaultValue.to, defaultValue.from) === 2
  ) {
    throw Error('Default "To" date must be grater than default "from" date.')
  }
  if (correctedType === 'multi' && defaultValue) {
    const isThereAnyWrongDate = defaultValue.find((date: any) => {
      return !('year' in date) || !('month' in date) || !('day' in date)
    })

    if (isThereAnyWrongDate) {
      throw Error('Default date in multi type must be a list of dates')
    }
  }

  if (maxDate && defaultValue) {
    if (correctedType === 'single') {
      if (selectCompar[correctedLocal](maxDate, defaultValue) === 2) {
        throw Error('Max date must be greater than default or selected date.')
      }
    } else if (correctedType === 'range' && defaultValue.to) {
      if (selectCompar[correctedLocal](maxDate, defaultValue.to) === 2)
        throw Error(
          'Max date must be greater than default or selected to date.'
        )
    } else if (correctedType === 'multi' && defaultValue.length) {
      const isThereAnyGreater = defaultValue.find(
        (date: IDay) => selectCompar[correctedLocal](maxDate, date) === 2
      )
      if (isThereAnyGreater) {
        throw Error(
          'Max date must be greater than default or selected to date.'
        )
      }
    }
  }
  if (minDate && defaultValue) {
    if (correctedType === 'single') {
      if (selectCompar[correctedLocal](minDate, defaultValue) === 1) {
        throw Error('Default or selected date must be greater than min date.')
      }
    } else if (correctedType === 'range' && defaultValue.from) {
      if (selectCompar[correctedLocal](minDate, defaultValue.from) === 1)
        throw Error('Default or selected date must be greater than min date.')
    } else if (correctedType === 'multi' && defaultValue.length) {
      const isThereAnyGreater = defaultValue.find(
        (date: IDay) => selectCompar[correctedLocal](minDate, date) === 1
      )
      if (isThereAnyGreater) {
        throw Error('Default or selected date must be greater than min date.')
      }
    }
  }
  if (disabledDates) {
    if (
      correctedType === 'single' &&
      defaultValue &&
      disabledDates?.find(
        (date) =>
          genFullDay(date.year, date.month, date.day) ===
          genFullDay(defaultValue.year, defaultValue.month, defaultValue.day)
      )
    ) {
      throw Error('Default Date could not be in disabled list')
    }
    if (
      correctedType === 'range' &&
      defaultValue &&
      disabledDates?.find(
        (date) =>
          genFullDay(date.year, date.month, date.day) ===
            genFullDay(
              defaultValue.from.year,
              defaultValue.from.month,
              defaultValue.from.day
            ) ||
          genFullDay(date.year, date.month, date.day) ===
            genFullDay(
              defaultValue.to.year,
              defaultValue.to.month,
              defaultValue.to.day
            )
      )
    ) {
      throw Error(
        '"FROM" or "TO" in Default Date could not be in disabled list.'
      )
    }
    if (
      correctedType === 'multi' &&
      disabledDates?.find((disDate) => {
        return defaultValue?.find((initDate: IDay) => {
          return (
            genFullDay(disDate.year, disDate.month, disDate.day) ===
            genFullDay(initDate.year, initDate.month, initDate.day)
          )
        })
      })
    ) {
      throw Error('Non of Date in Default Date could not be in disabled list.')
    }
  }
}
