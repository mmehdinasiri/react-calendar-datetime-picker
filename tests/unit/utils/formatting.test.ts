import { describe, it, expect } from 'vitest'
import {
  toPersianNumeral,
  formatDateForInput,
  parseDateString
} from '@/utils/formatting'
import type { Day, Range, Week } from '@/types'

describe('formatting utils', () => {
  describe('toPersianNumeral', () => {
    it('converts english digits to persian', () => {
      expect(toPersianNumeral(1234567890)).toBe('۱۲۳۴۵۶۷۸۹۰')
      expect(toPersianNumeral('123')).toBe('۱۲۳')
    })

    it('keeps non-digits unchanged', () => {
      expect(toPersianNumeral('1402/10/01')).toBe('۱۴۰۲/۱۰/۰۱')
      expect(toPersianNumeral('Time: 12:30')).toBe('Time: ۱۲:۳۰')
    })
  })

  describe('formatDateForInput', () => {
    describe('Jalali locale (fa)', () => {
      const day: Day = { year: 1402, month: 1, day: 1 }

      it('formats single date', () => {
        expect(formatDateForInput(day, 'jalali', 'single')).toBe('۱۴۰۲/۰۱/۰۱')
      })

      it('formats single date with time', () => {
        const dayWithTime: Day = { ...day, hour: 13, minute: 30 }
        expect(formatDateForInput(dayWithTime, 'jalali', 'single', true)).toBe(
          '۱۴۰۲/۰۱/۰۱ ۱۳:۳۰'
        )
      })

      it('formats range', () => {
        const range: Range = {
          from: { year: 1402, month: 1, day: 1 },
          to: { year: 1402, month: 1, day: 5 }
        }
        expect(
          formatDateForInput(range, 'jalali', 'range', false, 'از', 'تا')
        ).toBe('از ۱۴۰۲/۰۱/۰۱ تا ۱۴۰۲/۰۱/۰۵')
      })

      it('formats week', () => {
        const week: Week = {
          from: { year: 1402, month: 1, day: 1 },
          to: { year: 1402, month: 1, day: 7 }
        }
        expect(formatDateForInput(week, 'jalali', 'week')).toBe(
          'هفته: ۱۴۰۲/۰۱/۰۱ - ۱۴۰۲/۰۱/۰۷'
        )
      })

      it('uses custom format with Persian numerals', () => {
        expect(
          formatDateForInput(
            day,
            'jalali',
            'single',
            false,
            '',
            '',
            'YYYY-MM-DD'
          )
        ).toBe('۱۴۰۲-۰۱-۰۱')
      })
    })

    describe('Gregorian locale (en)', () => {
      const day: Day = { year: 2023, month: 1, day: 1 }

      it('formats single date', () => {
        expect(formatDateForInput(day, 'gregorian', 'single')).toBe(
          '2023/01/01'
        )
      })

      it('formats single date with time', () => {
        const dayWithTime: Day = { ...day, hour: 13, minute: 30 }
        expect(
          formatDateForInput(dayWithTime, 'gregorian', 'single', true)
        ).toBe('2023/01/01 13:30')
      })

      it('formats range', () => {
        const range: Range = {
          from: { year: 2023, month: 1, day: 1 },
          to: { year: 2023, month: 1, day: 5 }
        }
        expect(
          formatDateForInput(range, 'gregorian', 'range', false, 'From', 'To')
        ).toBe('From 2023/01/01 To 2023/01/05')
      })

      it('formats week', () => {
        const week: Week = {
          from: { year: 2023, month: 1, day: 1 },
          to: { year: 2023, month: 1, day: 7 }
        }
        expect(formatDateForInput(week, 'gregorian', 'week')).toBe(
          'Week: 2023/01/01 - 2023/01/07'
        )
      })
    })
  })

  describe('parseDateString', () => {
    describe('Jalali locale (fa)', () => {
      it('parses english numerals', () => {
        expect(parseDateString('1402/01/01', 'jalali')).toEqual({
          year: 1402,
          month: 1,
          day: 1
        })
      })

      it('parses persian numerals', () => {
        expect(parseDateString('۱۴۰۲/۰۱/۰۱', 'jalali')).toEqual({
          year: 1402,
          month: 1,
          day: 1
        })
      })

      it('parses different separators', () => {
        expect(parseDateString('1402-01-01', 'jalali')).toEqual({
          year: 1402,
          month: 1,
          day: 1
        })
        expect(parseDateString('۱۴۰۲.۰۱.۰۱', 'jalali')).toEqual({
          year: 1402,
          month: 1,
          day: 1
        })
      })
    })

    describe('Gregorian locale (en)', () => {
      it('parses standard date strings', () => {
        expect(parseDateString('2023/01/01', 'gregorian')).toEqual({
          year: 2023,
          month: 1,
          day: 1
        })
        expect(parseDateString('2023-01-01', 'gregorian')).toEqual({
          year: 2023,
          month: 1,
          day: 1
        })
      })
    })

    it('returns null for structurally invalid strings', () => {
      expect(parseDateString('invalid', 'jalali')).toBeNull()
      expect(parseDateString('invalid', 'gregorian')).toBeNull()
      // parseDateString only checks if parts are numbers, validation happens later
      expect(parseDateString('1402/13/1', 'jalali')).toEqual({
        year: 1402,
        month: 13,
        day: 1
      })
    })
  })
})
