/**
 * Date conversion utilities for Gregorian and Jalali calendars
 */

import { toJalaali, toGregorian } from 'jalaali-js'
import type { Day } from '../types'
import type { CalendarLocale, CalendarSystem } from '../types/calendar'

/**
 * Convert Gregorian Day to Jalali Day
 */
export function gregorianToJalali(day: Day): Day {
  const jDate = toJalaali(day.year, day.month, day.day)
  return {
    year: jDate.jy,
    month: jDate.jm,
    day: jDate.jd,
    hour: day.hour,
    minute: day.minute
  }
}

/**
 * Convert Jalali Day to Gregorian Day
 */
export function jalaliToGregorian(day: Day): Day {
  const gDate = toGregorian(day.year, day.month, day.day)
  return {
    year: gDate.gy,
    month: gDate.gm,
    day: gDate.gd,
    hour: day.hour,
    minute: day.minute
  }
}

/**
 * Convert a Day object to the target locale
 * Assumes the source day is in the opposite locale (Gregorian <-> Jalali)
 * @param day - Day object in source locale
 * @param targetLocale - Target locale ('gregorian' for Gregorian, 'jalali' for Jalali)
 * @param sourceLocale - Source locale (optional, defaults to opposite of targetLocale)
 */
export function convertToLocale(
  day: Day,
  targetLocale: CalendarLocale,
  sourceLocale?: CalendarLocale
): Day {
  // If source locale is not provided, assume it's the opposite of target
  const actualSourceLocale =
    sourceLocale || (targetLocale === 'jalali' ? 'gregorian' : 'jalali')

  // If already in target locale, return as-is
  if (actualSourceLocale === targetLocale) {
    return day
  }

  // Convert between calendars
  if (targetLocale === 'jalali') {
    // Convert from Gregorian to Jalali
    return gregorianToJalali(day)
  } else {
    // Convert from Jalali to Gregorian
    return jalaliToGregorian(day)
  }
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
 */
export function dayToDate(
  day: Day,
  calendarSystem: CalendarLocale = 'gregorian'
): Date {
  // If day is in Jalali, convert to Gregorian first
  const gregorianDay =
    calendarSystem === 'jalali' ? jalaliToGregorian(day) : day

  return new Date(
    gregorianDay.year,
    gregorianDay.month - 1, // JavaScript months are 0-indexed
    gregorianDay.day,
    gregorianDay.hour ?? 0,
    gregorianDay.minute ?? 0
  )
}
