/**
 * Utility functions for weekday operations, week start handling, and weekend detection
 * Centralizes logic for calendar systems (Gregorian/Jalali) and week start configurations
 */

import type { CalendarLocale } from '../types'

/**
 * Get the effective first day of the week based on calendar system and user preference
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @param weekStart - Optional explicit week start day (0-6). If not provided, uses calendar system defaults.
 * @returns The first day of the week (0 = Sunday, 6 = Saturday)
 */
export function getEffectiveWeekStart(
  calendarSystem: CalendarLocale,
  weekStart?: number
): number {
  // If weekStart is explicitly provided, use it
  if (weekStart !== undefined) {
    return weekStart
  }
  // Otherwise, default based on calendar system
  // Gregorian: Sunday (0), Jalali: Saturday (6)
  return calendarSystem === 'jalali' ? 6 : 0
}

/**
 * Rotate an array so that the specified start index becomes position 0
 * @param array - The array to rotate
 * @param startIndex - The index that should become the first element
 * @returns The rotated array
 */
export function rotateArray<T>(array: T[], startIndex: number): T[] {
  if (startIndex === 0) {
    return [...array]
  }
  const rotated = [...array]
  const moved = rotated.splice(0, startIndex)
  return [...rotated, ...moved]
}

/**
 * Get the Gregorian day of week (0-6) for a given position in a rotated weekday array
 * @param position - The position in the rotated array (0-6)
 * @param effectiveWeekStart - The effective week start day (0-6)
 * @returns The corresponding Gregorian day of week (0 = Sunday, 6 = Saturday)
 */
export function getGregorianDayOfWeek(
  position: number,
  effectiveWeekStart: number
): number {
  return (effectiveWeekStart + position) % 7
}

/**
 * Check if a Gregorian day of week is considered a weekend for the given calendar system
 * @param gregorianDayOfWeek - Gregorian day of week (0 = Sunday, 6 = Saturday)
 * @param calendarSystem - The calendar system
 * @returns True if the day is a weekend
 */
export function isWeekendDay(
  gregorianDayOfWeek: number,
  calendarSystem: CalendarLocale
): boolean {
  if (calendarSystem === 'jalali') {
    // In Jalali calendar, weekends are Thursday (4) and Friday (5)
    return gregorianDayOfWeek === 4 || gregorianDayOfWeek === 5
  } else {
    // In Gregorian calendar, weekends are Saturday (6) and Sunday (0)
    return gregorianDayOfWeek === 0 || gregorianDayOfWeek === 6
  }
}

/**
 * Get weekend positions in a rotated weekday array
 * @param calendarSystem - The calendar system
 * @param effectiveWeekStart - The effective week start day (0-6)
 * @returns Array of positions (0-6) that are weekends in the rotated array
 */
export function getWeekendPositions(
  calendarSystem: CalendarLocale,
  effectiveWeekStart: number
): number[] {
  const positions: number[] = []
  for (let position = 0; position < 7; position++) {
    const gregorianDay = getGregorianDayOfWeek(position, effectiveWeekStart)
    if (isWeekendDay(gregorianDay, calendarSystem)) {
      positions.push(position)
    }
  }
  return positions
}

/**
 * Rotate weekday names according to week start and calendar system
 * Note: weekdayNames are assumed to be in Gregorian order (Sunday first)
 * @param weekdayNames - The weekday names array in Gregorian order (7 elements)
 * @param calendarSystem - The calendar system
 * @param weekStart - Optional explicit week start day
 * @returns The rotated weekday names array
 */
export function getRotatedWeekdayNames(
  weekdayNames: string[],
  calendarSystem: CalendarLocale,
  weekStart?: number
): string[] {
  const effectiveWeekStart = getEffectiveWeekStart(calendarSystem, weekStart)
  return rotateArray(weekdayNames, effectiveWeekStart)
}

/**
 * Get weekend information for weekday rendering
 * @param calendarSystem - The calendar system
 * @param weekStart - Optional explicit week start day
 * @returns Object with weekend positions and effective week start
 */
export function getWeekendConfig(
  calendarSystem: CalendarLocale,
  weekStart?: number
) {
  const effectiveWeekStart = getEffectiveWeekStart(calendarSystem, weekStart)
  const weekendPositions = getWeekendPositions(
    calendarSystem,
    effectiveWeekStart
  )

  return {
    effectiveWeekStart,
    weekendPositions,
    isWeekend: (position: number) => weekendPositions.includes(position)
  }
}
