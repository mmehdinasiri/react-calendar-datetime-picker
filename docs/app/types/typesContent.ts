/**
 * Content definitions for types documentation sections.
 * Used to render types documentation content in a structured way.
 */

export interface TypeSection {
  id: string
  title: string
  description: string
  interfaceCode?: string
  exampleCode?: string
  exampleTitle?: string
  usageCode?: string
  usageTitle?: string
  note?: string
  noteVariant?: 'warning' | 'info'
  link?: {
    href: string
    text: string
  }
  linkSuffix?: string
}

export const typesContent = {
  intro: {
    title: 'Data Types',
    description:
      'React Calendar DateTime Picker uses specific data structures to represent dates and date selections. Understanding these types is essential for working with the library effectively.',
    important:
      'The library stores dates as `Day` objects, not strings or JavaScript `Date` objects, because `Day` objects provide better type safety, easier manipulation, and consistent behavior across different calendar systems (Gregorian and Jalali). The formatted string you see in the input field is only for display purposes.'
  },
  sections: [
    {
      id: 'day',
      title: 'Day',
      description:
        'The `Day` interface represents a single date. This is the fundamental type used throughout the library.',
      interfaceCode: `interface Day {
  year: number      // Year (e.g., 2025)
  month: number     // Month (1-12, not 0-11 like JavaScript Date)
  day: number       // Day of month (1-31)
  hour?: number     // Optional: Hour (0-23) for time selection
  minute?: number   // Optional: Minute (0-59) for time selection}`,
      exampleTitle: 'Example',
      exampleCode: `// December 2, 2025 at 3:30 PM
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
}`,
      note: "Unlike JavaScript's `Date` object where months are 0-indexed (0-11), the `Day` interface uses 1-indexed months (1-12), which is more intuitive.",
      noteVariant: 'warning'
    },
    {
      id: 'range',
      title: 'Range',
      description:
        'The `Range` interface represents a date range with a start and end date. Used for range selection type.',
      interfaceCode: `interface Range {
  from: Day  // Start date (inclusive)
  to: Day    // End date (inclusive)
}`,
      exampleTitle: 'Example',
      exampleCode: `const dateRange: Range = {
  from: { year: 2025, month: 12, day: 1 },
  to: { year: 2025, month: 12, day: 15 }
}`
    },
    {
      id: 'multi',
      title: 'Multi',
      description:
        "The `Multi` type represents multiple selected dates. It's an array of `Day` objects. Used for multiple date selection type.",
      interfaceCode: `type Multi = Day[]`,
      exampleTitle: 'Example',
      exampleCode: `const multipleDates: Multi = [
  { year: 2025, month: 12, day: 1 },
  { year: 2025, month: 12, day: 5 },
  { year: 2025, month: 12, day: 10 },
  { year: 2025, month: 12, day: 15 }
]`
    },
    {
      id: 'week',
      title: 'Week',
      description:
        'The `Week` interface represents a week selection with start and end dates. Used for week selection type.',
      interfaceCode: `interface Week {
  from: Day  // Start date of the week
  to: Day    // End date of the week
}`,
      exampleTitle: 'Example',
      exampleCode: `const week: Week = {
  from: { year: 2025, month: 12, day: 1 },   // Monday
  to: { year: 2025, month: 12, day: 7 }     // Sunday
}`
    },
    {
      id: 'calendarsystem',
      title: 'CalendarSystem',
      description:
        'The `CalendarSystem` type is what you pass to the `calendarSystem` prop in `DtPicker` and `DtCalendar`. It accepts the full names or convenient shorthand aliases.',
      interfaceCode: `type CalendarSystem = 'gregorian' | 'jalali' | 'ge' | 'ja'

// Full names:
// 'gregorian' - Gregorian calendar
// 'jalali' - Jalali calendar (Persian)

// Shorthand aliases:
// 'ge' - Alias for 'gregorian'
// 'ja' - Alias for 'jalali'`,
      usageTitle: 'Example Usage',
      usageCode: `// All of these are valid:
<DtPicker calendarSystem="gregorian" onChange={setDate} />
<DtPicker calendarSystem="ge" onChange={setDate} />
<DtPicker calendarSystem="jalali" onChange={setDate} />
<DtPicker calendarSystem="ja" onChange={setDate} />

<DtCalendar calendarSystem="gregorian" onChange={setDate} />
<DtCalendar calendarSystem="ge" onChange={setDate} />
<DtCalendar calendarSystem="jalali" onChange={setDate} />
<DtCalendar calendarSystem="ja" onChange={setDate} />`,
      note: "The shorthand aliases (`'ge'` and `'ja'`) are automatically normalized to their full names internally. The library always works with `CalendarLocale` internally, but accepts `CalendarSystem` as a convenience for users."
    },
    {
      id: 'presetrangesconfig',
      title: 'PresetRangesConfig',
      description:
        "The `PresetRangesConfig` interface configures preset date range buttons that appear in the calendar footer when `type='range'`. These buttons allow users to quickly select common date ranges.",
      interfaceCode: `interface PresetRangesConfig {
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
}`,
      exampleTitle: 'Example',
      exampleCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
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

<DtCalendar type="range" presetRanges={presetRanges} />`,
      note: "Preset ranges are only available when `type='range'`. To customize the labels of preset range buttons, see the",
      link: {
        href: '/customization#preset-ranges',
        text: 'Customization'
      },
      linkSuffix: 'documentation.'
    },
    {
      id: 'locale',
      title: 'Locale',
      description:
        'The `locale` prop accepts a `CalendarUILocale` type that specifies the user interface language and text direction for the calendar. Each locale determines both the language of labels and the number system (Latin vs Persian numerals).',
      interfaceCode: `type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'

// Language locales:
// 'en' - English (Latin numerals, LTR)
// 'fa' - Persian (Persian numerals, RTL)
// 'de' - German (Latin numerals, LTR)
// 'es' - Spanish (Latin numerals, LTR)
// 'fr' - French (Latin numerals, LTR)`,
      note: "The number system (Latin vs Persian numerals) is automatically determined from the locale. Persian (`'fa'`) locale uses Persian numerals (۰-۹), while all other locales use Latin numerals (0-9)."
    }
  ] as TypeSection[],
  typeSafety: {
    title: 'Type Safety',
    description:
      "The library is fully typed with TypeScript, so you'll get type checking and autocomplete support:",
    code: `import { DtPicker } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = useState<Day | null>(null)

  return <DtPicker onChange={setDate} />
}

// TypeScript will ensure 'date' is always a Day object or null`
  },
  nextSteps: {
    title: 'Next Steps',
    items: [
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
    ]
  }
}
