import React, { useMemo, ReactNode, useCallback } from 'react'
import type { Day, Range, Multi, RangeDate } from '../types'
import type {
  CalendarSelectionSingle,
  CalendarSelectionRange,
  CalendarSelectionMulti,
  CalendarSelectionWeek,
  SharedCalendarProps
} from '../types/calendar'
import { CalendarCore } from './CalendarCore'
import { DtPickerTrigger } from './DtPickerTrigger'
import {
  useCalendarPicker,
  useModalPosition,
  useCalendarSetup,
  useCalendarCallbacks,
  useModalState,
  useCalendarErrorHandling
} from '../hooks'
import { normalizeConstraintsProps } from '../utils/constraints'
import { normalizeInitValueWithErrors } from '../utils/normalize'
import { detectTimeFormatFromDateFormat } from '../utils/formatting'

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
  /**
   * Custom trigger element to replace the default input field
   * When provided, the input field will not be rendered
   */
  triggerElement?: ReactNode
  /**
   * Custom CSS class for trigger wrapper when using custom trigger
   */
  triggerClass?: string
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
 *   return <DtPicker onChange={setDate} calendarSystem="gregorian" />
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
    calendarSystem = 'gregorian',
    showWeekend = false,
    weekStart,
    clearBtn = false,
    todayBtn = false,
    presetRanges,
    isDisabled = false,
    constraints: constraintsInput,
    placeholder = 'Select date',
    inputClass,
    triggerElement,
    triggerClass,
    calenderModalClass,
    autoClose = true,
    inputId,
    dateFormat,
    numberOfMonths = 1,
    locale,
    customization,
    dark = false,
    yearListStyle = 'grid',
    enlargeSelectedDay = true,
    onDateSelect,
    onMonthSelect,
    onYearSelect,
    onViewChange,
    onMonthNavigate,
    onGoToToday,
    onError
  } = props

  // 🎯 Use consolidated calendar setup hook
  const {
    normalizedCalendarSystem,
    effectiveLocale,
    translations,
    effectiveWeekStart
  } = useCalendarSetup(calendarSystem, locale, weekStart, customization)

  // 🎯 Use modal state hook (encapsulates all modal behavior)
  const {
    isOpen,
    handlers: modalHandlers,
    refs: { pickerRef, modalRef }
  } = useModalState()

  // Create wrapper refs for trigger
  const inputRef = useMemo(() => React.createRef<HTMLInputElement>(), [])
  const triggerRef = useMemo(() => React.createRef<HTMLElement>(), [])

  // Normalize constraints props with error tracking
  const constraintsResult = useMemo(
    () =>
      normalizeConstraintsProps(
        constraintsInput,
        normalizedCalendarSystem,
        type
      ),
    [constraintsInput, normalizedCalendarSystem, type]
  )
  const { constraints, errors: constraintsErrors } = constraintsResult

  // Normalize initValue upfront for proper initial state with error tracking
  const initValueResult = useMemo(
    () =>
      normalizeInitValueWithErrors(
        initValue,
        normalizedCalendarSystem,
        type,
        'initValue'
      ),
    [initValue, normalizedCalendarSystem, type]
  )
  // Extract only errors - value is normalized by useCalendarPicker internally
  const initValueErrors = initValueResult.errors

  // 🎯 Use error handling hook
  useCalendarErrorHandling(constraintsErrors, initValueErrors, onError)

  // Detect time format from dateFormat string
  const timeFormat = detectTimeFormatFromDateFormat(dateFormat)

  // Use calendar picker hook for shared calendar logic
  const { state, actions, displayValue } = useCalendarPicker(
    initValue,
    onChange as (
      normalizedValue: Day | Range | Multi | null,
      jsDateValue: Date | RangeDate | Date[] | null,
      formattedString: string | null
    ) => void,
    type,
    normalizedCalendarSystem,
    withTime,
    constraintsInput,
    showTimeInput,
    autoClose,
    modalHandlers.close,
    dateFormat,
    numberOfMonths,
    translations
  )

  // 🎯 Use consolidated calendar callbacks hook
  const {
    handleDateSelect,
    handleMonthSelect,
    handleYearSelect,
    handleViewChange,
    handleMonthNavigate,
    handleGoToToday,
    handlePresetRangeSelect
  } = useCalendarCallbacks({
    actions,
    onDateSelect,
    onMonthSelect,
    onYearSelect,
    onViewChange,
    onMonthNavigate,
    onGoToToday,
    type
  })

  // Use modal position hook
  const { modalPosition } = useModalPosition(
    triggerRef,
    modalRef,
    isOpen,
    normalizedCalendarSystem
  )

  // Handle trigger click (works for both input and custom trigger)
  const handleTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!isDisabled) {
        modalHandlers.toggle()
      }
    },
    [isDisabled, modalHandlers]
  )

  // Handle input keydown (Enter to open)
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isDisabled && !isOpen) {
        e.preventDefault()
        modalHandlers.open()
      }
    },
    [isDisabled, isOpen, modalHandlers]
  )

  // Handle clear button
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      actions.clearSelection()
      modalHandlers.close()
    },
    [actions, modalHandlers]
  )

  const modalClass = `calendar-picker-modal ${calenderModalClass || ''}`
  const isRTL = normalizedCalendarSystem === 'jalali'

  return (
    <div
      ref={pickerRef}
      className='calendar-picker'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <DtPickerTrigger
        triggerElement={triggerElement}
        displayValue={displayValue}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isOpen={isOpen}
        clearBtn={clearBtn}
        hasSelectedValue={!!state.selectedValue}
        onTriggerClick={handleTriggerClick}
        onInputKeyDown={handleInputKeyDown}
        onClear={handleClear}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
        triggerRef={triggerRef as React.RefObject<HTMLElement>}
        inputId={inputId}
        inputClass={inputClass}
        triggerClass={triggerClass}
        translationsClear={translations.labels.clear}
        customization={customization}
      />

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
          data-theme={dark ? 'dark' : undefined}
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
            calendarSystem={normalizedCalendarSystem}
            locale={effectiveLocale}
            translations={translations}
            type={type}
            withTime={withTime}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            showWeekend={showWeekend}
            weekStart={effectiveWeekStart}
            todayBtn={todayBtn}
            enlargeSelectedDay={enlargeSelectedDay}
            constraints={constraints}
            customization={customization}
            numberOfMonths={numberOfMonths}
            yearListStyle={yearListStyle}
            onDateSelect={handleDateSelect}
            onTimeChange={actions.updateTime}
            onMonthSelect={handleMonthSelect}
            onYearSelect={handleYearSelect}
            onViewChange={handleViewChange}
            onMonthNavigate={handleMonthNavigate}
            onGoToToday={handleGoToToday}
            presetRanges={presetRanges}
            onPresetRangeSelect={handlePresetRangeSelect}
          />
        </div>
      )}
    </div>
  )
}

DtPicker.displayName = 'DtPicker'
