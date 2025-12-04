/**
 * Value normalization utilities
 * Handles converting various input formats to normalized Day/Range/Multi objects
 */

import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType
} from '../types'
import type { CalendarError } from '../types/calendar'
import { dateToDay } from './date-conversion'
import { parseDateString } from './formatting'
import { getWeekBounds } from './calendar-grid'
import { isValidDay } from './validation'

/**
 * Check if we're in development mode
 * Uses a simple check that works in both browser and Node environments
 */
const isDevelopment = (() => {
  try {
    // Check for common development indicators
    if (typeof window !== 'undefined') {
      // Browser environment - check for dev tools or localhost
      return (
        window.location?.hostname === 'localhost' ||
        window.location?.hostname === '127.0.0.1' ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__DEV__ === true
      )
    }
    // Node environment - assume development unless explicitly set to production
    return true // Default to showing warnings in Node (can be overridden)
  } catch {
    return false // If we can't determine, don't show warnings
  }
})()

/**
 * Type guards
 */
export function isDayObject(value: unknown): value is Day {
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

export function isRangeObject(value: unknown): value is Range {
  return (
    typeof value === 'object' &&
    value !== null &&
    'from' in value &&
    'to' in value &&
    isDayObject((value as Range).from) &&
    isDayObject((value as Range).to)
  )
}

export function isMultiArray(value: unknown): value is Multi {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => isDayObject(item))
  )
}

/**
 * Check if two values are structurally equal
 * Handles Day, Range, and Multi types
 */
export function areValuesEqual(v1: unknown, v2: unknown): boolean {
  if (v1 === v2) return true

  // Treat null and undefined as equal (both mean "no value")
  if ((v1 === null || v1 === undefined) && (v2 === null || v2 === undefined)) {
    return true
  }

  if (!v1 || !v2) return false

  // Check Day equality
  if (isDayObject(v1) && isDayObject(v2)) {
    return (
      v1.year === v2.year &&
      v1.month === v2.month &&
      v1.day === v2.day &&
      (v1.hour || 0) === (v2.hour || 0) &&
      (v1.minute || 0) === (v2.minute || 0)
    )
  }

  // Check Range equality
  if (isRangeObject(v1) && isRangeObject(v2)) {
    return areValuesEqual(v1.from, v2.from) && areValuesEqual(v1.to, v2.to)
  }

  // Check Multi equality
  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) return false
    // Sort logic might be needed if order doesn't matter, but usually order matters or is sorted
    // For now assume same order or just exact match
    return v1.every((day, i) => areValuesEqual(day, v2[i]))
  }

  return false
}

/**
 * Normalize a single day object
 * Ensures all required fields are present and valid
 * Supports: Day objects, Date objects, date strings, and timestamps (numbers)
 * Returns result with value and errors
 */
function normalizeDayWithErrors(
  day: unknown,
  locale: CalendarLocale,
  fieldName: string = 'date'
): { value: Day | null; error: CalendarError | null } {
  if (!day) {
    return { value: null, error: null }
  }

  // Handle Day objects (already in the correct format)
  if (isDayObject(day)) {
    // Validate day object
    if (isValidDay(day, locale)) {
      return {
        value: {
          year: day.year,
          month: day.month,
          day: day.day,
          hour: day.hour,
          minute: day.minute
        },
        error: null
      }
    } else {
      const error: CalendarError = {
        type: 'normalization',
        field: fieldName,
        value: day,
        message: `Invalid day object: date is invalid for the given locale`
      }
      if (isDevelopment) {
        console.warn(`[react-calendar-datetime-picker] ${error.message}`, day)
      }
      return { value: null, error }
    }
  }

  // Handle Date objects
  if (day instanceof Date) {
    if (isNaN(day.getTime())) {
      const error: CalendarError = {
        type: 'normalization',
        field: fieldName,
        value: day,
        message: `Invalid Date object: date is invalid`
      }
      if (isDevelopment) {
        console.warn(`[react-calendar-datetime-picker] ${error.message}`, day)
      }
      return { value: null, error }
    }
    return { value: dateToDay(day, locale), error: null }
  }

  // Handle numbers (timestamps)
  if (typeof day === 'number') {
    const date = new Date(day)
    if (isNaN(date.getTime())) {
      const error: CalendarError = {
        type: 'normalization',
        field: fieldName,
        value: day,
        message: `Invalid timestamp: ${day} cannot be converted to a valid date`
      }
      if (isDevelopment) {
        console.warn(`[react-calendar-datetime-picker] ${error.message}`)
      }
      return { value: null, error }
    }
    return { value: dateToDay(date, locale), error: null }
  }

  // Handle strings (date strings like "2024/12/25", "2024-12-25", ISO strings, etc.)
  if (typeof day === 'string') {
    // First try to parse as Date (handles ISO strings like "2024-12-25T00:00:00Z")
    const dateFromString = new Date(day)
    if (!isNaN(dateFromString.getTime())) {
      return { value: dateToDay(dateFromString, locale), error: null }
    }

    // Fall back to simple date string parsing (handles "2024/12/25", "2024-12-25", etc.)
    const parsed = parseDateString(day, locale)
    if (parsed) {
      return { value: parsed, error: null }
    }

    const error: CalendarError = {
      type: 'normalization',
      field: fieldName,
      value: day,
      message: `Invalid date string: "${day}" cannot be parsed as a date`
    }
    if (isDevelopment) {
      console.warn(`[react-calendar-datetime-picker] ${error.message}`)
    }
    return { value: null, error }
  }

  const error: CalendarError = {
    type: 'normalization',
    field: fieldName,
    value: day,
    message: `Unsupported date format: expected Day object, Date, string, or number, got ${typeof day}`
  }
  if (isDevelopment) {
    console.warn(`[react-calendar-datetime-picker] ${error.message}`, day)
  }
  return { value: null, error }
}

/**
 * Normalize initial value based on calendar type with error information
 */
export function normalizeInitValueWithErrors(
  value: unknown,
  locale: CalendarLocale,
  type: CalendarType,
  fieldName: string = 'initValue'
): { value: Day | Range | Multi | Week | null; errors: CalendarError[] } {
  const errors: CalendarError[] = []

  if (!value) {
    return { value: null, errors }
  }

  // Handle single date
  if (type === 'single') {
    const result = normalizeDayWithErrors(value, locale, fieldName)
    if (result.error) {
      errors.push(result.error)
    }
    return { value: result.value, errors }
  }

  // Handle range
  if (type === 'range') {
    if (isRangeObject(value)) {
      const fromResult = normalizeDayWithErrors(
        value.from,
        locale,
        `${fieldName}.from`
      )
      const toResult = normalizeDayWithErrors(
        value.to,
        locale,
        `${fieldName}.to`
      )

      if (fromResult.error) errors.push(fromResult.error)
      if (toResult.error) errors.push(toResult.error)

      if (fromResult.value && toResult.value) {
        return { value: { from: fromResult.value, to: toResult.value }, errors }
      }
    } else {
      const error: CalendarError = {
        type: 'normalization',
        field: fieldName,
        value,
        message: `Invalid range format: expected object with 'from' and 'to' properties`
      }
      if (isDevelopment) {
        console.warn(`[react-calendar-datetime-picker] ${error.message}`, value)
      }
      errors.push(error)
    }
    return { value: null, errors }
  }

  // Handle week (similar to range but always calculates week bounds)
  if (type === 'week') {
    // Week can accept a single date (which will be converted to week bounds) or a week object
    if (isRangeObject(value)) {
      const fromResult = normalizeDayWithErrors(
        value.from,
        locale,
        `${fieldName}.from`
      )
      const toResult = normalizeDayWithErrors(
        value.to,
        locale,
        `${fieldName}.to`
      )

      if (fromResult.error) errors.push(fromResult.error)
      if (toResult.error) errors.push(toResult.error)

      if (fromResult.value && toResult.value) {
        return { value: { from: fromResult.value, to: toResult.value }, errors }
      }
    } else {
      // Single date - convert to week bounds
      const dayResult = normalizeDayWithErrors(value, locale, fieldName)
      if (dayResult.error) {
        errors.push(dayResult.error)
        return { value: null, errors }
      }
      if (dayResult.value) {
        const weekBounds = getWeekBounds(dayResult.value, locale)
        return { value: weekBounds, errors }
      }
    }
    return { value: null, errors }
  }

  // Handle multi
  if (type === 'multi') {
    if (isMultiArray(value)) {
      const normalized: Day[] = []
      value.forEach((day, index) => {
        const result = normalizeDayWithErrors(
          day,
          locale,
          `${fieldName}[${index}]`
        )
        if (result.error) {
          errors.push(result.error)
        } else if (result.value) {
          normalized.push(result.value)
        }
      })
      return { value: normalized.length > 0 ? normalized : null, errors }
    } else {
      const error: CalendarError = {
        type: 'normalization',
        field: fieldName,
        value,
        message: `Invalid multi format: expected array of date objects`
      }
      if (isDevelopment) {
        console.warn(`[react-calendar-datetime-picker] ${error.message}`, value)
      }
      errors.push(error)
    }
    return { value: null, errors }
  }

  return { value: null, errors }
}

/**
 * Normalize initial value based on calendar type (backward compatible)
 * @deprecated Use normalizeInitValueWithErrors for error information
 */
export function normalizeInitValue(
  value: unknown,
  locale: CalendarLocale,
  type: CalendarType
): Day | Range | Multi | Week | null {
  return normalizeInitValueWithErrors(value, locale, type).value
}

/**
 * Extract month from a value for display purposes
 */
export function extractMonthFromValue(
  value: Day | Range | Multi | Week | null
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
