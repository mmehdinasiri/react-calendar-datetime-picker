/**
 * Date validation utilities
 */

import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'
import type { ValidationResult } from '../types/calendar'
import { jalaliToGregorian } from './date-conversion'
import { isDayObject } from './normalize'

/**
 * Check if a year is a leap year in Gregorian calendar
 */
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Check if a year is a leap year in Jalali calendar
 */
function isJalaliLeapYear(year: number): boolean {
  // Jalali leap year calculation using the 33-year cycle
  // The remainders of dividing the year in the cycle by 33 should be in [1, 5, 9, 13, 17, 22, 26, 30]
  const remainders = [1, 5, 9, 13, 17, 22, 26, 30]
  const cycleYear = year % 33
  return remainders.includes(cycleYear)
}

/**
 * Check if a year is a leap year in the specified calendar system
 * @param year - Year to check
 * @param calendarSystem - Calendar system ('gregorian' or 'jalali')
 * @returns true if the year is a leap year
 */
export function isLeapYear(
  year: number,
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  if (calendarSystem === 'jalali') {
    return isJalaliLeapYear(year)
  } else {
    return isGregorianLeapYear(year)
  }
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(
  year: number,
  month: number,
  calendarSystem: CalendarLocale
): number {
  if (calendarSystem === 'jalali') {
    // Jalali calendar: first 6 months have 31 days, next 5 have 30, last has 29 or 30
    if (month <= 6) return 31
    if (month <= 11) return 30
    return isJalaliLeapYear(year) ? 30 : 29
  } else {
    // Gregorian calendar
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 2 && isGregorianLeapYear(year)) {
      return 29
    }
    return daysInMonth[month - 1]
  }
}

/**
 * Validate a Day object
 */
export function isValidDay(day: Day, calendarSystem: CalendarLocale): boolean {
  if (day.year <= 0) return false
  if (day.month < 1 || day.month > 12) return false

  const maxDay = getDaysInMonth(day.year, day.month, calendarSystem)
  if (day.day < 1 || day.day > maxDay) return false

  if (day.hour !== undefined && (day.hour < 0 || day.hour > 23)) {
    return false
  }

  if (day.minute !== undefined && (day.minute < 0 || day.minute > 59)) {
    return false
  }

  return true
}

/**
 * Check if a date is within the min/max range
 */
export function isDateInRange(
  day: Day,
  minDate?: Day,
  maxDate?: Day,
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  if (!isValidDay(day, calendarSystem)) return false

  // Convert all dates to the same calendar system for comparison
  // We'll compare in Gregorian for consistency
  const dayGregorian =
    calendarSystem === 'jalali' ? jalaliToGregorian(day) : day
  const minGregorian = minDate
    ? calendarSystem === 'jalali'
      ? jalaliToGregorian(minDate)
      : minDate
    : null
  const maxGregorian = maxDate
    ? calendarSystem === 'jalali'
      ? jalaliToGregorian(maxDate)
      : maxDate
    : null

  // Compare dates
  if (minGregorian) {
    if (
      dayGregorian.year < minGregorian.year ||
      (dayGregorian.year === minGregorian.year &&
        dayGregorian.month < minGregorian.month) ||
      (dayGregorian.year === minGregorian.year &&
        dayGregorian.month === minGregorian.month &&
        dayGregorian.day < minGregorian.day)
    ) {
      return false
    }
  }

  if (maxGregorian) {
    if (
      dayGregorian.year > maxGregorian.year ||
      (dayGregorian.year === maxGregorian.year &&
        dayGregorian.month > maxGregorian.month) ||
      (dayGregorian.year === maxGregorian.year &&
        dayGregorian.month === maxGregorian.month &&
        dayGregorian.day > maxGregorian.day)
    ) {
      return false
    }
  }

  return true
}

/**
 * Check if a date is in the disabled dates list
 */
export function isDateInDisabledList(
  day: Day,
  disabledDates?: Day[],
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  if (!disabledDates || disabledDates.length === 0) return false

  // Convert to Gregorian for comparison
  const dayGregorian =
    calendarSystem === 'jalali' ? jalaliToGregorian(day) : day

  return disabledDates.some((disabledDay) => {
    const disabledGregorian =
      calendarSystem === 'jalali' ? jalaliToGregorian(disabledDay) : disabledDay

    return (
      dayGregorian.year === disabledGregorian.year &&
      dayGregorian.month === disabledGregorian.month &&
      dayGregorian.day === disabledGregorian.day
    )
  })
}

/**
 * Check if a date is disabled (either in disabledDates list or via callback)
 */
export function isDateDisabled(
  day: Day,
  options: {
    disabledDates?: Day[]
    isDateDisabled?: (date: Day) => boolean
    calendarSystem?: CalendarLocale
  }
): boolean {
  const {
    disabledDates,
    isDateDisabled: isDateDisabledCallback,
    calendarSystem = 'gregorian'
  } = options

  // Check custom callback first
  if (isDateDisabledCallback && isDateDisabledCallback(day)) {
    return true
  }

  // Check disabled dates list
  if (isDateInDisabledList(day, disabledDates, calendarSystem)) {
    return true
  }

  return false
}

/**
 * Validate a normalized value (Day | Range | Multi) against constraints
 * Returns true if all dates in the value are selectable, false otherwise
 */
export function isValidNormalizedValue(
  value: Day | Range | Multi | null,
  type: CalendarType,
  options: {
    minDate?: Day
    maxDate?: Day
    disabledDates?: Day[]
    isDateDisabled?: (date: Day) => boolean
    calendarSystem?: CalendarLocale
  }
): boolean {
  if (!value) return true // null is valid

  if (type === 'single' && 'year' in value) {
    return isDateSelectable(value as Day, options)
  }

  if (type === 'range' && 'from' in value) {
    const range = value as Range
    const fromValid = !range.from || isDateSelectable(range.from, options)
    const toValid = !range.to || isDateSelectable(range.to, options)
    return fromValid && toValid
  }

  if (type === 'multi' && Array.isArray(value)) {
    return (value as Multi).every((day: Day) => isDateSelectable(day, options))
  }

  // For week type or unknown types, return true (let other validation handle it)
  return true
}

/**
 * Check if a date can be selected (valid, in range, not disabled)
 */
export function isDateSelectable(
  day: Day,
  options: {
    minDate?: Day
    maxDate?: Day
    disabledDates?: Day[]
    isDateDisabled?: (date: Day) => boolean
    calendarSystem?: CalendarLocale
  }
): boolean {
  const {
    minDate,
    maxDate,
    disabledDates,
    isDateDisabled: isDateDisabledCallback,
    calendarSystem = 'gregorian'
  } = options

  if (!isValidDay(day, calendarSystem)) return false
  if (!isDateInRange(day, minDate, maxDate, calendarSystem)) return false
  if (
    isDateDisabled(day, {
      disabledDates,
      isDateDisabled: isDateDisabledCallback,
      calendarSystem
    })
  )
    return false

  return true
}

/**
 * Compare two Day objects
 * Returns: -1 if day1 < day2, 0 if equal, 1 if day1 > day2
 */
export function compareDays(
  day1: Day,
  day2: Day,
  calendarSystem: CalendarLocale = 'gregorian'
): number {
  // Convert to Gregorian for comparison
  const d1 = calendarSystem === 'jalali' ? jalaliToGregorian(day1) : day1
  const d2 = calendarSystem === 'jalali' ? jalaliToGregorian(day2) : day2

  if (d1.year !== d2.year) {
    return d1.year < d2.year ? -1 : 1
  }
  if (d1.month !== d2.month) {
    return d1.month < d2.month ? -1 : 1
  }
  if (d1.day !== d2.day) {
    return d1.day < d2.day ? -1 : 1
  }

  return 0
}

/**
 * Unified validation function using ValidationResult interface
 * Provides consistent error handling across utilities
 * @param day - Day object or unknown value to validate
 * @param locale - Calendar system (gregorian or jalali)
 * @returns ValidationResult with success status and data or error
 */
export function validateDay(
  day: unknown,
  locale: CalendarLocale
): ValidationResult<Day> {
  try {
    // Check if it's a Day object
    if (!isDayObject(day)) {
      return {
        success: false,
        error: {
          code: 'INVALID_TYPE',
          message: 'Not a Day object',
          details: { received: typeof day, value: day }
        }
      }
    }

    // Validate the day
    if (!isValidDay(day, locale)) {
      return {
        success: false,
        error: {
          code: 'INVALID_DATE',
          message: `Invalid ${locale} date: Day ${day.day} does not exist in month ${day.month} of year ${day.year}`,
          details: { day, locale }
        }
      }
    }

    return { success: true, data: day }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'CONVERSION_ERROR',
        message:
          error instanceof Error ? error.message : 'Unknown validation error',
        details: { originalError: error }
      }
    }
  }
}
