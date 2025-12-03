import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { useClickOutside } from '@/hooks/useClickOutside'

describe('useClickOutside', () => {
  let modalRef: { current: HTMLDivElement | null }
  let pickerRef: { current: HTMLDivElement | null }
  
  beforeEach(() => {
    vi.useFakeTimers()
    
    // Setup basic DOM structure
    document.body.innerHTML = `
      <div class="picker-container">
        <div class="calendar-picker-input">Input</div>
        <div class="calendar-picker-toggle">Toggle</div>
        <div class="calendar-picker-clear">Clear</div>
        <div id="modal">
          <div class="calendar-core">Calendar Core</div>
        </div>
        <div id="outside">Outside</div>
      </div>
    `
    
    modalRef = { current: document.getElementById('modal') as HTMLDivElement }
    pickerRef = { current: document.querySelector('.picker-container') as HTMLDivElement }
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('calls onClose when clicking outside calendar core', () => {
    const onClose = vi.fn()
    
    renderHook(() => useClickOutside(true, pickerRef as React.RefObject<HTMLDivElement>, modalRef as React.RefObject<HTMLDivElement>, onClose))
    
    // Fast-forward past the setTimeout in hook
    vi.advanceTimersByTime(200)

    const outsideElement = document.getElementById('outside')
    outsideElement?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when clicking inside calendar core', () => {
    const onClose = vi.fn()
    
    renderHook(() => useClickOutside(true, pickerRef as React.RefObject<HTMLDivElement>, modalRef as React.RefObject<HTMLDivElement>, onClose))
    
    vi.advanceTimersByTime(200)

    const insideElement = document.querySelector('.calendar-core')
    insideElement?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not call onClose when clicking input/buttons', () => {
    const onClose = vi.fn()
    
    renderHook(() => useClickOutside(true, pickerRef as React.RefObject<HTMLDivElement>, modalRef as React.RefObject<HTMLDivElement>, onClose))
    
    vi.advanceTimersByTime(200)

    const input = document.querySelector('.calendar-picker-input')
    input?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(onClose).not.toHaveBeenCalled()

    const toggle = document.querySelector('.calendar-picker-toggle')
    toggle?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not attach listener if isOpen is false', () => {
    const onClose = vi.fn()
    const addListenerSpy = vi.spyOn(document, 'addEventListener')
    
    renderHook(() => useClickOutside(false, pickerRef, modalRef, onClose))
    
    vi.advanceTimersByTime(200)
    
    // mousedown listener is added in the hook
    // We expect it NOT to be added if isOpen is false
    // But the hook implementation checks isOpen inside useEffect: if (!isOpen) return
    // So the listener is inside a setTimeout that is created? No, wait.
    // useEffect body: if (!isOpen) return. 
    // So the setTimeout is NOT called.
    
    // Check calls to addEventListener. Note that renderHook might trigger other listeners from React/testing-library?
    // Filter for 'mousedown'
    const mousedownCalls = addListenerSpy.mock.calls.filter(call => call[0] === 'mousedown')
    expect(mousedownCalls.length).toBe(0)
  })
})

