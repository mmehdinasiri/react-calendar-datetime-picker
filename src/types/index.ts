/**
 * Core types for the calendar library
 */

/**
 * Time representation
 */
export interface Time {
  /** Hour (0-23) */
  hour: number
  /** Minute (0-59) */
  minute: number
}

/**
 * Time range representation
 */
export interface TimeRange {
  /** Start time */
  from: Time
  /** End time */
  to: Time
}

/**
 * Day representation
 */
export interface Day {
  /** Year */
  year: number
  /** Month (1-12) */
  month: number
  /** Day of month (1-31) */
  day: number
  /** Full day string representation (optional) */
  fullDay?: string
  /** Hour (optional, for datetime) */
  hour?: number
  /** Minute (optional, for datetime) */
  minute?: number
}

/**
 * Date range representation
 */
export interface Range {
  /** Start date */
  from: Day
  /** End date */
  to: Day
}

/**
 * Multiple dates representation
 */
export type Multi = Day[]

/**
 * Week representation (start and end of week)
 */
export interface Week {
  /** Start date of the week */
  from: Day
  /** End date of the week */
  to: Day
}

/**
 * Calendar list style for year/month views
 * - 'grid': Display as grid
 * - 'list': Display as list
 */
export type CalendarListStyle = 'grid' | 'list'

// Re-export calendar types
export type {
  DateInput,
  InitValueInput,
  CalendarLocale,
  CalendarSystem,
  CalendarUILocale,
  CalendarType,
  CalendarConstraints,
  CalendarConstraintsInput,
  CalendarError,
  NormalizationResult,
  CalendarClasses,
  CalendarIcons,
  CalendarLabels,
  CalendarCustomization,
  CalendarTranslations,
  SharedCalendarProps,
  CalendarSelectionSingle,
  CalendarSelectionRange,
  CalendarSelectionMulti,
  CalendarSelectionWeek
} from './calendar'
