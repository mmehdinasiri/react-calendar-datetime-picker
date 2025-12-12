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
import { formatDateForInput, formatValueToString } from '../utils/formatting'
import { convertToJsDate } from '../utils/date-conversion'
import { useCalendarState } from './useCalendarState'
import { isValidNormalizedValue } from '../utils/validation'

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
      calendarSystem
    })

    return isValid ? normalizedInitValue : null
  }, [normalizedInitValue, constraints, type, calendarSystem])

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

    if (initValueChanged && validatedInitValue && onChange) {
      // Only convert if the format differs (string/Date vs Day object)
      if (!areValuesEqual(initValue, validatedInitValue)) {
        // Convert to JavaScript Date objects (always Gregorian)
        const jsDateValue = convertToJsDate(
          validatedInitValue,
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
          validatedInitValue,
          type,
          numberSystem,
          withTime,
          dateFormat,
          fromLabel,
          toLabel
        )

        // Call onChange with three parameters
        onChange(validatedInitValue, jsDateValue, formattedString)
      }
    }

    prevInitValueRef.current = initValue
  }, [
    initValue,
    normalizedInitValue,
    validatedInitValue,
    onChange,
    type,
    calendarSystem,
    translations,
    withTime,
    dateFormat
  ])

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: validatedInitValue,
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
      dateFormat
    )
  }, [
    state.selectedValue,
    type,
    showTimeInput,
    withTime,
    dateFormat,
    translations
  ])

  return {
    state,
    actions,
    constraints,
    displayValue
  }
}
