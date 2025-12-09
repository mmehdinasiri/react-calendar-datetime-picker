/**
 * Range selection reducer
 * Handles range selection actions (SELECT_RANGE_START, SELECT_RANGE_END, SELECT_RANGE_DIRECT)
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import type { Range } from '../../../types'
import { addSystemTimeIfNeeded, addSystemTimeToRange } from '../helpers/time'
import { resolveDisplayMonth } from '../helpers/resolveDisplayMonth'
import { isBefore } from '../../../utils/date-comparison'

export function rangeReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  if (context.type !== 'range') {
    return null
  }

  const currentRange = state.selectedValue as Range | null

  switch (action.type) {
    case 'SELECT_RANGE_START': {
      const fromWithTime = addSystemTimeIfNeeded(
        action.payload,
        context.withTime
      )
      const newRange: Range = { from: fromWithTime, to: null }
      return {
        state: {
          selectedValue: newRange,
          displayMonth: {
            year: action.payload.year,
            month: action.payload.month,
            day: 1
          }
        },
        emittedValue: newRange
      }
    }

    case 'SELECT_RANGE_END': {
      if (!currentRange || !currentRange.from) {
        return null
      }

      const toWithTime = addSystemTimeIfNeeded(action.payload, context.withTime)
      const fromWithTime = addSystemTimeIfNeeded(
        currentRange.from,
        context.withTime
      )

      // If selected day is before start date, make it the new start
      let finalRange: Range
      if (isBefore(action.payload, currentRange.from, context.calendarSystem)) {
        finalRange = { from: toWithTime, to: fromWithTime }
      } else {
        finalRange = { from: fromWithTime, to: toWithTime }
      }

      return {
        state: {
          selectedValue: finalRange
        },
        emittedValue: finalRange
      }
    }

    case 'SELECT_RANGE_DIRECT': {
      const newRange = addSystemTimeToRange(action.payload, context.withTime)
      const newDisplayMonth = resolveDisplayMonth(
        state.displayMonth,
        newRange as Range,
        context.numberOfMonths,
        context.calendarSystem,
        'range'
      )

      return {
        state: {
          selectedValue: newRange as Range,
          displayMonth: newDisplayMonth,
          currentView: 'calendar'
        },
        emittedValue: newRange as Range
      }
    }

    case 'SELECT_DATE': {
      // Handle SELECT_DATE for range type
      const dayWithTime = addSystemTimeIfNeeded(
        action.payload,
        context.withTime
      )

      // If no range exists or range is complete, start new range
      if (!currentRange || !currentRange.from || currentRange.to) {
        const newRange: Range = { from: dayWithTime, to: null }
        const newDisplayMonth = resolveDisplayMonth(
          state.displayMonth,
          newRange,
          context.numberOfMonths,
          context.calendarSystem,
          'range',
          newRange
        )

        return {
          state: {
            selectedValue: newRange,
            displayMonth: newDisplayMonth,
            currentView: 'calendar'
          },
          emittedValue: newRange
        }
      }

      // If we have a start date, set end date
      if (currentRange.from) {
        let finalRange: Range
        if (isBefore(dayWithTime, currentRange.from, context.calendarSystem)) {
          finalRange = { from: dayWithTime, to: currentRange.from }
        } else {
          finalRange = { from: currentRange.from, to: dayWithTime }
        }

        // Only update displayMonth when starting a new range, not when completing
        const newDisplayMonth = resolveDisplayMonth(
          state.displayMonth,
          finalRange,
          context.numberOfMonths,
          context.calendarSystem,
          'range',
          currentRange
        )

        return {
          state: {
            selectedValue: finalRange,
            displayMonth: newDisplayMonth,
            currentView: 'calendar'
          },
          emittedValue: finalRange
        }
      }

      return null
    }

    default:
      return null
  }
}
