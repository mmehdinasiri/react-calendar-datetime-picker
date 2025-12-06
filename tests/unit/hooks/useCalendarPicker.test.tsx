import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useCalendarPicker } from '@/hooks/useCalendarPicker'
import type { Day } from '@/types'

describe('useCalendarPicker', () => {
  const onChange = vi.fn()
  const onClose = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    // Set system time to 12:00:00
    vi.setSystemTime(new Date(2023, 0, 15, 12, 0, 0))
    onChange.mockClear()
    onClose.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('normalizes initValue', () => {
    const initDate = new Date(2023, 0, 1)
    const { result } = renderHook(() =>
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(result.current.state.selectedValue).toEqual(
      expect.objectContaining({
        year: 2023,
        month: 1,
        day: 1
      })
    )
  })

  it('normalizes constraints', () => {
    const minDate = new Date(2023, 0, 1)
    const { result } = renderHook(() =>
      useCalendarPicker(
        undefined,
        onChange,
        'single',
        'gregorian',
        false,
        { minDate },
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(result.current.constraints.minDate).toEqual(
      expect.objectContaining({
        year: 2023,
        month: 1,
        day: 1
      })
    )
  })

  it('formats displayValue', () => {
    const initDate = new Date(2023, 0, 1)
    const { result } = renderHook(() =>
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(result.current.displayValue).toBe('2023/01/01')
  })

  it('handles autoClose for single type', () => {
    const { result } = renderHook(() =>
      useCalendarPicker(
        undefined,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        true, // autoClose
        onClose,
        undefined,
        '24',
        1
      )
    )

    const day: Day = { year: 2023, month: 1, day: 20 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    expect(onChange).toHaveBeenCalledWith(day)
    expect(onClose).toHaveBeenCalled()
  })

  it('handles autoClose for range type (only on end selection)', () => {
    const { result } = renderHook(() =>
      useCalendarPicker(
        undefined,
        onChange,
        'range',
        'gregorian',
        false,
        undefined,
        false,
        true, // autoClose
        onClose,
        undefined,
        '24',
        1
      )
    )

    const start: Day = { year: 2023, month: 1, day: 1 }
    const end: Day = { year: 2023, month: 1, day: 5 }

    // Select start
    act(() => {
      result.current.actions.selectDate(start)
    })
    expect(onClose).not.toHaveBeenCalled()

    // Select end
    act(() => {
      result.current.actions.selectDate(end)
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('integrates constraints with displayValue', () => {
    const { result } = renderHook(() =>
      useCalendarPicker(
        undefined,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(result.current.constraints).toEqual({})
  })

  it('formats displayValue with time when withTime is true', () => {
    const initDate = new Date(2023, 0, 1, 14, 30) // Jan 1 2023, 14:30
    const { result } = renderHook(() =>
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'gregorian',
        true, // withTime
        undefined,
        true, // showTimeInput
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(result.current.displayValue).toBe('2023/01/01 14:30')
  })

  it('uses system time when selecting date without initValue and withTime is true', () => {
    const { result } = renderHook(() =>
      useCalendarPicker(
        undefined, // No initValue
        onChange,
        'single',
        'gregorian',
        true, // withTime
        undefined,
        true, // showTimeInput
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    const day: Day = { year: 2023, month: 1, day: 20 }

    act(() => {
      result.current.actions.selectDate(day)
    })

    // Should include mocked system time (12:00)
    const expectedDay = { ...day, hour: 12, minute: 0 }

    expect(onChange).toHaveBeenCalledWith(expectedDay)
    expect(result.current.displayValue).toBe('2023/01/20 12:00')
  })

  it('calls onChange with normalized value when initValue format differs', () => {
    const initDate = '2023-01-01'
    renderHook(() =>
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        year: 2023,
        month: 1,
        day: 1
      })
    )
  })

  it('does not call onChange when initValue is undefined', () => {
    renderHook(() =>
      useCalendarPicker(
        undefined,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not call onChange when initValue is already normalized', () => {
    const initDate = { year: 2023, month: 1, day: 1 }
    renderHook(() =>
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'gregorian',
        false,
        undefined,
        false,
        false,
        onClose,
        undefined,
        '24',
        1
      )
    )
    expect(onChange).not.toHaveBeenCalled()
  })
})
