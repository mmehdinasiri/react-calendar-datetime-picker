import { IDay } from '@/types/type'
import { compareDateEN, compareDateFA } from './comparisonFunctions'
import { genFullDay } from './generatorsFunctions'

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
    initValue.from &&
    initValue.to &&
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
