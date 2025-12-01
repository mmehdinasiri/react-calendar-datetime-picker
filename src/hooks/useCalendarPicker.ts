import { useMemo } from 'react'
import type {
  CalendarLocale,
  CalendarType,
  InitValueInput,
  Range
} from '../types'
import type { CalendarConstraintsInput } from '../types/calendar'
import { normalizeInitValueWithErrors } from '../utils/normalize'
import { normalizeConstraintsProps } from '../utils/constraints'
import { formatDateForInput } from '../utils/formatting'
import { useCalendarState } from './useCalendarState'

/**
 * Hook that encapsulates calendar logic shared between DtPicker and DtCalendar
 * Handles normalization, state management, and formatting
 */
export function useCalendarPicker(
  initValue: InitValueInput | undefined,
  onChange: (date: unknown) => void,
  type: CalendarType,
  local: CalendarLocale,
  withTime: boolean,
  constraintsInput: CalendarConstraintsInput | undefined,
  showTimeInput: boolean,
  autoClose?: boolean,
  onClose?: () => void,
  dateFormat?: string,
  timeFormat: '12' | '24' = '24'
) {
  // Normalize constraints props
  const constraintsResult = useMemo(
    () => normalizeConstraintsProps(constraintsInput, local, type),
    [constraintsInput, local, type]
  )
  const { constraints } = constraintsResult

  // Normalize initValue
  const initValueResult = useMemo(
    () => normalizeInitValueWithErrors(initValue, local, type, 'initValue'),
    [initValue, local, type]
  )
  const { value: normalizedInitValue } = initValueResult

  // Use calendar state hook
  const { state, actions } = useCalendarState({
    initValue: normalizedInitValue,
    locale: local,
    type,
    onChange: (date: unknown) => {
      onChange(date)
      // Auto-close modal after selection if enabled
      if (autoClose && onClose) {
        if (type === 'single' || type === 'week') {
          onClose()
        } else if (
          type === 'range' &&
          (date as Range).from &&
          (date as Range).to
        ) {
          onClose()
        }
      }
    },
    withTime
  })

  // Format display value for input (use state.selectedValue from calendar)
  const displayValue = useMemo(() => {
    return formatDateForInput(
      state.selectedValue,
      local,
      type,
      showTimeInput && withTime,
      'from',
      'to',
      dateFormat,
      timeFormat
    )
  }, [
    state.selectedValue,
    local,
    type,
    showTimeInput,
    withTime,
    dateFormat,
    timeFormat
  ])

  return {
    state,
    actions,
    constraints,
    displayValue
  }
}
