/**
 * Date conversion utilities for Gregorian and Jalali calendars
 */

import { toJalaali, toGregorian } from 'jalaali-js'
import type { Day, Range, Multi } from '../types'
import type {
  CalendarLocale,
  CalendarSystem,
  RangeDate
} from '../types/calendar'
import { isValidDay } from './validation'

/**
 * Convert Gregorian Day to Jalali Day
 * @throws {Error} If the input date is invalid or conversion fails
 */
export function gregorianToJalali(day: Day): Day {
  try {
    // Validate input first
    if (!isValidDay(day, 'gregorian')) {
      throw new Error(`Invalid Gregorian date: ${JSON.stringify(day)}`)
    }

    const jDate = toJalaali(day.year, day.month, day.day)
    return {
      year: jDate.jy,
      month: jDate.jm,
      day: jDate.jd,
      hour: day.hour,
      minute: day.minute
    }
  } catch (error) {
    console.error(`Failed to convert Gregorian date: ${error}`)
    throw new Error(
      `Date conversion failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Convert Jalali Day to Gregorian Day
 * @throws {Error} If the input date is invalid or conversion fails
 */
export function jalaliToGregorian(day: Day): Day {
  try {
    // Validate input first
    if (!isValidDay(day, 'jalali')) {
      throw new Error(`Invalid Jalali date: ${JSON.stringify(day)}`)
    }

    const gDate = toGregorian(day.year, day.month, day.day)
    return {
      year: gDate.gy,
      month: gDate.gm,
      day: gDate.gd,
      hour: day.hour,
      minute: day.minute
    }
  } catch (error) {
    console.error(`Failed to convert Jalali date: ${error}`)
    throw new Error(
      `Date conversion failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Convert a Day object to the target locale
 * @param day - Day object in source locale
 * @param fromLocale - Source locale ('gregorian' or 'jalali')
 * @param toLocale - Target locale ('gregorian' or 'jalali')
 * @returns Day object in target locale
 * @throws {Error} If conversion fails
 */
export function convertToLocale(
  day: Day,
  fromLocale: CalendarLocale,
  toLocale: CalendarLocale
): Day {
  // If already in target locale, return as-is
  if (fromLocale === toLocale) {
    return day
  }

  // Convert between calendars
  if (fromLocale === 'jalali' && toLocale === 'gregorian') {
    return jalaliToGregorian(day)
  }

  if (fromLocale === 'gregorian' && toLocale === 'jalali') {
    return gregorianToJalali(day)
  }

  // Same locale (shouldn't reach here due to early return, but TypeScript needs it)
  return day
}

/**
 * Normalize calendar system input to CalendarLocale
 * Converts shorthand aliases ('ge' -> 'gregorian', 'ja' -> 'jalali')
 */
export function normalizeCalendarSystem(
  input: CalendarSystem | undefined
): CalendarLocale {
  if (!input) return 'gregorian'
  if (input === 'ge') return 'gregorian'
  if (input === 'ja') return 'jalali'
  return input
}

/**
 * Get today's date in the specified locale
 */
export function getToday(calendarSystem: CalendarLocale): Day {
  const today = new Date()
  const gregorianDay: Day = {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // JavaScript months are 0-indexed
    day: today.getDate()
  }

  if (calendarSystem === 'jalali') {
    return gregorianToJalali(gregorianDay)
  }

  return gregorianDay
}

/**
 * Convert a JavaScript Date object to a Day object in the specified locale
 * Uses local time methods to preserve user's intended date when converting from Date objects
 * Note: When used with dates created by dayToDate (UTC), the time component may differ
 * based on timezone, but the date (year/month/day) will be correct
 */
export function dateToDay(date: Date, calendarSystem: CalendarLocale): Day {
  const gregorianDay: Day = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  }

  if (calendarSystem === 'jalali') {
    return gregorianToJalali(gregorianDay)
  }

  return gregorianDay
}

/**
 * Convert a Day object to a JavaScript Date object
 * Converts Jalali dates to Gregorian before creating Date object
 * Uses UTC to ensure the date always matches the calendar date regardless of timezone
 * @param day - Day object in the specified calendar system
 * @param calendarSystem - Calendar system of the input day ('gregorian' or 'jalali')
 * @returns JavaScript Date object (in UTC, but represents the correct calendar date)
 * @throws {Error} If the input date is invalid or conversion fails
 */
export function dayToDate(
  day: Day,
  calendarSystem: CalendarLocale = 'gregorian'
): Date {
  try {
    // Validate input first
    if (!isValidDay(day, calendarSystem)) {
      throw new Error(`Invalid ${calendarSystem} date: ${JSON.stringify(day)}`)
    }

    // If day is in Jalali, convert to Gregorian first
    const gregorianDay =
      calendarSystem === 'jalali' ? jalaliToGregorian(day) : day

    // Use Date.UTC() to create the date in UTC timezone
    // This ensures the date always matches the calendar date regardless of user's timezone
    // For example: December 27, 2025 should always be 2025-12-27T00:00:00.000Z, not 2025-12-26T23:00:00.000Z
    return new Date(
      Date.UTC(
        gregorianDay.year,
        gregorianDay.month - 1, // JavaScript months are 0-indexed
        gregorianDay.day,
        gregorianDay.hour ?? 0,
        gregorianDay.minute ?? 0,
        0, // seconds
        0 // milliseconds
      )
    )
  } catch (error) {
    console.error('Failed to convert Day to Date:', error)
    throw new Error(
      `Date conversion failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Convert a normalized value (Day | Range | Multi | null) to JavaScript Date equivalent
 * Always returns Gregorian dates, converting from Jalali if necessary
 * @param value - Normalized value (Day | Range | Multi | null)
 * @param type - Calendar selection type
 * @param calendarSystem - Calendar system of the input value
 * @returns JavaScript Date equivalent (always Gregorian)
 */
export function convertToJsDate(
  value: Day | Range | Multi | null,
  type: 'single' | 'range' | 'multi' | 'week',
  calendarSystem: CalendarLocale
): Date | RangeDate | Date[] | null {
  if (value === null) {
    return null
  }

  if (type === 'single' && 'year' in value && !('from' in value)) {
    const day = value as Day
    return dayToDate(day, calendarSystem)
  }

  if ((type === 'range' || type === 'week') && 'from' in value) {
    const range = value as Range
    return {
      from: range.from ? dayToDate(range.from, calendarSystem) : null,
      to: range.to ? dayToDate(range.to, calendarSystem) : null
    }
  }

  if (type === 'multi' && Array.isArray(value)) {
    const multi = value as Multi
    return multi.map((day) => dayToDate(day, calendarSystem))
  }

  return null
}
