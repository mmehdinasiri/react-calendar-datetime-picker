/**
 * Time update reducer
 * Handles UPDATE_TIME action
 * All time merging logic is centralized here
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import type { Range, Week } from '../../../types'
import { isSameDay } from '../../../utils/date-comparison'

export function timeReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  if (action.type !== 'UPDATE_TIME') {
    return null
  }

  const { day, hour, minute } = action.payload
  const updatedDay = { ...day, hour, minute }

  if (context.type === 'single') {
    return {
      state: {
        selectedValue: updatedDay
      },
      emittedValue: updatedDay
    }
  }

  if (context.type === 'range') {
    const currentRange = state.selectedValue as Range | null
    if (!currentRange) {
      return null
    }

    const isStartDate =
      currentRange.from &&
      isSameDay(currentRange.from, day, context.calendarSystem)
    const isEndDate =
      currentRange.to && isSameDay(currentRange.to, day, context.calendarSystem)

    if (isStartDate) {
      const newRange: Range = {
        ...currentRange,
        from: updatedDay
      }
      return {
        state: {
          selectedValue: newRange
        },
        emittedValue: newRange
      }
    }

    if (isEndDate) {
      const newRange: Range = {
        ...currentRange,
        to: updatedDay
      }
      return {
        state: {
          selectedValue: newRange
        },
        emittedValue: newRange
      }
    }

    return null
  }

  if (context.type === 'week') {
    const currentWeek = state.selectedValue as Week | null
    if (!currentWeek) {
      return null
    }

    const isStartDate =
      currentWeek.from && isSameDay(currentWeek.from, day, context.calendarSystem)
    const isEndDate =
      currentWeek.to && isSameDay(currentWeek.to, day, context.calendarSystem)

    if (isStartDate) {
      const newWeek: Week = {
        ...currentWeek,
        from: updatedDay
      }
      return {
        state: {
          selectedValue: newWeek
        },
        emittedValue: newWeek
      }
    }

    if (isEndDate) {
      const newWeek: Week = {
        ...currentWeek,
        to: updatedDay
      }
      return {
        state: {
          selectedValue: newWeek
        },
        emittedValue: newWeek
      }
    }

    return null
  }

  // Multi mode doesn't support time selection
  return null
}
