/**
 * Year Selection View Component
 * Displays years for selection
 */

import React from 'react'
import type { Day, CalendarLocale, CalendarListStyle } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { getYearRange, getMonthNames } from '../utils/calendar-grid'

export interface YearViewProps {
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar locale */
  locale: CalendarLocale
  /** Year list style */
  yearListStyle?: CalendarListStyle
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when year is selected */
  onYearSelect: (year: number) => void
  /** Callback when view changes */
  onViewChange: (view: 'months') => void
}

export const YearView: React.FC<YearViewProps> = (props) => {
  const {
    displayMonth,
    locale,
    yearListStyle = 'grid',
    customization = {},
    onYearSelect,
    onViewChange
  } = props

  const { classes = {} } = customization
  const { header: headerClass, years: yearsClass } = classes

  const isRTL = locale === 'fa'
  const years = getYearRange(displayMonth.year, 12)
  const isGrid = yearListStyle === 'grid'
  const monthNames = getMonthNames(locale)
  const currentMonthName = monthNames[displayMonth.month - 1]

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`calendar-header ${headerClass || ''}`}>
        <button
          type='button'
          onClick={() => onViewChange('months')}
          className='calendar-nav-btn calendar-nav-prev'
        >
          {isRTL ? '>' : '<'}
        </button>
        <div className='calendar-month-year-title'>
          {displayMonth.year} {currentMonthName}
        </div>
        <div className='calendar-nav-btn calendar-nav-next' style={{ visibility: 'hidden' }}>
          {isRTL ? '<' : '>'}
        </div>
      </div>

      <div
        className={`calendar-years ${yearsClass || ''} ${
          isGrid ? 'calendar-years-grid' : 'calendar-years-list'
        }`}
      >
        {years.map((year) => {
          const isCurrentYear = year === displayMonth.year

          const classNames = [
            'calendar-year-item',
            isCurrentYear && 'calendar-year-current'
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={year}
              type='button'
              onClick={() => {
                onYearSelect(year)
                onViewChange('months')
              }}
              className={classNames}
            >
              {year}
            </button>
          )
        })}
      </div>
    </div>
  )
}

YearView.displayName = 'YearView'
