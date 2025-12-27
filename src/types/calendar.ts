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
export type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr' | 'ko'

/**
 * Locales that use Persian numerals (۰-۹)
 * These numerals are also known as Eastern Arabic numerals or Indo-Arabic numerals
 */
export const persianArabicNumbers: CalendarUILocale[] = ['fa']

/**
 * Locales that use Latin numerals (0-9)
 */
export const latinNumbers: CalendarUILocale[] = ['en', 'de', 'es', 'fr', 'ko']

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
 * Unified validation result interface for consistent error handling across utilities
 * @template T The type of the validated data
 */
export interface ValidationResult<T> {
  /** Whether validation succeeded */
  success: boolean
  /** Validated data (only present if success is true) */
  data?: T
  /** Error information (only present if success is false) */
  error?: {
    /** Error code for programmatic handling */
    code: string
    /** Human-readable error message */
    message: string
    /** Additional error details */
    details?: unknown
  }
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
  /** Calendar trigger icon (for DtPicker only) */
  calendar?: React.ComponentType<{ className?: string }>
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
   * First day of the week (0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday)
   * If not provided, defaults based on calendar system:
   * - Gregorian: Sunday (0)
   * - Jalali: Saturday (6)
   * @default undefined (auto-determined by calendar system)
   */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6
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
   * Custom format string for displaying the date and time.
   *
   * The format string allows you to customize how the selected date is rendered in the input.
   * Any characters not matching the tokens below will be rendered as-is.
   *
   * **Important:** The format string must include at least one date token (YYYY, MM, or DD).
   * Time-only formats like "HH:mm" are not supported because the calendar always requires a date.
   *
   * **Available Tokens:**
   *
   * | Token | Description | Example |
   * |-------|-------------|---------|
   * | `YYYY` | 4-digit year | 2025 |
   * | `MM`   | 2-digit month | 01, 12 |
   * | `DD`   | 2-digit day | 05, 31 |
   * | `HH`   | 24-hour clock (00-23) | 14, 00 |
   * | `hh`   | 12-hour clock (01-12) | 02, 12 |
   * | `mm`   | Minutes | 05, 59 |
   * | `A`    | Uppercase AM/PM | AM, PM |
   * | `a`    | Lowercase am/pm | am, pm |
   *
   * @example
   * // Standard Date
   * dateFormat="DD/MM/YYYY" // "25/12/2025"
   *
   * @example
   * // Date with Time (24h) - requires withTime={true}
   * dateFormat="YYYY-MM-DD HH:mm" // "2025-12-25 14:30"
   *
   * @example
   * // Date with Time (12h) - requires withTime={true}
   * dateFormat="MM/DD/YYYY hh:mm A" // "12/25/2025 02:30 PM"
   *
   * @example
   * // withTime={true}
   * dateFormat="YYYY-MM-DD HH:mm" // "2025-12-09 14:30"
   *
   * @example
   * // withTime={false} (Time tokens are ignored)
   * dateFormat="YYYY-MM-DD HH:mm" // "2025-12-09"
   *
   * @example
   * // Custom Separators & Text
   * dateFormat="Year: YYYY, Month: MM" // "Year: 2025, Month: 12"
   *
   * @example
   * // ❌ Time-only formats are NOT supported (requires date tokens)
   * // dateFormat="HH:mm" // This will not work - date tokens are required
   *
   * @default undefined (Renders as "YYYY/MM/DD")
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
   * Enlarge selected day text in the calendar grid
   * @default true
   */
  enlargeSelectedDay?: boolean
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
  /**
   * Callback function called when normalization or constraint errors occur
   * @param errors - Array of error objects describing what failed
   */
  onError?: (errors: CalendarError[]) => void
}

/**
 * Shared prop interfaces for calendar type selection logic
 * These define strict typings for onChange based on the 'type' prop
 */

/**
 * Range of JavaScript Date objects (always Gregorian)
 */
export interface RangeDate {
  from: Date | null
  to: Date | null
}

export interface CalendarSelectionSingle {
  type?: 'single'
  /**
   * Callback function called when date changes
   * @param normalizedValue - Internal Day object (maintains calendar system integrity)
   * @param jsDateValue - Native JavaScript Date object (always Gregorian)
   * @param formattedString - Formatted string based on dateFormat prop
   */
  onChange(
    normalizedValue: Day | null,
    jsDateValue?: Date | null,
    formattedString?: string | null
  ): void
}

export interface CalendarSelectionRange {
  type: 'range'
  /**
   * Callback function called when date changes
   * @param normalizedValue - Internal Range object (maintains calendar system integrity)
   * @param jsDateValue - Range of JavaScript Date objects (always Gregorian)
   * @param formattedString - Formatted range string (e.g., "From X to Y")
   */
  onChange(
    normalizedValue: Range | null,
    jsDateValue?: RangeDate | null,
    formattedString?: string | null
  ): void
}

export interface CalendarSelectionMulti {
  type: 'multi'
  /**
   * Callback function called when date changes
   * @param normalizedValue - Internal Multi object (array of Day objects)
   * @param jsDateValue - Array of JavaScript Date objects (always Gregorian)
   * @param formattedString - Formatted string (e.g., "3 dates selected")
   */
  onChange(
    normalizedValue: Multi | null,
    jsDateValue?: Date[] | null,
    formattedString?: string | null
  ): void
}

export interface CalendarSelectionWeek {
  type: 'week'
  /**
   * Callback function called when date changes
   * @param normalizedValue - Internal Range object (week is represented as Range)
   * @param jsDateValue - Range of JavaScript Date objects (always Gregorian)
   * @param formattedString - Formatted range string (e.g., "From X to Y")
   */
  onChange(
    normalizedValue: Range | null,
    jsDateValue: RangeDate | null,
    formattedString: string | null
  ): void
}
