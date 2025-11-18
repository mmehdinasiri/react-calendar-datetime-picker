/**
 * Calendar Grid View Component
 * Displays the calendar grid with days
 */

import React, { useRef } from 'react'
import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType
} from '../types'
import type {
  CalendarConstraints,
  CalendarCustomization,
  PresetRangesConfig
} from '../types/calendar'
import {
  generateCalendarGrid,
  getDayNames,
  getMonthNames,
  getWeekBounds
} from '../utils/calendar-grid'
import { isDateSelectable } from '../utils/validation'
import {
  isDaySelected,
  isDayInRange,
  isRangeStart,
  isRangeEnd
} from '../utils/calendar-selection'
import { toPersianNumeral } from '../utils/formatting'
import { getToday } from '../utils/date-conversion'
import { getPresetRangesFromConfig } from '../utils/preset-ranges'
import { CalendarHeader } from './CalendarHeader'
import { TimeSelector } from './TimeSelector'
import { useKeyboardNavigation, useFocusManagement } from '../hooks'

export interface CalendarGridViewProps {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | Week | null
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar locale */
  locale: CalendarLocale
  /** Calendar selection type */
  type: CalendarType
  /** Enable time selection */
  withTime?: boolean
  /** Time format: '12' for 12-hour format, '24' for 24-hour format */
  timeFormat?: '12' | '24'
  /** Show weekend highlighting */
  showWeekend?: boolean
  /** Show today button */
  todayBtn?: boolean
  /** Preset range buttons configuration */
  presetRanges?: PresetRangesConfig
  /** Enlarge selected day text */
  enlargeSelectedDay?: boolean
  /** Date constraints */
  constraints?: CalendarConstraints
  /** Customization options */
  customization?: CalendarCustomization
  /** Callback when date is selected */
  onDateSelect: (day: Day) => void
  /** Callback when time changes */
  onTimeChange?: (day: Day, hour: number, minute: number) => void
  /** Callback when navigating months */
  onMonthNavigate: (direction: 'prev' | 'next') => void
  /** Callback when view changes */
  onViewChange: (view: 'months' | 'years') => void
  /** Callback to navigate to today's date */
  onGoToToday?: () => void
  /** Callback when preset range is selected */
  onPresetRangeSelect?: (range: Range) => void
}

export const CalendarGridView: React.FC<CalendarGridViewProps> = (props) => {
  const {
    selectedValue,
    displayMonth,
    locale,
    type,
    withTime = false,
    timeFormat = '24',
    showWeekend = false,
    todayBtn = false,
    presetRanges,
    enlargeSelectedDay = true,
    constraints = {},
    customization = {},
    onDateSelect,
    onTimeChange,
    onMonthNavigate,
    onViewChange,
    onGoToToday,
    onPresetRangeSelect
  } = props

  const { maxDate, minDate, disabledDates } = constraints
  const { classes = {}, labels = {} } = customization

  const { days: daysClass } = classes
  const {
    nextMonth: nextMonthBtnTitle = 'next',
    previousMonth: previousMonthBtnTitle = 'previous'
  } = labels

  const isRTL = locale === 'fa'
  const dayNames = getDayNames(locale)
  const monthNames = getMonthNames(locale)
  const calendarGrid = generateCalendarGrid(displayMonth, locale)

  // Refs for keyboard navigation
  const gridRef = useRef<HTMLDivElement>(null)
  const gridElementRef = gridRef as unknown as React.RefObject<HTMLElement>

  // Get selected date for focus management
  const getSelectedDate = (): Day | null => {
    if (!selectedValue) return null
    if (type === 'single') return selectedValue as Day
    if (type === 'range') return (selectedValue as Range).from
    if (type === 'week') return (selectedValue as Week).from
    if (type === 'multi' && (selectedValue as Multi).length > 0) {
      return (selectedValue as Multi)[0]
    }
    return null
  }

  // Validation function for keyboard navigation
  const isDateSelectableForNav = React.useCallback(
    (day: Day): boolean => {
      return isDateSelectable(day, {
        minDate,
        maxDate,
        disabledDates,
        locale
      })
    },
    [minDate, maxDate, disabledDates, locale]
  )

  // Focus management
  const { focusedDate, setFocusedDate, getCellRef } = useFocusManagement({
    initialDate: displayMonth,
    selectedDate: getSelectedDate()
  })

  // Sync focused date when displayMonth changes (e.g., after month navigation)
  React.useEffect(() => {
    // If focused date is not in the current display month, adjust it
    if (
      focusedDate.year !== displayMonth.year ||
      focusedDate.month !== displayMonth.month
    ) {
      // Keep the same day if possible, otherwise use first day of month
      const newFocusedDate: Day = {
        ...displayMonth,
        day: Math.min(focusedDate.day, 31) // Will be validated by isDateSelectable
      }
      // Only update if the date is selectable
      if (isDateSelectableForNav(newFocusedDate)) {
        setFocusedDate(newFocusedDate)
      } else {
        // Try first day of month
        const firstDay: Day = { ...displayMonth, day: 1 }
        if (isDateSelectableForNav(firstDay)) {
          setFocusedDate(firstDay)
        }
      }
    }
  }, [
    displayMonth.year,
    displayMonth.month,
    focusedDate,
    isDateSelectableForNav,
    setFocusedDate
  ]) // Only when month/year changes

  // Wrapper for onGoToToday that also updates focused date
  const handleGoToToday = React.useCallback(() => {
    if (onGoToToday) {
      onGoToToday()
    }
    // Update focused date to today
    const today = getToday(locale)
    setFocusedDate(today)
  }, [onGoToToday, locale, setFocusedDate])

  // Keyboard navigation
  useKeyboardNavigation({
    focusedDate,
    locale,
    type,
    containerRef: gridElementRef,
    enabled: true,
    onFocusedDateChange: setFocusedDate,
    onDateSelect,
    onGoToToday: handleGoToToday,
    onMonthNavigate,
    isDateSelectable: isDateSelectableForNav
  })

  // Get current month/year label for ARIA
  const currentMonthLabel = monthNames[displayMonth.month - 1]
  const currentYearLabel =
    locale === 'fa' ? toPersianNumeral(displayMonth.year) : displayMonth.year

  return (
    <div className='calendar-core' dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <CalendarHeader
        displayMonth={displayMonth}
        locale={locale}
        customization={customization}
        onPrevious={() => onMonthNavigate('prev')}
        onNext={() => onMonthNavigate('next')}
        onMonthClick={() => onViewChange('months')}
        onYearClick={() => onViewChange('years')}
        previousTitle={previousMonthBtnTitle}
        nextTitle={nextMonthBtnTitle}
      />

      {/* Day names */}
      <div className='calendar-day-names' role='row'>
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
              role='columnheader'
              aria-label={name}
            >
              {name}
            </div>
          )
        })}
      </div>

      {/* Calendar grid */}
      <div
        ref={gridRef}
        className={`calendar-grid ${daysClass || ''}`}
        role='grid'
        aria-label={`${currentMonthLabel} ${currentYearLabel}`}
        aria-activedescendant={`day-${focusedDate.year}-${focusedDate.month}-${focusedDate.day}`}
        tabIndex={0}
      >
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
              <div key={weekIndex} className={weekClassNames} role='row'>
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
                  const isStart = isRangeStart(day, selectedValue, type)
                  const isEnd = isRangeEnd(day, selectedValue, type)
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
                    isSelected &&
                      enlargeSelectedDay &&
                      'calendar-day-selected-enlarged',
                    isInRange && 'calendar-day-in-range',
                    isStart && 'calendar-day-range-start',
                    isEnd && 'calendar-day-range-end',
                    !isSelectable && 'calendar-day-disabled',
                    isWeekend && 'calendar-day-weekend'
                  ]
                    .filter(Boolean)
                    .join(' ')

                  const handleClick = () => {
                    if (isSelectable) {
                      // For week type, select the entire week containing this day
                      if (type === 'week') {
                        const weekBounds = getWeekBounds(day, locale)
                        // Select the first day of the week (the week selection logic will handle the rest)
                        onDateSelect(weekBounds.from)
                      } else {
                        onDateSelect(day)
                      }
                    }
                  }

                  // Check if this date is focused
                  const isFocused =
                    focusedDate.year === day.year &&
                    focusedDate.month === day.month &&
                    focusedDate.day === day.day

                  // Create accessible label
                  const dayLabel =
                    locale === 'fa'
                      ? toPersianNumeral(calendarDay.day)
                      : calendarDay.day

                  const monthLabel = monthNames[day.month - 1]
                  const yearLabel =
                    locale === 'fa' ? toPersianNumeral(day.year) : day.year

                  const ariaLabel = `${dayLabel} ${monthLabel} ${yearLabel}`
                  const todayLabel = locale === 'fa' ? 'امروز' : 'Today'
                  const fullAriaLabel = calendarDay.isToday
                    ? `${ariaLabel}, ${todayLabel}`
                    : ariaLabel

                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}-${day.year}-${day.month}-${day.day}`}
                      ref={getCellRef(day)}
                      id={`day-${day.year}-${day.month}-${day.day}`}
                      type='button'
                      role='gridcell'
                      onClick={handleClick}
                      disabled={!isSelectable}
                      className={classNames}
                      aria-label={fullAriaLabel}
                      aria-selected={isSelected}
                      aria-disabled={!isSelectable}
                      aria-current={calendarDay.isToday ? 'date' : undefined}
                      tabIndex={isFocused ? 0 : -1}
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

      {/* Footer */}
      {(todayBtn || (withTime && type !== 'multi' && onTimeChange)) && (
        <div className='calendar-footer'>
          {/* Time Selector - Only for single, range, and week modes, not multi */}
          {withTime && type !== 'multi' && onTimeChange && (
            <div className='calendar-time-selector'>
              {type === 'single' ? (
                <TimeSelector
                  day={selectedValue as Day | null}
                  timeFormat={timeFormat}
                  locale={locale}
                  disabled={!selectedValue}
                  onTimeChange={(hour, minute) => {
                    const day = selectedValue as Day | null
                    if (day) {
                      onTimeChange(day, hour, minute)
                    }
                  }}
                />
              ) : type === 'range' ? (
                <div className='calendar-time-selector-range'>
                  <TimeSelector
                    day={(selectedValue as Range | null)?.from || null}
                    timeFormat={timeFormat}
                    locale={locale}
                    label={locale === 'fa' ? 'از' : 'From'}
                    disabled={!(selectedValue as Range | null)?.from}
                    onTimeChange={(hour, minute) => {
                      const range = selectedValue as Range | null
                      if (range?.from) {
                        onTimeChange(range.from, hour, minute)
                      }
                    }}
                  />
                  <TimeSelector
                    day={(selectedValue as Range | null)?.to || null}
                    timeFormat={timeFormat}
                    locale={locale}
                    label={locale === 'fa' ? 'تا' : 'To'}
                    disabled={!(selectedValue as Range | null)?.to}
                    onTimeChange={(hour, minute) => {
                      const range = selectedValue as Range | null
                      if (range?.to) {
                        onTimeChange(range.to, hour, minute)
                      }
                    }}
                  />
                </div>
              ) : type === 'week' ? (
                <div className='calendar-time-selector-range'>
                  <TimeSelector
                    day={(selectedValue as Week | null)?.from || null}
                    timeFormat={timeFormat}
                    locale={locale}
                    label={locale === 'fa' ? 'از' : 'From'}
                    disabled={!(selectedValue as Week | null)?.from}
                    onTimeChange={(hour, minute) => {
                      const week = selectedValue as Week | null
                      if (week?.from) {
                        onTimeChange(week.from, hour, minute)
                      }
                    }}
                  />
                  <TimeSelector
                    day={(selectedValue as Week | null)?.to || null}
                    timeFormat={timeFormat}
                    locale={locale}
                    label={locale === 'fa' ? 'تا' : 'To'}
                    disabled={!(selectedValue as Week | null)?.to}
                    onTimeChange={(hour, minute) => {
                      const week = selectedValue as Week | null
                      if (week?.to) {
                        onTimeChange(week.to, hour, minute)
                      }
                    }}
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* Preset Range Buttons - Only for range mode */}
          {presetRanges && type === 'range' && (
            <div className='calendar-preset-ranges'>
              {getPresetRangesFromConfig(presetRanges, locale).map((preset) => (
                <button
                  key={preset.value}
                  type='button'
                  onClick={() => {
                    if (onPresetRangeSelect) {
                      onPresetRangeSelect(preset.range)
                    }
                  }}
                  className='calendar-preset-btn'
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Today Button */}
          {todayBtn && (
            <button
              type='button'
              onClick={() => {
                if (onGoToToday) {
                  onGoToToday()
                }
              }}
              className='calendar-today-btn'
            >
              {locale === 'fa' ? 'امروز' : 'Today'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

CalendarGridView.displayName = 'CalendarGridView'
