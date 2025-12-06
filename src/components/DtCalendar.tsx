import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import type { Day, Range, Multi, InitValueInput } from '../types'
import type {
  CalendarError,
  CalendarSelectionSingle,
  CalendarSelectionRange,
  CalendarSelectionMulti,
  CalendarSelectionWeek,
  SharedCalendarProps
} from '../types/calendar'
import { CalendarCore } from './CalendarCore'
import { useCalendarState } from '../hooks/useCalendarState'
import {
  normalizeInitValueWithErrors,
  areValuesEqual
} from '../utils/normalize'
import { normalizeConstraintsProps } from '../utils/constraints'

interface DtCalendarPropsBase extends SharedCalendarProps {
  /**
   * Callback that runs when the calendar value is changed
   * Note: requires initValue to be provided
   */
  onCalenderChange?: (date: Day | Range | Multi | null) => void
  /**
   * Enlarge selected day text
   * @default true
   */
  enlargeSelectedDay?: boolean
  /**
   * Enable dark theme
   * @default false
   */
  dark?: boolean
  /**
   * Callback function called when normalization or constraint errors occur
   * @param errors - Array of error objects describing what failed
   */
  onError?: (errors: CalendarError[]) => void
}

export interface DtCalendarPropsSingle
  extends DtCalendarPropsBase, CalendarSelectionSingle {}

export interface DtCalendarPropsRange
  extends DtCalendarPropsBase, CalendarSelectionRange {}

export interface DtCalendarPropsMulti
  extends DtCalendarPropsBase, CalendarSelectionMulti {}

export interface DtCalendarPropsWeek
  extends DtCalendarPropsBase, CalendarSelectionWeek {}

export type DtCalendarProps =
  | DtCalendarPropsSingle
  | DtCalendarPropsRange
  | DtCalendarPropsMulti
  | DtCalendarPropsWeek

/**
 * DtCalendar Component
 *
 * A standalone calendar component without input field.
 *
 * @example
 * ```tsx
 * import { DtCalendar } from 'react-calendar-datetime-picker'
 *
 * function App() {
 *   const [date, setDate] = useState(null)
 *   return <DtCalendar onChange={setDate} local="fa" />
 * }
 * ```
 */
export const DtCalendar: React.FC<DtCalendarProps> = (props) => {
  const {
    initValue,
    onChange,
    onCalenderChange,
    type = 'single',
    withTime = false,
    timeFormat = '24',
    local = 'en',
    showWeekend = false,
    todayBtn = false,
    presetRanges,
    enlargeSelectedDay = true,
    dark = false,
    constraints: constraintsInput,
    calenderModalClass,
    customization,
    onError,
    onDateSelect: onDateSelectProp,
    onMonthSelect: onMonthSelectProp,
    onYearSelect: onYearSelectProp,
    onViewChange: onViewChangeProp,
    onMonthNavigate: onMonthNavigateProp,
    onGoToToday: onGoToTodayProp,
    numberOfMonths = 1,
    yearListStyle = 'grid'
  } = props

  // Normalize constraints props with error tracking
  const constraintsResult = useMemo(
    () => normalizeConstraintsProps(constraintsInput, local, type),
    [constraintsInput, local, type]
  )
  const { constraints, errors: constraintsErrors } = constraintsResult

  // Normalize initValue upfront for proper initial state with error tracking
  const initValueResult = useMemo(
    () => normalizeInitValueWithErrors(initValue, local, type, 'initValue'),
    [initValue, local, type]
  )
  const { value: normalizedInitValue, errors: initValueErrors } =
    initValueResult

  // Collect all errors and call onError callback if provided
  const allErrors = useMemo(
    () => [...constraintsErrors, ...initValueErrors],
    [constraintsErrors, initValueErrors]
  )

  const prevErrorsRef = useRef<string>('')

  useEffect(() => {
    if (!onError) return

    // Create a stable string representation of errors for comparison
    // Only include fields that matter for comparison (exclude 'value' which might be large objects)
    const errorsKey = JSON.stringify(
      allErrors.map((err) => ({
        type: err.type,
        field: err.field,
        message: err.message
      }))
    )

    // Only call onError if errors actually changed
    if (errorsKey !== prevErrorsRef.current) {
      if (allErrors.length > 0) {
        onError(allErrors)
      }
      prevErrorsRef.current = errorsKey
    }
  }, [allErrors, onError])

  // Track previous initValue to only convert when it actually changes from props
  const prevInitValueRef = useRef<InitValueInput | undefined>(undefined)

  // Auto-convert initValue to normalized format if they differ
  // This ensures parent state is consistent with internal state
  // Only runs when initValue prop actually changes (not on every render)
  useEffect(() => {
    // Only convert if initValue prop changed from previous value (including initial mount)
    const initValueChanged = prevInitValueRef.current !== initValue

    if (initValueChanged && normalizedInitValue && onChange) {
      // Only convert if the format differs (string/Date vs Day object)
      if (!areValuesEqual(initValue, normalizedInitValue)) {
        // Cast onChange to handle all possible types
        // The check ensures we only call it when values match structurally but format differs
        ;(onChange as (date: Day | Range | Multi | null) => void)(
          normalizedInitValue
        )
      }
    }

    prevInitValueRef.current = initValue
  }, [initValue, normalizedInitValue, onChange])

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: normalizedInitValue,
    locale: local,
    type,
    // Cast onChange to broader type for internal compatibility
    onChange: onChange as (date: Day | Range | Multi | null) => void,
    onCalenderChange,
    withTime,
    numberOfMonths
  })

  // 🟢 Memoize callback functions to prevent React.memo bypass in child components
  const handleDateSelect = useCallback(
    (day: Day) => {
      actions.selectDate(day)
      onDateSelectProp?.(day)
    },
    [actions, onDateSelectProp]
  )

  const handleMonthSelect = useCallback(
    (month: number) => {
      actions.selectMonth(month)
      onMonthSelectProp?.(month)
    },
    [actions, onMonthSelectProp]
  )

  const handleYearSelect = useCallback(
    (year: number) => {
      actions.selectYear(year)
      onYearSelectProp?.(year)
    },
    [actions, onYearSelectProp]
  )

  const handleViewChange = useCallback(
    (view: 'calendar' | 'months' | 'years') => {
      actions.setView(view)
      onViewChangeProp?.(view)
    },
    [actions, onViewChangeProp]
  )

  const handleMonthNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      actions.navigateMonth(direction)
      onMonthNavigateProp?.(direction)
    },
    [actions, onMonthNavigateProp]
  )

  const handleGoToToday = useCallback(() => {
    actions.goToToday()
    onGoToTodayProp?.()
  }, [actions, onGoToTodayProp])

  const handlePresetRangeSelect = useCallback(
    (range: Range) => {
      if (type === 'range') {
        // Directly set the range for preset selections
        actions.selectPresetRange(range)
      } else if (type === 'week') {
        // For week type, select the start date which will calculate the week bounds
        actions.selectDate(range.from)
      }
    },
    [actions, type]
  )

  return (
    <div
      className={`react-calendar-datetime-picker ${calenderModalClass || ''}`}
      data-theme={dark ? 'dark' : undefined}
    >
      <CalendarCore
        selectedValue={state.selectedValue}
        displayMonth={state.displayMonth}
        currentView={state.currentView}
        locale={local}
        type={type}
        withTime={withTime}
        timeFormat={timeFormat}
        showWeekend={showWeekend}
        todayBtn={todayBtn}
        enlargeSelectedDay={enlargeSelectedDay}
        constraints={constraints}
        customization={customization}
        numberOfMonths={numberOfMonths}
        yearListStyle={yearListStyle}
        onDateSelect={handleDateSelect}
        onTimeChange={actions.updateTime}
        onMonthSelect={handleMonthSelect}
        onYearSelect={handleYearSelect}
        onViewChange={handleViewChange}
        onMonthNavigate={handleMonthNavigate}
        onGoToToday={handleGoToToday}
        presetRanges={presetRanges}
        onPresetRangeSelect={handlePresetRangeSelect}
      />
    </div>
  )
}

DtCalendar.displayName = 'DtCalendar'
