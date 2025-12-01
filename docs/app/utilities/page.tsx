'use client'

import { useState } from 'react'
import { DtCalendar } from '../../../src/components/DtCalendar'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  isBefore,
  isAfter,
  isSameDay,
  isBetween,
  addDays,
  addMonths,
  addYears,
  getDifferenceInDays,
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
} from '../../../src/utils'
import '../../../src/styles/index.scss'

export default function Utilities() {
  const [selectedDate, setSelectedDate] = useState<unknown>(null)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="prose prose-lg max-w-none mb-12">
        <h1>Utility Functions</h1>

        <p>
          React Calendar DateTime Picker provides a comprehensive set of utility functions
          for date manipulation, comparison, and formatting. All utilities work with both
          Gregorian and Jalali calendar systems.
        </p>

        <div className="bg-bg-tertiary border-l-4 border-accent p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-gray-200">
                <strong>Interactive Examples:</strong> Select a date in the calendar below to see
                how the utility functions work with real data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-bg-secondary rounded-lg border border-border p-8 mb-12">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive Demo</h2>
            <p className="text-gray-300">
            Select a date to see utility function results in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <DtCalendar
              dark={true}
              initValue={selectedDate}
              onChange={setSelectedDate}
              showWeekend={true}
              todayBtn={true}
            />
          </div>
          <div>
              <h3 className="text-lg font-semibold text-white mb-4">Selected Date</h3>
              <div className="bg-bg-tertiary p-4 rounded-lg">
                <p className="text-sm text-gray-200">
                <strong>Selected:</strong> {selectedDate ? dayToString(selectedDate, '/') : 'None'}
              </p>
              {selectedDate && (
                <div className="mt-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="json"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {JSON.stringify(selectedDate, null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Date Comparison */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Date Comparison</h2>
            <p className="text-gray-300">
              Functions for comparing dates, checking relationships, and determining date positions.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Basic Comparisons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">isBefore</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`isBefore(date1, date2, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  <p className="text-sm text-gray-300">
                    Returns true if date1 is before date2
                  </p>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Result:</strong> {isBefore(selectedDate, getToday('en'), 'en') ? 'true' : 'false'}
                      <br />
                      <span className="text-gray-300">isBefore(selectedDate, today, 'en')</span>
                    </div>
                  )}
                </div>

                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">isAfter</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`isAfter(date1, date2, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  <p className="text-sm text-gray-300">
                    Returns true if date1 is after date2
                  </p>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Result:</strong> {isAfter(selectedDate, getToday('en'), 'en') ? 'true' : 'false'}
                      <br />
                      <span className="text-gray-300">isAfter(selectedDate, today, 'en')</span>
                    </div>
                  )}
                </div>

                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">isSameDay</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`isSameDay(date1, date2, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  <p className="text-sm text-gray-300">
                    Returns true if dates represent the same day
                  </p>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Result:</strong> {isSameDay(selectedDate, getToday('en'), 'en') ? 'true' : 'false'}
                      <br />
                      <span className="text-gray-300">isSameDay(selectedDate, today, 'en')</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Range Checking</h3>
              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">isBetween</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`isBetween(date, startDate, endDate, locale?)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Returns true if date falls between startDate and endDate (inclusive)
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    <strong>Result:</strong> {(() => {
                      const today = getToday('en')
                      const weekAgo = addDays(today, -7, 'en')
                      const weekFromNow = addDays(today, 7, 'en')
                      return isBetween(selectedDate, weekAgo, weekFromNow, 'en') ? 'true' : 'false'
                    })()}
                    <br />
                    <span className="text-gray-300">isBetween(selectedDate, today-7days, today+7days, 'en')</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Manipulation */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Date Manipulation</h2>
            <p className="text-gray-300">
              Functions for adding/subtracting time periods and calculating differences.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Adding Time Periods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">addDays</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`addDays(date, days, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Tomorrow:</strong><br />
                      {dayToString(addDays(selectedDate, 1, 'en'), '/')}
                    </div>
                  )}
                </div>

                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">addMonths</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`addMonths(date, months, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Next Month:</strong><br />
                      {dayToString(addMonths(selectedDate, 1, 'en'), '/')}
                    </div>
                  )}
                </div>

                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">addYears</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`addYears(date, years, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Next Year:</strong><br />
                      {dayToString(addYears(selectedDate, 1, 'en'), '/')}
                    </div>
                  )}
                </div>

                <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                  <h4 className="font-medium text-white mb-2">getDifferenceInDays</h4>
                  <div className="mb-2 rounded overflow-hidden border border-border">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        padding: '0.5rem'
                      }}
                    >
                      {`getDifferenceInDays(date1, date2, locale?)`}
                    </SyntaxHighlighter>
                  </div>
                  {selectedDate && (
                    <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                      <strong>Days from today:</strong><br />
                      {getDifferenceInDays(selectedDate, getToday('en'), 'en')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Conversion */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Calendar Conversion</h2>
            <p className="text-gray-300">
              Convert dates between Gregorian and Jalali calendar systems.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">convertToJalali</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`convertToJalali(gregorianDate)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Convert Gregorian date to Jalali (Persian)
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    <strong>Jalali:</strong><br />
                    {dayToString(convertToJalali(selectedDate), '/')}
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">convertToGregorian</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`convertToGregorian(jalaliDate)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Convert Jalali date to Gregorian
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    <strong>Gregorian:</strong><br />
                    {dayToString(convertToGregorian(convertToJalali(selectedDate)), '/')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Boundaries */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Date Boundaries</h2>
            <p className="text-gray-300">
              Get the start or end of time periods (day, month, year).
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">startOfDay</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`startOfDay(date)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get start of day (00:00:00)
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(startOfDay(selectedDate), '/')} 00:00:00
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">endOfDay</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`endOfDay(date)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get end of day (23:59:59)
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(endOfDay(selectedDate), '/')} 23:59:59
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">startOfMonth</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`startOfMonth(date, locale?)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get first day of month
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(startOfMonth(selectedDate, 'en'), '/')}
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">endOfMonth</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`endOfMonth(date, locale?)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get last day of month
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(endOfMonth(selectedDate, 'en'), '/')}
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">startOfYear</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`startOfYear(date)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get first day of year
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(startOfYear(selectedDate), '/')}
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-4 bg-bg-tertiary">
                <h4 className="font-medium text-white mb-2">endOfYear</h4>
                <div className="mb-2 rounded overflow-hidden border border-border">
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                  >
                    {`endOfYear(date, locale?)`}
                  </SyntaxHighlighter>
                </div>
                <p className="text-sm text-gray-300">
                  Get last day of year
                </p>
                {selectedDate && (
                  <div className="mt-2 p-2 bg-bg-secondary rounded text-xs">
                    {dayToString(endOfYear(selectedDate, 'en'), '/')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Usage Examples</h2>
            <p className="text-gray-300">
              Common patterns and real-world usage examples.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Date Range Validation</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`import { isBefore, isAfter, addDays } from 'react-calendar-datetime-picker'

function validateBookingDates(checkIn, checkOut) {
  const today = getToday('en')
  const maxStay = addDays(checkIn, 30, 'en')

  // Check-in must be today or later
  if (isBefore(checkIn, today, 'en')) {
    return 'Check-in date cannot be in the past'
  }

  // Check-out must be after check-in
  if (!isAfter(checkOut, checkIn, 'en')) {
    return 'Check-out must be after check-in'
  }

  // Maximum stay is 30 days
  if (isAfter(checkOut, maxStay, 'en')) {
    return 'Maximum stay is 30 days'
  }

  return null // Valid
}`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Calendar Conversion</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`import { convertToJalali, convertToGregorian, dayToString } from 'react-calendar-datetime-picker'

// Gregorian to Jalali
const gregorianDate = { year: 2024, month: 12, day: 25 }
const jalaliDate = convertToJalali(gregorianDate)
console.log(dayToString(jalaliDate, '/')) // "1403/10/5"

// Jalali to Gregorian
const persianDate = { year: 1403, month: 10, day: 5 }
const gregorian = convertToGregorian(persianDate)
console.log(dayToString(gregorian, '/')) // "2024/12/25"`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Age Calculation</h3>
              <div className="rounded-lg overflow-hidden border border-border">
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`import { getDifferenceInYears, getToday } from 'react-calendar-datetime-picker'

function calculateAge(birthDate) {
  const today = getToday('en')
  return getDifferenceInYears(today, birthDate, 'en')
}

// Usage
const birthDate = { year: 1990, month: 5, day: 15 }
const age = calculateAge(birthDate)
console.log(\`Age: \${age}\`) // "Age: 34"`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

        {/* Function Reference */}
        <section className="bg-bg-secondary rounded-lg border border-border p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Function Reference</h2>
            <p className="text-gray-300">
              Complete list of all available utility functions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border border border-border rounded-lg">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Function</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Parameters</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Returns</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-bg-secondary divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>isBefore</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date1, date2, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>boolean</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Check if date1 is before date2</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>isAfter</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date1, date2, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>boolean</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Check if date1 is after date2</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>isSameDay</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date1, date2, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>boolean</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Check if dates are the same day</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>isBetween</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, start, end, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>boolean</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Check if date is between start and end</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>addDays</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, days, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Add days to date</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>addMonths</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, months, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Add months to date</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>addYears</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, years, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Add years to date</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>getDifferenceInDays</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date1, date2, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>number</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get difference in days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>convertToJalali</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>gregorianDate</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Convert Gregorian to Jalali</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>convertToGregorian</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>jalaliDate</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Convert Jalali to Gregorian</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>startOfDay</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get start of day</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>endOfDay</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get end of day</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>startOfMonth</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get start of month</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>endOfMonth</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get end of month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>startOfYear</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get start of year</td>
                </tr>
                <tr className="bg-bg-tertiary">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"><code>endOfYear</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>date, locale?</code></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>Day</code></td>
                  <td className="px-6 py-4 text-sm text-gray-300">Get end of year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
