/**
 * Date comparison and manipulation utilities
 * Works with both Gregorian and Jalali calendars
 */

import type { Day, CalendarLocale } from '../types'
import {
  jalaliToGregorian,
  gregorianToJalali,
  dayToDate,
  dateToDay
} from './date-conversion'
import { compareDays, getDaysInMonth } from './validation'

/**
 * Check if day1 is before day2
 * @param day1 - First day to compare
 * @param day2 - Second day to compare
 * @param locale - Calendar locale of the days
 * @returns true if day1 is before day2
 */
export function isBefore(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): boolean {
  return compareDays(day1, day2, locale) < 0
}

/**
 * Check if day1 is after day2
 * @param day1 - First day to compare
 * @param day2 - Second day to compare
 * @param locale - Calendar locale of the days
 * @returns true if day1 is after day2
 */
export function isAfter(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): boolean {
  return compareDays(day1, day2, locale) > 0
}

/**
 * Check if day1 is the same as day2 (ignores time)
 * @param day1 - First day to compare
 * @param day2 - Second day to compare
 * @param locale - Calendar locale of the days
 * @returns true if both days are the same
 */
export function isSameDay(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): boolean {
  return compareDays(day1, day2, locale) === 0
}

/**
 * Check if a day is between two other days (inclusive)
 * @param day - Day to check
 * @param start - Start day of the range
 * @param end - End day of the range
 * @param locale - Calendar locale of the days
 * @returns true if day is between start and end (inclusive)
 */
export function isBetween(
  day: Day,
  start: Day,
  end: Day,
  locale: CalendarLocale = 'en'
): boolean {
  const comparison = compareDays(start, end, locale)
  // If start is after end, swap them
  if (comparison > 0) {
    return (
      compareDays(day, end, locale) >= 0 &&
      compareDays(day, start, locale) <= 0
    )
  }
  return (
    compareDays(day, start, locale) >= 0 &&
    compareDays(day, end, locale) <= 0
  )
}

/**
 * Add days to a date
 * @param day - Day to add days to
 * @param days - Number of days to add (can be negative)
 * @param locale - Calendar locale
 * @returns New Day object with days added
 */
export function addDays(
  day: Day,
  days: number,
  locale: CalendarLocale = 'en'
): Day {
  const date = dayToDate(day, locale)
  date.setDate(date.getDate() + days)
  return dateToDay(date, locale)
}

/**
 * Subtract days from a date
 * @param day - Day to subtract days from
 * @param days - Number of days to subtract
 * @param locale - Calendar locale
 * @returns New Day object with days subtracted
 */
export function subtractDays(
  day: Day,
  days: number,
  locale: CalendarLocale = 'en'
): Day {
  return addDays(day, -days, locale)
}

/**
 * Add months to a date
 * @param day - Day to add months to
 * @param months - Number of months to add (can be negative)
 * @param locale - Calendar locale
 * @returns New Day object with months added
 */
export function addMonths(
  day: Day,
  months: number,
  locale: CalendarLocale = 'en'
): Day {
  const date = dayToDate(day, locale)
  date.setMonth(date.getMonth() + months)
  
  // Handle edge case where the day doesn't exist in the new month
  // (e.g., Jan 31 + 1 month = Feb 31, which doesn't exist)
  const maxDay = getDaysInMonth(
    date.getFullYear(),
    date.getMonth() + 1,
    locale
  )
  const originalDay = day.day
  if (originalDay > maxDay) {
    date.setDate(maxDay)
  }
  
  return dateToDay(date, locale)
}

/**
 * Subtract months from a date
 * @param day - Day to subtract months from
 * @param months - Number of months to subtract
 * @param locale - Calendar locale
 * @returns New Day object with months subtracted
 */
export function subtractMonths(
  day: Day,
  months: number,
  locale: CalendarLocale = 'en'
): Day {
  return addMonths(day, -months, locale)
}

/**
 * Add years to a date
 * @param day - Day to add years to
 * @param years - Number of years to add (can be negative)
 * @param locale - Calendar locale
 * @returns New Day object with years added
 */
export function addYears(
  day: Day,
  years: number,
  locale: CalendarLocale = 'en'
): Day {
  const date = dayToDate(day, locale)
  date.setFullYear(date.getFullYear() + years)
  
  // Handle leap year edge case (Feb 29 -> Feb 28 in non-leap year)
  const maxDay = getDaysInMonth(
    date.getFullYear(),
    date.getMonth() + 1,
    locale
  )
  const originalDay = day.day
  if (originalDay > maxDay) {
    date.setDate(maxDay)
  }
  
  return dateToDay(date, locale)
}

/**
 * Subtract years from a date
 * @param day - Day to subtract years from
 * @param years - Number of years to subtract
 * @param locale - Calendar locale
 * @returns New Day object with years subtracted
 */
export function subtractYears(
  day: Day,
  years: number,
  locale: CalendarLocale = 'en'
): Day {
  return addYears(day, -years, locale)
}

/**
 * Get the difference in days between two dates
 * @param day1 - First day
 * @param day2 - Second day
 * @param locale - Calendar locale
 * @returns Number of days difference (positive if day1 is after day2)
 */
export function getDifferenceInDays(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): number {
  const date1 = dayToDate(day1, locale)
  const date2 = dayToDate(day2, locale)
  const diffTime = date1.getTime() - date2.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Get the difference in months between two dates
 * @param day1 - First day
 * @param day2 - Second day
 * @param locale - Calendar locale
 * @returns Number of months difference (positive if day1 is after day2)
 */
export function getDifferenceInMonths(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): number {
  const d1 = locale === 'fa' ? jalaliToGregorian(day1) : day1
  const d2 = locale === 'fa' ? jalaliToGregorian(day2) : day2
  
  const yearDiff = d1.year - d2.year
  const monthDiff = d1.month - d2.month
  
  return yearDiff * 12 + monthDiff
}

/**
 * Get the difference in years between two dates
 * @param day1 - First day
 * @param day2 - Second day
 * @param locale - Calendar locale
 * @returns Number of years difference (positive if day1 is after day2)
 */
export function getDifferenceInYears(
  day1: Day,
  day2: Day,
  locale: CalendarLocale = 'en'
): number {
  const d1 = locale === 'fa' ? jalaliToGregorian(day1) : day1
  const d2 = locale === 'fa' ? jalaliToGregorian(day2) : day2
  
  let yearDiff = d1.year - d2.year
  
  // Adjust if the month/day hasn't been reached yet
  if (d1.month < d2.month || (d1.month === d2.month && d1.day < d2.day)) {
    yearDiff--
  }
  
  return yearDiff
}

/**
 * Convert a Gregorian date to Jalali
 * Alias for gregorianToJalali for convenience
 * @param day - Day object in Gregorian calendar
 * @returns Day object in Jalali calendar
 */
export function convertToJalali(day: Day): Day {
  return gregorianToJalali(day)
}

/**
 * Convert a Jalali date to Gregorian
 * Alias for jalaliToGregorian for convenience
 * @param day - Day object in Jalali calendar
 * @returns Day object in Gregorian calendar
 */
export function convertToGregorian(day: Day): Day {
  return jalaliToGregorian(day)
}

/**
 * Get the start of day (sets time to 00:00)
 * @param day - Day object
 * @returns Day object with hour and minute set to 0
 */
export function startOfDay(day: Day): Day {
  return {
    ...day,
    hour: 0,
    minute: 0
  }
}

/**
 * Get the end of day (sets time to 23:59)
 * @param day - Day object
 * @returns Day object with hour set to 23 and minute set to 59
 */
export function endOfDay(day: Day): Day {
  return {
    ...day,
    hour: 23,
    minute: 59
  }
}

/**
 * Get the start of month (first day of the month)
 * @param day - Day object
 * @param _locale - Calendar locale (unused, kept for API consistency)
 * @returns Day object representing the first day of the month
 */
export function startOfMonth(
  day: Day,
  _locale: CalendarLocale = 'en'
): Day {
  return {
    ...day,
    day: 1,
    hour: 0,
    minute: 0
  }
}

/**
 * Get the end of month (last day of the month)
 * @param day - Day object
 * @param locale - Calendar locale
 * @returns Day object representing the last day of the month
 */
export function endOfMonth(
  day: Day,
  locale: CalendarLocale = 'en'
): Day {
  const daysInMonth = getDaysInMonth(day.year, day.month, locale)
  return {
    ...day,
    day: daysInMonth,
    hour: 23,
    minute: 59
  }
}

/**
 * Get the start of year (first day of the year)
 * @param day - Day object
 * @returns Day object representing the first day of the year
 */
export function startOfYear(day: Day): Day {
  return {
    ...day,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0
  }
}

/**
 * Get the end of year (last day of the year)
 * @param day - Day object
 * @param locale - Calendar locale
 * @returns Day object representing the last day of the year
 */
export function endOfYear(
  day: Day,
  locale: CalendarLocale = 'en'
): Day {
  const daysInMonth = getDaysInMonth(day.year, 12, locale)
  return {
    ...day,
    month: 12,
    day: daysInMonth,
    hour: 23,
    minute: 59
  }
}

