import React, { useEffect, useRef, useMemo } from 'react'
import type { Day, Range, Multi, InitValueInput, RangeDate } from '../types'
import type {
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
  useCalendarErrorHandling
} from '../hooks'
import {
  normalizeInitValueWithErrors,
  areValuesEqual
} from '../utils/normalize'
import { normalizeConstraintsProps } from '../utils/constraints'
import { convertToJsDate } from '../utils/date-conversion'
import {
  formatValueToString,
  detectTimeFormatFromDateFormat
} from '../utils/formatting'
import { getNumberSystem } from '../utils/translations'
import { isValidNormalizedValue } from '../utils/validation'

interface DtCalendarPropsBase extends SharedCalendarProps {
  /**
   * Callback that runs when the calendar value is changed
   * Note: requires initValue to be provided
   */
  onCalenderChange?: (date: Day | Range | Multi | null) => void
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

  // Detect time format from dateFormat string
  const timeFormat = detectTimeFormatFromDateFormat(props.dateFormat)

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

  // Validate normalizedInitValue against constraints
  // If initValue is outside the allowed range, reject it (set to null)
  const validatedInitValue = useMemo(() => {
    if (!normalizedInitValue || !constraints) {
      return normalizedInitValue
    }

    const isValid = isValidNormalizedValue(normalizedInitValue, type, {
      minDate: constraints.minDate,
      maxDate: constraints.maxDate,
      disabledDates: constraints.disabledDates,
      isDateDisabled: constraints.isDateDisabled,
      calendarSystem: normalizedCalendarSystem
    })

    return isValid ? normalizedInitValue : null
  }, [normalizedInitValue, constraints, type, normalizedCalendarSystem])

  // 🎯 Use error handling hook
  useCalendarErrorHandling(constraintsErrors, initValueErrors, onError)

  // Track previous initValue to only convert when it actually changes from props
  const prevInitValueRef = useRef<InitValueInput | undefined>(undefined)

  // Auto-convert initValue to normalized format if they differ
  // This ensures parent state is consistent with internal state
  // Only runs when initValue prop actually changes (not on every render)
  useEffect(() => {
    // Only convert if initValue prop changed from previous value (including initial mount)
    const initValueChanged = prevInitValueRef.current !== initValue

    if (initValueChanged && validatedInitValue && onChange) {
      // Only convert if the format differs (string/Date vs Day object)
      if (!areValuesEqual(initValue, validatedInitValue)) {
        // Convert to JavaScript Date objects (always Gregorian)
        const jsDateValue = convertToJsDate(
          validatedInitValue,
          type,
          normalizedCalendarSystem
        )

        // Determine number system from locale or translations
        const numberSystem =
          translations?.numbers ||
          (effectiveLocale ? getNumberSystem(effectiveLocale) : 'latin')

        // Get from/to labels from translations
        const fromLabel = translations?.labels?.from || 'from'
        const toLabel = translations?.labels?.to || 'to'

        // Format to string
        const formattedString = formatValueToString(
          validatedInitValue,
          type,
          numberSystem,
          withTime,
          props.dateFormat,
          fromLabel,
          toLabel
        )

        // Call onChange with three parameters
        // TypeScript needs explicit cast because onChange is a discriminated union
        ;(
          onChange as (
            normalizedValue: Day | Range | Multi | null,
            jsDateValue: Date | RangeDate | Date[] | null,
            formattedString: string | null
          ) => void
        )(validatedInitValue, jsDateValue, formattedString)
      }
    }

    prevInitValueRef.current = initValue
  }, [
    initValue,
    normalizedInitValue,
    validatedInitValue,
    onChange,
    type,
    normalizedCalendarSystem,
    effectiveLocale,
    translations,
    withTime,
    props.dateFormat
  ])

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: validatedInitValue,
    calendarSystem: normalizedCalendarSystem,
    type,
    onChange: onChange as (
      normalizedValue: Day | Range | Multi | null,
      jsDateValue: Date | RangeDate | Date[] | null,
      formattedString: string | null
    ) => void,
    onCalenderChange: onCalenderChange as (
      normalizedValue: Day | Range | Multi | null,
      jsDateValue: Date | RangeDate | Date[] | null,
      formattedString: string | null
    ) => void,
    withTime,
    numberOfMonths,
    weekStart: effectiveWeekStart,
    dateFormat: props.dateFormat,
    locale: effectiveLocale,
    translations
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
        dateFormat={props.dateFormat}
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
