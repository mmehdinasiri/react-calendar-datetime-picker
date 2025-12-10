/**
 * Navigation reducer
 * Handles navigation actions (NAVIGATE_MONTH, SET_VIEW, SELECT_MONTH, SELECT_YEAR, GO_TO_TODAY, SET_DISPLAY_MONTH)
 */

import type {
  CalendarState,
  CalendarAction,
  ReducerContext,
  ReducerResult
} from '../types'
import { getToday } from '../../../utils/date-conversion'

/**
 * Navigate to next/previous month
 */
function navigateMonth(
  currentMonth: { year: number; month: number },
  direction: 'prev' | 'next'
): { year: number; month: number; day: number } {
  let newMonth = currentMonth.month + (direction === 'next' ? 1 : -1)
  let newYear = currentMonth.year

  if (newMonth > 12) {
    newMonth = 1
    newYear++
  } else if (newMonth < 1) {
    newMonth = 12
    newYear--
  }

  return { year: newYear, month: newMonth, day: 1 }
}

export function navigationReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): ReducerResult | null {
  switch (action.type) {
    case 'NAVIGATE_MONTH': {
      return {
        state: {
          displayMonth: navigateMonth(state.displayMonth, action.payload)
        }
      }
    }

    case 'SET_VIEW': {
      return {
        state: {
          currentView: action.payload
        }
      }
    }

    case 'SELECT_MONTH': {
      return {
        state: {
          displayMonth: {
            ...state.displayMonth,
            month: action.payload,
            day: 1
          },
          currentView: 'calendar'
        }
      }
    }

    case 'SELECT_YEAR': {
      return {
        state: {
          displayMonth: {
            ...state.displayMonth,
            year: action.payload,
            day: 1
          },
          currentView: 'months'
        }
      }
    }

    case 'GO_TO_TODAY': {
      const today = getToday(context.calendarSystem)
      return {
        state: {
          displayMonth: { year: today.year, month: today.month, day: 1 },
          currentView: 'calendar'
        }
      }
    }

    case 'SET_DISPLAY_MONTH': {
      return {
        state: {
          displayMonth: action.payload
        }
      }
    }

    default:
      return null
  }
}
