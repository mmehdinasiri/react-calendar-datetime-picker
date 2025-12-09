/**
 * Action creators for calendar state
 */

import type { Day, Range } from '../../types'
import type { CalendarAction } from './types'

export const createActions = (dispatch: (action: CalendarAction) => void) => ({
  selectDate: (day: Day) => {
    dispatch({ type: 'SELECT_DATE', payload: day })
  },
  selectRangeStart: (day: Day) => {
    dispatch({ type: 'SELECT_RANGE_START', payload: day })
  },
  selectRangeEnd: (day: Day) => {
    dispatch({ type: 'SELECT_RANGE_END', payload: day })
  },
  selectWeek: (day: Day) => {
    dispatch({ type: 'SELECT_WEEK', payload: day })
  },
  selectRangeDirect: (range: Range) => {
    dispatch({ type: 'SELECT_RANGE_DIRECT', payload: range })
  },
  selectPresetRange: (range: Range) => {
    dispatch({ type: 'SELECT_RANGE_DIRECT', payload: range })
  },
  toggleMultiDate: (day: Day) => {
    dispatch({ type: 'TOGGLE_MULTI_DATE', payload: day })
  },
  updateTime: (day: Day, hour: number, minute: number) => {
    dispatch({ type: 'UPDATE_TIME', payload: { day, hour, minute } })
  },
  clearSelection: () => {
    dispatch({ type: 'CLEAR_SELECTION' })
  },
  setDisplayMonth: (month: Day) => {
    dispatch({ type: 'SET_DISPLAY_MONTH', payload: month })
  },
  navigateMonth: (direction: 'prev' | 'next') => {
    dispatch({ type: 'NAVIGATE_MONTH', payload: direction })
  },
  setView: (view: 'calendar' | 'months' | 'years') => {
    dispatch({ type: 'SET_VIEW', payload: view })
  },
  selectMonth: (month: number) => {
    dispatch({ type: 'SELECT_MONTH', payload: month })
  },
  selectYear: (year: number) => {
    dispatch({ type: 'SELECT_YEAR', payload: year })
  },
  goToToday: () => {
    dispatch({ type: 'GO_TO_TODAY' })
  }
})
