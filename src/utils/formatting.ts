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
 * Format a number according to the specified number system
 */
export function formatNumber(
  num: number | string,
  numberSystem: 'latin' | 'persian'
): string {
  if (numberSystem === 'persian') {
    return toPersianNumeral(num)
  }
  return num.toString()
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
  numberSystem: 'latin' | 'persian',
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

  // Convert to Persian numerals if number system is 'persian'
  // This only converts digits, leaving separators and text unchanged
  if (numberSystem === 'persian') {
    formatted = toPersianNumeral(formatted)
  }

  return formatted
}

/**
 * Format a single day for display
 */
function formatDay(
  day: Day,
  numberSystem: 'latin' | 'persian',
  showTime = false,
  dateFormat?: string,
  timeFormat: '12' | '24' = '24'
): string {
  let formatted: string

  if (dateFormat) {
    // Use custom format (includes time if format string contains time tokens)
    formatted = formatDateWithCustomFormat(
      day,
      dateFormat,
      numberSystem,
      timeFormat
    )
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

    // Convert to Persian numerals if number system is 'persian'
    if (numberSystem === 'persian') {
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
  numberSystem: 'latin' | 'persian',
  type: CalendarType,
  showTime = false,
  fromLabel = 'from',
  toLabel = 'to',
  dateFormat?: string,
  timeFormat: '12' | '24' = '24'
): string {
  if (!value) return ''

  if (type === 'single' && 'year' in value) {
    return formatDay(
      value as Day,
      numberSystem,
      showTime,
      dateFormat,
      timeFormat
    )
  }

  if (type === 'range' && 'from' in value && 'to' in value) {
    const range = value as Range
    const fromStr = formatDay(
      range.from,
      numberSystem,
      showTime,
      dateFormat,
      timeFormat
    )
    // Handle case where to is null (when selecting start date)
    if (!range.to) {
      return `${fromLabel} ${fromStr}`
    }
    const toStr = formatDay(
      range.to,
      numberSystem,
      showTime,
      dateFormat,
      timeFormat
    )
    return `${fromLabel} ${fromStr} ${toLabel} ${toStr}`
  }

  if (type === 'week' && 'from' in value && 'to' in value) {
    const week = value as Week
    const fromStr = formatDay(
      week.from,
      numberSystem,
      showTime,
      dateFormat,
      timeFormat
    )
    const toStr = formatDay(
      week.to,
      numberSystem,
      showTime,
      dateFormat,
      timeFormat
    )
    const weekLabel = numberSystem === 'persian' ? 'هفته' : 'Week'
    return `${weekLabel}: ${fromStr} - ${toStr}`
  }

  if (type === 'multi' && Array.isArray(value)) {
    const multi = value as Multi
    if (multi.length === 0) return ''
    if (multi.length === 1) {
      return formatDay(multi[0], numberSystem, showTime, dateFormat, timeFormat)
    }
    // Return comma-separated list of formatted dates
    return multi
      .map((day) =>
        formatDay(day, numberSystem, showTime, dateFormat, timeFormat)
      )
      .join(',')
  }

  return ''
}

/**
 * Format a value for onChange callback output
 * Returns null if value is null, otherwise returns formatted string
 */
export function formatValueToString(
  value: Day | Range | Multi | Week | null,
  type: CalendarType,
  numberSystem: 'latin' | 'persian',
  withTime: boolean,
  dateFormat?: string,
  timeFormat: '12' | '24' = '24',
  fromLabel = 'from',
  toLabel = 'to'
): string | null {
  if (value === null) {
    return null
  }

  const formatted = formatDateForInput(
    value,
    numberSystem,
    type,
    withTime,
    fromLabel,
    toLabel,
    dateFormat,
    timeFormat
  )

  return formatted || null
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
  calendarSystem: CalendarLocale
): Day | null {
  // Remove whitespace
  let cleaned = dateString.trim()

  // Convert Persian numerals to English numerals for Jalali locale
  if (calendarSystem === 'jalali') {
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
