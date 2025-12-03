import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFocusTrap } from '@/hooks/useFocusTrap'

describe('useFocusTrap', () => {
  let containerRef: { current: HTMLDivElement | null }
  let triggerButton: HTMLButtonElement
  let firstButton: HTMLButtonElement
  let lastButton: HTMLButtonElement

  beforeEach(() => {
    vi.useFakeTimers()
    
    // Setup DOM
    document.body.innerHTML = `
      <button id="trigger">Trigger</button>
      <div id="container">
        <button id="first">First</button>
        <button id="middle">Middle</button>
        <button id="last">Last</button>
      </div>
    `
    
    triggerButton = document.getElementById('trigger') as HTMLButtonElement
    firstButton = document.getElementById('first') as HTMLButtonElement
    lastButton = document.getElementById('last') as HTMLButtonElement
    containerRef = { current: document.getElementById('container') as HTMLDivElement }
    
    // Start with focus on trigger
    triggerButton.focus()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('auto-focuses first element on mount', () => {
    renderHook(() => useFocusTrap({ containerRef, enabled: true, autoFocus: true }))
    
    vi.advanceTimersByTime(20)
    expect(document.activeElement).toBe(firstButton)
  })

  it('restores focus on unmount', () => {
    triggerButton.focus()
    const { unmount } = renderHook(() => useFocusTrap({ containerRef, enabled: true, restoreFocus: true }))
    
    // Initial focus move
    vi.advanceTimersByTime(20)
    expect(document.activeElement).toBe(firstButton)
    
    unmount()
    expect(document.activeElement).toBe(triggerButton)
  })

  it('traps focus (Tab: last -> first)', () => {
    renderHook(() => useFocusTrap({ containerRef, enabled: true }))
    vi.advanceTimersByTime(20)
    
    lastButton.focus()
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(document.activeElement).toBe(firstButton)
  })

  it('traps focus (Shift+Tab: first -> last)', () => {
    renderHook(() => useFocusTrap({ containerRef, enabled: true }))
    vi.advanceTimersByTime(20)
    
    firstButton.focus()
    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
    containerRef.current?.dispatchEvent(event)
    
    expect(document.activeElement).toBe(lastButton)
  })

  it('does nothing if disabled', () => {
    renderHook(() => useFocusTrap({ containerRef, enabled: false }))
    
    vi.advanceTimersByTime(20)
    // Focus should remain on trigger
    expect(document.activeElement).toBe(triggerButton)
  })
})

