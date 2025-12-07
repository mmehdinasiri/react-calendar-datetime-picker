import React from 'react'

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
export const DtPickerTrigger: React.FC<DtPickerTriggerProps> = ({
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
  translationsClear
}) => {
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
        📅
      </button>
    </div>
  )
}

DtPickerTrigger.displayName = 'DtPickerTrigger'
