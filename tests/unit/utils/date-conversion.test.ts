import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  gregorianToJalali,
  jalaliToGregorian,
  convertToLocale,
  getToday,
  dateToDay,
  dayToDate
} from '@/utils/date-conversion'
import type { Day } from '@/types'

describe('date-conversion utils', () => {
  describe('gregorianToJalali', () => {
    it('converts standard Gregorian date to Jalali', () => {
      // 2023-03-21 -> 1402-01-01
      const gregorian: Day = { year: 2023, month: 3, day: 21 }
      const jalali = gregorianToJalali(gregorian)
      expect(jalali).toEqual({
        year: 1402,
        month: 1,
        day: 1,
        hour: undefined,
        minute: undefined
      })
    })

    it('converts Gregorian leap year date to Jalali', () => {
      // 2024-02-29 -> 1402-12-10
      const gregorian: Day = { year: 2024, month: 2, day: 29 }
      const jalali = gregorianToJalali(gregorian)
      expect(jalali).toEqual({
        year: 1402,
        month: 12,
        day: 10,
        hour: undefined,
        minute: undefined
      })
    })

    it('preserves time', () => {
      const gregorian: Day = {
        year: 2023,
        month: 3,
        day: 21,
        hour: 10,
        minute: 30
      }
      const jalali = gregorianToJalali(gregorian)
      expect(jalali).toEqual({
        year: 1402,
        month: 1,
        day: 1,
        hour: 10,
        minute: 30
      })
    })
  })

  describe('jalaliToGregorian', () => {
    it('converts standard Jalali date to Gregorian', () => {
      // 1402-01-01 -> 2023-03-21
      const jalali: Day = { year: 1402, month: 1, day: 1 }
      const gregorian = jalaliToGregorian(jalali)
      expect(gregorian).toEqual({
        year: 2023,
        month: 3,
        day: 21,
        hour: undefined,
        minute: undefined
      })
    })

    it('converts Jalali leap year date to Gregorian', () => {
      // 1403-12-30 -> 2025-03-20
      const jalali: Day = { year: 1403, month: 12, day: 30 }
      const gregorian = jalaliToGregorian(jalali)
      expect(gregorian).toEqual({
        year: 2025,
        month: 3,
        day: 20,
        hour: undefined,
        minute: undefined
      })
    })

    it('preserves time', () => {
      const jalali: Day = { year: 1402, month: 1, day: 1, hour: 10, minute: 30 }
      const gregorian = jalaliToGregorian(jalali)
      expect(gregorian).toEqual({
        year: 2023,
        month: 3,
        day: 21,
        hour: 10,
        minute: 30
      })
    })
  })

  describe('convertToLocale', () => {
    const gregorian: Day = { year: 2023, month: 3, day: 21 }
    const jalali: Day = { year: 1402, month: 1, day: 1 }

    it('converts from Gregorian to Jalali', () => {
      expect(convertToLocale(gregorian, 'gregorian', 'jalali')).toEqual(
        expect.objectContaining(jalali)
      )
    })

    it('converts from Jalali to Gregorian', () => {
      expect(convertToLocale(jalali, 'jalali', 'gregorian')).toEqual(
        expect.objectContaining(gregorian)
      )
    })

    it('returns as-is if source and target locales are the same', () => {
      expect(convertToLocale(jalali, 'jalali', 'jalali')).toEqual(jalali)
      expect(convertToLocale(gregorian, 'gregorian', 'gregorian')).toEqual(
        gregorian
      )
    })
  })

  describe('getToday', () => {
    beforeEach(() => {
      const mockDate = new Date(2023, 2, 21, 12, 0, 0) // March 21, 2023 (1402-01-01)
      vi.useFakeTimers()
      vi.setSystemTime(mockDate)
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns today in Gregorian', () => {
      const today = getToday('gregorian')
      expect(today).toEqual({ year: 2023, month: 3, day: 21 })
    })

    it('returns today in Jalali', () => {
      const today = getToday('jalali')
      expect(today).toEqual({ year: 1402, month: 1, day: 1 })
    })
  })

  describe('dateToDay', () => {
    const date = new Date(2023, 2, 21, 10, 30, 0) // March 21, 2023 10:30

    it('converts Date to Gregorian Day', () => {
      expect(dateToDay(date, 'gregorian')).toEqual({
        year: 2023,
        month: 3,
        day: 21,
        hour: 10,
        minute: 30
      })
    })

    it('converts Date to Jalali Day', () => {
      expect(dateToDay(date, 'jalali')).toEqual({
        year: 1402,
        month: 1,
        day: 1,
        hour: 10,
        minute: 30
      })
    })
  })

  describe('dayToDate', () => {
    it('converts Gregorian Day to Date', () => {
      const day: Day = { year: 2023, month: 3, day: 21, hour: 10, minute: 30 }
      const date = dayToDate(day, 'gregorian')
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(2) // March is 2
      expect(date.getDate()).toBe(21)
      expect(date.getHours()).toBe(10)
      expect(date.getMinutes()).toBe(30)
    })

    it('converts Jalali Day to Date', () => {
      const day: Day = { year: 1402, month: 1, day: 1, hour: 10, minute: 30 }
      // Should convert to Gregorian (2023-03-21) then to Date
      const date = dayToDate(day, 'jalali')
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(2)
      expect(date.getDate()).toBe(21)
      expect(date.getHours()).toBe(10)
      expect(date.getMinutes()).toBe(30)
    })

    it('defaults time to 00:00 if missing', () => {
      const day: Day = { year: 2023, month: 3, day: 21 }
      const date = dayToDate(day, 'gregorian')
      expect(date.getHours()).toBe(0)
      expect(date.getMinutes()).toBe(0)
    })
  })
})
