import { IDay } from '@/types/type'

export const fixedMonth = (date: IDay | undefined, act?: string) => {
  if (date && date.year) {
    return {
      ...date,
      month: act === 'plus' ? date.month + 1 : date.month - 1
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
    if (type === 'range' && initDate.from && !initDate.to) {
      newDate = {
        from: { ...fixedMonth(initDate.from) },
        to: null
      }
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
export const fixedMonthInitValuePos = (initDate: any, type: string) => {
  let newDate
  if (initDate) {
    if (type === 'single' && initDate.year) {
      newDate = fixedMonth(initDate, 'plus')
    }
    if (type === 'range' && initDate.from && !initDate.to) {
      newDate = {
        from: { ...fixedMonth(initDate.from, 'plus') },
        to: null
      }
    }
    if (type === 'range' && initDate.from && initDate.to) {
      newDate = {
        from: { ...fixedMonth(initDate.from, 'plus') },
        to: { ...fixedMonth(initDate.to, 'plus') }
      }
    }
    if (type === 'multi') {
      newDate = initDate.map((d: IDay) => {
        return { ...fixedMonth(d, 'plus') }
      })
    }
  }
  return newDate
}
