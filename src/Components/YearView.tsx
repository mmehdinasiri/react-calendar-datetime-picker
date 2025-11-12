/**
 * Year Selection View Component
 * Displays years for selection
 */

import React from 'react'
import type { Day, CalendarLocale, CalendarListStyle } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { getYearRange } from '../utils/calendar-grid'

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

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`calendar-header ${headerClass || ''}`}>
        <button
          type='button'
          onClick={() => onViewChange('months')}
          className='calendar-back-btn'
        >
          ←
        </button>
        <div className='calendar-year-range-title'>
          {years[0]} - {years[years.length - 1]}
        </div>
      </div>

      <div
        className={`calendar-years ${yearsClass || ''} ${
          isGrid ? 'calendar-years-grid' : 'calendar-years-list'
        }`}
      >
        {years.map((year) => {
          const isCurrentYear = year === displayMonth.year

          return (
            <button
              key={year}
              type='button'
              onClick={() => {
                onYearSelect(year)
                onViewChange('months')
              }}
              className={`calendar-year-item ${
                isCurrentYear ? 'calendar-year-current' : ''
              }`}
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
