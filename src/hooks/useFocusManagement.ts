/**
 * Focus Management Hook
 * Manages focus state for calendar date grid
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Day } from '../types'

export interface UseFocusManagementOptions {
  /** Initial focused date */
  initialDate: Day
  /** Currently selected date */
  selectedDate?: Day | null
}

export interface UseFocusManagementReturn {
  /** Currently focused date */
  focusedDate: Day
  /** Set the focused date */
  setFocusedDate: (date: Day) => void
  /** Reset focus to selected date or initial date */
  resetFocus: () => void
  /** Get ref callback for a date cell */
  getCellRef: (date: Day) => (element: HTMLButtonElement | null) => void
  /** Focus a specific date cell */
  focusDate: (date: Day) => void
}

/**
 * Custom hook for managing focus in calendar
 */
export const useFocusManagement = (
  options: UseFocusManagementOptions
): UseFocusManagementReturn => {
  const { initialDate, selectedDate } = options

  // Use selected date as initial focus if available
  const [focusedDate, setFocusedDate] = useState<Day>(
    selectedDate || initialDate
  )

  // Store refs to all date cells
  const cellRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  /**
   * Generate unique key for a date
   */
  const getDateKey = useCallback((date: Day): string => {
    return `${date.year}-${date.month}-${date.day}`
  }, [])

  /**
   * Get ref callback for a date cell
   */
  const getCellRef = useCallback(
    (date: Day) => (element: HTMLButtonElement | null) => {
      const key = getDateKey(date)
      if (element) {
        cellRefs.current.set(key, element)
      } else {
        cellRefs.current.delete(key)
      }
    },
    [getDateKey]
  )

  /**
   * Focus a specific date cell
   */
  const focusDate = useCallback(
    (date: Day) => {
      const key = getDateKey(date)
      const element = cellRefs.current.get(key)
      if (element) {
        element.focus({ preventScroll: true })
      }
    },
    [getDateKey]
  )

  /**
   * Reset focus to selected date or initial date
   */
  const resetFocus = useCallback(() => {
    const newFocus = selectedDate || initialDate
    setFocusedDate(newFocus)
    focusDate(newFocus)
  }, [selectedDate, initialDate, focusDate])

  /**
   * Update focused date when selected date changes
   */
  useEffect(() => {
    if (selectedDate) {
      setFocusedDate(selectedDate)
    }
  }, [selectedDate])

  /**
   * Focus the focused date cell when it changes
   */
  useEffect(() => {
    const key = getDateKey(focusedDate)
    const element = cellRefs.current.get(key)

    if (element) {
      // Use a small delay to ensure DOM is ready after re-renders
      const timeoutId = setTimeout(() => {
        element.focus({ preventScroll: true })
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [focusedDate, getDateKey])

  return {
    focusedDate,
    setFocusedDate,
    resetFocus,
    getCellRef,
    focusDate
  }
}
