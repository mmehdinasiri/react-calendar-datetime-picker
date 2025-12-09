/**
 * Week selection reducer
 * Handles SELECT_WEEK action
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import type { Week } from '../../../types'
import { getWeekBounds } from '../../../utils/calendar-grid'
import { addSystemTimeIfNeeded } from '../helpers/time'
import { resolveDisplayMonth } from '../helpers/resolveDisplayMonth'

export function weekReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  if (context.type !== 'week') {
    return null
  }

  // Handle both SELECT_WEEK and SELECT_DATE for week type
  if (action.type === 'SELECT_WEEK' || action.type === 'SELECT_DATE') {
    const dayToUse = action.payload

    // Calculate week bounds for the selected day
    const weekBounds = getWeekBounds(
      dayToUse,
      context.calendarSystem,
      context.weekStart
    )
    const newValue: Week = {
      from: addSystemTimeIfNeeded(weekBounds.from, context.withTime),
      to: addSystemTimeIfNeeded(weekBounds.to, context.withTime)
    }

    const newDisplayMonth = resolveDisplayMonth(
      state.displayMonth,
      newValue,
      context.numberOfMonths,
      context.calendarSystem,
      'week'
    )

    return {
      state: {
        selectedValue: newValue,
        displayMonth: newDisplayMonth,
        currentView: 'calendar'
      },
      emittedValue: newValue
    }
  }

  return null
}
