/**
 * Utility functions export
 */

// Date conversion
export {
  gregorianToJalali,
  jalaliToGregorian,
  convertToLocale,
  getToday,
  dateToDay,
  dayToDate
} from './date-conversion'

// Normalization
export { normalizeInitValue, extractMonthFromValue } from './normalize'

// Formatting
export {
  formatDateForInput,
  dayToString,
  parseDateString,
  toPersianNumeral
} from './formatting'

// Validation
export {
  isValidDay,
  isDateInRange,
  isDateDisabled,
  isDateSelectable,
  compareDays,
  getDaysInMonth,
  validateDay
} from './validation'

// Constraints
export { normalizeConstraintsProps } from './constraints'

// Calendar grid
export { generateCalendarGrid, getYearRange, getMonths } from './calendar-grid'
export type { CalendarDay } from './calendar-grid'

// Weekday utilities
export {
  getEffectiveWeekStart,
  rotateArray,
  getGregorianDayOfWeek,
  isWeekendDay,
  getWeekendPositions,
  getRotatedWeekdayNames,
  getWeekendConfig
} from './weekday-utils'

// Calendar selection
export {
  isDaySelected,
  isDayInRange,
  isRangeStart,
  isRangeEnd
} from './calendar-selection'

// Date comparison and manipulation
export {
  isBefore,
  isAfter,
  isBetween,
  isSameDay,
  isSameMonth,
  isSameYear,
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
  endOfYear,
  getStartOfWeek,
  getEndOfWeek,
  getDaysInRange,
  isLeapYear,
  isJalaliLeapYear
} from './date-comparison'

// Utility functions for backward compatibility (convertToFa, convertToEn)
import { gregorianToJalali, jalaliToGregorian } from './date-conversion'
import { dayToString } from './formatting'
import type { Day } from '../types'

/**
 * Convert Gregorian date to Jalali date string
 * @param date - Day object in Gregorian calendar
 * @param divider - String divider (default: '/')
 * @returns Formatted Jalali date string
 */
export function convertToFa(date: Day, divider = '/'): string {
  const jalaliDate = gregorianToJalali(date)
  return dayToString(jalaliDate, divider)
}

/**
 * Convert Jalali date to Gregorian date string
 * @param date - Day object in Jalali calendar
 * @param divider - String divider (default: '/')
 * @returns Formatted Gregorian date string
 */
export function convertToEn(date: Day, divider = '/'): string {
  const gregorianDate = jalaliToGregorian(date)
  return dayToString(gregorianDate, divider)
}
