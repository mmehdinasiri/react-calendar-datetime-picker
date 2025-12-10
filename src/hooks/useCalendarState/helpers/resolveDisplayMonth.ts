/**
 * Display month resolution helper
 * Extracts display month logic into one helper
 */

import type { Day, Range, Multi, Week, CalendarLocale } from '../../../types'
import { extractMonthFromValue } from '../../../utils/normalize'
import { getMonthsToDisplay } from '../../../utils/calendar-grid'

/**
 * Resolve the display month based on the new value and current state
 */
export function resolveDisplayMonth(
  prevDisplay: Day,
  newValue: Day | Range | Multi | Week | null,
  numberOfMonths: number,
  calendarSystem: CalendarLocale,
  type: 'single' | 'range' | 'multi' | 'week',
  currentRange?: Range | null
): Day {
  const monthFromValue = extractMonthFromValue(newValue)
  if (!monthFromValue) return prevDisplay

  // For range type, only navigate if starting a new range
  if (type === 'range') {
    if (currentRange && currentRange.from && !currentRange.to) {
      // Keep current displayMonth when selecting end date
      return prevDisplay
    }
  }

  // Check if the month is already visible in multi-month view
  if (numberOfMonths > 1) {
    const visibleMonths = getMonthsToDisplay(
      prevDisplay,
      numberOfMonths,
      calendarSystem
    )
    const isMonthVisible = visibleMonths.some(
      (m) => m.year === monthFromValue.year && m.month === monthFromValue.month
    )
    if (isMonthVisible) {
      // Keep current displayMonth if the selected month is already visible
      return prevDisplay
    }
  }

  return monthFromValue
}
