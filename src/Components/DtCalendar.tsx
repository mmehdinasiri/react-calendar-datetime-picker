import React from 'react'
import type { CalendarLocale, CalendarType, Day } from '../types'
import type {
  CalendarValidation,
  CalendarCustomization
} from '../types/calendar'
import { CalendarCore } from './CalendarCore'
import { useCalendarState } from '../hooks/useCalendarState'
import { normalizeInitValue } from '../utils/normalize'

export interface DtCalendarProps {
  /**
   * Initial value for the calendar
   */
  initValue?: unknown
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
   * Maximum selectable date
   */
  maxDate?: unknown
  /**
   * Minimum selectable date
   */
  minDate?: unknown
  /**
   * List of disabled dates
   */
  disabledDates?: unknown[]
  /**
   * Custom CSS class for calendar modal
   */
  calenderModalClass?: string
  /**
   * Customization options (classes, icons, labels)
   */
  customization?: CalendarCustomization
}

/**
 * Normalize validation props from unknown to Day/Day[]
 */
function normalizeValidationProps(
  maxDate: unknown,
  minDate: unknown,
  disabledDates: unknown[] | undefined,
  locale: CalendarLocale,
  _type: CalendarType
): CalendarValidation {
  const validation: CalendarValidation = {}

  if (maxDate) {
    const normalized = normalizeInitValue(maxDate, locale, 'single')
    if (normalized && 'year' in normalized) {
      validation.maxDate = normalized as Day
    }
  }

  if (minDate) {
    const normalized = normalizeInitValue(minDate, locale, 'single')
    if (normalized && 'year' in normalized) {
      validation.minDate = normalized as Day
    }
  }

  if (disabledDates && disabledDates.length > 0) {
    validation.disabledDates = disabledDates
      .map((date) => normalizeInitValue(date, locale, 'single'))
      .filter((date): date is Day => date !== null && 'year' in date)
  }

  return validation
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
    maxDate,
    minDate,
    disabledDates,
    calenderModalClass,
    customization
  } = props

  // Normalize validation props
  const validation = normalizeValidationProps(
    maxDate,
    minDate,
    disabledDates,
    local,
    type
  )

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue,
    locale: local,
    type,
    onChange,
    onCalenderChange
  })

  return (
    <div
      className={`react-calendar-datetime-picker ${calenderModalClass || ''}`}
    >
      <CalendarCore
        selectedValue={state.selectedValue}
        displayMonth={state.displayMonth}
        currentView={state.currentView}
        locale={local}
        type={type}
        showWeekend={showWeekend}
        todayBtn={todayBtn}
        validation={validation}
        customization={customization}
        onDateSelect={actions.selectDate}
        onMonthSelect={actions.selectMonth}
        onYearSelect={actions.selectYear}
        onViewChange={actions.setView}
        onMonthNavigate={actions.navigateMonth}
      />
    </div>
  )
}

DtCalendar.displayName = 'DtCalendar'
