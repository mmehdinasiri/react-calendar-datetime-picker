import type { Day } from 'react-calendar-datetime-picker'
import React from 'react'
import {
  isBefore,
  isAfter,
  isBetween,
  isSameDay,
  addDays,
  subtractDays,
  addMonths,
  subtractMonths,
  addYears,
  subtractYears,
  getDifferenceInDays,
  getDifferenceInMonths,
  getDifferenceInYears,
  convertToJalali,
  convertToGregorian,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
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
}

export type ExamplesConfig = Record<string, Record<string, ExampleConfig>>

// Examples configuration - Merged Locale, Time, and Types into one group
export const examples: ExamplesConfig = {
  Basic: {
    SingleDatePicker: {
      title: 'Single Date Picker',
      description: 'Basic date picker with input field',
      component: 'DtPicker',
      props: {
        local: 'en',
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
    },
    DatePickerWithInitialValue: {
      title: 'Date Picker with Initial Value',
      description: 'Date picker pre-filled with a date',
      component: 'DtPicker',
      props: {
        initValue: new Date(),
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
        initValue: new Date()
      },
      wrapper: 'calendar-container'
    }
  },
  'Types, Locale & Time': {
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
    },
    PersianCalendar: {
      title: 'Persian (Jalali) Calendar',
      description:
        'Calendar with Persian locale (fa) - displays Jalali calendar with Persian month names and RTL layout',
      component: 'DtCalendar',
      props: {
        local: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    PersianDatePicker: {
      title: 'Persian Date Picker',
      description:
        'Date picker with Persian locale - input field with Jalali calendar',
      component: 'DtPicker',
      props: {
        local: 'fa',
        placeholder: 'تاریخ را انتخاب کنید',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    PersianDateRangeSelection: {
      title: 'Persian Date Range Selection',
      description: 'Select a range of dates with Persian (Jalali) calendar',
      component: 'DtCalendar',
      props: {
        type: 'range',
        local: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    PersianDateRangePicker: {
      title: 'Persian Date Range Picker',
      description: 'Date range picker with Persian (Jalali) calendar',
      component: 'DtPicker',
      props: {
        type: 'range',
        local: 'fa',
        placeholder: 'انتخاب بازه تاریخ',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    PersianWeekSelection: {
      title: 'Persian Week Selection',
      description: 'Week selection with Persian (Jalali) calendar',
      component: 'DtCalendar',
      props: {
        type: 'week',
        local: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
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
        initValue: new Date()
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
        initValue: new Date()
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
        initValue: new Date()
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
        initValue: new Date()
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
          from: new Date(),
          to: (() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 5)
            return tomorrow
          })()
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
        initValue: new Date()
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
        initValue: new Date()
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
          from: new Date(),
          to: (() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 5)
            return tomorrow
          })()
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
        local: 'fa',
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date()
      },
      wrapper: 'calendar-container'
    },
    PersianDatePickerWithTime: {
      title: 'Persian Date Picker with Time',
      description:
        'Persian (Jalali) date picker with time selection in 24-hour format',
      component: 'DtPicker',
      props: {
        local: 'fa',
        withTime: true,
        timeFormat: '24',
        showTimeInput: true,
        placeholder: 'انتخاب تاریخ و زمان',
        initValue: new Date()
      },
      wrapper: 'picker-container'
    },
    RangeWithPresetRanges: {
      title: 'Date Range with All Preset Buttons',
      description: 'Range selection with all preset date range buttons',
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
    RangeWithCustomPresets: {
      title: 'Date Range with Custom Presets',
      description: 'Range selection with only selected preset buttons',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true,
          last7days: 'Past Week',
          last30days: true,
          thisMonth: true
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
                const today = new Date()
                const fourteenDaysAgo = new Date(today)
                fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13)
                return {
                  from: {
                    year: fourteenDaysAgo.getFullYear(),
                    month: fourteenDaysAgo.getMonth() + 1,
                    day: fourteenDaysAgo.getDate()
                  },
                  to: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                  }
                }
              })()
            },
            {
              label: 'Next 7 days',
              range: (() => {
                const today = new Date()
                const sevenDaysLater = new Date(today)
                sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)
                return {
                  from: {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                  },
                  to: {
                    year: sevenDaysLater.getFullYear(),
                    month: sevenDaysLater.getMonth() + 1,
                    day: sevenDaysLater.getDate()
                  }
                }
              })()
            }
          ]
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  Constraints: {
    MinDateConstraint: {
      title: 'Min Date Constraint',
      description: 'Calendar with minimum date constraint',
      component: 'DtCalendar',
      props: {
        constraints: {
          minDate: new Date()
        }
      },
      wrapper: 'calendar-container'
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
      wrapper: 'calendar-container'
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
      wrapper: 'calendar-container'
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
      wrapper: 'calendar-container'
    },
    BusinessDaysOnly: {
      title: 'Business Days Only',
      description:
        'Calendar allowing only weekdays (Monday-Friday) using isDateDisabled callback',
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
      wrapper: 'calendar-container'
    }
  },
  Features: {
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
      showConsoleLog: true
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
      showConsoleLog: true
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
      showConsoleLog: true
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

const today = getToday('en')
const selectedDate = // Select a date in the calendar

isBefore(selectedDate, today, 'en')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const today = getToday('en')
        return {
          'isBefore(selectedDate, today, "en")': isBefore(
            selectedDate,
            today,
            'en'
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

const today = getToday('en')
const selectedDate = // Select a date in the calendar

isAfter(selectedDate, today, 'en')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const today = getToday('en')
        return {
          'isAfter(selectedDate, today, "en")': isAfter(
            selectedDate,
            today,
            'en'
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
const tomorrow = addDays(selectedDate, 1, 'en')
const nextWeek = addDays(selectedDate, 7, 'en')
const yesterday = subtractDays(selectedDate, 1, 'en')`,
      getUtilityResults: (selectedDate?: Day | null) => {
        if (!selectedDate) {
          return {
            'Select a date in the calendar to see results': null
          }
        }
        const tomorrow = addDays(selectedDate, 1, 'en')
        const nextWeek = addDays(selectedDate, 7, 'en')
        const yesterday = subtractDays(selectedDate, 1, 'en')
        return {
          selectedDate: dayToString(selectedDate, '/'),
          'addDays(selectedDate, 1, "en")': dayToString(tomorrow, '/'),
          'addDays(selectedDate, 7, "en")': dayToString(nextWeek, '/'),
          'subtractDays(selectedDate, 1, "en")': dayToString(yesterday, '/')
        }
      }
    },
    ConvertCalendarsExample: {
      title: 'convertToJalali / convertToGregorian',
      description:
        'Select a date in the Gregorian calendar to see its Jalali equivalent',
      component: 'DtCalendar',
      props: {
        local: 'en',
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
  }
}

