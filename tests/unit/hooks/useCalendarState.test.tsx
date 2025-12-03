import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCalendarState } from '@/hooks/useCalendarState'
import type { Day } from '@/types'

describe('useCalendarState', () => {
  const onChange = vi.fn()
  const onCalenderChange = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 4, 15, 12, 0, 0)) // May 15, 2023
    onChange.mockClear()
    onCalenderChange.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() =>
      useCalendarState({ locale: 'en', type: 'single', onChange })
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
      useCalendarState({ locale: 'en', type: 'single', onChange, initValue })
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
      useCalendarState({ locale: 'en', type: 'single', onChange })
    )

    const day: Day = { year: 2023, month: 6, day: 1 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    expect(result.current.state.selectedValue).toEqual(day)
    expect(onChange).toHaveBeenCalledWith(day)
  })

  it('selects range (start then end)', () => {
    const { result } = renderHook(() =>
      useCalendarState({ locale: 'en', type: 'range', onChange })
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
    expect(onChange).toHaveBeenLastCalledWith({ from: start, to: end })
  })

  it('selects multi dates', () => {
    const { result } = renderHook(() =>
      useCalendarState({ locale: 'en', type: 'multi', onChange })
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

    // Deselect first
    act(() => {
      result.current.actions.selectDate(day1)
    })
    expect(result.current.state.selectedValue).toEqual([day2])
  })

  it('navigates months', () => {
    const { result } = renderHook(() =>
      useCalendarState({ locale: 'en', type: 'single', onChange })
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
      useCalendarState({ locale: 'en', type: 'single', onChange })
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
      useCalendarState({ locale: 'en', type: 'single', onChange, initValue })
    )

    act(() => {
      result.current.actions.clearSelection()
    })

    expect(result.current.state.selectedValue).toBeNull()
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('updates time for single date', () => {
    const initValue: Day = { year: 2023, month: 1, day: 1, hour: 10, minute: 0 }
    const { result } = renderHook(() =>
      useCalendarState({
        locale: 'en',
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
    expect(onChange).toHaveBeenCalledWith(expected)
  })

  it('adds system time if withTime is true', () => {
    const { result } = renderHook(() =>
      useCalendarState({
        locale: 'en',
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
          locale: 'en',
          type: 'single',
          onChange,
          initValue: null as Day | null
        }
      }
    )

    const newValue: Day = { year: 2023, month: 10, day: 1 }
    rerender({ locale: 'en', type: 'single', onChange, initValue: newValue })

    expect(result.current.state.selectedValue).toEqual(newValue)
    expect(result.current.state.displayMonth).toEqual(
      expect.objectContaining({ year: 2023, month: 10 })
    )
  })

  // FA Locale Tests
  describe('fa locale', () => {
    it('initializes with Jalali date', () => {
      // System time is May 15, 2023 -> Ordibehesht 25, 1402
      const { result } = renderHook(() =>
        useCalendarState({ locale: 'fa', type: 'single', onChange })
      )

      expect(result.current.state.displayMonth).toEqual(
        expect.objectContaining({ year: 1402, month: 2, day: 25 })
      )
    })

    it('navigates Jalali months', () => {
      const { result } = renderHook(() =>
        useCalendarState({ locale: 'fa', type: 'single', onChange })
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
})
