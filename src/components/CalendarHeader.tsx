/**
 * Calendar Header Component
 * Reusable header with navigation buttons and month/year display
 */

import React from 'react'
import type { Day, CalendarLocale, CalendarTranslations } from '../types'
import type { CalendarCustomization } from '../types/calendar'
import { formatNumber } from '../utils/formatting'

// Default Chevron Icons
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10 12L6 8L10 4'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M6 12L10 8L6 4'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export interface CalendarHeaderProps {
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar system */
  calendarSystem: CalendarLocale
  /** Translation object */
  translations: CalendarTranslations
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when previous button is clicked */
  onPrevious: () => void
  /** Callback when next button is clicked */
  onNext: () => void
  /** Callback when month button is clicked */
  onMonthClick?: () => void
  /** Callback when year button is clicked */
  onYearClick?: () => void
  /** Previous button title */
  previousTitle?: string
  /** Next button title */
  nextTitle?: string
  /** Show year button (default: true) */
  showYear?: boolean
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const {
    displayMonth,
    calendarSystem: _calendarSystem, // Kept for backward compatibility but not used
    translations,
    customization = {},
    onPrevious,
    onNext,
    onMonthClick,
    onYearClick,
    previousTitle,
    nextTitle,
    showYear = true
  } = props

  const { classes = {}, icons = {} } = customization
  const { header: headerClass } = classes
  const { next: NextBtnIcon, previous: PreviousBtnIcon } = icons

  const monthNames = translations.months

  // Use translations for button titles if not provided
  const actualPreviousTitle = previousTitle || translations.labels.previousMonth
  const actualNextTitle = nextTitle || translations.labels.nextMonth

  return (
    <div className={`calendar-header ${headerClass || ''}`}>
      <button
        type='button'
        onClick={onPrevious}
        title={actualPreviousTitle}
        className='calendar-nav-btn calendar-nav-prev'
      >
        {PreviousBtnIcon ? (
          <PreviousBtnIcon className='calendar-nav-icon' />
        ) : (
          <ChevronLeftIcon className='calendar-nav-icon' />
        )}
      </button>

      <div className='calendar-month-year-btn'>
        {onMonthClick ? (
          <button
            type='button'
            onClick={onMonthClick}
            className='calendar-month-btn'
          >
            {monthNames[displayMonth.month - 1]}
          </button>
        ) : (
          <div className='calendar-month-btn' style={{ cursor: 'default' }}>
            {monthNames[displayMonth.month - 1]}
          </div>
        )}
        {showYear &&
          (onYearClick ? (
            <button
              type='button'
              onClick={onYearClick}
              className='calendar-year-btn'
            >
              {formatNumber(displayMonth.year, translations.numbers)}
            </button>
          ) : (
            <div className='calendar-year-btn' style={{ cursor: 'default' }}>
              {formatNumber(displayMonth.year, translations.numbers)}
            </div>
          ))}
      </div>

      {onNext ? (
        <button
          type='button'
          onClick={onNext}
          title={actualNextTitle}
          className='calendar-nav-btn calendar-nav-next'
        >
          {NextBtnIcon ? (
            <NextBtnIcon className='calendar-nav-icon' />
          ) : (
            <ChevronRightIcon className='calendar-nav-icon' />
          )}
        </button>
      ) : (
        <div
          className='calendar-nav-btn calendar-nav-next'
          style={{ visibility: 'hidden' }}
        />
      )}
    </div>
  )
}

CalendarHeader.displayName = 'CalendarHeader'
