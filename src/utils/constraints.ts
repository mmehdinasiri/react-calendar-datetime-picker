/**
 * Constraints normalization utilities
 * Shared between DtPicker and DtCalendar
 */

import type { CalendarLocale, CalendarType, Day } from '../types'
import type {
  CalendarConstraintsInput,
  CalendarConstraints,
  CalendarError
} from '../types/calendar'
import { normalizeInitValueWithErrors } from './normalize'

/**
 * Normalize constraints props from DateInput to Day/Day[]
 * Returns constraints object and errors array
 * Shared utility used by both DtPicker and DtCalendar
 */
export function normalizeConstraintsProps(
  constraintsInput: CalendarConstraintsInput | undefined,
  locale: CalendarLocale,
  _type: CalendarType
): { constraints: CalendarConstraints; errors: CalendarError[] } {
  const constraints: CalendarConstraints = {}
  const errors: CalendarError[] = []

  if (!constraintsInput) {
    return { constraints, errors }
  }

  if (constraintsInput.maxDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.maxDate,
      locale,
      'single',
      'constraints.maxDate'
    )
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }
    if (result.value && 'year' in result.value) {
      constraints.maxDate = result.value as Day
    }
  }

  if (constraintsInput.minDate) {
    const result = normalizeInitValueWithErrors(
      constraintsInput.minDate,
      locale,
      'single',
      'constraints.minDate'
    )
    if (result.errors.length > 0) {
      errors.push(...result.errors)
    }
    if (result.value && 'year' in result.value) {
      constraints.minDate = result.value as Day
    }
  }

  if (
    constraintsInput.disabledDates &&
    constraintsInput.disabledDates.length > 0
  ) {
    const normalizedDates: Day[] = []
    constraintsInput.disabledDates.forEach((date, index) => {
      const result = normalizeInitValueWithErrors(
        date,
        locale,
        'single',
        `constraints.disabledDates[${index}]`
      )
      if (result.errors.length > 0) {
        errors.push(...result.errors)
      }
      if (result.value && 'year' in result.value) {
        normalizedDates.push(result.value as Day)
      }
    })
    if (normalizedDates.length > 0) {
      constraints.disabledDates = normalizedDates
    }
  }

  return { constraints, errors }
}
