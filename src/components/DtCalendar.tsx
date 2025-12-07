import React, { useEffect, useRef, useMemo } from 'react'
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
import {
  useCalendarState,
  useCalendarSetup,
  useCalendarCallbacks,
  useCallbackOnChange
} from '../hooks'
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
 *   return <DtCalendar onChange={setDate} calendarSystem="jalali" />
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
    calendarSystem = 'gregorian',
    showWeekend = false,
    weekStart,
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
    locale,
    yearListStyle = 'grid'
  } = props

  // 🎯 Use consolidated calendar setup hook
  const {
    normalizedCalendarSystem,
    effectiveLocale,
    translations,
    effectiveWeekStart
  } = useCalendarSetup(calendarSystem, locale, weekStart, customization)

  // Normalize constraints props with error tracking
  const constraintsResult = useMemo(
    () =>
      normalizeConstraintsProps(
        constraintsInput,
        normalizedCalendarSystem,
        type
      ),
    [constraintsInput, normalizedCalendarSystem, type]
  )
  const { constraints, errors: constraintsErrors } = constraintsResult

  // Normalize initValue upfront for proper initial state with error tracking
  const initValueResult = useMemo(
    () =>
      normalizeInitValueWithErrors(
        initValue,
        normalizedCalendarSystem,
        type,
        'initValue'
      ),
    [initValue, normalizedCalendarSystem, type]
  )
  const { value: normalizedInitValue, errors: initValueErrors } =
    initValueResult

  // Collect all errors
  const allErrors = useMemo(
    () => [...constraintsErrors, ...initValueErrors],
    [constraintsErrors, initValueErrors]
  )

  // 🎯 Use callback on change hook for error handling
  // Much simpler than JSON.stringify comparison
  useCallbackOnChange(allErrors, (errors) => {
    if (errors.length > 0 && onError) {
      onError(errors)
    }
  })

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
    calendarSystem: normalizedCalendarSystem,
    type,
    // Cast onChange to broader type for internal compatibility
    onChange: onChange as (date: Day | Range | Multi | null) => void,
    onCalenderChange,
    withTime,
    numberOfMonths,
    weekStart: effectiveWeekStart
  })

  // 🎯 Use consolidated calendar callbacks hook
  const {
    handleDateSelect,
    handleMonthSelect,
    handleYearSelect,
    handleViewChange,
    handleMonthNavigate,
    handleGoToToday,
    handlePresetRangeSelect
  } = useCalendarCallbacks({
    actions,
    onDateSelect: onDateSelectProp,
    onMonthSelect: onMonthSelectProp,
    onYearSelect: onYearSelectProp,
    onViewChange: onViewChangeProp,
    onMonthNavigate: onMonthNavigateProp,
    onGoToToday: onGoToTodayProp,
    type
  })

  return (
    <div
      className={`react-calendar-datetime-picker ${calenderModalClass || ''}`}
      data-theme={dark ? 'dark' : undefined}
    >
      <CalendarCore
        selectedValue={state.selectedValue}
        displayMonth={state.displayMonth}
        currentView={state.currentView}
        calendarSystem={normalizedCalendarSystem}
        locale={effectiveLocale}
        translations={translations}
        type={type}
        withTime={withTime}
        timeFormat={timeFormat}
        showWeekend={showWeekend}
        weekStart={effectiveWeekStart}
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
