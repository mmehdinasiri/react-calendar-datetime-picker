import { useCallback } from 'react'
import type { Day, Range } from '../types'

/**
 * Calendar actions interface
 */
export interface CalendarActions {
  selectDate: (day: Day) => void
  selectMonth: (month: number) => void
  selectYear: (year: number) => void
  setView: (view: 'calendar' | 'months' | 'years') => void
  navigateMonth: (direction: 'prev' | 'next') => void
  goToToday: () => void
  selectPresetRange?: (range: Range) => void
}

/**
 * Callback handlers returned from useCalendarCallbacks
 */
export interface CalendarCallbackHandlers {
  handleDateSelect: (day: Day) => void
  handleMonthSelect: (month: number) => void
  handleYearSelect: (year: number) => void
  handleViewChange: (view: 'calendar' | 'months' | 'years') => void
  handleMonthNavigate: (direction: 'prev' | 'next') => void
  handleGoToToday: () => void
  handlePresetRangeSelect: (range: Range) => void
}

/**
 * Props for useCalendarCallbacks hook
 */
export interface UseCalendarCallbacksProps {
  /** Calendar actions from state management */
  actions: CalendarActions
  /** Optional date select callback */
  onDateSelect?: (day: Day) => void
  /** Optional month select callback */
  onMonthSelect?: (month: number) => void
  /** Optional year select callback */
  onYearSelect?: (year: number) => void
  /** Optional view change callback */
  onViewChange?: (view: 'calendar' | 'months' | 'years') => void
  /** Optional month navigate callback */
  onMonthNavigate?: (direction: 'prev' | 'next') => void
  /** Optional go to today callback */
  onGoToToday?: () => void
  /** Selection type ('single', 'range', 'multi', 'week') */
  type?: 'single' | 'range' | 'multi' | 'week'
}

/**
 * Calendar callbacks hook
 *
 * Consolidates all callback memoization for calendar interactions.
 * This hook prevents code duplication between DtCalendar and DtPicker
 * by providing a single place to manage all calendar event handlers.
 *
 * Each handler:
 * 1. Calls the appropriate action method
 * 2. Optionally calls the corresponding user callback
 * 3. Is memoized to prevent unnecessary child re-renders
 *
 * @param props - Configuration including actions and optional callbacks
 * @returns Memoized callback handlers
 *
 * @example
 * ```tsx
 * const callbacks = useCalendarCallbacks({
 *   actions,
 *   onDateSelect: (day) => console.log('Selected:', day),
 *   type: 'range'
 * })
 *
 * // Use callbacks in component
 * <CalendarCore onDateSelect={callbacks.handleDateSelect} />
 * ```
 */
export function useCalendarCallbacks({
  actions,
  onDateSelect,
  onMonthSelect,
  onYearSelect,
  onViewChange,
  onMonthNavigate,
  onGoToToday,
  type = 'single'
}: UseCalendarCallbacksProps): CalendarCallbackHandlers {
  const handleDateSelect = useCallback(
    (day: Day) => {
      actions.selectDate(day)
      onDateSelect?.(day)
    },
    [actions, onDateSelect]
  )

  const handleMonthSelect = useCallback(
    (month: number) => {
      actions.selectMonth(month)
      onMonthSelect?.(month)
    },
    [actions, onMonthSelect]
  )

  const handleYearSelect = useCallback(
    (year: number) => {
      actions.selectYear(year)
      onYearSelect?.(year)
    },
    [actions, onYearSelect]
  )

  const handleViewChange = useCallback(
    (view: 'calendar' | 'months' | 'years') => {
      actions.setView(view)
      onViewChange?.(view)
    },
    [actions, onViewChange]
  )

  const handleMonthNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      actions.navigateMonth(direction)
      onMonthNavigate?.(direction)
    },
    [actions, onMonthNavigate]
  )

  const handleGoToToday = useCallback(() => {
    actions.goToToday()
    onGoToToday?.()
  }, [actions, onGoToToday])

  const handlePresetRangeSelect = useCallback(
    (range: Range) => {
      if (type === 'range') {
        // Directly set the range for preset selections
        actions.selectPresetRange?.(range)
      } else if (type === 'week') {
        // For week type, select the start date which will calculate the week bounds
        actions.selectDate(range.from)
      }
    },
    [actions, type]
  )

  return {
    handleDateSelect,
    handleMonthSelect,
    handleYearSelect,
    handleViewChange,
    handleMonthNavigate,
    handleGoToToday,
    handlePresetRangeSelect
  }
}
