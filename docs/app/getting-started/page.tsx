'use client'

import {
  CodeBlock,
  InfoBox,
  Breadcrumb,
  FeatureList,
  Note,
  Important
} from '../components'

export default function GettingStarted() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>LEARN REACT CALENDAR &gt;</Breadcrumb>
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

        <CodeBlock
          language='tsx'
          code={`import React, { useState } from 'react'
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
          className='mb-4'
        />

        <h3>Standalone Calendar (DtCalendar)</h3>

        <p>
          The DtCalendar component provides a calendar without an input field:
        </p>

        <CodeBlock
          language='tsx'
          code={`import React, { useState } from 'react'
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
          className='mb-4'
        />

        <h2>Calendar Types</h2>

        <p>The library supports different selection modes:</p>

        <h3>Single Date Selection</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  type="single"
  onChange={setDate}
/>`}
          className='mb-4'
        />

        <h3>Date Range Selection</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  type="range"
  onChange={setDateRange}
/>`}
          className='mb-4'
        />

        <h3>Multiple Date Selection</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  type="multi"
  onChange={setMultipleDates}
/>`}
          className='mb-4'
        />

        <h3>Week Selection</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  type="week"
  onChange={setWeek}
/>`}
          className='mb-4'
        />

        <h2>Calendar Locales</h2>

        <p>
          Choose between Gregorian (English) and Jalali (Persian) calendars:
        </p>

        <h3>Gregorian Calendar</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  calendarSystem="gregorian"
  onChange={setDate}
/>`}
          className='mb-4'
        />

        <h3>Jalali (Persian) Calendar</h3>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  calendarSystem="jalali"
  onChange={setDate}
/>`}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> When using Persian locale (fa), make sure to
            include the Persian fonts in your project for proper display.
          </p>
        </Note>

        <h2>Time Selection</h2>

        <p>Enable time selection with customizable format:</p>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
  withTime={true}
  timeFormat="24"
  onChange={setDateTime}
/>`}
          className='mb-4'
        />

        <h2>Date Constraints</h2>

        <p>Restrict selectable dates using constraints:</p>

        <CodeBlock
          language='tsx'
          code={`<DtPicker
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
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>Important:</strong> When using JavaScript's{' '}
            <code>Date</code> object (e.g., in constraints), remember that
            months are 0-indexed (January is 0, December is 11). However, the
            library's <code>Day</code> object uses 1-indexed months (January is
            1, December is 12).
          </p>
        </Important>

        <FeatureList
          title='Next Steps'
          items={[
            {
              href: '/installation',
              text: 'Install the package',
              description: 'and learn about date value formats'
            },
            {
              href: '/types',
              text: 'Understand data types',
              description: 'and how dates are structured'
            },
            {
              href: '/examples',
              text: 'View interactive examples',
              description: 'to see the component in action'
            },
            {
              href: '/api-reference',
              text: 'Check the API reference',
              description: 'for detailed prop documentation'
            },
            {
              href: '/customization',
              text: 'Learn about customization options',
              description: 'for theming and styling'
            },
            {
              href: '/accessibility',
              text: 'Read about accessibility features',
              description: 'for inclusive design'
            }
          ]}
          variant='next-steps'
          headingLevel={2}
        />

        <InfoBox variant='tip'>
          <p className='text-sm text-gray-200'>
            <strong>Tip:</strong> All examples in this documentation are
            interactive. You can modify the props and see the changes in
            real-time.
          </p>
        </InfoBox>
      </div>
    </div>
  )
}
