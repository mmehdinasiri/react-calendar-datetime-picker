/**
 * Calendar Grid View Component
 * Displays the calendar grid with days
 */

import React from 'react'
import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'
import type {
  CalendarValidation,
  CalendarCustomization
} from '../types/calendar'
import {
  generateCalendarGrid,
  getDayNames,
  getMonthNames
} from '../utils/calendar-grid'
import { isDateSelectable } from '../utils/validation'
import { isDaySelected, isDayInRange } from '../utils/calendar-selection'
import { getToday } from '../utils/date-conversion'

export interface CalendarGridViewProps {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | null
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar locale */
  locale: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Show weekend highlighting */
  showWeekend?: boolean
  /** Show today button */
  todayBtn?: boolean
  /** Validation options */
  validation?: CalendarValidation
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when date is selected */
  onDateSelect: (day: Day) => void
  /** Callback when navigating months */
  onMonthNavigate: (direction: 'prev' | 'next') => void
  /** Callback when view changes */
  onViewChange: (view: 'months' | 'years') => void
}

export const CalendarGridView: React.FC<CalendarGridViewProps> = (props) => {
  const {
    selectedValue,
    displayMonth,
    locale,
    type,
    showWeekend = false,
    todayBtn = false,
    validation = {},
    customization = {},
    onDateSelect,
    onMonthNavigate,
    onViewChange
  } = props

  const { maxDate, minDate, disabledDates } = validation
  const { classes = {}, icons = {}, labels = {} } = customization

  const { header: headerClass, days: daysClass } = classes
  const { next: NextBtnIcon, previous: PreviousBtnIcon } = icons
  const {
    nextMonth: nextMonthBtnTitle = 'next',
    previousMonth: previousMonthBtnTitle = 'previous'
  } = labels

  const isRTL = locale === 'fa'
  const dayNames = getDayNames(locale)
  const monthNames = getMonthNames(locale)
  const calendarGrid = generateCalendarGrid(displayMonth, locale)
  const today = getToday(locale)

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`calendar-header ${headerClass || ''}`}>
        <button
          type='button'
          onClick={() => onMonthNavigate('prev')}
          title={previousMonthBtnTitle}
          className='calendar-nav-btn calendar-nav-prev'
        >
          {PreviousBtnIcon ? (
            <PreviousBtnIcon className='calendar-nav-icon' />
          ) : (
            <span>{isRTL ? '>' : '<'}</span>
          )}
        </button>

        <button
          type='button'
          onClick={() => onViewChange('months')}
          className='calendar-month-year-btn'
        >
          {monthNames[displayMonth.month - 1]} {displayMonth.year}
        </button>

        <button
          type='button'
          onClick={() => onMonthNavigate('next')}
          title={nextMonthBtnTitle}
          className='calendar-nav-btn calendar-nav-next'
        >
          {NextBtnIcon ? (
            <NextBtnIcon className='calendar-nav-icon' />
          ) : (
            <span>{isRTL ? '<' : '>'}</span>
          )}
        </button>

        {todayBtn && (
          <button
            type='button'
            onClick={() => onDateSelect(today)}
            className='calendar-today-btn'
          >
            Today
          </button>
        )}
      </div>

      {/* Day names */}
      <div className='calendar-day-names'>
        {dayNames.map((name, index) => (
          <div
            key={index}
            className={`calendar-day-name ${
              showWeekend &&
              (locale === 'fa'
                ? index === 6 || index === 5
                : index === 0 || index === 6)
                ? 'calendar-weekend'
                : ''
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={`calendar-grid ${daysClass || ''}`}>
        {calendarGrid.map((week, weekIndex) => (
          <div key={weekIndex} className='calendar-week'>
            {week.map((calendarDay, dayIndex) => {
              const day: Day = calendarDay.dayObject
              const isSelected = isDaySelected(day, selectedValue, type)
              const isInRange = isDayInRange(day, selectedValue, type)
              const isSelectable = isDateSelectable(day, {
                minDate,
                maxDate,
                disabledDates,
                locale
              })
              const isWeekend =
                showWeekend &&
                (locale === 'fa'
                  ? dayIndex === 6 || dayIndex === 5
                  : dayIndex === 0 || dayIndex === 6)

              return (
                <button
                  key={dayIndex}
                  type='button'
                  onClick={() => isSelectable && onDateSelect(day)}
                  disabled={!isSelectable}
                  className={`calendar-day ${
                    !calendarDay.isCurrentMonth
                      ? 'calendar-day-other-month'
                      : ''
                  } ${calendarDay.isToday ? 'calendar-day-today' : ''} ${
                    isSelected ? 'calendar-day-selected' : ''
                  } ${isInRange ? 'calendar-day-in-range' : ''} ${
                    !isSelectable ? 'calendar-day-disabled' : ''
                  } ${isWeekend ? 'calendar-day-weekend' : ''}`}
                >
                  {calendarDay.day}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

CalendarGridView.displayName = 'CalendarGridView'
