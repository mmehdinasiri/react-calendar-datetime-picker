'use client'

import Link from 'next/link'
import {
  CodeBlock,
  InfoBox,
  Breadcrumb,
  FeatureList,
  Note,
  Important
} from '../components'

export default function Types() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>LEARN REACT CALENDAR &gt;</Breadcrumb>
        <h1>Data Types</h1>

        <p>
          React Calendar DateTime Picker uses specific data structures to
          represent dates and date selections. Understanding these types is
          essential for working with the library effectively.
        </p>

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>Important:</strong> The library stores dates as{' '}
            <code>Day</code> objects, not strings or JavaScript{' '}
            <code>Date</code> objects, because <code>Day</code> objects provide
            better type safety, easier manipulation, and consistent behavior
            across different calendar systems (Gregorian and Jalali). The
            formatted string you see in the input field is only for display
            purposes.
          </p>
        </Important>

        <h2 id='day'>Day</h2>

        <p>
          The <code>Day</code> interface represents a single date. This is the
          fundamental type used throughout the library.
        </p>

        <CodeBlock
          language='typescript'
          code={`interface Day {
  year: number      // Year (e.g., 2025)
  month: number     // Month (1-12, not 0-11 like JavaScript Date)
  day: number       // Day of month (1-31)
  hour?: number     // Optional: Hour (0-23) for time selection
  minute?: number   // Optional: Minute (0-59) for time selection
}`}
          className='mb-4'
        />

        <h3>Example</h3>

        <CodeBlock
          language='typescript'
          code={`// December 2, 2025 at 3:30 PM
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
          className='mb-4'
        />

        <InfoBox variant='warning'>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> Unlike JavaScript's <code>Date</code> object
            where months are 0-indexed (0-11), the <code>Day</code> interface
            uses 1-indexed months (1-12), which is more intuitive.
          </p>
        </InfoBox>

        <h2 id='range'>Range</h2>

        <p>
          The <code>Range</code> interface represents a date range with a start
          and end date. Used for range selection type.
        </p>

        <CodeBlock
          language='typescript'
          code={`interface Range {
  from: Day  // Start date (inclusive)
  to: Day    // End date (inclusive)
}`}
          className='mb-4'
        />

        <h3>Example</h3>

        <CodeBlock
          language='typescript'
          code={`const dateRange: Range = {
  from: { year: 2025, month: 12, day: 1 },
  to: { year: 2025, month: 12, day: 15 }
}`}
          className='mb-4'
        />

        <h2 id='multi'>Multi</h2>

        <p>
          The <code>Multi</code> type represents multiple selected dates. It's
          an array of <code>Day</code> objects. Used for multiple date selection
          type.
        </p>

        <CodeBlock
          language='typescript'
          code='type Multi = Day[]'
          className='mb-4'
        />

        <h3>Example</h3>

        <CodeBlock
          language='typescript'
          code={`const multipleDates: Multi = [
  { year: 2025, month: 12, day: 1 },
  { year: 2025, month: 12, day: 5 },
  { year: 2025, month: 12, day: 10 },
  { year: 2025, month: 12, day: 15 }
]`}
          className='mb-4'
        />

        <h2 id='week'>Week</h2>

        <p>
          The <code>Week</code> interface represents a week selection with start
          and end dates. Used for week selection type.
        </p>

        <CodeBlock
          language='typescript'
          code={`interface Week {
  from: Day  // Start date of the week
  to: Day    // End date of the week
}`}
          className='mb-4'
        />

        <h3>Example</h3>

        <CodeBlock
          language='typescript'
          code={`const week: Week = {
  from: { year: 2025, month: 12, day: 1 },   // Monday
  to: { year: 2025, month: 12, day: 7 }     // Sunday
}`}
          className='mb-4'
        />

        <h2 id='calendarsystem'>CalendarSystem</h2>

        <p>
          The <code>CalendarSystem</code> type is what you pass to the{' '}
          <code>calendarSystem</code> prop in <code>DtPicker</code> and{' '}
          <code>DtCalendar</code>. It accepts the full names or convenient
          shorthand aliases.
        </p>

        <CodeBlock
          language='typescript'
          code={`type CalendarSystem = 'gregorian' | 'jalali' | 'ge' | 'ja'

// Full names:
// 'gregorian' - Gregorian calendar
// 'jalali' - Jalali calendar (Persian)

// Shorthand aliases:
// 'ge' - Alias for 'gregorian'
// 'ja' - Alias for 'jalali'`}
          className='mb-4'
        />

        <h3>Example Usage</h3>

        <CodeBlock
          language='tsx'
          code={`// All of these are valid:
<DtPicker calendarSystem="gregorian" onChange={setDate} />
<DtPicker calendarSystem="ge" onChange={setDate} />
<DtPicker calendarSystem="jalali" onChange={setDate} />
<DtPicker calendarSystem="ja" onChange={setDate} />

<DtCalendar calendarSystem="gregorian" onChange={setDate} />
<DtCalendar calendarSystem="ge" onChange={setDate} />
<DtCalendar calendarSystem="jalali" onChange={setDate} />
<DtCalendar calendarSystem="ja" onChange={setDate} />`}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> The shorthand aliases (<code>'ge'</code> and{' '}
            <code>'ja'</code>) are automatically normalized to their full names
            internally. The library always works with{' '}
            <code>CalendarLocale</code> internally, but accepts{' '}
            <code>CalendarSystem</code> as a convenience for users.
          </p>
        </Note>

        <h2 id='presetrangesconfig'>PresetRangesConfig</h2>

        <p>
          The <code>PresetRangesConfig</code> interface configures preset date
          range buttons that appear in the calendar footer when{' '}
          <code>type='range'</code>. These buttons allow users to quickly select
          common date ranges.
        </p>

        <CodeBlock
          language='typescript'
          code={`interface PresetRangesConfig {
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
          className='mb-4'
        />

        <h3>Example</h3>

        <CodeBlock
          language='typescript'
          code={`import { DtCalendar } from 'react-calendar-datetime-picker'
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
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> Preset ranges are only available when{' '}
            <code>type='range'</code>. To customize the labels of preset range
            buttons, see the{' '}
            <Link
              href='/customization#preset-ranges'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Customization
            </Link>{' '}
            documentation.
          </p>
        </Note>

        <h2 id='locale'>Locale</h2>

        <p>
          The <code>locale</code> prop accepts a <code>CalendarUILocale</code>{' '}
          type that specifies the user interface language and text direction for
          the calendar. Each locale determines both the language of labels and
          the number system (Latin vs Persian numerals).
        </p>

        <CodeBlock
          language='typescript'
          code={`type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'

// Language locales:
// 'en' - English (Latin numerals, LTR)
// 'fa' - Persian (Persian numerals, RTL)
// 'de' - German (Latin numerals, LTR)
// 'es' - Spanish (Latin numerals, LTR)
// 'fr' - French (Latin numerals, LTR)`}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> The number system (Latin vs Persian numerals)
            is automatically determined from the locale. Persian (
            <code>'fa'</code>) locale uses Persian numerals (۰-۹), while all
            other locales use Latin numerals (0-9).
          </p>
        </Note>

        <h2>Type Safety</h2>

        <p>
          The library is fully typed with TypeScript, so you'll get type
          checking and autocomplete support:
        </p>

        <CodeBlock
          language='typescript'
          code={`import { DtPicker } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState<Day | null>(null)

  return <DtPicker onChange={setDate} />
}

// TypeScript will ensure 'date' is always a Day object or null`}
          className='mb-4'
        />

        <FeatureList
          title='Next Steps'
          items={[
            {
              href: '/getting-started',
              text: 'Learn how to use these types in the Quick Start',
              description: 'guide'
            },
            {
              href: '/examples',
              text: 'See interactive examples',
              description: 'demonstrating these types in action'
            },
            {
              href: '/api-reference',
              text: 'Check the API Reference',
              description: 'for detailed type definitions'
            }
          ]}
          variant='next-steps'
          headingLevel={2}
        />
      </div>
    </div>
  )
}
