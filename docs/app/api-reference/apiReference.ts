export interface Prop {
  name: string
  type: string
  default: string
  description: string
}

export interface Component {
  name: string
  description: string
  props: Prop[]
}

export interface Type {
  name: string
  definition: string
}

export interface Utility {
  name: string
  signature: string
  description: string
}

export interface UtilityCategory {
  name: string
  utilities: Utility[]
}

// Shared props between DtCalendar and DtPicker
export const sharedProps: Prop[] = [
  {
    name: 'initValue',
    type: 'InitValueInput',
    default: 'undefined',
    description: 'Initial value for the calendar/picker'
  },
  {
    name: 'onChange',
    type: '(date: unknown) => void',
    default: 'Required',
    description:
      'Callback function called when the final date value changes. Receives the calculated value based on type: Day for single, Range for range/week, or Multi (Day[]) for multi. Fires AFTER onDateSelect. Use this to update your application state with the final selected value.'
  },
  {
    name: 'type',
    type: 'CalendarType',
    default: "'single'",
    description: 'Calendar selection type'
  },
  {
    name: 'withTime',
    type: 'boolean',
    default: 'false',
    description: 'Enable time selection'
  },
  {
    name: 'timeFormat',
    type: "'12' | '24'",
    default: "'24'",
    description: 'Time format'
  },
  {
    name: 'calendarSystem',
    type: 'CalendarSystem',
    default: "'gregorian'",
    description:
      'Calendar system: "gregorian" or "jalali". Also accepts shorthand aliases: "ge" for "gregorian", "ja" for "jalali"'
  },
  {
    name: 'showWeekend',
    type: 'boolean',
    default: 'false',
    description: 'Show weekend highlighting'
  },
  {
    name: 'todayBtn',
    type: 'boolean',
    default: 'false',
    description: 'Show today button'
  },
  {
    name: 'presetRanges',
    type: 'PresetRangesConfig',
    default: 'undefined',
    description: 'Preset range buttons configuration'
  },
  {
    name: 'constraints',
    type: 'CalendarConstraintsInput',
    default: 'undefined',
    description: 'Date constraints'
  },
  {
    name: 'calenderModalClass',
    type: 'string',
    default: 'undefined',
    description: 'Custom CSS class for calendar modal'
  },
  {
    name: 'customization',
    type: 'CalendarCustomization',
    default: 'undefined',
    description: 'Customization options'
  },
  {
    name: 'numberOfMonths',
    type: '1 | 2 | 3',
    default: '1',
    description: 'Number of months to display'
  },
  {
    name: 'yearListStyle',
    type: "'grid' | 'list'",
    default: "'grid'",
    description: 'Year list style for year selection view'
  },
  {
    name: 'dark',
    type: 'boolean',
    default: 'false',
    description: 'Enable dark theme'
  },
  {
    name: 'onDateSelect',
    type: '(day: Day) => void',
    default: 'undefined',
    description:
      'Callback fired immediately when a date is clicked. Receives the raw Day object that was clicked. Fires BEFORE onChange. Use this to track individual date clicks or intercept before the final value is calculated. Note: For range/multi types, this fires for each individual date click, while onChange receives the final calculated range/array.'
  },
  {
    name: 'onMonthSelect',
    type: '(month: number) => void',
    default: 'undefined',
    description: 'Callback when a month is selected in month view'
  },
  {
    name: 'onYearSelect',
    type: '(year: number) => void',
    default: 'undefined',
    description: 'Callback when a year is selected in year view'
  },
  {
    name: 'onViewChange',
    type: "(view: 'calendar' | 'months' | 'years') => void",
    default: 'undefined',
    description: 'Callback when the view changes (calendar, months, or years)'
  },
  {
    name: 'onMonthNavigate',
    type: "(direction: 'prev' | 'next') => void",
    default: 'undefined',
    description: 'Callback when navigating between months'
  },
  {
    name: 'onGoToToday',
    type: '() => void',
    default: 'undefined',
    description: 'Callback when the "Today" button is clicked'
  },
  {
    name: 'enlargeSelectedDay',
    type: 'boolean',
    default: 'true',
    description: 'Enlarge selected day text in the calendar grid'
  },
  {
    name: 'dateFormat',
    type: 'string',
    default: 'undefined',
    description:
      'Custom date format string for displaying dates in the input field. Supports custom separators and order. Examples: "DD/MM/YYYY", "MM-DD-YYYY", "YYYY년 MM월 DD일". Default format is YYYY/MM/DD when not specified.'
  },
  {
    name: 'onError',
    type: '(errors: CalendarError[]) => void',
    default: 'undefined',
    description:
      'Callback function called when normalization or constraint errors occur. Receives an array of error objects describing what failed (e.g., invalid initValue, invalid constraints).'
  }
]

// Props only available in DtPicker
export const dtPickerOnlyProps: Prop[] = [
  {
    name: 'showTimeInput',
    type: 'boolean',
    default: 'false',
    description: 'Show time in input field'
  },
  {
    name: 'clearBtn',
    type: 'boolean',
    default: 'false',
    description: 'Show clear button'
  },
  {
    name: 'isRequired',
    type: 'boolean',
    default: 'false',
    description: 'Make input required'
  },
  {
    name: 'isDisabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable the picker'
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select date'",
    description: 'Placeholder text'
  },
  {
    name: 'inputClass',
    type: 'string',
    default: 'undefined',
    description: 'Custom CSS class for input'
  },
  {
    name: 'autoClose',
    type: 'boolean',
    default: 'true',
    description: 'Auto-close calendar after selection'
  },
  {
    name: 'inputId',
    type: 'string',
    default: 'undefined',
    description: 'Input element ID'
  },
  {
    name: 'triggerElement',
    type: 'ReactNode',
    default: 'undefined',
    description:
      'Custom trigger element to replace the default input field. When provided, the input field will not be rendered. Useful for custom buttons, divs, or other elements.'
  },
  {
    name: 'triggerClass',
    type: 'string',
    default: 'undefined',
    description:
      'Custom CSS class for trigger wrapper when using custom trigger element'
  }
]

// Props only available in DtCalendar
export const dtCalendarOnlyProps: Prop[] = [
  {
    name: 'onCalenderChange',
    type: '(date: Day | Range | Multi | null) => void',
    default: 'undefined',
    description:
      'Callback that runs when calendar value changes (requires initValue)'
  }
]

// Keep components array for backward compatibility (not used in new structure)
export const components: Component[] = []

export const types: Type[] = [
  {
    name: 'CalendarType',
    definition: "type CalendarType = 'single' | 'range' | 'multi' | 'week'"
  },
  {
    name: 'CalendarLocale',
    definition: "type CalendarLocale = 'gregorian' | 'jalali'"
  },
  {
    name: 'CalendarSystem',
    definition: "type CalendarSystem = 'gregorian' | 'jalali' | 'ge' | 'ja'"
  },
  {
    name: 'DateInput',
    definition: 'type DateInput = Day | Date | string | number'
  },
  {
    name: 'InitValueInput',
    definition: `type InitValueInput =
  | DateInput
  | { from: DateInput; to: DateInput }
  | DateInput[]
  | null`
  },
  {
    name: 'Day',
    definition: `interface Day {
  year: number
  month: number
  day: number
  fullDay?: string
  hour?: number
  minute?: number
}`
  },
  {
    name: 'Range',
    definition: `interface Range {
  from: Day
  to: Day
}`
  },
  {
    name: 'CalendarConstraintsInput',
    definition: `interface CalendarConstraintsInput {
  maxDate?: DateInput
  minDate?: DateInput
  disabledDates?: DateInput[]
  isDateDisabled?: (date: Day) => boolean
}`
  },
  {
    name: 'CalendarCustomization',
    definition: `interface CalendarCustomization {
  classes?: CalendarClasses
  icons?: CalendarIcons
  labels?: CalendarLabels
  monthNames?: string[]
  weekdayNames?: string[]
}`
  },
  {
    name: 'CalendarListStyle',
    definition: "type CalendarListStyle = 'grid' | 'list'"
  }
]

export const utilityCategories: UtilityCategory[] = [
  {
    name: 'Date Conversion',
    utilities: [
      {
        name: 'gregorianToJalali',
        signature: 'gregorianToJalali(date: Day): Day',
        description: 'Convert Gregorian to Jalali date'
      },
      {
        name: 'jalaliToGregorian',
        signature: 'jalaliToGregorian(date: Day): Day',
        description: 'Convert Jalali to Gregorian date'
      },
      {
        name: 'getToday',
        signature: 'getToday(locale?: CalendarLocale): Day',
        description: "Get today's date"
      }
    ]
  },
  {
    name: 'Date Comparison',
    utilities: [
      {
        name: 'isBefore',
        signature:
          'isBefore(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
        description: ''
      },
      {
        name: 'isAfter',
        signature:
          'isAfter(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
        description: ''
      },
      {
        name: 'isSameDay',
        signature:
          'isSameDay(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
        description: ''
      },
      {
        name: 'isBetween',
        signature:
          'isBetween(date: Day, startDate: Day, endDate: Day, locale?: CalendarLocale): boolean',
        description: ''
      }
    ]
  },
  {
    name: 'Date Manipulation',
    utilities: [
      {
        name: 'addDays',
        signature:
          'addDays(date: Day, days: number, locale?: CalendarLocale): Day',
        description: ''
      },
      {
        name: 'addMonths',
        signature:
          'addMonths(date: Day, months: number, locale?: CalendarLocale): Day',
        description: ''
      },
      {
        name: 'addYears',
        signature:
          'addYears(date: Day, years: number, locale?: CalendarLocale): Day',
        description: ''
      },
      {
        name: 'subtractDays',
        signature:
          'subtractDays(date: Day, days: number, locale?: CalendarLocale): Day',
        description: ''
      },
      {
        name: 'subtractMonths',
        signature:
          'subtractMonths(date: Day, months: number, locale?: CalendarLocale): Day',
        description: ''
      },
      {
        name: 'subtractYears',
        signature:
          'subtractYears(date: Day, years: number, locale?: CalendarLocale): Day',
        description: ''
      }
    ]
  },
  {
    name: 'Formatting',
    utilities: [
      {
        name: 'formatDateForInput',
        signature:
          'formatDateForInput(date: Day | null, format?: string): string',
        description: ''
      },
      {
        name: 'dayToString',
        signature: 'dayToString(date: Day, divider?: string): string',
        description: ''
      },
      {
        name: 'toPersianNumeral',
        signature: 'toPersianNumeral(num: number): string',
        description: ''
      }
    ]
  }
]
