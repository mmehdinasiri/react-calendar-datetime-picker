/**
 * Date validation utilities
 */

import type { Day, CalendarLocale } from '../types'
import { jalaliToGregorian } from './date-conversion'

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
  // Jalali leap year calculation
  const a = (year + 2346) % 128
  return a < 30 && a % 4 === 3
}

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(
  year: number,
  month: number,
  locale: CalendarLocale
): number {
  if (locale === 'fa') {
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
export function isValidDay(day: Day, locale: CalendarLocale): boolean {
  if (day.year <= 0) return false
  if (day.month < 1 || day.month > 12) return false

  const maxDay = getDaysInMonth(day.year, day.month, locale)
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
  locale: CalendarLocale = 'en'
): boolean {
  if (!isValidDay(day, locale)) return false

  // Convert all dates to the same calendar system for comparison
  // We'll compare in Gregorian for consistency
  const dayGregorian = locale === 'fa' ? jalaliToGregorian(day) : day
  const minGregorian = minDate
    ? locale === 'fa'
      ? jalaliToGregorian(minDate)
      : minDate
    : null
  const maxGregorian = maxDate
    ? locale === 'fa'
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
  locale: CalendarLocale = 'en'
): boolean {
  if (!disabledDates || disabledDates.length === 0) return false

  // Convert to Gregorian for comparison
  const dayGregorian = locale === 'fa' ? jalaliToGregorian(day) : day

  return disabledDates.some((disabledDay) => {
    const disabledGregorian =
      locale === 'fa' ? jalaliToGregorian(disabledDay) : disabledDay

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
    locale?: CalendarLocale
  }
): boolean {
  const {
    disabledDates,
    isDateDisabled: isDateDisabledCallback,
    locale = 'en'
  } = options

  // Check custom callback first
  if (isDateDisabledCallback && isDateDisabledCallback(day)) {
    return true
  }

  // Check disabled dates list
  if (isDateInDisabledList(day, disabledDates, locale)) {
    return true
  }

  return false
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
    locale?: CalendarLocale
  }
): boolean {
  const {
    minDate,
    maxDate,
    disabledDates,
    isDateDisabled: isDateDisabledCallback,
    locale = 'en'
  } = options

  if (!isValidDay(day, locale)) return false
  if (!isDateInRange(day, minDate, maxDate, locale)) return false
  if (
    isDateDisabled(day, {
      disabledDates,
      isDateDisabled: isDateDisabledCallback,
      locale
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
  locale: CalendarLocale = 'en'
): number {
  // Convert to Gregorian for comparison
  const d1 = locale === 'fa' ? jalaliToGregorian(day1) : day1
  const d2 = locale === 'fa' ? jalaliToGregorian(day2) : day2

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
