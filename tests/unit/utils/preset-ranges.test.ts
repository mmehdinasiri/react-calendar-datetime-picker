import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getPresetRange } from '@/utils/preset-ranges'

describe('preset-ranges utils', () => {
  // Mock date to 2023-05-15 (Gregorian) / 1402-02-25 (Jalali)
  const mockDate = new Date(2023, 4, 15, 12, 0, 0) // Month is 0-indexed

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('getPresetRange (en)', () => {
    const locale = 'gregorian'

    it('returns correct range for yesterday', () => {
      const range = getPresetRange('yesterday', locale)
      // 2023-05-14
      expect(range.from).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 14 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 14 })
      )
    })

    it('returns correct range for last7days', () => {
      const range = getPresetRange('last7days', locale)
      // 2023-05-09 to 2023-05-15
      expect(range.from).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 9 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 15 })
      )
    })

    it('returns correct range for thisMonth', () => {
      const range = getPresetRange('thisMonth', locale)
      // 2023-05-01 to 2023-05-31
      expect(range.from).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 1 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 2023, month: 5, day: 31 })
      )
    })
  })

  describe('getPresetRange (fa)', () => {
    const locale = 'jalali'

    it('returns correct range for yesterday', () => {
      const range = getPresetRange('yesterday', locale)
      // 1402-02-24
      expect(range.from).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 24 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 24 })
      )
    })

    it('returns correct range for last7days', () => {
      const range = getPresetRange('last7days', locale)
      // 1402-02-19 to 1402-02-25
      // 25 - 6 = 19
      expect(range.from).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 19 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 25 })
      )
    })

    it('returns correct range for thisMonth', () => {
      const range = getPresetRange('thisMonth', locale)
      // 1402-02-01 to 1402-02-31
      expect(range.from).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 1 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 31 })
      )
    })

    it('returns correct range for lastMonth', () => {
      const range = getPresetRange('lastMonth', locale)
      // 1402-01-01 to 1402-01-31
      expect(range.from).toEqual(
        expect.objectContaining({ year: 1402, month: 1, day: 1 })
      )
      expect(range.to).toEqual(
        expect.objectContaining({ year: 1402, month: 1, day: 31 })
      )
    })
  })
})
