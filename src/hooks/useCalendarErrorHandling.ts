import { useMemo } from 'react'
import type { CalendarError } from '../types/calendar'
import { useCallbackOnChange } from './useCallbackOnChange'

/**
 * Hook for handling calendar errors
 *
 * This hook consolidates error handling logic for calendar components.
 * It combines constraints errors and initValue errors, and calls the onError
 * callback when errors change.
 *
 * @param constraintsErrors - Errors from constraints normalization
 * @param initValueErrors - Errors from initValue normalization
 * @param onError - Optional callback to handle errors
 *
 * @example
 * ```tsx
 * const constraintsResult = normalizeConstraintsProps(...)
 * const initValueResult = normalizeInitValueWithErrors(...)
 *
 * useCalendarErrorHandling(
 *   constraintsResult.errors,
 *   initValueResult.errors,
 *   onError
 * )
 * ```
 */
export function useCalendarErrorHandling(
  constraintsErrors: CalendarError[],
  initValueErrors: CalendarError[],
  onError?: (errors: CalendarError[]) => void
): void {
  // Collect all errors
  const allErrors = useMemo(
    () => [...constraintsErrors, ...initValueErrors],
    [constraintsErrors, initValueErrors]
  )

  // Use callback on change hook for error handling
  // Use custom comparison to detect actual error changes (not just reference changes)
  useCallbackOnChange(
    allErrors,
    (errors) => {
      if (errors.length > 0 && onError) {
        onError(errors)
      }
    },
    (a, b) => {
      // Compare arrays by content, not reference
      if (!a || !b) return a === b
      if (a.length !== b.length) return false
      return a.every(
        (error, index) =>
          error.type === b[index]?.type &&
          error.field === b[index]?.field &&
          error.message === b[index]?.message
      )
    }
  )
}
