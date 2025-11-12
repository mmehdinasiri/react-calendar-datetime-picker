/**
 * Month Selection View Component
 * Displays months for selection
 */

import React from 'react'
import type { Day, CalendarLocale } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { getMonthNames } from '../utils/calendar-grid'

export interface MonthViewProps {
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar locale */
  locale: CalendarLocale
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when month is selected */
  onMonthSelect: (month: number) => void
  /** Callback when view changes */
  onViewChange: (view: 'calendar' | 'years') => void
}

export const MonthView: React.FC<MonthViewProps> = (props) => {
  const {
    displayMonth,
    locale,
    customization = {},
    onMonthSelect,
    onViewChange
  } = props

  const { classes = {} } = customization
  const { header: headerClass, months: monthsClass } = classes

  const isRTL = locale === 'fa'
  const monthNames = getMonthNames(locale)
  const currentMonthName = monthNames[displayMonth.month - 1]

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`calendar-header ${headerClass || ''}`}>
        <button
          type='button'
          onClick={() => onViewChange('calendar')}
          className='calendar-nav-btn calendar-nav-prev'
        >
          {isRTL ? '>' : '<'}
        </button>
        <div className='calendar-month-year-title'>
          {displayMonth.year} {currentMonthName}
        </div>
        <button
          type='button'
          onClick={() => onViewChange('years')}
          className='calendar-nav-btn calendar-nav-next'
        >
          {isRTL ? '<' : '>'}
        </button>
      </div>

      <div className={`calendar-months ${monthsClass || ''}`}>
        {monthNames.map((monthName, index) => {
          const month = index + 1
          const isCurrentMonth = month === displayMonth.month

          const classNames = [
            'calendar-month-item',
            isCurrentMonth && 'calendar-month-current'
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={month}
              type='button'
              onClick={() => {
                onMonthSelect(month)
                onViewChange('calendar')
              }}
              className={classNames}
            >
              {monthName}
            </button>
          )
        })}
      </div>
    </div>
  )
}

MonthView.displayName = 'MonthView'
