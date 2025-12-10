import { useEffect, useRef } from 'react'

/**
 * Callback on change hook
 *
 * Detects when a value changes and calls a callback function.
 * Useful for effects that should only run when a value actually changes,
 * not on every render.
 *
 * This hook prevents issues with:
 * - Infinite loops from effect dependencies
 * - Calling callbacks too frequently
 * - Fragile string-based comparison logic
 *
 * @param value - The value to monitor for changes
 * @param callback - The function to call when value changes
 * @param compareFn - Optional custom comparison function (defaults to ===)
 *
 * @example
 * ```tsx
 * // Simple equality check
 * useCallbackOnChange(errors, (newErrors) => {
 *   onError(newErrors)
 * })
 *
 * // Custom comparison for complex types
 * useCallbackOnChange(
 *   items,
 *   (newItems) => console.log('Items changed'),
 *   (a, b) => JSON.stringify(a) === JSON.stringify(b)
 * )
 * ```
 */
export function useCallbackOnChange<T>(
  value: T,
  callback: (value: T) => void,
  compareFn?: (a: T | undefined, b: T | undefined) => boolean
): void {
  const prevValueRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    // Use custom comparison if provided, otherwise use reference equality (===)
    const hasChanged = compareFn
      ? !compareFn(value, prevValueRef.current)
      : value !== prevValueRef.current

    if (hasChanged) {
      callback(value)
      prevValueRef.current = value
    }
  }, [value, callback, compareFn])
}
