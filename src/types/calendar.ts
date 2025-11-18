/**
 * Calendar component types
 */

import type React from 'react'
import type { Day } from './index'

/**
 * Acceptable date input formats that can be normalized
 */
export type DateInput = Day | Date | string | number

/**
 * Initial value input types - accepts various formats that will be normalized
 * For 'single': accepts a single date in any format
 * For 'range': accepts a range object or a single date
 * For 'multi': accepts an array of dates in any format
 */
export type InitValueInput =
  | DateInput
  | { from: DateInput; to: DateInput }
  | DateInput[]
  | null

/**
 * Date constraints for selection (internal, normalized)
 */
export interface CalendarConstraints {
  /** Maximum selectable date */
  maxDate?: Day
  /** Minimum selectable date */
  minDate?: Day
  /** List of disabled dates */
  disabledDates?: Day[]
}

/**
 * Date constraints for selection (user-facing, accepts various formats)
 */
export interface CalendarConstraintsInput {
  /** Maximum selectable date (accepts Day, Date, string, or number) */
  maxDate?: DateInput
  /** Minimum selectable date (accepts Day, Date, string, or number) */
  minDate?: DateInput
  /** List of disabled dates (accepts Day, Date, string, or number) */
  disabledDates?: DateInput[]
}

/**
 * Error information for normalization/constraint failures
 */
export interface CalendarError {
  /** Error type */
  type: 'normalization' | 'validation'
  /** Field that failed (e.g., 'initValue', 'maxDate', 'minDate', 'disabledDates') */
  field: string
  /** Original value that failed */
  value: unknown
  /** Error message */
  message: string
}

/**
 * Result with error information
 */
export interface NormalizationResult<T> {
  /** Normalized value (null if normalization failed) */
  value: T | null
  /** Array of errors encountered during normalization */
  errors: CalendarError[]
}

/**
 * Custom CSS classes for calendar components
 */
export interface CalendarClasses {
  /** Header CSS class */
  header?: string
  /** Days grid CSS class */
  days?: string
  /** Months view CSS class */
  months?: string
  /** Years view CSS class */
  years?: string
}

/**
 * Custom icons for calendar navigation
 */
export interface CalendarIcons {
  /** Next month button icon */
  next?: React.ComponentType<{ className?: string }>
  /** Previous month button icon */
  previous?: React.ComponentType<{ className?: string }>
}

/**
 * Custom labels/text for calendar
 */
export interface CalendarLabels {
  /** Next month button title */
  nextMonth?: string
  /** Previous month button title */
  previousMonth?: string
}

/**
 * Preset range button configuration
 * Each key can be:
 * - `true`: Show button with default label
 * - `string`: Show button with custom label
 * - `undefined` or not present: Don't show button
 * Note: 'today' is excluded as it has its own `todayBtn` prop
 */
export type PresetRangeType =
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth'

export interface PresetRangesConfig {
  /** Show yesterday button with default or custom label */
  yesterday?: boolean | string
  /** Show last 7 days button with default or custom label */
  last7days?: boolean | string
  /** Show last 30 days button with default or custom label */
  last30days?: boolean | string
  /** Show this month button with default or custom label */
  thisMonth?: boolean | string
  /** Show last month button with default or custom label */
  lastMonth?: boolean | string
}

/**
 * Calendar customization options
 */
export interface CalendarCustomization {
  /** Custom CSS classes */
  classes?: CalendarClasses
  /** Custom icons */
  icons?: CalendarIcons
  /** Custom labels */
  labels?: CalendarLabels
}
