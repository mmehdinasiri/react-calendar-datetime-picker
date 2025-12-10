import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  gregorianToJalali,
  jalaliToGregorian,
  convertToLocale,
  getToday,
  dateToDay,
  dayToDate,
  convertToJsDate
} from '@/utils/date-conversion'
import type { Day, Range, Multi } from '@/types'

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
    it('converts Gregorian Day to Date in UTC', () => {
      const day: Day = { year: 2023, month: 3, day: 21, hour: 10, minute: 30 }
      const date = dayToDate(day, 'gregorian')
      // Date is created in UTC, so we check UTC values to ensure date matches calendar date
      expect(date.getUTCFullYear()).toBe(2023)
      expect(date.getUTCMonth()).toBe(2) // March is 2
      expect(date.getUTCDate()).toBe(21)
      expect(date.getUTCHours()).toBe(10)
      expect(date.getUTCMinutes()).toBe(30)
    })

    it('converts Jalali Day to Date in UTC', () => {
      const day: Day = { year: 1402, month: 1, day: 1, hour: 10, minute: 30 }
      // Should convert to Gregorian (2023-03-21) then to Date
      const date = dayToDate(day, 'jalali')
      expect(date.getUTCFullYear()).toBe(2023)
      expect(date.getUTCMonth()).toBe(2)
      expect(date.getUTCDate()).toBe(21)
      expect(date.getUTCHours()).toBe(10)
      expect(date.getUTCMinutes()).toBe(30)
    })

    it('defaults time to 00:00 if missing', () => {
      const day: Day = { year: 2023, month: 3, day: 21 }
      const date = dayToDate(day, 'gregorian')
      expect(date.getUTCHours()).toBe(0)
      expect(date.getUTCMinutes()).toBe(0)
    })

    it('ensures date matches calendar date regardless of timezone', () => {
      // Test that December 27, 2025 always results in 2025-12-27 in UTC
      const day: Day = { year: 2025, month: 12, day: 27 }
      const date = dayToDate(day, 'gregorian')
      // Should be 2025-12-27T00:00:00.000Z, not 2025-12-26T23:00:00.000Z
      expect(date.toISOString()).toBe('2025-12-27T00:00:00.000Z')
      expect(date.getUTCFullYear()).toBe(2025)
      expect(date.getUTCMonth()).toBe(11) // December is 11 (0-indexed)
      expect(date.getUTCDate()).toBe(27)
    })

    it('handles edge cases like year boundaries in UTC', () => {
      const day: Day = { year: 2024, month: 1, day: 1 }
      const date = dayToDate(day, 'gregorian')
      expect(date.toISOString()).toBe('2024-01-01T00:00:00.000Z')
    })

    it('handles leap year dates in UTC', () => {
      const day: Day = { year: 2024, month: 2, day: 29 }
      const date = dayToDate(day, 'gregorian')
      expect(date.toISOString()).toBe('2024-02-29T00:00:00.000Z')
    })
  })

  describe('convertToJsDate', () => {
    describe('single date selection', () => {
      it('converts Gregorian Day to Date', () => {
        const day: Day = { year: 2025, month: 12, day: 27 }
        const result = convertToJsDate(day, 'single', 'gregorian')
        expect(result).toBeInstanceOf(Date)
        expect((result as Date).toISOString()).toBe('2025-12-27T00:00:00.000Z')
      })

      it('converts Jalali Day to Gregorian Date', () => {
        const day: Day = { year: 1404, month: 9, day: 6 } // Jalali date
        const result = convertToJsDate(day, 'single', 'jalali')
        expect(result).toBeInstanceOf(Date)
        // Should be converted to Gregorian first
        const date = result as Date
        expect(date.getUTCFullYear()).toBeGreaterThan(2024)
      })

      it('handles time in single date', () => {
        const day: Day = {
          year: 2025,
          month: 12,
          day: 27,
          hour: 14,
          minute: 30
        }
        const result = convertToJsDate(day, 'single', 'gregorian')
        const date = result as Date
        expect(date.getUTCHours()).toBe(14)
        expect(date.getUTCMinutes()).toBe(30)
      })

      it('returns null for null input', () => {
        const result = convertToJsDate(null, 'single', 'gregorian')
        expect(result).toBeNull()
      })
    })

    describe('range selection', () => {
      it('converts Range to RangeDate', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 27 },
          to: { year: 2025, month: 12, day: 31 }
        }
        const result = convertToJsDate(range, 'range', 'gregorian')
        expect(result).toHaveProperty('from')
        expect(result).toHaveProperty('to')
        const rangeDate = result as { from: Date | null; to: Date | null }
        expect(rangeDate.from).toBeInstanceOf(Date)
        expect(rangeDate.to).toBeInstanceOf(Date)
        expect(rangeDate.from?.toISOString()).toBe('2025-12-27T00:00:00.000Z')
        expect(rangeDate.to?.toISOString()).toBe('2025-12-31T00:00:00.000Z')
      })

      it('handles incomplete range (to is null)', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 27 },
          to: null
        }
        const result = convertToJsDate(range, 'range', 'gregorian')
        const rangeDate = result as { from: Date | null; to: Date | null }
        expect(rangeDate.from).toBeInstanceOf(Date)
        expect(rangeDate.to).toBeNull()
      })

      it('converts Jalali range to Gregorian RangeDate', () => {
        const range: Range = {
          from: { year: 1404, month: 9, day: 6 },
          to: { year: 1404, month: 9, day: 10 }
        }
        const result = convertToJsDate(range, 'range', 'jalali')
        const rangeDate = result as { from: Date | null; to: Date | null }
        expect(rangeDate.from).toBeInstanceOf(Date)
        expect(rangeDate.to).toBeInstanceOf(Date)
      })
    })

    describe('week selection', () => {
      it('converts Week Range to RangeDate', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 22 },
          to: { year: 2025, month: 12, day: 28 }
        }
        const result = convertToJsDate(range, 'week', 'gregorian')
        expect(result).toHaveProperty('from')
        expect(result).toHaveProperty('to')
        const rangeDate = result as { from: Date | null; to: Date | null }
        expect(rangeDate.from?.toISOString()).toBe('2025-12-22T00:00:00.000Z')
        expect(rangeDate.to?.toISOString()).toBe('2025-12-28T00:00:00.000Z')
      })
    })

    describe('multi selection', () => {
      it('converts Multi to Date array', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 27 },
          { year: 2025, month: 12, day: 28 },
          { year: 2025, month: 12, day: 29 }
        ]
        const result = convertToJsDate(multi, 'multi', 'gregorian')
        expect(Array.isArray(result)).toBe(true)
        const dates = result as Date[]
        expect(dates).toHaveLength(3)
        expect(dates[0].toISOString()).toBe('2025-12-27T00:00:00.000Z')
        expect(dates[1].toISOString()).toBe('2025-12-28T00:00:00.000Z')
        expect(dates[2].toISOString()).toBe('2025-12-29T00:00:00.000Z')
      })

      it('handles empty multi array', () => {
        const multi: Multi = []
        const result = convertToJsDate(multi, 'multi', 'gregorian')
        expect(Array.isArray(result)).toBe(true)
        expect((result as Date[]).length).toBe(0)
      })

      it('converts Jalali multi dates to Gregorian Date array', () => {
        const multi: Multi = [
          { year: 1404, month: 9, day: 6 },
          { year: 1404, month: 9, day: 7 }
        ]
        const result = convertToJsDate(multi, 'multi', 'jalali')
        const dates = result as Date[]
        expect(dates).toHaveLength(2)
        expect(dates[0]).toBeInstanceOf(Date)
        expect(dates[1]).toBeInstanceOf(Date)
      })
    })
  })
})
