import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useModalPosition } from '@/hooks/useModalPosition'

describe('useModalPosition', () => {
  let inputRef: { current: HTMLInputElement | null }
  let modalRef: { current: HTMLDivElement | null }

  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = `
      <input id="input" />
      <div id="modal"></div>
    `
    inputRef = { current: document.getElementById('input') as HTMLInputElement }
    modalRef = { current: document.getElementById('modal') as HTMLDivElement }

    // Mock viewport
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true })

    // Mock getBoundingClientRect
    inputRef.current!.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 140,
      left: 100,
      right: 300,
      width: 200,
      height: 40,
      x: 100,
      y: 100,
      toJSON: () => {}
    }))

    modalRef.current!.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      bottom: 400,
      left: 0,
      right: 300,
      width: 300,
      height: 400,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('calculates position correctly (default: below)', () => {
    const { result } = renderHook(() =>
      useModalPosition(inputRef, modalRef, true, 'en')
    )

    act(() => {
      vi.advanceTimersByTime(20) // Wait for setTimeout
    })

    expect(result.current.modalPosition).toEqual({
      top: 144, // input.bottom (140) + spacing (4)
      left: 100, // input.left (100)
      position: 'below'
    })
  })

  it('positions above if not enough space below', () => {
    // Move input to bottom of screen
    inputRef.current!.getBoundingClientRect = vi.fn(() => ({
      top: 700,
      bottom: 740,
      left: 100,
      right: 300,
      width: 200,
      height: 40,
      x: 100,
      y: 700,
      toJSON: () => {}
    })) as any

    const { result } = renderHook(() =>
      useModalPosition(inputRef, modalRef, true, 'en')
    )

    act(() => {
      vi.advanceTimersByTime(20)
    })

    expect(result.current.modalPosition).toEqual({
      top: 296, // input.top (700) - modalHeight (400) - spacing (4)
      left: 100,
      position: 'above'
    })
  })

  it('handles RTL positioning', () => {
    const { result } = renderHook(() =>
      useModalPosition(inputRef, modalRef, true, 'fa')
    )

    act(() => {
      vi.advanceTimersByTime(20)
    })

    expect(result.current.modalPosition).toEqual({
      top: 144,
      left: 0, // input.right (300) - modalWidth (300) = 0
      position: 'below'
    })
  })

  it('adjusts if horizontally overflowing (LTR)', () => {
    // Move input to right edge
    inputRef.current!.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      bottom: 140,
      left: 900, // Near right edge (width 1000)
      right: 1100,
      width: 200,
      height: 40,
      x: 900,
      y: 100,
      toJSON: () => {}
    })) as any

    const { result } = renderHook(() =>
      useModalPosition(inputRef, modalRef, true, 'en')
    )

    act(() => {
      vi.advanceTimersByTime(20)
    })

    // Should align to right edge of viewport
    // left = viewportWidth (1000) - modalWidth (300) - spacing (4) = 696
    expect(result.current.modalPosition?.left).toBe(696)
  })

  it('resets position when closed', () => {
    const { result, rerender } = renderHook(
      ({ isOpen }) => useModalPosition(inputRef, modalRef, isOpen, 'en'),
      { initialProps: { isOpen: true } }
    )

    act(() => {
      vi.advanceTimersByTime(20)
    })
    expect(result.current.modalPosition).not.toBeNull()

    rerender({ isOpen: false })

    // Changing prop triggers effect directly?
    // The effect dependency includes isOpen.
    // Effect: if (!isOpen) setModalPosition(null)

    expect(result.current.modalPosition).toBeNull()
  })
})
