/**
 * Time manipulation helpers
 */

import type { Day } from '../../../types'

/**
 * Add system time to a day if withTime is enabled and time is missing
 */
export function addSystemTimeIfNeeded(day: Day, withTime: boolean): Day {
  if (withTime && (day.hour === undefined || day.minute === undefined)) {
    const now = new Date()
    return {
      ...day,
      hour: now.getHours(),
      minute: now.getMinutes()
    }
  }
  return day
}

/**
 * Add system time to both from and to in a range if needed
 */
export function addSystemTimeToRange(
  range: { from: Day; to: Day | null },
  withTime: boolean
): { from: Day; to: Day | null } {
  return {
    from: addSystemTimeIfNeeded(range.from, withTime),
    to: range.to ? addSystemTimeIfNeeded(range.to, withTime) : null
  }
}
