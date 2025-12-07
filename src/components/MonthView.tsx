/**
 * Month Selection View Component
 * Displays months for selection
 */

import React from 'react'
import type { Day, CalendarLocale, CalendarTranslations } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { CalendarHeader } from './CalendarHeader'

export interface MonthViewProps {
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar system */
  calendarSystem: CalendarLocale
  /** Locale for internationalization */
  locale: string
  /** Translation object */
  translations: CalendarTranslations
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when month is selected */
  onMonthSelect: (month: number) => void
  /** Callback when view changes */
  onViewChange: (view: 'calendar' | 'years') => void
}

const MonthViewInner: React.FC<MonthViewProps> = (props) => {
  const {
    displayMonth,
    calendarSystem,
    locale: _locale,
    translations,
    customization = {},
    onMonthSelect,
    onViewChange
  } = props

  const { classes = {} } = customization
  const { months: monthsClass } = classes

  const isRTL = translations.direction === 'rtl'
  const monthNames = translations.months

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      <CalendarHeader
        displayMonth={displayMonth}
        calendarSystem={calendarSystem}
        translations={translations}
        customization={customization}
        onPrevious={() => onViewChange('calendar')}
        onNext={() => onViewChange('years')}
        onMonthClick={() => onViewChange('calendar')}
        onYearClick={() => onViewChange('years')}
      />

      <div
        className={`calendar-months ${monthsClass || ''}`}
        role='grid'
        aria-label={translations.labels.selectMonth}
      >
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
              role='gridcell'
              onClick={() => {
                onMonthSelect(month)
                onViewChange('calendar')
              }}
              className={classNames}
              aria-label={monthName}
              aria-selected={isCurrentMonth}
              aria-current={isCurrentMonth ? 'date' : undefined}
            >
              {monthName}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 🟢 Memoize component to prevent unnecessary re-renders
export const MonthView = React.memo(MonthViewInner, (prevProps, nextProps) => {
  return (
    prevProps.displayMonth === nextProps.displayMonth &&
    prevProps.calendarSystem === nextProps.calendarSystem &&
    prevProps.customization === nextProps.customization &&
    prevProps.onMonthSelect === nextProps.onMonthSelect &&
    prevProps.onViewChange === nextProps.onViewChange
  )
})

MonthView.displayName = 'MonthView'
