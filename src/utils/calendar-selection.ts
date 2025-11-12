/**
 * Calendar selection utilities
 * Helper functions for determining selection state
 */

import type { Day, Range, Multi, CalendarType } from '../types'
import { compareDays } from './validation'

/**
 * Check if a day is selected based on selection type
 */
export function isDaySelected(
  day: Day,
  selectedValue: Day | Range | Multi | null,
  type: CalendarType
): boolean {
  if (!selectedValue) return false

  if (type === 'single') {
    const selected = selectedValue as Day
    return (
      day.year === selected.year &&
      day.month === selected.month &&
      day.day === selected.day
    )
  }

  if (type === 'range') {
    const range = selectedValue as Range
    if (!range.from || !range.to) return false
    const dayCompare = compareDays(day, range.from, 'en')
    const toCompare = compareDays(day, range.to, 'en')
    return dayCompare >= 0 && toCompare <= 0
  }

  if (type === 'multi') {
    const multi = selectedValue as Multi
    return multi.some(
      (selectedDay) =>
        day.year === selectedDay.year &&
        day.month === selectedDay.month &&
        day.day === selectedDay.day
    )
  }

  return false
}

/**
 * Check if a day is in range selection (for range type)
 * Returns true if day is between from and to (exclusive of boundaries for styling)
 */
export function isDayInRange(
  day: Day,
  selectedValue: Day | Range | Multi | null,
  type: CalendarType
): boolean {
  if (type !== 'range' || !selectedValue) return false
  const range = selectedValue as Range
  if (!range.from || !range.to) return false

  const dayCompare = compareDays(day, range.from, 'en')
  const toCompare = compareDays(day, range.to, 'en')

  // Day is between from and to (exclusive of boundaries for styling)
  return dayCompare > 0 && toCompare < 0
}

/**
 * Check if a day is the start of a range selection
 */
export function isRangeStart(
  day: Day,
  selectedValue: Day | Range | Multi | null,
  type: CalendarType
): boolean {
  if (type !== 'range' || !selectedValue) return false
  const range = selectedValue as Range
  if (!range.from) return false

  return (
    day.year === range.from.year &&
    day.month === range.from.month &&
    day.day === range.from.day
  )
}

/**
 * Check if a day is the end of a range selection
 */
export function isRangeEnd(
  day: Day,
  selectedValue: Day | Range | Multi | null,
  type: CalendarType
): boolean {
  if (type !== 'range' || !selectedValue) return false
  const range = selectedValue as Range
  if (!range.to) return false

  return (
    day.year === range.to.year &&
    day.month === range.to.month &&
    day.day === range.to.day
  )
}

