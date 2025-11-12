/**
 * Year Selection View Component
 * Displays years for selection
 */

import React, { useRef, useEffect } from 'react'
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
  
  const yearsContainerRef = useRef<HTMLDivElement>(null)
  const currentYearIndex = years.findIndex((year) => year === displayMonth.year)

  // Scroll to center the current year when component mounts or year changes
  useEffect(() => {
    if (yearsContainerRef.current && currentYearIndex >= 0 && isGrid) {
      const container = yearsContainerRef.current
      const yearItemHeight = 55 // Height of each year item
      const containerHeight = 291 // Height of the scrollable container
      const columnsPerRow = 5 // Grid has 5 columns
      
      // Calculate which row the current year is in
      const rowIndex = Math.floor(currentYearIndex / columnsPerRow)
      
      // Calculate scroll position to center the row containing the current year
      const scrollPosition =
        rowIndex * yearItemHeight - containerHeight / 2 + yearItemHeight / 2
      
      // Scroll to the calculated position
      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    } else if (yearsContainerRef.current && currentYearIndex >= 0 && !isGrid) {
      // For list layout, scroll directly to the year
      const container = yearsContainerRef.current
      const yearItemHeight = 55
      const containerHeight = 291
      
      const scrollPosition =
        currentYearIndex * yearItemHeight - containerHeight / 2 + yearItemHeight / 2
      
      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }, [currentYearIndex, displayMonth.year, isGrid])

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
        <div className='calendar-month-year-btn'>
          <button
            type='button'
            onClick={() => onViewChange('months')}
            className='calendar-month-btn'
          >
            {currentMonthName}
          </button>
          <button
            type='button'
            className='calendar-year-btn'
            disabled
            style={{ cursor: 'default' }}
          >
            {displayMonth.year}
          </button>
        </div>
        <div className='calendar-nav-btn calendar-nav-next' style={{ visibility: 'hidden' }}>
          {isRTL ? '<' : '>'}
        </div>
      </div>

      <div className='year-wrapper'>
        <div
          ref={yearsContainerRef}
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
    </div>
  )
}

YearView.displayName = 'YearView'
