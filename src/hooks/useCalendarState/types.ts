/**
 * Shared types for useCalendarState
 */

import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType
} from '../../types'

/**
 * Calendar state
 */
export interface CalendarState {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | Week | null
  /** Currently displayed month */
  displayMonth: Day
  /** Current view: 'calendar', 'months', or 'years' */
  currentView: 'calendar' | 'months' | 'years'
}

/**
 * Calendar actions
 */
export type CalendarAction =
  | { type: 'SELECT_DATE'; payload: Day }
  | { type: 'SELECT_RANGE_START'; payload: Day }
  | { type: 'SELECT_RANGE_END'; payload: Day }
  | { type: 'SELECT_WEEK'; payload: Day }
  | { type: 'SELECT_RANGE_DIRECT'; payload: Range }
  | { type: 'TOGGLE_MULTI_DATE'; payload: Day }
  | { type: 'UPDATE_TIME'; payload: { day: Day; hour: number; minute: number } }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_DISPLAY_MONTH'; payload: Day }
  | { type: 'NAVIGATE_MONTH'; payload: 'prev' | 'next' }
  | { type: 'SET_VIEW'; payload: 'calendar' | 'months' | 'years' }
  | { type: 'SELECT_MONTH'; payload: number }
  | { type: 'SELECT_YEAR'; payload: number }
  | { type: 'SYNC_INIT_VALUE'; payload: Day | Range | Multi | Week | null }
  | { type: 'GO_TO_TODAY' }

/**
 * Reducer context - additional data needed by reducers
 */
export interface ReducerContext {
  type: CalendarType
  calendarSystem: CalendarLocale
  withTime: boolean
  numberOfMonths: number
  weekStart?: number
}

/**
 * Reducer result - can return state update and/or emitted value
 */
export interface ReducerResult {
  state?: Partial<CalendarState>
  emittedValue?: Day | Range | Multi | Week | null
}
