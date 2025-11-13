/**
 * Calendar Grid View Component
 * Displays the calendar grid with days
 */

import React from 'react'
import type { Day, Range, Multi, CalendarLocale, CalendarType } from '../types'
import type {
  CalendarConstraints,
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
import { toPersianNumeral } from '../utils/formatting'

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
  /** Date constraints */
  constraints?: CalendarConstraints
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
    constraints = {},
    customization = {},
    onDateSelect,
    onMonthNavigate,
    onViewChange
  } = props

  const { maxDate, minDate, disabledDates } = constraints
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

        <div className='calendar-month-year-btn'>
          <button
            type='button'
            onClick={() => onViewChange('months')}
            className='calendar-month-btn'
          >
            {monthNames[displayMonth.month - 1]}
          </button>
          <button
            type='button'
            onClick={() => onViewChange('years')}
            className='calendar-year-btn'
          >
            {locale === 'fa'
              ? toPersianNumeral(displayMonth.year)
              : displayMonth.year}
          </button>
        </div>

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
            {locale === 'fa' ? 'امروز' : 'Today'}
          </button>
        )}
      </div>

      {/* Day names */}
      <div className='calendar-day-names'>
        {dayNames.map((name, index) => {
          const isWeekendDay =
            showWeekend &&
            (locale === 'fa'
              ? index === 6 || index === 5
              : index === 0 || index === 6)

          const dayNameClassNames = [
            'calendar-day-name',
            isWeekendDay && 'calendar-weekend'
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={`day-name-${index}-${name}`}
              className={dayNameClassNames}
            >
              {name}
            </div>
          )
        })}
      </div>

      {/* Calendar grid */}
      <div className={`calendar-grid ${daysClass || ''}`}>
        {calendarGrid
          .filter((week) => {
            // Filter out weeks where all days are from other months
            const hasCurrentMonthDay = week.some((day) => day.isCurrentMonth)
            return hasCurrentMonthDay
          })
          .map((week, weekIndex) => {
            const hasOtherMonth = week.some((day) => !day.isCurrentMonth)
            const weekClassNames = [
              'calendar-week',
              hasOtherMonth && 'calendar-week-other-month'
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div key={weekIndex} className={weekClassNames}>
                {week.map((calendarDay, dayIndex) => {
                  const day: Day = calendarDay.dayObject
                  const isSelected = isDaySelected(
                    day,
                    selectedValue,
                    type,
                    locale
                  )
                  const isInRange = isDayInRange(
                    day,
                    selectedValue,
                    type,
                    locale
                  )
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

                  // Identify first day of next month and last day of previous month
                  const isOtherMonth = !calendarDay.isCurrentMonth

                  // Determine if this is from previous month or next month
                  const isPrevMonth =
                    isOtherMonth &&
                    (calendarDay.year < displayMonth.year ||
                      (calendarDay.year === displayMonth.year &&
                        calendarDay.month < displayMonth.month))
                  const isNextMonth =
                    isOtherMonth &&
                    (calendarDay.year > displayMonth.year ||
                      (calendarDay.year === displayMonth.year &&
                        calendarDay.month > displayMonth.month))

                  // Last day of previous month: previous month day where next day is current month
                  const isLastDayOfPrevMonth =
                    isPrevMonth &&
                    dayIndex < 6 &&
                    week[dayIndex + 1].isCurrentMonth

                  // First day of next month: next month day where previous day is current month
                  const isFirstDayOfNextMonth =
                    isNextMonth &&
                    dayIndex > 0 &&
                    week[dayIndex - 1].isCurrentMonth

                  const classNames = [
                    'calendar-day',
                    isOtherMonth && 'calendar-day-other-month',
                    isFirstDayOfNextMonth && 'calendar-day-other-month-first',
                    isLastDayOfPrevMonth && 'calendar-day-other-month-last',
                    calendarDay.isToday && 'calendar-day-today',
                    isSelected && 'calendar-day-selected',
                    isInRange && 'calendar-day-in-range',
                    !isSelectable && 'calendar-day-disabled',
                    isWeekend && 'calendar-day-weekend'
                  ]
                    .filter(Boolean)
                    .join(' ')

                  const handleClick = () => {
                    if (isSelectable) {
                      onDateSelect(day)
                    }
                  }

                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}-${day.year}-${day.month}-${day.day}`}
                      type='button'
                      onClick={handleClick}
                      disabled={!isSelectable}
                      className={classNames}
                    >
                      {locale === 'fa'
                        ? toPersianNumeral(calendarDay.day)
                        : calendarDay.day}
                    </button>
                  )
                })}
              </div>
            )
          })}
      </div>
    </div>
  )
}

CalendarGridView.displayName = 'CalendarGridView'
