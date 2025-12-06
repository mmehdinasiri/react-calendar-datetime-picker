'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Types() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <div className='mb-4 text-sm text-gray-400 uppercase tracking-wider'>
          LEARN REACT CALENDAR &gt;
        </div>
        <h1>Data Types</h1>

        <p>
          React Calendar DateTime Picker uses specific data structures to
          represent dates and date selections. Understanding these types is
          essential for working with the library effectively.
        </p>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Important:</strong> The library stores dates as{' '}
                <code>Day</code> objects, not strings or JavaScript{' '}
                <code>Date</code> objects, because <code>Day</code> objects provide
                better type safety, easier manipulation, and consistent behavior
                across different calendar systems (Gregorian and Jalali). The
                formatted string you see in the input field is only for display
                purposes.
              </p>
            </div>
          </div>
        </div>

        <h2 id='day'>Day</h2>

        <p>
          The <code>Day</code> interface represents a single date. This is the
          fundamental type used throughout the library.
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
            {`interface Day {
  year: number      // Year (e.g., 2025)
  month: number     // Month (1-12, not 0-11 like JavaScript Date)
  day: number       // Day of month (1-31)
  hour?: number     // Optional: Hour (0-23) for time selection
  minute?: number   // Optional: Minute (0-59) for time selection
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`// December 2, 2025 at 3:30 PM
const date: Day = {
  year: 2025,
  month: 12,
  day: 2,
  hour: 15,
  minute: 30
}

// Date without time
const dateOnly: Day = {
  year: 2025,
  month: 12,
  day: 2
}`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-yellow-500 p-4 my-4'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> Unlike JavaScript's <code>Date</code>{' '}
                object where months are 0-indexed (0-11), the <code>Day</code>{' '}
                interface uses 1-indexed months (1-12), which is more intuitive.
              </p>
            </div>
          </div>
        </div>

        <h2 id='range'>Range</h2>

        <p>
          The <code>Range</code> interface represents a date range with a start
          and end date. Used for range selection type.
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
            {`interface Range {
  from: Day  // Start date (inclusive)
  to: Day    // End date (inclusive)
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`const dateRange: Range = {
  from: { year: 2025, month: 12, day: 1 },
  to: { year: 2025, month: 12, day: 15 }
}`}
          </SyntaxHighlighter>
        </div>

        <h2 id='multi'>Multi</h2>

        <p>
          The <code>Multi</code> type represents multiple selected dates. It's
          an array of <code>Day</code> objects. Used for multiple date selection
          type.
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
            {`type Multi = Day[]`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`const multipleDates: Multi = [
  { year: 2025, month: 12, day: 1 },
  { year: 2025, month: 12, day: 5 },
  { year: 2025, month: 12, day: 10 },
  { year: 2025, month: 12, day: 15 }
]`}
          </SyntaxHighlighter>
        </div>

        <h2 id='week'>Week</h2>

        <p>
          The <code>Week</code> interface represents a week selection with start
          and end dates. Used for week selection type.
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
            {`interface Week {
  from: Day  // Start date of the week
  to: Day    // End date of the week
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`const week: Week = {
  from: { year: 2025, month: 12, day: 1 },   // Monday
  to: { year: 2025, month: 12, day: 7 }     // Sunday
}`}
          </SyntaxHighlighter>
        </div>

        <h2 id='time'>Time</h2>

        <p>
          The <code>Time</code> interface represents a time of day (without a
          date).
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
            {`interface Time {
  hour: number    // Hour (0-23)
  minute: number  // Minute (0-59)
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`const time: Time = {
  hour: 15,   // 3 PM
  minute: 30
}`}
          </SyntaxHighlighter>
        </div>

        <h2 id='timerange'>TimeRange</h2>

        <p>
          The <code>TimeRange</code> interface represents a time range with
          start and end times.
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
            {`interface TimeRange {
  from: Time  // Start time
  to: Time    // End time
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example</h3>

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
            {`const timeRange: TimeRange = {
  from: { hour: 9, minute: 0 },   // 9:00 AM
  to: { hour: 17, minute: 30 }    // 5:30 PM
}`}
          </SyntaxHighlighter>
        </div>

        <h2 id='calendarlocale'>CalendarLocale</h2>

        <p>
          The <code>CalendarLocale</code> type specifies which calendar system
          to use.
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
            {`type CalendarLocale = 'en' | 'fa'

// 'en' - Gregorian calendar (English)
// 'fa' - Jalali calendar (Persian)`}
          </SyntaxHighlighter>
        </div>

        <h2 id='calendartype'>CalendarType</h2>

        <p>
          The <code>CalendarType</code> type specifies the selection mode of the
          calendar.
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
            {`type CalendarType = 'single' | 'range' | 'multi' | 'week'

// 'single' - Select a single date
// 'range'  - Select a date range
// 'multi'  - Select multiple dates
// 'week'   - Select an entire week`}
          </SyntaxHighlighter>
        </div>

        <h2 id='dateinput'>DateInput</h2>

        <p>
          The <code>DateInput</code> type represents all possible input formats
          that can be accepted by the calendar. The library normalizes these to{' '}
          <code>Day</code> objects internally.
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
            {`type DateInput = 
  | Day                    // Day object
  | Date                   // JavaScript Date object
  | string                 // Date string (e.g., "2025-12-02")
  | number                 // Timestamp (milliseconds)

// All of these are valid:
const date1: DateInput = { year: 2025, month: 12, day: 2 }
const date2: DateInput = new Date(2025, 11, 2)
const date3: DateInput = "2025-12-02"
const date4: DateInput = 1733097600000`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> While you can pass various input formats
                (Date objects, strings, timestamps), the <code>onChange</code>{' '}
                callback always returns a <code>Day</code> object (or{' '}
                <code>Range</code>, <code>Multi</code>, <code>Week</code> for
                other selection types).
              </p>
            </div>
          </div>
        </div>

        <h2>Understanding the Value vs Display</h2>

        <p>
          It's crucial to understand the difference between the stored value and
          the displayed format:
        </p>

        <div className='space-y-4'>
          <div className='border border-border rounded-lg p-4 bg-bg-secondary'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Stored Value (State)
            </h3>
            <p className='text-gray-700 dark:text-gray-300 mb-2'>
              The actual value stored in your state is always a structured
              object:
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
                {`// Single date
{ year: 2025, month: 12, day: 2 }

// Range
{ from: { year: 2025, month: 12, day: 1 }, 
  to: { year: 2025, month: 12, day: 15 } }

// Multiple dates
[{ year: 2025, month: 12, day: 1 }, 
 { year: 2025, month: 12, day: 5 }]`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className='border border-border rounded-lg p-4 bg-bg-secondary'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
              Display Format (Input Field)
            </h3>
            <p className='text-gray-700 dark:text-gray-300 mb-2'>
              The input field shows a formatted string, which is only for
              display:
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
                {`// Single date
"2025/12/02"

// Range
"from 2025/12/01 to 2025/12/15"

// Multiple dates
"3 dates selected"`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Remember:</strong> The formatted string in the input
                field is generated from the <code>Day</code> object using the{' '}
                <code>dateFormat</code> prop. You can customize the display
                format, but the state value remains a structured object.
              </p>
            </div>
          </div>
        </div>

        <h2>Type Safety</h2>

        <p>
          The library is fully typed with TypeScript, so you'll get type
          checking and autocomplete support:
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
            {`import { DtPicker } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState<Day | null>(null)

  return <DtPicker onChange={setDate} />
}

// TypeScript will ensure 'date' is always a Day object or null`}
          </SyntaxHighlighter>
        </div>

        <h2>Next Steps</h2>

        <ul>
          <li>
            Learn how to use these types in the{' '}
            <Link
              href='/getting-started'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Quick Start
            </Link>{' '}
            guide
          </li>
          <li>
            See{' '}
            <Link
              href='/examples'
              className='text-accent-light hover:text-accent-light-hover'
            >
              interactive examples
            </Link>{' '}
            demonstrating these types in action
          </li>
          <li>
            Check the{' '}
            <Link
              href='/api-reference'
              className='text-accent-light hover:text-accent-light-hover'
            >
              API Reference
            </Link>{' '}
            for detailed type definitions
          </li>
        </ul>
      </div>
    </div>
  )
}
