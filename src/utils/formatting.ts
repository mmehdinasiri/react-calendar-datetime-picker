/**
 * Date formatting utilities for display in input fields
 */

import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'

/**
 * Format a single day for display
 */
function formatDay(
  day: Day,
  _locale: CalendarLocale,
  showTime = false
): string {
  const year = day.year.toString()
  const month = day.month.toString().padStart(2, '0')
  const dayStr = day.day.toString().padStart(2, '0')

  let formatted = `${year}/${month}/${dayStr}`

  if (showTime && day.hour !== undefined && day.minute !== undefined) {
    const hour = day.hour.toString().padStart(2, '0')
    const minute = day.minute.toString().padStart(2, '0')
    formatted += ` ${hour}:${minute}`
  }

  return formatted
}

/**
 * Format a date value for input display based on type
 */
export function formatDateForInput(
  value: Day | Range | Multi | null,
  locale: CalendarLocale,
  type: CalendarType,
  showTime = false,
  fromLabel = 'from',
  toLabel = 'to'
): string {
  if (!value) return ''

  if (type === 'single' && 'year' in value) {
    return formatDay(value as Day, locale, showTime)
  }

  if (type === 'range' && 'from' in value && 'to' in value) {
    const range = value as Range
    const fromStr = formatDay(range.from, locale, showTime)
    const toStr = formatDay(range.to, locale, showTime)
    return `${fromLabel} ${fromStr} ${toLabel} ${toStr}`
  }

  if (type === 'multi' && Array.isArray(value)) {
    const multi = value as Multi
    if (multi.length === 0) return ''
    if (multi.length === 1) {
      return formatDay(multi[0], locale, showTime)
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
 */
export function parseDateString(
  dateString: string,
  _locale: CalendarLocale
): Day | null {
  // Remove whitespace
  const cleaned = dateString.trim()

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
