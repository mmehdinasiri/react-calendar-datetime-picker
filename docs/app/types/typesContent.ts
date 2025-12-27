/**
 * Content definitions for types documentation sections.
 * Used to render types documentation content in a structured way.
 */

export interface TypeSubSection {
  id: string
  title: string
  description: string
  interfaceCode?: string
  exampleCode?: string
  exampleTitle?: string
  note?: string
  noteVariant?: 'warning' | 'info'
}

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
  subSections?: TypeSubSection[]
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
      id: 'calendartype',
      title: 'CalendarType',
      description:
        'The `CalendarType` type determines the selection behavior of the calendar component. It specifies how users can interact with the calendar and what format the `onChange` callback will receive.',
      interfaceCode: `type CalendarType = 'single' | 'range' | 'multi' | 'week'`,
      exampleTitle: 'Selection Types',
      exampleCode: `// Single date selection (default)
// Returns: Day | null
<DtCalendar type="single" onChange={(date) => {
  // date is a Day object or null
}} />

// Date range selection
// Returns: Range | null
<DtCalendar type="range" onChange={(range) => {
  // range is { from: Day, to: Day } or null
}} />

// Multiple dates selection
// Returns: Day[] | null
<DtCalendar type="multi" onChange={(dates) => {
  // dates is an array of Day objects or null
}} />

// Week selection
// Returns: Range | null
<DtCalendar type="week" onChange={(week) => {
  // week is { from: Day, to: Day } representing the selected week or null
}} />`,
      note: 'Each selection type returns a different value format: `single` returns a `Day` object, `range` and `week` return a `Range` object, and `multi` returns an array of `Day` objects (`Multi`).'
    },
    {
      id: 'selection-types',
      title: 'Selection Types',
      description:
        'These types represent the different data structures returned by the calendar based on the selection mode. They are the core types used throughout the library for date selection.',
      subSections: [
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
        }
      ]
    },
    {
      id: 'dateinput',
      title: 'DateInput',
      description:
        'The `DateInput` type represents a flexible date input that can accept various date formats. It is used as a building block for other types like `InitValueInput` and `CalendarConstraintsInput`.',
      interfaceCode: `type DateInput = Day | Date | string | number

// Accepted formats:
// - Day object: { year: 2025, month: 12, day: 25 }
// - JavaScript Date object: new Date(2025, 11, 25)
// - Date string: "2025-12-25" or "12/25/2025"
// - Timestamp number: 1735084800000`,
      exampleTitle: 'Examples',
      exampleCode: `// All of these are valid DateInput values:
const dayObject: DateInput = { year: 2025, month: 12, day: 25 }
const jsDate: DateInput = new Date(2025, 11, 25)
const dateString: DateInput = "2025-12-25"
const timestamp: DateInput = 1735084800000`
    },
    {
      id: 'initvalueinput',
      title: 'InitValueInput',
      description:
        'The `InitValueInput` type represents the initial value that can be passed to `DtPicker` and `DtCalendar` components via the `initValue` prop. It accepts various formats depending on the selection type (single, range, multi, or week).',
      interfaceCode: `type InitValueInput =
  | DateInput
  | { from: DateInput; to: DateInput }
  | DateInput[]
  | null

// Format depends on the 'type' prop:
// - 'single': DateInput | null
// - 'range' or 'week': { from: DateInput; to: DateInput } | null
// - 'multi': DateInput[] | null`,
      exampleTitle: 'Examples',
      exampleCode: `// Single date selection
<DtCalendar 
  type="single" 
  initValue={{ year: 2025, month: 12, day: 25 }} 
/>

// Range selection
<DtCalendar 
  type="range" 
  initValue={{
    from: { year: 2025, month: 12, day: 1 },
    to: { year: 2025, month: 12, day: 25 }
  }} 
/>

// Multiple dates selection
<DtCalendar 
  type="multi" 
  initValue={[
    { year: 2025, month: 12, day: 1 },
    { year: 2025, month: 12, day: 15 },
    { year: 2025, month: 12, day: 25 }
  ]} 
/>`,
      usageTitle: 'Using null as Initial Value',
      usageCode: `import { useState } from 'react'
import { DtPicker } from 'react-calendar-datetime-picker'
import type { Day, Range, Multi } from 'react-calendar-datetime-picker'

// Single date selection - must type the state when using null
const [date, setDate] = useState<Day | null>(null)

// Range selection - must type the state when using null
const [range, setRange] = useState<Range | null>(null)

// Multiple dates selection - must type the state when using null
const [dates, setDates] = useState<Multi | null>(null)`,
      note: "All date formats (Day objects, Date objects, strings, timestamps) are automatically normalized to `Day` objects internally. The format you pass to `initValue` doesn't need to match the format returned by `onChange`. **Important:** When using `null` as the initial value with `useState`, you must explicitly type the state variable (e.g., `useState<Day | null>(null)`) because TypeScript cannot infer the type from `null` alone."
    },
    {
      id: 'calendarconstraintsinput',
      title: 'CalendarConstraintsInput',
      description:
        'The `CalendarConstraintsInput` interface defines date constraints that can be passed to the `constraints` prop. It allows you to restrict which dates can be selected by setting minimum/maximum dates, disabling specific dates, or providing a custom function to determine if a date should be disabled.',
      interfaceCode: `interface CalendarConstraintsInput {
  maxDate?: DateInput      // Maximum selectable date
  minDate?: DateInput      // Minimum selectable date
  disabledDates?: DateInput[]  // Array of dates that should be disabled
  isDateDisabled?: (date: Day) => boolean  // Custom function to check if a date should be disabled
}`,
      exampleTitle: 'Examples',
      exampleCode: `// Using Date objects
<DtCalendar 
  constraints={{
    minDate: new Date(2025, 0, 1),  // January 1, 2025
    maxDate: new Date(2025, 11, 31) // December 31, 2025
  }}
/>

// Using Day objects
<DtCalendar 
  constraints={{
    minDate: { year: 2025, month: 1, day: 1 },
    maxDate: { year: 2025, month: 12, day: 31 },
    disabledDates: [
      { year: 2025, month: 12, day: 25 },  // Christmas
      { year: 2025, month: 1, day: 1 }     // New Year
    ]
  }}
/>

// Using custom function
<DtCalendar 
  constraints={{
    isDateDisabled: (date: Day) => {
      // Disable weekends
      const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay()
      return dayOfWeek === 0 || dayOfWeek === 6
    }
  }}
/>`,
      note: 'All date formats (Day objects, Date objects, strings, timestamps) are automatically normalized to `Day` objects internally. The `isDateDisabled` function receives a `Day` object and should return `true` if the date should be disabled.'
    },
    {
      id: 'calendarcustomization',
      title: 'CalendarCustomization',
      description:
        'The `CalendarCustomization` interface allows you to customize various aspects of the calendar appearance and behavior, including CSS classes, icons, labels, and translations.',
      interfaceCode: `interface CalendarCustomization {
  classes?: CalendarClasses
  icons?: CalendarIcons
  labels?: CalendarLabels
  translations?: Partial<CalendarTranslations>
}

interface CalendarClasses {
  header?: string
  days?: string
  months?: string
  years?: string
}

interface CalendarIcons {
  next?: React.ComponentType<{ className?: string }>
  previous?: React.ComponentType<{ className?: string }>
  calendar?: React.ComponentType<{ className?: string }>
}

interface CalendarLabels {
  nextMonth?: string
  previousMonth?: string
}`,
      exampleTitle: 'Example Usage',
      exampleCode: `import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'

// Custom icons
const CustomPrevIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5L5 10L10 15" />
  </svg>
)

const CustomNextIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5L15 10L10 15" />
  </svg>
)

const CustomTriggerIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

// Usage with DtCalendar
<DtCalendar
  customization={{
    classes: {
      header: 'my-custom-header',
      days: 'my-custom-days'
    },
    icons: {
      previous: CustomPrevIcon,
      next: CustomNextIcon
    },
    labels: {
      nextMonth: 'Next',
      previousMonth: 'Previous'
    }
  }}
/>

// Usage with DtPicker (calendar icon only works for DtPicker)
<DtPicker
  customization={{
    icons: {
      calendar: CustomTriggerIcon
    }
  }}
/>`,
      note: 'The `calendar` icon in `CalendarIcons` only works for `DtPicker` components, not `DtCalendar`. For more customization examples, see the',
      link: {
        href: '/customization',
        text: 'Customization'
      },
      linkSuffix: 'documentation.'
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
        'The `locale` prop specifies the user interface language and text direction for the calendar. It accepts one of the following string values. Each locale determines both the language of labels and the number system (Latin vs Persian numerals).',
      interfaceCode: `// Accepted values for the locale prop:
// 'en' - English (Latin numerals, LTR)
// 'fa' - Persian (Persian numerals, RTL)
// 'de' - German (Latin numerals, LTR)
// 'es' - Spanish (Latin numerals, LTR)
// 'fr' - French (Latin numerals, LTR)
// 'ko' - Korean (Latin numerals, LTR)`,
      note: "The number system (Latin vs Persian numerals) is automatically determined from the locale. Persian (`'fa'`) locale uses Persian numerals (۰-۹), while all other locales use Latin numerals (0-9)."
    },
    {
      id: 'calendarliststyle',
      title: 'CalendarListStyle',
      description:
        'The `CalendarListStyle` type determines the display style for the year selection view in the calendar. It controls whether years are displayed in a grid layout or a list layout.',
      interfaceCode: `type CalendarListStyle = 'grid' | 'list'`,
      exampleTitle: 'Example Usage',
      exampleCode: `// Grid layout (default) - years displayed in a grid
<DtCalendar yearListStyle="grid" onChange={setDate} />

// List layout - years displayed in a vertical list
<DtCalendar yearListStyle="list" onChange={setDate} />`,
      note: "The `yearListStyle` prop accepts this type. The default value is `'grid'`, which displays years in a grid layout. Use `'list'` for a vertical list layout."
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
