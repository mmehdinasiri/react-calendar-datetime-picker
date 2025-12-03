import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import type { Day } from '@/types'

describe('useKeyboardNavigation', () => {
  let containerRef: { current: HTMLDivElement | null }
  const focusedDate: Day = { year: 2023, month: 1, day: 15 } // Jan 15 2023
  const onFocusedDateChange = vi.fn()
  const onDateSelect = vi.fn()
  const onMonthNavigate = vi.fn()
  const onGoToToday = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = '<div id="container" tabindex="0"></div>'
    containerRef = { current: document.getElementById('container') as HTMLDivElement }
    onFocusedDateChange.mockClear()
    onDateSelect.mockClear()
    onMonthNavigate.mockClear()
    onGoToToday.mockClear()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  const getHookProps = (overrides = {}) => ({
    focusedDate,
    locale: 'en' as const,
    type: 'single' as const,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    enabled: true,
    onFocusedDateChange,
    onDateSelect,
    onMonthNavigate,
    onGoToToday,
    ...overrides
  })

  it('handles ArrowRight (next day)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 16 }))
  })

  it('handles ArrowLeft (prev day)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 14 }))
  })

  it('handles ArrowDown (next week)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 22 }))
  })

  it('handles ArrowUp (prev week)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 8 }))
  })

  it('handles RTL navigation for fa locale', () => {
    renderHook(() => useKeyboardNavigation(getHookProps({ locale: 'fa' })))
    
    // In RTL, Left is Next, Right is Prev
    
    // Right arrow (Prev day)
    let event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 14 }))
    
    // Left arrow (Next day)
    event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 16 }))
  })

  it('handles Enter/Space to select', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    let event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    expect(onDateSelect).toHaveBeenCalledWith(focusedDate)
    
    event = new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    expect(onDateSelect).toHaveBeenCalledTimes(2)
  })

  it('handles Home (start of month)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 1 }))
  })

  it('handles End (end of month)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 31 }))
  })

  it('handles PageUp (prev month)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onMonthNavigate).toHaveBeenCalledWith('prev')
    
    vi.advanceTimersByTime(0)
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2022, month: 12, day: 15 }))
  })

  it('handles PageDown (next month)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onMonthNavigate).toHaveBeenCalledWith('next')
    
    vi.advanceTimersByTime(0)
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 2, day: 15 }))
  })

  it('handles T key (go to today)', () => {
    renderHook(() => useKeyboardNavigation(getHookProps()))
    
    const event = new KeyboardEvent('keydown', { key: 't', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(onGoToToday).toHaveBeenCalled()
  })

  it('respects isDateSelectable', () => {
    // Disable next day (Jan 16)
    const isDateSelectable = (date: Day) => date.day !== 16
    
    renderHook(() => useKeyboardNavigation(getHookProps({ isDateSelectable })))
    
    // Try to go right (to 16) -> should skip to 17
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    // The implementation recursively finds next available date
    expect(onFocusedDateChange).toHaveBeenCalledWith(expect.objectContaining({ year: 2023, month: 1, day: 17 }))
  })
})
