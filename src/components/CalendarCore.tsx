/**
 * CalendarCore Component
 * Shared calendar logic used by both DtPicker and DtCalendar
 */

import React from 'react'
import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType,
  CalendarListStyle,
  CalendarTranslations
} from '../types'
import type {
  CalendarConstraints,
  CalendarCustomization,
  PresetRangesConfig
} from '../types/calendar'
import { CalendarGridView } from './CalendarGridView'
import { MonthView } from './MonthView'
import { YearView } from './YearView'

export interface CalendarCoreProps {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | Week | null
  /** Currently displayed month */
  displayMonth: Day
  /** Current view: 'calendar', 'months', or 'years' */
  currentView: 'calendar' | 'months' | 'years'
  /** Calendar system */
  calendarSystem: CalendarLocale
  /** Locale for internationalization */
  locale: string
  /** Translation object */
  translations: CalendarTranslations
  /** Calendar selection type */
  type: CalendarType
  /** Enable time selection */
  withTime?: boolean
  /** Time format: '12' for 12-hour format, '24' for 24-hour format */
  timeFormat?: '12' | '24'
  /** Show weekend highlighting */
  showWeekend?: boolean
  /** First day of the week (0 = Sunday, 6 = Saturday) */
  weekStart?: number
  /** Show today button */
  todayBtn?: boolean
  /** Preset range buttons configuration */
  presetRanges?: PresetRangesConfig
  /** Enlarge selected day text */
  enlargeSelectedDay?: boolean
  /** Year list style */
  yearListStyle?: CalendarListStyle
  /** Date constraints */
  constraints?: CalendarConstraints
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when date is selected */
  onDateSelect: (day: Day) => void
  /** Callback when time changes */
  onTimeChange?: (day: Day, hour: number, minute: number) => void
  /** Callback when month is selected */
  onMonthSelect: (month: number) => void
  /** Callback when year is selected */
  onYearSelect: (year: number) => void
  /** Callback when view changes */
  onViewChange: (view: 'calendar' | 'months' | 'years') => void
  /** Callback when navigating months */
  onMonthNavigate: (direction: 'prev' | 'next') => void
  /** Callback to navigate to today's date */
  onGoToToday?: () => void
  /** Callback when preset range is selected */
  onPresetRangeSelect?: (range: Range) => void
  /** Number of months to display side by side */
  numberOfMonths?: 1 | 2 | 3
}

export const CalendarCore: React.FC<CalendarCoreProps> = (props) => {
  const {
    selectedValue,
    displayMonth,
    currentView,
    calendarSystem,
    locale,
    translations,
    type,
    withTime = false,
    timeFormat = '24',
    showWeekend = false,
    weekStart,
    todayBtn = false,
    presetRanges,
    enlargeSelectedDay = true,
    yearListStyle = 'grid',
    constraints = {},
    customization = {},
    onDateSelect,
    onTimeChange,
    onMonthSelect,
    onYearSelect,
    onViewChange,
    onMonthNavigate,
    onGoToToday,
    onPresetRangeSelect,
    numberOfMonths = 1
  } = props

  // Render appropriate view component
  if (currentView === 'calendar') {
    return (
      <CalendarGridView
        selectedValue={selectedValue}
        displayMonth={displayMonth}
        calendarSystem={calendarSystem}
        locale={locale}
        translations={translations}
        type={type}
        withTime={withTime}
        timeFormat={timeFormat}
        showWeekend={showWeekend}
        weekStart={weekStart}
        todayBtn={todayBtn}
        enlargeSelectedDay={enlargeSelectedDay}
        constraints={constraints}
        customization={customization}
        numberOfMonths={numberOfMonths}
        onDateSelect={onDateSelect}
        onTimeChange={onTimeChange}
        onMonthNavigate={onMonthNavigate}
        onViewChange={onViewChange}
        onGoToToday={onGoToToday}
        presetRanges={presetRanges}
        onPresetRangeSelect={onPresetRangeSelect}
      />
    )
  }

  if (currentView === 'months') {
    return (
      <MonthView
        displayMonth={displayMonth}
        calendarSystem={calendarSystem}
        locale={locale}
        translations={translations}
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
        calendarSystem={calendarSystem}
        locale={locale}
        translations={translations}
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
