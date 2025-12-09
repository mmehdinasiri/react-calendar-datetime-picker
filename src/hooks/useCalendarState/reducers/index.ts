/**
 * Reducer index
 * Loops through all reducers and returns the first non-null update
 */

import type { CalendarState, CalendarAction, ReducerContext } from '../types'
import type { Day, Range, Multi, Week } from '../../../types'
import { dateSelectionReducer } from './dateSelection'
import { rangeReducer } from './range'
import { weekReducer } from './week'
import { multiReducer } from './multi'
import { timeReducer } from './time'
import { navigationReducer } from './navigation'
import { extractMonthFromValue } from '../../../utils/normalize'

/**
 * Main calendar reducer
 * Tries each domain-specific reducer and returns the first non-null result
 */
export function calendarReducer(
  state: CalendarState,
  action: CalendarAction,
  context: ReducerContext
): { state: CalendarState; emittedValue?: Day | Range | Multi | Week | null } {
  // Try each reducer in order
  const reducers = [
    dateSelectionReducer,
    rangeReducer,
    weekReducer,
    multiReducer,
    timeReducer,
    navigationReducer
  ]

  for (const reducer of reducers) {
    const result = reducer(state, action, context)
    if (result) {
      const newState = {
        ...state,
        ...result.state
      }
      return {
        state: newState,
        emittedValue: result.emittedValue
      }
    }
  }

  // Handle CLEAR_SELECTION
  if (action.type === 'CLEAR_SELECTION') {
    return {
      state: {
        ...state,
        selectedValue: null
      },
      emittedValue: null
    }
  }

  // Handle SYNC_INIT_VALUE
  if (action.type === 'SYNC_INIT_VALUE') {
    const monthFromValue = extractMonthFromValue(action.payload)
    return {
      state: {
        ...state,
        selectedValue: action.payload,
        displayMonth: monthFromValue || state.displayMonth
      }
    }
  }

  // Default: no change
  return { state }
}
