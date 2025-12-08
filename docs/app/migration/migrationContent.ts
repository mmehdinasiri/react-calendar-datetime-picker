/**
 * Content definitions for migration guide sections.
 * Used to render migration guide content in a structured way.
 */

export interface MigrationChecklistItem {
  title: string
  description?: string
  code?: string
}

export interface MigrationExample {
  title: string
  beforeCode: string
  afterCode: string
  beforeClassName?: string
  afterClassName?: string
}

export interface BreakingChange {
  title: string
  description: string
  borderColor?: string
  details?: string[]
  codeExamples?: Array<{
    old: string
    new: string
    note?: string
  }>
}

export const migrationContent = {
  intro: {
    title: 'Migration Guide: v1.x to v2.x',
    description:
      'This guide helps you migrate from React Calendar DateTime Picker v1.x to v2.x. Version 2.x includes major improvements in TypeScript support, performance, and new features while maintaining backward compatibility where possible.',
    warning:
      'Version 2.x introduces minimal breaking changes. Most existing code will continue to work without modification, with only minor CSS class name updates.'
  },
  quickMigration: {
    title: 'Quick Migration Checklist',
    description: 'Follow these steps to migrate your application to v2.x.',
    items: [
      {
        title: 'Update Package Version',
        code: 'npm install react-calendar-datetime-picker@latest'
      },
      {
        title: 'Check for Breaking Changes',
        description:
          'Review the breaking changes section below and update your code accordingly.'
      },
      {
        title: 'Test Your Application',
        description:
          'Run your tests and check that all date picker functionality works as expected.'
      },
      {
        title: 'Explore New Features',
        description:
          'Take advantage of new features like improved TypeScript support, better accessibility, and enhanced customization options.'
      }
    ] as MigrationChecklistItem[]
  },
  breakingChanges: {
    title: 'Breaking Changes',
    description: 'Changes that may require updates to your existing code.',
    changes: [
      {
        title: 'Prop Name Changes',
        description:
          'Some prop names have been updated for clarity and consistency:',
        borderColor: 'border-orange-500',
        codeExamples: [
          {
            old: 'calenderModalClass',
            new: 'calendarModalClass',
            note: '(spelling corrected)'
          }
        ]
      },
      {
        title: 'TypeScript Improvements',
        description:
          'Enhanced TypeScript support with stricter types and better type inference. Some type definitions have changed:',
        borderColor: 'border-accent',
        details: [
          'The `Day` interface now includes optional `hour` and `minute` properties for time support.'
        ]
      },
      {
        title: 'CSS Class Changes',
        description: 'Some CSS class names have been updated for consistency:',
        borderColor: 'border-accent',
        details: [
          '`calendar-picker-input-wrapper` - Input wrapper',
          '`calendar-picker-modal` - Modal container',
          '`react-calendar-datetime-picker` - Main calendar container'
        ]
      }
    ] as BreakingChange[]
  },
  whatsNew: {
    title: "What's New in v2.x",
    description:
      'Version 2.x brings significant improvements and new capabilities. Check out the comprehensive list of features on the homepage.',
    linkText: 'Explore New Features →',
    linkHref: '/#new-features-v2x'
  },
  migrationExamples: {
    title: 'Migration Examples',
    description: 'Before and after examples showing how to migrate your code.',
    examples: [
      {
        title: 'Basic Date Picker',
        beforeCode: `import { DtPicker } from 'react-calendar-datetime-picker'

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
}`,
        afterCode: `import { DtPicker } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtPicker
      initValue={date}
      onChange={setDate}
      calendarSystem="gregorian"
      placeholder="Select date"
    />
  )
}`,
        afterClassName: 'border-accent'
      },
      {
        title: 'Calendar with Persian Locale',
        beforeCode: `import { DtCalendar } from 'react-calendar-datetime-picker'

<DtCalendar
  initValue={date}
  onChange={setDate}
  local="fa"
  showWeekend={true}
/>`,
        afterCode: `import { DtCalendar } from 'react-calendar-datetime-picker'

<DtCalendar
  initValue={date}
  onChange={setDate}
  calendarSystem="jalali"
  showWeekend={true}
/>`,
        beforeClassName: 'border-red-500',
        afterClassName: 'border-accent'
      },
      {
        title: 'Date Range with Time',
        beforeCode: `<DtPicker
  initValue={range}
  onChange={setRange}
  type="range"
  withTime={true}
  local="en"
/>`,
        afterCode: `<DtPicker
  initValue={range}
  onChange={setRange}
  type="range"
  withTime={true}
  calendarSystem="gregorian"
/>`,
        beforeClassName: 'border-red-500',
        afterClassName: 'border-accent'
      }
    ] as MigrationExample[]
  },
  enhancedInitValue: {
    title: 'Enhanced initValue Support',
    description:
      'Version 2.x supports more flexible initValue formats and better type safety for initialization.',
    examples: [
      {
        title: 'Single Date - Multiple Input Formats',
        beforeCode: `// Only Day object format
<DtPicker
  initValue={{ year: 2023, month: 12, day: 25 }}
  onChange={setDate}
/>`,
        afterCode: `// Multiple formats supported
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
/>`,
        afterClassName: 'border-accent'
      },
      {
        title: 'Range Selection - Enhanced Flexibility',
        beforeCode: `// Limited to specific object format
<DtPicker
  initValue={{
    from: { year: 2023, month: 12, day: 1 },
    to: { year: 2023, month: 12, day: 31 }
  }}
  onChange={setRange}
  type="range"
/>`,
        afterCode: `// Flexible range initialization
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
/>`,
        beforeClassName: 'border-red-500',
        afterClassName: 'border-accent'
      },
      {
        title: 'Multi-Selection - Array Support',
        beforeCode: `// Complex object array format
<DtPicker
  initValue={[
    { year: 2023, month: 12, day: 1 },
    { year: 2023, month: 12, day: 15 },
    { year: 2023, month: 12, day: 25 }
  ]}
  onChange={setMulti}
  type="multi"
/>`,
        afterCode: `// Mixed format array support
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
/>`,
        beforeClassName: 'border-red-500',
        afterClassName: 'border-accent'
      }
    ] as MigrationExample[]
  },
  utilityFunctions: {
    title: 'Utility Functions Update',
    description:
      'Utility functions have been enhanced and some function signatures have changed.',
    sections: [
      {
        title: 'Date Comparison Functions',
        description:
          'All comparison functions now accept an optional locale parameter:',
        code: `// v2.x - locale parameter is now optional
isBefore(date1, date2, 'gregorian')  // Gregorian
isBefore(date1, date2, 'jalali')  // Jalali
isBefore(date1, date2)        // Uses default locale`
      },
      {
        title: 'New Utility Functions',
        description: 'Version 2.x adds several new utility functions:',
        items: [
          '`convertToJalali()` and `convertToGregorian()` - Calendar conversion',
          '`startOfDay()`, `endOfDay()` - Day boundaries',
          '`startOfMonth()`, `endOfMonth()` - Month boundaries',
          '`startOfYear()`, `endOfYear()` - Year boundaries',
          '`getDifferenceInMonths()`, `getDifferenceInYears()` - Extended differences'
        ]
      }
    ]
  },
  needHelp: {
    title: 'Need Help with Migration?',
    description:
      "If you encounter any issues during migration or need clarification on breaking changes, don't hesitate to reach out.",
    links: [
      {
        text: 'Report Issues',
        href: 'https://github.com/mmehdinasiri/react-calendar-datetime-picker/issues',
        variant: 'primary' as const
      },
      {
        text: 'Start Discussion',
        href: 'https://github.com/mmehdinasiri/react-calendar-datetime-picker/discussions',
        variant: 'secondary' as const
      }
    ]
  }
}
