/**
 * Multi date selection reducer
 * Handles TOGGLE_MULTI_DATE action
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import type { Multi } from '../../../types'
import { isSameDay } from '../../../utils/date-comparison'

export function multiReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  if (context.type !== 'multi') {
    return null
  }

  // Handle both SELECT_DATE and TOGGLE_MULTI_DATE for multi type
  if (action.type === 'SELECT_DATE' || action.type === 'TOGGLE_MULTI_DATE') {
    const currentMulti = (state.selectedValue as Multi) || []
    const isSelected = currentMulti.some((day) =>
      isSameDay(day, action.payload, context.calendarSystem)
    )

    let newValue: Multi
    if (isSelected) {
      // Remove from selection
      newValue = currentMulti.filter(
        (day) => !isSameDay(day, action.payload, context.calendarSystem)
      )
    } else {
      // Add to selection
      newValue = [...currentMulti, action.payload]
    }

    return {
      state: {
        selectedValue: newValue
      },
      emittedValue: newValue
    }
  }

  return null
}
