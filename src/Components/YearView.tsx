/**
 * Year Selection View Component
 * Displays years for selection
 */

import React, { useRef, useEffect } from 'react'
import type { Day, CalendarLocale, CalendarListStyle } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { getYearRange } from '../utils/calendar-grid'
import { toPersianNumeral } from '../utils/formatting'
import { CalendarHeader } from './CalendarHeader'

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
  const { years: yearsClass } = classes

  const isRTL = locale === 'fa'
  const years = getYearRange(displayMonth.year, 12, locale)
  const isGrid = yearListStyle === 'grid'

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
        currentYearIndex * yearItemHeight -
        containerHeight / 2 +
        yearItemHeight / 2

      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }, [currentYearIndex, displayMonth.year, isGrid])

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <CalendarHeader
        displayMonth={displayMonth}
        locale={locale}
        customization={customization}
        onPrevious={() => onViewChange('months')}
        onNext={() => {}}
        onMonthClick={() => onViewChange('months')}
        onYearClick={undefined}
        showYear={true}
      />

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
                {locale === 'fa' ? toPersianNumeral(year) : year}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

YearView.displayName = 'YearView'
