import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useModalState } from '@/hooks/useModalState'

// Mock the imported hooks
vi.mock('@/hooks/index', () => ({
  useClickOutside: vi.fn(),
  useEscapeKey: vi.fn(),
  useFocusTrap: vi.fn()
}))

import { useClickOutside, useEscapeKey, useFocusTrap } from '@/hooks/index'

describe('useModalState', () => {
  const mockUseClickOutside = vi.mocked(useClickOutside)
  const mockUseEscapeKey = vi.mocked(useEscapeKey)
  const mockUseFocusTrap = vi.mocked(useFocusTrap)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('starts with isOpen as false', () => {
      const { result } = renderHook(() => useModalState())

      expect(result.current.isOpen).toBe(false)
    })

    it('provides modal and picker refs', () => {
      const { result } = renderHook(() => useModalState())

      expect(result.current.refs.modalRef).toBeDefined()
      expect(result.current.refs.pickerRef).toBeDefined()
      expect(result.current.refs.modalRef.current).toBeNull()
      expect(result.current.refs.pickerRef.current).toBeNull()
    })
  })

  describe('handlers', () => {
    it('open handler sets isOpen to true', () => {
      const { result } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })

      expect(result.current.isOpen).toBe(true)
    })

    it('close handler sets isOpen to false', () => {
      const { result } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.handlers.close()
      })
      expect(result.current.isOpen).toBe(false)
    })

    it('toggle handler toggles isOpen state', () => {
      const { result } = renderHook(() => useModalState())

      expect(result.current.isOpen).toBe(false)

      act(() => {
        result.current.handlers.toggle()
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.handlers.toggle()
      })
      expect(result.current.isOpen).toBe(false)
    })

    it('handlers are memoized', () => {
      const { result, rerender } = renderHook(() => useModalState())

      const firstHandlers = result.current.handlers

      rerender()

      expect(result.current.handlers.open).toBe(firstHandlers.open)
      expect(result.current.handlers.close).toBe(firstHandlers.close)
      expect(result.current.handlers.toggle).toBe(firstHandlers.toggle)
    })
  })

  describe('integration with useClickOutside', () => {
    it('calls useClickOutside with correct parameters', () => {
      const { result } = renderHook(() => useModalState())

      expect(mockUseClickOutside).toHaveBeenCalledWith(
        false, // isOpen starts as false
        result.current.refs.pickerRef,
        result.current.refs.modalRef,
        result.current.handlers.close
      )
    })

    it('updates useClickOutside when isOpen changes', () => {
      const { result } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })

      expect(mockUseClickOutside).toHaveBeenLastCalledWith(
        true, // isOpen is now true
        result.current.refs.pickerRef,
        result.current.refs.modalRef,
        result.current.handlers.close
      )
    })
  })

  describe('integration with useEscapeKey', () => {
    it('calls useEscapeKey with correct parameters', () => {
      const { result } = renderHook(() => useModalState())

      expect(mockUseEscapeKey).toHaveBeenCalledWith(
        false, // isOpen starts as false
        result.current.handlers.close
      )
    })

    it('updates useEscapeKey when isOpen changes', () => {
      const { result } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })

      expect(mockUseEscapeKey).toHaveBeenLastCalledWith(
        true, // isOpen is now true
        result.current.handlers.close
      )
    })
  })

  describe('integration with useFocusTrap', () => {
    it('calls useFocusTrap with correct default parameters', () => {
      const { result } = renderHook(() => useModalState())

      expect(mockUseFocusTrap).toHaveBeenCalledWith({
        containerRef: result.current.refs.modalRef,
        enabled: false, // isOpen starts as false
        autoFocus: true, // default
        restoreFocus: true // default
      })
    })

    it('updates useFocusTrap when isOpen changes', () => {
      const { result } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })

      expect(mockUseFocusTrap).toHaveBeenLastCalledWith({
        containerRef: result.current.refs.modalRef,
        enabled: true, // isOpen is now true
        autoFocus: true,
        restoreFocus: true
      })
    })

    it('respects custom autoFocus option', () => {
      const { result } = renderHook(() => useModalState({ autoFocus: false }))

      expect(mockUseFocusTrap).toHaveBeenCalledWith({
        containerRef: result.current.refs.modalRef,
        enabled: false,
        autoFocus: false,
        restoreFocus: true
      })
    })

    it('respects custom restoreFocus option', () => {
      const { result } = renderHook(() =>
        useModalState({ restoreFocus: false })
      )

      expect(mockUseFocusTrap).toHaveBeenCalledWith({
        containerRef: result.current.refs.modalRef,
        enabled: false,
        autoFocus: true,
        restoreFocus: false
      })
    })

    it('handles both custom options', () => {
      const { result } = renderHook(() =>
        useModalState({ autoFocus: false, restoreFocus: false })
      )

      expect(mockUseFocusTrap).toHaveBeenCalledWith({
        containerRef: result.current.refs.modalRef,
        enabled: false,
        autoFocus: false,
        restoreFocus: false
      })
    })
  })

  describe('state persistence across re-renders', () => {
    it('maintains isOpen state across re-renders', () => {
      const { result, rerender } = renderHook(() => useModalState())

      act(() => {
        result.current.handlers.open()
      })
      expect(result.current.isOpen).toBe(true)

      rerender()
      expect(result.current.isOpen).toBe(true)
    })

    it('maintains refs across re-renders', () => {
      const { result, rerender } = renderHook(() => useModalState())

      const firstModalRef = result.current.refs.modalRef
      const firstPickerRef = result.current.refs.pickerRef

      rerender()

      expect(result.current.refs.modalRef).toBe(firstModalRef)
      expect(result.current.refs.pickerRef).toBe(firstPickerRef)
    })
  })

  describe('options handling', () => {
    it('uses default options when none provided', () => {
      renderHook(() => useModalState())

      expect(mockUseFocusTrap).toHaveBeenCalledWith(
        expect.objectContaining({
          autoFocus: true,
          restoreFocus: true
        })
      )
    })

    it('merges provided options with defaults', () => {
      renderHook(() => useModalState({ autoFocus: false }))

      expect(mockUseFocusTrap).toHaveBeenCalledWith(
        expect.objectContaining({
          autoFocus: false,
          restoreFocus: true // default preserved
        })
      )
    })

    it('handles undefined options gracefully', () => {
      renderHook(() => useModalState(undefined))

      expect(mockUseFocusTrap).toHaveBeenCalledWith(
        expect.objectContaining({
          autoFocus: true,
          restoreFocus: true
        })
      )
    })
  })

  describe('return structure', () => {
    it('returns all expected properties', () => {
      const { result } = renderHook(() => useModalState())

      expect(result.current).toHaveProperty('isOpen')
      expect(result.current).toHaveProperty('handlers')
      expect(result.current).toHaveProperty('refs')

      expect(typeof result.current.isOpen).toBe('boolean')
      expect(typeof result.current.handlers).toBe('object')
      expect(typeof result.current.refs).toBe('object')

      expect(result.current.handlers).toHaveProperty('open')
      expect(result.current.handlers).toHaveProperty('close')
      expect(result.current.handlers).toHaveProperty('toggle')

      expect(result.current.refs).toHaveProperty('modalRef')
      expect(result.current.refs).toHaveProperty('pickerRef')
    })

    it('handlers are functions', () => {
      const { result } = renderHook(() => useModalState())

      expect(typeof result.current.handlers.open).toBe('function')
      expect(typeof result.current.handlers.close).toBe('function')
      expect(typeof result.current.handlers.toggle).toBe('function')
    })

    it('refs are React refs', () => {
      const { result } = renderHook(() => useModalState())

      expect(result.current.refs.modalRef).toHaveProperty('current')
      expect(result.current.refs.pickerRef).toHaveProperty('current')
    })
  })
})
