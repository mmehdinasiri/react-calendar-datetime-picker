import React from 'react'
import type { CalendarLocale, CalendarType, InitValueInput } from '../types'
import type { CalendarConstraintsInput } from '../types/calendar'

export interface DtPickerProps {
  /**
   * Initial value for the date picker
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
   * Date constraints (maxDate, minDate, disabledDates)
   * Accepts Day objects, Date objects, date strings, or timestamps
   */
  constraints?: CalendarConstraintsInput
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
