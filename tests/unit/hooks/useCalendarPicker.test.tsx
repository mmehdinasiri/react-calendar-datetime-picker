import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCalendarPicker } from '@/hooks/useCalendarPicker'
import type { Day } from '@/types'

describe('useCalendarPicker', () => {
  const onChange = vi.fn()
  const onClose = vi.fn()
  
  beforeEach(() => {
    onChange.mockClear()
    onClose.mockClear()
  })
  
  it('normalizes initValue', () => {
    const initDate = new Date(2023, 0, 1)
    const { result } = renderHook(() => 
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'en',
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
    
    expect(result.current.state.selectedValue).toEqual(expect.objectContaining({
      year: 2023,
      month: 1,
      day: 1
    }))
  })

  it('normalizes constraints', () => {
    const minDate = new Date(2023, 0, 1)
    const { result } = renderHook(() => 
      useCalendarPicker(
        undefined,
        onChange,
        'single',
        'en',
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
    
    expect(result.current.constraints.minDate).toEqual(expect.objectContaining({
      year: 2023,
      month: 1,
      day: 1
    }))
  })

  it('formats displayValue', () => {
    const initDate = new Date(2023, 0, 1)
    const { result } = renderHook(() => 
      useCalendarPicker(
        initDate,
        onChange,
        'single',
        'en',
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
        'en',
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
        'en',
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
        'en',
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
        'en',
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
})
