'use client'

import '../../../src/styles/index.scss'
import { examples } from '../examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export default function Examples() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const exampleParam = searchParams.get('example')

  useEffect(() => {
    if (categoryParam && exampleParam) {
      // Scroll to the specific example after a brief delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        const elementId = `${toKebabCase(categoryParam)}-${exampleParam}`
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Highlight the element briefly
          element.classList.add('ring-2', 'ring-accent', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-accent', 'ring-opacity-50')
          }, 2000)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [categoryParam, exampleParam])
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Features</h1>

        <p>
          Interactive examples demonstrating the features and capabilities of
          React Calendar DateTime Picker. All examples are live and interactive
          - you can interact with them to see how they work.
        </p>
      </div>

      <div className='space-y-16'>
        {Object.entries(examples)
          .filter(
            ([groupName]) =>
              groupName !== 'Locale' &&
              groupName !== 'Translation Customization' &&
              groupName !== 'Date Utilities' &&
              groupName !== 'Customization'
          )
          .map(([groupName, groupExamples]) => (
            <div key={groupName} id={toKebabCase(groupName)}>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
                {groupName}
              </h2>
              {groupName === 'Basic' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    React Calendar DateTime Picker provides two main components
                    for different use cases:
                  </p>
                  <div className='text-gray-600 dark:text-gray-400 space-y-4'>
                    <div>
                      <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                          DtPicker
                        </code>
                      </p>
                      <p>
                        A date picker component with an input field that opens a
                        calendar in a modal/popup when clicked. Perfect for
                        forms and scenarios where you need a compact input that
                        reveals the calendar on demand. The input field displays
                        the selected date in a formatted string, while the
                        component internally works with{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        objects.
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
                        <li>Includes an input field with placeholder</li>
                        <li>Opens calendar in a modal/popup</li>
                        <li>Supports clear button and validation</li>
                        <li>Can show time in the input field</li>
                        <li>Ideal for forms and compact UI spaces</li>
                      </ul>
                    </div>
                    <div>
                      <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                          DtCalendar
                        </code>
                      </p>
                      <p>
                        A standalone calendar component that displays the
                        calendar directly in the page. Perfect for dashboards,
                        calendar views, and scenarios where you want the
                        calendar always visible. The component works directly
                        with{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        objects and provides full calendar functionality.
                      </p>
                      <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
                        <li>Always visible calendar display</li>
                        <li>No input field or modal</li>
                        <li>Direct calendar interaction</li>
                        <li>Perfect for dashboards and calendar views</li>
                        <li>Supports all selection types and features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {groupName === 'Types' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      type
                    </code>{' '}
                    prop determines the selection behavior of the calendar
                    component. You can choose from four different selection
                    types, each with its own use case and return value format.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definition:
                    </p>
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
                        {`type CalendarType = 'single' | 'range' | 'multi' | 'week'`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Selection Types:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>single</strong> - Select a single date
                        (default). Returns a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        object or null.
                      </li>
                      <li>
                        <strong>range</strong> - Select a date range. Returns a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Range
                        </code>{' '}
                        object with{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          from
                        </code>{' '}
                        and{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          to
                        </code>{' '}
                        properties, or null.
                      </li>
                      <li>
                        <strong>multi</strong> - Select multiple dates. Returns
                        a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Multi
                        </code>{' '}
                        array of{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        objects, or null.
                      </li>
                      <li>
                        <strong>week</strong> - Select an entire week at once.
                        Returns a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Range
                        </code>{' '}
                        object representing the week, or null.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Time' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component supports time selection through the{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      withTime
                    </code>{' '}
                    prop. When enabled, users can select both date and time. The{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      timeFormat
                    </code>{' '}
                    prop allows you to choose between 12-hour (AM/PM) and
                    24-hour time formats.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definitions:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`withTime?: boolean
timeFormat?: '12' | '24'`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Props:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>withTime</strong> - When set to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>
                        , enables time selection. The selected{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        object will include{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          hour
                        </code>{' '}
                        and{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          minute
                        </code>{' '}
                        properties.
                      </li>
                      <li>
                        <strong>timeFormat</strong> - Determines the time
                        display format:
                        <ul className='list-disc list-inside space-y-1 ml-6 mt-1'>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              '12'
                            </code>{' '}
                            - 12-hour format with AM/PM indicators (1-12)
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              '24'
                            </code>{' '}
                            - 24-hour format (0-23)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Week Settings' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component supports week configuration through
                    the{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      weekStart
                    </code>{' '}
                    and{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      showWeekend
                    </code>{' '}
                    props. Control which day the week begins with and whether
                    weekends are visually highlighted. Weekend days differ by
                    calendar system: Saturday and Sunday for Gregorian, Thursday
                    and Friday for Jalali.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definitions:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`weekStart?: number // 0-6 (0 = Sunday, 6 = Saturday)
showWeekend?: boolean`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Props:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>weekStart</strong> - Determines the first day of
                        the week:
                        <ul className='list-disc list-inside space-y-1 ml-6 mt-1'>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              0
                            </code>{' '}
                            - Sunday (default for Gregorian calendar)
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              1
                            </code>{' '}
                            - Monday (common in Europe)
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              2
                            </code>{' '}
                            - Tuesday
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              3
                            </code>{' '}
                            - Wednesday
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              4
                            </code>{' '}
                            - Thursday
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              5
                            </code>{' '}
                            - Friday
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              6
                            </code>{' '}
                            - Saturday (default for Jalali calendar)
                          </li>
                        </ul>
                        <p className='mt-2'>
                          If not specified, defaults to{' '}
                          <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                            0
                          </code>{' '}
                          (Sunday) for Gregorian calendar and{' '}
                          <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                            6
                          </code>{' '}
                          (Saturday) for Jalali calendar.
                        </p>
                      </li>
                      <li>
                        <strong>showWeekend</strong> - When set to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>
                        , visually highlights weekend days:
                        <ul className='list-disc list-inside space-y-1 ml-6 mt-1'>
                          <li>
                            <strong>Gregorian calendar:</strong> Saturday (6)
                            and Sunday (0) are highlighted
                          </li>
                          <li>
                            <strong>Jalali calendar:</strong> Thursday (4) and
                            Friday (5) are highlighted
                          </li>
                        </ul>
                        <p className='mt-2'>
                          Defaults to{' '}
                          <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                            false
                          </code>
                          .
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Callbacks' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component provides several callback functions
                    that allow you to respond to user interactions and state
                    changes. These callbacks enable you to track date
                    selections, view changes, navigation events, and more.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Callback Type Definitions:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`// Main callback - type depends on selection type
onChange: (date: Day | Range | Multi | null) => void

// Event-specific callbacks
onDateSelect?: (day: Day) => void
onMonthSelect?: (month: number) => void
onYearSelect?: (year: number) => void
onViewChange?: (view: 'calendar' | 'months' | 'years') => void
onMonthNavigate?: (direction: 'prev' | 'next') => void
onGoToToday?: () => void`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Callbacks:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>onChange</strong> - Main callback fired when the
                        selected date value changes. The type of the parameter
                        depends on the{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          type
                        </code>{' '}
                        prop:
                        <ul className='list-disc list-inside space-y-1 ml-6 mt-1'>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              type='single'
                            </code>{' '}
                            - Receives{' '}
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              Day | null
                            </code>
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              type='range'
                            </code>{' '}
                            - Receives{' '}
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              Range | null
                            </code>
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              type='multi'
                            </code>{' '}
                            - Receives{' '}
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              Multi | null
                            </code>
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              type='week'
                            </code>{' '}
                            - Receives{' '}
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              Range | null
                            </code>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>onDateSelect</strong> - Fired when a date is
                        clicked, before the final selection is confirmed.
                        Receives the raw{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        object that was clicked.
                      </li>
                      <li>
                        <strong>onMonthSelect</strong> - Fired when a month is
                        selected in the month selection view. Receives the month
                        number (1-12).
                      </li>
                      <li>
                        <strong>onYearSelect</strong> - Fired when a year is
                        selected in the year selection view. Receives the year
                        number.
                      </li>
                      <li>
                        <strong>onViewChange</strong> - Fired when the calendar
                        view changes between calendar, months, or years.
                        Receives the new view name.
                      </li>
                      <li>
                        <strong>onMonthNavigate</strong> - Fired when navigating
                        between months using the previous/next buttons. Receives{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          'prev'
                        </code>{' '}
                        or{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          'next'
                        </code>
                        .
                      </li>
                      <li>
                        <strong>onGoToToday</strong> - Fired when the "Today"
                        button is clicked. No parameters.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Constraints' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component supports date constraints through the{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      constraints
                    </code>{' '}
                    prop. You can restrict date selection by setting minimum and
                    maximum dates, disabling specific dates, or using a custom
                    validation function.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definition:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`interface CalendarConstraints {
  minDate?: Day | Date | string | number
  maxDate?: Day | Date | string | number
  disabledDates?: (Day | Date | string | number)[]
  isDateDisabled?: (date: Day) => boolean
}`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Props:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>minDate</strong> - Sets the minimum selectable
                        date. Dates before this date will be disabled. Accepts{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>
                        ,{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Date
                        </code>
                        , date string, or timestamp.
                      </li>
                      <li>
                        <strong>maxDate</strong> - Sets the maximum selectable
                        date. Dates after this date will be disabled. Accepts{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>
                        ,{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Date
                        </code>
                        , date string, or timestamp.
                      </li>
                      <li>
                        <strong>disabledDates</strong> - Array of specific dates
                        to disable. Each date can be a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>
                        ,{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Date
                        </code>
                        , date string, or timestamp.
                      </li>
                      <li>
                        <strong>isDateDisabled</strong> - Custom function to
                        determine if a date should be disabled. Receives a{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          Day
                        </code>{' '}
                        object and returns{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>{' '}
                        if the date should be disabled. Useful for complex
                        validation logic like disabling weekends, specific days
                        of the week, or custom business rules.
                      </li>
                    </ul>
                    <p className='mt-4'>
                      <strong>Note:</strong> All date inputs are automatically
                      normalized to{' '}
                      <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                        Day
                      </code>{' '}
                      objects based on the calendar system. Disabled dates are
                      visually distinct and cannot be selected.
                    </p>
                  </div>
                </div>
              )}
              {groupName === 'Date Formatting' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component allows you to customize the date
                    format displayed in the input field (for{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      DtPicker
                    </code>
                    ) using the{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      dateFormat
                    </code>{' '}
                    prop. This only affects the display format, not the internal
                    data structure which always uses{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      Day
                    </code>{' '}
                    objects.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definition:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`dateFormat?: string`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Format Tokens:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          YYYY
                        </code>{' '}
                        - 4-digit year (e.g., 2025)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          MM
                        </code>{' '}
                        - 2-digit month (e.g., 01-12)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          DD
                        </code>{' '}
                        - 2-digit day (e.g., 01-31)
                      </li>
                    </ul>
                    <p className='mt-4'>
                      <strong>Examples:</strong>
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          "DD/MM/YYYY"
                        </code>{' '}
                        - European format (e.g., 25/12/2025)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          "MM-DD-YYYY"
                        </code>{' '}
                        - US format (e.g., 12-25-2025)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          "YYYY/MM/DD"
                        </code>{' '}
                        - ISO format (e.g., 2025/12/25)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          "YYYY년 MM월 DD일"
                        </code>{' '}
                        - Custom format with text (e.g., 2025년 12월 25일)
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Display Options' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component provides various display options to
                    customize the user interface. Control visual elements like
                    weekend highlighting, buttons, and preset range selections.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definitions:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`showWeekend?: boolean
todayBtn?: boolean
clearBtn?: boolean
presetRanges?: PresetRangesConfig

interface PresetRangesConfig {
  yesterday?: boolean      // Show "Yesterday" button
  last7days?: boolean      // Show "Last 7 days" button
  last30days?: boolean     // Show "Last 30 days" button
  thisMonth?: boolean      // Show "This month" button
  lastMonth?: boolean      // Show "Last month" button
  custom?: CustomPresetRange[]  // Array of custom preset ranges
}

interface CustomPresetRange {
  label: string  // Button label text
  range: Range   // Date range (from and to dates)
}`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Props:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <strong>showWeekend</strong> - When set to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>
                        , visually highlights weekend days. Weekend days differ
                        by calendar system: Saturday and Sunday for Gregorian,
                        Thursday and Friday for Jalali. Defaults to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          false
                        </code>
                        .
                      </li>
                      <li>
                        <strong>todayBtn</strong> - When set to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>
                        , displays a "Today" button in the calendar footer that
                        navigates to and selects today's date. Defaults to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          false
                        </code>
                        .
                      </li>
                      <li>
                        <strong>clearBtn</strong> - When set to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          true
                        </code>
                        , displays a "Clear" button in the{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          DtPicker
                        </code>{' '}
                        input field that resets the selection. Only available
                        for{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          DtPicker
                        </code>
                        . Defaults to{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          false
                        </code>
                        .
                      </li>
                      <li>
                        <strong>presetRanges</strong> - Configuration object for
                        preset date range buttons (only available when{' '}
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          type='range'
                        </code>
                        ). Options include:
                        <ul className='list-disc list-inside space-y-1 ml-6 mt-1'>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              yesterday
                            </code>{' '}
                            - Show "Yesterday" button
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              last7days
                            </code>{' '}
                            - Show "Last 7 days" button
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              last30days
                            </code>{' '}
                            - Show "Last 30 days" button
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              thisMonth
                            </code>{' '}
                            - Show "This month" button
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              lastMonth
                            </code>{' '}
                            - Show "Last month" button
                          </li>
                          <li>
                            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                              custom
                            </code>{' '}
                            - Array of custom preset ranges with custom labels
                            and date ranges
                          </li>
                        </ul>
                        <p className='mt-2'>
                          <strong>Note:</strong> To customize the labels of
                          preset range buttons, see{' '}
                          <a
                            href='/internationalization#preset-ranges'
                            className='text-blue-600 dark:text-blue-400 hover:underline'
                          >
                            Internationalization - Preset Ranges
                          </a>
                          .
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {groupName === 'Multiple Months' && (
                <div className='mb-8 space-y-4'>
                  <p className='text-gray-600 dark:text-gray-400 text-lg'>
                    The calendar component can display multiple months side by
                    side using the{' '}
                    <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                      numberOfMonths
                    </code>{' '}
                    prop. This is particularly useful for range selection,
                    allowing users to see a wider date range at once and select
                    start and end dates more easily.
                  </p>
                  <div>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Type Definition:
                    </p>
                    <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
                        {`numberOfMonths?: 1 | 2 | 3`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  <div className='text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                      Options:
                    </p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          1
                        </code>{' '}
                        - Display a single month (default)
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          2
                        </code>{' '}
                        - Display two months side by side
                      </li>
                      <li>
                        <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
                          3
                        </code>{' '}
                        - Display three months side by side
                      </li>
                    </ul>
                    <p className='mt-4'>
                      <strong>Note:</strong> Multiple months are especially
                      useful for range selection, as users can easily see and
                      select dates across month boundaries.
                    </p>
                  </div>
                </div>
              )}
              <div className='space-y-8'>
                {Object.entries(groupExamples).map(([exampleKey, config]) => (
                  <ExampleRenderer
                    key={exampleKey}
                    config={config}
                    exampleKey={exampleKey}
                    category={groupName}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
