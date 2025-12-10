import { useMemo, useEffect, useRef } from 'react'
import type {
  CalendarLocale,
  CalendarType,
  InitValueInput,
  Day,
  Range,
  Multi,
  RangeDate
} from '../types'
import type {
  CalendarConstraintsInput,
  CalendarTranslations
} from '../types/calendar'
import {
  normalizeInitValueWithErrors,
  areValuesEqual
} from '../utils/normalize'
import { normalizeConstraintsProps } from '../utils/constraints'
import { formatDateForInput } from '../utils/formatting'
import { convertToJsDate } from '../utils/date-conversion'
import { formatValueToString } from '../utils/formatting'
import { useCalendarState } from './useCalendarState'

/**
 * Hook that encapsulates calendar logic shared between DtPicker and DtCalendar
 * Handles normalization, state management, and formatting
 */
export function useCalendarPicker(
  initValue: InitValueInput | undefined,
  onChange: (
    normalizedValue: Day | Range | Multi | null,
    jsDateValue: Date | RangeDate | Date[] | null,
    formattedString: string | null
  ) => void,
  type: CalendarType,
  calendarSystem: CalendarLocale,
  withTime: boolean,
  constraintsInput: CalendarConstraintsInput | undefined,
  showTimeInput: boolean,
  autoClose?: boolean,
  onClose?: () => void,
  dateFormat?: string,
  timeFormat: '12' | '24' = '24',
  numberOfMonths: 1 | 2 | 3 = 1,
  translations?: CalendarTranslations
) {
  // Normalize constraints props
  const constraintsResult = useMemo(
    () => normalizeConstraintsProps(constraintsInput, calendarSystem, type),
    [constraintsInput, calendarSystem, type]
  )
  const { constraints } = constraintsResult

  // Normalize initValue
  const initValueResult = useMemo(
    () =>
      normalizeInitValueWithErrors(
        initValue,
        calendarSystem,
        type,
        'initValue'
      ),
    [initValue, calendarSystem, type]
  )
  const { value: normalizedInitValue } = initValueResult

  // Track previous initValue to only convert when it actually changes from props
  const prevInitValueRef = useRef<InitValueInput | undefined>(undefined)

  // Auto-convert initValue to normalized format if they differ
  // This ensures parent state is consistent with internal state
  // Only runs when initValue prop actually changes (not on every render)
  useEffect(() => {
    // Only convert if initValue prop changed from previous value (including initial mount)
    const initValueChanged = !areValuesEqual(
      prevInitValueRef.current,
      initValue
    )

    if (initValueChanged && normalizedInitValue && onChange) {
      // Only convert if the format differs (string/Date vs Day object)
      if (!areValuesEqual(initValue, normalizedInitValue)) {
        // Convert to JavaScript Date objects (always Gregorian)
        const jsDateValue = convertToJsDate(
          normalizedInitValue,
          type,
          calendarSystem
        )

        // Determine number system from locale or translations
        const numberSystem = translations?.numbers || 'latin'

        // Get from/to labels from translations
        const fromLabel = translations?.labels?.from || 'from'
        const toLabel = translations?.labels?.to || 'to'

        // Format to string
        const formattedString = formatValueToString(
          normalizedInitValue,
          type,
          numberSystem,
          withTime,
          dateFormat,
          timeFormat,
          fromLabel,
          toLabel
        )

        // Call onChange with three parameters
        onChange(normalizedInitValue, jsDateValue, formattedString)
      }
    }

    prevInitValueRef.current = initValue
  }, [
    initValue,
    normalizedInitValue,
    onChange,
    type,
    calendarSystem,
    translations,
    withTime,
    dateFormat,
    timeFormat
  ])

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: normalizedInitValue,
    calendarSystem: calendarSystem,
    type,
    onChange: (normalizedValue, jsDateValue, formattedString) => {
      // Pass all three parameters
      onChange(normalizedValue, jsDateValue, formattedString)
      // Auto-close modal after selection if enabled
      if (autoClose && onClose) {
        if (type === 'single' || type === 'week') {
          onClose()
        } else if (
          type === 'range' &&
          normalizedValue &&
          'from' in normalizedValue &&
          normalizedValue.from &&
          normalizedValue.to
        ) {
          onClose()
        }
      }
    },
    withTime,
    numberOfMonths,
    dateFormat,
    locale: undefined, // useCalendarPicker doesn't have locale, will use translations
    timeFormat,
    translations
  })

  // Format display value for input (use state.selectedValue from calendar)
  const displayValue = useMemo(() => {
    const fromLabel = translations?.labels?.from || 'from'
    const toLabel = translations?.labels?.to || 'to'
    const numberSystem = translations?.numbers || 'latin'
    return formatDateForInput(
      state.selectedValue,
      numberSystem,
      type,
      showTimeInput && withTime,
      fromLabel,
      toLabel,
      dateFormat,
      timeFormat
    )
  }, [
    state.selectedValue,
    type,
    showTimeInput,
    withTime,
    dateFormat,
    timeFormat,
    translations
  ])

  return {
    state,
    actions,
    constraints,
    displayValue
  }
}
