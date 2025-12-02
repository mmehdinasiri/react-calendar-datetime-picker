/**
 * Calendar component types
 */

import type React from 'react'
import type { Day, Range, Multi } from './index'

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
 * Calendar locale
 * - 'en': Gregorian calendar
 * - 'fa': Jalali (Persian) calendar
 */
export type CalendarLocale = 'en' | 'fa'

/**
 * Calendar selection type
 * - 'single': Select a single date
 * - 'range': Select a date range
 * - 'multi': Select multiple dates
 * - 'week': Select an entire week
 */
export type CalendarType = 'single' | 'range' | 'multi' | 'week'

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
  /** Custom function to check if a date should be disabled */
  isDateDisabled?: (date: Day) => boolean
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
  /** Custom function to check if a date should be disabled */
  isDateDisabled?: (date: Day) => boolean
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

export interface CustomPresetRange {
  /** Label for the custom preset button */
  label: string
  /** Date range for the preset */
  range: Range
}

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
  /** Custom preset ranges (completely custom ranges with custom labels) */
  custom?: CustomPresetRange[]
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
  /** Month names array (12 elements, index 0-11 for months 1-12) - overrides default month names */
  monthNames?: string[]
  /** Weekday names array (7 elements, starting from first day of week) - overrides default weekday names */
  weekdayNames?: string[]
}

/**
 * Shared properties for both DtPicker and DtCalendar
 */
export interface SharedCalendarProps {
  /**
   * Initial value for the calendar
   * Accepts Day objects, Date objects, date strings, timestamps, or range/multi formats
   */
  initValue?: InitValueInput
  /**
   * Enable time selection
   * @default false
   */
  withTime?: boolean
  /**
   * Time format: '12' for 12-hour format, '24' for 24-hour format
   * Only applies when withTime is true
   * @default '24'
   */
  timeFormat?: '12' | '24'
  /**
   * Calendar locale: 'en' (Gregorian) or 'fa' (Jalali)
   * @default 'en'
   */
  local?: CalendarLocale
  /**
   * Show weekend highlighting
   * @default false
   */
  showWeekend?: boolean
  /**
   * Show today button
   * @default false
   */
  todayBtn?: boolean
  /**
   * Preset range buttons configuration
   * Only works with type='range' or type='week'
   */
  presetRanges?: PresetRangesConfig
  /**
   * Date constraints (maxDate, minDate, disabledDates)
   * Accepts Day objects, Date objects, date strings, or timestamps
   */
  constraints?: CalendarConstraintsInput
  /**
   * Custom CSS class for calendar modal
   */
  calenderModalClass?: string
  /**
   * Customization options (classes, icons, labels)
   */
  customization?: CalendarCustomization
  /**
   * Custom date format string
   * Supports tokens: YYYY (year), MM (month), DD (day)
   * Supports custom separators and order
   * Examples: "DD/MM/YYYY", "MM-DD-YYYY", "YYYY년 MM월 DD일"
   * @default undefined (uses default format: YYYY/MM/DD)
   */
  dateFormat?: string
  /**
   * Number of months to display side by side
   * Particularly useful for range selection
   * @default 1
   */
  numberOfMonths?: 1 | 2 | 3
}

/**
 * Shared prop interfaces for calendar type selection logic
 * These define strict typings for onChange based on the 'type' prop
 */

export interface CalendarSelectionSingle {
  type?: 'single'
  /**
   * Callback function called when date changes
   * Receives Day | null for single date selection
   */
  onChange: (date: Day | null) => void
}

export interface CalendarSelectionRange {
  type: 'range'
  /**
   * Callback function called when date changes
   * Receives Range | null for range selection
   */
  onChange: (date: Range | null) => void
}

export interface CalendarSelectionMulti {
  type: 'multi'
  /**
   * Callback function called when date changes
   * Receives Multi | null for multi selection
   */
  onChange: (date: Multi | null) => void
}

export interface CalendarSelectionWeek {
  type: 'week'
  /**
   * Callback function called when date changes
   * Receives Range | null for week selection (week is represented as Range)
   */
  onChange: (date: Range | null) => void
}
