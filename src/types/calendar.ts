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
 * Calendar list style for year/month views
 * - 'grid': Display as grid
 * - 'list': Display as list
 */
export type CalendarListStyle = 'grid' | 'list'

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
 * Calendar system
 * - 'gregorian': Gregorian calendar
 * - 'jalali': Jalali (Persian) calendar
 */
export type CalendarLocale = 'gregorian' | 'jalali'

/**
 * Calendar system input (accepts shorthand aliases)
 * - 'gregorian' or 'ge': Gregorian calendar
 * - 'jalali' or 'ja': Jalali (Persian) calendar
 */
export type CalendarSystem = 'gregorian' | 'jalali' | 'ge' | 'ja'

/**
 * Supported UI locales for internationalization
 */
export type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'

/**
 * Locales that use Persian numerals (۰-۹)
 * These numerals are also known as Eastern Arabic numerals or Indo-Arabic numerals
 */
export const persianArabicNumbers: CalendarUILocale[] = ['fa']

/**
 * Locales that use Latin numerals (0-9)
 */
export const latinNumbers: CalendarUILocale[] = ['en', 'de', 'es', 'fr']

/**
 * Translation object containing all text strings for a locale
 */
export interface CalendarTranslations {
  /** Month names (12 elements, index 0-11 for months 1-12) */
  months: string[]
  /** Weekday names (7 elements, starting from first day of week) */
  weekdays: string[]
  /** Text direction */
  direction: 'ltr' | 'rtl'
  /** Number system - automatically determined from locale */
  numbers: 'latin' | 'persian'
  /** Common labels */
  labels: {
    /** Today button text */
    today: string
    /** Clear button text - aria-label (accessibility only) - DtPicker only */
    clear: string
    /** OK/Confirm button text */
    ok: string
    /** Next month button title */
    nextMonth: string
    /** Previous month button title */
    previousMonth: string
    /** Month selection view label */
    selectMonth: string
    /** Year selection view label */
    selectYear: string
    /** Input field from label (for date range display in DtPicker) */
    from: string
    /** Input field to label (for date range display in DtPicker) */
    to: string
    /** Time selector from label (for time input in range selection) */
    timeFrom: string
    /** Time selector to label (for time input in range selection) */
    timeTo: string
    /** AM indicator */
    am: string
    /** PM indicator */
    pm: string
  }
  /** Preset range labels */
  presetRanges: {
    yesterday: string
    last7days: string
    last30days: string
    thisMonth: string
    lastMonth: string
  }
}

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
  /** Show yesterday button */
  yesterday?: boolean
  /** Show last 7 days button */
  last7days?: boolean
  /** Show last 30 days button */
  last30days?: boolean
  /** Show this month button */
  thisMonth?: boolean
  /** Show last month button */
  lastMonth?: boolean
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
  /** Custom translations - overrides default translations for the selected locale */
  translations?: Partial<CalendarTranslations>
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
   * Calendar system: 'gregorian' (Gregorian) or 'jalali' (Jalali)
   * Also accepts shorthand aliases: 'ge' for 'gregorian', 'ja' for 'jalali'
   * @default 'gregorian'
   */
  calendarSystem?: CalendarSystem
  /**
   * Locale for internationalization
   * Controls language, text direction, and number system
   * Number system is automatically determined from locale:
   * - Persian numbers (fa, ar): use Persian numerals (۰-۹)
   * - Latin numbers (en, de, es, fr): use Latin numerals (0-9)
   * For jalali calendar, default locale is 'fa' (Persian numbers)
   * For gregorian calendar, default locale is 'en' (Latin numbers)
   * @default 'en'
   */
  locale?: CalendarUILocale
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
   * Accepts Day objects, Date objects, date strings, timestamps, or timestamps
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
  /**
   * Year list style
   * @default 'grid'
   */
  yearListStyle?: CalendarListStyle
  /**
   * Enable dark theme
   * @default false
   */
  dark?: boolean
  /**
   * Callback when date is selected
   */
  onDateSelect?: (day: Day) => void
  /**
   * Callback when month is selected (in month view)
   */
  onMonthSelect?: (month: number) => void
  /**
   * Callback when year is selected (in year view)
   */
  onYearSelect?: (year: number) => void
  /**
   * Callback when view changes (calendar, months, years)
   */
  onViewChange?: (view: 'calendar' | 'months' | 'years') => void
  /**
   * Callback when navigating months
   */
  onMonthNavigate?: (direction: 'prev' | 'next') => void
  /**
   * Callback to navigate to today's date
   */
  onGoToToday?: () => void
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
