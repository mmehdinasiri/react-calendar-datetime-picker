import type { ExampleConfig } from '../examples/examplesConfig'
import React from 'react'
import {
  DatePickerWithValueDisplay,
  ReactHookFormExample,
  InputWithIconTrigger
} from './customComponents'

// Extended interface for customization examples that need custom rendering
export interface CustomizationExampleConfig extends ExampleConfig {
  customComponent?: React.ComponentType<any>
  customComponentProps?: Record<string, any>
  featureList?: {
    title: string
    items: string[]
    variant?: 'default' | 'info' | 'next-steps'
  }
  codeOnly?: boolean // For examples that are just code snippets
  cssCode?: string // For CSS examples that need both TSX and CSS code
  resultValueGetter?: () => any // Function to get the result value for display
}

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

// Custom Icon for DtPicker trigger (star icon - completely unrelated to calendar)
const CustomCalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9 1l2.5 5h5.5l-4.5 3.5 1.5 5L9 12l-4.5 2.5 1.5-5L2 6h5.5L9 1z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='0.5'
    />
  </svg>
)

export type CustomizationExamplesConfig = Record<
  string,
  Record<string, CustomizationExampleConfig>
>

export const customizationExamples: CustomizationExamplesConfig = {
  'Custom Trigger Elements': {
    CustomButtonTrigger: {
      title: 'Custom Button Trigger',
      description: 'Calendar modal triggered by a custom styled button',
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
    },
    CustomDivTrigger: {
      title: 'Custom Div with Icon',
      description:
        'Calendar triggered by a beautifully styled div element with icon and gradient',
      component: 'DtPicker',
      props: {
        triggerElement: (
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
    },
    CustomStyledInput: {
      title: 'Custom Styled Input',
      description:
        'Calendar triggered by a custom styled input field that displays the selected date',
      component: 'DtPicker',
      props: {},
      wrapper: 'calendar-container',
      customComponent: DatePickerWithValueDisplay,
      customComponentProps: {
        calendarSystem: 'gregorian'
      },
      customCode: `import { DtPicker, dayToString } from 'react-calendar-datetime-picker'
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
}`,
      resultValueGetter: () => {
        // This will be set by the renderer
        return null
      }
    },
    InputWithIconTrigger: {
      title: 'Input with Icon Trigger',
      description:
        'Calendar triggered by clicking an icon button. Users can type dates directly in the input field, and valid dates are automatically parsed and used as the initial value.',
      component: 'DtPicker',
      props: {},
      wrapper: 'calendar-container',
      customComponent: InputWithIconTrigger,
      customCode: `import { DtPicker, parseAndValidateDate } from 'react-calendar-datetime-picker'
import React, { useState, useCallback } from 'react'
import type { Day } from 'react-calendar-datetime-picker'

function InputWithIconTrigger({ onChange, ...props }) {
  const [selectedDate, setSelectedDate] = useState<Day | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  // Check if input value is valid and get validation result
  const validationResult = inputValue
    ? parseAndValidateDate(inputValue, 'gregorian')
    : null
  const isValid = validationResult?.success ?? null
  const errorMessage = validationResult?.success === false ? validationResult.error?.message : null

  // Handle input change - parse and validate
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
    (date: Day | null, _jsDate: Date | null, formattedString: string | null) => {
      setSelectedDate(date)
      setInputValue(formattedString || '')
      onChange?.(date) //or _jsDate
    },
    [onChange]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <input
            type="text"
            placeholder="Type date (YYYY/MM/DD) or click icon"
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
              backgroundColor: '#ffffff',
              color: '#111827',
              borderColor: isValid === true ? '#10b981' : isValid === false ? '#ef4444' : '#d1d5db'
            }}
          />
          {errorMessage && (
            <div style={{ marginTop: '4px', fontSize: '12px', color: '#ef4444', paddingLeft: '4px' }}>
              {errorMessage}
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0 }}>
          <DtPicker
            calendarSystem="gregorian"
            initValue={selectedDate}
            onChange={handleCalendarChange}
            triggerElement={
              <button
                type="button"
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '18px',
                  minWidth: '40px',
                  height: '40px',
                  flexShrink: 0
                }}
                aria-label="Open calendar"
              >
                📅
              </button>
            }
          />
        </div>
      </div>
    </div>
  )
}`,
      featureList: {
        title: 'Key Points',
        items: [
          '• <strong>Editable Input:</strong> Users can type dates directly in the input field',
          '• <strong>Automatic Parsing:</strong> Uses <code><a href="/react-calendar-datetime-picker/utilities/#parseandvalidatedate" class="text-blue-600 dark:text-blue-400 hover:underline">parseAndValidateDate</a></code> to parse and validate date strings in one step',
          "• <strong>Date Validation:</strong> Validates dates in three steps: 1) Parses the date string format, 2) Checks if the year is within the calendar's year range (Gregorian: 1900 to current year + 30, Jalali: 1300 to current year + 30), 3) Validates the date structure (month and day validity)",
          "• <strong>Year Range Validation:</strong> Dates with years outside the calendar's supported range will return an error with code <code>YEAR_OUT_OF_RANGE</code>",
          '• <strong>Icon Trigger:</strong> Clicking the icon opens the calendar modal',
          '• <strong>Visual Feedback:</strong> Input border color changes based on date validity (green for valid, red for invalid)',
          '• <strong>Two-way Binding:</strong> Dates selected from calendar update the input, and typed dates update the calendar',
          '• <strong>Flexible Input:</strong> Accepts date strings in formats: "2024/12/25", "2024-12-25", "2024.12.25"'
        ],
        variant: 'info'
      }
    },
    ReactHookFormIntegration: {
      title: 'React Hook Form Integration',
      description:
        'Integrate DtPicker with React Hook Form using the Controller component. The custom trigger element displays the selected date value.',
      component: 'DtPicker',
      props: {},
      wrapper: 'calendar-container',
      customComponent: ReactHookFormExample,
      customCode: `import { DtPicker, dayToString } from 'react-calendar-datetime-picker'
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
}`,
      featureList: {
        title: 'Key Points',
        items: [
          '• Use <code>Controller</code> to integrate with React Hook Form',
          '• Use <code>field.value</code> to get the current form value (no need for <code>watch</code>)',
          '• Pass <code>initValue={field.value}</code> to make DtPicker a controlled component',
          '• Call <code>field.onChange</code> and <code>field.onBlur</code> for proper form validation',
          '• Format the date using <code>dayToString</code> in the input value'
        ],
        variant: 'info'
      }
    },
    BasicButtonTrigger: {
      title: 'Basic Button Trigger',
      description: 'Simple button trigger example',
      component: 'DtPicker',
      props: {},
      codeOnly: true,
      customCode: `import { DtPicker } from 'react-calendar-datetime-picker'

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
}`
    },
    FormIntegration: {
      title: 'Form Integration',
      description: 'React Hook Form Integration code example',
      component: 'DtPicker',
      props: {},
      codeOnly: true,
      customCode: `// React Hook Form Integration
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
/>`
    }
  },
  Themes: {
    LightTheme: {
      title: 'Light Theme',
      description: 'Calendar with light theme (default)',
      component: 'DtCalendar',
      props: {
        dark: false,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    DarkTheme: {
      title: 'Dark Theme',
      description: 'Calendar with dark theme enabled using the dark prop',
      component: 'DtCalendar',
      props: {
        dark: true,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  'Custom Icons': {
    CustomIcons: {
      title: 'Custom Icons',
      description:
        'DtPicker with custom navigation icons and custom calendar trigger icon. Note: The calendar icon customization only works for DtPicker, not DtCalendar.',
      component: 'DtPicker',
      props: {
        customization: {
          icons: {
            previous: ArrowLeftIcon,
            next: ArrowRightIcon,
            calendar: CustomCalendarIcon
          }
        },
        placeholder: 'Select date',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtPicker } from 'react-calendar-datetime-picker'

// Custom navigation icons (for both DtCalendar and DtPicker)
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

const CustomCalendarIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1l2.5 5h5.5l-4.5 3.5 1.5 5L9 12l-4.5 2.5 1.5-5L2 6h5.5L9 1z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
)

function App() {
  const [date, setDate] = useState(null)
  
  return (
    <DtPicker
      onChange={setDate}
      placeholder="Select date"
      customization={{
        icons: {
          previous: CustomPrevIcon,
          next: CustomNextIcon,
          calendar: CustomCalendarIcon
        }
      }}
    />
  )
}`
    }
  },
  'CSS Variables': {
    BlueExample: {
      title: 'Blue Example',
      description:
        'Custom blue theme using CSS variables with calenderModalClass prop',
      component: 'DtCalendar',
      props: {
        dark: false,
        showWeekend: true,
        todayBtn: true,
        calenderModalClass: 'calendar-blue-theme'
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
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
}`,
      cssCode: `/* styles.css */
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
}`
    },
    BrownExample: {
      title: 'Brown Example',
      description:
        'Custom brown dark theme using CSS variables with calenderModalClass prop',
      component: 'DtCalendar',
      props: {
        dark: true,
        showWeekend: true,
        todayBtn: true,
        calenderModalClass: 'calendar-dark-custom-theme'
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
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
}`,
      cssCode: `/* styles.css */
.react-calendar-datetime-picker.calendar-dark-custom-theme[data-theme='dark'],
.calendar-dark-custom-theme[data-theme='dark'] {
  /* Override only background colors - primary colors remain default dark theme green */
  /* Using warmer dark brown tones - visually very distinct from default cool gray (#1f2937) */
  --calendar-bg: #2c1810;
  --calendar-bg-hover: #3d2418;
  --calendar-bg-selected: #2c1810;
  --calendar-header-bg: #2c1810;
  --calendar-border: #4a2e1f;
}`
    },
    SmallerCalendarExample: {
      title: 'Smaller Calendar Example',
      description:
        'Make the calendar grid smaller by reducing the cell size. Header and footer remain unchanged.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true,
        calenderModalClass: 'calendar-small-size'
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-small-size"
      onChange={setDate}
    />
  )
}`,
      cssCode: `/* styles.css */
.calendar-small-size {
  /* Smaller grid cells - calendar width = 35px * 7 = 245px */
  --calendar-cell-size: 35px;
  --calendar-month-view-font-size: 12px;
  --calendar-month-view-font-size-selected: 16px;
  --calendar-year-view-font-size: 12px;
  --calendar-year-view-font-size-selected: 16px;
}`
    },
    LargerCalendarExample: {
      title: 'Larger Calendar Example',
      description:
        'Make the calendar grid larger by increasing the cell size. Header and footer remain unchanged.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true,
        calenderModalClass: 'calendar-large-size'
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      calenderModalClass="calendar-large-size"
      onChange={setDate}
    />
  )
}`,
      cssCode: `/* styles.css */
.calendar-large-size {
  /* Larger grid cells - calendar width = 50px * 7 = 350px */
  --calendar-cell-size: 50px;
  --calendar-cell-font-size: 16px;
  --calendar-cell-font-size-selected: 20px;
}`
    }
  },
  'Year List Style': {
    GridLayout: {
      title: 'Grid Layout (Default)',
      description:
        'Year selection view displayed in a grid layout. This is the default style.',
      component: 'DtCalendar',
      props: {
        yearListStyle: 'grid',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      yearListStyle="grid"
      showWeekend={true}
      todayBtn={true}
      onChange={setDate}
    />
  )
}`
    },
    ListLayout: {
      title: 'List Layout',
      description:
        'Year selection view displayed in a vertical list layout. Useful for better scrolling on mobile devices or when you prefer a more compact vertical layout.',
      component: 'DtCalendar',
      props: {
        yearListStyle: 'list',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      yearListStyle="list"
      showWeekend={true}
      todayBtn={true}
      onChange={setDate}
    />
  )
}`
    }
  }
}
