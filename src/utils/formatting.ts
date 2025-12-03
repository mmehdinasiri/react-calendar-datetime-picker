/**
 * Date formatting utilities for display in input fields
 */

import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType
} from '../types'

/**
 * Convert a number to Persian numerals
 */
export function toPersianNumeral(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return num
    .toString()
    .split('')
    .map((digit) => {
      const digitNum = parseInt(digit, 10)
      return isNaN(digitNum) ? digit : persianDigits[digitNum]
    })
    .join('')
}

/**
 * Format a date according to a custom format string
 * Supports tokens:
 * - Date: YYYY (year), MM (month), DD (day)
 * - Time: HH (24-hour), hh (12-hour), mm (minutes), ss (seconds), A (AM/PM), a (am/pm)
 * Supports custom separators and order
 * Examples: "DD/MM/YYYY", "MM-DD-YYYY HH:mm", "YYYY년 MM월 DD일 hh:mm A"
 */
function formatDateWithCustomFormat(
  day: Day,
  format: string,
  locale: CalendarLocale,
  timeFormat: '12' | '24' = '24'
): string {
  const year = day.year.toString()
  const month = day.month.toString().padStart(2, '0')
  const dayStr = day.day.toString().padStart(2, '0')

  // Replace date format tokens with actual values
  // Order matters: replace YYYY first to avoid partial matches with MM/DD
  let formatted = format
    .replace(/YYYY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, dayStr)

  // Handle time tokens if time is available
  if (day.hour !== undefined && day.minute !== undefined) {
    const hour24 = day.hour
    const minute = day.minute.toString().padStart(2, '0')
    // Note: seconds are not currently stored in Day type, but we support the token
    const second = '00'

    let hour12: number
    let ampm: string
    let ampmLower: string

    if (timeFormat === '12') {
      // Convert to 12-hour format
      if (hour24 === 0) {
        hour12 = 12
        ampm = 'AM'
        ampmLower = 'am'
      } else if (hour24 === 12) {
        hour12 = 12
        ampm = 'PM'
        ampmLower = 'pm'
      } else if (hour24 > 12) {
        hour12 = hour24 - 12
        ampm = 'PM'
        ampmLower = 'pm'
      } else {
        hour12 = hour24
        ampm = 'AM'
        ampmLower = 'am'
      }
    } else {
      hour12 = hour24
      ampm = ''
      ampmLower = ''
    }

    const hour24Str = hour24.toString().padStart(2, '0')
    const hour12Str = hour12.toString().padStart(2, '0')

    // Replace time tokens
    // Order matters: replace longer tokens first (HH before hh, A before a)
    formatted = formatted
      .replace(/HH/g, hour24Str)
      .replace(/hh/g, hour12Str)
      .replace(/mm/g, minute)
      .replace(/ss/g, second)
      .replace(/A/g, ampm)
      .replace(/a/g, ampmLower)
  } else {
    // Remove time tokens if time is not available
    // Replace tokens with empty string, then clean up extra spaces
    formatted = formatted
      .replace(/HH|hh|mm|ss/g, '')
      .replace(/A|a/g, '')
      // Clean up multiple spaces, spaces around colons, and trailing spaces
      .replace(/\s+/g, ' ')
      .replace(/\s*:\s*/g, '')
      .replace(/\s+$/g, '')
      .trim()
  }

  // Convert to Persian numerals if locale is 'fa'
  // This only converts digits, leaving separators and text unchanged
  if (locale === 'fa') {
    formatted = toPersianNumeral(formatted)
  }

  return formatted
}

/**
 * Format a single day for display
 */
function formatDay(
  day: Day,
  locale: CalendarLocale,
  showTime = false,
  dateFormat?: string,
  timeFormat: '12' | '24' = '24'
): string {
  let formatted: string

  if (dateFormat) {
    // Use custom format (includes time if format string contains time tokens)
    formatted = formatDateWithCustomFormat(day, dateFormat, locale, timeFormat)
  } else {
    // Default format: YYYY/MM/DD
    const year = day.year.toString()
    const month = day.month.toString().padStart(2, '0')
    const dayStr = day.day.toString().padStart(2, '0')
    formatted = `${year}/${month}/${dayStr}`

    // Append time if showTime is true and time is available
    if (showTime && day.hour !== undefined && day.minute !== undefined) {
      const hour = day.hour.toString().padStart(2, '0')
      const minute = day.minute.toString().padStart(2, '0')
      formatted += ` ${hour}:${minute}`
    }

    // Convert to Persian numerals if locale is 'fa'
    if (locale === 'fa') {
      formatted = toPersianNumeral(formatted)
    }
  }

  return formatted
}

/**
 * Format a date value for input display based on type
 */
export function formatDateForInput(
  value: Day | Range | Multi | Week | null,
  locale: CalendarLocale,
  type: CalendarType,
  showTime = false,
  fromLabel = 'from',
  toLabel = 'to',
  dateFormat?: string,
  timeFormat: '12' | '24' = '24'
): string {
  if (!value) return ''

  if (type === 'single' && 'year' in value) {
    return formatDay(value as Day, locale, showTime, dateFormat, timeFormat)
  }

  if (type === 'range' && 'from' in value && 'to' in value) {
    const range = value as Range
    const fromStr = formatDay(
      range.from,
      locale,
      showTime,
      dateFormat,
      timeFormat
    )
    // Handle case where to is null (when selecting start date)
    if (!range.to) {
      return `${fromLabel} ${fromStr}`
    }
    const toStr = formatDay(range.to, locale, showTime, dateFormat, timeFormat)
    return `${fromLabel} ${fromStr} ${toLabel} ${toStr}`
  }

  if (type === 'week' && 'from' in value && 'to' in value) {
    const week = value as Week
    const fromStr = formatDay(
      week.from,
      locale,
      showTime,
      dateFormat,
      timeFormat
    )
    const toStr = formatDay(week.to, locale, showTime, dateFormat, timeFormat)
    const weekLabel = locale === 'fa' ? 'هفته' : 'Week'
    return `${weekLabel}: ${fromStr} - ${toStr}`
  }

  if (type === 'multi' && Array.isArray(value)) {
    const multi = value as Multi
    if (multi.length === 0) return ''
    if (multi.length === 1) {
      return formatDay(multi[0], locale, showTime, dateFormat, timeFormat)
    }
    // Show count for multiple dates
    return `${multi.length} dates selected`
  }

  return ''
}

/**
 * Convert Day to string format (for utility functions like convertToFa/convertToEn)
 */
export function dayToString(day: Day, divider = '/'): string {
  const year = day.year.toString()
  const month = day.month.toString().padStart(2, '0')
  const dayStr = day.day.toString().padStart(2, '0')
  return `${year}${divider}${month}${divider}${dayStr}`
}

/**
 * Parse a date string to Day object
 * Supports formats: YYYY/MM/DD, YYYY-MM-DD, etc.
 * For Jalali locale, also supports Persian numerals
 */
export function parseDateString(
  dateString: string,
  locale: CalendarLocale
): Day | null {
  // Remove whitespace
  let cleaned = dateString.trim()

  // Convert Persian numerals to English numerals for Jalali locale
  if (locale === 'fa') {
    const persianToEnglish: { [key: string]: string } = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9'
    }
    cleaned = cleaned.replace(
      /[۰-۹]/g,
      (char) => persianToEnglish[char] || char
    )
  }

  // Try different separators
  const separators = ['/', '-', '.']
  let parts: string[] = []

  for (const sep of separators) {
    if (cleaned.includes(sep)) {
      parts = cleaned.split(sep)
      break
    }
  }

  if (parts.length !== 3) {
    return null
  }

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null
  }

  return { year, month, day }
}
