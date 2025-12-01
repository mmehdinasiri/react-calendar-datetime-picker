'use client'

import { useState } from 'react'
import { DtCalendar } from '../../../src/components/DtCalendar'
import '../../../src/styles/index.scss'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  cssVariables,
  getColorValue,
  getDarkColorValue
} from '../data/cssVariables'
import type { InitValueInput } from '../../../src/types'
import { getToday, subtractDays } from '../../../src/utils'

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

const CircleLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='10' cy='10' r='9' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M11 7L8 10L11 13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const CircleRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='10' cy='10' r='9' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M9 7L12 10L9 13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default function Customization() {
  const [customDate, setCustomDate] = useState<any>(null)
  const [darkDate, setDarkDate] = useState<InitValueInput | undefined>(
    undefined
  )
  const [presetRangeDate, setPresetRangeDate] = useState<
    InitValueInput | undefined
  >(undefined)

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
        {/* Themes */}
        <section
          id='themes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>Themes</h2>
            <p className='text-gray-300'>
              The calendar supports light and dark themes, as well as custom
              themes using CSS variables.
            </p>
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
            <h2 className='text-2xl font-bold text-white mb-2'>
              CSS Variables (Recommended)
            </h2>
            <p className='text-gray-300'>
              The easiest way to customize the calendar appearance is by
              overriding CSS variables. Apply custom variables using the
              calenderModalClass prop.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Available CSS Variables
              </h3>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
                  <thead className='bg-bg-tertiary'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Variable
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Light Theme Default
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Dark Theme Default
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-bg-secondary divide-y divide-border'>
                    {cssVariables.map((variable, index) => {
                      const lightColor = getColorValue(variable.lightTheme)
                      const darkColor = getDarkColorValue(variable.darkTheme)
                      const isEven = index % 2 === 0

                      return (
                        <tr
                          key={variable.name}
                          className={isEven ? '' : 'bg-bg-tertiary'}
                        >
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                            <code>{variable.name}</code>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            <div className='flex items-center gap-2'>
                              <code>{variable.lightTheme}</code>
                              <div
                                className='w-6 h-6 rounded border border-border'
                                style={{ backgroundColor: lightColor }}
                              />
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            <div className='flex items-center gap-2'>
                              <code>{variable.darkTheme}</code>
                              <div
                                className='w-6 h-6 rounded border border-border'
                                style={{ backgroundColor: darkColor }}
                              />
                            </div>
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-300'>
                            {variable.description}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Using calenderModalClass Prop
              </h3>
              <div className='bg-bg-tertiary border-l-4 border-accent p-4'>
                <p className='text-sm text-gray-200'>
                  <strong>Tip:</strong> This approach applies the class directly
                  to the calendar component, making it cleaner and more direct.
                </p>
              </div>
            </div>
          </div>

          {/* CSS Variables Examples */}
          <div className='mt-8 space-y-6'>
            <div className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                  Blue Theme Example
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
                      todayBtn={true}
                      calenderModalClass='calendar-blue-theme'
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    CSS Styles
                  </h3>
                  <div className='rounded-lg overflow-hidden border border-border mb-4'>
                    <SyntaxHighlighter
                      language='css'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}
                    >
                      {`/* styles.css */
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
                    </SyntaxHighlighter>
                  </div>
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
                      {`import { DtCalendar } from 'react-calendar-datetime-picker'
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
                    </SyntaxHighlighter>
                  </div>
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
            <div className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                  Brown Theme Example
                </h2>
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
                      onChange={(date) =>
                        setDarkDate(date as InitValueInput | undefined)
                      }
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
                  <div className='rounded-lg overflow-hidden border border-border mb-4'>
                    <SyntaxHighlighter
                      language='css'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}
                    >
                      {`/* styles.css */
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
                    </SyntaxHighlighter>
                  </div>
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
                      {`import { DtCalendar } from 'react-calendar-datetime-picker'
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
                    </SyntaxHighlighter>
                  </div>
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
          </div>
        </section>

        {/* Custom Classes */}
        <section
          id='custom-classes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Custom CSS Classes
            </h2>
            <p className='text-gray-300'>
              Override specific calendar elements using the{' '}
              <code>calenderModalClass</code> prop and custom CSS.
            </p>
          </div>

          <div className='space-y-6'>
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
                {`<DtCalendar
  calenderModalClass="my-custom-calendar"
  // ... other props
/>`}
              </SyntaxHighlighter>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Available CSS Classes
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>
                    Calendar Structure
                  </h4>
                  <ul className='text-sm text-gray-300 space-y-1'>
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
                  <h4 className='font-medium text-white mb-2'>
                    Interactive Elements
                  </h4>
                  <ul className='text-sm text-gray-300 space-y-1'>
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
            <h2 className='text-2xl font-bold text-white mb-2'>
              Custom Icons and Labels
            </h2>
            <p className='text-gray-300'>
              Customize navigation icons and text labels using the{' '}
              <code>customization</code> prop.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Custom Icons
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
                  {`import { DtCalendar } from 'react-calendar-datetime-picker'

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
  return (
    <DtCalendar
      customization={{
        icons: {
          previous: CustomPrevIcon,
          next: CustomNextIcon
        }
      }}
    />
  )
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Custom Labels
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
                  {`<DtCalendar
  customization={{
    labels: {
      nextMonth: 'Next',
      previousMonth: 'Previous'
    }
  }}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Localized Month and Weekday Names
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
                  {`<DtCalendar
  customization={{
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    weekdayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

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
                wrapper: 'calendar-container'
              }}
              exampleKey='CustomArrowIcons'
            />
            <ExampleRenderer
              config={{
                title: 'Custom Circle Icons',
                description:
                  'Calendar with different style icons - circle arrows',
                component: 'DtCalendar',
                props: {
                  customization: {
                    icons: {
                      previous: CircleLeftIcon,
                      next: CircleRightIcon
                    }
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='CustomCircleIcons'
            />
            <ExampleRenderer
              config={{
                title: 'Custom Month and Weekday Names',
                description:
                  'Calendar with both custom month and weekday names - fully customize the calendar labels',
                component: 'DtCalendar',
                props: {
                  customization: {
                    monthNames: [
                      'Janvier',
                      'Février',
                      'Mars',
                      'Avril',
                      'Mai',
                      'Juin',
                      'Juillet',
                      'Août',
                      'Septembre',
                      'Octobre',
                      'Novembre',
                      'Décembre'
                    ],
                    weekdayNames: [
                      'Dim',
                      'Lun',
                      'Mar',
                      'Mer',
                      'Jeu',
                      'Ven',
                      'Sam'
                    ]
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='CustomMonthAndWeekdayNames'
            />
            <ExampleRenderer
              config={{
                title: 'Spanish Month and Weekday Names',
                description:
                  'Calendar with Spanish month and weekday names - example of localization using customization prop',
                component: 'DtCalendar',
                props: {
                  customization: {
                    monthNames: [
                      'Enero',
                      'Febrero',
                      'Marzo',
                      'Abril',
                      'Mayo',
                      'Junio',
                      'Julio',
                      'Agosto',
                      'Septiembre',
                      'Octubre',
                      'Noviembre',
                      'Diciembre'
                    ],
                    weekdayNames: [
                      'Dom',
                      'Lun',
                      'Mar',
                      'Mié',
                      'Jue',
                      'Vie',
                      'Sáb'
                    ]
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='CustomNamesSpanish'
            />
          </div>
        </section>

        {/* Preset Ranges */}
        <section
          id='preset-ranges'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Preset Date Ranges
            </h2>
            <p className='text-gray-300'>
              Add quick selection buttons for common date ranges like "Last 7
              days", "This month", etc.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Built-in Presets
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
                  {`<DtCalendar
  type="range"
  presetRanges={{
    yesterday: true,
    last7days: true,
    last30days: true,
    thisMonth: true,
    lastMonth: true
  }}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Custom Preset Labels
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
                  {`<DtCalendar
  type="range"
  presetRanges={{
    yesterday: 'Yesterday',
    last7days: 'Past Week',
    thisMonth: 'Current Month'
  }}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Custom Preset Ranges
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
                  {`<DtCalendar
  type="range"
  presetRanges={{
    custom: [
      {
        label: 'Last 14 days',
        range: {
          from: { year: 2024, month: 11, day: 15 },
          to: { year: 2024, month: 11, day: 29 }
        }
      },
      {
        label: 'Next 7 days',
        range: {
          from: { year: 2024, month: 12, day: 1 },
          to: { year: 2024, month: 12, day: 7 }
        }
      }
    ]
  }}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Preset Ranges Examples */}
          <div className='mt-8 space-y-6'>
            <ExampleRenderer
              config={{
                title: 'Built-in Preset Ranges',
                description:
                  'Calendar with built-in preset range buttons for quick date range selection',
                component: 'DtCalendar',
                props: {
                  type: 'range',
                  presetRanges: {
                    yesterday: true,
                    last7days: true,
                    last30days: true,
                    thisMonth: true,
                    lastMonth: true
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='BuiltInPresetRanges'
            />
            <ExampleRenderer
              config={{
                title: 'Custom Preset Labels',
                description:
                  'Preset ranges with custom labels for localization or branding',
                component: 'DtCalendar',
                props: {
                  type: 'range',
                  presetRanges: {
                    yesterday: 'Yesterday',
                    last7days: 'Past Week',
                    last30days: 'Past Month',
                    thisMonth: 'Current Month',
                    lastMonth: 'Previous Month'
                  },
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='CustomPresetLabels'
            />
            <div
              id='custom-preset-ranges'
              className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
            >
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                  Custom Preset Ranges
                </h2>
                <p className='text-gray-700 dark:text-gray-300'>
                  Define your own custom date ranges using Day objects
                </p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Component
                  </h3>
                  <div className='calendar-container'>
                    <DtCalendar
                      initValue={presetRangeDate}
                      onChange={(date) =>
                        setPresetRangeDate(date as InitValueInput | undefined)
                      }
                      type='range'
                      presetRanges={{
                        custom: [
                          {
                            label: 'Last 14 Days',
                            range: {
                              from: subtractDays(getToday('en'), 13),
                              to: getToday('en')
                            }
                          },
                          {
                            label: 'Last 30 Days',
                            range: {
                              from: subtractDays(getToday('en'), 29),
                              to: getToday('en')
                            }
                          }
                        ]
                      }}
                      showWeekend={true}
                      todayBtn={true}
                    />
                  </div>
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
                      {`import { DtCalendar } from 'react-calendar-datetime-picker'
import { getToday, subtractDays } from 'react-calendar-datetime-picker/utils'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      type="range"
      presetRanges={{
        custom: [
          {
            label: 'Last 14 Days',
            range: {
              from: subtractDays(getToday('en'), 13),
              to: getToday('en')
            }
          },
          {
            label: 'Last 30 Days',
            range: {
              from: subtractDays(getToday('en'), 29),
              to: getToday('en')
            }
          }
        ]
      }}
      onChange={setDate}
    />
  )
}`}
                    </SyntaxHighlighter>
                  </div>
                  <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                    <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                      Result
                    </h4>
                    <p className='text-sm text-gray-700 dark:text-gray-200'>
                      Selected value:{' '}
                      <code className='text-xs'>
                        {presetRangeDate
                          ? JSON.stringify(presetRangeDate, null, 2)
                          : 'null'}
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
