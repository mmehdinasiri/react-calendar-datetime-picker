'use client'

import React, { useState, useRef } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { ExampleConfig } from '../examples/examplesConfig'
import type { InitValueInput, RangeDate } from '../../../src/types'
import { useTheme } from '../contexts/ThemeContext'
import { Note } from './Note'

interface ExampleRendererProps {
  config: ExampleConfig
  exampleKey: string
  category?: string
  showFullOutput?: boolean
}

export const ExampleRenderer: React.FC<ExampleRendererProps> = ({
  config,
  exampleKey,
  category,
  showFullOutput = false
}) => {
  const { theme } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<
    InitValueInput | undefined
  >(config.props?.initValue as InitValueInput | undefined)
  const [jsDateValue, setJsDateValue] = useState<
    Date | RangeDate | Date[] | null
  >(null)
  const [formattedString, setFormattedString] = useState<string | null>(null)
  const [errors, setErrors] = useState<any[]>([])
  // For error examples, track dynamic initValue and constraints
  const [errorInitValue, setErrorInitValue] = useState<
    InitValueInput | undefined
  >(undefined)
  const [errorConstraints, setErrorConstraints] = useState<any>(undefined)
  // Create handleChange with optional parameters (like in examples project)
  // The component will call it with three parameters via useCalendarState
  const handleChange = (
    normalizedValue: unknown,
    jsDate?: Date | RangeDate | Date[] | null,
    formattedString?: string | null
  ) => {
    setSelectedValue(normalizedValue as InitValueInput | undefined)
    if (showFullOutput) {
      // The component should always call with three parameters via useCalendarState
      // Handle both undefined (not provided) and null (explicitly null) cases
      setJsDateValue(jsDate !== undefined ? jsDate : null)
      setFormattedString(formattedString !== undefined ? formattedString : null)
    }
    if (config.showConsoleLog) {
      if (config.title === 'onDateSelect Callback') {
        console.log('onChange - Final value:', normalizedValue)
      } else {
        console.log('onChange:', normalizedValue)
        if (showFullOutput) {
          console.log('  - JavaScript Date:', jsDate)
          console.log('  - Formatted String:', formattedString)
        }
      }
    }
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const numberOfMonths = config.props?.numberOfMonths as number | undefined
  const baseWrapperClass = config.wrapper || 'calendar-container'
  // Add wider container class for multiple months
  let wrapperClass = baseWrapperClass
  if (numberOfMonths && numberOfMonths > 1) {
    if (numberOfMonths >= 3) {
      wrapperClass = `${baseWrapperClass} calendar-three-months`
    } else {
      wrapperClass = `${baseWrapperClass} calendar-multiple-months`
    }
  }

  // Check if this is a theme example (has custom theme classes)
  const isThemeExample =
    baseWrapperClass.includes('calendar-blue-theme') ||
    baseWrapperClass.includes('calendar-dark-custom-theme') ||
    (typeof config.props?.calenderModalClass === 'string' &&
      (config.props.calenderModalClass.includes('calendar-dark-custom-theme') ||
        config.props.calenderModalClass.includes('calendar-blue-theme')))

  // Extract props, ensuring boolean props are passed correctly
  const booleanPropNames = [
    'todayBtn',
    'showWeekend',
    'withTime',
    'dark',
    'clearBtn',
    'showTimeInput',
    'enlargeSelectedDay'
  ]

  const componentProps: Record<string, unknown> = {}

  // Copy all props except boolean ones
  // Note: React component references in customization.icons are preserved
  Object.keys(config.props || {}).forEach((key) => {
    if (!booleanPropNames.includes(key)) {
      componentProps[key] = config.props![key]
    }
  })

  // Explicitly pass boolean props if they exist
  booleanPropNames.forEach((propName) => {
    if (Object.prototype.hasOwnProperty.call(config.props || {}, propName)) {
      componentProps[propName] = config.props![propName]
    }
  })

  // Automatically apply theme from context unless:
  // 1. The example explicitly sets the dark prop (allows override)
  // 2. It's a theme example with custom theme classes
  if (
    !isThemeExample &&
    !Object.prototype.hasOwnProperty.call(config.props || {}, 'dark')
  ) {
    componentProps.dark = theme === 'dark'
  }

  // Ensure locale is set for proper translations (needed for formatted string generation)
  // This ensures useCalendarSetup generates translations which are needed for formatting
  if (!componentProps.locale) {
    // Default to 'en' if not specified, so translations are generated
    componentProps.locale = 'en'
  }

  // Get the component's type prop to create a properly typed onChange
  const componentType =
    (componentProps.type as 'single' | 'range' | 'multi' | 'week') || 'single'

  // Create a properly typed onChange handler
  // IMPORTANT: We need to wrap handleChange to ensure it receives all three parameters
  // Even though handleChange has optional parameters, we need to explicitly accept three
  // to match the discriminated union type that the component expects
  const typedOnChange = showFullOutput
    ? (((normalizedValue: any, jsDate: any, formattedString: any) => {
        // Call handleChange with all three parameters
        handleChange(normalizedValue, jsDate, formattedString)
      }) as any)
    : (((normalizedValue: any) => {
        // For non-full-output examples, only pass first parameter
        handleChange(normalizedValue, null, null)
      }) as any)

  // Remove any existing onChange from componentProps to ensure we use our typedOnChange
  // This is important because the component expects onChange to match the discriminated union type
  delete componentProps.onChange

  // Inject onError handler for error handling examples
  // Check if this is an error handling example by title or category
  const isErrorExample =
    config.title.includes('Error') ||
    config.title.includes('Invalid') ||
    category?.toLowerCase().includes('error')

  // Handle interactive examples (min/max date testing)
  if (config.title.includes('Min/Max Date with Interactive Testing')) {
    // Use dynamic initValue for interactive testing
    // The calendar library will automatically reject dates outside constraints
    if (errorInitValue !== undefined) {
      componentProps.initValue = errorInitValue
    }
  }

  if (isErrorExample) {
    // Remove existing onError from props and use our own
    delete componentProps.onError
    // Use dynamic values for error examples
    componentProps.initValue = errorInitValue
    // Use errorConstraints if set, otherwise fall back to original constraints from config
    componentProps.constraints =
      errorConstraints !== undefined
        ? errorConstraints
        : config.props?.constraints
    componentProps.onError = (errors: any[]) => {
      setErrors(errors)
      if (config.showConsoleLog) {
        // Match the console log format from example code
        if (
          config.title.includes('Invalid Initial Value') &&
          !config.title.includes('DtPicker')
        ) {
          console.log('Validation errors:', errors)
          errors.forEach((error) => {
            console.log(`${error.field}: ${error.message}`)
          })
        } else if (
          config.title.includes('Error Handling with Custom Validation')
        ) {
          console.error('Calendar errors:', errors)
        } else {
          console.log('Errors:', errors)
        }
      }
      // Show alert for Invalid Constraints example (DtCalendar only)
      if (
        config.title.includes('Invalid Constraints') &&
        !config.title.includes('DtPicker')
      ) {
        if (errors.length > 0) {
          alert(
            `Found ${errors.length} error(s):\n` +
              errors.map((e) => `${e.field}: ${e.message}`).join('\n')
          )
        }
      }
    }
  }

  // Inject callbacks for examples that need them
  if (config.showConsoleLog) {
    if (config.title === 'View & Navigation Callbacks') {
      componentProps.onViewChange = (view: string) =>
        console.log('View changed:', view)
      componentProps.onMonthNavigate = (dir: string) =>
        console.log('Month navigated:', dir)
      componentProps.onMonthSelect = (month: number) =>
        console.log('Month selected:', month)
      componentProps.onYearSelect = (year: number) =>
        console.log('Year selected:', year)
    } else if (config.title === 'onDateSelect Callback') {
      componentProps.onDateSelect = (day: any) =>
        console.log('onDateSelect - Raw day clicked:', day)
      // Note: We don't override onChange here anymore since we handle it via typedOnChange
    } else if (config.title === 'onGoToToday Callback') {
      componentProps.onGoToToday = () =>
        console.log('Go to today button clicked')
    }
  }

  // Get utility results if available
  const utilityResults = config.getUtilityResults?.(
    selectedValue &&
      !Array.isArray(selectedValue) &&
      !('from' in (selectedValue as object))
      ? (selectedValue as any)
      : null
  )

  // Helper function to convert example key to URL-friendly format
  const toKebabCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

  // Remove wrapper styling for customization examples
  const isCustomizationCategory =
    category &&
    [
      'Custom Trigger Elements',
      'Themes',
      'CSS Variables',
      'Year List Style',
      'Custom CSS Classes',
      'Custom Icons'
    ].includes(category)

  return (
    <section
      id={
        category
          ? `${toKebabCase(category)}-${toKebabCase(exampleKey)}`
          : toKebabCase(exampleKey)
      }
      className={
        isCustomizationCategory
          ? 'mb-8'
          : 'bg-bg-secondary rounded-lg border border-border p-8 mb-8'
      }
    >
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          {config.title}
        </h2>
        {config.description && (
          <p className='text-gray-700 dark:text-gray-300'>
            {config.description}
          </p>
        )}
      </div>

      <div
        className={
          numberOfMonths && numberOfMonths > 1
            ? 'space-y-8'
            : 'grid grid-cols-1 lg:grid-cols-2 gap-8'
        }
      >
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Component
          </h3>
          {/* Error trigger buttons for error handling examples and interactive examples */}
          {(isErrorExample ||
            config.title.includes('Min/Max Date with Interactive Testing')) && (
            <div className='mb-4 space-y-2'>
              <div className='flex flex-wrap gap-2'>
                {config.title.includes('Invalid Initial Value') &&
                  !config.title.includes('DtPicker') && (
                    <>
                      <button
                        onClick={() => {
                          // Clear errors and reset to undefined first
                          setErrors([])
                          setErrorInitValue(undefined)
                          // Then set invalid value - this ensures React sees it as a change
                          requestAnimationFrame(() => {
                            setErrorInitValue('invalid-date-string')
                          })
                        }}
                        className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Set Invalid InitValue: "invalid-date-string"
                      </button>
                      <button
                        onClick={() => {
                          setErrorInitValue(undefined)
                          setErrors([])
                        }}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Clear (Valid State)
                      </button>
                    </>
                  )}
                {config.title.includes('Invalid Constraints') &&
                  !config.title.includes('DtPicker') && (
                    <>
                      <button
                        onClick={() => {
                          setErrors([])
                          setErrorConstraints(undefined)
                          requestAnimationFrame(() => {
                            // Use a future maxDate so dates aren't all disabled
                            const futureDate = new Date()
                            futureDate.setFullYear(futureDate.getFullYear() + 1)
                            setErrorConstraints({
                              minDate: 'not-a-date',
                              maxDate: futureDate
                            })
                          })
                        }}
                        className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Set Invalid Constraints: minDate="not-a-date"
                      </button>
                      <button
                        onClick={() => {
                          setErrorConstraints(undefined)
                          setErrors([])
                        }}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Clear (Valid State)
                      </button>
                    </>
                  )}
                {config.title.includes('Invalid Range Value') && (
                  <>
                    <button
                      onClick={() => {
                        setErrors([])
                        setErrorInitValue(undefined)
                        requestAnimationFrame(() => {
                          setErrorInitValue({
                            from: 'invalid',
                            to: new Date('2024-12-31')
                          })
                        })
                      }}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Set Invalid Range: from="invalid"
                    </button>
                    <button
                      onClick={() => {
                        setErrorInitValue(undefined)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Clear (Valid State)
                    </button>
                  </>
                )}
                {config.title.includes(
                  'Min/Max Date with Interactive Testing'
                ) && (
                  <>
                    <button
                      onClick={() => {
                        // Set a date within the range (15th of current month)
                        const now = new Date()
                        const year = now.getFullYear()
                        const month = now.getMonth()
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-15`
                        setErrorInitValue(dateStr)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Set Date in Range: 15th (Current Month)
                    </button>
                    <button
                      onClick={() => {
                        // Try to set a date before minDate (5th of current month)
                        const now = new Date()
                        const year = now.getFullYear()
                        const month = now.getMonth()
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-05`
                        // Set the date - the calendar will reject it if outside range
                        setErrorInitValue(dateStr)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Try Set Date Before Min: 5th (Current Month)
                    </button>
                    <button
                      onClick={() => {
                        // Try to set a date after maxDate (30th of current month)
                        const now = new Date()
                        const year = now.getFullYear()
                        const month = now.getMonth()
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-30`
                        // Set the date - the calendar will reject it if outside range
                        setErrorInitValue(dateStr)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Try Set Date After Max: 30th (Current Month)
                    </button>
                    <button
                      onClick={() => {
                        setErrorInitValue(undefined)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Clear Selection
                    </button>
                    <div className='mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm'>
                      <strong className='text-blue-900 dark:text-blue-200'>
                        Note:
                      </strong>{' '}
                      <span className='text-blue-800 dark:text-blue-300'>
                        Dates outside the min/max range (10th - 25th of current
                        month) will be disabled in the calendar. When you try to
                        set a date outside this range, the calendar will reject
                        it and show no selection. You can see dates before the
                        10th and after the 25th grayed out in the same month
                        view.
                      </span>
                    </div>
                  </>
                )}
                {config.title.includes('Complete Error Handling') &&
                  !config.title.includes('Invalid Initial Value') &&
                  !config.title.includes('Invalid Constraints') && (
                    <>
                      <button
                        onClick={() => {
                          setErrors([])
                          setErrorInitValue(undefined)
                          requestAnimationFrame(() => {
                            setErrorInitValue('invalid-date')
                          })
                        }}
                        className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Set Invalid InitValue: "invalid-date"
                      </button>
                      <button
                        onClick={() => {
                          setErrors([])
                          setErrorConstraints(undefined)
                          requestAnimationFrame(() => {
                            // Use a future maxDate so dates aren't all disabled
                            const futureDate = new Date()
                            futureDate.setFullYear(futureDate.getFullYear() + 1)
                            setErrorConstraints({
                              minDate: 'not-a-date',
                              maxDate: futureDate
                            })
                          })
                        }}
                        className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Set Invalid Constraints: minDate="not-a-date"
                      </button>
                      <button
                        onClick={() => {
                          setErrorInitValue(undefined)
                          setErrorConstraints(undefined)
                          setErrors([])
                        }}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                      >
                        Clear All (Valid State)
                      </button>
                    </>
                  )}
                {config.title.includes(
                  'Error Handling with Custom Validation'
                ) && (
                  <>
                    <button
                      onClick={() => {
                        setErrors([])
                        setErrorConstraints(undefined)
                        requestAnimationFrame(() => {
                          // Use a future maxDate so dates aren't all disabled
                          const futureDate = new Date()
                          futureDate.setFullYear(futureDate.getFullYear() + 1)
                          setErrorConstraints({
                            minDate: 'not-a-date',
                            maxDate: futureDate,
                            isDateDisabled: (day: any) => {
                              // Keep custom validation for weekends
                              const date = new Date(
                                day.year,
                                day.month - 1,
                                day.day
                              )
                              const dayOfWeek = date.getDay()
                              return dayOfWeek === 0 || dayOfWeek === 6
                            }
                          })
                        })
                      }}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Set Invalid Constraints: minDate="not-a-date"
                    </button>
                    <button
                      onClick={() => {
                        setErrors([])
                        setErrorInitValue(undefined)
                        requestAnimationFrame(() => {
                          setErrorInitValue('invalid-date')
                        })
                      }}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Set Invalid InitValue: "invalid-date"
                    </button>
                    <button
                      onClick={() => {
                        setErrorInitValue(undefined)
                        setErrorConstraints(undefined)
                        setErrors([])
                      }}
                      className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors'
                    >
                      Clear All (Valid State with Custom Validation)
                    </button>
                    <div className='mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm'>
                      <strong className='text-blue-900 dark:text-blue-200'>
                        Key Point:
                      </strong>{' '}
                      <span className='text-blue-800 dark:text-blue-300'>
                        Notice that even when you set invalid constraints, the
                        custom weekend validation (isDateDisabled) continues to
                        work. Weekends remain disabled regardless of constraint
                        errors.
                      </span>
                    </div>
                  </>
                )}
              </div>
              {/* Show current state */}
              <div className='text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1'>
                {errorInitValue !== undefined &&
                  config.title.includes(
                    'Min/Max Date with Interactive Testing'
                  ) && (
                    <div>
                      InitValue:{' '}
                      {(() => {
                        // Check if date is within valid range
                        const dateStr = String(errorInitValue)
                        // Parse date string (e.g., '2024-06-15') to Date object
                        // Date strings in YYYY-MM-DD format are parsed as UTC midnight
                        const date = new Date(dateStr)

                        // Get current month constraints
                        const now = new Date()
                        const currentYear = now.getFullYear()
                        const currentMonth = now.getMonth()
                        const minDate = new Date(
                          currentYear,
                          currentMonth,
                          10,
                          0,
                          0,
                          0,
                          0
                        )
                        const maxDate = new Date(
                          currentYear,
                          currentMonth,
                          25,
                          23,
                          59,
                          59,
                          999
                        )

                        // Compare dates by converting to local date strings (YYYY-MM-DD)
                        const dateLocal = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        )
                        const minDateLocal = new Date(
                          minDate.getFullYear(),
                          minDate.getMonth(),
                          minDate.getDate()
                        )
                        const maxDateLocal = new Date(
                          maxDate.getFullYear(),
                          maxDate.getMonth(),
                          maxDate.getDate()
                        )

                        const isValid =
                          !isNaN(date.getTime()) &&
                          dateLocal >= minDateLocal &&
                          dateLocal <= maxDateLocal

                        // Format display date nicely
                        const displayDate = date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })

                        return (
                          <code
                            className={
                              isValid
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }
                          >
                            {displayDate}
                            {isValid ? ' ✓ (Valid)' : ' ✗ (Outside Range)'}
                          </code>
                        )
                      })()}
                    </div>
                  )}
                {errorInitValue !== undefined &&
                  !config.title.includes(
                    'Min/Max Date with Interactive Testing'
                  ) && (
                    <div>
                      InitValue:{' '}
                      <code className='text-red-600 dark:text-red-400'>
                        {typeof errorInitValue === 'object' &&
                        errorInitValue !== null
                          ? errorInitValue instanceof Date
                            ? errorInitValue.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : JSON.stringify(errorInitValue)
                          : String(errorInitValue)}
                      </code>
                    </div>
                  )}
                {errorConstraints !== undefined && (
                  <div>
                    Constraints:{' '}
                    <code className='text-red-600 dark:text-red-400'>
                      {errorConstraints.minDate
                        ? `minDate: ${String(errorConstraints.minDate)}`
                        : ''}
                      {errorConstraints.maxDate
                        ? ` maxDate: ${String(errorConstraints.maxDate)}`
                        : ''}
                    </code>
                  </div>
                )}
                {errorInitValue === undefined &&
                  errorConstraints === undefined && (
                    <span className='text-green-600 dark:text-green-400'>
                      ✓ No errors (valid state)
                    </span>
                  )}
                {errors.length > 0 && (
                  <div className='text-red-600 dark:text-red-400 font-medium'>
                    ⚠ {errors.length} error(s) detected - invalid constraints
                    are excluded, dates remain selectable
                  </div>
                )}
              </div>
            </div>
          )}
          <div ref={wrapperRef} className={wrapperClass}>
            <Component {...componentProps} onChange={typedOnChange} />
          </div>
          {/* Display errors visually for Invalid Range Value example only */}
          {isErrorExample &&
            errors.length > 0 &&
            config.title.includes('Invalid Range Value') && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#fee',
                  borderRadius: '4px'
                }}
              >
                <strong style={{ color: '#000' }}>Errors found:</strong>
                <ul>
                  {errors.map((error, i) => (
                    <li key={i} style={{ color: '#000' }}>
                      <strong>{error.field}:</strong> {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Code
          </h3>
          <div className='rounded-lg overflow-hidden border border-border'>
            <SyntaxHighlighter
              language='tsx'
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5'
              }}
            >
              {(() => {
                // Use customCode if provided to completely override generated code
                if (config.customCode) {
                  return config.customCode
                }

                // Helper function to safely stringify values
                const safeStringify = (val: unknown, key: string): string => {
                  // Check if it's a React element
                  if (React.isValidElement(val)) {
                    // For triggerElement, provide a helpful placeholder
                    if (key === 'triggerElement') {
                      return `      ${key}={\n        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>\n          📅 Pick Date\n        </button>\n      }`
                    }
                    return `      ${key}={/* React element */}`
                  }

                  // Check if it's a function
                  if (typeof val === 'function') {
                    return `      ${key}={/* custom function */}`
                  }

                  // Check if it's an object (but not null or array)
                  if (
                    typeof val === 'object' &&
                    val !== null &&
                    !Array.isArray(val)
                  ) {
                    try {
                      // Try to stringify, but handle circular references
                      const seen = new WeakSet()
                      const formatted = JSON.stringify(
                        val,
                        (k, v) => {
                          // Skip React elements and functions
                          if (React.isValidElement(v)) {
                            return '[React Element]'
                          }
                          if (typeof v === 'function') {
                            return '[Function]'
                          }
                          // Handle circular references
                          if (typeof v === 'object' && v !== null) {
                            if (seen.has(v)) {
                              return '[Circular]'
                            }
                            seen.add(v)
                          }
                          return v
                        },
                        2
                      )
                        .split('\n')
                        .map((line, index) =>
                          index === 0 ? line : '        ' + line
                        )
                        .join('\n')
                      return `      ${key}={${formatted}}`
                    } catch (error) {
                      // If stringification fails, provide a placeholder
                      return `      ${key}={/* object with circular reference or unsupported types */}`
                    }
                  }

                  // For arrays and primitives
                  try {
                    return `      ${key}={${JSON.stringify(val)}}`
                  } catch (error) {
                    return `      ${key}={/* cannot stringify */}`
                  }
                }

                const propsCode = Object.entries(config.props || {})
                  .filter(([key]) => key !== 'initValue')
                  .map(([key, value]) => {
                    // Use custom constraintsCode if available
                    if (key === 'constraints' && config.constraintsCode) {
                      return `      ${config.constraintsCode}`
                    }

                    return safeStringify(value, key)
                  })
                  .join('\n')

                // Use showFullOutput prop to determine if we should show three-parameter onChange
                const onChangeCode = showFullOutput
                  ? `      onChange={(normalizedValue, jsDate, formattedString) => {
        setDate(normalizedValue)
        // jsDate: JavaScript Date (always Gregorian)
        // formattedString: Formatted string based on dateFormat
        console.log('Normalized:', normalizedValue)
        console.log('JS Date:', jsDate)
        console.log('Formatted:', formattedString)
      }}`
                  : `      onChange={setDate}`

                return `import { ${config.component} } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(${
    config.props?.initValue ? JSON.stringify(config.props.initValue) : 'null'
  })

  return (
    <${config.component}
${propsCode ? propsCode + '\n' : ''}${onChangeCode}
    />
  )
}`
              })()}
            </SyntaxHighlighter>
          </div>

          {config.utilityCode && (
            <div className='mt-4'>
              <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                Utility Code
              </h4>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='typescript'
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {config.utilityCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
            <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
              Result
            </h4>
            {utilityResults ? (
              <div className='space-y-1 text-sm'>
                {Object.entries(utilityResults).map(([key, value]) => (
                  <div key={key} className='text-gray-700 dark:text-gray-200'>
                    <span className='font-mono text-green-700 dark:text-accent-light'>
                      {key}:
                    </span>{' '}
                    <span className='font-mono'>
                      {typeof value === 'boolean'
                        ? value.toString()
                        : value === null
                          ? 'null'
                          : JSON.stringify(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : showFullOutput ? (
              <div className='space-y-4'>
                <div>
                  <p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                    1️⃣ Normalized Value (Internal Day object):
                  </p>
                  <div className='rounded-lg overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='json'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        padding: '0.75rem'
                      }}
                    >
                      {selectedValue
                        ? JSON.stringify(selectedValue, null, 2)
                        : 'null'}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                    2️⃣ JavaScript Date (Always Gregorian):
                  </p>
                  <div className='rounded-lg overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='json'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        padding: '0.75rem'
                      }}
                    >
                      {jsDateValue === null || jsDateValue === undefined
                        ? 'null'
                        : Array.isArray(jsDateValue)
                          ? JSON.stringify(
                              jsDateValue.map((d) => d.toISOString()),
                              null,
                              2
                            )
                          : jsDateValue instanceof Date
                            ? JSON.stringify(jsDateValue.toISOString(), null, 2)
                            : jsDateValue &&
                                typeof jsDateValue === 'object' &&
                                'from' in jsDateValue
                              ? JSON.stringify(
                                  {
                                    from: jsDateValue.from
                                      ? jsDateValue.from.toISOString()
                                      : null,
                                    to: jsDateValue.to
                                      ? jsDateValue.to.toISOString()
                                      : null
                                  },
                                  null,
                                  2
                                )
                              : 'null'}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
                    3️⃣ Formatted String:
                  </p>
                  <div className='rounded-lg overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='json'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        padding: '0.75rem'
                      }}
                    >
                      {formattedString
                        ? JSON.stringify(formattedString)
                        : 'null'}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className='text-sm text-gray-700 dark:text-gray-200 mb-2'>
                  Selected value:
                </p>
                <div className='rounded-lg overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='json'
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      padding: '0.75rem'
                    }}
                  >
                    {selectedValue
                      ? JSON.stringify(selectedValue, null, 2)
                      : 'null'}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>

          {config.showConsoleLog && (
            <Note>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> Check the browser console to see onChange
                logs
              </p>
            </Note>
          )}
        </div>
      </div>
    </section>
  )
}
