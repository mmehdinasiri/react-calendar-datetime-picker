import React, { useEffect, useRef, useMemo } from 'react'
import type {
  CalendarLocale,
  CalendarType,
  Day,
  InitValueInput
} from '../types'
import type {
  CalendarConstraints,
  CalendarConstraintsInput,
  CalendarCustomization,
  CalendarError
} from '../types/calendar'
import { CalendarCore } from './CalendarCore'
import { useCalendarState } from '../hooks/useCalendarState'
import { normalizeInitValueWithErrors } from '../utils/normalize'

export interface DtCalendarProps {
  /**
   * Initial value for the calendar
   * Accepts Day objects, Date objects, date strings, timestamps, or range/multi formats
   * Examples:
   * - Single: { year: 2024, month: 12, day: 25 } | new Date() | "2024-12-25" | 1735084800000
   * - Range: { from: DateInput, to: DateInput }
   * - Multi: DateInput[]
   */
  initValue?: InitValueInput
  /**
   * Callback function called when date changes
   */
  onChange: (date: unknown) => void
  /**
   * Callback that runs when the calendar value is changed
   * Note: requires initValue to be provided
   */
  onCalenderChange?: (date: unknown) => void
  /**
   * Calendar type: 'single', 'range', or 'multi'
   * @default 'single'
   */
  type?: CalendarType
  /**
   * Enable time selection
   * @default false
   */
  withTime?: boolean
  /**
   * Calendar locale: 'en' (Gregorian) or 'fa' (Jalali)
   * @default 'en'
   */
  local?: CalendarLocale
  /**
   * Show weekend highlighting
   * @default false
   */
  showWeekend?: boolean
  /**
   * Show today button
   * @default false
   */
  todayBtn?: boolean
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
   * Date constraints (maxDate, minDate, disabledDates)
   * Accepts Day objects, Date objects, date strings, or timestamps
   */
  constraints?: CalendarConstraintsInput
  /**
   * Custom CSS class for calendar modal
   */
  calenderModalClass?: string
  /**
   * Customization options (classes, icons, labels)
   */
  customization?: CalendarCustomization
  /**
   * Callback function called when normalization or constraint errors occur
   * @param errors - Array of error objects describing what failed
   */
  onError?: (errors: CalendarError[]) => void
}

/**
 * Normalize constraints props from DateInput to Day/Day[]
 * Returns constraints object and errors array
 */
function normalizeConstraintsProps(
  constraintsInput: CalendarConstraintsInput | undefined,
  locale: CalendarLocale,
  _type: CalendarType
): { constraints: CalendarConstraints; errors: CalendarError[] } {
  const constraints: CalendarConstraints = {}
  const errors: CalendarError[] = []

  if (!constraintsInput) {
    return { constraints, errors }
  }

  if (constraintsInput.maxDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.maxDate,
      locale,
      'single',
      'constraints.maxDate'
    )
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }
    if (result.value && 'year' in result.value) {
      constraints.maxDate = result.value as Day
    }
  }

  if (constraintsInput.minDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.minDate,
      locale,
      'single',
      'constraints.minDate'
    )
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }
    if (result.value && 'year' in result.value) {
      constraints.minDate = result.value as Day
    }
  }

  if (
    constraintsInput.disabledDates &&
    constraintsInput.disabledDates.length > 0
  ) {
    const normalizedDates: Day[] = []
    constraintsInput.disabledDates.forEach((date, index) => {
      const result = normalizeInitValueWithErrors(
        date,
        locale,
        'single',
        `constraints.disabledDates[${index}]`
      )
      if (result.errors.length > 0) {
        errors.push(...result.errors)
      }
      if (result.value && 'year' in result.value) {
        normalizedDates.push(result.value as Day)
      }
    })
    if (normalizedDates.length > 0) {
      constraints.disabledDates = normalizedDates
    }
  }

  return { constraints, errors }
}

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
    withTime: _withTime = false,
    local = 'en',
    showWeekend = false,
    todayBtn = false,
    enlargeSelectedDay = true,
    dark = false,
    constraints: constraintsInput,
    calenderModalClass,
    customization,
    onError
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

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: normalizedInitValue,
    locale: local,
    type,
    onChange,
    onCalenderChange
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
        locale={local}
        type={type}
        showWeekend={showWeekend}
        todayBtn={todayBtn}
        enlargeSelectedDay={enlargeSelectedDay}
        constraints={constraints}
        customization={customization}
        onDateSelect={actions.selectDate}
        onMonthSelect={actions.selectMonth}
        onYearSelect={actions.selectYear}
        onViewChange={actions.setView}
        onMonthNavigate={actions.navigateMonth}
        onGoToToday={actions.goToToday}
      />
    </div>
  )
}

DtCalendar.displayName = 'DtCalendar'
