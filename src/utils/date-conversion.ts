/**
 * Date conversion utilities for Gregorian and Jalali calendars
 */

import { toJalaali, toGregorian } from 'jalaali-js'
import type { Day, CalendarLocale } from '../types'

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
    minute: day.minute,
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
    minute: day.minute,
  }
}

/**
 * Convert a Day object to the target locale
 * If the day is already in the target locale, returns it as-is
 * Otherwise converts it
 */
export function convertToLocale(day: Day, targetLocale: CalendarLocale): Day {
  // We need to know the source locale to convert properly
  // For now, we'll assume we're converting from Gregorian to Jalali or vice versa
  // This will be refined when we have better context about the source locale
  
  if (targetLocale === 'fa') {
    // Convert to Jalali
    return gregorianToJalali(day)
  } else {
    // Convert to Gregorian
    return jalaliToGregorian(day)
  }
}

/**
 * Get today's date in the specified locale
 */
export function getToday(locale: CalendarLocale): Day {
  const today = new Date()
  const gregorianDay: Day = {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // JavaScript months are 0-indexed
    day: today.getDate(),
  }

  if (locale === 'fa') {
    return gregorianToJalali(gregorianDay)
  }

  return gregorianDay
}

/**
 * Convert a JavaScript Date object to a Day object in the specified locale
 */
export function dateToDay(date: Date, locale: CalendarLocale): Day {
  const gregorianDay: Day = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }

  if (locale === 'fa') {
    return gregorianToJalali(gregorianDay)
  }

  return gregorianDay
}

/**
 * Convert a Day object to a JavaScript Date object
 * Assumes the Day is in Gregorian calendar
 */
export function dayToDate(day: Day): Date {
  // If day is in Jalali, convert to Gregorian first
  // For now, we'll assume it's Gregorian - this will be refined
  const gregorianDay = day // TODO: Add locale detection
  
  return new Date(
    gregorianDay.year,
    gregorianDay.month - 1, // JavaScript months are 0-indexed
    gregorianDay.day,
    gregorianDay.hour ?? 0,
    gregorianDay.minute ?? 0
  )
}

