import type { Day } from 'react-calendar-datetime-picker'
import React from 'react'

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
}

// Helper function to create example config with renderExtra
const createExampleConfig = (
  config: Omit<ExampleConfig, 'renderExtra'>,
  renderExtra?: (value: Day | null) => React.ReactNode
): ExampleConfig => {
  return { ...config, renderExtra }
}

export type ExamplesConfig = Record<string, Record<string, ExampleConfig>>

// Examples configuration
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
  Locale: {
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
    }
  },
  Customization: {
    DefaultIcons: {
      title: 'Default Icons',
      description: 'Calendar with default chevron icons (no customization)',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    CustomArrowIcons: {
      title: 'Custom Arrow Icons',
      description: 'Calendar with custom arrow navigation icons',
      component: 'DtCalendar',
      props: {
        customization: {
          icons: {
            previous: ArrowLeftIcon,
            next: ArrowRightIcon
          }
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    CustomCircleIcons: {
      title: 'Custom Circle Icons',
      description: 'Calendar with different style icons - circle arrows',
      component: 'DtCalendar',
      props: {
        customization: {
          icons: {
            previous: CircleLeftIcon,
            next: CircleRightIcon
          }
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    }
  },
  Themes: {
    DarkTheme: {
      title: 'Dark Theme',
      description: 'Calendar with dark theme enabled using the dark prop',
      component: 'DtCalendar',
      props: {
        dark: true,
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    DarkThemeCustomColors: {
      title: 'Custom Dark Theme with CSS Variables + calenderModalClass',
      description:
        'Override CSS variables in your stylesheet and apply them using the calenderModalClass prop. This gives you direct control over the calendar element.',
      component: 'DtCalendar',
      props: {
        dark: true,
        showWeekend: true,
        todayBtn: true,
        calenderModalClass: 'calendar-dark-custom-theme'
      },
      wrapper: 'calendar-container'
    },
    CustomBlueTheme: {
      title: 'Custom Blue Theme with CSS Variables + Wrapper',
      description:
        'Override CSS variables on a wrapper element - the calendar inherits the variables. Alternative approach to using calenderModalClass.',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container calendar-blue-theme'
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
    MinDatePicker: {
      title: 'Date Picker with Min Date',
      description: 'Date picker with minimum date constraint',
      component: 'DtPicker',
      props: {
        constraints: {
          minDate: new Date()
        },
        placeholder: 'Select a date (today or later)'
      },
      wrapper: 'picker-container'
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
    MaxDatePicker: {
      title: 'Date Picker with Max Date',
      description: 'Date picker with maximum date constraint',
      component: 'DtPicker',
      props: {
        constraints: {
          maxDate: new Date(2025, 11, 31)
        },
        placeholder: 'Select a date (before Dec 31, 2025)'
      },
      wrapper: 'picker-container'
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
    DatePickerWithDisabledDates: {
      title: 'Date Picker with Disabled Dates',
      description: 'Date picker with specific disabled dates',
      component: 'DtPicker',
      props: {
        constraints: {
          disabledDates: [
            new Date(2024, 11, 25),
            new Date(2024, 11, 26),
            new Date(2024, 11, 27)
          ]
        },
        placeholder: 'Select a date (Dec 25-27 disabled)'
      },
      wrapper: 'picker-container'
    },
    IsDateDisabledExample: {
      title: 'Custom Date Validator (isDateDisabled)',
      description:
        'Use isDateDisabled callback to implement custom validation logic. Example: disable weekends (Saturday and Sunday). The callback receives a Day object and should return true if the date should be disabled.',
      component: 'DtCalendar',
      props: {
        constraints: {
          isDateDisabled: (date: Day) => {
            // Convert Day to Date to get day of week
            // For Gregorian: 0 = Sunday, 6 = Saturday
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            return dayOfWeek === 0 || dayOfWeek === 6 // Disable Sunday and Saturday
          }
        },
        showWeekend: true
      },
      wrapper: 'calendar-container'
    },
    DisableMondays: {
      title: 'Disable Mondays',
      description:
        'Calendar with all Mondays disabled using isDateDisabled callback',
      component: 'DtCalendar',
      props: {
        constraints: {
          isDateDisabled: (date: Day) => {
            // Convert Day to Date to get day of week
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            // Monday = 1, disable all Mondays
            return dayOfWeek === 1
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
            // Convert Day to Date to get day of week
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            // Disable weekends (Sunday = 0, Saturday = 6)
            return dayOfWeek === 0 || dayOfWeek === 6
          }
        },
        showWeekend: true
      },
      wrapper: 'calendar-container'
    },
    ComplexValidator: {
      title: 'Complex Date Validator',
      description:
        'Calendar with complex validation: disable weekends, specific dates, and dates before today',
      component: 'DtCalendar',
      props: {
        constraints: {
          disabledDates: [new Date(2024, 11, 25), new Date(2024, 11, 31)],
          isDateDisabled: (date: Day) => {
            const dateObj = new Date(date.year, date.month - 1, date.day)
            const dayOfWeek = dateObj.getDay()
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            // Disable weekends
            if (dayOfWeek === 0 || dayOfWeek === 6) return true
            // Disable dates before today
            if (dateObj < today) return true
            return false
          }
        },
        showWeekend: true
      },
      wrapper: 'calendar-container'
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
    WeekSelectionWithInitialValue: {
      title: 'Week Selection with Initial Value',
      description: 'Week selection pre-filled with a week',
      component: 'DtCalendar',
      props: {
        type: 'week',
        initValue: new Date(),
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
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
    RangeWithSinglePreset: {
      title: 'Date Range with Single Preset',
      description: 'Range selection with only Yesterday button',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    RangeWithCustomLabels: {
      title: 'Date Range with Custom Labels',
      description: 'Range selection with preset buttons using custom labels',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true,
          last7days: 'Past Weeeeek',
          thisMonth: 'Current Month'
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
    },
    PresetRangesCustom: {
      title: 'Custom Preset Ranges',
      description: 'Calendar with custom preset range selection',
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
    PresetRangesWithLabels: {
      title: 'Preset Ranges with Custom Labels',
      description: 'Calendar with preset ranges using custom labels',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: 'Yesterday',
          last7days: 'Past Week',
          last30days: 'Past Month',
          thisMonth: 'This Month',
          lastMonth: 'Previous Month'
        },
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    PresetRangesWithCustom: {
      title: 'Preset Ranges with Custom Ranges',
      description:
        'Calendar with built-in presets and completely custom preset ranges',
      component: 'DtCalendar',
      props: {
        type: 'range',
        presetRanges: {
          yesterday: true,
          last7days: true,
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
    },
    AllFeaturesCombined: {
      title: 'All Features Combined',
      description: 'Calendar with all features enabled',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true,
        local: 'en'
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
        initValue: new Date() // Uses current system time
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
        initValue: new Date() // Uses current system time
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
        initValue: new Date() // Uses current system time
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
        initValue: new Date() // Uses current system time
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
          from: new Date(), // Uses current system time
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
        initValue: new Date() // Uses current system time
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
        initValue: new Date() // Uses current system time
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
          from: new Date(), // Uses current system time
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
        initValue: new Date() // Uses current system time
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
        initValue: new Date() // Uses current system time
      },
      wrapper: 'picker-container'
    },
    DarkThemeWithTime: {
      title: 'Dark Theme with Time',
      description: 'Dark theme calendar with time selection in 24-hour format',
      component: 'DtCalendar',
      props: {
        dark: true,
        withTime: true,
        timeFormat: '24',
        showWeekend: true,
        todayBtn: true,
        initValue: new Date() // Uses current system time
      },
      wrapper: 'calendar-container'
    }
  },
  Accessibility: {
    KeyboardNavigationBasic: {
      title: 'Keyboard Navigation - Basic',
      description:
        'Use arrow keys to navigate dates, Enter/Space to select, Escape to close modal (if picker)',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardNavigationPicker: {
      title: 'Keyboard Navigation - Date Picker',
      description:
        'Tab to focus input, Enter to open, arrow keys to navigate, Enter/Space to select, Escape to close',
      component: 'DtPicker',
      props: {
        placeholder: 'Try keyboard navigation',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    KeyboardShortcutsToday: {
      title: 'Keyboard Shortcuts - Today (T key)',
      description:
        'Press "T" key when calendar is focused to jump to today\'s date',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardShortcutsPageUpDown: {
      title: 'Keyboard Shortcuts - PageUp/PageDown',
      description:
        'Use PageUp/PageDown keys to navigate between months quickly',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardShortcutsHomeEnd: {
      title: 'Keyboard Shortcuts - Home/End',
      description:
        'Press Home to jump to first day of month, End for last day of month',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardNavigationRange: {
      title: 'Keyboard Navigation - Range Selection',
      description:
        'Navigate with arrow keys, select start date with Enter, navigate again, select end date',
      component: 'DtCalendar',
      props: {
        type: 'range',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardNavigationMulti: {
      title: 'Keyboard Navigation - Multiple Selection',
      description:
        'Navigate with arrow keys, press Enter/Space to toggle date selection',
      component: 'DtCalendar',
      props: {
        type: 'multi',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    KeyboardNavigationPersian: {
      title: 'Keyboard Navigation - Persian (RTL)',
      description:
        'Arrow keys work in RTL mode - right arrow moves backward, left arrow moves forward',
      component: 'DtCalendar',
      props: {
        local: 'fa',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    FocusTrapPicker: {
      title: 'Focus Trap - Modal Picker',
      description:
        'Open picker modal - focus stays trapped within calendar. Tab cycles through interactive elements.',
      component: 'DtPicker',
      props: {
        placeholder: 'Open to test focus trap',
        showWeekend: true,
        todayBtn: true,
        clearBtn: true
      },
      wrapper: 'picker-container'
    },
    AriaLabelsScreenReader: {
      title: 'ARIA Labels for Screen Readers',
      description:
        'Calendar includes comprehensive ARIA labels, roles, and states for screen reader compatibility',
      component: 'DtCalendar',
      props: {
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'calendar-container'
    },
    AccessibilityWithConstraints: {
      title: 'Keyboard Navigation with Constraints',
      description:
        'Disabled dates are skipped during keyboard navigation (try navigating across Dec 25-27)',
      component: 'DtCalendar',
      props: {
        constraints: {
          disabledDates: [
            new Date(2024, 11, 25),
            new Date(2024, 11, 26),
            new Date(2024, 11, 27)
          ]
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
    },
    PickerOnChange: {
      title: 'Date Picker onChange Callback',
      description:
        'onChange callback for date picker - logs selected date to console',
      component: 'DtPicker',
      props: {
        placeholder: 'Select a date',
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container',
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
    YYYYMMDDFormat: {
      title: 'YYYY.MM.DD Format',
      description:
        'Date picker with YYYY.MM.DD format - ISO-like format with dots as separators',
      component: 'DtPicker',
      props: {
        dateFormat: 'YYYY.MM.DD',
        placeholder: 'Select a date (YYYY.MM.DD)',
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'picker-container'
    },
    KoreanFormat: {
      title: 'Korean Format (YYYY년 MM월 DD일)',
      description:
        'Date picker with Korean format - includes Korean text labels for year, month, and day',
      component: 'DtPicker',
      props: {
        dateFormat: 'YYYY년 MM월 DD일',
        placeholder: 'Select a date (Korean format)',
        initValue: new Date(2024, 11, 25)
      },
      wrapper: 'picker-container'
    },
    CustomSeparator: {
      title: 'Custom Separator (DD | MM | YYYY)',
      description:
        'Date picker with custom separator - uses pipe character as separator',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD | MM | YYYY',
        placeholder: 'Select a date (DD | MM | YYYY)',
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
    RangeWithMMDDYYYY: {
      title: 'Date Range with MM-DD-YYYY Format',
      description:
        'Date range picker with MM-DD-YYYY format - US date format for ranges',
      component: 'DtPicker',
      props: {
        type: 'range',
        dateFormat: 'MM-DD-YYYY',
        placeholder: 'Select date range (MM-DD-YYYY)',
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
    },
    PersianWithCustomFormat: {
      title: 'Persian Calendar with Custom Format',
      description:
        'Persian (Jalali) date picker with DD/MM/YYYY format - custom format with Persian locale',
      component: 'DtPicker',
      props: {
        local: 'fa',
        dateFormat: 'DD/MM/YYYY',
        placeholder: 'تاریخ را انتخاب کنید (DD/MM/YYYY)',
        initValue: new Date(2024, 11, 25),
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    WeekWithCustomFormat: {
      title: 'Week Selection with Custom Format',
      description:
        'Week picker with MM-DD-YYYY format - week selection displays dates in custom format',
      component: 'DtPicker',
      props: {
        type: 'week',
        dateFormat: 'MM-DD-YYYY',
        placeholder: 'Select week (MM-DD-YYYY)',
        initValue: new Date(2024, 11, 25),
        showWeekend: true,
        todayBtn: true
      },
      wrapper: 'picker-container'
    },
    DateTimeWith24HourFormat: {
      title: 'Date and Time with 24-Hour Format',
      description:
        'Date picker with custom format including 24-hour time - uses HH:mm tokens',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD/MM/YYYY HH:mm',
        withTime: true,
        showTimeInput: true,
        timeFormat: '24',
        placeholder: 'Select date and time (DD/MM/YYYY HH:mm)',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    DateTimeWith12HourFormat: {
      title: 'Date and Time with 12-Hour Format',
      description:
        'Date picker with custom format including 12-hour time with AM/PM - uses hh:mm A tokens',
      component: 'DtPicker',
      props: {
        dateFormat: 'MM/DD/YYYY hh:mm A',
        withTime: true,
        showTimeInput: true,
        timeFormat: '12',
        placeholder: 'Select date and time (MM/DD/YYYY hh:mm A)',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    DateTimeWithLowercaseAMPM: {
      title: 'Date and Time with Lowercase am/pm',
      description:
        'Date picker with custom format using lowercase am/pm - uses hh:mm a tokens',
      component: 'DtPicker',
      props: {
        dateFormat: 'YYYY-MM-DD hh:mm a',
        withTime: true,
        showTimeInput: true,
        timeFormat: '12',
        placeholder: 'Select date and time (YYYY-MM-DD hh:mm a)',
        initValue: new Date(2024, 11, 25, 9, 15)
      },
      wrapper: 'picker-container'
    },
    DateTimeWithSeconds: {
      title: 'Date and Time with Seconds',
      description:
        'Date picker with custom format including seconds - uses HH:mm:ss tokens',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD/MM/YYYY HH:mm:ss',
        withTime: true,
        showTimeInput: true,
        timeFormat: '24',
        placeholder: 'Select date and time (DD/MM/YYYY HH:mm:ss)',
        initValue: new Date(2024, 11, 25, 14, 30, 45)
      },
      wrapper: 'picker-container'
    },
    DateTimeCustomSeparators: {
      title: 'Date and Time with Custom Separators',
      description:
        'Date picker with custom format using different separators for date and time',
      component: 'DtPicker',
      props: {
        dateFormat: 'DD.MM.YYYY at HH:mm',
        withTime: true,
        showTimeInput: true,
        timeFormat: '24',
        placeholder: 'Select date and time (DD.MM.YYYY at HH:mm)',
        initValue: new Date(2024, 11, 25, 16, 45)
      },
      wrapper: 'picker-container'
    },
    DateTimeKoreanStyle: {
      title: 'Date and Time Korean Style',
      description:
        'Date picker with Korean format including time - combines Korean date format with time',
      component: 'DtPicker',
      props: {
        dateFormat: 'YYYY년 MM월 DD일 HH시 mm분',
        withTime: true,
        showTimeInput: true,
        timeFormat: '24',
        placeholder: 'Select date and time (Korean format)',
        initValue: new Date(2024, 11, 25, 14, 30)
      },
      wrapper: 'picker-container'
    },
    RangeWithTimeFormat: {
      title: 'Date Range with Time Format',
      description:
        'Date range picker with custom format including time - both dates show time',
      component: 'DtPicker',
      props: {
        type: 'range',
        dateFormat: 'DD/MM/YYYY HH:mm',
        withTime: true,
        showTimeInput: true,
        timeFormat: '24',
        placeholder: 'Select date range with time',
        initValue: {
          from: new Date(2024, 11, 20, 9, 0),
          to: new Date(2024, 11, 25, 17, 30)
        }
      },
      wrapper: 'picker-container'
    },
    RangeWith12HourTime: {
      title: 'Date Range with 12-Hour Time Format',
      description:
        'Date range picker with 12-hour time format - shows AM/PM for both dates',
      component: 'DtPicker',
      props: {
        type: 'range',
        dateFormat: 'MM/DD/YYYY hh:mm A',
        withTime: true,
        showTimeInput: true,
        timeFormat: '12',
        placeholder: 'Select date range with 12-hour time',
        initValue: {
          from: new Date(2024, 11, 20, 9, 0),
          to: new Date(2024, 11, 25, 17, 30)
        }
      },
      wrapper: 'picker-container'
    }
  }
}
