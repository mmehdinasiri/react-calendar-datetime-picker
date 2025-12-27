/**
 * Calendar Grid View Component
 * Displays the calendar grid with days
 */

import React, { useRef, useMemo } from 'react'
import type {
  Day,
  Range,
  Multi,
  Week,
  CalendarLocale,
  CalendarType,
  CalendarTranslations
} from '../types'
import type {
  CalendarConstraints,
  CalendarCustomization,
  PresetRangesConfig
} from '../types/calendar'
import {
  generateCalendarGrid,
  getWeekBounds,
  getMonthsToDisplay
} from '../utils/calendar-grid'
import { isDateSelectable } from '../utils/validation'
import {
  isDaySelected,
  isDayInRange,
  isRangeStart,
  isRangeEnd
} from '../utils/calendar-selection'
import {
  formatNumber,
  detectTimeFormatFromDateFormat
} from '../utils/formatting'
import { getToday } from '../utils/date-conversion'
import {
  getPresetRangesFromConfig,
  isPresetRangeActive
} from '../utils/preset-ranges'
import {
  getRotatedWeekdayNames,
  getWeekendConfig
} from '../utils/weekday-utils'
import { CalendarHeader } from './CalendarHeader'
import { TimeSelector } from './TimeSelector'
import { useKeyboardNavigation, useFocusManagement } from '../hooks'

export interface CalendarGridViewProps {
  /** Currently selected value */
  selectedValue: Day | Range | Multi | Week | null
  /** Currently displayed month */
  displayMonth: Day
  /** Calendar system */
  calendarSystem: CalendarLocale
  /** Locale for internationalization */
  locale: string
  /** Translation object */
  translations: CalendarTranslations
  /** Calendar selection type */
  type: CalendarType
  /** Enable time selection */
  withTime?: boolean
  /** Custom date format string (used to detect time format) */
  dateFormat?: string
  /** Time format: '12' for 12-hour format, '24' for 24-hour format (detected from dateFormat if not provided) */
  timeFormat?: '12' | '24'
  /** Show weekend highlighting */
  showWeekend?: boolean
  /** First day of the week (0 = Sunday, 6 = Saturday) */
  weekStart?: number
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
  /** Number of months to display side by side */
  numberOfMonths?: 1 | 2 | 3
}

const CalendarGridViewInner: React.FC<CalendarGridViewProps> = (props) => {
  const {
    selectedValue,
    displayMonth,
    calendarSystem,
    locale: _locale,
    translations,
    type,
    withTime = false,
    dateFormat,
    timeFormat,
    showWeekend = false,
    weekStart,
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
    onPresetRangeSelect,
    numberOfMonths = 1
  } = props

  // Detect time format from dateFormat if not provided
  const effectiveTimeFormat =
    timeFormat || detectTimeFormatFromDateFormat(dateFormat)

  const { maxDate, minDate, disabledDates, isDateDisabled } = constraints
  const { classes = {}, labels = {} } = customization

  const { days: daysClass } = classes
  const { nextMonth: nextMonthBtnTitle, previousMonth: previousMonthBtnTitle } =
    labels

  const isRTL = translations.direction === 'rtl'
  // Rotate weekday names based on weekStart and calendar system
  const dayNames = useMemo(
    () =>
      getRotatedWeekdayNames(translations.weekdays, calendarSystem, weekStart),
    [translations.weekdays, calendarSystem, weekStart]
  )
  const monthNames = translations.months

  // Get all months to display
  const monthsToDisplay = getMonthsToDisplay(
    displayMonth,
    numberOfMonths,
    calendarSystem
  )

  // 🟢 Memoize expensive calendar grid generation - only recompute when dependencies change
  const calendarGrids = useMemo(() => {
    return monthsToDisplay.map((month) =>
      generateCalendarGrid(month, calendarSystem, weekStart)
    )
  }, [monthsToDisplay, calendarSystem, weekStart])

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
        isDateDisabled,
        calendarSystem
      })
    },
    [minDate, maxDate, disabledDates, isDateDisabled, calendarSystem]
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
        year: displayMonth.year,
        month: displayMonth.month,
        day: Math.min(focusedDate.day, 31) // Will be validated by isDateSelectable
      }
      // Only update if the date is selectable
      if (isDateSelectableForNav(newFocusedDate)) {
        setFocusedDate(newFocusedDate)
      } else {
        // Try first day of month
        const firstDay: Day = {
          year: displayMonth.year,
          month: displayMonth.month,
          day: 1
        }
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
    const today = getToday(calendarSystem)
    setFocusedDate(today)
  }, [onGoToToday, calendarSystem, setFocusedDate])

  // Keyboard navigation
  useKeyboardNavigation({
    focusedDate,
    calendarSystem,
    type,
    containerRef: gridElementRef,
    enabled: true,
    onFocusedDateChange: setFocusedDate,
    onDateSelect,
    onGoToToday: handleGoToToday,
    onMonthNavigate,
    isDateSelectable: isDateSelectableForNav
  })

  // Render a single month grid
  const renderMonthGrid = (
    month: Day,
    grid: ReturnType<typeof generateCalendarGrid>,
    monthIndex: number
  ) => {
    const monthLabel = monthNames[month.month - 1]
    const yearLabel = formatNumber(month.year, translations.numbers)

    return (
      <div
        key={`month-${month.year}-${month.month}`}
        className={`calendar-month-container ${numberOfMonths > 1 ? 'calendar-month-multi' : ''}`}
      >
        {/* Month header for multiple months */}
        {numberOfMonths > 1 && (
          <div className='calendar-month-header'>
            <span className='calendar-month-title'>
              {monthLabel} {yearLabel}
            </span>
          </div>
        )}

        {/* Day names - only show for first month or each month in multi-month view */}
        {(monthIndex === 0 || numberOfMonths > 1) && (
          <div className='calendar-day-names' role='row'>
            {dayNames.map((name, index) => {
              const weekendConfig = getWeekendConfig(calendarSystem, weekStart)
              const isWeekendDay = showWeekend && weekendConfig.isWeekend(index)

              const dayNameClassNames = [
                'calendar-day-name',
                isWeekendDay && 'calendar-weekend'
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div
                  key={`day-name-${monthIndex}-${index}-${name}`}
                  className={dayNameClassNames}
                  role='columnheader'
                  aria-label={name}
                >
                  {name}
                </div>
              )
            })}
          </div>
        )}

        {/* Calendar grid */}
        <div
          ref={monthIndex === 0 ? gridRef : undefined}
          className={`calendar-grid ${daysClass || ''}`}
          role='grid'
          aria-label={`${monthLabel} ${yearLabel}`}
          aria-activedescendant={
            monthIndex === 0
              ? `day-${focusedDate.year}-${focusedDate.month}-${focusedDate.day}`
              : undefined
          }
          tabIndex={monthIndex === 0 ? 0 : -1}
        >
          {grid
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

                    // Hide days from other months when displaying multiple months
                    const isOtherMonth = !calendarDay.isCurrentMonth
                    if (numberOfMonths > 1 && isOtherMonth) {
                      // Render empty cell to maintain grid structure
                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}-empty`}
                          className='calendar-day calendar-day-empty'
                          role='gridcell'
                          aria-hidden='true'
                        />
                      )
                    }

                    const isSelected = isDaySelected(
                      day,
                      selectedValue,
                      type,
                      calendarSystem
                    )
                    const isInRange = isDayInRange(
                      day,
                      selectedValue,
                      type,
                      calendarSystem
                    )
                    const isStart = isRangeStart(day, selectedValue, type)
                    const isEnd = isRangeEnd(day, selectedValue, type)
                    const isSelectable = isDateSelectable(day, {
                      minDate,
                      maxDate,
                      disabledDates,
                      isDateDisabled,
                      calendarSystem
                    })

                    // Calculate if this day is a weekend
                    const weekendConfig = getWeekendConfig(
                      calendarSystem,
                      weekStart
                    )
                    const isWeekend =
                      showWeekend && weekendConfig.isWeekend(dayIndex)

                    // Determine if this is from previous month or next month
                    const isPrevMonth =
                      isOtherMonth &&
                      (calendarDay.year < month.year ||
                        (calendarDay.year === month.year &&
                          calendarDay.month < month.month))
                    const isNextMonth =
                      isOtherMonth &&
                      (calendarDay.year > month.year ||
                        (calendarDay.year === month.year &&
                          calendarDay.month > month.month))

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
                          const weekBounds = getWeekBounds(
                            day,
                            calendarSystem,
                            weekStart
                          )
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
                    const dayLabel = formatNumber(
                      calendarDay.day,
                      translations.numbers
                    )

                    const monthLabel = monthNames[day.month - 1]
                    const yearLabel = formatNumber(
                      day.year,
                      translations.numbers
                    )

                    const ariaLabel = `${dayLabel} ${monthLabel} ${yearLabel}`
                    const todayLabel = translations.labels.today
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
                        {formatNumber(calendarDay.day, translations.numbers)}
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

  return (
    <div
      className={`calendar-core ${numberOfMonths > 1 ? 'calendar-core-multi-months' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header - only show for single month or show range for multiple months */}
      <CalendarHeader
        displayMonth={displayMonth}
        calendarSystem={calendarSystem}
        translations={translations}
        customization={customization}
        onPrevious={() => onMonthNavigate('prev')}
        onNext={() => onMonthNavigate('next')}
        onMonthClick={() => onViewChange('months')}
        onYearClick={() => onViewChange('years')}
        previousTitle={previousMonthBtnTitle}
        nextTitle={nextMonthBtnTitle}
        showMonth={numberOfMonths === 1}
      />

      {/* Multiple months container */}
      <div
        className={`calendar-months-wrapper ${numberOfMonths > 1 ? 'calendar-months-multi' : ''}`}
      >
        {monthsToDisplay.map((month, index) =>
          renderMonthGrid(month, calendarGrids[index], index)
        )}
      </div>

      {/* Footer */}
      {(todayBtn ||
        (withTime && type !== 'multi' && onTimeChange) ||
        (presetRanges && type === 'range')) && (
        <div className='calendar-footer'>
          {/* Time Selector - Only for single, range, and week modes, not multi */}
          {withTime && type !== 'multi' && onTimeChange && (
            <div className='calendar-time-selector'>
              {type === 'single' ? (
                <TimeSelector
                  day={selectedValue as Day | null}
                  timeFormat={effectiveTimeFormat}
                  translations={translations}
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
                    timeFormat={effectiveTimeFormat}
                    translations={translations}
                    label={translations.labels.timeFrom}
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
                    timeFormat={effectiveTimeFormat}
                    translations={translations}
                    label={translations.labels.timeTo}
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
                    timeFormat={effectiveTimeFormat}
                    translations={translations}
                    label={translations.labels.timeFrom}
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
                    timeFormat={effectiveTimeFormat}
                    translations={translations}
                    label={translations.labels.timeTo}
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
              {getPresetRangesFromConfig(
                presetRanges,
                calendarSystem,
                translations.presetRanges
              ).map((preset, index) => {
                const currentRange = selectedValue as Range | null
                const isActive = isPresetRangeActive(
                  preset.range,
                  currentRange,
                  calendarSystem
                )
                return (
                  <button
                    key={
                      preset.value === 'custom'
                        ? `custom-${index}`
                        : preset.value
                    }
                    type='button'
                    onClick={() => {
                      if (onPresetRangeSelect) {
                        onPresetRangeSelect(preset.range)
                      }
                    }}
                    className={`calendar-preset-btn ${
                      isActive ? 'calendar-preset-btn-active' : ''
                    }`}
                  >
                    {preset.label}
                  </button>
                )
              })}
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
              {translations.labels.today}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// 🟢 Memoize component to prevent unnecessary re-renders
export const CalendarGridView = React.memo(
  CalendarGridViewInner,
  (prevProps, nextProps) => {
    // Return TRUE if props are equal (skip re-render)
    return (
      prevProps.selectedValue === nextProps.selectedValue &&
      prevProps.displayMonth === nextProps.displayMonth &&
      prevProps.calendarSystem === nextProps.calendarSystem &&
      prevProps.locale === nextProps.locale &&
      prevProps.translations === nextProps.translations &&
      prevProps.type === nextProps.type &&
      prevProps.withTime === nextProps.withTime &&
      prevProps.dateFormat === nextProps.dateFormat &&
      prevProps.timeFormat === nextProps.timeFormat &&
      prevProps.showWeekend === nextProps.showWeekend &&
      prevProps.weekStart === nextProps.weekStart &&
      prevProps.todayBtn === nextProps.todayBtn &&
      prevProps.enlargeSelectedDay === nextProps.enlargeSelectedDay &&
      prevProps.numberOfMonths === nextProps.numberOfMonths &&
      prevProps.constraints === nextProps.constraints &&
      prevProps.customization === nextProps.customization &&
      prevProps.presetRanges === nextProps.presetRanges &&
      prevProps.onDateSelect === nextProps.onDateSelect &&
      prevProps.onTimeChange === nextProps.onTimeChange &&
      prevProps.onMonthNavigate === nextProps.onMonthNavigate &&
      prevProps.onViewChange === nextProps.onViewChange &&
      prevProps.onGoToToday === nextProps.onGoToToday &&
      prevProps.onPresetRangeSelect === nextProps.onPresetRangeSelect
    )
  }
)

CalendarGridView.displayName = 'CalendarGridView'
