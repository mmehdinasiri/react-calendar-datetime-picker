import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCalendarSetup } from '@/hooks/useCalendarSetup'
import type { CalendarTranslations, SharedCalendarProps } from '@/types'

// Mock the utility functions
vi.mock('@/utils/date-conversion', () => ({
  normalizeCalendarSystem: vi.fn()
}))

vi.mock('@/utils/translations', () => ({
  getTranslations: vi.fn(),
  mergeTranslations: vi.fn(),
  getEffectiveLocale: vi.fn()
}))

import { normalizeCalendarSystem } from '@/utils/date-conversion'
import {
  getTranslations,
  mergeTranslations,
  getEffectiveLocale
} from '@/utils/translations'

describe('useCalendarSetup', () => {
  const mockNormalizeCalendarSystem = vi.mocked(normalizeCalendarSystem)
  const mockGetEffectiveLocale = vi.mocked(getEffectiveLocale)
  const mockGetTranslations = vi.mocked(getTranslations)
  const mockMergeTranslations = vi.mocked(mergeTranslations)

  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementations
    mockNormalizeCalendarSystem.mockReturnValue('gregorian')
    mockGetEffectiveLocale.mockReturnValue('en')
    mockGetTranslations.mockReturnValue({
      months: ['January', 'February'],
      weekdays: ['Sunday', 'Monday']
    } as CalendarTranslations)
    mockMergeTranslations.mockReturnValue({
      months: ['January', 'February'],
      weekdays: ['Sunday', 'Monday']
    } as CalendarTranslations)
  })

  describe('calendar system normalization', () => {
    it('normalizes calendar system input', () => {
      mockNormalizeCalendarSystem.mockReturnValue('jalali')

      const { result } = renderHook(
        () => useCalendarSetup('ja') // alias for jalali
      )

      expect(mockNormalizeCalendarSystem).toHaveBeenCalledWith('ja')
      expect(result.current.normalizedCalendarSystem).toBe('jalali')
    })

    it('defaults to gregorian when no calendar system provided', () => {
      mockNormalizeCalendarSystem.mockReturnValue('gregorian')

      const { result } = renderHook(() => useCalendarSetup())

      expect(mockNormalizeCalendarSystem).toHaveBeenCalledWith('gregorian')
      expect(result.current.normalizedCalendarSystem).toBe('gregorian')
    })

    it('handles all calendar system variants', () => {
      const testCases = [
        { input: 'gregorian', expected: 'gregorian' },
        { input: 'jalali', expected: 'jalali' },
        { input: 'ge', expected: 'gregorian' },
        { input: 'ja', expected: 'jalali' }
      ]

      testCases.forEach(({ input, expected }) => {
        mockNormalizeCalendarSystem.mockReturnValue(
          expected as 'gregorian' | 'jalali'
        )

        const { result } = renderHook(() => useCalendarSetup(input as any))

        expect(result.current.normalizedCalendarSystem).toBe(expected)
      })
    })
  })

  describe('effective locale determination', () => {
    it('determines effective locale based on locale and calendar system', () => {
      mockNormalizeCalendarSystem.mockReturnValue('jalali')
      mockGetEffectiveLocale.mockReturnValue('fa')

      const { result } = renderHook(() => useCalendarSetup('jalali', 'en'))

      expect(mockGetEffectiveLocale).toHaveBeenCalledWith('en', 'jalali')
      expect(result.current.effectiveLocale).toBe('fa')
    })

    it('handles undefined locale', () => {
      mockGetEffectiveLocale.mockReturnValue('en')

      const { result } = renderHook(() =>
        useCalendarSetup('gregorian', undefined)
      )

      expect(mockGetEffectiveLocale).toHaveBeenCalledWith(
        undefined,
        'gregorian'
      )
      expect(result.current.effectiveLocale).toBe('en')
    })
  })

  describe('translations management', () => {
    const baseTranslations: CalendarTranslations = {
      months: ['January', 'February'],
      weekdays: ['Sunday', 'Monday']
    }

    const customTranslations: Partial<CalendarTranslations> = {
      months: ['Custom January', 'Custom February']
    }

    it('gets default translations for effective locale', () => {
      mockGetTranslations.mockReturnValue(baseTranslations)

      renderHook(() => useCalendarSetup('gregorian', 'en'))

      expect(mockGetTranslations).toHaveBeenCalledWith('en')
    })

    it('merges default and custom translations', () => {
      const mergedTranslations: CalendarTranslations = {
        months: ['Custom January', 'Custom February'],
        weekdays: ['Sunday', 'Monday']
      }

      mockMergeTranslations.mockReturnValue(mergedTranslations)

      const customization: SharedCalendarProps['customization'] = {
        translations: customTranslations
      }

      const { result } = renderHook(() =>
        useCalendarSetup('gregorian', 'en', undefined, customization)
      )

      expect(mockMergeTranslations).toHaveBeenCalledWith(
        baseTranslations,
        customTranslations,
        'en',
        'gregorian'
      )
      expect(result.current.translations).toEqual(mergedTranslations)
    })

    it('handles undefined customization', () => {
      mockMergeTranslations.mockReturnValue(baseTranslations)

      const { result } = renderHook(() => useCalendarSetup('gregorian', 'en'))

      expect(mockMergeTranslations).toHaveBeenCalledWith(
        baseTranslations,
        undefined,
        'en',
        'gregorian'
      )
      expect(result.current.translations).toEqual(baseTranslations)
    })
  })

  describe('week start calculation', () => {
    it('uses provided weekStart when specified', () => {
      const { result } = renderHook(
        () => useCalendarSetup('gregorian', 'en', 1) // Monday
      )

      expect(result.current.effectiveWeekStart).toBe(1)
    })

    it('defaults to Saturday (6) for Jalali calendar with English locale', () => {
      mockNormalizeCalendarSystem.mockReturnValue('jalali')
      mockGetEffectiveLocale.mockReturnValue('en')

      const { result } = renderHook(() => useCalendarSetup('jalali', 'en'))

      expect(result.current.effectiveWeekStart).toBe(6)
    })

    it('defaults to Saturday (6) for Jalali calendar', () => {
      mockNormalizeCalendarSystem.mockReturnValue('jalali')
      mockGetEffectiveLocale.mockReturnValue('fa')

      const { result } = renderHook(() => useCalendarSetup('jalali', 'fa'))

      expect(result.current.effectiveWeekStart).toBe(6)
    })

    it('defaults to Sunday (0) for Gregorian calendar', () => {
      mockNormalizeCalendarSystem.mockReturnValue('gregorian')
      mockGetEffectiveLocale.mockReturnValue('en')

      const { result } = renderHook(() => useCalendarSetup('gregorian', 'en'))

      expect(result.current.effectiveWeekStart).toBe(0)
    })

    it('prefers explicit weekStart over calendar system defaults', () => {
      mockNormalizeCalendarSystem.mockReturnValue('jalali')

      const { result } = renderHook(
        () => useCalendarSetup('jalali', 'en', 3) // Wednesday
      )

      expect(result.current.effectiveWeekStart).toBe(3)
    })
  })

  describe('memoization', () => {
    it('memoizes normalizedCalendarSystem', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarSetup('jalali', 'en')
      )

      const firstResult = result.current.normalizedCalendarSystem

      rerender()

      expect(result.current.normalizedCalendarSystem).toBe(firstResult)
      expect(mockNormalizeCalendarSystem).toHaveBeenCalledTimes(1)
    })

    it('memoizes effectiveLocale', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarSetup('jalali', 'en')
      )

      const firstResult = result.current.effectiveLocale

      rerender()

      expect(result.current.effectiveLocale).toBe(firstResult)
      expect(mockGetEffectiveLocale).toHaveBeenCalledTimes(1)
    })

    it('memoizes translations', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarSetup('gregorian', 'en')
      )

      const firstResult = result.current.translations

      rerender()

      expect(result.current.translations).toBe(firstResult)
      expect(mockGetTranslations).toHaveBeenCalledTimes(1)
      expect(mockMergeTranslations).toHaveBeenCalledTimes(1)
    })

    it('memoizes effectiveWeekStart', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarSetup('gregorian', 'en')
      )

      const firstResult = result.current.effectiveWeekStart

      rerender()

      expect(result.current.effectiveWeekStart).toBe(firstResult)
    })

    it('re-calculates when dependencies change', () => {
      let calendarSystem = 'gregorian'
      const { result, rerender } = renderHook(() =>
        useCalendarSetup(calendarSystem, 'en')
      )

      expect(result.current.normalizedCalendarSystem).toBe('gregorian')

      calendarSystem = 'jalali'
      mockNormalizeCalendarSystem.mockReturnValue('jalali')
      rerender()

      expect(result.current.normalizedCalendarSystem).toBe('jalali')
      expect(mockNormalizeCalendarSystem).toHaveBeenCalledTimes(2)
    })
  })

  describe('return structure', () => {
    it('returns all expected properties', () => {
      const { result } = renderHook(() => useCalendarSetup('gregorian', 'en'))

      expect(result.current).toHaveProperty('normalizedCalendarSystem')
      expect(result.current).toHaveProperty('effectiveLocale')
      expect(result.current).toHaveProperty('translations')
      expect(result.current).toHaveProperty('effectiveWeekStart')

      expect(typeof result.current.normalizedCalendarSystem).toBe('string')
      expect(typeof result.current.effectiveLocale).toBe('string')
      expect(typeof result.current.translations).toBe('object')
      expect(typeof result.current.effectiveWeekStart).toBe('number')
    })
  })
})
