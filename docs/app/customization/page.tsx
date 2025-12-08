'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { DtCalendar, DtPicker } from '../../../src/components'
import { dayToString } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'
import '../../../src/styles/index.scss'
import { ExampleRenderer } from '../components/ExampleRenderer'
import {
  CodeBlock,
  InfoBox,
  SectionHeader,
  TypeDefinition,
  FeatureList
} from '../components'
import { useTheme } from '../contexts/ThemeContext'
import {
  cssVariables,
  getColorValue,
  getDarkColorValue,
  isColorValue
} from '../data/cssVariables'

// Custom Icons
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13 15L8 10L13 5M7 15L2 10L7 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7 15L12 10L7 5M13 15L18 10L13 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

// Custom component that displays the selected date in the input
function DatePickerWithValueDisplay({ onChange, ...props }: any) {
  const { theme } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Day | null>(null)

  return (
    <DtPicker
      {...props}
      dark={props.dark !== undefined ? props.dark : theme === 'dark'}
      onChange={(date) => {
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
function ReactHookFormExample() {
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

export default function Customization() {
  const { theme } = useTheme()
  const [customDate, setCustomDate] = useState<any>(null)
  const [darkDate, setDarkDate] = useState<Day | null>(null)
  const [styledInputDate, setStyledInputDate] = useState<Day | null>(null)
  const [smallCalendarDate, setSmallCalendarDate] = useState<Day | null>(null)
  const [largeCalendarDate, setLargeCalendarDate] = useState<Day | null>(null)

  // Helper to get dark prop - use theme unless explicitly overridden
  const getDarkProp = (explicitDark?: boolean) => {
    return explicitDark !== undefined ? explicitDark : theme === 'dark'
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Customization</h1>

        <p>
          React Calendar DateTime Picker offers extensive customization options
          to match your application's design. You can customize themes, colors,
          icons, labels, and more.
        </p>
      </div>

      <div className='space-y-12'>
        {/* Custom Trigger Elements */}
        <section
          id='custom-trigger-elements'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom Trigger Elements</SectionHeader>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-4'>
              Bind the calendar modal to any HTML element instead of just input
              fields. Use the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                triggerElement
              </code>{' '}
              prop to create custom-styled triggers like buttons, divs, or any
              interactive element. When provided, the default input field will
              not be rendered.
            </p>
            <TypeDefinition definition='triggerElement?: ReactNode' />
            <div className='text-gray-600 dark:text-gray-400'>
              <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                Props:
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>
                  <strong>triggerElement</strong> - Accepts any React node
                  (button, div, input, etc.). When provided, replaces the
                  default input field. The element will trigger the calendar
                  modal when clicked.
                </li>
              </ul>
            </div>
          </div>

          {/* Custom Trigger Examples */}
          <div className='space-y-6'>
            <ExampleRenderer
              config={{
                title: 'Custom Button Trigger',
                description:
                  'Calendar modal triggered by a custom styled button',
                component: 'DtPicker',
                props: {
                  triggerElement: (
                    <button
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      📅 Pick Date
                    </button>
                  ),
                  placeholder: 'Select a date...'
                },
                wrapper: 'calendar-container',
                customCode: `import { DtPicker } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      triggerElement={
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          📅 Pick Date
        </button>
      }
      placeholder="Select a date..."
      onChange={setDate}
    />
  )
}`
              }}
              exampleKey='CustomButtonTrigger'
            />

            <ExampleRenderer
              config={{
                title: 'Custom Div with Icon',
                description:
                  'Calendar triggered by a beautifully styled div element with icon and gradient',
                component: 'DtPicker',
                props: {
                  triggerElement: (
                    <div
                      style={{
                        padding: '14px 20px',
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '240px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease',
                        color: 'white',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow =
                          '0 6px 20px rgba(102, 126, 234, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow =
                          '0 4px 15px rgba(102, 126, 234, 0.4)'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '20px',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}
                      >
                        📅
                      </span>
                      <span style={{ flex: 1 }}>Select Date</span>
                      <span style={{ fontSize: '12px', opacity: 0.9 }}>▼</span>
                    </div>
                  )
                },
                wrapper: 'calendar-container',
                customCode: `import { DtPicker } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      triggerElement={
        <div
          style={{
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '240px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            color: 'white',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
        >
          <span style={{ fontSize: '20px' }}>📅</span>
          <span style={{ flex: 1 }}>Select Date</span>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>▼</span>
        </div>
      }
      onChange={setDate}
    />
  )
}`
              }}
              exampleKey='CustomDivTrigger'
            />

            <section
              id='custom-styled-input'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <SectionHeader>Custom Styled Input</SectionHeader>
                <p className='text-gray-700 dark:text-gray-300'>
                  Calendar triggered by a custom styled input field that
                  displays the selected date
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DatePickerWithValueDisplay
                      onChange={setStyledInputDate}
                      calendarSystem='gregorian'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtPicker, dayToString } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      calendarSystem="gregorian"
      onChange={setDate}
      triggerElement={
        <input
          type="text"
          placeholder="Select a date..."
          value={date ? dayToString(date, '/') : ''}
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
            fontWeight: '500'
          }}
        />
      }
    />
  )
}`}
                    className='mb-4'
                  />
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {styledInputDate
                          ? JSON.stringify(styledInputDate, null, 2)
                          : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id='react-hook-form-integration'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <SectionHeader>React Hook Form Integration</SectionHeader>
                <p className='text-gray-700 dark:text-gray-300'>
                  Integrate DtPicker with React Hook Form using the Controller
                  component. The custom trigger element displays the selected
                  date value.
                </p>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <ReactHookFormExample />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtPicker, dayToString } from 'react-calendar-datetime-picker'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      birthDate: null
    }
  })

  const onSubmit = (data) => {
    console.log('Form data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DtPicker
            calendarSystem="gregorian"
            initValue={field.value}
            onChange={(date) => {
              field.onChange(date)
              field.onBlur() // Trigger validation on change
            }}
            triggerElement={
              <input
                type="text"
                placeholder="Select your birth date..."
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
      <button type="submit">Submit</button>
    </form>
  )
}`}
                    className='mb-4'
                  />
                  <FeatureList
                    title='Key Points'
                    items={[
                      '• Use <code>Controller</code> to integrate with React Hook Form',
                      '• Use <code>field.value</code> to get the current form value (no need for <code>watch</code>)',
                      '• Pass <code>initValue={field.value}</code> to make DtPicker a controlled component',
                      '• Call <code>field.onChange</code> and <code>field.onBlur</code> for proper form validation',
                      '• Format the date using <code>dayToString</code> in the input value'
                    ]}
                    variant='info'
                  />
                </div>
              </div>
            </section>
          </div>

          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Usage Examples
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  Basic Button Trigger
                </h4>
                <CodeBlock
                  language='tsx'
                  code={`import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  return (
    <DtPicker
      triggerElement={
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📅 Select Date
        </button>
      }
      onChange={setDate}
    />
  )
}`}
                />
              </div>

              <div>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  Form Integration
                </h4>
                <CodeBlock
                  language='tsx'
                  code={`// React Hook Form Integration
import { Controller } from 'react-hook-form'

<Controller
  name="birthDate"
  control={control}
  render={({ field }) => (
    <DtPicker
      {...field}
      triggerElement={
        <input
          placeholder="Birth date"
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      }
    />
  )}
/>`}
                />
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <FeatureList
              title='Key Benefits'
              items={[
                '• <strong>Flexible Design:</strong> Use any HTML element as a trigger',
                '• <strong>Backward Compatible:</strong> Default input behavior unchanged',
                '• <strong>Accessible:</strong> Proper ARIA attributes and keyboard navigation',
                '• <strong>Framework Integration:</strong> Works with React Hook Form, Formik, etc.'
              ]}
              variant='info'
            />
          </div>
        </section>

        {/* Themes */}
        <section
          id='themes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Themes</SectionHeader>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-4'>
              The calendar supports light and dark themes, as well as custom
              themes using CSS variables. The{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                dark
              </code>{' '}
              prop enables the dark theme for both DtPicker and DtCalendar
              components.
            </p>
            <TypeDefinition definition='dark?: boolean' />
            <div className='text-gray-600 dark:text-gray-400'>
              <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                Props:
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>
                  <strong>dark</strong> - When set to{' '}
                  <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                    true
                  </code>
                  , enables the dark theme. Default is{' '}
                  <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                    false
                  </code>{' '}
                  (light theme).
                </li>
              </ul>
            </div>
          </div>

          {/* Theme Examples */}
          <div className='space-y-6'>
            <ExampleRenderer
              config={{
                title: 'Light Theme',
                description: 'Calendar with light theme (default)',
                component: 'DtCalendar',
                props: {
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='LightTheme'
            />
            <ExampleRenderer
              config={{
                title: 'Dark Theme',
                description:
                  'Calendar with dark theme enabled using the dark prop',
                component: 'DtCalendar',
                props: {
                  dark: true,
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='DarkTheme'
            />
          </div>
        </section>

        {/* CSS Variables */}
        <section
          id='css-variables'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>CSS Variables (Recommended)</SectionHeader>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-4'>
              The easiest way to customize the calendar appearance is by
              overriding CSS variables. Apply custom variables using the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                calenderModalClass
              </code>{' '}
              prop. This class is applied to the calendar component, allowing
              you to override any CSS variable.
            </p>
            <TypeDefinition definition='calenderModalClass?: string' />
            <div className='text-gray-600 dark:text-gray-400'>
              <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                Props:
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>
                  <strong>calenderModalClass</strong> - A CSS class name that
                  will be applied to the calendar component. Use this class to
                  override CSS variables for colors, spacing, fonts, and more.
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Available CSS Variables
              </h3>

              {/* Color Variables Table */}
              <div className='mb-8'>
                <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-3'>
                  Color Variables
                </h4>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
                    <thead className='bg-bg-tertiary'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Variable
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Light Theme Default
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Dark Theme Default
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-bg-secondary divide-y divide-border'>
                      {cssVariables
                        .filter(
                          (v) =>
                            v.category === 'primary' ||
                            v.category === 'background' ||
                            v.category === 'text' ||
                            v.category === 'border'
                        )
                        .map((variable, index, filteredArray) => {
                          const lightColor = getColorValue(variable.lightTheme)
                          const darkColor = getDarkColorValue(
                            variable.darkTheme
                          )
                          const isEven = index % 2 === 0

                          // Check if we need a separator row (category change)
                          const prevVariable =
                            index > 0 ? filteredArray[index - 1] : null
                          const needsSeparator =
                            prevVariable &&
                            prevVariable.category !== variable.category

                          // Category labels matching variables.scss comments
                          const categoryLabels: Record<string, string> = {
                            primary: 'Colors',
                            background: 'Background colors',
                            text: 'Text colors',
                            border: 'Border colors'
                          }

                          return (
                            <>
                              {needsSeparator && (
                                <tr
                                  key={`separator-${variable.category}`}
                                  className='bg-gray-100 dark:bg-gray-800'
                                >
                                  <td
                                    colSpan={4}
                                    className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                                  >
                                    {categoryLabels[variable.category]}
                                  </td>
                                </tr>
                              )}
                              {index === 0 && (
                                <tr
                                  key={`separator-${variable.category}-first`}
                                  className='bg-gray-100 dark:bg-gray-800'
                                >
                                  <td
                                    colSpan={4}
                                    className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                                  >
                                    {categoryLabels[variable.category]}
                                  </td>
                                </tr>
                              )}
                              <tr
                                key={variable.name}
                                className={isEven ? '' : 'bg-bg-tertiary'}
                              >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                                  <code>{variable.name}</code>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                                  <div className='flex items-center gap-2'>
                                    <code>{variable.lightTheme}</code>
                                    {isColorValue(lightColor) && (
                                      <div
                                        className='w-6 h-6 rounded border border-border'
                                        style={{ backgroundColor: lightColor }}
                                      />
                                    )}
                                  </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                                  <div className='flex items-center gap-2'>
                                    <code>{variable.darkTheme}</code>
                                    {isColorValue(darkColor) && (
                                      <div
                                        className='w-6 h-6 rounded border border-border'
                                        style={{ backgroundColor: darkColor }}
                                      />
                                    )}
                                  </div>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                                  {variable.description}
                                </td>
                              </tr>
                            </>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Other Variables Table */}
              <div>
                <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-3'>
                  Other Variables
                </h4>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
                    <thead className='bg-bg-tertiary'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Variable
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Default Value
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-bg-secondary divide-y divide-border'>
                      {cssVariables
                        .filter(
                          (v) =>
                            v.category !== 'primary' &&
                            v.category !== 'background' &&
                            v.category !== 'text' &&
                            v.category !== 'border'
                        )
                        .map((variable, index, filteredArray) => {
                          const isEven = index % 2 === 0

                          // Check if we need a separator row (category change)
                          const prevVariable =
                            index > 0 ? filteredArray[index - 1] : null
                          const needsSeparator =
                            prevVariable &&
                            prevVariable.category !== variable.category

                          // Category labels matching variables.scss comments
                          const categoryLabels: Record<string, string> = {
                            spacing: 'Spacing',
                            'border-radius': 'Border radius',
                            'modal-width': 'Grid cell size',
                            'font-size': 'Font sizes',
                            shadows: 'Shadows',
                            transitions: 'Transitions'
                          }

                          return (
                            <>
                              {needsSeparator && (
                                <tr
                                  key={`separator-${variable.category}`}
                                  className='bg-gray-100 dark:bg-gray-800'
                                >
                                  <td
                                    colSpan={3}
                                    className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                                  >
                                    {categoryLabels[variable.category]}
                                  </td>
                                </tr>
                              )}
                              {index === 0 && (
                                <tr
                                  key={`separator-${variable.category}-first`}
                                  className='bg-gray-100 dark:bg-gray-800'
                                >
                                  <td
                                    colSpan={3}
                                    className='px-6 py-3 text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wider border-t border-b border-gray-300 dark:border-gray-600 text-center'
                                  >
                                    {categoryLabels[variable.category]}
                                  </td>
                                </tr>
                              )}
                              <tr
                                key={variable.name}
                                className={isEven ? '' : 'bg-bg-tertiary'}
                              >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                                  <code>{variable.name}</code>
                                </td>
                                <td
                                  className={`px-6 py-4 whitespace-nowrap ${variable.category === 'shadows' ? 'text-xs' : 'text-sm'} text-gray-700 dark:text-gray-300`}
                                >
                                  <code>{variable.lightTheme}</code>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                                  {variable.description}
                                </td>
                              </tr>
                            </>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Using calenderModalClass Prop
              </h3>
              <InfoBox variant='tip'>
                <p className='text-sm text-gray-200'>
                  <strong>Tip:</strong> This approach applies the class directly
                  to the calendar component, making it cleaner and more direct.
                </p>
              </InfoBox>
            </div>
          </div>

          {/* CSS Variables Examples */}
          <div className='mt-8 space-y-6'>
            {/* Blue Example */}
            <div
              id='blue-example'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                  Blue Example
                </h2>
                <p className='text-gray-700 dark:text-gray-300'>
                  Custom blue theme using CSS variables with calenderModalClass
                  prop
                </p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DtCalendar
                      initValue={customDate}
                      onChange={setCustomDate}
                      showWeekend={true}
                      dark={theme === 'dark'}
                      todayBtn={true}
                      calenderModalClass='calendar-blue-theme'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    CSS Styles
                  </h3>
                  <CodeBlock
                    language='css'
                    code={`/* styles.css */
.calendar-blue-theme {
  --calendar-bg: #eff6ff;
  --calendar-text: #1e40af;
  --calendar-text-light: #1e40af;
  --calendar-border: #3b82f6;
  --calendar-bg-hover: #dbeafe;
  --calendar-selected-day: #2563eb;
  --calendar-today: #1d4ed8;
  --calendar-bg-disabled: #9ca3af;
  --calendar-text-disabled: #9ca3af;
  --calendar-border-focus: #2563eb;
  --calendar-primary: #2563eb;
  --calendar-header-bg: #2563eb;
}`}
                    className='mb-4'
                  />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-blue-theme"
      onChange={setDate}
    />
  )
}`}
                  />
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {customDate
                          ? JSON.stringify(customDate, null, 2)
                          : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brown Example */}
            <div
              id='brown-example'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <SectionHeader>Brown Example</SectionHeader>
                <p className='text-gray-700 dark:text-gray-300'>
                  Custom brown dark theme using CSS variables with
                  calenderModalClass prop
                </p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DtCalendar
                      initValue={darkDate}
                      onChange={(date) => setDarkDate(date)}
                      dark={true}
                      showWeekend={true}
                      todayBtn={true}
                      calenderModalClass='calendar-dark-custom-theme'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    CSS Styles
                  </h3>
                  <CodeBlock
                    language='css'
                    code={`/* styles.css */
.react-calendar-datetime-picker.calendar-dark-custom-theme[data-theme='dark'],
.calendar-dark-custom-theme[data-theme='dark'] {
  /* Override only background colors - primary colors remain default dark theme green */
  /* Using warmer dark brown tones - visually very distinct from default cool gray (#1f2937) */
  --calendar-bg: #2c1810;
  --calendar-bg-hover: #3d2418;
  --calendar-bg-selected: #2c1810;
  --calendar-header-bg: #2c1810;
  --calendar-border: #4a2e1f;
}`}
                    className='mb-4'
                  />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      dark={true}
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-dark-custom-theme"
      onChange={setDate}
    />
  )
}`}
                  />
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {darkDate ? JSON.stringify(darkDate, null, 2) : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller Calendar Example */}
            <div
              id='smaller-calendar-example'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <SectionHeader>Smaller Calendar Example</SectionHeader>
                <p className='text-gray-700 dark:text-gray-300'>
                  Make the calendar grid smaller by reducing the cell size.
                  Header and footer remain unchanged.
                </p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DtCalendar
                      initValue={smallCalendarDate}
                      onChange={setSmallCalendarDate}
                      showWeekend={true}
                      dark={theme === 'dark'}
                      todayBtn={true}
                      calenderModalClass='calendar-small-size'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    CSS Styles
                  </h3>
                  <CodeBlock
                    language='css'
                    code={`/* styles.css */
.calendar-small-size {
  /* Smaller grid cells - calendar width = 35px * 7 = 245px */
  --calendar-cell-size: 35px;
  --calendar-month-view-font-size: 12px;
  --calendar-month-view-font-size-selected: 16px;
  --calendar-year-view-font-size: 12px;
  --calendar-year-view-font-size-selected: 16px;
}`}
                    className='mb-4'
                  />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-small-size"
      dark={theme === 'dark'}
      onChange={setDate}
    />
  )
}`}
                  />
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {smallCalendarDate
                          ? JSON.stringify(smallCalendarDate, null, 2)
                          : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Larger Calendar Example */}
            <div
              id='larger-calendar-example'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <SectionHeader>Larger Calendar Example</SectionHeader>
                <p className='text-gray-700 dark:text-gray-300'>
                  Make the calendar grid larger by increasing the cell size.
                  Header and footer remain unchanged.
                </p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DtCalendar
                      initValue={largeCalendarDate}
                      onChange={setLargeCalendarDate}
                      showWeekend={true}
                      todayBtn={true}
                      dark={theme === 'dark'}
                      calenderModalClass='calendar-large-size'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    CSS Styles
                  </h3>
                  <CodeBlock
                    language='css'
                    code={`/* styles.css */
.calendar-large-size {
  /* Larger grid cells - calendar width = 50px * 7 = 350px */
  --calendar-cell-size: 50px;
  --calendar-cell-font-size: 16px;
  --calendar-cell-font-size-selected: 20px;
}`}
                    className='mb-4'
                  />
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Code
                  </h3>
                  <CodeBlock
                    language='tsx'
                    code={`import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-large-size"
      dark={theme === 'dark'}
      onChange={setDate}
    />
  )
}`}
                  />
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {largeCalendarDate
                          ? JSON.stringify(largeCalendarDate, null, 2)
                          : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Classes */}
        <section
          id='custom-classes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom CSS Classes</SectionHeader>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-4'>
              Override specific calendar elements using the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                customization
              </code>{' '}
              prop with the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                classes
              </code>{' '}
              property. This allows you to add custom CSS classes to specific
              calendar components.
            </p>
            <TypeDefinition
              definition={`interface CalendarClasses {
  header?: string
  days?: string
  months?: string
  years?: string
}

customization?: {
  classes?: CalendarClasses
}`}
            />
            <div className='text-gray-600 dark:text-gray-400'>
              <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                Properties:
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>
                  <strong>header</strong> - Custom CSS class for the calendar
                  header
                </li>
                <li>
                  <strong>days</strong> - Custom CSS class for the days grid
                  container
                </li>
                <li>
                  <strong>months</strong> - Custom CSS class for the months
                  selection view
                </li>
                <li>
                  <strong>years</strong> - Custom CSS class for the years
                  selection view
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-6'>
            <CodeBlock
              language='tsx'
              code={`<DtCalendar
  calenderModalClass="my-custom-calendar"
  // ... other props
/>`}
            />

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Available CSS Classes
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Calendar Structure
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>
                      <code>.react-calendar-datetime-picker</code> - Root
                      container
                    </li>
                    <li>
                      <code>.calendar-header</code> - Header section
                    </li>
                    <li>
                      <code>.calendar-days-grid</code> - Days grid container
                    </li>
                    <li>
                      <code>.calendar-months-view</code> - Months selection view
                    </li>
                    <li>
                      <code>.calendar-years-view</code> - Years selection view
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Interactive Elements
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>
                      <code>.calendar-day</code> - Individual day cells
                    </li>
                    <li>
                      <code>.calendar-day--selected</code> - Selected days
                    </li>
                    <li>
                      <code>.calendar-day--today</code> - Today's date
                    </li>
                    <li>
                      <code>.calendar-day--disabled</code> - Disabled days
                    </li>
                    <li>
                      <code>.calendar-nav-button</code> - Navigation buttons
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icons and Labels */}
        <section
          id='icons-labels'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom Icons</SectionHeader>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-4'>
              Customize navigation icons using the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                customization
              </code>{' '}
              prop with the{' '}
              <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                icons
              </code>{' '}
              property. Replace the default chevron icons with your own React
              components.
            </p>
            <TypeDefinition
              definition={`interface CalendarIcons {
  next?: React.ComponentType<{ className?: string }>
  previous?: React.ComponentType<{ className?: string }>
}

customization?: {
  icons?: CalendarIcons
}`}
            />
            <div className='text-gray-600 dark:text-gray-400'>
              <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                Properties:
              </p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>
                  <strong>next</strong> - React component for the next month
                  navigation button. Receives a{' '}
                  <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                    className
                  </code>{' '}
                  prop.
                </li>
                <li>
                  <strong>previous</strong> - React component for the previous
                  month navigation button. Receives a{' '}
                  <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                    className
                  </code>{' '}
                  prop.
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-6'></div>

          {/* Icons and Labels Examples */}
          <div className='mt-8 space-y-6'>
            <ExampleRenderer
              config={{
                title: 'Custom Arrow Icons',
                description: 'Calendar with custom arrow navigation icons',
                component: 'DtCalendar',
                props: {
                  customization: {
                    icons: {
                      previous: ArrowLeftIcon,
                      next: ArrowRightIcon
                    }
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container',
                customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'

const CustomPrevIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5L5 10L10 15M15 5L10 10L15 15" />
  </svg>
)

const CustomNextIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5L15 10L10 15M5 5L10 10L5 15" />
  </svg>
)

function App() {
  const { theme } = useTheme()
  return (
    <DtCalendar
      dark={theme === 'dark'}
      customization={{
        icons: {
          previous: CustomPrevIcon,
          next: CustomNextIcon
        }
      }}
    />
  )
}`
              }}
              exampleKey='CustomArrowIcons'
            />
          </div>
        </section>

        {/* Internationalization */}
        <section
          id='internationalization'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Internationalization (i18n)</SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              Full internationalization support with locale-based translations,
              RTL support, and customizable text.
            </p>
          </div>

          <div className='space-y-8'>
            {/* Supported Locales */}
            <div id='locale-support'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Supported Locales
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                The calendar supports multiple locales out of the box:
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div className='bg-bg-tertiary rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    English (en) - Default
                  </h4>
                  <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                    <li>• Latin numbers</li>
                    <li>• Left-to-right (LTR)</li>
                    <li>• English month/weekday names</li>
                  </ul>
                </div>

                <div className='bg-bg-tertiary rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    Persian/Farsi (fa)
                  </h4>
                  <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                    <li>• Persian numbers</li>
                    <li>• Right-to-left (RTL)</li>
                    <li>• Persian month/weekday names</li>
                  </ul>
                </div>

                <div className='bg-bg-tertiary rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    German (de)
                  </h4>
                  <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                    <li>• Latin numbers</li>
                    <li>• Left-to-right (LTR)</li>
                    <li>• German month/weekday names</li>
                  </ul>
                </div>

                <div className='bg-bg-tertiary rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    Spanish (es)
                  </h4>
                  <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                    <li>• Latin numbers</li>
                    <li>• Left-to-right (LTR)</li>
                    <li>• Spanish month/weekday names</li>
                  </ul>
                </div>

                <div className='bg-bg-tertiary rounded-lg p-4'>
                  <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                    French (fr)
                  </h4>
                  <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                    <li>• Latin numbers</li>
                    <li>• Left-to-right (LTR)</li>
                    <li>• French month/weekday names</li>
                  </ul>
                </div>
              </div>

              <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6'>
                <CodeBlock
                  language='typescript'
                  code={`// Basic locale usage
<DtPicker locale="fa" onChange={setDate} />

// German locale
<DtCalendar locale="de" onChange={setDate} />

// French locale
<DtPicker locale="fr" onChange={setDate} />`}
                  className='bg-transparent border-0'
                />
              </div>
            </div>

            {/* Custom Translations */}
            <div id='custom-translations'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                Custom Translations
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                Override any text in the calendar using the{' '}
                <code className='bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>
                  translations
                </code>{' '}
                property in customization.
              </p>

              <ExampleRenderer
                config={{
                  title: 'Custom Button Labels',
                  description: 'Customize Today button and navigation labels',
                  component: 'DtPicker',
                  props: {
                    locale: 'en',
                    showWeekend: true,
                    todayBtn: true,
                    clearBtn: true,
                    initValue: { year: 2024, month: 3, day: 15 },
                    customization: {
                      translations: {
                        labels: {
                          today: 'Pick Today',
                          nextMonth: 'Next',
                          previousMonth: 'Previous',
                          clear: 'Reset'
                        }
                      }
                    }
                  },
                  wrapper: 'picker-container'
                }}
                exampleKey='CustomTranslations'
              />

              <div className='mt-6'>
                <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                  CalendarTranslations Interface
                </h4>
                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden'>
                  <CodeBlock
                    language='typescript'
                    code={`export interface CalendarTranslations {
  /** Month names (12 elements, index 0-11 for months 1-12) */
  months: string[]

  /** Weekday names (7 elements, starting from first day of week) */
  weekdays: string[]

  /** Text direction */
  direction: 'ltr' | 'rtl'

  /** Number system */
  numbers: 'latin' | 'persian'

  /** Common labels */
  labels: {
    /** Today button text */
    today: string
    /** Clear button text - aria-label (ACCESSIBILITY ONLY) - DtPicker only */
    clear: string
    /** Cancel button text */
    cancel: string
    /** OK/Confirm button text */
    ok: string
    /** Next month button title */
    nextMonth: string
    /** Previous month button title */
    previousMonth: string
    /** Month selection view label */
    selectMonth: string
    /** Year selection view label */
    selectYear: string
    /** Time selector from label (for ranges) */
    from: string
    /** Time selector to label (for ranges) */
    to: string
    /** AM indicator */
    am: string
    /** PM indicator */
    pm: string
  }

  /** Preset range labels */
  presetRanges: {
    yesterday: string
    last7days: string
    last30days: string
    thisMonth: string
    lastMonth: string
  }
}`}
                    className='bg-transparent border-0'
                  />
                </div>
              </div>

              <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6'>
                <CodeBlock
                  language='typescript'
                  code={`// Complete custom translations example
<DtPicker
  locale="en"
  customization={{
    translations: {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      direction: 'ltr',
      numbers: 'latin',
      labels: {
        today: 'Today',
        clear: 'Clear',
        cancel: 'Cancel',
        ok: 'OK',
        nextMonth: 'Next',
        previousMonth: 'Previous',
        selectMonth: 'Select month',
        selectYear: 'Select year',
        from: 'From',
        to: 'To',
        am: 'AM',
        pm: 'PM'
      },
      presetRanges: {
        yesterday: 'Yesterday',
        last7days: 'Last 7 days',
        last30days: 'Last 30 days',
        thisMonth: 'This month',
        lastMonth: 'Last month'
      }
    }
  }}
  onChange={setDate}
/>`}
                  className='bg-transparent border-0'
                />
              </div>
            </div>

            {/* RTL Support */}
            <div id='rtl-support'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                RTL Support
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                Automatic right-to-left layout support for RTL languages. RTL
                support is tied to the{' '}
                <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                  locale
                </code>{' '}
                prop, not the calendar system. Currently, the{' '}
                <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                  fa
                </code>{' '}
                (Persian) locale is the only locale that provides RTL support,
                even when used with the Gregorian calendar system (
                <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                  calendarSystem="ge"
                </code>
                ).
              </p>

              <ExampleRenderer
                config={{
                  title: 'Persian RTL Layout',
                  description:
                    'Automatic RTL layout with Persian text and numbers',
                  component: 'DtPicker',
                  props: {
                    locale: 'fa',
                    withTime: true,
                    timeFormat: '12'
                  },
                  wrapper: 'picker-container'
                }}
                exampleKey='PersianRTL'
              />

              <FeatureList
                title='RTL Features:'
                items={[
                  '• Automatic text direction detection',
                  '• Persian/Arabic numerals in dates and times',
                  '• RTL calendar layout',
                  '• Localized month and weekday names',
                  '• RTL time picker interface'
                ]}
                variant='info'
                className='mt-4'
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
