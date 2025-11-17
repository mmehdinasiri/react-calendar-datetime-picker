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
    SingleDatePicker: createExampleConfig(
      {
        title: 'Single Date Picker',
        component: 'DtPicker',
        props: {
          local: 'en',
          placeholder: 'Select a date'
        },
        wrapper: 'picker-container'
      },
      (value: Day | null) => {
        if (!value) return null
        return (
          <p>
            Selected: {value.year}-{value.month}-{value.day}
          </p>
        )
      }
    ),
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
    CustomBlueTheme: {
      title: 'Custom Color Theme (Blue)',
      description:
        'Calendar with custom CSS variables for blue color scheme - override CSS variables to change the theme',
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
    MultipleDateSelection: {
      title: 'Multiple Date Selection',
      description: 'Select multiple dates',
      component: 'DtCalendar',
      props: {
        type: 'multi'
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
  }
}
