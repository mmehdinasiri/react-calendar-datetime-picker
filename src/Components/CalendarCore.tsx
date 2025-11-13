/**
 * CalendarCore Component
 * Shared calendar logic used by both DtPicker and DtCalendar
 */

import React from 'react'
import type {
  Day,
  Range,
  Multi,
  CalendarLocale,
  CalendarType,
  CalendarListStyle
} from '../types'
import type {
  CalendarConstraints,
  CalendarCustomization
} from '../types/calendar'
import { CalendarGridView } from './CalendarGridView'
import { MonthView } from './MonthView'
import { YearView } from './YearView'

export interface CalendarCoreProps {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | null
  /** Currently displayed month */
  displayMonth: Day
  /** Current view: 'calendar', 'months', or 'years' */
  currentView: 'calendar' | 'months' | 'years'
  /** Calendar locale */
  locale: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Show weekend highlighting */
  showWeekend?: boolean
  /** Show today button */
  todayBtn?: boolean
  /** Year list style */
  yearListStyle?: CalendarListStyle
  /** Date constraints */
  constraints?: CalendarConstraints
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when date is selected */
  onDateSelect: (day: Day) => void
  /** Callback when month is selected */
  onMonthSelect: (month: number) => void
  /** Callback when year is selected */
  onYearSelect: (year: number) => void
  /** Callback when view changes */
  onViewChange: (view: 'calendar' | 'months' | 'years') => void
  /** Callback when navigating months */
  onMonthNavigate: (direction: 'prev' | 'next') => void
}

export const CalendarCore: React.FC<CalendarCoreProps> = (props) => {
  const {
    selectedValue,
    displayMonth,
    currentView,
    locale,
    type,
    showWeekend = false,
    todayBtn = false,
    yearListStyle = 'grid',
    constraints = {},
    customization = {},
    onDateSelect,
    onMonthSelect,
    onYearSelect,
    onViewChange,
    onMonthNavigate
  } = props

  // Render appropriate view component
  if (currentView === 'calendar') {
    return (
      <CalendarGridView
        selectedValue={selectedValue}
        displayMonth={displayMonth}
        locale={locale}
        type={type}
        showWeekend={showWeekend}
        todayBtn={todayBtn}
        constraints={constraints}
        customization={customization}
        onDateSelect={onDateSelect}
        onMonthNavigate={onMonthNavigate}
        onViewChange={onViewChange}
      />
    )
  }

  if (currentView === 'months') {
    return (
      <MonthView
        displayMonth={displayMonth}
        locale={locale}
        customization={customization}
        onMonthSelect={onMonthSelect}
        onViewChange={onViewChange}
      />
    )
  }

  if (currentView === 'years') {
    return (
      <YearView
        displayMonth={displayMonth}
        locale={locale}
        yearListStyle={yearListStyle}
        customization={customization}
        onYearSelect={onYearSelect}
        onViewChange={onViewChange}
      />
    )
  }

  return null
}

CalendarCore.displayName = 'CalendarCore'
