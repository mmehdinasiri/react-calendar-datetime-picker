/**
 * Date selection reducer
 * Handles SELECT_DATE action for single date selection
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import { addSystemTimeIfNeeded } from '../helpers/time'
import { resolveDisplayMonth } from '../helpers/resolveDisplayMonth'

export function dateSelectionReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  if (action.type !== 'SELECT_DATE' || context.type !== 'single') {
    return null
  }

  const dayWithTime = addSystemTimeIfNeeded(action.payload, context.withTime)
  const newDisplayMonth = resolveDisplayMonth(
    state.displayMonth,
    dayWithTime,
    context.numberOfMonths,
    context.calendarSystem,
    'single'
  )

  return {
    state: {
      selectedValue: dayWithTime,
      displayMonth: newDisplayMonth,
      currentView: 'calendar'
    },
    emittedValue: dayWithTime
  }
}
