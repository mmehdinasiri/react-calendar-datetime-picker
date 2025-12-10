/**
 * Content definitions for example categories.
 * Used with CategoryContentDisplay component to render category descriptions.
 */

export const examplesContent = {
  Basic: {
    intro:
      'React Calendar DateTime Picker provides two main components for different use cases:'
  },
  Types: {
    intro:
      'The `type` prop determines the selection behavior of the calendar component. You can choose from four different selection types, each with its own use case and return value format.',
    typeDefinitions: [
      `type CalendarType = 'single' | 'range' | 'multi' | 'week'`
    ],
    details: [
      {
        title: 'Selection Types:',
        content: `• single - Select a single date (default). Returns a \`Day\` object or null.
• range - Select a date range. Returns a \`Range\` object with \`from\` and \`to\` properties, or null.
• multi - Select multiple dates. Returns a \`Multi\` array of \`Day\` objects, or null.
• week - Select an entire week at once. Returns a \`Range\` object representing the week, or null.`
      }
    ]
  },
  Time: {
    intro:
      'The calendar component supports time selection through the `withTime` prop. When enabled, users can select both date and time. The `timeFormat` prop allows you to choose between 12-hour (AM/PM) and 24-hour time formats.',
    typeDefinitions: [
      `withTime?: boolean
timeFormat?: '12' | '24'`
    ],
    details: [
      {
        title: 'Props:',
        content: `• withTime - When set to \`true\`, enables time selection. The selected \`Day\` object will include \`hour\` and \`minute\` properties.
• timeFormat - Determines the time display format:
  • '12' - 12-hour format with AM/PM indicators (1-12)
  • '24' - 24-hour format (0-23)`
      }
    ]
  },
  'Week Settings': {
    intro:
      'The calendar component supports week configuration through the `weekStart` and `showWeekend` props. Control which day the week begins with and whether weekends are visually highlighted. Weekend days differ by calendar system: Saturday and Sunday for Gregorian, Thursday and Friday for Jalali.',
    typeDefinitions: [
      `weekStart?: number // 0-6 (0 = Sunday, 6 = Saturday)
showWeekend?: boolean`
    ],
    details: [
      {
        title: 'Props:',
        content: `• weekStart - Determines the first day of the week:
  • 0 - Sunday (default for Gregorian calendar)
  • 1 - Monday (common in Europe)
  • 2 - Tuesday
  • 3 - Wednesday
  • 4 - Thursday
  • 5 - Friday
  • 6 - Saturday (default for Jalali calendar)
  If not specified, defaults to 0 (Sunday) for Gregorian calendar and 6 (Saturday) for Jalali calendar.
• showWeekend - When set to \`true\`, visually highlights weekend days:
  • Gregorian calendar: Saturday (6) and Sunday (0) are highlighted
  • Jalali calendar: Thursday (4) and Friday (5) are highlighted
  Defaults to \`false\`.`
      }
    ]
  },
  Callbacks: {
    intro:
      'The calendar component provides several callback functions that allow you to respond to user interactions and state changes. These callbacks enable you to track date selections, view changes, navigation events, and more.',
    typeDefinitions: [
      `// Main callback - type depends on selection type
onChange: (date: Day | Range | Multi | null) => void

// Event-specific callbacks
onDateSelect?: (day: Day) => void
onMonthSelect?: (month: number) => void
onYearSelect?: (year: number) => void
onViewChange?: (view: 'calendar' | 'months' | 'years') => void
onMonthNavigate?: (direction: 'prev' | 'next') => void
onGoToToday?: () => void`
    ],
    details: [
      {
        title: 'Callbacks:',
        content: `• onChange - Main callback fired when the selected date value changes. The type of the parameter depends on the \`type\` prop:
  • type='single' - Receives \`Day | null\`
  • type='range' - Receives \`Range | null\`
  • type='multi' - Receives \`Multi | null\`
  • type='week' - Receives \`Range | null\`
• onDateSelect - Fired when a date is clicked, before the final selection is confirmed. Receives the raw \`Day\` object that was clicked.
• onMonthSelect - Fired when a month is selected in the month selection view. Receives the month number (1-12).
• onYearSelect - Fired when a year is selected in the year selection view. Receives the year number.
• onViewChange - Fired when the calendar view changes between calendar, months, or years. Receives the new view name.
• onMonthNavigate - Fired when navigating between months using the previous/next buttons. Receives \`'prev'\` or \`'next'\`.
• onGoToToday - Fired when the "Today" button is clicked. No parameters.`
      }
    ]
  },
  Constraints: {
    intro:
      'The calendar component supports date constraints through the `constraints` prop. You can restrict date selection by setting minimum and maximum dates, disabling specific dates, or using a custom validation function.',
    typeDefinitions: [
      `interface CalendarConstraints {
  minDate?: Day | Date | string | number
  maxDate?: Day | Date | string | number
  disabledDates?: (Day | Date | string | number)[]
  isDateDisabled?: (date: Day) => boolean
}`
    ],
    details: [
      {
        title: 'Props:',
        content: `• minDate - Sets the minimum selectable date. Dates before this date will be disabled. Accepts \`Day\`, \`Date\`, date string, or timestamp.
• maxDate - Sets the maximum selectable date. Dates after this date will be disabled. Accepts \`Day\`, \`Date\`, date string, or timestamp.
• disabledDates - Array of specific dates to disable. Each date can be a \`Day\`, \`Date\`, date string, or timestamp.
• isDateDisabled - Custom function to determine if a date should be disabled. Receives a \`Day\` object and returns \`true\` if the date should be disabled. Useful for complex validation logic like disabling weekends, specific days of the week, or custom business rules.`
      }
    ]
  },
  'Date Formatting': {
    intro:
      'The calendar component allows you to customize the date format displayed in the input field (for `DtPicker`) using the `dateFormat` prop. This only affects the display format, not the internal data structure which always uses `Day` objects.',
    typeDefinitions: ['dateFormat?: string'],
    details: [
      {
        title: 'Format Tokens:',
        content: `• \`YYYY\` - 4-digit year (e.g., 2025)
• \`MM\` - 2-digit month (e.g., 01-12)
• \`DD\` - 2-digit day (e.g., 01-31)`
      },
      {
        title: 'Examples:',
        content: `• \`"DD/MM/YYYY"\` - European format (e.g., 25/12/2025)
• \`"MM-DD-YYYY"\` - US format (e.g., 12-25-2025)
• \`"YYYY/MM/DD"\` - ISO format (e.g., 2025/12/25)
• \`"YYYY년 MM월 DD일"\` - Custom format with text (e.g., 2025년 12월 25일)`
      }
    ]
  },
  'Display Options': {
    intro:
      'The calendar component provides various display options to customize the user interface. Control visual elements like weekend highlighting, buttons, and preset range selections.',
    typeDefinitions: [
      `showWeekend?: boolean
todayBtn?: boolean
clearBtn?: boolean
presetRanges?: PresetRangesConfig

interface PresetRangesConfig {
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
}`
    ],
    details: [
      {
        title: 'Props:',
        content: `• showWeekend - When set to \`true\`, visually highlights weekend days. Weekend days differ by calendar system: Saturday and Sunday for Gregorian, Thursday and Friday for Jalali. Defaults to \`false\`.
• todayBtn - When set to \`true\`, displays a "Today" button in the calendar footer that navigates to and selects today's date. Defaults to \`false\`.
• clearBtn - When set to \`true\`, displays a "Clear" button in the \`DtPicker\` input field that resets the selection. Only available for \`DtPicker\`. Defaults to \`false\`.
• presetRanges - Configuration object for preset date range buttons (only available when \`type='range'\`). Options include:
  • \`yesterday\` - Show "Yesterday" button
  • \`last7days\` - Show "Last 7 days" button
  • \`last30days\` - Show "Last 30 days" button
  • \`thisMonth\` - Show "This month" button
  • \`lastMonth\` - Show "Last month" button
  • \`custom\` - Array of custom preset ranges with custom labels and date ranges`
      }
    ]
  },
  'Multiple Months': {
    intro:
      'The calendar component can display multiple months side by side using the `numberOfMonths` prop. This is particularly useful for range selection, allowing users to see a wider date range at once and select start and end dates more easily.',
    typeDefinitions: ['numberOfMonths?: 1 | 2 | 3'],
    details: [
      {
        title: 'Options:',
        content: `• \`1\` - Display a single month (default)
• \`2\` - Display two months side by side
• \`3\` - Display three months side by side`
      }
    ]
  },
  'Error Handling': {
    intro:
      'Both `DtCalendar` and `DtPicker` components provide comprehensive error handling through the `onError` callback. This callback receives an array of `CalendarError` objects whenever normalization or validation fails, allowing you to handle errors gracefully in your application.',
    typeDefinitions: [
      `onError?: (errors: CalendarError[]) => void

interface CalendarError {
  type: 'normalization' | 'validation'
  field: string
  value: unknown
  message: string
}`
    ],
    details: [
      {
        title: 'Error Types:',
        content: `• \`normalization\` - Errors that occur when converting input values (initValue, constraints) to the internal \`Day\` format. This includes invalid date strings, malformed objects, or unsupported formats.
• \`validation\` - Errors that occur when validating date constraints, such as invalid minDate/maxDate values or disabled dates.`
      },
      {
        title: 'Error Object Properties:',
        content: `• \`type\` - The type of error: 'normalization' or 'validation'
• \`field\` - The field name where the error occurred (e.g., 'initValue', 'minDate', 'maxDate', 'initValue.from', 'initValue.to')
• \`value\` - The original value that caused the error
• \`message\` - A human-readable error message describing what went wrong`
      },
      {
        title: 'When Errors Are Triggered:',
        content: `• Invalid \`initValue\` format (e.g., malformed date strings, invalid objects)
• Invalid \`constraints\` values (e.g., invalid minDate/maxDate, malformed disabledDates)
• Invalid date values in range selections (invalid 'from' or 'to' values)
• Invalid date values in multi-date selections (invalid array elements)
• Dates that don't exist in the calendar system (e.g., February 30th)`
      },
      {
        title: 'Best Practices:',
        content: `• Always provide an \`onError\` callback in production to catch and handle errors gracefully
• Log errors to your error tracking service for debugging
• Display user-friendly error messages when validation fails
• Validate user input before passing it to the calendar component
• In development mode, errors are also logged to the console with warnings`
      }
    ]
  }
}
