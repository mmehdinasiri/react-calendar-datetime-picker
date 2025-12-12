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
import type { ValidationResult } from '../types/calendar'
import { validateDay } from './validation'
import { getYearRange } from './calendar-grid'

// --- Constants & Helpers ---

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const PERSIAN_TO_ENGLISH: Record<string, string> = {
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

/**
 * Convert a number to Persian numerals
 */
export function toPersianNumeral(num: number | string): string {
  return num.toString().replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)])
}

/**
 * Convert Persian numerals in a string to English numerals
 */
export function toEnglishNumeral(str: string): string {
  return str.replace(/[۰-۹]/g, (char) => PERSIAN_TO_ENGLISH[char] || char)
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
  const { year, month, day: dayNum, hour, minute } = day
  const hasTime = hour !== undefined && minute !== undefined

  // Prepare date strings
  const YYYY = year.toString()
  const MM = month.toString().padStart(2, '0')
  const DD = dayNum.toString().padStart(2, '0')

  // Prepare time strings
  let HH = '',
    hh = '',
    mm = '',
    ss = '00',
    A = '',
    a = ''

  if (hasTime) {
    HH = hour.toString().padStart(2, '0')
    mm = minute.toString().padStart(2, '0')

    // Convert to 12-hour format
    const hour12 = hour % 12 || 12
    hh = hour12.toString().padStart(2, '0')

    const isPm = hour >= 12
    A = isPm ? 'PM' : 'AM'
    a = isPm ? 'pm' : 'am'
  }

  // Map of tokens to their values
  const tokens: Record<string, string> = {
    YYYY,
    MM,
    DD,
    HH,
    hh,
    mm,
    ss,
    A,
    a
  }

  // Regex to match tokens
  const tokenRegex = /YYYY|MM|DD|HH|hh|mm|ss|A|a/g

  let formatted = format.replace(tokenRegex, (match) => {
    // If we don't have time but the token asks for it, return empty string
    if (!hasTime && ['HH', 'hh', 'mm', 'ss', 'A', 'a'].includes(match)) {
      return ''
    }
    return tokens[match] ?? match
  })

  // Cleanup if time tokens were removed (extra spaces/colons)
  if (!hasTime) {
    formatted = formatted
      .replace(/HH|hh|mm|ss/g, '') // Ensure any remaining time tokens are gone
      .replace(/A|a/g, '')
      .replace(/\s*:\s*/g, '') // Remove empty colons
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .replace(/\s+$/g, '') // Remove trailing spaces
      .trim()
  }

  // Convert to Persian numerals if number system is 'persian'
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
    const { year, month, day: dayNum, hour, minute } = day
    const YYYY = year.toString()
    const MM = month.toString().padStart(2, '0')
    const DD = dayNum.toString().padStart(2, '0')

    formatted = `${YYYY}/${MM}/${DD}`

    // Append time if showTime is true and time is available
    if (showTime && hour !== undefined && minute !== undefined) {
      const HH = hour.toString().padStart(2, '0')
      const mm = minute.toString().padStart(2, '0')
      formatted += ` ${HH}:${mm}`
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

  // Helper to keep code DRY
  const fmt = (d: Day) =>
    formatDay(d, numberSystem, showTime, dateFormat, timeFormat)

  if (type === 'single' && 'year' in value) {
    return fmt(value as Day)
  }

  if (type === 'range' && 'from' in value && 'to' in value) {
    const range = value as Range
    const fromStr = fmt(range.from)
    // Handle case where to is null (when selecting start date)
    if (!range.to) {
      return `${fromLabel} ${fromStr}`
    }
    const toStr = fmt(range.to)
    return `${fromLabel} ${fromStr} ${toLabel} ${toStr}`
  }

  if (type === 'week' && 'from' in value && 'to' in value) {
    const week = value as Week
    const fromStr = fmt(week.from)
    const toStr = fmt(week.to)
    const weekLabel = numberSystem === 'persian' ? 'هفته' : 'Week'
    return `${weekLabel}: ${fromStr} - ${toStr}`
  }

  if (type === 'multi' && Array.isArray(value)) {
    const multi = value as Multi
    if (multi.length === 0) return ''
    if (multi.length === 1) {
      return fmt(multi[0])
    }
    // Return comma-separated list of formatted dates
    return multi.map(fmt).join(',')
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
  const { year, month, day: dayNum } = day
  return [
    year,
    month.toString().padStart(2, '0'),
    dayNum.toString().padStart(2, '0')
  ].join(divider)
}

// --- Parsing Logic ---

/**
 * Helper to parse simple formats (YYYY/MM/DD, YYYY-MM-DD, etc.)
 */
function parseSimpleDate(dateStr: string): Day | null {
  const match = dateStr.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/)
  if (!match) return null

  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10)
  }
}

/**
 * Helper to escape Regex special characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Parse a date string to Day object
 * Supports formats: YYYY/MM/DD, YYYY-MM-DD, etc.
 * If dateFormat is provided, parses according to the format pattern (e.g., "DD/MM/YYYY", "MM-DD-YYYY")
 * For Jalali locale, also supports Persian numerals
 */
export function parseDateString(
  dateString: string,
  calendarSystem: CalendarLocale,
  dateFormat?: string
): Day | null {
  // Remove whitespace
  let cleaned = dateString.trim()

  // Convert Persian numerals to English numerals for Jalali locale
  if (calendarSystem === 'jalali') {
    cleaned = toEnglishNumeral(cleaned)
  }

  // If dateFormat is provided, parse according to format
  if (dateFormat) {
    // 1. Escape the user-provided format to treat separators (/, -, .) as literals
    let regexStr = escapeRegExp(dateFormat)

    // 2. Replace format tokens with Named Capturing Groups
    regexStr = regexStr
      .replace(/YYYY/g, '(?<year>\\d{4})')
      .replace(/MM/g, '(?<month>\\d{1,2})')
      .replace(/DD/g, '(?<day>\\d{1,2})')

    const matcher = new RegExp(`^${regexStr}$`)
    const match = cleaned.match(matcher)

    if (match && match.groups) {
      const year = parseInt(match.groups.year, 10)
      const month = parseInt(match.groups.month, 10)
      const day = parseInt(match.groups.day, 10)

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return { year, month, day }
      }
    }
  }

  // Default behavior: Try different separators and assume YYYY/MM/DD format
  return parseSimpleDate(cleaned)
}

/**
 * Parse and validate a date string in one step
 * Combines parseDateString and validateDay for convenience
 * Also validates that the year is within the calendar's year range
 * @param dateString - Date string to parse (e.g., "2024/12/25", "2024-12-25", "25/12/2024")
 * @param calendarSystem - Calendar system ('gregorian' or 'jalali')
 * @param dateFormat - Optional format pattern (e.g., "DD/MM/YYYY", "MM-DD-YYYY"). If provided, parses according to this format.
 * @returns ValidationResult with parsed and validated Day object, or error if parsing/validation fails
 */
export function parseAndValidateDate(
  dateString: string,
  calendarSystem: CalendarLocale,
  dateFormat?: string
): ValidationResult<Day> {
  // Parse the date string
  const parsed = parseDateString(dateString, calendarSystem, dateFormat)

  if (!parsed) {
    return {
      success: false,
      error: {
        code: 'PARSE_ERROR',
        message: `Could not parse date string: "${dateString}"`,
        details: { dateString, calendarSystem }
      }
    }
  }

  // Check if year is within the calendar's year range
  const yearRangeArr = getYearRange(parsed.year, 12, calendarSystem)
  // Optimization: Find min/max without iterating whole array if possible,
  // but using spread for compatibility with existing getYearRange return type
  const minYear = Math.min(...yearRangeArr)
  const maxYear = Math.max(...yearRangeArr)

  if (parsed.year < minYear || parsed.year > maxYear) {
    return {
      success: false,
      error: {
        code: 'YEAR_OUT_OF_RANGE',
        message: `Year ${parsed.year} is not in the range of calendar`,
        details: {
          year: parsed.year,
          calendarSystem,
          yearRange: { min: minYear, max: maxYear }
        }
      }
    }
  }

  // Validate the parsed date
  return validateDay(parsed, calendarSystem)
}
