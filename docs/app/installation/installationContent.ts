/**
 * Content definitions for installation page.
 * Pure content data extracted from page markup.
 */

export const installationContent = {
  title: 'Installation',
  intro:
    'Install React Calendar DateTime Picker using your preferred package manager.',

  packageManagers: {
    title: 'Package Managers',
    description: 'Install the package using npm, yarn, or pnpm:',
    commands: {
      npm: 'npm install react-calendar-datetime-picker',
      yarn: 'yarn add react-calendar-datetime-picker',
      pnpm: 'pnpm add react-calendar-datetime-picker'
    }
  },

  importStyles: {
    title: 'Import Styles',
    description:
      'Import the CSS file to ensure the calendar displays correctly. You can import it in your main entry file or component:',
    code: "import 'react-calendar-datetime-picker/dist/style.css'",
    note: {
      title: 'Note:',
      content:
        "If you're using a bundler that supports CSS imports, you can also import the styles directly in your component files."
    }
  },

  understandingDateValues: {
    title: 'Understanding Date Values',
    description:
      "It's important to understand how dates are stored and displayed in React Calendar DateTime Picker. Starting from v2.x, the `onChange` callback provides three parameters for maximum flexibility.",

    dateObjectFormat: {
      title: 'Date Object Format',
      description:
        'The library stores dates as `Day` objects internally. The `onChange` callback receives three parameters:',
      code: `interface Day {
  year: number      // e.g., 2025
  month: number     // 1-12 (not 0-11 like JavaScript Date)
  day: number       // 1-31
  hour?: number     // Optional: 0-23 (for time selection)
  minute?: number   // Optional: 0-59 (for time selection)
}

// onChange callback signature (v2.x):
onChange: (
  normalizedValue: Day | Range | Multi | null,  // Internal Day object
  jsDate: Date | RangeDate | Date[] | null,      // JavaScript Date (always Gregorian)
  formattedString: string | null                 // Formatted string
) => void`
    },

    singleDateExample: {
      title: 'Example: Single Date',
      description:
        'When you select a date, the `onChange` callback provides three values:',
      code: `import { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)
  const [jsDate, setJsDate] = useState(null)
  const [formatted, setFormatted] = useState(null)

  return (
    <DtPicker
      onChange={(normalizedValue, jsDate, formattedString) => {
        setDate(normalizedValue)      // { year: 2025, month: 12, day: 2 }
        setJsDate(jsDate)             // Date(2025-12-02)
        setFormatted(formattedString) // "2025/12/02"
      }}
    />
  )
}

// After selecting December 2, 2025:
// normalizedValue = { year: 2025, month: 12, day: 2 }
// jsDate = Date(2025-12-02)  // Always Gregorian, even for Jalali calendar
// formattedString = "2025/12/02"  // Based on dateFormat prop`,
      important: {
        title: 'Important:',
        content: `The \`onChange\` callback now provides three parameters: (1) the internal \`Day\` object maintaining calendar system integrity, (2) a JavaScript \`Date\` object always in Gregorian calendar (useful for API calls), and (3) a pre-formatted string ready for display. This gives you maximum flexibility to choose which format to use based on your needs.`
      }
    },

    dateRangeFormat: {
      title: 'Date Range Format',
      description:
        'For range selection, the `onChange` callback receives a `Range` object, a `RangeDate` object with JavaScript Dates, and a formatted string:',
      code: `interface Range {
  from: Day      // Start date
  to: Day | null // End date (null when selecting start)
}

interface RangeDate {
  from: Date | null  // JavaScript Date (always Gregorian)
  to: Date | null    // JavaScript Date (always Gregorian)
}

// Example onChange callback:
onChange={(normalizedValue, jsDate, formattedString) => {
  // normalizedValue = { from: Day, to: Day }
  // jsDate = { from: Date, to: Date }
  // formattedString = "from 2025/12/01 to 2025/12/15"
}}

// Example values:
// normalizedValue = {
//   from: { year: 2025, month: 12, day: 1 },
//   to: { year: 2025, month: 12, day: 15 }
// }
// jsDate = {
//   from: Date(2025-12-01),
//   to: Date(2025-12-15)
// }
// formattedString = "from 2025/12/01 to 2025/12/15"`
    },

    multipleDatesFormat: {
      title: 'Multiple Dates Format',
      description:
        'For multiple date selection, the `onChange` callback receives an array of `Day` objects, an array of JavaScript Dates, and a formatted string:',
      code: `type Multi = Day[]

// Example onChange callback:
onChange={(normalizedValue, jsDate, formattedString) => {
  // normalizedValue = Day[]
  // jsDate = Date[]
  // formattedString = dates separated by " + " (e.g., "2025/12/01,2025/12/05,2025/12/10")
  // or single date string if only one date is selected
}}

// Example values:
// normalizedValue = [
//   { year: 2025, month: 12, day: 1 },
//   { year: 2025, month: 12, day: 5 },
//   { year: 2025, month: 12, day: 10 }
// ]
// jsDate = [
//   Date(2025-12-01),
//   Date(2025-12-05),
//   Date(2025-12-10)
// ]
// formattedString = "2025/12/01 + 2025/12/05 + 2025/12/10"`
    },

    customDisplayFormat: {
      title: 'Custom Display Format',
      description: `You can customize how dates are displayed using the \`dateFormat\` prop. The \`formattedString\` parameter in \`onChange\` will use this format:`,
      code: `<DtPicker
  onChange={(normalizedValue, jsDate, formattedString) => {
    console.log(normalizedValue)  // { year: 2025, month: 12, day: 2 }
    console.log(jsDate)           // Date(2025-12-02)
    console.log(formattedString)  // "02/12/2025" (uses dateFormat)
  }}
  dateFormat="DD/MM/YYYY"  // Custom format
/>

// The formattedString parameter respects:
// - dateFormat prop (e.g., "DD/MM/YYYY", "MM-DD-YYYY")
// - locale prop (Persian numerals for 'fa', Latin for others)
// - timeFormat prop (12-hour or 24-hour when withTime is true)`,
      tip: {
        title: 'Tip:',
        content: `The \`formattedString\` parameter is automatically generated based on your \`dateFormat\`, \`locale\`, and \`timeFormat\` props, so you don't need to format dates manually. For more information about data types and their structures, see the Types documentation.`
      }
    },

    jalaliConversion: {
      title: 'Jalali Calendar Conversion',
      description:
        'When using Jalali calendar, the `jsDate` parameter always contains Gregorian dates for API compatibility:',
      code: `<DtCalendar
  calendarSystem="jalali"
  onChange={(normalizedValue, jsDate, formattedString) => {
    // normalizedValue = { year: 1402, month: 3, day: 11 }  // Jalali
    // jsDate = Date(2023-06-01)                            // Gregorian
    // formattedString = "1402/03/11"                      // Jalali format
    
    // Use normalizedValue for internal logic (maintains calendar system)
    // Use jsDate for API calls (always Gregorian)
    // Use formattedString for display (respects locale and format)
  }}
/>`,
      important: {
        title: 'Important:',
        content: `The \`jsDate\` parameter is always in Gregorian calendar, even when using Jalali calendar. This ensures compatibility with standard JavaScript Date APIs and backend systems that expect Gregorian dates. The \`normalizedValue\` maintains the original calendar system (Jalali or Gregorian) for internal consistency.`
      }
    }
  },

  nextSteps: [
    {
      href: '/getting-started',
      text: 'Read the Quick Start guide',
      description: 'to learn basic usage'
    },
    {
      href: '/types',
      text: 'Learn about data types',
      description: 'and their structures'
    },
    {
      href: '/examples',
      text: 'View interactive examples',
      description: 'to see the component in action'
    }
  ]
}
