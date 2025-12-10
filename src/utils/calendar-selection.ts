/**
 * Calendar selection utilities
 * Helper functions for determining selection state
 */

import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarType,
  CalendarLocale
} from '../types'
import { compareDays } from './validation'

/**
 * Check if a day is selected based on selection type
 */
export function isDaySelected(
  day: Day,
  selectedValue: Day | Range | Multi | Week | null,
  type: CalendarType,
  calendarSystem: CalendarLocale = 'gregorian'
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
    const dayCompare = compareDays(day, range.from, calendarSystem)
    const toCompare = compareDays(day, range.to, calendarSystem)
    return dayCompare >= 0 && toCompare <= 0
  }

  if (type === 'week') {
    const week = selectedValue as Week
    if (!week.from || !week.to) return false
    const dayCompare = compareDays(day, week.from, calendarSystem)
    const toCompare = compareDays(day, week.to, calendarSystem)
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
 * Check if a day is in range selection (for range or week type)
 * Returns true if day is between from and to (exclusive of boundaries for styling)
 */
export function isDayInRange(
  day: Day,
  selectedValue: Day | Range | Multi | Week | null,
  type: CalendarType,
  calendarSystem: CalendarLocale = 'gregorian'
): boolean {
  if ((type !== 'range' && type !== 'week') || !selectedValue) return false

  let from: Day | null = null
  let to: Day | null = null

  if (type === 'range') {
    const range = selectedValue as Range
    from = range.from
    to = range.to
  } else if (type === 'week') {
    const week = selectedValue as Week
    from = week.from
    to = week.to
  }

  if (!from || !to) return false

  const dayCompare = compareDays(day, from, calendarSystem)
  const toCompare = compareDays(day, to, calendarSystem)

  // Day is between from and to (exclusive of boundaries for styling)
  return dayCompare > 0 && toCompare < 0
}

/**
 * Check if a day is the start of a range or week selection
 */
export function isRangeStart(
  day: Day,
  selectedValue: Day | Range | Multi | Week | null,
  type: CalendarType
): boolean {
  if ((type !== 'range' && type !== 'week') || !selectedValue) return false

  let from: Day | null = null
  if (type === 'range') {
    const range = selectedValue as Range
    from = range.from
  } else if (type === 'week') {
    const week = selectedValue as Week
    from = week.from
  }

  if (!from) return false

  return (
    day.year === from.year && day.month === from.month && day.day === from.day
  )
}

/**
 * Check if a day is the end of a range or week selection
 */
export function isRangeEnd(
  day: Day,
  selectedValue: Day | Range | Multi | Week | null,
  type: CalendarType
): boolean {
  if ((type !== 'range' && type !== 'week') || !selectedValue) return false

  let to: Day | null = null
  if (type === 'range') {
    const range = selectedValue as Range
    to = range.to
  } else if (type === 'week') {
    const week = selectedValue as Week
    to = week.to
  }

  if (!to) return false

  return day.year === to.year && day.month === to.month && day.day === to.day
}
