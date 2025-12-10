import type { Day } from 'react-calendar-datetime-picker'
import React from 'react'
import {
  isBefore,
  isAfter,
  addDays,
  subtractDays,
  convertToJalali,
  convertToGregorian,
  getToday,
  dayToString
} from 'react-calendar-datetime-picker'

// Custom Icons
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13 15L8 10L13 5M7 15L2 10L7 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7 15L12 10L7 5M13 15L18 10L13 5'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const CircleLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='10' cy='10' r='9' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M11 7L8 10L11 13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const CircleRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='10' cy='10' r='9' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M9 7L12 10L9 13'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

// Example configuration types
type ComponentType = 'DtPicker' | 'DtCalendar'

export interface ExampleConfig {
  title: string
  description?: string
  component: ComponentType
  props?: Record<string, unknown>
  wrapper?: string
  renderExtra?: (value: Day | null) => React.ReactNode
  showConsoleLog?: boolean
  utilityCode?: string
  getUtilityResults?: (selectedDate?: Day | null) => Record<string, unknown>
  constraintsCode?: string // Custom code snippet for constraints prop when it contains functions
  customCode?: string // Custom code snippet to completely override generated code
}

export type ExamplesConfig = Record<string, Record<string, ExampleConfig>>

// Examples configuration - Time examples are in a separate "Time" group
export const examples: ExamplesConfig = {
  Basic: {
    SingleDatePicker: {
      title: 'Single Date Picker',
      description: 'Basic date picker with input field',
      component: 'DtPicker',
      props: {
        calendarSystem: 'gregorian',
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
    },
    DatePickerWithInitialValue: {
      title: 'Date Picker with Initial Value',
      description: 'Date picker pre-filled with a date',
      component: 'DtPicker',
      props: {
        initValue: new Date(2024, 11, 25),
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
    },
    StandaloneCalendar: {
      title: 'Standalone Calendar',
      component: 'DtCalendar',
      props: {},
      wrapper: 'calendar-container'
    },
    CalendarWithInitialValue: {
      title: 'Calendar with Initial Value',
      component: 'DtCalendar',
      props: {
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'calendar-container'
    }
  },
  'Calendar Systems': {
    JalaliShorthand: {
      title: 'Jalali Calendar (Shorthand)',
      description:
        'Calendar using the shorthand alias "ja" for Jalali calendar system',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'ja',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      calendarSystem="ja"
      showWeekend={true}
      todayBtn={true}
      onChange={setDate}
    />
  )
}`
    },
    GregorianShorthand: {
      title: 'Gregorian Calendar (Shorthand)',
      description:
        'Calendar using the shorthand alias "ge" for Gregorian calendar system',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'ge',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      calendarSystem="ge"
      showWeekend={true}
      todayBtn={true}
      onChange={setDate}
    />
  )
}`
    }
  },
  Types: {
    SingleDateSelection: {
      title: 'Single Date Selection',
      description: 'Select a single date (default)',
      component: 'DtCalendar',
      props: {
        type: 'single'
      },
      wrapper: 'calendar-container'
    },
    DateRangeSelection: {
      title: 'Date Range Selection',
      description: 'Select a range of dates',
      component: 'DtCalendar',
      props: {
        type: 'range'
      },
      wrapper: 'calendar-container'
    },
    MultipleDateSelection: {
      title: 'Multiple Date Selection',
      description: 'Select multiple dates',
      component: 'DtCalendar',
      props: {
        type: 'multi'
      },
      wrapper: 'calendar-container'
    },
    WeekSelection: {
      title: 'Week Selection',
      description:
        'Select an entire week at once - click any day in a week to select the whole week',
      component: 'DtCalendar',
      props: {
        type: 'week',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  Locale: {
    PersianCalendar: {
      title: 'Persian Calendar',
      description:
        'Calendar with Persian locale (fa) - displays Jalali calendar with Persian month names and RTL layout',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'jalali',
        locale: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      calendarSystem={"jalali"}
      locale={"fa"}
      {/* the default value for the locale with calendarSystem={"jalali"} is fa */}
      showWeekend={true}
      todayBtn={true}
      onChange={setDate}
    />
  )
}`
    },
    FrenchCalendar: {
      title: 'French Calendar',
      description:
        'Calendar with French locale (fr) - displays French month and weekday names',
      component: 'DtCalendar',
      props: {
        locale: 'fr',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    JalaliWithEnglishLocale: {
      title: 'Jalali Calendar with English Locale',
      description:
        'Jalali calendar system (ja) with English locale (en) - displays Jalali dates with English transliterated month names (Farvardin, Ordibehesht, Khordad, etc.) and LTR layout',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'ja',
        locale: 'en',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    GregorianWithPersianLocale: {
      title: 'Gregorian Calendar with Persian Locale',
      description:
        'Gregorian calendar system (ge) with Persian locale (fa) - displays Gregorian dates with Persian month names, RTL layout, and Persian numerals',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'ge',
        locale: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  'Translation Customization': {
    CustomLabels: {
      title: 'Custom Button Labels',
      description: 'Calendar with custom button labels and navigation text',
      component: 'DtCalendar',
      props: {
        locale: 'en',
        showWeekend: true,
        todayBtn: true,
        customization: {
          translations: {
            labels: {
              today: 'Pick Today',
              nextMonth: 'Next',
              previousMonth: 'Previous'
            }
          }
        }
      },
      wrapper: 'calendar-container'
    },
    CustomWeekdays: {
      title: 'Custom Weekday Names',
      description: 'Calendar with custom weekday abbreviations',
      component: 'DtCalendar',
      props: {
        locale: 'en',
        showWeekend: true,
        todayBtn: true,
        customization: {
          translations: {
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          }
        }
      },
      wrapper: 'calendar-container'
    },
    CustomMonthNames: {
      title: 'Custom Month Names',
      description: 'Calendar with custom month names',
      component: 'DtCalendar',
      props: {
        locale: 'en',
        showWeekend: true,
        todayBtn: true,
        customization: {
          translations: {
            months: [
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12'
            ]
          }
        }
      },
      wrapper: 'calendar-container'
    },
    CustomAMPM: {
      title: 'Custom AM/PM Labels',
      description:
        'Calendar with custom AM/PM indicators for 12-hour time format',
      component: 'DtCalendar',
      props: {
        locale: 'en',
        showWeekend: true,
        todayBtn: true,
        withTime: true,
        timeFormat: '12',
        customization: {
          translations: {
            labels: {
              am: 'Morning',
              pm: 'Evening'
            }
          }
        }
      },
      wrapper: 'calendar-container'
    },
    CustomTimeAndInputLabels: {
      title: 'Custom Time & Input Range Labels',
      description:
        'Date range picker with custom labels for time selection (timeFrom/timeTo), input field display (from/to), and clear button. Note: Input field labels (from/to) only apply to DtPicker component, not DtCalendar.',
      component: 'DtPicker',
      props: {
        locale: 'en',
        type: 'range',
        withTime: true,
        showWeekend: true,
        clearBtn: true,
        placeholder: 'Select date range',
        customization: {
          translations: {
            labels: {
              timeFrom: 'Start Time',
              timeTo: 'End Time',
              from: 'Start',
              to: 'End',
              clear: 'Clear Range'
            }
          }
        }
      },
      wrapper: 'picker-container'
    },
    CombinedCustomizations: {
      title: 'Combined Customizations',
      description:
        'Calendar with multiple translation customizations applied together',
      component: 'DtCalendar',
      props: {
        locale: 'en',
        showWeekend: true,
        todayBtn: true,
        withTime: true,
        timeFormat: '12',
        customization: {
          translations: {
            months: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            labels: {
              today: 'Today',
              ok: 'Confirm',
              nextMonth: '→',
              previousMonth: '←',
              am: 'AM',
              pm: 'PM'
            }
          }
        }
      },
      wrapper: 'calendar-container'
    }
  },
  Time: {
    SingleWithTime24Hour: {
      title: 'Single Date with Time (24-hour)',
      description:
        'Calendar with time selection enabled using 24-hour format (0-23)',
      component: 'DtCalendar',
      props: {
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'calendar-container'
    },
    DatePickerWithTime24Hour: {
      title: 'Date Picker with Time (24-hour)',
      description: 'Date picker with time selection in 24-hour format (0-23)',
      component: 'DtPicker',
      props: {
        withTime: true,
        timeFormat: '24',
        showTimeInput: true,
        placeholder: 'Select date and time',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    SingleWithTime12Hour: {
      title: 'Single Date with Time (12-hour)',
      description:
        'Calendar with time selection enabled using 12-hour format (1-12 AM/PM)',
      component: 'DtCalendar',
      props: {
        withTime: true,
        timeFormat: '12',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'calendar-container'
    },
    DatePickerWithTime12Hour: {
      title: 'Date Picker with Time (12-hour)',
      description:
        'Date picker with time selection in 12-hour format (1-12 AM/PM)',
      component: 'DtPicker',
      props: {
        withTime: true,
        timeFormat: '12',
        showTimeInput: true,
        placeholder: 'Select date and time',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    RangeWithTime: {
      title: 'Date Range with Time',
      description:
        'Range selection with time selectors for both start and end dates',
      component: 'DtCalendar',
      props: {
        type: 'range',
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: {
          from: new Date(2024, 11, 25, 10, 0),
          to: new Date(2024, 11, 30, 18, 0)
        }
      },
      wrapper: 'calendar-container'
    },
    WeekWithTime: {
      title: 'Week Selection with Time',
      description:
        'Week selection with time selectors for both start and end of the week',
      component: 'DtCalendar',
      props: {
        type: 'week',
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'calendar-container'
    },
    WeekPickerWithTime: {
      title: 'Week Picker with Time',
      description:
        'Week picker with time selectors for both start and end of the week',
      component: 'DtPicker',
      props: {
        type: 'week',
        withTime: true,
        timeFormat: '24',
        showTimeInput: true,
        placeholder: 'Select week with time',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    DateRangePickerWithTime: {
      title: 'Date Range Picker with Time',
      description:
        'Date range picker with time selectors for both start and end dates',
      component: 'DtPicker',
      props: {
        type: 'range',
        withTime: true,
        timeFormat: '24',
        showTimeInput: true,
        placeholder: 'Select date range with time',
        initValue: {
          from: new Date(2024, 11, 25, 10, 0),
          to: new Date(2024, 11, 30, 18, 0)
        }
      },
      wrapper: 'picker-container'
    },
    PersianWithTime: {
      title: 'Persian Calendar with Time',
      description:
        'Persian (Jalali) calendar with time selection in 24-hour format',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'jalali',
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'calendar-container'
    },
    PersianDatePickerWithTime: {
      title: 'Persian Date Picker with Time',
      description:
        'Persian (Jalali) date picker with time selection in 24-hour format',
      component: 'DtPicker',
      props: {
        calendarSystem: 'jalali',
        withTime: true,
        timeFormat: '24',
        showTimeInput: true,
        placeholder: 'انتخاب تاریخ و زمان',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    }
  },
  Constraints: {
    MinDateConstraint: {
      title: 'Min Date Constraint',
      description: 'Calendar with minimum date constraint',
      component: 'DtCalendar',
      props: {
        constraints: {
          minDate: new Date(2024, 11, 25)
        }
      },
      wrapper: 'calendar-container',
      constraintsCode: `constraints={{
        minDate: new Date(2024, 11, 25)
      }}`
    },
    MaxDateConstraint: {
      title: 'Max Date Constraint',
      description: 'Calendar with maximum date constraint',
      component: 'DtCalendar',
      props: {
        constraints: {
          maxDate: new Date(2025, 11, 31)
        }
      },
      wrapper: 'calendar-container',
      constraintsCode: `constraints={{
        maxDate: new Date(2025, 11, 31)
      }}`
    },
    DisabledDates: {
      title: 'Disabled Dates',
      description: 'Calendar with specific disabled dates',
      component: 'DtCalendar',
      props: {
        constraints: {
          disabledDates: [
            new Date(2024, 11, 25),
            new Date(2024, 11, 26),
            new Date(2024, 11, 27)
          ]
        }
      },
      wrapper: 'calendar-container',
      constraintsCode: `constraints={{
        disabledDates: [
          new Date(2024, 11, 25),
          new Date(2024, 11, 26),
          new Date(2024, 11, 27)
        ]
      }}`
    },
    IsDateDisabledExample: {
      title: 'Custom Date Validator (isDateDisabled)',
      description:
        'Use isDateDisabled callback to implement custom validation logic. Example: disable weekends',
      component: 'DtCalendar',
      props: {
        constraints: {
          isDateDisabled: (date: Day) => {
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            return dayOfWeek === 0 || dayOfWeek === 6
          }
        },
        showWeekend: true
      },
      wrapper: 'calendar-container',
      constraintsCode: `constraints={{
        isDateDisabled: (date) => {
          const dateObj = new Date(date.year, date.month - 1, date.day)
          const dayOfWeek = dateObj.getDay()
          return dayOfWeek === 0 || dayOfWeek === 6
        }
      }}`
    },
    BusinessDaysOnly: {
      title: 'Disable Monday',
      description:
        'Calendar with Monday disabled using isDateDisabled callback',
      component: 'DtCalendar',
      props: {
        constraints: {
          isDateDisabled: (date: Day) => {
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            return dayOfWeek === 1
          }
        },
        showWeekend: true
      },
      wrapper: 'calendar-container',
      constraintsCode: `constraints={{
        isDateDisabled: (date) => {
          const dateObj = new Date(date.year, date.month - 1, date.day)
          const dayOfWeek = dateObj.getDay()
          return dayOfWeek === 1
        }
      }}`
    },
    MinMaxDateInteractive: {
      title: 'Min/Max Date with Interactive Testing',
      description:
        'Test min/max date constraints interactively. Use the buttons below to set dates within and outside the allowed range to see how the calendar handles them. Dates outside the range will be disabled. Constraints are set for the current month.',
      component: 'DtCalendar',
      props: {
        constraints: (() => {
          const now = new Date()
          const currentYear = now.getFullYear()
          const currentMonth = now.getMonth()
          return {
            minDate: new Date(currentYear, currentMonth, 10),
            maxDate: new Date(currentYear, currentMonth, 25)
          }
        })()
      },
      wrapper: 'calendar-container',
      showConsoleLog: false,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'

function App() {
  const [selectedDate, setSelectedDate] = React.useState(null)
  
  // Get current month constraints
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  return (
    <div>
      <DtCalendar
        constraints={{
          minDate: new Date(currentYear, currentMonth, 10),
          maxDate: new Date(currentYear, currentMonth, 25)
        }}
        onChange={(date) => {
          setSelectedDate(date)
          console.log('Selected date:', date)
        }}
      />
      {selectedDate && (
        <p style={{ marginTop: '1rem' }}>
          Selected: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}`
    }
  },
  'Display Options': {
    ShowWeekendHighlighting: {
      title: 'Show Weekend Highlighting',
      description: 'Calendar with weekend days highlighted',
      component: 'DtCalendar',
      props: {
        showWeekend: true
      },
      wrapper: 'calendar-container'
    },
    TodayButton: {
      title: 'Today Button',
      description: 'Calendar with Today button in footer',
      component: 'DtCalendar',
      props: {
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    ClearButton: {
      title: 'Clear Button',
      description: 'Date picker with clear button to reset selection',
      component: 'DtPicker',
      props: {
        clearBtn: true,
        initValue: { year: 2024, month: 7, day: 17 },
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
    },
    AutoCloseDisabled: {
      title: 'Auto Close Disabled',
      description:
        'Date picker with auto-close disabled. The calendar stays open after selecting a date, allowing users to make adjustments or view the calendar without it closing automatically.',
      component: 'DtPicker',
      props: {
        autoClose: false,
        placeholder: 'Select a date',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    PresetRanges: {
      title: 'Preset Date Ranges',
      description:
        'Calendar with all preset date range buttons (Yesterday, Last 7 days, etc.)',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true,
          last7days: true,
          last30days: true,
          thisMonth: true,
          lastMonth: true
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    RangeWithCustomPresetRanges: {
      title: 'Date Range with Custom Preset Ranges',
      description: 'Range selection with completely custom preset ranges',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true,
          custom: [
            {
              label: 'Last 14 days',
              range: (() => {
                const today = getToday('gregorian') // { year: 2024, month: 12, day: 19 }
                const fourteenDaysAgo = subtractDays(today, 13, 'gregorian') // { year: 2024, month: 12, day: 6 }
                return {
                  from: fourteenDaysAgo,
                  to: today
                }
              })()
            },
            {
              label: 'Next 7 days',
              range: (() => {
                const today = getToday('gregorian') // { year: 2024, month: 12, day: 19 }
                const sevenDaysLater = addDays(today, 7, 'gregorian') // { year: 2024, month: 12, day: 26 }
                return {
                  from: today,
                  to: sevenDaysLater
                }
              })()
            }
          ]
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      customCode: `import { DtCalendar, getToday, subtractDays, addDays } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [range, setRange] = useState(null)

  return (
    <DtCalendar
      type="range"
      presetRanges={{
        yesterday: true,
        custom: [
          {
            label: 'Last 14 days',
            range: (() => {
              const today = getToday('gregorian') // { year: 2024, month: 12, day: 19 }
              const fourteenDaysAgo = subtractDays(today, 13, 'gregorian') // { year: 2024, month: 12, day: 6 }
              return {
                from: fourteenDaysAgo,
                to: today
              }
            })()
          },
          {
            label: 'Next 7 days',
            range: (() => {
              const today = getToday('gregorian') // { year: 2024, month: 12, day: 19 }
              const sevenDaysLater = addDays(today, 7, 'gregorian') // { year: 2024, month: 12, day: 26 }
              return {
                from: today,
                to: sevenDaysLater
              }
            })()
          }
        ]
      }}
      showWeekend={true}
      todayBtn={true}
      onChange={setRange}
    />
  )
}`
    }
  },
  'Week Settings': {
    WeekSettingsOverview: {
      title: 'Week Settings Overview',
      description:
        'Configure week start day and weekend highlighting. Control which day the week begins with and whether weekends are visually highlighted.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    DefaultWeekStart: {
      title: 'Default Week Start (Sunday)',
      description:
        'Calendar with default week start (Sunday for Gregorian calendar)',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    WeekStartMonday: {
      title: 'Week Starting on Monday',
      description:
        'Calendar with week starting on Monday (common in Europe and many countries)',
      component: 'DtCalendar',
      props: {
        weekStart: 1,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    WeekStartSaturday: {
      title: 'Week Starting on Saturday',
      description:
        'Calendar with week starting on Saturday (Jalali/Persian default)',
      component: 'DtCalendar',
      props: {
        weekStart: 6,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    GermanCalendarMondayStart: {
      title: 'German Calendar - Monday Start',
      description:
        'German calendar with week starting on Monday (common German convention)',
      component: 'DtCalendar',
      props: {
        locale: 'de',
        weekStart: 1,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    JalaliCalendarSaturdayStart: {
      title: 'Jalali Calendar - Saturday Start',
      description:
        'Persian (Jalali) calendar with week starting on Saturday (traditional Persian week)',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'jalali',
        weekStart: 6,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    DatePickerWithMondayStart: {
      title: 'Date Picker - Monday Start',
      description: 'Date picker with week starting on Monday',
      component: 'DtPicker',
      props: {
        weekStart: 1,
        placeholder: 'Select a date (Monday start)',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    RangePickerTuesdayStart: {
      title: 'Range Picker - Tuesday Start',
      description: 'Date range picker with week starting on Tuesday',
      component: 'DtPicker',
      props: {
        type: 'range',
        weekStart: 2,
        placeholder: 'Select date range (Tuesday start)',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    WednesdayStartWithWeekendHighlighting: {
      title: 'Wednesday Start with Weekend Highlighting',
      description:
        'Calendar starting on Wednesday with weekend days clearly highlighted',
      component: 'DtCalendar',
      props: {
        weekStart: 3,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    JalaliWithoutWeekendHighlighting: {
      title: 'Jalali Calendar without Weekend Highlighting',
      description:
        'Persian calendar without weekend highlighting - all days look the same',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'jalali',
        weekStart: 1,
        showWeekend: false,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  Callbacks: {
    BasicOnChange: {
      title: 'Basic onChange Callback',
      description:
        'Example showing onChange callback - check browser console to see logs when date is selected',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)
  const [jsDate, setJsDate] = useState(null)
  const [formatted, setFormatted] = useState(null)

  const handleDateChange = (normalizedValue, jsDate, formattedString) => {
    setDate(normalizedValue)      // { year: 2025, month: 12, day: 2 }
    setJsDate(jsDate)             // Date(2025-12-02)
    setFormatted(formattedString) // "2025/12/02"
    console.log('onChange:', normalizedValue, jsDate, formattedString)
  }

  return (
    <DtCalendar
      showWeekend={true}
      todayBtn={true}
      onChange={handleDateChange}
    />
  )
}`
    },
    RangeOnChange: {
      title: 'Range onChange Callback',
      description:
        'onChange callback for range selection - logs both from and to dates to console',
      component: 'DtCalendar',
      props: {
        type: 'range',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [range, setRange] = useState(null)
  const [jsDateRange, setJsDateRange] = useState(null)
  const [formatted, setFormatted] = useState(null)

  const handleRangeChange = (normalizedValue, jsDate, formattedString) => {
    setRange(normalizedValue)      // { from: Day, to: Day }
    setJsDateRange(jsDate)         // { from: Date, to: Date }
    setFormatted(formattedString)  // "from 2025/12/01 to 2025/12/15"
    console.log('onChange:', normalizedValue, jsDate, formattedString)
  }

  return (
    <DtCalendar
      type='range'
      showWeekend={true}
      todayBtn={true}
      onChange={handleRangeChange}
    />
  )
}`
    },
    MultiOnChange: {
      title: 'Multi onChange Callback',
      description:
        'onChange callback for multi selection - logs array of selected dates to console',
      component: 'DtCalendar',
      props: {
        type: 'multi',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [dates, setDates] = useState(null)
  const [jsDates, setJsDates] = useState(null)
  const [formatted, setFormatted] = useState(null)

  const handleMultiChange = (normalizedValue, jsDate, formattedString) => {
    setDates(normalizedValue)      // [Day, Day, ...]
    setJsDates(jsDate)             // [Date, Date, ...]
    setFormatted(formattedString)  // "2025/12/01,2025/12/05,2025/12/10"
    console.log('onChange:', normalizedValue, jsDate, formattedString)
  }

  return (
    <DtCalendar
      type='multi'
      showWeekend={true}
      todayBtn={true}
      onChange={handleMultiChange}
    />
  )
}`
    },
    ViewAndNavCallbacks: {
      title: 'View & Navigation Callbacks',
      description:
        'Callbacks for view changes, month navigation, and year/month selection',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      onChange={setDate}
      onViewChange={(view) => console.log('View changed:', view)}
      onMonthNavigate={(dir) => console.log('Month navigated:', dir)}
      onMonthSelect={(month) => console.log('Month selected:', month)}
      onYearSelect={(year) => console.log('Year selected:', year)}
    />
  )
}`
    },
    OnDateSelect: {
      title: 'onDateSelect Callback',
      description:
        'onDateSelect fires immediately when a date is clicked, receiving the raw Day object. It fires BEFORE onChange. Perfect for tracking individual date clicks. In range mode, it fires for each date selection (start then end), while onChange only fires once the complete range is calculated.',
      component: 'DtCalendar',
      props: {
        type: 'range',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [range, setRange] = useState(null)

  return (
    <DtCalendar
      type="range"
      onChange={(finalRange) => {
        // onChange fires ONCE after both dates are selected
        // Receives the complete range: { from: Day, to: Day }
        setRange(finalRange)
        console.log('onChange - Complete range:', finalRange)
      }}
      onDateSelect={(day) => {
        // onDateSelect fires for EACH individual date click
        // First click: selects start date
        // Second click: selects end date
        console.log('onDateSelect - Individual date clicked:', day)
        // Great for showing selection progress or validation
      }}
    />
  )
}`
    },
    OnGoToToday: {
      title: 'onGoToToday Callback',
      description: 'Callback triggered when the "Today" button is clicked',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(null)

  return (
    <DtCalendar
      todayBtn={true}
      onChange={setDate}
      onGoToToday={() => {
        console.log('Go to today button clicked')
      }}
    />
  )
}`
    }
  },
  'Date Formatting': {
    DefaultFormat: {
      title: 'Default Date Format (YYYY/MM/DD)',
      description:
        'Date picker with default format - displays dates as YYYY/MM/DD',
      component: 'DtPicker',
      props: {
        placeholder: 'Select a date',
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'picker-container'
    },
    DDMMYYYYFormat: {
      title: 'DD/MM/YYYY Format',
      description:
        'Date picker with DD/MM/YYYY format - European date format with day first',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD/MM/YYYY',
        placeholder: 'Select a date (DD/MM/YYYY)',
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'picker-container'
    },
    MMDDYYYYFormat: {
      title: 'MM-DD-YYYY Format',
      description:
        'Date picker with MM-DD-YYYY format - US date format with dashes as separators',
      component: 'DtPicker',
      props: {
        dateFormat: 'MM-DD-YYYY',
        placeholder: 'Select a date (MM-DD-YYYY)',
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'picker-container'
    },
    RangeWithCustomFormat: {
      title: 'Date Range with Custom Format',
      description:
        'Date range picker with DD/MM/YYYY format - both start and end dates use the custom format',
      component: 'DtPicker',
      props: {
        type: 'range',
        dateFormat: 'DD/MM/YYYY',
        placeholder: 'Select date range (DD/MM/YYYY)',
        initValue: {
          from: new Date(2024, 11, 20),
          to: new Date(2024, 11, 25)
        }
      },
      wrapper: 'picker-container'
    },
    WithTimeAndFormat: {
      title: 'Date with Time and Custom Format',
      description:
        'Date picker with time selection and DD/MM/YYYY format - combines custom date format with time',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD/MM/YYYY',
        withTime: true,
        showTimeInput: true,
        placeholder: 'Select date and time (DD/MM/YYYY)',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    }
  },
  'Multiple Months': {
    TwoMonths: {
      title: 'Two Months Side by Side',
      description:
        'Calendar displaying two months side by side - useful for selecting date ranges',
      component: 'DtCalendar',
      props: {
        numberOfMonths: 2,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    ThreeMonths: {
      title: 'Three Months Side by Side',
      description:
        'Calendar displaying three months side by side - great for long-range planning',
      component: 'DtCalendar',
      props: {
        numberOfMonths: 3,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    TwoMonthsRangeSelection: {
      title: 'Two Months for Range Selection',
      description:
        'Range selection with two months displayed - makes it easier to select start and end dates',
      component: 'DtCalendar',
      props: {
        type: 'range',
        numberOfMonths: 2,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    TwoMonthsRangePicker: {
      title: 'Range Picker with Two Months',
      description:
        'Date range picker with two months displayed - ideal for selecting date ranges',
      component: 'DtPicker',
      props: {
        type: 'range',
        numberOfMonths: 2,
        placeholder: 'Select date range (two months view)',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    }
  },
  'Date Utilities': {
    IsBeforeExample: {
      title: 'isBefore - Check if date is before another',
      description:
        "Select a date in the calendar, then see if it's before today",
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      utilityCode: `import { isBefore, getToday } from 'react-calendar-datetime-picker'

const today = getToday('gregorian')
const selectedDate = // Select a date in the calendar

isBefore(selectedDate, today, 'gregorian')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const today = getToday('gregorian')
        return {
          'isBefore(selectedDate, today, "gregorian")': isBefore(
            selectedDate,
            today,
            'gregorian'
          ),
          selectedDate: dayToString(selectedDate, '/'),
          today: dayToString(today, '/')
        }
      }
    },
    IsAfterExample: {
      title: 'isAfter - Check if date is after another',
      description: "Select a date in the calendar to see if it's after today",
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      utilityCode: `import { isAfter, getToday } from 'react-calendar-datetime-picker'

const today = getToday('gregorian')
const selectedDate = // Select a date in the calendar

isAfter(selectedDate, today, 'gregorian')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const today = getToday('gregorian')
        return {
          'isAfter(selectedDate, today, "gregorian")': isAfter(
            selectedDate,
            today,
            'gregorian'
          ),
          selectedDate: dayToString(selectedDate, '/'),
          today: dayToString(today, '/')
        }
      }
    },
    AddDaysExample: {
      title: 'addDays - Add days to a date',
      description:
        'Select a date in the calendar, then see calculations: tomorrow, next week, and yesterday',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      utilityCode: `import { addDays, subtractDays, dayToString } from 'react-calendar-datetime-picker'

const selectedDate = // Select a date in the calendar
const tomorrow = addDays(selectedDate, 1, 'gregorian')
const nextWeek = addDays(selectedDate, 7, 'gregorian')
const yesterday = subtractDays(selectedDate, 1, 'gregorian')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const tomorrow = addDays(selectedDate, 1, 'gregorian')
        const nextWeek = addDays(selectedDate, 7, 'gregorian')
        const yesterday = subtractDays(selectedDate, 1, 'gregorian')
        return {
          selectedDate: dayToString(selectedDate, '/'),
          'addDays(selectedDate, 1, "gregorian")': dayToString(tomorrow, '/'),
          'addDays(selectedDate, 7, "gregorian")': dayToString(nextWeek, '/'),
          'subtractDays(selectedDate, 1, "gregorian")': dayToString(
            yesterday,
            '/'
          )
        }
      }
    },
    ConvertCalendarsExample: {
      title: 'convertToJalali / convertToGregorian',
      description:
        'Select a date in the Gregorian calendar to see its Jalali equivalent',
      component: 'DtCalendar',
      props: {
        calendarSystem: 'gregorian',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container',
      utilityCode: `import { 
  convertToJalali, 
  convertToGregorian, 
  dayToString 
} from 'react-calendar-datetime-picker'

const selectedDate = // Select a date in the calendar (Gregorian)
const jalaliDate = convertToJalali(selectedDate)
const backToGregorian = convertToGregorian(jalaliDate)`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const jalaliDate = convertToJalali(selectedDate)
        const backToGregorian = convertToGregorian(jalaliDate)
        return {
          'selectedDate (Gregorian)': dayToString(selectedDate, '/'),
          'convertToJalali(selectedDate)': dayToString(jalaliDate, '/'),
          'convertToGregorian(jalaliDate)': dayToString(backToGregorian, '/')
        }
      }
    }
  },
  Customization: {
    CustomTranslations: {
      title: 'Custom Button Labels',
      description: 'Customize Today button and navigation labels',
      component: 'DtPicker',
      props: {
        locale: 'en',
        customization: {
          translations: {
            labels: {
              today: 'Pick Today',
              nextMonth: 'Next',
              previousMonth: 'Previous',
              clear: 'Reset'
            }
          }
        }
      },
      wrapper: 'picker-container'
    },
    PersianRTL: {
      title: 'Persian RTL Layout',
      description: 'Automatic RTL layout with Persian text and numbers',
      component: 'DtPicker',
      props: {
        locale: 'fa',
        withTime: true,
        timeFormat: '12'
      },
      wrapper: 'picker-container'
    }
  },
  'Error Handling': {
    InvalidInitValue: {
      title: 'Invalid Initial Value',
      description:
        'Handle errors when providing invalid initial values. Click the button below to trigger an error. The onError callback receives an array of CalendarError objects with details about what went wrong.',
      component: 'DtCalendar',
      props: {},
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import type { CalendarError } from 'react-calendar-datetime-picker'

function App() {
  const handleError = (errors: CalendarError[]) => {
    console.log('Validation errors:', errors)
    errors.forEach((error) => {
      console.log(\`\${error.field}: \${error.message}\`)
    })
  }

  return (
    <DtCalendar
      initValue="invalid-date-string"
      onError={handleError}
    />
  )
}`
    },
    InvalidConstraints: {
      title: 'Invalid Constraints',
      description:
        'Errors are reported when constraints (minDate, maxDate, disabledDates) contain invalid values. Click the button below to trigger an error. **Important:** When a constraint like minDate is invalid, it is automatically excluded from the constraints object (so dates remain selectable), but an error is still reported via onError. The alert will show the error details.',
      component: 'DtCalendar',
      props: {},
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import type { CalendarError } from 'react-calendar-datetime-picker'

function App() {
  const handleError = (errors: CalendarError[]) => {
    if (errors.length > 0) {
      alert(\`Found \${errors.length} error(s):\n\` +
        errors.map(e => \`\${e.field}: \${e.message}\`).join('\\n'))
    }
  }

  return (
    <DtCalendar
      constraints={{
        minDate: 'not-a-date', // Invalid - will trigger error and be excluded
        maxDate: new Date('2024-12-31') // Valid - will be applied
      }}
      onError={handleError}
    />
  )
}

// Note: When minDate is invalid, it is excluded from constraints.
// Only maxDate will be applied, so dates before 2024-12-31 remain selectable.`
    },
    InvalidRangeValue: {
      title: 'Invalid Range Value',
      description:
        'When using type="range", invalid from/to values are caught and reported through the onError callback. Click the button below to trigger an error.',
      component: 'DtCalendar',
      props: {
        type: 'range'
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import type { CalendarError } from 'react-calendar-datetime-picker'

function App() {
  const [errors, setErrors] = React.useState<CalendarError[]>([])

  return (
    <div>
      <DtCalendar
        type="range"
        initValue={{
          from: 'invalid', // Invalid date - will trigger error
          to: new Date('2024-12-31')
        }}
        onError={setErrors}
      />
      {errors.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fee', borderRadius: '4px' }}>
          <strong>Errors found:</strong>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>
                <strong>{error.field}:</strong> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}`
    },
    ErrorHandlingWithValidation: {
      title: 'Error Handling with Custom Validation',
      description:
        'This example demonstrates that **custom validation functions (`isDateDisabled`) continue to work even when constraint errors occur**. When you set invalid constraints (like `minDate: "not-a-date"`), the invalid constraint is excluded and an error is reported, but your custom validation logic (weekend disabling) is preserved. This shows how error handling and custom validation can work together seamlessly.',
      component: 'DtCalendar',
      props: {
        constraints: {
          minDate: new Date('2024-01-01'),
          maxDate: (() => {
            // Use a future date so dates aren't all disabled
            const futureDate = new Date()
            futureDate.setFullYear(futureDate.getFullYear() + 1)
            return futureDate
          })(),
          isDateDisabled: (day: any) => {
            // Custom validation: disable weekends
            const date = new Date(day.year, day.month - 1, day.day)
            const dayOfWeek = date.getDay()
            return dayOfWeek === 0 || dayOfWeek === 6
          }
        }
      },
      wrapper: 'calendar-container',
      showConsoleLog: true,
      customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import type { CalendarError, Day } from 'react-calendar-datetime-picker'

function App() {
  const handleError = (errors: CalendarError[]) => {
    // Log errors for debugging
    if (errors.length > 0) {
      console.error('Calendar errors:', errors)
      // You could also send to error tracking service
      // errorTracker.log(errors)
    }
  }

  const isWeekend = (day: Day) => {
    const date = new Date(day.year, day.month - 1, day.day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  // Use a future maxDate so dates aren't all disabled
  const futureDate = new Date()
  futureDate.setFullYear(futureDate.getFullYear() + 1)

  return (
    <DtCalendar
      constraints={{
        minDate: new Date('2024-01-01'),
        maxDate: futureDate,
        isDateDisabled: isWeekend // Custom validation: disable weekends
      }}
      onError={handleError}
    />
  )
}

// Key Point: Even if minDate or maxDate are invalid and excluded,
// the isDateDisabled function continues to work. Custom validation
// is preserved regardless of constraint errors.`
    },
    DtPickerErrorHandling: {
      title: 'DtPicker - Complete Error Handling Example',
      description:
        'Complete example showing error handling in DtPicker. Click the buttons below to trigger different types of errors. Errors are displayed visually below the component.',
      component: 'DtPicker',
      props: {
        onChange: () => {}
      },
      wrapper: 'picker-container',
      showConsoleLog: true,
      customCode: `import { DtPicker } from 'react-calendar-datetime-picker'
import type { CalendarError } from 'react-calendar-datetime-picker'

function App() {
  const [date, setDate] = React.useState(null)
  const [errors, setErrors] = React.useState<CalendarError[]>([])

  const handleError = (errors: CalendarError[]) => {
    setErrors(errors)
    if (errors.length > 0) {
      console.error('Date picker errors:', errors)
    }
  }

  return (
    <div>
      <DtPicker
        initValue="invalid-date"
        onChange={setDate}
        constraints={{
          minDate: 'not-a-date', // Invalid - will trigger error
          maxDate: new Date('2024-12-31')
        }}
        onError={handleError}
        placeholder="Select a date"
      />
      {errors.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#fee', borderRadius: '4px' }}>
          <strong>Errors found:</strong>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>
                <strong>{error.field}:</strong> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}`
    }
  }
}
