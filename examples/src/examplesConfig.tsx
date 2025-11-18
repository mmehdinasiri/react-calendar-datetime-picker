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
    SingleDatePicker: {
      title: 'Single Date Picker',
      description: 'Date picker for single date selection',
      component: 'DtPicker',
      props: {
        type: 'single',
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
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
    DateRangePicker: {
      title: 'Date Range Picker',
      description: 'Date picker for selecting a range of dates',
      component: 'DtPicker',
      props: {
        type: 'range',
        placeholder: 'Select date range'
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
    MultipleDateSelection: {
      title: 'Multiple Date Selection',
      description: 'Select multiple dates',
      component: 'DtCalendar',
      props: {
        type: 'multi'
      },
      wrapper: 'calendar-container'
    },
    MultipleDatePicker: {
      title: 'Multiple Date Picker',
      description: 'Date picker for selecting multiple dates',
      component: 'DtPicker',
      props: {
        type: 'multi',
        placeholder: 'Select multiple dates'
      },
      wrapper: 'picker-container'
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
    WeekPicker: {
      title: 'Week Picker',
      description: 'Date picker for selecting an entire week',
      component: 'DtPicker',
      props: {
        type: 'week',
        placeholder: 'Select a week',
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
    DatePickerWithWeekend: {
      title: 'Date Picker with Weekend Highlighting',
      description: 'Date picker with weekend days highlighted',
      component: 'DtPicker',
      props: {
        showWeekend: true,
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
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
    DatePickerWithTodayButton: {
      title: 'Date Picker with Today Button',
      description: 'Date picker with Today button in calendar footer',
      component: 'DtPicker',
      props: {
        todayBtn: true,
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
    },
    DatePickerWithClearButton: {
      title: 'Date Picker with Clear Button',
      description: 'Date picker with clear button to reset selection',
      component: 'DtPicker',
      props: {
        clearBtn: true,
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
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
    },
    DatePickerAllFeatures: {
      title: 'Date Picker - All Features',
      description: 'Date picker with all features enabled',
      component: 'DtPicker',
      props: {
        showWeekend: true,
        todayBtn: true,
        clearBtn: true,
        placeholder: 'Select a date'
      },
      wrapper: 'picker-container'
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
    },
    AccessibilityComplete: {
      title: 'Complete Accessibility Example',
      description:
        'All accessibility features: keyboard nav, shortcuts (T/PageUp/PageDown/Home/End), ARIA labels, focus management',
      component: 'DtPicker',
      props: {
        placeholder: 'Fully accessible date picker',
        showWeekend: true,
        todayBtn: true,
        clearBtn: true,
        type: 'single'
      },
      wrapper: 'picker-container'
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
  }
}
