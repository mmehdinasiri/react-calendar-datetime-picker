'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { DtPicker, dayToString } from 'react-calendar-datetime-picker'
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
