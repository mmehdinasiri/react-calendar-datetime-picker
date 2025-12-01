import React, { useState, useRef } from 'react'
import type { CalendarLocale, CalendarType, InitValueInput } from '../types'
import type {
  CalendarConstraintsInput,
  PresetRangesConfig
} from '../types/calendar'
import type { Range } from '../types'
import { CalendarCore } from './CalendarCore'
import {
  useCalendarPicker,
  useModalPosition,
  useClickOutside,
  useEscapeKey,
  useFocusTrap
} from '../hooks'

export interface DtPickerProps {
  /**
   * Initial value for the date picker
   * Accepts Day objects, Date objects, date strings, timestamps, or range/multi formats
   * Examples:
   * - Single: { year: 2024, month: 12, day: 25 } | new Date() | "2024-12-25" | 1735084800000
   * - Range: { from: DateInput, to: DateInput }
   * - Multi: DateInput[]
   */
  initValue?: InitValueInput
  /**
   * Callback function called when date changes
   */
  onChange: (date: unknown) => void
  /**
   * Calendar type: 'single', 'range', or 'multi'
   * @default 'single'
   */
  type?: CalendarType
  /**
   * Enable time selection
   * @default false
   */
  withTime?: boolean
  /**
   * Show time in input field
   * @default false
   */
  showTimeInput?: boolean
  /**
   * Calendar locale: 'en' (Gregorian) or 'fa' (Jalali)
   * @default 'en'
   */
  local?: CalendarLocale
  /**
   * Show weekend highlighting
   * @default false
   */
  showWeekend?: boolean
  /**
   * Show clear button
   * @default false
   */
  clearBtn?: boolean
  /**
   * Make input required
   * @default false
   */
  isRequired?: boolean
  /**
   * Show today button
   * @default false
   */
  todayBtn?: boolean
  /**
   * Preset range buttons configuration
   * Only works with type='range' or type='week'
   */
  presetRanges?: PresetRangesConfig
  /**
   * Disable the picker
   * @default false
   */
  isDisabled?: boolean
  /**
   * Date constraints (maxDate, minDate, disabledDates)
   * Accepts Day objects, Date objects, date strings, or timestamps
   */
  constraints?: CalendarConstraintsInput
  /**
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string
  /**
   * Custom CSS class for input
   */
  inputClass?: string
  /**
   * Custom CSS class for calendar modal
   */
  calenderModalClass?: string
  /**
   * Auto-close calendar after selection
   * @default true
   */
  autoClose?: boolean
  /**
   * Input element ID
   */
  inputId?: string
  /**
   * Custom date format string
   * Supports tokens:
   * - Date: YYYY (year), MM (month), DD (day)
   * - Time: HH (24-hour), hh (12-hour), mm (minutes), ss (seconds), A (AM/PM), a (am/pm)
   * Supports custom separators and order
   * Examples: "DD/MM/YYYY", "MM-DD-YYYY HH:mm", "YYYY년 MM월 DD일 hh:mm A"
   * @default undefined (uses default format: YYYY/MM/DD)
   */
  dateFormat?: string
  /**
   * Time format: '12' for 12-hour format, '24' for 24-hour format
   * Only applies when withTime is true
   * @default '24'
   */
  timeFormat?: '12' | '24'
}

/**
 * DtPicker Component
 *
 * A date picker with input field that opens a modal calendar.
 *
 * @example
 * ```tsx
 * import { DtPicker } from 'react-calendar-datetime-picker'
 *
 * function App() {
 *   const [date, setDate] = useState(null)
 *   return <DtPicker onChange={setDate} local="en" />
 * }
 * ```
 */
export const DtPicker: React.FC<DtPickerProps> = (props) => {
  const {
    initValue,
    onChange,
    type = 'single',
    withTime = false,
    showTimeInput = false,
    local = 'en',
    showWeekend = false,
    clearBtn = false,
    isRequired = false,
    todayBtn = false,
    presetRanges,
    isDisabled = false,
    constraints: constraintsInput,
    placeholder = 'Select date',
    inputClass,
    calenderModalClass,
    autoClose = true,
    inputId,
    dateFormat,
    timeFormat = '24'
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Use calendar picker hook for shared calendar logic
  const { state, actions, constraints, displayValue } = useCalendarPicker(
    initValue,
    onChange,
    type,
    local,
    withTime,
    constraintsInput,
    showTimeInput,
    autoClose,
    () => setIsOpen(false),
    dateFormat,
    timeFormat
  )

  // Use modal position hook
  const { modalPosition } = useModalPosition(inputRef, modalRef, isOpen, local)

  // Use click outside hook
  useClickOutside(isOpen, pickerRef, modalRef, () => setIsOpen(false))

  // Use escape key hook
  useEscapeKey(isOpen, () => setIsOpen(false))

  // Use focus trap hook for modal
  useFocusTrap({
    containerRef: modalRef as React.RefObject<HTMLElement>,
    enabled: isOpen,
    autoFocus: true,
    restoreFocus: true
  })

  // Handle input click
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isDisabled) {
      setIsOpen((prev) => !prev)
    }
  }

  // Handle input keydown (Enter to open)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isDisabled && !isOpen) {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  // Handle clear button
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    actions.clearSelection()
    setIsOpen(false)
  }

  const inputWrapperClass = `calendar-picker-input-wrapper ${inputClass || ''}`
  const modalClass = `calendar-picker-modal ${calenderModalClass || ''}`
  const isRTL = local === 'fa'

  return (
    <div
      ref={pickerRef}
      className='calendar-picker'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={inputWrapperClass}>
        <input
          ref={inputRef}
          id={inputId}
          type='text'
          readOnly
          value={displayValue}
          placeholder={placeholder}
          disabled={isDisabled}
          required={isRequired}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          className='calendar-picker-input'
          aria-label={placeholder || 'Select date'}
          aria-haspopup='dialog'
          aria-expanded={isOpen}
        />
        {clearBtn && state.selectedValue && (
          <button
            type='button'
            onClick={handleClear}
            className='calendar-picker-clear'
            aria-label='Clear selection'
          >
            ×
          </button>
        )}
        <button
          type='button'
          onClick={handleInputClick}
          disabled={isDisabled}
          className='calendar-picker-toggle'
          aria-label='Open calendar'
        >
          📅
        </button>
      </div>

      {isOpen && (
        <div
          ref={modalRef}
          className={modalClass}
          role='dialog'
          aria-modal='true'
          aria-label={
            type === 'range'
              ? 'Select date range'
              : type === 'multi'
                ? 'Select multiple dates'
                : type === 'week'
                  ? 'Select week'
                  : 'Select date'
          }
          style={{
            position: 'fixed',
            top: modalPosition ? `${modalPosition.top}px` : '-9999px',
            left: modalPosition ? `${modalPosition.left}px` : '-9999px',
            zIndex: 1000,
            visibility: modalPosition ? 'visible' : 'hidden'
          }}
        >
          <CalendarCore
            selectedValue={state.selectedValue}
            displayMonth={state.displayMonth}
            currentView={state.currentView}
            locale={local}
            type={type}
            withTime={withTime}
            timeFormat={timeFormat}
            showWeekend={showWeekend}
            todayBtn={todayBtn}
            enlargeSelectedDay={true}
            constraints={constraints}
            onDateSelect={actions.selectDate}
            onTimeChange={actions.updateTime}
            onMonthSelect={actions.selectMonth}
            onYearSelect={actions.selectYear}
            onViewChange={actions.setView}
            onMonthNavigate={actions.navigateMonth}
            onGoToToday={actions.goToToday}
            presetRanges={presetRanges}
            onPresetRangeSelect={(range: Range) => {
              if (type === 'range') {
                actions.selectPresetRange(range)
              } else if (type === 'week') {
                actions.selectDate(range.from)
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

DtPicker.displayName = 'DtPicker'
