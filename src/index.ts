/**
 * react-calendar-datetime-picker
 *
 * A modern, fast and small calendar for React with English and Persian (Jalali) support.
 *
 * @packageDocumentation
 */

// Import styles
import './styles/index.scss'

// Export components
export { DtPicker } from './components/DtPicker'
export { DtCalendar } from './components/DtCalendar'

// Export types
export type {
  Day,
  Range,
  Multi,
  Time,
  TimeRange,
  CalendarLocale,
  CalendarType,
  CalendarListStyle,
  DateInput,
  InitValueInput,
  CalendarConstraints,
  CalendarConstraintsInput,
  CalendarError,
  NormalizationResult,
  CalendarCustomization,
} from './types'

// Export utilities
export {
  convertToEn,
  convertToFa,
  gregorianToJalali,
  jalaliToGregorian,
  getToday,
  formatDateForInput,
  dayToString,
  normalizeInitValue,
  isValidDay,
  isDateInRange,
  isDateSelectable,
} from './utils'
