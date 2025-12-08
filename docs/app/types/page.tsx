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
                <code>Date</code> objects, because <code>Day</code> objects
                provide better type safety, easier manipulation, and consistent
                behavior across different calendar systems (Gregorian and
                Jalali). The formatted string you see in the input field is only
                for display purposes.
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

        <h2 id='calendarsystem'>CalendarSystem</h2>

        <p>
          The <code>CalendarSystem</code> type is what you pass to the{' '}
          <code>calendarSystem</code> prop in <code>DtPicker</code> and{' '}
          <code>DtCalendar</code>. It accepts the full names or convenient
          shorthand aliases.
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
            {`type CalendarSystem = 'gregorian' | 'jalali' | 'ge' | 'ja'

// Full names:
// 'gregorian' - Gregorian calendar
// 'jalali' - Jalali calendar (Persian)

// Shorthand aliases:
// 'ge' - Alias for 'gregorian'
// 'ja' - Alias for 'jalali'`}
          </SyntaxHighlighter>
        </div>

        <h3>Example Usage</h3>

        <div className='rounded-lg overflow-hidden border border-border mb-4'>
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
            {`// All of these are valid:
<DtPicker calendarSystem="gregorian" onChange={setDate} />
<DtPicker calendarSystem="ge" onChange={setDate} />
<DtPicker calendarSystem="jalali" onChange={setDate} />
<DtPicker calendarSystem="ja" onChange={setDate} />

<DtCalendar calendarSystem="gregorian" onChange={setDate} />
<DtCalendar calendarSystem="ge" onChange={setDate} />
<DtCalendar calendarSystem="jalali" onChange={setDate} />
<DtCalendar calendarSystem="ja" onChange={setDate} />`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-4'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> The shorthand aliases (<code>'ge'</code>{' '}
                and <code>'ja'</code>) are automatically normalized to their
                full names internally. The library always works with{' '}
                <code>CalendarLocale</code> internally, but accepts{' '}
                <code>CalendarSystem</code> as a convenience for users.
              </p>
            </div>
          </div>
        </div>

        <h2 id='presetrangesconfig'>PresetRangesConfig</h2>

        <p>
          The <code>PresetRangesConfig</code> interface configures preset date
          range buttons that appear in the calendar footer when{' '}
          <code>type='range'</code>. These buttons allow users to quickly select
          common date ranges.
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
            {`interface PresetRangesConfig {
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
            {`import { DtCalendar } from 'react-calendar-datetime-picker'
import type { PresetRangesConfig } from 'react-calendar-datetime-picker'

const presetRanges: PresetRangesConfig = {
  yesterday: true,
  last7days: true,
  last30days: true,
  thisMonth: true,
  lastMonth: true,
  custom: [
    {
      label: 'Last 14 days',
      range: {
        from: { year: 2025, month: 11, day: 20 },
        to: { year: 2025, month: 12, day: 3 }
      }
    }
  ]
}

<DtCalendar type="range" presetRanges={presetRanges} />`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-4'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> Preset ranges are only available when{' '}
                <code>type='range'</code>. To customize the labels of preset
                range buttons, see the{' '}
                <Link
                  href='/customization#preset-ranges'
                  className='text-accent-light hover:text-accent-light-hover'
                >
                  Customization
                </Link>{' '}
                documentation.
              </p>
            </div>
          </div>
        </div>

        <h2 id='locale'>Locale</h2>

        <p>
          The <code>locale</code> prop accepts a <code>CalendarUILocale</code>{' '}
          type that specifies the user interface language and text direction for
          the calendar. Each locale determines both the language of labels and
          the number system (Latin vs Persian numerals).
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
            {`type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'

// Language locales:
// 'en' - English (Latin numerals, LTR)
// 'fa' - Persian (Persian numerals, RTL)
// 'de' - German (Latin numerals, LTR)
// 'es' - Spanish (Latin numerals, LTR)
// 'fr' - French (Latin numerals, LTR)`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-4'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> The number system (Latin vs Persian
                numerals) is automatically determined from the locale. Persian (
                <code>'fa'</code>) locale uses Persian numerals (۰-۹), while all
                other locales use Latin numerals (0-9).
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
