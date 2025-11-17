/**
 * useCalendarState Hook
 * Manages calendar state using useReducer
 */

import { useReducer, useEffect, useRef } from 'react'
import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'
import { extractMonthFromValue } from '../utils/normalize'
import { getToday, dateToDay } from '../utils/date-conversion'

/**
 * Calendar state
 */
export interface CalendarState {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | null
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
  | { type: 'TOGGLE_MULTI_DATE'; payload: Day }
  | { type: 'UPDATE_TIME'; payload: { day: Day; hour: number; minute: number } }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_DISPLAY_MONTH'; payload: Day }
  | { type: 'NAVIGATE_MONTH'; payload: 'prev' | 'next' }
  | { type: 'SET_VIEW'; payload: 'calendar' | 'months' | 'years' }
  | { type: 'SELECT_MONTH'; payload: number }
  | { type: 'SELECT_YEAR'; payload: number }
  | { type: 'SYNC_INIT_VALUE'; payload: Day | Range | Multi | null }
  | { type: 'GO_TO_TODAY' }

/**
 * Calculate new value based on selection type
 */
function calculateNewValue(
  currentValue: Day | Range | Multi | null,
  selectedDay: Day,
  type: CalendarType
): Day | Range | Multi | null {
  if (type === 'single') {
    return selectedDay
  }

  if (type === 'range') {
    const currentRange = currentValue as Range | null

    // If no range exists or range is complete, start new range
    if (!currentRange || !currentRange.from || currentRange.to) {
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
  _locale: CalendarLocale
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
  locale: CalendarLocale,
  withTime: boolean = false
): CalendarState {
  switch (action.type) {
    case 'SELECT_DATE': {
      // Add system time if needed before calculating new value
      const dayWithTime = addSystemTimeIfNeeded(action.payload, withTime)
      const newValue = calculateNewValue(
        state.selectedValue,
        dayWithTime,
        type
      )

      // Only update displayMonth when starting a new selection, not when completing a range
      let newDisplayMonth = state.displayMonth
      if (type === 'range') {
        const currentRange = state.selectedValue as Range | null
        // Only navigate if starting a new range (no range exists or range is complete)
        if (!currentRange || !currentRange.from || currentRange.to) {
          const monthFromValue = extractMonthFromValue(newValue)
          newDisplayMonth = monthFromValue || state.displayMonth
        }
        // Otherwise, keep the current displayMonth when selecting end date
      } else {
        // For single and multi, always update displayMonth to selected date
        const monthFromValue = extractMonthFromValue(newValue)
        newDisplayMonth = monthFromValue || state.displayMonth
      }

      return {
        ...state,
        selectedValue: newValue,
        displayMonth: newDisplayMonth,
        currentView: 'calendar'
      }
    }

    case 'SELECT_RANGE_START': {
      return {
        ...state,
        selectedValue: { from: action.payload, to: null as any },
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

      return {
        ...state,
        selectedValue: { from: currentRange.from, to: action.payload }
      }
    }

    case 'TOGGLE_MULTI_DATE': {
      const newValue = calculateNewValue(
        state.selectedValue,
        action.payload,
        'multi'
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
        displayMonth: navigateMonth(state.displayMonth, action.payload, locale)
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
      const today = getToday(locale)
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
  /** Calendar locale */
  locale: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Enable time selection */
  withTime?: boolean
  /** Callback when value changes */
  onChange: (value: Day | Range | Multi | null) => void
  /** Callback when calendar value changes (requires initValue) */
  onCalenderChange?: (value: Day | Range | Multi | null) => void
}

/**
 * useCalendarState Hook
 */
export function useCalendarState(options: UseCalendarStateOptions) {
  const { initValue, locale, type, withTime = false, onChange, onCalenderChange } = options

  // Extract month from normalized initValue for initial display month
  const monthFromInitValue = extractMonthFromValue(initValue || null)

  // Initial state - use normalized initValue if provided
  const initialState: CalendarState = {
    selectedValue: initValue || null,
    displayMonth: monthFromInitValue || getToday(locale),
    currentView: 'calendar'
  }

  // Reducer with type, locale, and withTime
  const reducer = (state: CalendarState, action: CalendarAction) =>
    calendarReducer(state, action, type, locale, withTime)

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
    const newValue = calculateNewValue(state.selectedValue, dayWithTime, type)
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
    let newValue: Day | Range | Multi | null = null
    
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
    }
    // Multi mode doesn't support time selection

    if (newValue !== null) {
      onChange(newValue)
      if (onCalenderChange && initValue !== undefined) {
        onCalenderChange(newValue)
      }
    }
  }

  // Actions
  const actions = {
    selectDate: handleDateSelect,
    updateTime: handleTimeUpdate,
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
