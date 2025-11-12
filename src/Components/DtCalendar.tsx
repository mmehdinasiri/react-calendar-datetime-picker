import React from 'react'
import type { CalendarLocale, CalendarType } from '../types'

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
export const DtCalendar: React.FC<DtCalendarProps> = (_props) => {
  // TODO: Implement component
  return (
    <div className='react-calendar-datetime-picker'>
      <div>DtCalendar - Coming soon</div>
    </div>
  )
}

DtCalendar.displayName = 'DtCalendar'
