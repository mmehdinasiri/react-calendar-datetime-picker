import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFocusManagement } from '@/hooks/useFocusManagement'
import type { Day } from '@/types'

describe('useFocusManagement', () => {
  const initialDate: Day = { year: 2023, month: 1, day: 1 }
  const selectedDate: Day = { year: 2023, month: 1, day: 15 }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes focusedDate with selectedDate if provided', () => {
    const { result } = renderHook(() =>
      useFocusManagement({ initialDate, selectedDate })
    )
    expect(result.current.focusedDate).toEqual(selectedDate)
  })

  it('initializes focusedDate with initialDate if selectedDate is null', () => {
    const { result } = renderHook(() =>
      useFocusManagement({ initialDate, selectedDate: null })
    )
    expect(result.current.focusedDate).toEqual(initialDate)
  })

  it('updates focusedDate when selectedDate changes', () => {
    const { result, rerender } = renderHook(
      (props) => useFocusManagement(props),
      { initialProps: { initialDate, selectedDate: null as Day | null } }
    )

    expect(result.current.focusedDate).toEqual(initialDate)

    const newSelectedDate = { year: 2023, month: 1, day: 20 }
    rerender({ initialDate, selectedDate: newSelectedDate })

    expect(result.current.focusedDate).toEqual(newSelectedDate)
  })

  it('getCellRef stores and removes refs', () => {
    const { result } = renderHook(() => useFocusManagement({ initialDate }))

    const date = { year: 2023, month: 1, day: 5 }
    const element = document.createElement('button')

    // Call ref callback
    act(() => {
      const refCallback = result.current.getCellRef(date)
      refCallback(element)
    })

    // Verify focusDate uses the stored ref
    const focusSpy = vi.spyOn(element, 'focus')
    act(() => {
      result.current.focusDate(date)
    })
    expect(focusSpy).toHaveBeenCalled()

    // Remove ref
    act(() => {
      const refCallback = result.current.getCellRef(date)
      refCallback(null)
    })

    // Verify focusDate no longer finds the element (spy shouldn't be called again)
    focusSpy.mockClear()
    act(() => {
      result.current.focusDate(date)
    })
    expect(focusSpy).not.toHaveBeenCalled()
  })

  it('setFocusedDate triggers focus on the element', () => {
    const { result } = renderHook(() => useFocusManagement({ initialDate }))

    const date = { year: 2023, month: 1, day: 10 }
    const element = document.createElement('button')

    // Register ref
    act(() => {
      const refCallback = result.current.getCellRef(date)
      refCallback(element)
    })

    const focusSpy = vi.spyOn(element, 'focus')

    // Set focused date
    act(() => {
      result.current.setFocusedDate(date)
    })

    // Fast-forward useEffect timeout
    vi.advanceTimersByTime(0)

    expect(result.current.focusedDate).toEqual(date)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('resetFocus reverts to selectedDate', () => {
    const { result } = renderHook(() =>
      useFocusManagement({ initialDate, selectedDate })
    )

    // Change focus
    act(() => {
      result.current.setFocusedDate({ year: 2023, month: 1, day: 20 })
    })
    expect(result.current.focusedDate).not.toEqual(selectedDate)

    // Reset
    act(() => {
      result.current.resetFocus()
    })
    expect(result.current.focusedDate).toEqual(selectedDate)
  })
})
