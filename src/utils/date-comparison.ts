/**
 * Date comparison and manipulation utilities
 * Works with both Gregorian and Jalali calendars
 */

import type { Day, CalendarLocale, Range } from '../types'
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
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  return compareDays(day1, day2, calendarSystem) < 0
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
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  return compareDays(day1, day2, calendarSystem) > 0
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
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  return compareDays(day1, day2, calendarSystem) === 0
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
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  const comparison = compareDays(start, end, calendarSystem)
  // If start is after end, swap them
  if (comparison > 0) {
    return (
      compareDays(day, end, calendarSystem) >= 0 &&
      compareDays(day, start, calendarSystem) <= 0
    )
  }
  return (
    compareDays(day, start, calendarSystem) >= 0 &&
    compareDays(day, end, calendarSystem) <= 0
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  const date = dayToDate(day, calendarSystem)
  date.setDate(date.getDate() + days)
  return dateToDay(date, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  return addDays(day, -days, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  if (calendarSystem === 'jalali') {
    let { year, month, day: d } = day

    // Calculate new total months
    const totalMonths = year * 12 + (month - 1) + months
    const newYear = Math.floor(totalMonths / 12)
    const newMonth = (totalMonths % 12) + 1

    // Handle days in month
    const maxDay = getDaysInMonth(newYear, newMonth, calendarSystem)
    const newDay = Math.min(d, maxDay)

    return {
      year: newYear,
      month: newMonth,
      day: newDay,
      hour: day.hour || 0,
      minute: day.minute || 0
    }
  }

  const date = dayToDate(day, calendarSystem)
  const originalDay = day.day

  // Set day to 1 to avoid overflow when changing month
  date.setDate(1)
  date.setMonth(date.getMonth() + months)

  // Get max days in the new month
  // Note: For Gregorian, we use the standard Date behavior for month/year
  const maxDay = getDaysInMonth(
    date.getFullYear(),
    date.getMonth() + 1,
    calendarSystem
  )

  // Restore day, capped at maxDay
  date.setDate(Math.min(originalDay, maxDay))

  return dateToDay(date, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  return addMonths(day, -months, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  if (calendarSystem === 'jalali') {
    const newYear = day.year + years
    const maxDay = getDaysInMonth(newYear, day.month, calendarSystem)
    const newDay = Math.min(day.day, maxDay)

    return {
      ...day,
      year: newYear,
      day: newDay,
      hour: day.hour || 0,
      minute: day.minute || 0
    }
  }

  const date = dayToDate(day, calendarSystem)
  const originalDay = day.day

  // Set day to 1 to avoid overflow when changing year (e.g. Feb 29)
  date.setDate(1)
  date.setFullYear(date.getFullYear() + years)

  // Get max days in the new month/year
  const maxDay = getDaysInMonth(
    date.getFullYear(),
    date.getMonth() + 1,
    calendarSystem
  )

  // Restore day, capped at maxDay
  date.setDate(Math.min(originalDay, maxDay))

  return dateToDay(date, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  return addYears(day, -years, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): number {
  const d1 = calendarSystem === 'jalali' ? jalaliToGregorian(day1) : day1
  const d2 = calendarSystem === 'jalali' ? jalaliToGregorian(day2) : day2

  // Use UTC to avoid DST issues and ignore time components for pure day difference
  const date1 = Date.UTC(d1.year, d1.month - 1, d1.day)
  const date2 = Date.UTC(d2.year, d2.month - 1, d2.day)

  const diffTime = date1 - date2
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
  _calendarSystem: CalendarLocale = 'gregorian'
): number {
  // If locale is 'jalali', we don't need to convert to Gregorian
  // We can calculate the difference directly using Jalali dates
  // This avoids issues with leap year mismatches during conversion
  const yearDiff = day1.year - day2.year
  const monthDiff = day1.month - day2.month

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
  _calendarSystem: CalendarLocale = 'gregorian'
): number {
  // If locale is 'jalali', we don't need to convert to Gregorian
  // We can calculate the difference directly using Jalali dates
  let yearDiff = day1.year - day2.year

  // Adjust if the month/day hasn't been reached yet
  if (
    day1.month < day2.month ||
    (day1.month === day2.month && day1.day < day2.day)
  ) {
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
  _calendarSystem: CalendarLocale = 'gregorian'
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  const daysInMonth = getDaysInMonth(day.year, day.month, calendarSystem)
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
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  const daysInMonth = getDaysInMonth(day.year, 12, calendarSystem)
  return {
    ...day,
    month: 12,
    day: daysInMonth,
    hour: 23,
    minute: 59
  }
}

/**
 * Check if two days are in the same month
 * @param day1 - First day to compare
 * @param day2 - Second day to compare
 * @returns true if both days are in the same month and year
 */
export function isSameMonth(day1: Day, day2: Day): boolean {
  return day1.year === day2.year && day1.month === day2.month
}

/**
 * Check if two days are in the same year
 * @param day1 - First day to compare
 * @param day2 - Second day to compare
 * @returns true if both days are in the same year
 */
export function isSameYear(day1: Day, day2: Day): boolean {
  return day1.year === day2.year
}

/**
 * Get the start of week for a given day
 * @param day - Day object
 * @param weekStart - First day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 * @param locale - Calendar locale
 * @returns Day object representing the first day of the week
 */
export function getStartOfWeek(
  day: Day,
  weekStart: number,
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  const date = dayToDate(day, calendarSystem)
  const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday

  // Calculate days to subtract to get to the start of week
  let daysToSubtract = (dayOfWeek - weekStart + 7) % 7

  return subtractDays(day, daysToSubtract, calendarSystem)
}

/**
 * Get the end of week for a given day
 * @param day - Day object
 * @param weekStart - First day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 * @param locale - Calendar locale
 * @returns Day object representing the last day of the week
 */
export function getEndOfWeek(
  day: Day,
  weekStart: number,
  calendarSystem: CalendarLocale = 'gregorian'
): Day {
  const startOfWeek = getStartOfWeek(day, weekStart, calendarSystem)
  // Add 6 days to get to the end of the week (7 days total, starting from day 0)
  return addDays(startOfWeek, 6, calendarSystem)
}

/**
 * Get all days in a date range (inclusive)
 * @param range - Date range with from and to dates
 * @param locale - Calendar locale
 * @returns Array of Day objects from start to end (inclusive)
 */
export function getDaysInRange(
  range: Range,
  calendarSystem: CalendarLocale = 'gregorian'
): Day[] {
  const { from, to } = range

  // If to is null, return only the from date
  if (!to) {
    return [{ ...from }]
  }

  // Determine which date is earlier
  const comparison = compareDays(from, to, calendarSystem)
  const start = comparison <= 0 ? from : to
  const end = comparison <= 0 ? to : from

  const days: Day[] = []
  let current: Day = { ...start }

  // Add days until we reach the end date (inclusive)
  while (compareDays(current, end, calendarSystem) <= 0) {
    days.push({ ...current })
    current = addDays(current, 1, calendarSystem)
  }

  return days
}
