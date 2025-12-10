import { describe, it, expect } from 'vitest'
import {
  toPersianNumeral,
  formatDateForInput,
  formatValueToString,
  parseDateString
} from '@/utils/formatting'
import type { Day, Range, Week, Multi } from '@/types'

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
        expect(formatDateForInput(day, 'persian', 'single')).toBe('۱۴۰۲/۰۱/۰۱')
      })

      it('formats single date with time', () => {
        const dayWithTime: Day = { ...day, hour: 13, minute: 30 }
        expect(formatDateForInput(dayWithTime, 'persian', 'single', true)).toBe(
          '۱۴۰۲/۰۱/۰۱ ۱۳:۳۰'
        )
      })

      it('formats range', () => {
        const range: Range = {
          from: { year: 1402, month: 1, day: 1 },
          to: { year: 1402, month: 1, day: 5 }
        }
        expect(
          formatDateForInput(range, 'persian', 'range', false, 'از', 'تا')
        ).toBe('از ۱۴۰۲/۰۱/۰۱ تا ۱۴۰۲/۰۱/۰۵')
      })

      it('formats week', () => {
        const week: Week = {
          from: { year: 1402, month: 1, day: 1 },
          to: { year: 1402, month: 1, day: 7 }
        }
        expect(formatDateForInput(week, 'persian', 'week')).toBe(
          'هفته: ۱۴۰۲/۰۱/۰۱ - ۱۴۰۲/۰۱/۰۷'
        )
      })

      it('uses custom format with Persian numerals', () => {
        expect(
          formatDateForInput(
            day,
            'persian',
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
        expect(formatDateForInput(day, 'latin', 'single')).toBe('2023/01/01')
      })

      it('formats single date with time', () => {
        const dayWithTime: Day = { ...day, hour: 13, minute: 30 }
        expect(formatDateForInput(dayWithTime, 'latin', 'single', true)).toBe(
          '2023/01/01 13:30'
        )
      })

      it('formats range', () => {
        const range: Range = {
          from: { year: 2023, month: 1, day: 1 },
          to: { year: 2023, month: 1, day: 5 }
        }
        expect(
          formatDateForInput(range, 'latin', 'range', false, 'From', 'To')
        ).toBe('From 2023/01/01 To 2023/01/05')
      })

      it('formats week', () => {
        const week: Week = {
          from: { year: 2023, month: 1, day: 1 },
          to: { year: 2023, month: 1, day: 7 }
        }
        expect(formatDateForInput(week, 'latin', 'week')).toBe(
          'Week: 2023/01/01 - 2023/01/07'
        )
      })

      it('formats multi dates as comma-separated list', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 30 },
          { year: 2025, month: 12, day: 31 }
        ]
        expect(formatDateForInput(multi, 'latin', 'multi')).toBe(
          '2025/12/30,2025/12/31'
        )
      })

      it('formats single date in multi selection', () => {
        const multi: Multi = [{ year: 2025, month: 12, day: 30 }]
        expect(formatDateForInput(multi, 'latin', 'multi')).toBe('2025/12/30')
      })

      it('returns empty string for empty multi array', () => {
        const multi: Multi = []
        expect(formatDateForInput(multi, 'latin', 'multi')).toBe('')
      })

      it('formats multi dates with custom dateFormat', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 30 },
          { year: 2025, month: 12, day: 31 }
        ]
        expect(
          formatDateForInput(
            multi,
            'latin',
            'multi',
            false,
            '',
            '',
            'DD-MM-YYYY'
          )
        ).toBe('30-12-2025,31-12-2025')
      })

      it('formats multi dates with Persian numerals', () => {
        const multi: Multi = [
          { year: 1404, month: 9, day: 9 },
          { year: 1404, month: 9, day: 10 }
        ]
        expect(formatDateForInput(multi, 'persian', 'multi')).toBe(
          '۱۴۰۴/۰۹/۰۹,۱۴۰۴/۰۹/۱۰'
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

  describe('formatValueToString', () => {
    it('returns null for null input', () => {
      expect(formatValueToString(null, 'single', 'latin', false)).toBeNull()
    })

    describe('single date selection', () => {
      it('formats single date', () => {
        const day: Day = { year: 2025, month: 12, day: 27 }
        expect(formatValueToString(day, 'single', 'latin', false)).toBe(
          '2025/12/27'
        )
      })

      it('formats single date with custom dateFormat', () => {
        const day: Day = { year: 2025, month: 12, day: 27 }
        expect(
          formatValueToString(day, 'single', 'latin', false, 'DD-MM-YYYY')
        ).toBe('27-12-2025')
      })

      it('formats single date with time', () => {
        const day: Day = {
          year: 2025,
          month: 12,
          day: 27,
          hour: 14,
          minute: 30
        }
        expect(
          formatValueToString(day, 'single', 'latin', true, undefined, '24')
        ).toBe('2025/12/27 14:30')
      })

      it('formats single date with Persian numerals', () => {
        const day: Day = { year: 1404, month: 9, day: 6 }
        expect(formatValueToString(day, 'single', 'persian', false)).toBe(
          '۱۴۰۴/۰۹/۰۶'
        )
      })
    })

    describe('range selection', () => {
      it('formats complete range', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 27 },
          to: { year: 2025, month: 12, day: 31 }
        }
        expect(
          formatValueToString(
            range,
            'range',
            'latin',
            false,
            undefined,
            '24',
            'from',
            'to'
          )
        ).toBe('from 2025/12/27 to 2025/12/31')
      })

      it('formats incomplete range (to is null)', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 27 },
          to: null
        }
        expect(
          formatValueToString(
            range,
            'range',
            'latin',
            false,
            undefined,
            '24',
            'from',
            'to'
          )
        ).toBe('from 2025/12/27')
      })

      it('formats range with custom labels', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 27 },
          to: { year: 2025, month: 12, day: 31 }
        }
        expect(
          formatValueToString(
            range,
            'range',
            'latin',
            false,
            undefined,
            '24',
            'از',
            'تا'
          )
        ).toBe('از 2025/12/27 تا 2025/12/31')
      })
    })

    describe('week selection', () => {
      it('formats week range', () => {
        const range: Range = {
          from: { year: 2025, month: 12, day: 22 },
          to: { year: 2025, month: 12, day: 28 }
        }
        const result = formatValueToString(range, 'week', 'latin', false)
        expect(result).toContain('Week:')
        expect(result).toContain('2025/12/22')
        expect(result).toContain('2025/12/28')
      })
    })

    describe('multi selection', () => {
      it('formats multi dates as comma-separated list', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 30 },
          { year: 2025, month: 12, day: 31 }
        ]
        expect(formatValueToString(multi, 'multi', 'latin', false)).toBe(
          '2025/12/30,2025/12/31'
        )
      })

      it('formats single date in multi selection', () => {
        const multi: Multi = [{ year: 2025, month: 12, day: 30 }]
        expect(formatValueToString(multi, 'multi', 'latin', false)).toBe(
          '2025/12/30'
        )
      })

      it('formats multiple dates with custom dateFormat', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 30 },
          { year: 2025, month: 12, day: 31 }
        ]
        expect(
          formatValueToString(multi, 'multi', 'latin', false, 'DD-MM-YYYY')
        ).toBe('30-12-2025,31-12-2025')
      })

      it('formats multi dates with Persian numerals', () => {
        const multi: Multi = [
          { year: 1404, month: 9, day: 9 },
          { year: 1404, month: 9, day: 10 }
        ]
        expect(formatValueToString(multi, 'multi', 'persian', false)).toBe(
          '۱۴۰۴/۰۹/۰۹,۱۴۰۴/۰۹/۱۰'
        )
      })

      it('handles many dates in multi selection', () => {
        const multi: Multi = [
          { year: 2025, month: 12, day: 27 },
          { year: 2025, month: 12, day: 28 },
          { year: 2025, month: 12, day: 29 },
          { year: 2025, month: 12, day: 30 },
          { year: 2025, month: 12, day: 31 }
        ]
        const result = formatValueToString(multi, 'multi', 'latin', false)
        expect(result).toBe(
          '2025/12/27,2025/12/28,2025/12/29,2025/12/30,2025/12/31'
        )
      })
    })
  })
})
