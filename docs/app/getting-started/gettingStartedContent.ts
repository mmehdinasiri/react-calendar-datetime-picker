/**
 * Content definitions for getting started page.
 * Pure content data extracted from page markup.
 */

export const gettingStartedContent = {
  basicUsageIntro: `Welcome to the React Calendar DateTime Picker documentation! This page will give you an introduction to 80% of the React Calendar concepts that you will use on a daily basis.`,

  basicUsage: {
    title: 'Basic Usage',
    intro: `The library provides two main components: \`DtPicker\` (a date picker with input field) and \`DtCalendar\` (a standalone calendar component).`,

    dtPicker: {
      title: 'Date Picker (DtPicker)',
      description: `The DtPicker component includes an input field that opens a calendar modal when clicked:`,
      code: `import React, { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

function App() {
  const [date, setDate] = useState<Day | null>(null)

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      placeholder="Select a date"
    />
  )
}`
    },

    dtCalendar: {
      title: 'Standalone Calendar (DtCalendar)',
      description: `The DtCalendar component provides a calendar without an input field:`,
      code: `import React, { useState } from 'react'
import { DtCalendar } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

function App() {
  const [date, setDate] = useState<Day | null>(null)

  return (
    <DtCalendar
      initValue={date}
      onChange={setDate}
    />
  )
}`
    }
  },

  calendarTypes: {
    title: 'Calendar Types',
    intro: `The library supports different selection modes:`,

    types: [
      {
        title: 'Single Date Selection',
        code: `<DtPicker
  type="single"
  onChange={setDate}
/>`
      },
      {
        title: 'Date Range Selection',
        code: `<DtPicker
  type="range"
  onChange={setDateRange}
/>`
      },
      {
        title: 'Multiple Date Selection',
        code: `<DtPicker
  type="multi"
  onChange={setMultipleDates}
/>`
      },
      {
        title: 'Week Selection',
        code: `<DtPicker
  type="week"
  onChange={setWeek}
/>`
      }
    ]
  },

  calendarLocales: {
    title: 'Calendar Locales',
    intro: `Choose between Gregorian (English) and Jalali (Persian) calendars:`,

    gregorian: {
      title: 'Gregorian Calendar',
      code: `<DtPicker
  calendarSystem="gregorian"
  onChange={setDate}
/>`
    },

    jalali: {
      title: 'Jalali (Persian) Calendar',
      code: `<DtPicker
  calendarSystem="jalali"
  onChange={setDate}
/>`
    },

    note: `When using Persian locale (fa), make sure to include the Persian fonts in your project for proper display.`
  },

  timeSelection: {
    title: 'Time Selection',
    intro: `Enable time selection with customizable format:`,
    code: `<DtPicker
  withTime={true}
  dateFormat="YYYY-MM-DD HH:mm"
  onChange={setDateTime}
/>`
  },

  dateConstraints: {
    title: 'Date Constraints',
    intro: `Restrict selectable dates using constraints:`,
    code: `<DtPicker
  constraints={{
    minDate: new Date(),
    maxDate: new Date(2025, 11, 31),
    disabledDates: [
      new Date(2024, 11, 25),
      new Date(2024, 11, 26)
    ]
  }}
  onChange={setDate}
/>`,
    important: `When using JavaScript's \`Date\` object (e.g., in constraints), remember that months are 0-indexed (January is 0, December is 11). However, the library's \`Day\` object uses 1-indexed months (January is 1, December is 12).`
  },

  nextSteps: [
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
  ],

  tip: `All examples in this documentation are interactive. You can modify the props and see the changes in real-time.`
}
