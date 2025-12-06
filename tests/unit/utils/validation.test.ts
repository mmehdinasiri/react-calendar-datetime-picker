import { describe, it, expect } from 'vitest'
import {
  getDaysInMonth,
  isValidDay,
  isDateInRange,
  isDateInDisabledList
} from '@/utils/validation'
import type { Day } from '@/types'

describe('validation utils', () => {
  describe('getDaysInMonth', () => {
    it('returns correct days for Gregorian months', () => {
      expect(getDaysInMonth(2023, 1, 'gregorian')).toBe(31)
      expect(getDaysInMonth(2023, 2, 'gregorian')).toBe(28) // Non-leap
      expect(getDaysInMonth(2024, 2, 'gregorian')).toBe(29) // Leap
      expect(getDaysInMonth(2023, 4, 'gregorian')).toBe(30)
    })

    it('returns correct days for Jalali months', () => {
      // First 6 months: 31 days
      expect(getDaysInMonth(1402, 1, 'jalali')).toBe(31)
      expect(getDaysInMonth(1402, 6, 'jalali')).toBe(31)

      // Next 5 months: 30 days
      expect(getDaysInMonth(1402, 7, 'jalali')).toBe(30)
      expect(getDaysInMonth(1402, 11, 'jalali')).toBe(30)

      // Esfand: 29 or 30 days
      expect(getDaysInMonth(1402, 12, 'jalali')).toBe(29) // Non-leap
      expect(getDaysInMonth(1403, 12, 'jalali')).toBe(30) // Leap
    })
  })

  describe('isValidDay', () => {
    it('validates Gregorian dates', () => {
      expect(isValidDay({ year: 2023, month: 1, day: 31 }, 'gregorian')).toBe(
        true
      )
      expect(isValidDay({ year: 2023, month: 2, day: 29 }, 'gregorian')).toBe(
        false
      )
      expect(isValidDay({ year: 2024, month: 2, day: 29 }, 'gregorian')).toBe(
        true
      )
      expect(isValidDay({ year: 2023, month: 13, day: 1 }, 'gregorian')).toBe(
        false
      )
    })

    it('validates Jalali dates', () => {
      expect(isValidDay({ year: 1402, month: 1, day: 31 }, 'jalali')).toBe(true)
      expect(isValidDay({ year: 1402, month: 12, day: 30 }, 'jalali')).toBe(
        false
      ) // Non-leap
      expect(isValidDay({ year: 1403, month: 12, day: 30 }, 'jalali')).toBe(
        true
      ) // Leap
      expect(isValidDay({ year: 1402, month: 7, day: 31 }, 'jalali')).toBe(
        false
      ) // Mehr has 30 days
    })
  })

  describe('isDateInRange', () => {
    describe('Jalali locale (fa)', () => {
      const minDate: Day = { year: 1402, month: 1, day: 10 }
      const maxDate: Day = { year: 1402, month: 1, day: 20 }

      it('validates Jalali range', () => {
        const inRange: Day = { year: 1402, month: 1, day: 15 }
        const before: Day = { year: 1402, month: 1, day: 5 }
        const after: Day = { year: 1402, month: 1, day: 25 }

        expect(isDateInRange(inRange, minDate, maxDate, 'jalali')).toBe(true)
        expect(isDateInRange(before, minDate, maxDate, 'jalali')).toBe(false)
        expect(isDateInRange(after, minDate, maxDate, 'jalali')).toBe(false)
      })

      it('handles inclusive boundaries for Jalali', () => {
        expect(isDateInRange(minDate, minDate, maxDate, 'jalali')).toBe(true)
        expect(isDateInRange(maxDate, minDate, maxDate, 'jalali')).toBe(true)
      })
    })

    describe('Gregorian locale (en)', () => {
      const minDate: Day = { year: 2023, month: 1, day: 10 }
      const maxDate: Day = { year: 2023, month: 1, day: 20 }

      it('validates Gregorian range', () => {
        const inRange: Day = { year: 2023, month: 1, day: 15 }
        const before: Day = { year: 2023, month: 1, day: 5 }
        const after: Day = { year: 2023, month: 1, day: 25 }

        expect(isDateInRange(inRange, minDate, maxDate, 'gregorian')).toBe(true)
        expect(isDateInRange(before, minDate, maxDate, 'gregorian')).toBe(false)
        expect(isDateInRange(after, minDate, maxDate, 'gregorian')).toBe(false)
      })

      it('handles inclusive boundaries for Gregorian', () => {
        expect(isDateInRange(minDate, minDate, maxDate, 'gregorian')).toBe(true)
        expect(isDateInRange(maxDate, minDate, maxDate, 'gregorian')).toBe(true)
      })
    })
  })

  describe('isDateInDisabledList', () => {
    describe('Jalali locale (fa)', () => {
      const disabledDates: Day[] = [
        { year: 1402, month: 1, day: 15 },
        { year: 1402, month: 12, day: 29 }
      ]

      it('checks disabled dates for Jalali', () => {
        expect(
          isDateInDisabledList(
            { year: 1402, month: 1, day: 15 },
            disabledDates,
            'jalali'
          )
        ).toBe(true)
        expect(
          isDateInDisabledList(
            { year: 1402, month: 1, day: 14 },
            disabledDates,
            'jalali'
          )
        ).toBe(false)
      })
    })

    describe('Gregorian locale (en)', () => {
      const disabledDates: Day[] = [
        { year: 2023, month: 1, day: 15 },
        { year: 2023, month: 12, day: 31 }
      ]

      it('checks disabled dates for Gregorian', () => {
        expect(
          isDateInDisabledList(
            { year: 2023, month: 1, day: 15 },
            disabledDates,
            'gregorian'
          )
        ).toBe(true)
        expect(
          isDateInDisabledList(
            { year: 2023, month: 1, day: 14 },
            disabledDates,
            'gregorian'
          )
        ).toBe(false)
      })
    })
  })
})
