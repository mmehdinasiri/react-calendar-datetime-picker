/**
 * Month Selection View Component
 * Displays months for selection
 */

import React from 'react'
import type { Day, CalendarLocale } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { getMonthNames } from '../utils/calendar-grid'
import { CalendarHeader } from './CalendarHeader'

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
  const { months: monthsClass } = classes

  const isRTL = locale === 'fa'
  const monthNames = getMonthNames(locale)

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <CalendarHeader
        displayMonth={displayMonth}
        locale={locale}
        customization={customization}
        onPrevious={() => onViewChange('calendar')}
        onNext={() => onViewChange('years')}
        onMonthClick={() => onViewChange('calendar')}
        onYearClick={() => onViewChange('years')}
      />

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
