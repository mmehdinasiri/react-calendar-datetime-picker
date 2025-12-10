import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useEscapeKey } from '@/hooks/useEscapeKey'

describe('useEscapeKey', () => {
  it('calls onClose when Escape key is pressed and isOpen is true', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(true, onClose))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when Escape key is pressed but isOpen is false', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(false, onClose))

    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not call onClose when other keys are pressed', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(true, onClose))

    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    document.dispatchEvent(event)

    expect(onClose).not.toHaveBeenCalled()
  })
})
