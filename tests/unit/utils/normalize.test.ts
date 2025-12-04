import { describe, it, expect } from 'vitest'
import { areValuesEqual } from '@/utils/normalize'
import type { Day, Range, Multi } from '@/types'

describe('areValuesEqual', () => {
  it('returns true when both values are strictly equal', () => {
    const day = { year: 2023, month: 1, day: 1 }
    expect(areValuesEqual(day, day)).toBe(true)
    expect(areValuesEqual(null, null)).toBe(true)
    expect(areValuesEqual(undefined, undefined)).toBe(true)
  })

  it('treats null and undefined as equal', () => {
    // This is the specific test requested:
    // "Refined areValuesEqual: It now treats null and undefined as equivalent. This ensures that if you don't provide an initValue (undefined), and the internal state defaults to null, the component will not trigger onChange(null) unnecessarily."
    expect(areValuesEqual(null, undefined)).toBe(true)
    expect(areValuesEqual(undefined, null)).toBe(true)
  })

  it('returns false when one value is truthy and other is falsy', () => {
    const day = { year: 2023, month: 1, day: 1 }
    expect(areValuesEqual(day, null)).toBe(false)
    expect(areValuesEqual(null, day)).toBe(false)
    expect(areValuesEqual(day, undefined)).toBe(false)
    expect(areValuesEqual(undefined, day)).toBe(false)
  })

  it('compares Day objects structurally', () => {
    const day1: Day = { year: 2023, month: 1, day: 1 }
    const day2: Day = { year: 2023, month: 1, day: 1 }
    const day3: Day = { year: 2023, month: 1, day: 2 }

    expect(areValuesEqual(day1, day2)).toBe(true)
    expect(areValuesEqual(day1, day3)).toBe(false)
  })

  it('compares Day objects with time structurally', () => {
    const day1: Day = { year: 2023, month: 1, day: 1, hour: 10, minute: 30 }
    const day2: Day = { year: 2023, month: 1, day: 1, hour: 10, minute: 30 }
    const day3: Day = { year: 2023, month: 1, day: 1, hour: 11, minute: 30 }

    expect(areValuesEqual(day1, day2)).toBe(true)
    expect(areValuesEqual(day1, day3)).toBe(false)
  })

  it('compares Range objects structurally', () => {
    const range1: Range = {
      from: { year: 2023, month: 1, day: 1 },
      to: { year: 2023, month: 1, day: 5 }
    }
    const range2: Range = {
      from: { year: 2023, month: 1, day: 1 },
      to: { year: 2023, month: 1, day: 5 }
    }
    const range3: Range = {
      from: { year: 2023, month: 1, day: 1 },
      to: { year: 2023, month: 1, day: 6 }
    }

    expect(areValuesEqual(range1, range2)).toBe(true)
    expect(areValuesEqual(range1, range3)).toBe(false)
  })

  it('compares Multi arrays structurally', () => {
    const multi1: Multi = [
      { year: 2023, month: 1, day: 1 },
      { year: 2023, month: 1, day: 2 }
    ]
    const multi2: Multi = [
      { year: 2023, month: 1, day: 1 },
      { year: 2023, month: 1, day: 2 }
    ]
    const multi3: Multi = [
      { year: 2023, month: 1, day: 1 },
      { year: 2023, month: 1, day: 3 }
    ]

    expect(areValuesEqual(multi1, multi2)).toBe(true)
    expect(areValuesEqual(multi1, multi3)).toBe(false)
  })
})


