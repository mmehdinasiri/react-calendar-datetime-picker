'use client'

import { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  DtPicker,
  dayToString,
  parseAndValidateDate
} from 'react-calendar-datetime-picker'
import type { Day, CalendarSystem } from 'react-calendar-datetime-picker'
import { useTheme } from '../contexts/ThemeContext'

// Custom component that displays the selected date in the input
export function DatePickerWithValueDisplay({
  onChange,
  ...props
}: {
  onChange?: (date: Day | null) => void
  calendarSystem?: CalendarSystem
  [key: string]: any
}) {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Day | null>(null)

  return (
    <DtPicker
      {...props}
      type={props.type || 'single'}
      dark={props.dark !== undefined ? props.dark : theme === 'dark'}
      calendarSystem={props.calendarSystem}
      onChange={(date: Day | null) => {
        setSelectedDate(date)
        onChange?.(date)
      }}
      triggerElement={
        <input
          type='text'
          placeholder='Select a date...'
          value={selectedDate ? dayToString(selectedDate, '/') : ''}
          readOnly
          style={{
            padding: '12px 16px',
            border: '2px solid #28a745',
            borderRadius: '20px',
            fontSize: '16px',
            width: '280px',
            outline: 'none',
            backgroundColor: '#f8fff9',
            color: '#155724',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        />
      }
    />
  )
}

// React Hook Form integration example component
export function ReactHookFormExample() {
  const { theme } = useTheme()
  const { control, handleSubmit, watch } = useForm<{
    birthDate: Day | null
  }>({
    defaultValues: {
      birthDate: null
    }
  })

  const birthDate = watch('birthDate')

  const onSubmit = (data: { birthDate: Day | null }) => {
    console.log('Form submitted:', data)
    alert(
      `Form submitted with date: ${data.birthDate ? dayToString(data.birthDate, '/') : 'No date selected'}`
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          Birth Date
        </label>
        <Controller
          name='birthDate'
          control={control}
          render={({ field }) => (
            <DtPicker
              type='single'
              calendarSystem='gregorian'
              initValue={field.value}
              dark={theme === 'dark'}
              onChange={(date) => {
                field.onChange(date)
                field.onBlur() // Trigger validation on change
              }}
              triggerElement={
                <input
                  type='text'
                  placeholder='Select your birth date...'
                  value={field.value ? dayToString(field.value, '/') : ''}
                  readOnly
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #6366f1',
                    borderRadius: '8px',
                    fontSize: '16px',
                    width: '100%',
                    outline: 'none',
                    backgroundColor: '#f8f9ff',
                    color: '#1e1b4b',
                    fontWeight: '500'
                  }}
                />
              }
            />
          )}
        />
      </div>
      <button
        type='submit'
        className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'
      >
        Submit Form
      </button>
    </form>
  )
}

// Custom component with input and icon - icon opens calendar, input accepts typed dates
export function InputWithIconTrigger({
  onChange,
  ...props
}: {
  onChange?: (date: Day | null) => void
  calendarSystem?: CalendarSystem
  [key: string]: any
}) {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Day | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  // Handle input change - parse and validate date
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)

      // Parse and validate the date string
      const validation = parseAndValidateDate(value, 'gregorian')
      if (validation.success && validation.data) {
        setSelectedDate(validation.data)
        onChange?.(validation.data)
      }
    },
    [onChange]
  )

  // Handle calendar selection
  const handleCalendarChange = useCallback(
    (
      date: Day | null,
      _jsDate: Date | null,
      formattedString: string | null
    ) => {
      setSelectedDate(date)
      setInputValue(formattedString || '')
      onChange?.(date)
    },
    [onChange]
  )

  // Check if input value is valid and get validation result
  const validationResult = inputValue
    ? parseAndValidateDate(inputValue, 'gregorian')
    : null
  const isValid = validationResult?.success ?? null
  const errorMessage =
    validationResult?.success === false ? validationResult.error?.message : null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        maxWidth: '300px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0
          }}
        >
          <input
            type='text'
            placeholder='Type date (YYYY/MM/DD) or click icon'
            value={inputValue}
            onChange={handleInputChange}
            style={{
              width: '100%',
              minWidth: 0,
              padding: '10px 12px',
              border: '2px solid',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              transition: 'border-color 0.2s ease',
              borderColor:
                isValid === true
                  ? '#10b981'
                  : isValid === false
                    ? '#ef4444'
                    : theme === 'dark'
                      ? '#4b5563'
                      : '#d1d5db'
            }}
          />
          {errorMessage && (
            <div
              style={{
                marginTop: '4px',
                fontSize: '12px',
                color: '#ef4444',
                paddingLeft: '4px'
              }}
            >
              {errorMessage}
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0 }}>
          <DtPicker
            {...props}
            type={props.type || 'single'}
            dark={props.dark !== undefined ? props.dark : theme === 'dark'}
            calendarSystem='gregorian'
            initValue={selectedDate}
            onChange={handleCalendarChange}
            triggerElement={
              <button
                type='button'
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  transition: 'background-color 0.2s ease',
                  minWidth: '40px',
                  height: '40px',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                }}
                aria-label='Open calendar'
              >
                📅
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}
