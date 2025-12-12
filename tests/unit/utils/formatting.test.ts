import { describe, it, expect } from 'vitest'
import {
  toPersianNumeral,
  formatDateForInput,
  formatValueToString,
  parseDateString,
  parseAndValidateDate
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

    describe('with dateFormat parameter', () => {
      it('parses DD/MM/YYYY format', () => {
        expect(
          parseDateString('25/12/2024', 'gregorian', 'DD/MM/YYYY')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses MM-DD-YYYY format', () => {
        expect(
          parseDateString('12-25-2024', 'gregorian', 'MM-DD-YYYY')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses YYYY.MM.DD format with custom separator', () => {
        expect(
          parseDateString('2024.12.25', 'gregorian', 'YYYY.MM.DD')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses DD+MM+YYYY format with + separator', () => {
        expect(
          parseDateString('25+12+2024', 'gregorian', 'DD+MM+YYYY')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses DD-MM-YYYY format', () => {
        expect(
          parseDateString('25-12-2024', 'gregorian', 'DD-MM-YYYY')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses MM/DD/YYYY format', () => {
        expect(
          parseDateString('12/25/2024', 'gregorian', 'MM/DD/YYYY')
        ).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses Jalali dates with DD/MM/YYYY format', () => {
        expect(parseDateString('05/10/1403', 'jalali', 'DD/MM/YYYY')).toEqual({
          year: 1403,
          month: 10,
          day: 5
        })
      })

      it('parses Jalali dates with Persian numerals and format', () => {
        expect(parseDateString('۰۵/۱۰/۱۴۰۳', 'jalali', 'DD/MM/YYYY')).toEqual({
          year: 1403,
          month: 10,
          day: 5
        })
      })

      it('falls back to default parsing for invalid format', () => {
        // Invalid format (missing YYYY, MM, or DD) should fall back to default
        expect(parseDateString('2024/12/25', 'gregorian', 'INVALID')).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('handles single digit days and months', () => {
        expect(parseDateString('5/1/2024', 'gregorian', 'DD/MM/YYYY')).toEqual({
          year: 2024,
          month: 1,
          day: 5
        })
      })

      it('returns null when date string does not match format separator', () => {
        // Format expects / but string has -
        expect(
          parseDateString('25-12-2024', 'gregorian', 'DD/MM/YYYY')
        ).toBeNull()
      })

      it('returns null when date string has wrong number of parts', () => {
        expect(parseDateString('25/12', 'gregorian', 'DD/MM/YYYY')).toBeNull()
        expect(
          parseDateString('25/12/2024/01', 'gregorian', 'DD/MM/YYYY')
        ).toBeNull()
      })
    })
  })

  describe('parseAndValidateDate', () => {
    describe('Gregorian calendar', () => {
      it('parses and validates valid date string', () => {
        const result = parseAndValidateDate('2024/12/25', 'gregorian')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses and validates date with different separators', () => {
        expect(parseAndValidateDate('2024-12-25', 'gregorian').success).toBe(
          true
        )
        expect(parseAndValidateDate('2024.12.25', 'gregorian').success).toBe(
          true
        )
      })

      it('returns error for invalid date (invalid month)', () => {
        const result = parseAndValidateDate('2024/13/25', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('returns error for invalid date (invalid day)', () => {
        const result = parseAndValidateDate('2024/12/32', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('returns error for invalid date (February 30)', () => {
        const result = parseAndValidateDate('2024/02/30', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('validates leap year correctly (February 29)', () => {
        const result = parseAndValidateDate('2024/02/29', 'gregorian')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 2,
          day: 29
        })
      })

      it('returns error for non-leap year February 29', () => {
        const result = parseAndValidateDate('2023/02/29', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('returns error for unparseable string', () => {
        const result = parseAndValidateDate('invalid', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('PARSE_ERROR')
        expect(result.error?.message).toContain('Could not parse date string')
      })

      it('returns error for year out of range (too old)', () => {
        const result = parseAndValidateDate('1800/12/25', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('YEAR_OUT_OF_RANGE')
        expect(result.error?.message).toContain('not in the range of calendar')
      })

      it('returns error for year out of range (too far in future)', () => {
        const currentYear = new Date().getFullYear()
        const futureYear = currentYear + 100
        const result = parseAndValidateDate(`${futureYear}/12/25`, 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('YEAR_OUT_OF_RANGE')
      })
    })

    describe('Jalali calendar', () => {
      it('parses and validates valid Jalali date', () => {
        const result = parseAndValidateDate('1403/10/05', 'jalali')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 1403,
          month: 10,
          day: 5
        })
      })

      it('parses and validates Jalali date with Persian numerals', () => {
        const result = parseAndValidateDate('۱۴۰۳/۱۰/۰۵', 'jalali')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 1403,
          month: 10,
          day: 5
        })
      })

      it('returns error for invalid Jalali date (invalid month)', () => {
        const result = parseAndValidateDate('1403/13/05', 'jalali')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('returns error for invalid Jalali date (invalid day)', () => {
        const result = parseAndValidateDate('1403/10/32', 'jalali')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('validates Jalali leap year correctly (Esfand 30)', () => {
        // 1402 is a leap year in Jalali calendar
        const result = parseAndValidateDate('1403/12/30', 'jalali')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 1403,
          month: 12,
          day: 30
        })
      })

      it('returns error for non-leap year Esfand 30', () => {
        // 1403 is not a leap year in Jalali calendar
        const result = parseAndValidateDate('1402/12/30', 'jalali')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })
    })

    describe('with dateFormat parameter', () => {
      it('parses and validates DD/MM/YYYY format', () => {
        const result = parseAndValidateDate(
          '25/12/2024',
          'gregorian',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses and validates MM-DD-YYYY format', () => {
        const result = parseAndValidateDate(
          '12-25-2024',
          'gregorian',
          'MM-DD-YYYY'
        )
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('parses and validates YYYY.MM.DD format', () => {
        const result = parseAndValidateDate(
          '2024.12.25',
          'gregorian',
          'YYYY.MM.DD'
        )
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 12,
          day: 25
        })
      })

      it('validates date parsed with custom format', () => {
        const result = parseAndValidateDate(
          '31/12/2024',
          'gregorian',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 12,
          day: 31
        })
      })

      it('returns error for invalid date with custom format', () => {
        const result = parseAndValidateDate(
          '32/12/2024',
          'gregorian',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('INVALID_DATE')
      })

      it('returns parse error when format does not match string', () => {
        const result = parseAndValidateDate(
          '25-12-2024',
          'gregorian',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('PARSE_ERROR')
      })

      it('parses Jalali date with DD/MM/YYYY format', () => {
        const result = parseAndValidateDate(
          '05/10/1403',
          'jalali',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 1403,
          month: 10,
          day: 5
        })
      })

      it('validates year range with custom format', () => {
        const result = parseAndValidateDate(
          '25/12/1800',
          'gregorian',
          'DD/MM/YYYY'
        )
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('YEAR_OUT_OF_RANGE')
      })
    })

    describe('edge cases', () => {
      it('handles empty string', () => {
        const result = parseAndValidateDate('', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('PARSE_ERROR')
      })

      it('handles whitespace-only string', () => {
        const result = parseAndValidateDate('   ', 'gregorian')
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.code).toBe('PARSE_ERROR')
      })

      it('handles single digit values', () => {
        const result = parseAndValidateDate('2024/1/5', 'gregorian')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 1,
          day: 5
        })
      })

      it('handles zero-padded values', () => {
        const result = parseAndValidateDate('2024/01/05', 'gregorian')
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
          year: 2024,
          month: 1,
          day: 5
        })
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
