import { describe, it, expect } from 'vitest'
import {
  isDaySelected,
  isDayInRange,
  isRangeStart,
  isRangeEnd
} from '@/utils/calendar-selection'
import type { Day, Range, Multi } from '@/types'

describe('calendar-selection utils', () => {
  const day: Day = { year: 2023, month: 1, day: 15 }
  const differentDay: Day = { year: 2023, month: 1, day: 16 }

  describe('isDaySelected', () => {
    it('returns false if selectedValue is null', () => {
      expect(isDaySelected(day, null, 'single')).toBe(false)
    })

    describe('single selection', () => {
      it('returns true if day matches selected value', () => {
        const selectedValue = { ...day }
        expect(isDaySelected(day, selectedValue, 'single')).toBe(true)
      })

      it('returns false if day does not match selected value', () => {
        const selectedValue = { ...differentDay }
        expect(isDaySelected(day, selectedValue, 'single')).toBe(false)
      })
    })

    describe('range selection', () => {
      const range: Range = {
        from: { year: 2023, month: 1, day: 10 },
        to: { year: 2023, month: 1, day: 20 }
      }

      it('returns true if day is within range inclusive', () => {
        expect(isDaySelected(day, range, 'range')).toBe(true) // 15 is between 10 and 20
        expect(isDaySelected(range.from, range, 'range')).toBe(true) // Start date
        expect(isDaySelected(range.to, range, 'range')).toBe(true) // End date
      })

      it('returns false if day is outside range', () => {
        const before: Day = { year: 2023, month: 1, day: 9 }
        const after: Day = { year: 2023, month: 1, day: 21 }
        expect(isDaySelected(before, range, 'range')).toBe(false)
        expect(isDaySelected(after, range, 'range')).toBe(false)
      })

      it('returns false if range is incomplete', () => {
        const incompleteRange: Range = { from: day, to: null as any }
        expect(isDaySelected(day, incompleteRange, 'range')).toBe(false)
      })

      it('handles Persian locale (fa)', () => {
        // Range: 10 to 20 Farvardin 1402
        const faRange: Range = {
          from: { year: 1402, month: 1, day: 10 },
          to: { year: 1402, month: 1, day: 20 }
        }
        // Day: 15 Farvardin 1402
        const faDay: Day = { year: 1402, month: 1, day: 15 }

        expect(isDaySelected(faDay, faRange, 'range', 'jalali')).toBe(true)
      })
    })

    describe('multi selection', () => {
      const multi: Multi = [
        { year: 2023, month: 1, day: 10 },
        { year: 2023, month: 1, day: 15 }
      ]

      it('returns true if day is in multi array', () => {
        expect(isDaySelected(day, multi, 'multi')).toBe(true)
      })

      it('returns false if day is not in multi array', () => {
        expect(isDaySelected(differentDay, multi, 'multi')).toBe(false)
      })
    })
  })

  describe('isDayInRange', () => {
    const range: Range = {
      from: { year: 2023, month: 1, day: 10 },
      to: { year: 2023, month: 1, day: 20 }
    }

    it('returns true if day is strictly between from and to', () => {
      expect(isDayInRange(day, range, 'range')).toBe(true) // 15
    })

    it('returns false for start and end dates (boundaries)', () => {
      expect(isDayInRange(range.from, range, 'range')).toBe(false)
      expect(isDayInRange(range.to, range, 'range')).toBe(false)
    })

    it('returns false if type is not range or week', () => {
      expect(isDayInRange(day, range, 'single')).toBe(false)
    })

    it('returns false if value is null', () => {
      expect(isDayInRange(day, null, 'range')).toBe(false)
    })

    it('handles Persian locale (fa)', () => {
      const faRange: Range = {
        from: { year: 1402, month: 1, day: 10 },
        to: { year: 1402, month: 1, day: 20 }
      }
      const faDay: Day = { year: 1402, month: 1, day: 15 }
      const faFrom: Day = { year: 1402, month: 1, day: 10 }

      expect(isDayInRange(faDay, faRange, 'range', 'jalali')).toBe(true)
      expect(isDayInRange(faFrom, faRange, 'range', 'jalali')).toBe(false)
    })
  })

  describe('isRangeStart', () => {
    const range: Range = {
      from: { year: 2023, month: 1, day: 10 },
      to: { year: 2023, month: 1, day: 20 }
    }

    it('returns true if day matches from date', () => {
      expect(isRangeStart(range.from, range, 'range')).toBe(true)
    })

    it('returns false if day does not match from date', () => {
      expect(isRangeStart(day, range, 'range')).toBe(false)
      expect(isRangeStart(range.to, range, 'range')).toBe(false)
    })

    it('returns false for other types', () => {
      expect(isRangeStart(range.from, range, 'single')).toBe(false)
    })
  })

  describe('isRangeEnd', () => {
    const range: Range = {
      from: { year: 2023, month: 1, day: 10 },
      to: { year: 2023, month: 1, day: 20 }
    }

    it('returns true if day matches to date', () => {
      expect(isRangeEnd(range.to, range, 'range')).toBe(true)
    })

    it('returns false if day does not match to date', () => {
      expect(isRangeEnd(day, range, 'range')).toBe(false)
      expect(isRangeEnd(range.from, range, 'range')).toBe(false)
    })

    it('returns false for other types', () => {
      expect(isRangeEnd(range.to, range, 'single')).toBe(false)
    })
  })
})
