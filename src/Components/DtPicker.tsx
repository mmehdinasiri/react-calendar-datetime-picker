import React from 'react'
import type { CalendarLocale, CalendarType } from '../types'

export interface DtPickerProps {
  /**
   * Initial value for the date picker
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
   * Show time in input field
   * @default false
   */
  showTimeInput?: boolean
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
   * Show clear button
   * @default false
   */
  clearBtn?: boolean
  /**
   * Make input required
   * @default false
   */
  isRequired?: boolean
  /**
   * Show today button
   * @default false
   */
  todayBtn?: boolean
  /**
   * Disable the picker
   * @default false
   */
  isDisabled?: boolean
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
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string
  /**
   * Custom CSS class for input
   */
  inputClass?: string
  /**
   * Custom CSS class for calendar modal
   */
  calenderModalClass?: string
  /**
   * Auto-close calendar after selection
   * @default true
   */
  autoClose?: boolean
  /**
   * Input element ID
   */
  inputId?: string
}

/**
 * DtPicker Component
 *
 * A date picker with input field that opens a modal calendar.
 *
 * @example
 * ```tsx
 * import { DtPicker } from 'react-calendar-datetime-picker'
 *
 * function App() {
 *   const [date, setDate] = useState(null)
 *   return <DtPicker onChange={setDate} local="en" />
 * }
 * ```
 */
export const DtPicker: React.FC<DtPickerProps> = (_props) => {
  // TODO: Implement component
  return (
    <div className='react-calendar-datetime-picker'>
      <div>DtPicker - Coming soon</div>
    </div>
  )
}

DtPicker.displayName = 'DtPicker'
