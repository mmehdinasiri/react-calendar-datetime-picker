import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCalendarState } from '@/hooks/useCalendarState'
import type { Day, Range, Multi, RangeDate } from '@/types'

describe('useCalendarState', () => {
  const onChange =
    vi.fn<
      (
        normalizedValue: Day | Range | Multi | null,
        jsDateValue: Date | RangeDate | Date[] | null,
        formattedString: string | null
      ) => void
    >()
  const onCalenderChange =
    vi.fn<
      (
        normalizedValue: Day | Range | Multi | null,
        jsDateValue: Date | RangeDate | Date[] | null,
        formattedString: string | null
      ) => void
    >()

  beforeEach(() => {
    vi.useFakeTimers()
    // JS Date uses 0-indexed months (4 = May). Our Day type uses 1-indexed (5 = May).
    vi.setSystemTime(new Date(2023, 4, 15, 12, 0, 0)) // May 15, 2023
    onChange.mockClear()
    onCalenderChange.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    expect(result.current.state.selectedValue).toBeNull()
    expect(result.current.state.currentView).toBe('calendar')
    // Should default to today's month
    expect(result.current.state.displayMonth).toEqual({
      year: 2023,
      month: 5,
      day: 15
    })
  })

  it('initializes with initValue', () => {
    const initValue: Day = { year: 2023, month: 1, day: 1 }
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange,
        initValue
      })
    )

    expect(result.current.state.selectedValue).toEqual(initValue)
    // Should default display month to initValue's month
    expect(result.current.state.displayMonth).toEqual({
      year: 2023,
      month: 1,
      day: 1
    })
  })

  it('selects single date', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange,
        locale: 'en'
      })
    )

    const day: Day = { year: 2023, month: 6, day: 1 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    expect(result.current.state.selectedValue).toEqual(day)
    // onChange should be called with three parameters
    expect(onChange).toHaveBeenCalledTimes(1)
    const call = onChange.mock.calls[0]
    expect(call[0]).toEqual(day) // normalizedValue
    expect(call[1]).toBeInstanceOf(Date) // jsDateValue
    expect(call[2]).toBe('2023/06/01') // formattedString
    expect((call[1] as Date).toISOString()).toBe('2023-06-01T00:00:00.000Z')
  })

  it('selects range (start then end)', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'range',
        onChange,
        locale: 'en'
      })
    )

    const start: Day = { year: 2023, month: 6, day: 1 }
    const end: Day = { year: 2023, month: 6, day: 5 }

    // Select start
    act(() => {
      result.current.actions.selectDate(start)
    })

    expect(result.current.state.selectedValue).toEqual({
      from: start,
      to: null
    })

    // Select end
    act(() => {
      result.current.actions.selectDate(end)
    })

    expect(result.current.state.selectedValue).toEqual({ from: start, to: end })
    // onChange should be called with three parameters
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(lastCall[0]).toEqual({ from: start, to: end }) // normalizedValue
    expect(lastCall[1]).toHaveProperty('from') // jsDateValue (RangeDate)
    expect(lastCall[1]).toHaveProperty('to')
    expect((lastCall[1] as RangeDate).from?.toISOString()).toBe(
      '2023-06-01T00:00:00.000Z'
    )
    expect((lastCall[1] as RangeDate).to?.toISOString()).toBe(
      '2023-06-05T00:00:00.000Z'
    )
    expect(lastCall[2]).toContain('2023/06/01') // formattedString
    expect(lastCall[2]).toContain('2023/06/05')
  })

  it('selects multi dates', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'multi',
        onChange,
        locale: 'en'
      })
    )

    const day1: Day = { year: 2023, month: 6, day: 1 }
    const day2: Day = { year: 2023, month: 6, day: 5 }

    // Select first
    act(() => {
      result.current.actions.selectDate(day1)
    })
    expect(result.current.state.selectedValue).toEqual([day1])

    // Select second
    act(() => {
      result.current.actions.selectDate(day2)
    })
    expect(result.current.state.selectedValue).toEqual([day1, day2])

    // Check onChange was called with three parameters for multi selection
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(lastCall[0]).toEqual([day1, day2]) // normalizedValue
    expect(Array.isArray(lastCall[1])).toBe(true) // jsDateValue (Date[])
    expect((lastCall[1] as Date[]).length).toBe(2)
    expect((lastCall[1] as Date[])[0].toISOString()).toBe(
      '2023-06-01T00:00:00.000Z'
    )
    expect((lastCall[1] as Date[])[1].toISOString()).toBe(
      '2023-06-05T00:00:00.000Z'
    )
    expect(lastCall[2]).toBe('2023/06/01,2023/06/05') // formattedString (comma-separated)

    // Deselect first
    act(() => {
      result.current.actions.selectDate(day1)
    })
    expect(result.current.state.selectedValue).toEqual([day2])
  })

  it('selects week', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'week',
        onChange,
        locale: 'en'
      })
    )

    // Select a Wednesday (June 7, 2023)
    const day: Day = { year: 2023, month: 6, day: 7 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    // Expect start of week (Sunday Jun 4) to end of week (Saturday Jun 10)
    // using objectContaining to ignore potential time fields
    const expectedValue = {
      from: expect.objectContaining({ year: 2023, month: 6, day: 4 }),
      to: expect.objectContaining({ year: 2023, month: 6, day: 10 })
    }

    expect(result.current.state.selectedValue).toEqual(expectedValue)
    // onChange should be called with three parameters
    const call = onChange.mock.calls[onChange.mock.calls.length - 1]
    expect(call[0]).toEqual(expectedValue) // normalizedValue
    expect(call[1]).toHaveProperty('from') // jsDateValue (RangeDate)
    expect(call[1]).toHaveProperty('to')
    expect((call[1] as RangeDate).from?.toISOString()).toBe(
      '2023-06-04T00:00:00.000Z'
    )
    expect((call[1] as RangeDate).to?.toISOString()).toBe(
      '2023-06-10T00:00:00.000Z'
    )
    expect(call[2]).toContain('Week:') // formattedString
    expect(call[2]).toContain('2023/06/04')
    expect(call[2]).toContain('2023/06/10')
  })

  it('navigates months', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    // Initial: May 2023

    act(() => {
      result.current.actions.navigateMonth('next')
    })
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 6 })
    )

    act(() => {
      result.current.actions.navigateMonth('prev')
    })
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 5 })
    )
  })

  it('changes views', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    act(() => {
      result.current.actions.setView('months')
    })
    expect(result.current.state.currentView).toBe('months')

    act(() => {
      result.current.actions.setView('years')
    })
    expect(result.current.state.currentView).toBe('years')
  })

  it('clears selection', () => {
    const initValue: Day = { year: 2023, month: 1, day: 1 }
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange,
        initValue
      })
    )

    act(() => {
      result.current.actions.clearSelection()
    })

    expect(result.current.state.selectedValue).toBeNull()
    // onChange should be called with three parameters
    expect(onChange).toHaveBeenCalledWith(null, null, null)
  })

  it('updates time for single date', () => {
    const initValue: Day = { year: 2023, month: 1, day: 1, hour: 10, minute: 0 }
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange,
        initValue,
        withTime: true
      })
    )

    act(() => {
      result.current.actions.updateTime(initValue, 14, 30)
    })

    const expected = { ...initValue, hour: 14, minute: 30 }
    expect(result.current.state.selectedValue).toEqual(expected)
    // onChange should be called with three parameters
    expect(onChange).toHaveBeenCalledTimes(1)
    const call = onChange.mock.calls[0]
    expect(call[0]).toEqual(expected) // normalizedValue
    expect(call[1]).toBeInstanceOf(Date) // jsDateValue
    expect(typeof call[2]).toBe('string') // formattedString
  })

  it('adds system time if withTime is true', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange,
        withTime: true
      })
    )

    const day: Day = { year: 2023, month: 6, day: 1 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    // System time is mocked to 12:00
    expect(result.current.state.selectedValue).toEqual({
      ...day,
      hour: 12,
      minute: 0
    })
  })

  it('syncs with external initValue changes', () => {
    const { result, rerender } = renderHook(
      (props) => useCalendarState(props),
      {
        initialProps: {
          calendarSystem: 'gregorian' as const,
          type: 'single' as const,
          onChange,
          initValue: null as Day | null
        }
      }
    )

    const newValue: Day = { year: 2023, month: 10, day: 1 }
    rerender({
      calendarSystem: 'gregorian',
      type: 'single',
      onChange,
      initValue: newValue
    })

    expect(result.current.state.selectedValue).toEqual(newValue)
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 10 })
    )
  })

  it('selects preset range', () => {
    const { result } = renderHook(() =>
      useCalendarState({ calendarSystem: 'gregorian', type: 'range', onChange })
    )

    const range: Range = {
      from: { year: 2023, month: 6, day: 1 },
      to: { year: 2023, month: 6, day: 10 }
    }

    act(() => {
      result.current.actions.selectPresetRange(range)
    })

    expect(result.current.state.selectedValue).toEqual(range)
    // onChange should be called with three parameters
    expect(onChange).toHaveBeenCalledTimes(1)
    const call = onChange.mock.calls[0]
    expect(call[0]).toEqual(range) // normalizedValue
    expect(call[1]).toHaveProperty('from') // jsDateValue (RangeDate)
    expect(call[1]).toHaveProperty('to')
    expect(call[2]).toContain('from') // formattedString
    expect(call[2]).toContain('to')
    // Should update display month to range start
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 6 })
    )
  })

  it('selects month', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    act(() => {
      // Select February (2)
      result.current.actions.selectMonth(2)
    })

    expect(result.current.state.displayMonth.month).toBe(2)
    expect(result.current.state.currentView).toBe('calendar')
  })

  it('selects year', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    act(() => {
      result.current.actions.selectYear(2025)
    })

    expect(result.current.state.displayMonth.year).toBe(2025)
    expect(result.current.state.currentView).toBe('months')
  })

  it('goes to today', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        calendarSystem: 'gregorian',
        type: 'single',
        onChange
      })
    )

    // Navigate away first
    act(() => {
      result.current.actions.selectYear(2025)
      result.current.actions.selectMonth(1)
    })
    expect(result.current.state.displayMonth.year).toBe(2025)

    act(() => {
      result.current.actions.goToToday()
    })

    // Mocked today is May 15, 2023
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 5 })
    )
    expect(result.current.state.currentView).toBe('calendar')
  })

  // FA Locale Tests
  describe('fa locale', () => {
    it('initializes with Jalali date', () => {
      // System time is May 15, 2023 -> Ordibehesht 25, 1402
      const { result } = renderHook(() =>
        useCalendarState({ calendarSystem: 'jalali', type: 'single', onChange })
      )

      expect(result.current.state.displayMonth).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 25 })
      )
    })

    it('initializes with initValue', () => {
      // 1402/01/01 (Farvardin 1st)
      const initValue: Day = { year: 1402, month: 1, day: 1 }
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'jalali',
          type: 'single',
          onChange,
          initValue
        })
      )

      expect(result.current.state.selectedValue).toEqual(initValue)
      expect(result.current.state.displayMonth).toEqual(
        expect.objectContaining({ year: 1402, month: 1, day: 1 })
      )
    })

    it('navigates Jalali months', () => {
      const { result } = renderHook(() =>
        useCalendarState({ calendarSystem: 'jalali', type: 'single', onChange })
      )

      // Initial: 1402/2

      act(() => {
        result.current.actions.navigateMonth('next')
      })
      expect(result.current.state.displayMonth).toEqual(
        expect.objectContaining({ year: 1402, month: 3, day: 1 })
      )

      act(() => {
        result.current.actions.navigateMonth('prev')
      })
      expect(result.current.state.displayMonth).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 1 })
      )
    })
  })

  describe('three-parameter onChange callback', () => {
    it('calls onChange with three parameters for single date (Gregorian)', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'single',
          onChange,
          locale: 'en',
          dateFormat: 'DD-MM-YYYY'
        })
      )

      const day: Day = { year: 2025, month: 12, day: 27 }

      act(() => {
        result.current.actions.selectDate(day)
      })

      const call = onChange.mock.calls[0]
      expect(call).toHaveLength(3)
      expect(call[0]).toEqual(day) // normalizedValue
      expect(call[1]).toBeInstanceOf(Date) // jsDateValue
      expect(call[2]).toBe('27-12-2025') // formattedString with custom format
      expect((call[1] as Date).toISOString()).toBe('2025-12-27T00:00:00.000Z')
    })

    it('calls onChange with three parameters for single date (Jalali)', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'jalali',
          type: 'single',
          onChange,
          locale: 'fa'
        })
      )

      const jalaliDay: Day = { year: 1404, month: 9, day: 6 }

      act(() => {
        result.current.actions.selectDate(jalaliDay)
      })

      const call = onChange.mock.calls[0]
      expect(call).toHaveLength(3)
      expect(call[0]).toEqual(jalaliDay) // normalizedValue (Jalali)
      expect(call[1]).toBeInstanceOf(Date) // jsDateValue (Gregorian)
      // jsDateValue should be Gregorian even though input was Jalali
      const jsDate = call[1] as Date
      expect(jsDate.getUTCFullYear()).toBeGreaterThan(2024)
      expect(call[2]).toContain('۱۴۰۴') // formattedString (Persian numerals)
    })

    it('calls onChange with three parameters for range selection', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'range',
          onChange,
          locale: 'en'
        })
      )

      const start: Day = { year: 2025, month: 12, day: 27 }
      const end: Day = { year: 2025, month: 12, day: 31 }

      act(() => {
        result.current.actions.selectDate(start)
      })

      act(() => {
        result.current.actions.selectDate(end)
      })

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall).toHaveLength(3)
      expect(lastCall[0]).toEqual({ from: start, to: end }) // normalizedValue
      expect(lastCall[1]).toHaveProperty('from') // jsDateValue (RangeDate)
      expect(lastCall[1]).toHaveProperty('to')
      expect((lastCall[1] as RangeDate).from?.toISOString()).toBe(
        '2025-12-27T00:00:00.000Z'
      )
      expect((lastCall[1] as RangeDate).to?.toISOString()).toBe(
        '2025-12-31T00:00:00.000Z'
      )
      expect(lastCall[2]).toContain('from') // formattedString
      expect(lastCall[2]).toContain('2025/12/27')
      expect(lastCall[2]).toContain('2025/12/31')
    })

    it('calls onChange with three parameters for multi selection', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'multi',
          onChange,
          locale: 'en'
        })
      )

      const day1: Day = { year: 2025, month: 12, day: 27 }
      const day2: Day = { year: 2025, month: 12, day: 28 }
      const day3: Day = { year: 2025, month: 12, day: 29 }

      act(() => {
        result.current.actions.selectDate(day1)
      })

      act(() => {
        result.current.actions.selectDate(day2)
      })

      act(() => {
        result.current.actions.selectDate(day3)
      })

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(lastCall).toHaveLength(3)
      expect(lastCall[0]).toEqual([day1, day2, day3]) // normalizedValue
      expect(Array.isArray(lastCall[1])).toBe(true) // jsDateValue (Date[])
      expect((lastCall[1] as Date[]).length).toBe(3)
      expect((lastCall[1] as Date[])[0].toISOString()).toBe(
        '2025-12-27T00:00:00.000Z'
      )
      expect((lastCall[1] as Date[])[1].toISOString()).toBe(
        '2025-12-28T00:00:00.000Z'
      )
      expect((lastCall[1] as Date[])[2].toISOString()).toBe(
        '2025-12-29T00:00:00.000Z'
      )
      expect(lastCall[2]).toBe('2025/12/27,2025/12/28,2025/12/29') // formattedString (comma-separated)
    })

    it('calls onChange with null values when clearing selection', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'single',
          onChange,
          locale: 'en',
          initValue: { year: 2025, month: 12, day: 27 }
        })
      )

      act(() => {
        result.current.actions.clearSelection()
      })

      const call = onChange.mock.calls[onChange.mock.calls.length - 1]
      expect(call).toHaveLength(3)
      expect(call[0]).toBeNull() // normalizedValue
      expect(call[1]).toBeNull() // jsDateValue
      expect(call[2]).toBeNull() // formattedString
    })

    it('handles time in all three parameters', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'single',
          onChange,
          locale: 'en',
          withTime: true
        })
      )

      const day: Day = { year: 2025, month: 12, day: 27, hour: 14, minute: 30 }

      act(() => {
        result.current.actions.selectDate(day)
      })

      const call = onChange.mock.calls[0]
      expect(call[0]).toEqual(day) // normalizedValue (with time)
      expect((call[1] as Date).getUTCHours()).toBe(14) // jsDateValue (with time)
      expect((call[1] as Date).getUTCMinutes()).toBe(30)
      expect(call[2]).toContain('14:30') // formattedString (with time)
    })

    it('calls onCalenderChange with three parameters when initValue is provided', () => {
      const { result } = renderHook(() =>
        useCalendarState({
          calendarSystem: 'gregorian',
          type: 'single',
          onChange,
          onCalenderChange,
          locale: 'en',
          initValue: { year: 2025, month: 12, day: 27 }
        })
      )

      const day: Day = { year: 2025, month: 12, day: 28 }

      act(() => {
        result.current.actions.selectDate(day)
      })

      expect(onCalenderChange).toHaveBeenCalled()
      const call =
        onCalenderChange.mock.calls[onCalenderChange.mock.calls.length - 1]
      expect(call).toHaveLength(3)
      expect(call[0]).toEqual(day)
      expect(call[1]).toBeInstanceOf(Date)
      expect(call[2]).toBe('2025/12/28')
    })
  })
})
