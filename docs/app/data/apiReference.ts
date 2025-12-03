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

export const components: Component[] = [
  {
    name: 'DtPicker',
    description:
      'A date picker component with an input field that opens a calendar modal. Supports all calendar types, locales, and customization options.',
    props: [
      {
        name: 'initValue',
        type: 'InitValueInput',
        default: 'undefined',
        description: 'Initial value for the date picker'
      },
      {
        name: 'onChange',
        type: '(date: unknown) => void',
        default: 'Required',
        description: 'Callback function called when date changes'
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
        name: 'showTimeInput',
        type: 'boolean',
        default: 'false',
        description: 'Show time in input field'
      },
      {
        name: 'local',
        type: 'CalendarLocale',
        default: "'en'",
        description: 'Calendar locale'
      },
      {
        name: 'showWeekend',
        type: 'boolean',
        default: 'false',
        description: 'Show weekend highlighting'
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
        name: 'isDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable the picker'
      },
      {
        name: 'constraints',
        type: 'CalendarConstraintsInput',
        default: 'undefined',
        description: 'Date constraints'
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
        name: 'calenderModalClass',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS class for calendar modal'
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
        name: 'dateFormat',
        type: 'string',
        default: 'undefined',
        description: 'Custom date format string'
      },
      {
        name: 'timeFormat',
        type: "'12' | '24'",
        default: "'24'",
        description: 'Time format'
      },
      {
        name: 'numberOfMonths',
        type: '1 | 2 | 3',
        default: '1',
        description: 'Number of months to display'
      },
      {
        name: 'customization',
        type: 'CalendarCustomization',
        default: 'undefined',
        description: 'Customization options'
      },
      {
        name: 'yearListStyle',
        type: "'grid' | 'list'",
        default: "'grid'",
        description: 'Year list style for year selection view'
      }
    ]
  },
  {
    name: 'DtCalendar',
    description:
      'A standalone calendar component without an input field. Provides direct calendar interaction and supports all the same features as DtPicker.',
    props: [
      {
        name: 'initValue',
        type: 'InitValueInput',
        default: 'undefined',
        description: 'Initial value for the calendar'
      },
      {
        name: 'onChange',
        type: '(date: unknown) => void',
        default: 'Required',
        description: 'Callback function called when date changes'
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
        name: 'local',
        type: 'CalendarLocale',
        default: "'en'",
        description: 'Calendar locale'
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
        name: 'enlargeSelectedDay',
        type: 'boolean',
        default: 'true',
        description: 'Enlarge selected day text'
      },
      {
        name: 'dark',
        type: 'boolean',
        default: 'false',
        description: 'Enable dark theme'
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
        description: 'Custom CSS class for calendar'
      },
      {
        name: 'customization',
        type: 'CalendarCustomization',
        default: 'undefined',
        description: 'Customization options'
      },
      {
        name: 'onError',
        type: '(errors: CalendarError[]) => void',
        default: 'undefined',
        description: 'Error callback function'
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
      }
    ]
  }
]

export const types: Type[] = [
  {
    name: 'CalendarType',
    definition: "type CalendarType = 'single' | 'range' | 'multi' | 'week'"
  },
  {
    name: 'CalendarLocale',
    definition: "type CalendarLocale = 'en' | 'fa'"
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

