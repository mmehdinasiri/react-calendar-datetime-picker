import { describe, it, expect } from 'vitest'
import {
  isBefore,
  isAfter,
  isSameDay,
  isBetween,
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
  addYears,
  subtractYears,
  getDifferenceInDays,
  getDifferenceInMonths,
  getDifferenceInYears,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  convertToJalali,
  convertToGregorian
} from '@/utils/date-comparison'
import type { Day } from '@/types'

describe('date-comparison utils', () => {
  describe('comparisons', () => {
    const day1: Day = { year: 2023, month: 1, day: 1 }
    const day2: Day = { year: 2023, month: 1, day: 2 }
    const day3: Day = { year: 2023, month: 2, day: 1 }

    it('isBefore', () => {
      expect(isBefore(day1, day2)).toBe(true)
      expect(isBefore(day2, day1)).toBe(false)
      expect(isBefore(day1, day1)).toBe(false)
    })

    it('isAfter', () => {
      expect(isAfter(day2, day1)).toBe(true)
      expect(isAfter(day1, day2)).toBe(false)
      expect(isAfter(day1, day1)).toBe(false)
    })

    it('isSameDay', () => {
      expect(isSameDay(day1, day1)).toBe(true)
      expect(isSameDay(day1, { ...day1, hour: 10 })).toBe(true) // Ignores time
      expect(isSameDay(day1, day2)).toBe(false)
    })

    it('isBetween', () => {
      expect(isBetween(day2, day1, day3)).toBe(true)
      expect(isBetween(day1, day1, day3)).toBe(true) // Inclusive start
      expect(isBetween(day3, day1, day3)).toBe(true) // Inclusive end
      expect(isBetween(day2, day3, day1)).toBe(true) // Order shouldn't matter
      expect(isBetween({ year: 2022, month: 12, day: 31 }, day1, day3)).toBe(
        false
      )
    })
  })

  describe('arithmetic', () => {
    it('addDays', () => {
      const start: Day = { year: 2023, month: 1, day: 30 }
      expect(addDays(start, 2)).toEqual({
        year: 2023,
        month: 2,
        day: 1,
        hour: 0,
        minute: 0
      })
      expect(addDays(start, -1)).toEqual({
        year: 2023,
        month: 1,
        day: 29,
        hour: 0,
        minute: 0
      })
    })

    it('subtractDays', () => {
      const start: Day = { year: 2023, month: 2, day: 1 }
      expect(subtractDays(start, 2)).toEqual({
        year: 2023,
        month: 1,
        day: 30,
        hour: 0,
        minute: 0
      })
    })

    it('addMonths', () => {
      const start: Day = { year: 2023, month: 1, day: 31 }
      // Jan 31 + 1 month -> Feb 28 (2023 is not leap)
      expect(addMonths(start, 1)).toEqual({
        year: 2023,
        month: 2,
        day: 28,
        hour: 0,
        minute: 0
      })

      const startLeap: Day = { year: 2024, month: 1, day: 31 }
      // Jan 31 + 1 month -> Feb 29 (2024 is leap)
      expect(addMonths(startLeap, 1)).toEqual({
        year: 2024,
        month: 2,
        day: 29,
        hour: 0,
        minute: 0
      })
    })

    it('subtractMonths', () => {
      const start: Day = { year: 2023, month: 3, day: 31 }
      expect(subtractMonths(start, 1)).toEqual({
        year: 2023,
        month: 2,
        day: 28,
        hour: 0,
        minute: 0
      })
    })

    it('addYears', () => {
      const start: Day = { year: 2023, month: 1, day: 1 }
      expect(addYears(start, 1)).toEqual({
        year: 2024,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0
      })

      const leapDay: Day = { year: 2024, month: 2, day: 29 }
      expect(addYears(leapDay, 1)).toEqual({
        year: 2025,
        month: 2,
        day: 28,
        hour: 0,
        minute: 0
      })
    })

    it('subtractYears', () => {
      const start: Day = { year: 2024, month: 1, day: 1 }
      expect(subtractYears(start, 1)).toEqual({
        year: 2023,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0
      })
    })
  })

  describe('differences', () => {
    it('getDifferenceInDays', () => {
      const day1: Day = { year: 2023, month: 1, day: 1 }
      const day2: Day = { year: 2023, month: 1, day: 10 }
      expect(getDifferenceInDays(day2, day1)).toBe(9)
      expect(getDifferenceInDays(day1, day2)).toBe(-9)
    })

    it('getDifferenceInMonths', () => {
      const day1: Day = { year: 2023, month: 1, day: 1 }
      const day2: Day = { year: 2023, month: 3, day: 15 }
      expect(getDifferenceInMonths(day2, day1)).toBe(2) // Jan to Mar is 2 months diff

      const day3: Day = { year: 2024, month: 1, day: 1 }
      expect(getDifferenceInMonths(day3, day1)).toBe(12)
    })

    it('getDifferenceInYears', () => {
      const day1: Day = { year: 2023, month: 1, day: 1 }
      const day2: Day = { year: 2024, month: 1, day: 1 }
      expect(getDifferenceInYears(day2, day1)).toBe(1)

      const day3: Day = { year: 2024, month: 1, day: 1 } // Exact year
      const day4: Day = { year: 2023, month: 12, day: 31 } // Not quite a year
      expect(getDifferenceInYears(day3, day4)).toBe(0)
    })
  })

  describe('boundaries', () => {
    const day: Day = { year: 2023, month: 5, day: 15, hour: 10, minute: 30 }

    it('startOfDay', () => {
      expect(startOfDay(day)).toEqual({ ...day, hour: 0, minute: 0 })
    })

    it('endOfDay', () => {
      expect(endOfDay(day)).toEqual({ ...day, hour: 23, minute: 59 })
    })

    it('startOfMonth', () => {
      expect(startOfMonth(day)).toEqual({ ...day, day: 1, hour: 0, minute: 0 })
    })

    it('endOfMonth', () => {
      expect(endOfMonth(day)).toEqual({ ...day, day: 31, hour: 23, minute: 59 })

      const febDay: Day = { year: 2023, month: 2, day: 1 }
      expect(endOfMonth(febDay)).toEqual({
        ...febDay,
        day: 28,
        hour: 23,
        minute: 59
      })
    })

    it('startOfYear', () => {
      expect(startOfYear(day)).toEqual({
        ...day,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0
      })
    })

    it('endOfYear', () => {
      expect(endOfYear(day)).toEqual({
        ...day,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59
      })
    })
  })

  describe('conversions', () => {
    it('convertToJalali', () => {
      const gregorian: Day = { year: 2023, month: 3, day: 21 }
      const jalali = convertToJalali(gregorian)
      expect(jalali).toEqual({ year: 1402, month: 1, day: 1 })
    })

    it('convertToGregorian', () => {
      const jalali: Day = { year: 1402, month: 1, day: 1 }
      const gregorian = convertToGregorian(jalali)
      expect(gregorian).toEqual({ year: 2023, month: 3, day: 21 })
    })
  })

  describe('Persian locale (fa)', () => {
    describe('comparisons', () => {
      const d1: Day = { year: 1402, month: 1, day: 1 }
      const d2: Day = { year: 1402, month: 1, day: 2 }

      it('isBefore', () => {
        expect(isBefore(d1, d2, 'jalali')).toBe(true)
        expect(isBefore(d2, d1, 'jalali')).toBe(false)
      })

      it('isAfter', () => {
        expect(isAfter(d2, d1, 'jalali')).toBe(true)
        expect(isAfter(d1, d2, 'jalali')).toBe(false)
      })

      it('isSameDay', () => {
        expect(isSameDay(d1, { ...d1 }, 'jalali')).toBe(true)
        expect(isSameDay(d1, d2, 'jalali')).toBe(false)
      })
    })

    describe('arithmetic', () => {
      it('addMonths handles Jalali month lengths', () => {
        // 31 Ordibehesht 1402 -> +1 month -> 31 Khordad 1402 (both have 31 days)
        const start: Day = { year: 1402, month: 2, day: 31 }
        const nextMonth = addMonths(start, 1, 'jalali')
        expect(nextMonth).toEqual({
          year: 1402,
          month: 3,
          day: 31,
          hour: 0,
          minute: 0
        })

        // 31 Shahrivar 1402 -> +1 month -> 30 Mehr 1402 (Mehr has 30 days)
        const startShahrivar: Day = { year: 1402, month: 6, day: 31 }
        const nextMonthMehr = addMonths(startShahrivar, 1, 'jalali')
        expect(nextMonthMehr).toEqual({
          year: 1402,
          month: 7,
          day: 30,
          hour: 0,
          minute: 0
        })
      })

      it('addMonths crosses Jalali year boundary', () => {
        // 29 Esfand 1402 -> +1 month -> 29 Farvardin 1403
        const start: Day = { year: 1402, month: 12, day: 29 }
        const nextMonth = addMonths(start, 1, 'jalali')
        expect(nextMonth).toEqual({
          year: 1403,
          month: 1,
          day: 29,
          hour: 0,
          minute: 0
        })
      })

      it('subtractMonths crosses Jalali year boundary', () => {
        // 10 Farvardin 1403 -> -1 month -> 10 Esfand 1402
        const start: Day = { year: 1403, month: 1, day: 10 }
        const prevMonth = subtractMonths(start, 1, 'jalali')
        expect(prevMonth).toEqual({
          year: 1402,
          month: 12,
          day: 10,
          hour: 0,
          minute: 0
        })
      })

      it('addYears handles Jalali leap year to non-leap year', () => {
        // 30 Esfand 1403 (leap) -> +1 year -> 29 Esfand 1404 (non-leap)
        const leapDay: Day = { year: 1403, month: 12, day: 30 }
        const nextYear = addYears(leapDay, 1, 'jalali')
        expect(nextYear).toEqual({
          year: 1404,
          month: 12,
          day: 29,
          hour: 0,
          minute: 0
        })
      })
    })

    describe('differences', () => {
      it('getDifferenceInDays works for Jalali dates', () => {
        const d1: Day = { year: 1402, month: 1, day: 1 }
        const d2: Day = { year: 1402, month: 1, day: 10 }
        // 9 days diff
        expect(getDifferenceInDays(d2, d1, 'jalali')).toBe(9)

        // Across months (Farvardin has 31 days)
        // 1 Farvardin to 1 Ordibehesht = 31 days
        const d3: Day = { year: 1402, month: 2, day: 1 }
        expect(getDifferenceInDays(d3, d1, 'jalali')).toBe(31)
      })

      it('getDifferenceInYears works correctly for Jalali', () => {
        const d1: Day = { year: 1402, month: 1, day: 1 }
        const d2: Day = { year: 1403, month: 1, day: 1 }
        expect(getDifferenceInYears(d2, d1, 'jalali')).toBe(1)
      })
    })

    it('endOfMonth handles Jalali leap years', () => {
      // 1403 is a leap year, Esfand has 30 days
      const esfand1403: Day = { year: 1403, month: 12, day: 1 }
      expect(endOfMonth(esfand1403, 'jalali')).toEqual({
        year: 1403,
        month: 12,
        day: 30,
        hour: 23,
        minute: 59
      })

      // 1402 is NOT a leap year, Esfand has 29 days
      const esfand1402: Day = { year: 1402, month: 12, day: 1 }
      expect(endOfMonth(esfand1402, 'jalali')).toEqual({
        year: 1402,
        month: 12,
        day: 29,
        hour: 23,
        minute: 59
      })
    })
  })
})
