/**
 * Value normalization utilities
 * Handles converting various input formats to normalized Day/Range/Multi objects
 */

import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'
import { dateToDay } from './date-conversion'

/**
 * Type guards
 */
function isDayObject(value: unknown): value is Day {
  return (
    typeof value === 'object' &&
    value !== null &&
    'year' in value &&
    'month' in value &&
    'day' in value &&
    typeof (value as Day).year === 'number' &&
    typeof (value as Day).month === 'number' &&
    typeof (value as Day).day === 'number'
  )
}

function isRangeObject(value: unknown): value is Range {
  return (
    typeof value === 'object' &&
    value !== null &&
    'from' in value &&
    'to' in value &&
    isDayObject((value as Range).from) &&
    isDayObject((value as Range).to)
  )
}

function isMultiArray(value: unknown): value is Multi {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => isDayObject(item))
  )
}

/**
 * Normalize a single day object
 * Ensures all required fields are present and valid
 */
function normalizeDay(day: unknown, locale: CalendarLocale): Day | null {
  if (!day) return null

  if (isDayObject(day)) {
    // Validate day object
    if (
      day.year > 0 &&
      day.month >= 1 &&
      day.month <= 12 &&
      day.day >= 1 &&
      day.day <= 31
    ) {
      return {
        year: day.year,
        month: day.month,
        day: day.day,
        hour: day.hour,
        minute: day.minute,
      }
    }
  }

  // Try to convert from Date object
  if (day instanceof Date) {
    return dateToDay(day, locale)
  }

  return null
}

/**
 * Normalize initial value based on calendar type
 */
export function normalizeInitValue(
  value: unknown,
  locale: CalendarLocale,
  type: CalendarType
): Day | Range | Multi | null {
  if (!value) return null

  // Handle single date
  if (type === 'single') {
    return normalizeDay(value, locale)
  }

  // Handle range
  if (type === 'range') {
    if (isRangeObject(value)) {
      const from = normalizeDay(value.from, locale)
      const to = normalizeDay(value.to, locale)
      if (from && to) {
        return { from, to }
      }
    }
    return null
  }

  // Handle multi
  if (type === 'multi') {
    if (isMultiArray(value)) {
      const normalized = value
        .map((day) => normalizeDay(day, locale))
        .filter((day): day is Day => day !== null)
      return normalized.length > 0 ? normalized : null
    }
    return null
  }

  return null
}

/**
 * Extract month from a value for display purposes
 */
export function extractMonthFromValue(
  value: Day | Range | Multi | null
): Day | null {
  if (!value) return null

  if (isDayObject(value)) {
    return { year: value.year, month: value.month, day: 1 }
  }

  if (isRangeObject(value)) {
    return { year: value.from.year, month: value.from.month, day: 1 }
  }

  if (Array.isArray(value) && value.length > 0) {
    const firstDay = value[0]
    return { year: firstDay.year, month: firstDay.month, day: 1 }
  }

  return null
}

