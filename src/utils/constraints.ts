/**
 * Constraints normalization utilities
 *
 * This module provides utilities for normalizing calendar constraint inputs
 * from various formats (Date objects, strings, timestamps, Day objects) into
 * a consistent internal format (Day objects).
 *
 * Shared between DtPicker and DtCalendar components to ensure consistent
 * constraint handling across the library.
 */

import type { CalendarLocale, CalendarType, Day } from '../types'
import type {
  CalendarConstraintsInput,
  CalendarConstraints,
  CalendarError
} from '../types/calendar'
import { normalizeInitValueWithErrors } from './normalize'

/**
 * Normalize constraints props from flexible DateInput formats to Day/Day[] objects
 *
 * This function converts user-provided constraint inputs (which can be in various
 * formats like Date objects, date strings, timestamps, or Day objects) into
 * normalized Day objects that the calendar components can use internally.
 *
 * The function also collects any normalization errors that occur during the
 * conversion process, allowing the calling component to handle them appropriately
 * (e.g., via the onError callback).
 *
 * @param constraintsInput - User-provided constraints in flexible formats.
 *   Can be undefined if no constraints are provided.
 *   - maxDate: Maximum selectable date (Date, string, timestamp, or Day)
 *   - minDate: Minimum selectable date (Date, string, timestamp, or Day)
 *   - disabledDates: Array of disabled dates (Date[], string[], number[], or Day[])
 *   - isDateDisabled: Callback function to check if a date should be disabled
 * @param locale - Calendar locale ('gregorian' for Gregorian, 'jalali' for Jalali).
 *   Used for proper date conversion and validation.
 * @param _type - Calendar selection type (single, range, multi, week).
 *   Currently not used but kept for API consistency and future extensibility.
 *
 * @returns An object containing:
 *   - constraints: Normalized constraints object with Day objects.
 *     Invalid dates are excluded from the result.
 *   - errors: Array of CalendarError objects describing any normalization failures.
 *     Each error includes the field name, error type, and message.
 *
 * @example
 * ```typescript
 * // Normalize constraints with various input formats
 * const result = normalizeConstraintsProps(
 *   {
 *     maxDate: new Date(2023, 11, 31),
 *     minDate: "2023-01-01",
 *     disabledDates: [1672531200000, { year: 2023, month: 1, day: 15 }],
 *     isDateDisabled: (date) => date.day === 1
 *   },
 *   'gregorian',
 *   'single'
 * )
 *
 * // Result:
 * // {
 * //   constraints: {
 * //     maxDate: { year: 2023, month: 12, day: 31 },
 * //     minDate: { year: 2023, month: 1, day: 1 },
 * //     disabledDates: [
 * //       { year: 2023, month: 1, day: 1 },
 * //       { year: 2023, month: 1, day: 15 }
 * //     ],
 * //     isDateDisabled: [Function]
 * //   },
 * //   errors: []
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Handle invalid dates gracefully
 * const result = normalizeConstraintsProps(
 *   {
 *     maxDate: { year: 2023, month: 13, day: 1 }, // Invalid month
 *     minDate: "invalid-date-string"
 *   },
 *   'gregorian',
 *   'single'
 * )
 *
 * // Result:
 * // {
 * //   constraints: {}, // Invalid dates excluded
 * //   errors: [
 * //     { type: 'validation', field: 'constraints.maxDate', ... },
 * //     { type: 'normalization', field: 'constraints.minDate', ... }
 * //   ]
 * // }
 * ```
 */
export function normalizeConstraintsProps(
  constraintsInput: CalendarConstraintsInput | undefined,
  calendarSystem: CalendarLocale,
  _type: CalendarType
): { constraints: CalendarConstraints; errors: CalendarError[] } {
  // Initialize empty constraints and errors arrays
  // These will be populated as we process each constraint
  const constraints: CalendarConstraints = {}
  const errors: CalendarError[] = []

  // Early return if no constraints provided
  // This is a valid case - components can work without constraints
  if (!constraintsInput) {
    return { constraints, errors }
  }

  // Normalize maxDate constraint
  // maxDate defines the latest date that can be selected
  // Accepts: Date object, date string, timestamp, or Day object
  if (constraintsInput.maxDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.maxDate,
      calendarSystem,
      'single', // Always 'single' since maxDate is a single date
      'constraints.maxDate' // Field name for error reporting
    )

    // Collect any normalization errors
    // Errors are added to the errors array but don't prevent other constraints from being processed
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }

    // Only add to constraints if normalization succeeded
    // Check for 'year' property to ensure it's a valid Day object
    if (result.value && 'year' in result.value) {
      constraints.maxDate = result.value as Day
    }
  }

  // Normalize minDate constraint
  // minDate defines the earliest date that can be selected
  // Accepts: Date object, date string, timestamp, or Day object
  if (constraintsInput.minDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.minDate,
      calendarSystem,
      'single', // Always 'single' since minDate is a single date
      'constraints.minDate' // Field name for error reporting
    )

    // Collect any normalization errors
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }

    // Only add to constraints if normalization succeeded
    if (result.value && 'year' in result.value) {
      constraints.minDate = result.value as Day
    }
  }

  // Normalize disabledDates array
  // disabledDates is an array of specific dates that cannot be selected
  // Each date in the array can be in different formats
  if (
    constraintsInput.disabledDates &&
    constraintsInput.disabledDates.length > 0
  ) {
    const normalizedDates: Day[] = []

    // Process each date in the array individually
    // This allows partial success - valid dates are kept, invalid ones are skipped
    constraintsInput.disabledDates.forEach((date, index) => {
      const result = normalizeInitValueWithErrors(
        date,
        calendarSystem,
        'single', // Each disabled date is a single date
        `constraints.disabledDates[${index}]` // Include index in field name for precise error reporting
      )

      // Collect errors for this specific date
      // The index in the field name helps identify which date failed
      if (result.errors.length > 0) {
        errors.push(...result.errors)
      }

      // Only add valid dates to the normalized array
      // Invalid dates are silently skipped (errors are still reported)
      if (result.value && 'year' in result.value) {
        normalizedDates.push(result.value as Day)
      }
    })

    // Only set disabledDates if at least one date was successfully normalized
    // This prevents setting an empty array when all dates were invalid
    if (normalizedDates.length > 0) {
      constraints.disabledDates = normalizedDates
    }
  }

  // Pass through the isDateDisabled callback function unchanged
  // This is a function that takes a Day and returns boolean
  // No normalization needed - it's already in the correct format
  if (constraintsInput.isDateDisabled) {
    constraints.isDateDisabled = constraintsInput.isDateDisabled
  }

  // Return both normalized constraints and any errors encountered
  // The calling component can use errors to inform the user or handle them programmatically
  return { constraints, errors }
}
