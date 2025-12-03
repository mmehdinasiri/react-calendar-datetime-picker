'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Installation() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <div className='mb-4 text-sm text-gray-400 uppercase tracking-wider'>
          GET STARTED &gt;
        </div>
        <h1>Installation</h1>

        <p>
          Install React Calendar DateTime Picker using your preferred package
          manager.
        </p>

        <h2>Package Managers</h2>

        <p>Install the package using npm, yarn, or pnpm:</p>

        <div className='rounded-lg overflow-hidden border border-border mb-4'>
          <SyntaxHighlighter
            language='bash'
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}
          >
            {`npm install react-calendar-datetime-picker`}
          </SyntaxHighlighter>
        </div>

        <div className='rounded-lg overflow-hidden border border-border mb-4'>
          <SyntaxHighlighter
            language='bash'
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}
          >
            {`yarn add react-calendar-datetime-picker`}
          </SyntaxHighlighter>
        </div>

        <div className='rounded-lg overflow-hidden border border-border mb-4'>
          <SyntaxHighlighter
            language='bash'
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}
          >
            {`pnpm add react-calendar-datetime-picker`}
          </SyntaxHighlighter>
        </div>

        <h2>Import Styles</h2>

        <p>
          Import the CSS file to ensure the calendar displays correctly. You can
          import it in your main entry file or component:
        </p>

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
            {`import 'react-calendar-datetime-picker/dist/style.css'`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> If you're using a bundler that supports
                CSS imports, you can also import the styles directly in your
                component files.
              </p>
            </div>
          </div>
        </div>

        <h2>Understanding Date Values</h2>

        <p>
          It's important to understand how dates are stored and displayed in
          React Calendar DateTime Picker.
        </p>

        <h3>Date Object Format</h3>

        <p>
          The library stores dates as <code>Day</code> objects, not strings.
          When you select a date, the <code>onChange</code> callback receives a{' '}
          <code>Day</code> object with the following structure:
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
  year: number      // e.g., 2025
  month: number     // 1-12 (not 0-11 like JavaScript Date)
  day: number       // 1-31
  hour?: number     // Optional: 0-23 (for time selection)
  minute?: number   // Optional: 0-59 (for time selection)
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Example: Single Date</h3>

        <p>
          When you select a date, the state value is a <code>Day</code> object,
          not a formatted string:
        </p>

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
            {`import { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)

  return <DtPicker onChange={setDate} />
}

// After selecting December 2, 2025:
// date = { year: 2025, month: 12, day: 2 }
// NOT "2025/12/02" (that's just the display format)`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Important:</strong> The input field displays{' '}
                <code>"2025/12/02"</code> as a formatted string, but the actual
                value in your state is the <code>Day</code> object{' '}
                <code>{`{ year: 2025, month: 12, day: 2 }`}</code>. The
                formatted string is only for display purposes.
              </p>
            </div>
          </div>
        </div>

        <h3>Date Range Format</h3>

        <p>
          For range selection, the value is a <code>Range</code> object:
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
  from: Day  // Start date
  to: Day    // End date
}

// Example value:
{
  from: { year: 2025, month: 12, day: 1 },
  to: { year: 2025, month: 12, day: 15 }
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Multiple Dates Format</h3>

        <p>
          For multiple date selection, the value is an array of <code>Day</code>{' '}
          objects:
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
            {`type Multi = Day[]

// Example value:
[
  { year: 2025, month: 12, day: 1 },
  { year: 2025, month: 12, day: 5 },
  { year: 2025, month: 12, day: 10 }
]`}
          </SyntaxHighlighter>
        </div>

        <h3>Custom Display Format</h3>

        <p>
          You can customize how dates are displayed in the input field using the{' '}
          <code>dateFormat</code> prop, but the state value remains a{' '}
          <code>Day</code> object:
        </p>

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
            {`<DtPicker
  onChange={setDate}
  dateFormat="DD/MM/YYYY"  // Display format
/>

// Input shows: "02/12/2025"
// State value: { year: 2025, month: 12, day: 2 }`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Tip:</strong> For more information about data types and
                their structures, see the{' '}
                <Link
                  href='/types'
                  className='text-accent-light hover:text-accent-light-hover underline'
                >
                  Types
                </Link>{' '}
                documentation.
              </p>
            </div>
          </div>
        </div>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <Link
              href='/getting-started'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Read the Quick Start guide
            </Link>{' '}
            to learn basic usage
          </li>
          <li>
            <Link
              href='/types'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Learn about data types
            </Link>{' '}
            and their structures
          </li>
          <li>
            <Link
              href='/examples'
              className='text-accent-light hover:text-accent-light-hover'
            >
              View interactive examples
            </Link>{' '}
            to see the component in action
          </li>
        </ul>
      </div>
    </div>
  )
}
