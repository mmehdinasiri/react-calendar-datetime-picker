import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useCallbackOnChange } from '@/hooks/useCallbackOnChange'

describe('useCallbackOnChange', () => {
  it('calls callback when value changes', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 'initial' } }
    )

    expect(callback).toHaveBeenCalledWith('initial')
    expect(callback).toHaveBeenCalledTimes(1)

    // Change the value
    rerender({ value: 'changed' })

    expect(callback).toHaveBeenCalledWith('changed')
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('does not call callback when value stays the same', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 'same' } }
    )

    expect(callback).toHaveBeenCalledWith('same')
    expect(callback).toHaveBeenCalledTimes(1)

    // Re-render with same value
    rerender({ value: 'same' })

    expect(callback).toHaveBeenCalledTimes(1) // Still only called once
  })

  it('calls callback with the new value', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 1 } }
    )

    expect(callback).toHaveBeenCalledWith(1)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 2 })
    expect(callback).toHaveBeenCalledWith(2)

    rerender({ value: 3 })
    expect(callback).toHaveBeenCalledWith(3)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('uses default reference equality comparison', () => {
    const callback = vi.fn()

    const obj1 = { id: 1 }
    const obj2 = { id: 1 } // Different reference, same content

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: obj1 } }
    )

    expect(callback).toHaveBeenCalledWith(obj1)
    expect(callback).toHaveBeenCalledTimes(1)

    // Even though objects have same content, different references trigger callback
    rerender({ value: obj2 })

    expect(callback).toHaveBeenCalledWith(obj2)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('uses custom comparison function when provided', () => {
    const callback = vi.fn()
    const customCompare = vi.fn(
      (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
    )

    const obj1 = { id: 1, name: 'test' }
    const obj2 = { id: 1, name: 'test' } // Same content, different reference

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback, customCompare),
      { initialProps: { value: obj1 } }
    )

    expect(callback).toHaveBeenCalledWith(obj1)
    expect(callback).toHaveBeenCalledTimes(1)

    // Custom comparison should return true (no change), so callback not called again
    rerender({ value: obj2 })

    expect(callback).toHaveBeenCalledTimes(1) // Still only called once
    expect(customCompare).toHaveBeenCalledWith(obj2, obj1)
  })

  it('calls callback when custom comparison detects change', () => {
    const callback = vi.fn()
    const customCompare = vi.fn((a: any, b: any) => a?.id === b?.id)

    const obj1 = { id: 1, name: 'original' }
    const obj2 = { id: 2, name: 'changed' } // Different id

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback, customCompare),
      { initialProps: { value: obj1 } }
    )

    expect(callback).toHaveBeenCalledWith(obj1)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: obj2 })

    expect(callback).toHaveBeenCalledWith(obj2)
    expect(callback).toHaveBeenCalledTimes(2)
    expect(customCompare).toHaveBeenCalledWith(obj2, obj1)
  })

  it('handles undefined values correctly', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: undefined } }
    )

    expect(callback).not.toHaveBeenCalled()

    rerender({ value: 'defined' })

    expect(callback).toHaveBeenCalledWith('defined')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('handles null values correctly', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: null } }
    )

    expect(callback).toHaveBeenCalledWith(null)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 'not-null' })

    expect(callback).toHaveBeenCalledWith('not-null')
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('handles primitive types', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 'string' } }
    )

    expect(callback).toHaveBeenCalledWith('string')
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 'different-string' })
    expect(callback).toHaveBeenCalledWith('different-string')

    rerender({ value: 42 })
    expect(callback).toHaveBeenCalledWith(42)

    rerender({ value: true })
    expect(callback).toHaveBeenCalledWith(true)

    expect(callback).toHaveBeenCalledTimes(4)
  })

  it('calls callback on initial render when value is provided', () => {
    const callback = vi.fn()

    renderHook(() => useCallbackOnChange('initial', callback))

    expect(callback).toHaveBeenCalledWith('initial')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('calls callback multiple times for multiple changes', () => {
    const callback = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 'first' } }
    )

    expect(callback).toHaveBeenCalledWith('first')
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({ value: 'second' })
    expect(callback).toHaveBeenCalledWith('second')
    expect(callback).toHaveBeenCalledTimes(2)

    rerender({ value: 'third' })
    expect(callback).toHaveBeenCalledWith('third')
    expect(callback).toHaveBeenCalledTimes(3)

    rerender({ value: 'second' }) // Back to previous value
    expect(callback).toHaveBeenCalledWith('second')
    expect(callback).toHaveBeenCalledTimes(4)
  })

  it('handles complex custom comparison functions', () => {
    const callback = vi.fn()
    const customCompare = (
      a: number[] | undefined,
      b: number[] | undefined
    ) => {
      if (!a || !b) return false
      return a.length === b.length && a.every((val, idx) => val === b[idx])
    }

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback, customCompare),
      { initialProps: { value: [1, 2, 3] } }
    )

    expect(callback).toHaveBeenCalledWith([1, 2, 3])
    expect(callback).toHaveBeenCalledTimes(1)

    // Same array content
    rerender({ value: [1, 2, 3] })
    expect(callback).toHaveBeenCalledTimes(1) // Still only called once

    // Different array content
    rerender({ value: [1, 2, 4] })
    expect(callback).toHaveBeenCalledWith([1, 2, 4])
    expect(callback).toHaveBeenCalledTimes(2)

    // Different length
    rerender({ value: [1, 2, 3, 4] })
    expect(callback).toHaveBeenCalledWith([1, 2, 3, 4])
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('works with async callbacks', async () => {
    const callback = vi.fn().mockResolvedValue(undefined)

    const { rerender } = renderHook(
      ({ value }) => useCallbackOnChange(value, callback),
      { initialProps: { value: 'initial' } }
    )

    expect(callback).toHaveBeenCalledWith('initial')

    rerender({ value: 'changed' })

    expect(callback).toHaveBeenCalledWith('changed')

    // Wait for potential async operations
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
