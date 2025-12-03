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
  Week,
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
  CalendarCustomization
} from './types'
export type {
  PresetRangeType,
  PresetRangesConfig,
  CustomPresetRange
} from './types/calendar'

// Export utilities
export {
  convertToEn,
  convertToFa,
  gregorianToJalali,
  jalaliToGregorian,
  getToday,
  formatDateForInput,
  dayToString,
  toPersianNumeral,
  normalizeInitValue,
  isValidDay,
  isDateInRange,
  isDateSelectable,
  // Date comparison and manipulation
  isBefore,
  isAfter,
  isBetween,
  isSameDay,
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
  addYears,
  subtractYears,
  getDifferenceInDays,
  getDifferenceInMonths,
  getDifferenceInYears,
  convertToJalali,
  convertToGregorian,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} from './utils'
