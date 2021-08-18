import jalaali from 'jalaali-js'
import { IDay, IRange, ITime, ITimeRange } from 'src/type'
import { useLangOption } from '../hooks/useLangOption'

export const getNumberOfDaysInMonth = (
  year: number,
  month: number,
  local?: string
): number => {
  if (local === 'fa') {
    return jalaali.jalaaliMonthLength(year, month + 1)
  } else {
    return new Date(year, month + 1, 0).getDate()
  }
}

export const genFullDay = (year: number, month: number, day: number) => {
  return `${year}${addZero(month)}${addZero(day)}`
}

export const genFullIDay = (
  date: IDay | null | undefined,
  isCorrectMonth: boolean = false,
  withTime?: boolean
) => {
  if (date) {
    if (withTime && date.hour && date.minute) {
      return `${date.year}/${addZero(
        date.month + (isCorrectMonth ? +1 : 0)
      )}/${addZero(date.day)} ${addZero(date.hour)}:${addZero(date.minute)}`
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

export const getWeekday = (number: number, local: string) => {
  const weekStartIndex = local === 'fa' ? 1 : 0
  const { WEEK_DAY_SHORT } = useLangOption(local)
  const weekDay = WEEK_DAY_SHORT[number]
  return {
    weekDay,
    weekDayIndex: WEEK_DAY_SHORT.indexOf(weekDay) + weekStartIndex
  }
}

export const getDateTimeStamp = (date: IDay, local?: string) => {
  if (local === 'fa') {
    return jalaali.j2d(date.year, date.month + 1, date.day)
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
  const fixDate1 = jalaali.j2d(date1.year, date1.month + 1, date1.day)
  const fixDate2 = jalaali.j2d(date2.year, date2.month + 1, date2.day)
  if (fixDate1 > fixDate2) {
    return 1
  } else if (fixDate1 < fixDate2) {
    return 2
  }
  return 0
}

export const handelInitialValues = (
  initValue: any,
  correctedType: string,
  local: string,
  maxDate?: IDay,
  minDate?: IDay
) => {
  let initTime
  let initCalender
  let today = new Date()
  let todayP = jalaali.toJalaali(today)
  const selectCompar = {
    en: compareDateEN,
    fa: compareDateFA
  }

  if (maxDate) {
    if (
      local === 'fa' &&
      maxDate &&
      selectCompar[local](maxDate, {
        year: todayP.jy,
        month: todayP.jm,
        day: todayP.jd
      }) === 2
    ) {
      todayP = { jy: maxDate.year, jm: maxDate.month + 1, jd: maxDate.day }
    } else if (
      local === 'en' &&
      selectCompar[local](maxDate, {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate()
      }) === 2
    ) {
      today = new Date(maxDate.year, maxDate.month, maxDate.day)
    }
  }
  if (minDate) {
    if (
      local === 'fa' &&
      maxDate &&
      selectCompar[local](minDate, {
        year: todayP.jy,
        month: todayP.jm,
        day: todayP.jd
      }) === 1
    ) {
      todayP = { jy: minDate.year, jm: minDate.month + 1, jd: minDate.day }
    } else if (
      local === 'en' &&
      selectCompar[local](minDate, {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate()
      }) === 1
    ) {
      today = new Date(minDate.year, minDate.month, minDate.day)
    }
  }

  if (correctedType === 'single') {
    if (initValue?.year) {
      initCalender = {
        year: initValue.year,
        month: initValue.month,
        day: initValue.day
      }
    }
    initTime = {
      hour: isNotUndefined(initValue?.hour, today.getHours()),
      minute: isNotUndefined(initValue?.minute, today.getMinutes())
    }
  }
  if (correctedType === 'range') {
    if (initValue?.from) {
      initCalender = {
        year: initValue.from.year,
        month: initValue.from.month,
        day: initValue.from.day
      }
    }

    initTime = {
      from: {
        hour: isNotUndefined(initValue?.from?.hour, today.getHours()),
        minute: isNotUndefined(initValue?.from?.minute, today.getMinutes())
      },
      to: {
        hour: isNotUndefined(initValue?.to?.hour, today.getHours()),
        minute: isNotUndefined(initValue?.to?.minute, today.getMinutes())
      }
    }
  }
  if (correctedType === 'multi') {
    if (initValue && initValue.length && initValue[0]?.year) {
      initCalender = {
        year: initValue[0].year,
        month: initValue[0].month,
        day: initValue[0].day
      }
    }
  }
  if (!initCalender) {
    if (local === 'fa') {
      initCalender = {
        year: todayP.jy,
        month: todayP.jm - 1,
        day: todayP.jd
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
  onCalenderChange?: any,
  withTime?: boolean
) => {
  let updatedValue = null
  if (type === 'single') {
    if ((selectedDate as IDay)?.year) {
      if (withTime) {
        updatedValue = {
          ...selectedDate,
          month: (selectedDate as IDay)?.month + 1,
          ...selectedTime
        }
      } else {
        updatedValue = {
          ...selectedDate,
          month: (selectedDate as IDay)?.month + 1
        }
      }
    }
  }
  if (type === 'range') {
    if (
      selectedDate &&
      (selectedDate as IRange).from?.year &&
      (selectedDate as IRange).to?.year
    ) {
      if (withTime) {
        updatedValue = {
          from: {
            ...(selectedDate as IRange).from,
            month: (selectedDate as IRange).from?.month! + 1,
            ...(selectedTime as ITimeRange).from
          },
          to: {
            ...(selectedDate as IRange).to,
            month: (selectedDate as IRange).to?.month! + 1,
            ...(selectedTime as ITimeRange).to
          }
        }
      } else {
        updatedValue = {
          from: {
            ...(selectedDate as IRange).from,
            month: (selectedDate as IRange).from?.month! + 1
          },
          to: {
            ...(selectedDate as IRange).to,
            month: (selectedDate as IRange).to?.month! + 1
          }
        }
      }
    }
  } else if (type === 'multi' && selectedDate) {
    updatedValue = (selectedDate as IDay[]).map((d: IDay) => {
      return {
        ...d,
        month: d.month + 1
      }
    })
  }
  onChange(updatedValue || selectedDate)
  if (onCalenderChange) {
    if (type === 'range') {
      if ((selectedDate as IRange).from && (selectedDate as IRange).to) {
        onCalenderChange(updatedValue)
      }
    } else {
      onCalenderChange(updatedValue)
    }
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
  initValue: any,
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
      initValue &&
      !('year' in initValue && 'month' in initValue && 'day' in initValue)) ||
    initValue === 'null' ||
    initValue === 'undefined'
  ) {
    throw Error(
      'Default date in single type must contain at least "year", "month", "day" or null.'
    )
  }
  if (
    correctedType === 'range' &&
    initValue &&
    (!('to' in initValue) || !('from' in initValue))
  ) {
    throw Error(
      'Default date in range type must contain "from" and "To" object.'
    )
  }
  if (
    correctedType === 'range' &&
    initValue &&
    selectCompar[correctedLocal](initValue.to, initValue.from) === 2
  ) {
    throw Error('Default "To" date must be grater than default "from" date.')
  }
  if (correctedType === 'multi' && initValue) {
    const isThereAnyWrongDate = initValue.find((date: any) => {
      return !('year' in date) || !('month' in date) || !('day' in date)
    })

    if (isThereAnyWrongDate) {
      throw Error('Default date in multi type must be a list of dates')
    }
  }

  if (maxDate && initValue) {
    if (correctedType === 'single') {
      if (selectCompar[correctedLocal](maxDate, initValue) === 2) {
        throw Error('Max date must be greater than default or selected date.')
      }
    } else if (correctedType === 'range' && initValue.to) {
      if (selectCompar[correctedLocal](maxDate, initValue.to) === 2)
        throw Error(
          'Max date must be greater than default or selected to date.'
        )
    } else if (correctedType === 'multi' && initValue.length) {
      const isThereAnyGreater = initValue.find(
        (date: IDay) => selectCompar[correctedLocal](maxDate, date) === 2
      )
      if (isThereAnyGreater) {
        throw Error(
          'Max date must be greater than default or selected to date.'
        )
      }
    }
  }
  if (minDate && initValue) {
    if (correctedType === 'single') {
      if (selectCompar[correctedLocal](minDate, initValue) === 1) {
        throw Error('Default or selected date must be greater than min date.')
      }
    } else if (correctedType === 'range' && initValue.from) {
      if (selectCompar[correctedLocal](minDate, initValue.from) === 1)
        throw Error('Default or selected date must be greater than min date.')
    } else if (correctedType === 'multi' && initValue.length) {
      const isThereAnyGreater = initValue.find(
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
      initValue &&
      disabledDates?.find(
        (date) =>
          genFullDay(date.year, date.month, date.day) ===
          genFullDay(initValue.year, initValue.month, initValue.day)
      )
    ) {
      throw Error('Default Date could not be in disabled list')
    }
    if (
      correctedType === 'range' &&
      initValue &&
      disabledDates?.find(
        (date) =>
          genFullDay(date.year, date.month, date.day) ===
            genFullDay(
              initValue.from.year,
              initValue.from.month,
              initValue.from.day
            ) ||
          genFullDay(date.year, date.month, date.day) ===
            genFullDay(initValue.to.year, initValue.to.month, initValue.to.day)
      )
    ) {
      throw Error(
        '"FROM" or "TO" in Default Date could not be in disabled list.'
      )
    }
    if (
      correctedType === 'multi' &&
      disabledDates?.find((disDate) => {
        return initValue?.find((initDate: IDay) => {
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

export const fixedMonth = (date: IDay | undefined) => {
  if (date && date.year) {
    return {
      ...date,
      month: date.month - 1
    }
  }
  return date
}
export const fixedMonthInitValue = (initDate: any, type: string) => {
  let newDate
  if (initDate) {
    if (type === 'single' && initDate.year) {
      newDate = fixedMonth(initDate)
    }
    if (type === 'range' && initDate.from && initDate.to) {
      newDate = {
        from: { ...fixedMonth(initDate.from) },
        to: { ...fixedMonth(initDate.to) }
      }
    }
    if (type === 'multi') {
      newDate = initDate.map((d: IDay) => {
        return { ...fixedMonth(d) }
      })
    }
  }
  return newDate
}

export const toPersianNumber = (englishNumber: number | string): string => {
  if (!englishNumber) return ''

  const persianNumber = String(englishNumber).replace(
    /\d/g,
    (d) => '۰۱۲۳۴۵۶۷۸۹'[d]
  )
  return persianNumber
}

export const isNotUndefined = (value: any, alternativeValue: any) => {
  if (typeof value !== 'undefined') {
    return value
  }
  return alternativeValue
}
