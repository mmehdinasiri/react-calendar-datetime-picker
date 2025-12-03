import { describe, it, expect } from 'vitest'
import { normalizeConstraintsProps } from '@/utils/constraints'
import type { Day } from '@/types'

describe('constraints utils', () => {
  describe('normalizeConstraintsProps', () => {
    const locale = 'en'
    const type = 'single'

    it('returns empty constraints if input is undefined', () => {
      const { constraints, errors } = normalizeConstraintsProps(
        undefined,
        locale,
        type
      )
      expect(constraints).toEqual({})
      expect(errors).toHaveLength(0)
    })

    it('normalizes maxDate from Day object', () => {
      const maxDate: Day = { year: 2023, month: 12, day: 31 }
      const { constraints, errors } = normalizeConstraintsProps(
        { maxDate },
        locale,
        type
      )

      expect(constraints.maxDate).toEqual(maxDate)
      expect(errors).toHaveLength(0)
    })

    it('normalizes minDate from Day object', () => {
      const minDate: Day = { year: 2023, month: 1, day: 1 }
      const { constraints, errors } = normalizeConstraintsProps(
        { minDate },
        locale,
        type
      )

      expect(constraints.minDate).toEqual(minDate)
      expect(errors).toHaveLength(0)
    })

    it('normalizes disabledDates from Day[]', () => {
      const disabledDates: Day[] = [
        { year: 2023, month: 1, day: 1 },
        { year: 2023, month: 1, day: 2 }
      ]
      const { constraints, errors } = normalizeConstraintsProps(
        { disabledDates },
        locale,
        type
      )
      expect(constraints.disabledDates).toHaveLength(2)
      expect(constraints.disabledDates).toEqual(disabledDates)
      expect(errors).toHaveLength(0)
    })

    it('passes through isDateDisabled callback', () => {
      const isDateDisabled = (date: Day) => date.day === 1
      const { constraints, errors } = normalizeConstraintsProps(
        { isDateDisabled },
        locale,
        type
      )

      expect(constraints.isDateDisabled).toBe(isDateDisabled)
      expect(errors).toHaveLength(0)
    })

    describe('input format handling', () => {
      it('normalizes Date objects', () => {
        const date = new Date(2023, 0, 15) // Jan 15 2023
        const { constraints, errors } = normalizeConstraintsProps(
          { minDate: date },
          'en',
          type
        )

        expect(constraints.minDate).toEqual(
          expect.objectContaining({
            year: 2023,
            month: 1,
            day: 15
          })
        )
        expect(errors).toHaveLength(0)
      })

      it('normalizes Date objects to Jalali for fa locale', () => {
        // 2023-03-21 is 1402-01-01
        const date = new Date(2023, 2, 21)
        const { constraints, errors } = normalizeConstraintsProps(
          { maxDate: date },
          'fa',
          type
        )

        expect(constraints.maxDate).toEqual(
          expect.objectContaining({
            year: 1402,
            month: 1,
            day: 1
          })
        )
        expect(errors).toHaveLength(0)
      })

      it('normalizes ISO date strings', () => {
        const { constraints, errors } = normalizeConstraintsProps(
          { minDate: '2023-12-25' },
          'en',
          type
        )

        expect(constraints.minDate).toEqual(
          expect.objectContaining({
            year: 2023,
            month: 12,
            day: 25
          })
        )
        expect(errors).toHaveLength(0)
      })

      it('normalizes timestamps', () => {
        const date = new Date(2023, 5, 15) // Jun 15 2023
        const timestamp = date.getTime()

        const { constraints, errors } = normalizeConstraintsProps(
          { maxDate: timestamp },
          'en',
          type
        )

        expect(constraints.maxDate).toEqual(
          expect.objectContaining({
            year: 2023,
            month: 6,
            day: 15
          })
        )
        expect(errors).toHaveLength(0)
      })

      it('handles mixed formats in disabledDates', () => {
        const dayObj: Day = { year: 2023, month: 1, day: 1 }
        const dateObj = new Date(2023, 0, 2)
        const dateStr = '2023-01-03'
        const timestamp = new Date(2023, 0, 4).getTime()

        const { constraints, errors } = normalizeConstraintsProps(
          {
            disabledDates: [dayObj, dateObj, dateStr, timestamp] as any
          },
          'en',
          type
        )

        expect(constraints.disabledDates).toHaveLength(4)
        expect(constraints.disabledDates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ year: 2023, month: 1, day: 1 }),
            expect.objectContaining({ year: 2023, month: 1, day: 2 }),
            expect.objectContaining({ year: 2023, month: 1, day: 3 }),
            expect.objectContaining({ year: 2023, month: 1, day: 4 })
          ])
        )
        expect(errors).toHaveLength(0)
      })
    })

    describe('error handling', () => {
      it('handles normalization errors for invalid Day objects', () => {
        const invalidDate = { year: 2023, month: 13, day: 1 } // Invalid month
        const { constraints, errors } = normalizeConstraintsProps(
          {
            maxDate: invalidDate as any,
            minDate: invalidDate as any,
            disabledDates: [invalidDate as any]
          },
          locale,
          type
        )

        expect(constraints.maxDate).toBeUndefined()
        expect(constraints.minDate).toBeUndefined()
        expect(constraints.disabledDates).toBeUndefined()
        expect(errors.length).toBeGreaterThan(0)
      })

      it('handles invalid date strings', () => {
        const { constraints, errors } = normalizeConstraintsProps(
          { minDate: 'invalid-date' },
          locale,
          type
        )

        expect(constraints.minDate).toBeUndefined()
        expect(errors).toHaveLength(1)
        expect(errors[0].type).toBe('normalization')
      })

      it('handles mixed valid and invalid disabledDates', () => {
        const validDate: Day = { year: 2023, month: 1, day: 1 }
        const invalidDate = { year: 2023, month: 13, day: 1 } as any

        const { constraints, errors } = normalizeConstraintsProps(
          { disabledDates: [validDate, invalidDate] },
          locale,
          type
        )

        expect(constraints.disabledDates).toHaveLength(1)
        expect(constraints.disabledDates?.[0]).toEqual(validDate)
        expect(errors.length).toBeGreaterThan(0)
      })
    })

    describe('Persian locale (fa)', () => {
      it('validates dates in Jalali calendar', () => {
        // 30 Esfand is valid in leap year 1403
        const validDate: Day = { year: 1403, month: 12, day: 30 }

        const { constraints, errors } = normalizeConstraintsProps(
          { maxDate: validDate },
          'fa',
          type
        )

        expect(constraints.maxDate).toEqual(validDate)
        expect(errors).toHaveLength(0)
      })

      it('detects invalid dates in Jalali calendar', () => {
        // 30 Esfand is invalid in normal year 1402
        const invalidDate: Day = { year: 1402, month: 12, day: 30 }

        const { constraints, errors } = normalizeConstraintsProps(
          { maxDate: invalidDate },
          'fa',
          type
        )

        expect(constraints.maxDate).toBeUndefined()
        expect(errors).toHaveLength(1)
        expect(errors[0].type).toBe('normalization')
      })
    })
  })
})
