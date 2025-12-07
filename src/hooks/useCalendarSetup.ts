import { useMemo } from 'react'
import type {
  CalendarTranslations,
  CalendarUILocale,
  SharedCalendarProps
} from '../types/calendar'
import { normalizeCalendarSystem } from '../utils/date-conversion'
import {
  getTranslations,
  mergeTranslations,
  getEffectiveLocale
} from '../utils/translations'

/**
 * Result from useCalendarSetup hook
 */
export interface CalendarSetupResult {
  /** Normalized calendar system: 'gregorian' or 'jalali' */
  normalizedCalendarSystem: 'gregorian' | 'jalali'
  /** Effective locale based on calendar system and user locale */
  effectiveLocale: CalendarUILocale
  /** Merged translations with custom overrides */
  translations: CalendarTranslations
  /** Effective week start day (0-6) */
  effectiveWeekStart: number
}

/**
 * Setup hook for calendar components
 *
 * Consolidates all calendar configuration logic:
 * - Calendar system normalization (handles 'ge'/'ja' aliases)
 * - Effective locale determination based on calendar system
 * - Translation management (get + merge with customizations)
 * - Week start calculation (with smart defaults)
 *
 * This hook prevents duplication between DtCalendar and DtPicker components.
 *
 * @param calendarSystem - Calendar system ('gregorian', 'jalali', 'ge', 'ja')
 * @param locale - User's desired locale
 * @param weekStart - Optional override for week start day (0-6)
 * @param customization - Customization object including custom translations
 * @returns Calendar setup result with normalized values
 *
 * @example
 * ```tsx
 * const { normalizedCalendarSystem, translations, effectiveWeekStart } = useCalendarSetup(
 *   'jalali',
 *   'en',
 *   undefined,
 *   customization
 * )
 * ```
 */
export function useCalendarSetup(
  calendarSystem: 'gregorian' | 'jalali' | 'ge' | 'ja' = 'gregorian',
  locale?: CalendarUILocale,
  weekStart?: number,
  customization?: SharedCalendarProps['customization']
): CalendarSetupResult {
  // Normalize calendarSystem input (handles 'ge'/'ja' aliases)
  const normalizedCalendarSystem = useMemo(
    () => normalizeCalendarSystem(calendarSystem),
    [calendarSystem]
  )

  // Determine effective locale based on calendar system
  const effectiveLocale = useMemo(
    () => getEffectiveLocale(locale, normalizedCalendarSystem),
    [locale, normalizedCalendarSystem]
  )

  // Get translations for the locale
  const defaultTranslations = useMemo(
    () => getTranslations(effectiveLocale),
    [effectiveLocale]
  )

  // Merge with custom translations from customization
  // Pass calendarSystem to ensure month names come from calendar system
  const translations = useMemo(() => {
    return mergeTranslations(
      defaultTranslations,
      customization?.translations,
      effectiveLocale,
      normalizedCalendarSystem
    )
  }, [
    defaultTranslations,
    customization?.translations,
    effectiveLocale,
    normalizedCalendarSystem
  ])

  // Auto-determine weekStart with smart defaults
  // If calendarSystem is 'jalali' and locale is 'en', use Saturday (6)
  // Otherwise use provided weekStart or default based on calendar system
  const effectiveWeekStart = useMemo(() => {
    if (weekStart !== undefined) {
      return weekStart
    }
    // For Jalali calendar with English locale, use Saturday (6) as week start
    if (normalizedCalendarSystem === 'jalali' && effectiveLocale === 'en') {
      return 6
    }
    // Default: Gregorian uses Sunday (0), Jalali uses Saturday (6)
    return normalizedCalendarSystem === 'jalali' ? 6 : 0
  }, [weekStart, normalizedCalendarSystem, effectiveLocale])

  return {
    normalizedCalendarSystem,
    effectiveLocale,
    translations,
    effectiveWeekStart
  }
}
