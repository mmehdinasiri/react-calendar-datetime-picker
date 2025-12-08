/**
 * Content definitions for utilities page.
 * Contains all static text content separated from presentation logic.
 */

export const utilitiesContent = {
  title: 'Utility Functions',
  intro:
    'React Calendar DateTime Picker provides a comprehensive set of utility functions for date manipulation, comparison, and formatting. All utilities work with both Gregorian and Jalali calendar systems.',
  utilitiesOverview: {
    title: 'Utilities',
    description:
      'The library exports various utility functions for date manipulation and formatting:',
    categories: {
      dateConversion: {
        title: 'Date Conversion',
        items: [
          {
            code: 'gregorianToJalali(date: Day): Day',
            description: 'Convert Gregorian to Jalali date'
          },
          {
            code: 'jalaliToGregorian(date: Day): Day',
            description: 'Convert Jalali to Gregorian date'
          },
          {
            code: 'getToday(locale?: CalendarLocale): Day',
            description: "Get today's date"
          }
        ]
      },
      dateComparison: {
        title: 'Date Comparison',
        items: [
          {
            code: 'isBefore(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
            description: ''
          },
          {
            code: 'isAfter(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
            description: ''
          },
          {
            code: 'isSameDay(date: Day, compareDate: Day, locale?: CalendarLocale): boolean',
            description: ''
          },
          {
            code: 'isBetween(date: Day, startDate: Day, endDate: Day, locale?: CalendarLocale): boolean',
            description: ''
          }
        ]
      },
      dateManipulation: {
        title: 'Date Manipulation',
        items: [
          {
            code: 'addDays(date: Day, days: number, locale?: CalendarLocale): Day',
            description: ''
          },
          {
            code: 'addMonths(date: Day, months: number, locale?: CalendarLocale): Day',
            description: ''
          },
          {
            code: 'addYears(date: Day, years: number, locale?: CalendarLocale): Day',
            description: ''
          },
          {
            code: 'subtractDays(date: Day, days: number, locale?: CalendarLocale): Day',
            description: ''
          },
          {
            code: 'subtractMonths(date: Day, months: number, locale?: CalendarLocale): Day',
            description: ''
          },
          {
            code: 'subtractYears(date: Day, years: number, locale?: CalendarLocale): Day',
            description: ''
          }
        ]
      },
      formatting: {
        title: 'Formatting',
        items: [
          {
            code: 'formatDateForInput(date: Day | null, format?: string): string',
            description: ''
          },
          {
            code: 'dayToString(date: Day, divider?: string): string',
            description: ''
          },
          {
            code: 'toPersianNumeral(num: number): string',
            description: ''
          }
        ]
      }
    }
  },
  interactiveDemo: {
    title: 'Interactive Demo',
    description:
      'Select a date in the calendar below to see utility function results in real-time. All examples on this page use the date you select here.',
    tip: '💡 Tip: Select a date in the calendar to see all utility functions in action.',
    selectDateTitle: 'Select a Date',
    selectedDateTitle: 'Selected Date',
    noDateSelected: 'No date selected. Please select a date in the calendar.'
  },
  sections: {
    dateComparison: {
      title: 'Date Comparison',
      description:
        'Functions for comparing dates, checking relationships, and determining date positions.',
      basicComparisons: {
        title: 'Basic Comparisons',
        isBefore: {
          title: 'isBefore',
          code: 'isBefore(date1, date2, locale?)',
          description: 'Returns true if date1 is before date2',
          functionCall: "isBefore(selectedDate, today, 'gregorian')",
          noDateMessage: 'Select a date to see the result'
        },
        isAfter: {
          title: 'isAfter',
          code: 'isAfter(date1, date2, locale?)',
          description: 'Returns true if date1 is after date2',
          functionCall: "isAfter(selectedDate, today, 'gregorian')",
          noDateMessage: 'Select a date to see the result'
        },
        isSameDay: {
          title: 'isSameDay',
          code: 'isSameDay(date1, date2, locale?)',
          description: 'Returns true if both dates represent the same day',
          functionCall: "isSameDay(selectedDate, today, 'gregorian')",
          noDateMessage: 'Select a date to see the result'
        }
      },
      rangeChecking: {
        title: 'Range Checking',
        isBetween: {
          title: 'isBetween',
          code: 'isBetween(date, startDate, endDate, locale?)',
          description:
            'Returns true if date falls between startDate and endDate (inclusive)',
          functionCall:
            "isBetween(selectedDate, weekAgo, weekFromNow, 'gregorian')",
          noDateMessage: 'Select a date to see the result'
        }
      }
    },
    dateManipulation: {
      title: 'Date Manipulation',
      description:
        'Functions for adding/subtracting time periods and calculating differences.',
      addingTimePeriods: {
        title: 'Adding Time Periods',
        addDays: {
          title: 'addDays',
          code: 'addDays(date, days, locale?)',
          description: 'Adds the specified number of days to the given date',
          functionCall: "addDays(selectedDate, 1, 'gregorian')",
          resultLabel: 'Result (Tomorrow):',
          noDateMessage: 'Select a date to see the result'
        },
        addMonths: {
          title: 'addMonths',
          code: 'addMonths(date, months, locale?)',
          description: 'Adds the specified number of months to the given date',
          functionCall: "addMonths(selectedDate, 1, 'gregorian')",
          resultLabel: 'Result (Next Month):',
          noDateMessage: 'Select a date to see the result'
        },
        addYears: {
          title: 'addYears',
          code: 'addYears(date, years, locale?)',
          description: 'Adds the specified number of years to the given date',
          functionCall: "addYears(selectedDate, 1, 'gregorian')",
          resultLabel: 'Result (Next Year):',
          noDateMessage: 'Select a date to see the result'
        },
        getDifferenceInDays: {
          title: 'getDifferenceInDays',
          code: 'getDifferenceInDays(date1, date2, locale?)',
          description:
            "Calculates the number of days between two dates. Returns a positive number if date1 is after date2, negative if date1 is before date2, or 0 if they're the same day.",
          functionCall: "getDifferenceInDays(selectedDate, today, 'gregorian')",
          noDateMessage: 'Select a date to see the result'
        }
      }
    },
    calendarConversion: {
      title: 'Calendar Conversion',
      description:
        'Convert dates between Gregorian and Jalali calendar systems.',
      convertToJalali: {
        title: 'convertToJalali',
        code: 'convertToJalali(gregorianDate)',
        description: 'Convert Gregorian date to Jalali (Persian)',
        functionCall: 'convertToJalali(selectedDate)',
        resultLabel: 'Result (Jalali):',
        noDateMessage: 'Select a date to see the result'
      },
      convertToGregorian: {
        title: 'convertToGregorian',
        code: 'convertToGregorian(jalaliDate)',
        description: 'Convert Jalali date to Gregorian',
        functionCall: 'convertToGregorian(jalaliDate)',
        resultLabel: 'Result (Gregorian):',
        noDateMessage: 'Select a date to see the result'
      }
    },
    dateBoundaries: {
      title: 'Date Boundaries',
      description:
        'These functions return boundary dates for a given time period. They help you get the first or last day of a day, month, or year. Useful for date range queries, filtering, and calculations.',
      example:
        'Example: If you have a date like `December 15, 2024`, `startOfMonth` returns `December 1, 2024` (first day of that month), and `endOfMonth` returns `December 31, 2024` (last day of that month).',
      startOfDay: {
        title: 'startOfDay',
        code: 'startOfDay(date)',
        description:
          'Returns the same date but at the start of the day (00:00:00). Useful for date range queries where you want to include the entire day.',
        functionCall: 'startOfDay(selectedDate)',
        resultLabel: 'Result:',
        resultNote: 'Same date, start of day',
        noDateMessage: 'Select a date to see the result'
      },
      endOfDay: {
        title: 'endOfDay',
        code: 'endOfDay(date)',
        description:
          'Returns the same date but at the end of the day (23:59:59). Useful for inclusive date range queries.',
        functionCall: 'endOfDay(selectedDate)',
        resultLabel: 'Result:',
        resultNote: 'Same date, end of day',
        noDateMessage: 'Select a date to see the result'
      },
      startOfMonth: {
        title: 'startOfMonth',
        code: 'startOfMonth(date, locale?)',
        description:
          'Returns the first day of the month for the given date. Example: startOfMonth(December 15, 2024) returns December 1, 2024.',
        functionCall: "startOfMonth(selectedDate, 'gregorian')",
        resultLabel: 'Result (First day of month):',
        noDateMessage: 'Select a date to see the result'
      },
      endOfMonth: {
        title: 'endOfMonth',
        code: 'endOfMonth(date, locale?)',
        description:
          'Returns the last day of the month for the given date. Example: endOfMonth(December 15, 2024) returns December 31, 2024.',
        functionCall: "endOfMonth(selectedDate, 'gregorian')",
        resultLabel: 'Result (Last day of month):',
        noDateMessage: 'Select a date to see the result'
      },
      startOfYear: {
        title: 'startOfYear',
        code: 'startOfYear(date)',
        description:
          'Returns the first day of the year for the given date. Example: startOfYear(December 15, 2024) returns January 1, 2024.',
        functionCall: 'startOfYear(selectedDate)',
        resultLabel: 'Result (First day of year):',
        noDateMessage: 'Select a date to see the result'
      },
      endOfYear: {
        title: 'endOfYear',
        code: 'endOfYear(date, locale?)',
        description:
          'Returns the last day of the year for the given date. Example: endOfYear(December 15, 2024) returns December 31, 2024.',
        functionCall: "endOfYear(selectedDate, 'gregorian')",
        resultLabel: 'Result (Last day of year):',
        noDateMessage: 'Select a date to see the result'
      }
    },
    usageExamples: {
      title: 'Usage Examples',
      description: 'Common patterns and real-world usage examples.',
      dateRangeValidation: {
        title: 'Date Range Validation',
        code: `import { isBefore, isAfter, addDays } from 'react-calendar-datetime-picker'

function validateBookingDates(checkIn, checkOut) {
  const today = getToday('gregorian')
  const maxStay = addDays(checkIn, 30, 'gregorian')

  // Check-in must be today or later
  if (isBefore(checkIn, today, 'gregorian')) {
    return 'Check-in date cannot be in the past'
  }

  // Check-out must be after check-in
  if (!isAfter(checkOut, checkIn, 'gregorian')) {
    return 'Check-out must be after check-in'
  }

  // Maximum stay is 30 days
  if (isAfter(checkOut, maxStay, 'gregorian')) {
    return 'Maximum stay is 30 days'
  }

  return null // Valid
}`
      },
      calendarConversion: {
        title: 'Calendar Conversion',
        code: `import { convertToJalali, convertToGregorian, dayToString } from 'react-calendar-datetime-picker'

// Gregorian to Jalali
const gregorianDate = { year: 2024, month: 12, day: 25 }
const jalaliDate = convertToJalali(gregorianDate)
console.log(dayToString(jalaliDate, '/')) // "1403/10/5"

// Jalali to Gregorian
const persianDate = { year: 1403, month: 10, day: 5 }
const gregorian = convertToGregorian(persianDate)
console.log(dayToString(gregorian, '/')) // "2024/12/25"`
      },
      ageCalculation: {
        title: 'Age Calculation',
        code: `import { getDifferenceInYears, getToday } from 'react-calendar-datetime-picker'

function calculateAge(birthDate) {
  const today = getToday('gregorian')
  return getDifferenceInYears(today, birthDate, 'gregorian')
}

// Usage
const birthDate = { year: 1990, month: 5, day: 15 }
const age = calculateAge(birthDate)
console.log(\`Age: \${age}\`) // "Age: 34"`
      }
    },
    functionReference: {
      title: 'Function Reference',
      description: 'Complete list of all available utility functions.'
    }
  }
}
