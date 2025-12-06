'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function MigrationGuide() {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Migration Guide: v1.x to v2.x</h1>

        <p>
          This guide helps you migrate from React Calendar DateTime Picker v1.x
          to v2.x. Version 2.x includes major improvements in TypeScript
          support, performance, and new features while maintaining backward
          compatibility where possible.
        </p>

        <div className='bg-bg-tertiary border-l-4 border-yellow-500 p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Minimal Breaking Changes:</strong> Version 2.x introduces
                minimal breaking changes. Most existing code will continue to work
                without modification, with only minor CSS class name updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-12'>
        {/* Quick Migration */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Quick Migration Checklist
            </h2>
            <p className='text-gray-300'>
              Follow these steps to migrate your application to v2.x.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <div className='flex items-center justify-center w-8 h-8 bg-bg-tertiary border border-accent rounded-full'>
                  <span className='text-sm font-medium text-accent'>1</span>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-medium text-white'>
                  Update Package Version
                </h3>
                <div className='mt-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='bash'
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      padding: '0.75rem'
                    }}
                  >
                    {`npm install react-calendar-datetime-picker@latest`}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <div className='flex items-center justify-center w-8 h-8 bg-bg-tertiary border border-accent rounded-full'>
                  <span className='text-sm font-medium text-accent'>2</span>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-medium text-white'>
                  Check for Breaking Changes
                </h3>
                <p className='text-gray-300 mt-1'>
                  Review the breaking changes section below and update your code
                  accordingly.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <div className='flex items-center justify-center w-8 h-8 bg-bg-tertiary border border-accent rounded-full'>
                  <span className='text-sm font-medium text-accent'>3</span>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-medium text-white'>
                  Test Your Application
                </h3>
                <p className='text-gray-300 mt-1'>
                  Run your tests and check that all date picker functionality
                  works as expected.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='flex-shrink-0'>
                <div className='flex items-center justify-center w-8 h-8 bg-bg-tertiary border border-accent rounded-full'>
                  <span className='text-sm font-medium text-accent'>4</span>
                </div>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-medium text-white'>
                  Explore New Features
                </h3>
                <p className='text-gray-300 mt-1'>
                  Take advantage of new features like improved TypeScript
                  support, better accessibility, and enhanced customization
                  options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breaking Changes */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Breaking Changes
            </h2>
            <p className='text-gray-300'>
              Changes that may require updates to your existing code.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='border-l-4 border-orange-500 bg-bg-tertiary p-4'>
              <div className='flex'>
                <div className='ml-3'>
                  <h3 className='text-lg font-medium text-white'>
                    Prop Name Changes
                  </h3>
                  <p className='text-sm text-gray-200 mt-1'>
                    Some prop names have been updated for clarity and
                    consistency:
                  </p>
                  <div className='mt-3 space-y-3'>
                    <div>
                      <code className='text-sm bg-bg-primary border border-orange-500 px-2 py-1 rounded text-gray-200'>
                        calenderModalClass
                      </code>
                      <span className='text-gray-300 mx-2'>→</span>
                      <code className='text-sm bg-bg-primary border border-accent px-2 py-1 rounded text-gray-200'>
                        calendarModalClass
                      </code>
                      <span className='text-sm text-gray-300 ml-2'>
                        (spelling corrected)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-l-4 border-accent bg-bg-tertiary p-4'>
              <div className='flex'>
                <div className='ml-3'>
                  <h3 className='text-lg font-medium text-white'>
                    TypeScript Improvements
                  </h3>
                  <p className='text-sm text-gray-200 mt-1'>
                    Enhanced TypeScript support with stricter types and better
                    type inference. Some type definitions have changed:
                  </p>
                  <div className='mt-3'>
                    <p className='text-sm text-gray-200'>
                      The <code>Day</code> interface now includes optional{' '}
                      <code>hour</code> and <code>minute</code> properties for
                      time support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-l-4 border-accent bg-bg-tertiary p-4'>
              <div className='flex'>
                <div className='ml-3'>
                  <h3 className='text-lg font-medium text-white'>
                    CSS Class Changes
                  </h3>
                  <p className='text-sm text-gray-200 mt-1'>
                    Some CSS class names have been updated for consistency:
                  </p>
                  <div className='mt-3 space-y-2'>
                    <div className='text-sm'>
                      <code className='bg-bg-primary border border-accent px-2 py-1 rounded text-gray-200'>
                        calendar-picker-input-wrapper
                      </code>{' '}
                      - Input wrapper
                    </div>
                    <div className='text-sm'>
                      <code className='bg-bg-primary border border-accent px-2 py-1 rounded text-gray-200'>
                        calendar-picker-modal
                      </code>{' '}
                      - Modal container
                    </div>
                    <div className='text-sm'>
                      <code className='bg-bg-primary border border-accent px-2 py-1 rounded text-gray-200'>
                        react-calendar-datetime-picker
                      </code>{' '}
                      - Main calendar container
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's New in v2.x */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              What's New in v2.x
            </h2>
            <p className='text-gray-300 mb-4'>
              Version 2.x brings significant improvements and new capabilities.
              Check out the comprehensive list of features on the homepage.
            </p>
            <div className='text-center'>
              <a
                href='/#new-features-v2x'
                className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-hover transition-colors'
              >
                Explore New Features →
              </a>
            </div>
          </div>
        </section>

        {/* Migration Examples */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Migration Examples
            </h2>
            <p className='text-gray-300'>
              Before and after examples showing how to migrate your code.
            </p>
          </div>

          <div className='space-y-8'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Basic Date Picker
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
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
                      {`import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      local="en"
      placeholder="Select date"
    />
  )
}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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
                      {`import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      locale="en"
      placeholder="Select date"
    />
  )
}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Calendar with Persian Locale
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-red-500'>
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

<DtCalendar
  initValue={date}
  onChange={setDate}
  local="fa"
  showWeekend={true}
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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

<DtCalendar
  initValue={date}
  onChange={setDate}
  local="fa"
  showWeekend={true}
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Date Range with Time
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-red-500'>
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
                      {`<DtPicker
  initValue={range}
  onChange={setRange}
  type="range"
  withTime={true}
  local="en"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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
                      {`<DtPicker
  initValue={range}
  onChange={setRange}
  type="range"
  withTime={true}
  locale="en"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced initValue Support */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Enhanced initValue Support
            </h2>
            <p className='text-gray-300'>
              Version 2.x supports more flexible initValue formats and better
              type safety for initialization.
            </p>
          </div>

          <div className='space-y-8'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Single Date - Multiple Input Formats
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
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
                      {`// Only Day object format
<DtPicker
  initValue={{ year: 2023, month: 12, day: 25 }}
  onChange={setDate}
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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
                      {`// Multiple formats supported
<DtPicker
  initValue="2023-12-25"  // ISO string
  onChange={setDate}
/>

<DtPicker
  initValue={new Date(2023, 11, 25)}  // Date object
  onChange={setDate}
/>

<DtPicker
  initValue={1703452800000}  // Timestamp
  onChange={setDate}
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Range Selection - Enhanced Flexibility
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-red-500'>
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
                      {`// Limited to specific object format
<DtPicker
  initValue={{
    from: { year: 2023, month: 12, day: 1 },
    to: { year: 2023, month: 12, day: 31 }
  }}
  onChange={setRange}
  type="range"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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
                      {`// Flexible range initialization
<DtPicker
  initValue={{
    from: "2023-12-01",
    to: "2023-12-31"
  }}
  onChange={setRange}
  type="range"
/>

<DtPicker
  initValue={{
    from: new Date(2023, 11, 1),
    to: new Date(2023, 11, 31)
  }}
  onChange={setRange}
  type="range"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Multi-Selection - Array Support
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-white mb-2'>Before (v1.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-red-500'>
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
                      {`// Complex object array format
<DtPicker
  initValue={[
    { year: 2023, month: 12, day: 1 },
    { year: 2023, month: 12, day: 15 },
    { year: 2023, month: 12, day: 25 }
  ]}
  onChange={setMulti}
  type="multi"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-white mb-2'>After (v2.x)</h4>
                  <div className='rounded-lg overflow-hidden border border-accent'>
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
                      {`// Mixed format array support
<DtPicker
  initValue={[
    "2023-12-01",
    new Date(2023, 11, 15),
    1703452800000  // timestamp
  ]}
  onChange={setMulti}
  type="multi"
/>

// Or still use Day objects
<DtPicker
  initValue={[
    { year: 2023, month: 12, day: 1 },
    { year: 2023, month: 12, day: 15 }
  ]}
  onChange={setMulti}
  type="multi"
/>`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Utility Functions */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Utility Functions Update
            </h2>
            <p className='text-gray-300'>
              Utility functions have been enhanced and some function signatures
              have changed.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                Date Comparison Functions
              </h3>
              <p className='text-gray-300 mb-4'>
                All comparison functions now accept an optional locale
                parameter:
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
                  {`// v2.x - locale parameter is now optional
isBefore(date1, date2, 'en')  // Gregorian
isBefore(date1, date2, 'fa')  // Jalali
isBefore(date1, date2)        // Uses default locale`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-white mb-4'>
                New Utility Functions
              </h3>
              <p className='text-gray-300 mb-4'>
                Version 2.x adds several new utility functions:
              </p>
              <ul className='list-disc list-inside text-gray-300 space-y-2'>
                <li>
                  <code>convertToJalali()</code> and{' '}
                  <code>convertToGregorian()</code> - Calendar conversion
                </li>
                <li>
                  <code>startOfDay()</code>, <code>endOfDay()</code> - Day
                  boundaries
                </li>
                <li>
                  <code>startOfMonth()</code>, <code>endOfMonth()</code> - Month
                  boundaries
                </li>
                <li>
                  <code>startOfYear()</code>, <code>endOfYear()</code> - Year
                  boundaries
                </li>
                <li>
                  <code>getDifferenceInMonths()</code>,{' '}
                  <code>getDifferenceInYears()</code> - Extended differences
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className='bg-bg-tertiary border border-border rounded-lg p-8'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Need Help with Migration?
            </h2>
            <p className='text-gray-300 mb-6'>
              If you encounter any issues during migration or need clarification
              on breaking changes, don't hesitate to reach out.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='https://github.com/mmehdinasiri/react-calendar-datetime-picker/issues'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-hover'
              >
                Report Issues
              </a>
              <a
                href='https://github.com/mmehdinasiri/react-calendar-datetime-picker/discussions'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-white bg-bg-secondary hover:bg-bg-tertiary'
              >
                Start Discussion
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
