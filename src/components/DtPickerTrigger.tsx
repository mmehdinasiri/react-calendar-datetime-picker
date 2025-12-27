import React from 'react'
import type { CalendarCustomization } from '../types/calendar'

// Default calendar icon SVG component
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      d='M3 6h10M5.5 1v3M10.5 1v3M3.5 4h9c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

/**
 * Props for DtPickerTrigger component
 */
export interface DtPickerTriggerProps {
  /** Custom trigger element (replaces default input) */
  triggerElement?: React.ReactNode
  /** Display value in input field */
  displayValue: string
  /** Placeholder text */
  placeholder: string
  /** Whether input is disabled */
  isDisabled: boolean
  /** Whether modal is open */
  isOpen: boolean
  /** Show clear button */
  clearBtn: boolean
  /** Whether there is a selected value to clear */
  hasSelectedValue: boolean
  /** Click handler for trigger */
  onTriggerClick: (e: React.MouseEvent) => void
  /** Key down handler for input */
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** Clear button click handler */
  onClear: (e: React.MouseEvent) => void
  /** Input element ref */
  inputRef: React.RefObject<HTMLInputElement>
  /** Trigger wrapper ref (custom or input) */
  triggerRef: React.RefObject<HTMLElement>
  /** Input element ID */
  inputId?: string
  /** Custom CSS class for input wrapper */
  inputClass?: string
  /** Custom CSS class for trigger wrapper (when using custom trigger) */
  triggerClass?: string
  /** Translation for clear button label */
  translationsClear: string
  /** Customization options (for custom calendar icon) */
  customization?: CalendarCustomization
}

/**
 * DtPickerTrigger Component
 *
 * Handles rendering of the calendar picker trigger element.
 * Supports both:
 * 1. Default input field with calendar icon and clear button
 * 2. Custom trigger element passed by user
 *
 * @example
 * ```tsx
 * // Default input trigger
 * <DtPickerTrigger
 *   displayValue="2025-01-01"
 *   placeholder="Select date"
 *   onTriggerClick={handleClick}
 *   // ... other props
 * />
 *
 * // Custom trigger element
 * <DtPickerTrigger
 *   triggerElement={<CustomButton />}
 *   onTriggerClick={handleClick}
 *   // ... other props
 * />
 * ```
 */
const DtPickerTriggerInner: React.FC<DtPickerTriggerProps> = ({
  triggerElement,
  displayValue,
  placeholder,
  isDisabled,
  isOpen,
  clearBtn,
  hasSelectedValue,
  onTriggerClick,
  onInputKeyDown,
  onClear,
  inputRef,
  triggerRef,
  inputId,
  inputClass,
  triggerClass,
  translationsClear,
  customization
}) => {
  // Get custom calendar icon from customization, or use default
  const CalendarIconComponent = customization?.icons?.calendar || CalendarIcon
  // Render custom trigger element
  if (triggerElement) {
    return (
      <div
        ref={triggerRef as React.RefObject<HTMLDivElement>}
        className={triggerClass || ''}
        onClick={onTriggerClick}
        style={{
          display: 'inline-block',
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        }}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        tabIndex={0}
        role='button'
      >
        {triggerElement}
      </div>
    )
  }

  // Render default input trigger
  const inputWrapperClass = `calendar-picker-input-wrapper ${inputClass || ''}`

  return (
    <div className={inputWrapperClass}>
      <input
        ref={(el) => {
          if (el) {
            inputRef.current = el
            triggerRef.current = el
          }
        }}
        id={inputId}
        type='text'
        readOnly
        value={displayValue}
        placeholder={placeholder}
        disabled={isDisabled}
        onClick={onTriggerClick}
        onKeyDown={onInputKeyDown}
        className='calendar-picker-input'
        aria-label={placeholder || 'Select date'}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
      />
      {clearBtn && hasSelectedValue && (
        <button
          type='button'
          onClick={onClear}
          className='calendar-picker-clear'
          aria-label={translationsClear}
        >
          <span>×</span>
        </button>
      )}
      <button
        type='button'
        onClick={onTriggerClick}
        disabled={isDisabled}
        className='calendar-picker-toggle'
        aria-label='Open calendar'
      >
        <CalendarIconComponent className='calendar-picker-icon' />
      </button>
    </div>
  )
}

// 🟢 Memoize component to prevent unnecessary re-renders
export const DtPickerTrigger = React.memo(
  DtPickerTriggerInner,
  (prevProps, nextProps) => {
    // Return TRUE if props are equal (skip re-render)
    // Note: refs are excluded from comparison as they are stable references
    return (
      prevProps.triggerElement === nextProps.triggerElement &&
      prevProps.displayValue === nextProps.displayValue &&
      prevProps.placeholder === nextProps.placeholder &&
      prevProps.isDisabled === nextProps.isDisabled &&
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.clearBtn === nextProps.clearBtn &&
      prevProps.hasSelectedValue === nextProps.hasSelectedValue &&
      prevProps.onTriggerClick === nextProps.onTriggerClick &&
      prevProps.onInputKeyDown === nextProps.onInputKeyDown &&
      prevProps.onClear === nextProps.onClear &&
      prevProps.inputId === nextProps.inputId &&
      prevProps.inputClass === nextProps.inputClass &&
      prevProps.triggerClass === nextProps.triggerClass &&
      prevProps.translationsClear === nextProps.translationsClear &&
      prevProps.customization === nextProps.customization
    )
  }
)

DtPickerTrigger.displayName = 'DtPickerTrigger'
