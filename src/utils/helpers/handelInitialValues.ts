import jalaali from 'jalaali-js'
import { IDay } from '@/types/type'
import { compareDateEN, compareDateFA } from './comparisonFunctions'
import { isNotUndefined } from './isNotUndefined'

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
    if (
      initValue &&
      initValue.length &&
      initValue[initValue.length - 1]?.year
    ) {
      initCalender = {
        year: initValue[initValue.length - 1].year,
        month: initValue[initValue.length - 1].month,
        day: initValue[initValue.length - 1].day
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
