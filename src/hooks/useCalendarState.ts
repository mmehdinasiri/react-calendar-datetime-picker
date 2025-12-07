/**
 * useCalendarState Hook
 * Manages calendar state using useReducer
 */

import { useReducer, useEffect, useRef } from 'react'
import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType
} from '../types'
import { extractMonthFromValue } from '../utils/normalize'
import { getToday } from '../utils/date-conversion'
import { getWeekBounds, getMonthsToDisplay } from '../utils/calendar-grid'

/**
 * Calendar state
 */
export interface CalendarState {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | Week | null
  /** Currently displayed month */
  displayMonth: Day
  /** Current view: 'calendar', 'months', or 'years' */
  currentView: 'calendar' | 'months' | 'years'
}

/**
 * Calendar actions
 */
export type CalendarAction =
  | { type: 'SELECT_DATE'; payload: Day }
  | { type: 'SELECT_RANGE_START'; payload: Day }
  | { type: 'SELECT_RANGE_END'; payload: Day }
  | { type: 'SELECT_WEEK'; payload: Day }
  | { type: 'SELECT_RANGE_DIRECT'; payload: Range }
  | { type: 'TOGGLE_MULTI_DATE'; payload: Day }
  | { type: 'UPDATE_TIME'; payload: { day: Day; hour: number; minute: number } }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_DISPLAY_MONTH'; payload: Day }
  | { type: 'NAVIGATE_MONTH'; payload: 'prev' | 'next' }
  | { type: 'SET_VIEW'; payload: 'calendar' | 'months' | 'years' }
  | { type: 'SELECT_MONTH'; payload: number }
  | { type: 'SELECT_YEAR'; payload: number }
  | { type: 'SYNC_INIT_VALUE'; payload: Day | Range | Multi | Week | null }
  | { type: 'GO_TO_TODAY' }

/**
 * Calculate new value based on selection type
 */
function calculateNewValue(
  currentValue: Day | Range | Multi | Week | null,
  selectedDay: Day,
  type: CalendarType,
  calendarSystem: CalendarLocale = 'gregorian',
  weekStart?: number
): Day | Range | Multi | Week | null {
  if (type === 'single') {
    return selectedDay
  }

  if (type === 'week') {
    // Calculate week bounds for the selected day
    return getWeekBounds(selectedDay, calendarSystem, weekStart)
  }

  if (type === 'range') {
    const currentRange = currentValue as Range | null

    // If no range exists or range is complete, start new range
    if (!currentRange || !currentRange.from || currentRange.to) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { from: selectedDay, to: null as any }
    }

    // If we have a start date, set end date
    if (currentRange.from) {
      // If selected day is before start date, make it the new start
      if (
        selectedDay.year < currentRange.from.year ||
        (selectedDay.year === currentRange.from.year &&
          selectedDay.month < currentRange.from.month) ||
        (selectedDay.year === currentRange.from.year &&
          selectedDay.month === currentRange.from.month &&
          selectedDay.day < currentRange.from.day)
      ) {
        return { from: selectedDay, to: currentRange.from }
      }

      // Otherwise, set as end date
      return { from: currentRange.from, to: selectedDay }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { from: selectedDay, to: null as any }
  }

  if (type === 'multi') {
    const currentMulti = (currentValue as Multi) || []

    // Check if day is already selected
    const isSelected = currentMulti.some(
      (day) =>
        day.year === selectedDay.year &&
        day.month === selectedDay.month &&
        day.day === selectedDay.day
    )

    if (isSelected) {
      // Remove from selection
      return currentMulti.filter(
        (day) =>
          !(
            day.year === selectedDay.year &&
            day.month === selectedDay.month &&
            day.day === selectedDay.day
          )
      )
    }

    // Add to selection
    return [...currentMulti, selectedDay]
  }

  return null
}

/**
 * Navigate to next/previous month
 */
function navigateMonth(
  currentMonth: Day,
  direction: 'prev' | 'next',
  _calendarSystem: CalendarLocale
): Day {
  let newMonth = currentMonth.month + (direction === 'next' ? 1 : -1)
  let newYear = currentMonth.year

  if (newMonth > 12) {
    newMonth = 1
    newYear++
  } else if (newMonth < 1) {
    newMonth = 12
    newYear--
  }

  return { year: newYear, month: newMonth, day: 1 }
}

/**
 * Add system time to a day if withTime is enabled and time is missing
 */
function addSystemTimeIfNeeded(day: Day, withTime: boolean): Day {
  if (withTime && (day.hour === undefined || day.minute === undefined)) {
    const now = new Date()
    return {
      ...day,
      hour: now.getHours(),
      minute: now.getMinutes()
    }
  }
  return day
}

/**
 * Calendar reducer
 */
function calendarReducer(
  state: CalendarState,
  action: CalendarAction,
  type: CalendarType,
  calendarSystem: CalendarLocale,
  withTime: boolean = false,
  numberOfMonths: number = 1,
  weekStart?: number
): CalendarState {
  switch (action.type) {
    case 'SELECT_DATE': {
      // Add system time if needed before calculating new value
      const dayWithTime = addSystemTimeIfNeeded(action.payload, withTime)
      const newValue = calculateNewValue(
        state.selectedValue,
        dayWithTime,
        type,
        calendarSystem,
        weekStart
      )

      // Ensure both from and to have time if withTime is enabled and it's a range
      let finalValue = newValue
      if (type === 'range' && withTime && newValue) {
        const range = newValue as Range
        if (range.from && range.to) {
          finalValue = {
            from: addSystemTimeIfNeeded(range.from, withTime),
            to: addSystemTimeIfNeeded(range.to, withTime)
          } as Range
        } else if (range.from) {
          finalValue = {
            from: addSystemTimeIfNeeded(range.from, withTime),
            to: range.to
          } as Range
        }
      }

      // Only update displayMonth when starting a new selection, not when completing a range
      // Also, don't navigate if the selected month is already visible in multi-month view
      let newDisplayMonth = state.displayMonth
      if (type === 'range') {
        const currentRange = state.selectedValue as Range | null
        // Only navigate if starting a new range (no range exists or range is complete)
        if (!currentRange || !currentRange.from || currentRange.to) {
          const monthFromValue = extractMonthFromValue(finalValue)
          // Check if the month is already visible in multi-month view
          if (monthFromValue && numberOfMonths > 1) {
            const visibleMonths = getMonthsToDisplay(
              state.displayMonth,
              numberOfMonths,
              calendarSystem
            )
            const isMonthVisible = visibleMonths.some(
              (m) =>
                m.year === monthFromValue.year &&
                m.month === monthFromValue.month
            )
            if (isMonthVisible) {
              // Keep current displayMonth if the selected month is already visible
              newDisplayMonth = state.displayMonth
            } else {
              newDisplayMonth = monthFromValue
            }
          } else {
            newDisplayMonth = monthFromValue || state.displayMonth
          }
        }
        // Otherwise, keep the current displayMonth when selecting end date
      } else {
        // For single and multi, check if month is already visible before navigating
        const monthFromValue = extractMonthFromValue(finalValue)
        if (monthFromValue && numberOfMonths > 1) {
          const visibleMonths = getMonthsToDisplay(
            state.displayMonth,
            numberOfMonths,
            calendarSystem
          )
          const isMonthVisible = visibleMonths.some(
            (m) =>
              m.year === monthFromValue.year && m.month === monthFromValue.month
          )
          if (isMonthVisible) {
            // Keep current displayMonth if the selected month is already visible
            newDisplayMonth = state.displayMonth
          } else {
            newDisplayMonth = monthFromValue
          }
        } else {
          newDisplayMonth = monthFromValue || state.displayMonth
        }
      }

      return {
        ...state,
        selectedValue: finalValue,
        displayMonth: newDisplayMonth,
        currentView: 'calendar'
      }
    }

    case 'SELECT_RANGE_START': {
      const fromWithTime = addSystemTimeIfNeeded(action.payload, withTime)
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectedValue: { from: fromWithTime, to: null as any },
        displayMonth: {
          year: action.payload.year,
          month: action.payload.month,
          day: 1
        }
      }
    }

    case 'SELECT_RANGE_END': {
      const currentRange = state.selectedValue as Range | null
      if (!currentRange || !currentRange.from) {
        return state
      }

      const toWithTime = addSystemTimeIfNeeded(action.payload, withTime)
      const fromWithTime = addSystemTimeIfNeeded(currentRange.from, withTime)

      return {
        ...state,
        selectedValue: { from: fromWithTime, to: toWithTime }
      }
    }

    case 'SELECT_WEEK': {
      // Calculate week bounds for the selected day
      const weekBounds = getWeekBounds(
        action.payload,
        calendarSystem,
        weekStart
      )
      const newValue: Week = {
        from: addSystemTimeIfNeeded(weekBounds.from, withTime),
        to: addSystemTimeIfNeeded(weekBounds.to, withTime)
      }

      const monthFromValue = extractMonthFromValue(newValue)
      const newDisplayMonth = monthFromValue || state.displayMonth

      return {
        ...state,
        selectedValue: newValue,
        displayMonth: newDisplayMonth,
        currentView: 'calendar'
      }
    }

    case 'SELECT_RANGE_DIRECT': {
      // Directly set a range (used for preset ranges)
      const newValue: Range = {
        from: addSystemTimeIfNeeded(action.payload.from, withTime),
        to: addSystemTimeIfNeeded(action.payload.to, withTime)
      }

      const monthFromValue = extractMonthFromValue(newValue)
      const newDisplayMonth = monthFromValue || state.displayMonth

      return {
        ...state,
        selectedValue: newValue,
        displayMonth: newDisplayMonth,
        currentView: 'calendar'
      }
    }

    case 'TOGGLE_MULTI_DATE': {
      const newValue = calculateNewValue(
        state.selectedValue,
        action.payload,
        'multi',
        calendarSystem,
        weekStart
      )
      return {
        ...state,
        selectedValue: newValue
      }
    }

    case 'UPDATE_TIME': {
      const { day, hour, minute } = action.payload
      const updatedDay: Day = { ...day, hour, minute }

      if (type === 'single') {
        return {
          ...state,
          selectedValue: updatedDay
        }
      }

      if (type === 'range') {
        const currentRange = state.selectedValue as Range | null
        if (!currentRange) {
          return state
        }

        // Check if the day matches the start or end date
        const isStartDate =
          currentRange.from &&
          currentRange.from.year === day.year &&
          currentRange.from.month === day.month &&
          currentRange.from.day === day.day

        const isEndDate =
          currentRange.to &&
          currentRange.to.year === day.year &&
          currentRange.to.month === day.month &&
          currentRange.to.day === day.day

        if (isStartDate) {
          return {
            ...state,
            selectedValue: {
              ...currentRange,
              from: updatedDay
            }
          }
        }

        if (isEndDate) {
          return {
            ...state,
            selectedValue: {
              ...currentRange,
              to: updatedDay
            }
          }
        }

        return state
      }

      if (type === 'week') {
        const currentWeek = state.selectedValue as Week | null
        if (!currentWeek) {
          return state
        }

        // Check if the day matches the start or end date
        const isStartDate =
          currentWeek.from &&
          currentWeek.from.year === day.year &&
          currentWeek.from.month === day.month &&
          currentWeek.from.day === day.day

        const isEndDate =
          currentWeek.to &&
          currentWeek.to.year === day.year &&
          currentWeek.to.month === day.month &&
          currentWeek.to.day === day.day

        if (isStartDate) {
          return {
            ...state,
            selectedValue: {
              ...currentWeek,
              from: updatedDay
            }
          }
        }

        if (isEndDate) {
          return {
            ...state,
            selectedValue: {
              ...currentWeek,
              to: updatedDay
            }
          }
        }

        return state
      }

      // Multi mode doesn't support time selection
      return state
    }

    case 'CLEAR_SELECTION': {
      return {
        ...state,
        selectedValue: null
      }
    }

    case 'SET_DISPLAY_MONTH': {
      return {
        ...state,
        displayMonth: action.payload
      }
    }

    case 'NAVIGATE_MONTH': {
      return {
        ...state,
        displayMonth: navigateMonth(
          state.displayMonth,
          action.payload,
          calendarSystem
        )
      }
    }

    case 'SET_VIEW': {
      return {
        ...state,
        currentView: action.payload
      }
    }

    case 'SELECT_MONTH': {
      return {
        ...state,
        displayMonth: {
          ...state.displayMonth,
          month: action.payload,
          day: 1
        },
        currentView: 'calendar'
      }
    }

    case 'SELECT_YEAR': {
      return {
        ...state,
        displayMonth: {
          ...state.displayMonth,
          year: action.payload,
          day: 1
        },
        currentView: 'months'
      }
    }

    case 'SYNC_INIT_VALUE': {
      const monthFromValue = extractMonthFromValue(action.payload)

      return {
        ...state,
        selectedValue: action.payload,
        displayMonth: monthFromValue || state.displayMonth
      }
    }

    case 'GO_TO_TODAY': {
      const today = getToday(calendarSystem)
      return {
        ...state,
        displayMonth: { year: today.year, month: today.month, day: 1 },
        currentView: 'calendar'
      }
    }

    default:
      return state
  }
}

/**
 * Hook options
 */
export interface UseCalendarStateOptions {
  /** Initial value - should be normalized (Day | Range | Multi | null) */
  initValue?: Day | Range | Multi | null
  /** Calendar system */
  calendarSystem: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Enable time selection */
  withTime?: boolean
  /** Number of months displayed */
  numberOfMonths?: 1 | 2 | 3
  /** First day of the week (0 = Sunday, 6 = Saturday) */
  weekStart?: number
  /** Callback when value changes - accepts InitValueInput for compatibility with React's setState */
  onChange: (value: Day | Range | Multi | null) => void
  /** Callback when calendar value changes (requires initValue) */
  onCalenderChange?: (value: Day | Range | Multi | null) => void
}

/**
 * useCalendarState Hook
 */
export function useCalendarState(options: UseCalendarStateOptions) {
  const {
    initValue,
    calendarSystem,
    type,
    withTime = false,
    numberOfMonths = 1,
    weekStart,
    onChange,
    onCalenderChange
  } = options

  // Extract month from normalized initValue for initial display month
  const monthFromInitValue = extractMonthFromValue(initValue || null)

  // Initial state - use normalized initValue if provided
  const initialState: CalendarState = {
    selectedValue: initValue || null,
    displayMonth: monthFromInitValue || getToday(calendarSystem),
    currentView: 'calendar'
  }

  // Reducer with type, calendarSystem, withTime, numberOfMonths, and weekStart
  const reducer = (state: CalendarState, action: CalendarAction) =>
    calendarReducer(
      state,
      action,
      type,
      calendarSystem,
      withTime,
      numberOfMonths,
      weekStart
    )

  const [state, dispatch] = useReducer(reducer, initialState)

  // Track previous initValue to detect changes
  const prevInitValueRef = useRef(initValue)

  // Sync initValue when it changes externally
  useEffect(() => {
    if (initValue !== prevInitValueRef.current) {
      dispatch({ type: 'SYNC_INIT_VALUE', payload: initValue || null })
      prevInitValueRef.current = initValue
    }
  }, [initValue])

  // Handle date selection
  const handleDateSelect = (day: Day) => {
    // The reducer will add system time if needed
    dispatch({ type: 'SELECT_DATE', payload: day })

    // Calculate new value with system time added if needed
    const dayWithTime = addSystemTimeIfNeeded(day, withTime)
    const newValue = calculateNewValue(
      state.selectedValue,
      dayWithTime,
      type,
      calendarSystem
    )
    onChange(newValue)

    // Call onCalenderChange if provided and initValue exists
    if (onCalenderChange && initValue !== undefined) {
      onCalenderChange(newValue)
    }
  }

  // Handle time update
  const handleTimeUpdate = (day: Day, hour: number, minute: number) => {
    dispatch({ type: 'UPDATE_TIME', payload: { day, hour, minute } })

    // Calculate new value with updated time
    let newValue: Day | Range | Multi | Week | null = null

    if (type === 'single') {
      newValue = { ...day, hour, minute }
    } else if (type === 'range') {
      const currentRange = state.selectedValue as Range | null
      if (currentRange) {
        const isStartDate =
          currentRange.from &&
          currentRange.from.year === day.year &&
          currentRange.from.month === day.month &&
          currentRange.from.day === day.day

        const isEndDate =
          currentRange.to &&
          currentRange.to.year === day.year &&
          currentRange.to.month === day.month &&
          currentRange.to.day === day.day

        if (isStartDate) {
          newValue = {
            ...currentRange,
            from: { ...day, hour, minute }
          }
        } else if (isEndDate) {
          newValue = {
            ...currentRange,
            to: { ...day, hour, minute }
          }
        } else {
          newValue = currentRange
        }
      }
    } else if (type === 'week') {
      const currentWeek = state.selectedValue as Week | null
      if (currentWeek) {
        const isStartDate =
          currentWeek.from &&
          currentWeek.from.year === day.year &&
          currentWeek.from.month === day.month &&
          currentWeek.from.day === day.day

        const isEndDate =
          currentWeek.to &&
          currentWeek.to.year === day.year &&
          currentWeek.to.month === day.month &&
          currentWeek.to.day === day.day

        if (isStartDate) {
          newValue = {
            ...currentWeek,
            from: { ...day, hour, minute }
          }
        } else if (isEndDate) {
          newValue = {
            ...currentWeek,
            to: { ...day, hour, minute }
          }
        } else {
          newValue = currentWeek
        }
      }
    }
    // Multi mode doesn't support time selection

    if (newValue !== null) {
      onChange(newValue)
      if (onCalenderChange && initValue !== undefined) {
        onCalenderChange(newValue)
      }
    }
  }

  // Handle preset range selection
  const handlePresetRangeSelect = (range: Range) => {
    dispatch({ type: 'SELECT_RANGE_DIRECT', payload: range })
    onChange(range)
    if (onCalenderChange && initValue !== undefined) {
      onCalenderChange(range)
    }
  }

  // Actions
  const actions = {
    selectDate: handleDateSelect,
    updateTime: handleTimeUpdate,
    selectPresetRange: handlePresetRangeSelect,
    clearSelection: () => {
      dispatch({ type: 'CLEAR_SELECTION' })
      onChange(null)
    },
    navigateMonth: (direction: 'prev' | 'next') => {
      dispatch({ type: 'NAVIGATE_MONTH', payload: direction })
    },
    setView: (view: 'calendar' | 'months' | 'years') => {
      dispatch({ type: 'SET_VIEW', payload: view })
    },
    selectMonth: (month: number) => {
      dispatch({ type: 'SELECT_MONTH', payload: month })
    },
    selectYear: (year: number) => {
      dispatch({ type: 'SELECT_YEAR', payload: year })
    },
    goToToday: () => {
      dispatch({ type: 'GO_TO_TODAY' })
    }
  }

  return {
    state,
    actions
  }
}
