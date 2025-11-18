/**
 * Keyboard Navigation Hook
 * Handles arrow key navigation, keyboard shortcuts, and date selection
 */

import { useEffect, useCallback, useRef, RefObject } from 'react'
import type { Day, CalendarLocale, CalendarType } from '../types'
import { dateToDay } from '../utils/date-conversion'
import { toGregorian, jalaaliMonthLength } from 'jalaali-js'

export interface UseKeyboardNavigationOptions {
  /** Currently focused date */
  focusedDate: Day
  /** Calendar locale */
  locale: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Container ref to scope keyboard events */
  containerRef: RefObject<HTMLElement>
  /** Whether keyboard navigation is enabled */
  enabled?: boolean
  /** Callback when focused date changes */
  onFocusedDateChange: (date: Day) => void
  /** Callback when date should be selected */
  onDateSelect: (date: Day) => void
  /** Callback to navigate to today */
  onGoToToday?: () => void
  /** Callback to change month */
  onMonthNavigate?: (direction: 'prev' | 'next') => void
  /** Callback to validate if date is selectable */
  isDateSelectable?: (date: Day) => boolean
}

/**
 * Add days to a date
 */
const addDays = (day: Day, daysToAdd: number, locale: CalendarLocale): Day => {
  // Convert to Gregorian for calculation
  let date: Date
  if (locale === 'fa') {
    const greg = toGregorian(day.year, day.month, day.day)
    date = new Date(greg.gy, greg.gm - 1, greg.gd)
  } else {
    date = new Date(day.year, day.month - 1, day.day)
  }

  // Add days
  date.setDate(date.getDate() + daysToAdd)

  // Convert back to the correct locale
  return dateToDay(date, locale)
}

/**
 * Custom hook for keyboard navigation in calendar
 */
export const useKeyboardNavigation = (
  options: UseKeyboardNavigationOptions
) => {
  const {
    focusedDate,
    locale,
    containerRef,
    enabled = true,
    onFocusedDateChange,
    onDateSelect,
    onGoToToday,
    onMonthNavigate,
    isDateSelectable
  } = options

  const focusedDateRef = useRef(focusedDate)

  // Keep ref in sync
  useEffect(() => {
    focusedDateRef.current = focusedDate
  }, [focusedDate])

  /**
   * Navigate to a new date if it's selectable
   * If not selectable, try to find the next selectable date in the same direction
   */
  const navigateToDate = useCallback(
    (newDate: Day, direction: number = 0, attempts: number = 0) => {
      // Prevent infinite loops
      if (attempts > 31) {
        return false
      }

      // Check if date is selectable
      if (isDateSelectable && !isDateSelectable(newDate)) {
        // If we have a direction, try the next date in that direction
        if (direction !== 0) {
          const nextDate = addDays(newDate, direction, locale)
          return navigateToDate(nextDate, direction, attempts + 1)
        }
        return false
      }

      onFocusedDateChange(newDate)
      return true
    },
    [isDateSelectable, onFocusedDateChange, locale]
  )

  /**
   * Handle arrow key navigation
   */
  const handleArrowNavigation = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      const current = focusedDateRef.current
      let daysToAdd = 0

      switch (direction) {
        case 'up':
          daysToAdd = -7
          break
        case 'down':
          daysToAdd = 7
          break
        case 'left':
          daysToAdd = locale === 'fa' ? 1 : -1 // RTL support
          break
        case 'right':
          daysToAdd = locale === 'fa' ? -1 : 1 // RTL support
          break
      }

      const newDate = addDays(current, daysToAdd, locale)

      // Check if we've moved to a different month (including year boundaries)
      const monthChanged = 
        newDate.month !== current.month || 
        newDate.year !== current.year

      if (monthChanged && onMonthNavigate) {
        // Determine navigation direction
        let navDirection: 'prev' | 'next'
        if (newDate.year > current.year) {
          navDirection = 'next'
        } else if (newDate.year < current.year) {
          navDirection = 'prev'
        } else if (newDate.month > current.month) {
          navDirection = 'next'
        } else {
          navDirection = 'prev'
        }
        
        onMonthNavigate(navDirection)
        // Use setTimeout to ensure month navigation completes before focusing
        setTimeout(() => {
          navigateToDate(newDate, daysToAdd)
        }, 0)
      } else {
        // Pass the direction to navigateToDate to skip disabled dates
        navigateToDate(newDate, daysToAdd)
      }
    },
    [locale, onMonthNavigate, navigateToDate]
  )

  /**
   * Handle Home/End keys
   */
  const handleHomeEnd = useCallback(
    (key: 'Home' | 'End') => {
      const current = focusedDateRef.current
      let newDate: Day

      if (key === 'Home') {
        // Go to first day of current month
        newDate = { ...current, day: 1 }
      } else {
        // Go to last day of current month
        if (locale === 'fa') {
          const lastDay = jalaaliMonthLength(current.year, current.month)
          newDate = { ...current, day: lastDay }
        } else {
          const lastDay = new Date(current.year, current.month, 0).getDate()
          newDate = { ...current, day: lastDay }
        }
      }

      navigateToDate(newDate)
    },
    [locale, navigateToDate]
  )

  /**
   * Handle PageUp/PageDown keys
   */
  const handlePageUpDown = useCallback(
    (key: 'PageUp' | 'PageDown') => {
      const direction = key === 'PageUp' ? 'prev' : 'next'

      if (onMonthNavigate) {
        onMonthNavigate(direction)
      }

      // Keep the same day if possible, or adjust to last day of month
      const current = focusedDateRef.current
      const monthDelta = key === 'PageUp' ? -1 : 1

      let newMonth = current.month + monthDelta
      let newYear = current.year

      if (newMonth < 1) {
        newMonth = 12
        newYear--
      } else if (newMonth > 12) {
        newMonth = 1
        newYear++
      }

      // Calculate last day of new month
      let lastDayOfNewMonth: number
      if (locale === 'fa') {
        lastDayOfNewMonth = jalaaliMonthLength(newYear, newMonth)
      } else {
        lastDayOfNewMonth = new Date(newYear, newMonth, 0).getDate()
      }

      const newDay = Math.min(current.day, lastDayOfNewMonth)
      const newDate: Day = { year: newYear, month: newMonth, day: newDay }

      // Use setTimeout to ensure month navigation completes before focusing
      setTimeout(() => {
        navigateToDate(newDate, 0)
      }, 0)
    },
    [locale, onMonthNavigate, navigateToDate]
  )

  /**
   * Handle keyboard events
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const { key, shiftKey, ctrlKey, metaKey } = event

      // Ignore if modifier keys (except Shift) are pressed
      if (ctrlKey || metaKey) return

      let handled = false

      switch (key) {
        // Arrow navigation
        case 'ArrowUp':
          handleArrowNavigation('up')
          handled = true
          break
        case 'ArrowDown':
          handleArrowNavigation('down')
          handled = true
          break
        case 'ArrowLeft':
          handleArrowNavigation('left')
          handled = true
          break
        case 'ArrowRight':
          handleArrowNavigation('right')
          handled = true
          break

        // Select date
        case 'Enter':
        case ' ':
        case 'Spacebar': // For older browsers
          onDateSelect(focusedDateRef.current)
          handled = true
          break

        // Home/End
        case 'Home':
          handleHomeEnd('Home')
          handled = true
          break
        case 'End':
          handleHomeEnd('End')
          handled = true
          break

        // PageUp/PageDown
        case 'PageUp':
          handlePageUpDown('PageUp')
          handled = true
          break
        case 'PageDown':
          handlePageUpDown('PageDown')
          handled = true
          break

        // Today shortcut (T or t)
        case 't':
        case 'T':
          if (onGoToToday && !shiftKey) {
            onGoToToday()
            handled = true
          }
          break
      }

      if (handled) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    [
      enabled,
      handleArrowNavigation,
      handleHomeEnd,
      handlePageUpDown,
      onDateSelect,
      onGoToToday
    ]
  )

  // Attach keyboard event listener
  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [containerRef, enabled, handleKeyDown])

  return {
    focusedDate,
    navigateToDate
  }
}
