/**
 * useCalendarState Hook
 * Refactored into a clean, modular structure
 * Main hook is now small (~50 lines), only responsible for:
 * - creating reducer context
 * - calling useReducer
 * - syncing initValue
 * - exposing action creators
 */

import { useReducer, useEffect, useRef } from 'react'
import type {
  Day,
  Range,
  Multi,
  CalendarLocale,
  CalendarType,
  CalendarTranslations,
  CalendarUILocale,
  RangeDate
} from '../../types'
import {
  extractMonthFromValue,
  areNormalizedValuesEqual
} from '../../utils/normalize'
import { getToday, convertToJsDate } from '../../utils/date-conversion'
import { formatValueToString } from '../../utils/formatting'
import { getNumberSystem } from '../../utils/translations'
import type { CalendarState, CalendarAction, ReducerContext } from './types'
import { calendarReducer } from './reducers'
import { createActions } from './actions'

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
  /** Callback when value changes */
  onChange: (
    normalizedValue: Day | Range | Multi | null,
    jsDateValue: Date | RangeDate | Date[] | null,
    formattedString: string | null
  ) => void
  /** Callback when calendar value changes (requires initValue) */
  onCalenderChange?: (
    normalizedValue: Day | Range | Multi | null,
    jsDateValue: Date | RangeDate | Date[] | null,
    formattedString: string | null
  ) => void
  /** Custom date format string */
  dateFormat?: string
  /** Locale for formatting */
  locale?: CalendarUILocale
  /** Translations object (includes number system and labels) */
  translations?: CalendarTranslations
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
    onCalenderChange,
    dateFormat,
    locale,
    translations
  } = options

  // Extract month from normalized initValue for initial display month
  const monthFromInitValue = extractMonthFromValue(initValue || null)

  // Initial state
  const initialState: CalendarState = {
    selectedValue: initValue || null,
    displayMonth: monthFromInitValue || getToday(calendarSystem),
    currentView: 'calendar'
  }

  // Reducer context
  const context: ReducerContext = {
    type,
    calendarSystem,
    withTime,
    numberOfMonths,
    weekStart
  }

  // Track emitted values for callback handling
  // Using ref to store emitted values from reducers (written in reducer, read in useEffect)
  const emittedValueRef = useRef<Day | Range | Multi | null | undefined>(
    undefined
  )

  // Reducer wrapper that includes context
  // Note: Reducers are called by React when dispatch is invoked (from event handlers),
  // not during render, so writing to refs here is safe
  const reducer = (state: CalendarState, action: CalendarAction) => {
    const result = calendarReducer(state, action, context)

    // Store emitted value for callback handling in useEffect
    // This is safe: reducers run outside render phase when dispatch is called
    if (result.emittedValue !== undefined) {
      emittedValueRef.current = result.emittedValue
    }

    return result.state
  }

  // Note: The linter warning about ref access is a false positive.
  // Reducers are only called when dispatch is invoked (from event handlers),
  // not during render. Writing to refs in reducers is safe and a common pattern.
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState)

  // Track previous initValue to detect changes
  const prevInitValueRef = useRef(initValue)

  // Sync initValue when it changes externally
  // Use deep content comparison instead of reference comparison to prevent
  // unnecessary re-synchronization when props are recreated with identical content
  // This fixes a race condition in test environments where object references change
  // even when the content (year, month, day, etc.) remains the same
  useEffect(() => {
    if (!areNormalizedValuesEqual(initValue, prevInitValueRef.current)) {
      dispatch({ type: 'SYNC_INIT_VALUE', payload: initValue || null })
      prevInitValueRef.current = initValue
    }
  }, [initValue])

  // Handle value emission (onChange / onCalenderChange) via useEffect
  // This runs after state updates, calling callbacks with emitted values
  // Conversion and formatting happen at the output boundary
  useEffect(() => {
    if (emittedValueRef.current !== undefined) {
      const normalizedValue = emittedValueRef.current
      emittedValueRef.current = undefined // Clear before calling callbacks

      // Convert to JavaScript Date objects (always Gregorian)
      const jsDateValue = convertToJsDate(normalizedValue, type, calendarSystem)

      // Determine number system from locale or translations
      const numberSystem =
        translations?.numbers || (locale ? getNumberSystem(locale) : 'latin')

      // Get from/to labels from translations
      const fromLabel = translations?.labels?.from || 'from'
      const toLabel = translations?.labels?.to || 'to'

      // Format to string
      const formattedString = formatValueToString(
        normalizedValue,
        type,
        numberSystem,
        withTime,
        dateFormat,
        fromLabel,
        toLabel
      )

      // Call onChange with three parameters
      onChange(normalizedValue, jsDateValue, formattedString)

      if (onCalenderChange && initValue !== undefined) {
        onCalenderChange(normalizedValue, jsDateValue, formattedString)
      }
    }
  }, [
    state.selectedValue,
    onChange,
    onCalenderChange,
    initValue,
    type,
    calendarSystem,
    withTime,
    dateFormat,
    locale,
    translations
  ])

  // Create action creators
  const actions = createActions(dispatch)

  return {
    state,
    actions
  }
}

// Re-export types
export type { CalendarState, CalendarAction } from './types'
