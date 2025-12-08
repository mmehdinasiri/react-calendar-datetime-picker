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
      "It's important to understand how dates are stored and displayed in React Calendar DateTime Picker.",

    dateObjectFormat: {
      title: 'Date Object Format',
      description:
        'The library stores dates as `Day` objects, not strings. When you select a date, the `onChange` callback receives a `Day` object with the following structure:',
      code: `interface Day {
  year: number      // e.g., 2025
  month: number     // 1-12 (not 0-11 like JavaScript Date)
  day: number       // 1-31
  hour?: number     // Optional: 0-23 (for time selection)
  minute?: number   // Optional: 0-59 (for time selection)
}`
    },

    singleDateExample: {
      title: 'Example: Single Date',
      description:
        'When you select a date, the state value is a `Day` object, not a formatted string:',
      code: `import { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)

  return <DtPicker onChange={setDate} />
}

// After selecting December 2, 2025:
// date = { year: 2025, month: 12, day: 2 }
// NOT "2025/12/02" (that's just the display format)`,
      important: {
        title: 'Important:',
        content: `The input field displays "2025/12/02" as a formatted string, but the actual value in your state is the \`Day\` object \`{ year: 2025, month: 12, day: 2 }\`. The formatted string is only for display purposes.`
      }
    },

    dateRangeFormat: {
      title: 'Date Range Format',
      description: 'For range selection, the value is a `Range` object:',
      code: `interface Range {
  from: Day  // Start date
  to: Day    // End date
}

// Example value:
{
  from: { year: 2025, month: 12, day: 1 },
  to: { year: 2025, month: 12, day: 15 }
}`
    },

    multipleDatesFormat: {
      title: 'Multiple Dates Format',
      description:
        'For multiple date selection, the value is an array of `Day` objects:',
      code: `type Multi = Day[]

// Example value:
[
  { year: 2025, month: 12, day: 1 },
  { year: 2025, month: 12, day: 5 },
  { year: 2025, month: 12, day: 10 }
]`
    },

    customDisplayFormat: {
      title: 'Custom Display Format',
      description: `You can customize how dates are displayed in the input field using the \`dateFormat\` prop, but the state value remains a \`Day\` object:`,
      code: `<DtPicker
  onChange={setDate}
  dateFormat="DD/MM/YYYY"  // Display format
/>

// Input shows: "02/12/2025"
// State value: { year: 2025, month: 12, day: 2 }`,
      tip: {
        title: 'Tip:',
        content: `For more information about data types and their structures, see the Types documentation.`
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
