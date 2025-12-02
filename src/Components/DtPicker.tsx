import React, { useState, useRef } from 'react'
import type { Day, Range, Multi } from '../types'
import type {
  CalendarSelectionSingle,
  CalendarSelectionRange,
  CalendarSelectionMulti,
  CalendarSelectionWeek,
  SharedCalendarProps
} from '../types/calendar'
import { CalendarCore } from './CalendarCore'
import {
  useCalendarPicker,
  useModalPosition,
  useClickOutside,
  useEscapeKey,
  useFocusTrap
} from '../hooks'

interface DtPickerPropsBase extends SharedCalendarProps {
  /**
   * Show time in input field
   * @default false
   */
  showTimeInput?: boolean
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
   * Disable the picker
   * @default false
   */
  isDisabled?: boolean
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
   * Auto-close calendar after selection
   * @default true
   */
  autoClose?: boolean
  /**
   * Input element ID
   */
  inputId?: string
}

export interface DtPickerPropsSingle
  extends DtPickerPropsBase, CalendarSelectionSingle {}

export interface DtPickerPropsRange
  extends DtPickerPropsBase, CalendarSelectionRange {}

export interface DtPickerPropsMulti
  extends DtPickerPropsBase, CalendarSelectionMulti {}

export interface DtPickerPropsWeek
  extends DtPickerPropsBase, CalendarSelectionWeek {}

export type DtPickerProps =
  | DtPickerPropsSingle
  | DtPickerPropsRange
  | DtPickerPropsMulti
  | DtPickerPropsWeek

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
    timeFormat = '24',
    numberOfMonths = 1,
    customization
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Use calendar picker hook for shared calendar logic
  const { state, actions, constraints, displayValue } = useCalendarPicker(
    initValue,
    // Cast onChange to broader type for internal compatibility
    onChange as (date: Day | Range | Multi | null) => void,
    type,
    local,
    withTime,
    constraintsInput,
    showTimeInput,
    autoClose,
    () => setIsOpen(false),
    dateFormat,
    timeFormat,
    numberOfMonths
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
            customization={customization}
            numberOfMonths={numberOfMonths}
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
