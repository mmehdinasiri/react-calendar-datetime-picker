'use client'

import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function GettingStarted() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <div className='mb-4 text-sm text-gray-400 uppercase tracking-wider'>
          LEARN REACT CALENDAR &gt;
        </div>
        <h1>Quick Start</h1>

        <p>
          Welcome to the React Calendar DateTime Picker documentation! This page
          will give you an introduction to 80% of the React Calendar concepts
          that you will use on a daily basis.
        </p>

        <h2>Basic Usage</h2>

        <p>
          The library provides two main components: <code>DtPicker</code> (a
          date picker with input field) and <code>DtCalendar</code> (a
          standalone calendar component).
        </p>

        <h3>Date Picker (DtPicker)</h3>

        <p>
          The DtPicker component includes an input field that opens a calendar
          modal when clicked:
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
            {`import React, { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  )
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Standalone Calendar (DtCalendar)</h3>

        <p>
          The DtCalendar component provides a calendar without an input field:
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
            {`import React, { useState } from 'react'
import { DtCalendar } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      initValue={date}
      onChange={setDate}
    />
  )
}`}
          </SyntaxHighlighter>
        </div>

        <h2>Calendar Types</h2>

        <p>The library supports different selection modes:</p>

        <h3>Single Date Selection</h3>

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
  type="single"
  onChange={setDate}
/>`}
          </SyntaxHighlighter>
        </div>

        <h3>Date Range Selection</h3>

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
  type="range"
  onChange={setDateRange}
/>`}
          </SyntaxHighlighter>
        </div>

        <h3>Multiple Date Selection</h3>

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
  type="multi"
  onChange={setMultipleDates}
/>`}
          </SyntaxHighlighter>
        </div>

        <h3>Week Selection</h3>

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
  type="week"
  onChange={setWeek}
/>`}
          </SyntaxHighlighter>
        </div>

        <h2>Calendar Locales</h2>

        <p>
          Choose between Gregorian (English) and Jalali (Persian) calendars:
        </p>

        <h3>Gregorian Calendar</h3>

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
  local="en"
  onChange={setDate}
/>`}
          </SyntaxHighlighter>
        </div>

        <h3>Jalali (Persian) Calendar</h3>

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
  local="fa"
  onChange={setDate}
/>`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Note:</strong> When using Persian locale (fa), make sure
                to include the Persian fonts in your project for proper display.
              </p>
            </div>
          </div>
        </div>

        <h2>Time Selection</h2>

        <p>Enable time selection with customizable format:</p>

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
  withTime={true}
  timeFormat="24"
  onChange={setDateTime}
/>`}
          </SyntaxHighlighter>
        </div>

        <h2>Date Constraints</h2>

        <p>Restrict selectable dates using constraints:</p>

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
  constraints={{
    minDate: new Date(),
    maxDate: new Date(2025, 11, 31),
    disabledDates: [
      new Date(2024, 11, 25),
      new Date(2024, 11, 26)
    ]
  }}
  onChange={setDate}
/>`}
          </SyntaxHighlighter>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-yellow-500 p-4 my-4'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Important:</strong> When using JavaScript's <code>Date</code>{' '}
                object (e.g., in constraints), remember that months are 0-indexed
                (January is 0, December is 11). However, the library's{' '}
                <code>Day</code> object uses 1-indexed months (January is 1,
                December is 12).
              </p>
            </div>
          </div>
        </div>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <Link
              href='/installation'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Install the package
            </Link>{' '}
            and learn about date value formats
          </li>
          <li>
            <Link
              href='/types'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Understand data types
            </Link>{' '}
            and how dates are structured
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
          <li>
            <Link
              href='/api-reference'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Check the API reference
            </Link>{' '}
            for detailed prop documentation
          </li>
          <li>
            <Link
              href='/customization'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Learn about customization options
            </Link>{' '}
            for theming and styling
          </li>
          <li>
            <Link
              href='/accessibility'
              className='text-accent-light hover:text-accent-light-hover'
            >
              Read about accessibility features
            </Link>{' '}
            for inclusive design
          </li>
        </ul>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Tip:</strong> All examples in this documentation are
                interactive. You can modify the props and see the changes in
                real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
