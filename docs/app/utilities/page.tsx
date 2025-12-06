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
import type { Day } from '../../../src/types'
import '../../../src/styles/index.scss'
import Link from 'next/link'

// Type links mapping
const typeLinks: Record<string, string> = {
  Day: '/types#day',
  Range: '/types#range',
  Multi: '/types#multi',
  Week: '/types#week',
  Time: '/types#time',
  TimeRange: '/types#timerange',
  CalendarLocale: '/types#calendarlocale',
  CalendarType: '/types#calendartype',
  DateInput: '/types#dateinput'
}

// Function to render type with links
function renderTypeWithLinks(typeString: string) {
  // Split by common separators and punctuation
  const parts = typeString.split(/(\s+|[|&<>{}[\]()?,:=])/)

  return parts.map((part, index) => {
    const trimmedPart = part.trim()
    if (typeLinks[trimmedPart]) {
      return (
        <Link
          key={index}
          href={typeLinks[trimmedPart]}
          className='text-green-700 dark:text-accent-light hover:text-green-800 dark:hover:text-accent-light-hover underline'
        >
          {part}
        </Link>
      )
    }
    return part
  })
}

export default function Utilities() {
  const [selectedDate, setSelectedDate] = useState<Day | null>(null)

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Utility Functions</h1>

        <p>
          React Calendar DateTime Picker provides a comprehensive set of utility
          functions for date manipulation, comparison, and formatting. All
          utilities work with both Gregorian and Jalali calendar systems.
        </p>

        <h2>Utilities</h2>

        <p>
          The library exports various utility functions for date manipulation
          and formatting:
        </p>

        <div className='space-y-6 mb-8'>
          <div>
            <h3>Date Conversion</h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code>gregorianToJalali(date: Day): Day</code> - Convert
                Gregorian to Jalali date
              </li>
              <li>
                <code>jalaliToGregorian(date: Day): Day</code> - Convert Jalali
                to Gregorian date
              </li>
              <li>
                <code>getToday(locale?: CalendarLocale): Day</code> - Get
                today's date
              </li>
            </ul>
          </div>

          <div>
            <h3>Date Comparison</h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code>
                  isBefore(date: Day, compareDate: Day, locale?:
                  CalendarLocale): boolean
                </code>
              </li>
              <li>
                <code>
                  isAfter(date: Day, compareDate: Day, locale?: CalendarLocale):
                  boolean
                </code>
              </li>
              <li>
                <code>
                  isSameDay(date: Day, compareDate: Day, locale?:
                  CalendarLocale): boolean
                </code>
              </li>
              <li>
                <code>
                  isBetween(date: Day, startDate: Day, endDate: Day, locale?:
                  CalendarLocale): boolean
                </code>
              </li>
            </ul>
          </div>

          <div>
            <h3>Date Manipulation</h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code>
                  addDays(date: Day, days: number, locale?: CalendarLocale): Day
                </code>
              </li>
              <li>
                <code>
                  addMonths(date: Day, months: number, locale?: CalendarLocale):
                  Day
                </code>
              </li>
              <li>
                <code>
                  addYears(date: Day, years: number, locale?: CalendarLocale):
                  Day
                </code>
              </li>
              <li>
                <code>
                  subtractDays(date: Day, days: number, locale?:
                  CalendarLocale): Day
                </code>
              </li>
              <li>
                <code>
                  subtractMonths(date: Day, months: number, locale?:
                  CalendarLocale): Day
                </code>
              </li>
              <li>
                <code>
                  subtractYears(date: Day, years: number, locale?:
                  CalendarLocale): Day
                </code>
              </li>
            </ul>
          </div>

          <div>
            <h3>Formatting</h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <code>
                  formatDateForInput(date: Day | null, format?: string): string
                </code>
              </li>
              <li>
                <code>dayToString(date: Day, divider?: string): string</code>
              </li>
              <li>
                <code>toPersianNumeral(num: number): string</code>
              </li>
            </ul>
          </div>
        </div>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>Interactive Examples:</strong> Select a date in the
                calendar below to see how the utility functions work with real
                data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className='bg-bg-secondary rounded-lg border border-border p-8 mb-12'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Interactive Demo
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            Select a date in the calendar below to see utility function results
            in real-time. All examples on this page use the date you select
            here.
          </p>
          {!selectedDate && (
            <div className='bg-bg-tertiary border-l-4 border-accent p-4'>
              <p className='text-sm text-gray-700 dark:text-gray-200'>
                <strong>💡 Tip:</strong> Select a date in the calendar to see
                all utility functions in action.
              </p>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Select a Date
            </h3>
            <DtCalendar
              dark={true}
              initValue={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showWeekend={true}
              todayBtn={true}
            />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Selected Date
            </h3>
            <div className='bg-bg-tertiary p-4 rounded-lg'>
              {selectedDate ? (
                <>
                  <p className='text-sm text-gray-700 dark:text-gray-200 mb-2'>
                    <strong>Selected Date:</strong>{' '}
                    {dayToString(selectedDate, '/')}
                  </p>
                  <div className='mt-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='json'
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
                </>
              ) : (
                <p className='text-sm text-gray-700 dark:text-gray-200'>
                  No date selected. Please select a date in the calendar.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-12'>
        {/* Date Comparison */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Date Comparison
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Functions for comparing dates, checking relationships, and
              determining date positions.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Basic Comparisons
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    isBefore
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Returns <code className='text-xs'>true</code> if{' '}
                    <code className='text-xs'>date1</code> is before{' '}
                    <code className='text-xs'>date2</code>
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          isBefore(selectedDate, today, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) = {dayToString(getToday('en'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isBefore(selectedDate, getToday('en'), 'en')
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isBefore(selectedDate, getToday('en'), 'en')
                            ? `Selected date is before today`
                            : `Selected date is not before today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    isAfter
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Returns <code className='text-xs'>true</code> if{' '}
                    <code className='text-xs'>date1</code> is after{' '}
                    <code className='text-xs'>date2</code>
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          isAfter(selectedDate, today, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) = {dayToString(getToday('en'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isAfter(selectedDate, getToday('en'), 'en')
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isAfter(selectedDate, getToday('en'), 'en')
                            ? `Selected date is after today`
                            : `Selected date is not after today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    isSameDay
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Returns <code className='text-xs'>true</code> if both dates
                    represent the same day
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          isSameDay(selectedDate, today, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) = {dayToString(getToday('en'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isSameDay(selectedDate, getToday('en'), 'en')
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isSameDay(selectedDate, getToday('en'), 'en')
                            ? `Selected date is today`
                            : `Selected date is not today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Range Checking
              </h3>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-white mb-2'>isBetween</h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns <code className='text-xs'>true</code> if{' '}
                  <code className='text-xs'>date</code> falls between{' '}
                  <code className='text-xs'>startDate</code> and{' '}
                  <code className='text-xs'>endDate</code> (inclusive)
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        isBetween(selectedDate, weekAgo, weekFromNow, 'en')
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input values:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        {(() => {
                          const today = getToday('en')
                          const weekAgo = addDays(today, -7, 'en')
                          const weekFromNow = addDays(today, 7, 'en')
                          return (
                            <>
                              date (selectedDate) ={' '}
                              {dayToString(selectedDate, '/')}
                              <br />
                              startDate (weekAgo) = {dayToString(
                                weekAgo,
                                '/'
                              )}{' '}
                              (today - 7 days)
                              <br />
                              endDate (weekFromNow) ={' '}
                              {dayToString(weekFromNow, '/')} (today + 7 days)
                            </>
                          )
                        })()}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result:</strong>{' '}
                      <code>
                        {(() => {
                          const today = getToday('en')
                          const weekAgo = addDays(today, -7, 'en')
                          const weekFromNow = addDays(today, 7, 'en')
                          return isBetween(
                            selectedDate,
                            weekAgo,
                            weekFromNow,
                            'en'
                          )
                            ? 'true'
                            : 'false'
                        })()}
                      </code>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        {(() => {
                          const today = getToday('en')
                          const weekAgo = addDays(today, -7, 'en')
                          const weekFromNow = addDays(today, 7, 'en')
                          return isBetween(
                            selectedDate,
                            weekAgo,
                            weekFromNow,
                            'en'
                          )
                            ? `Selected date is within the range`
                            : `Selected date is outside the range`
                        })()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Manipulation */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Date Manipulation
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Functions for adding/subtracting time periods and calculating
              differences.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Adding Time Periods
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    addDays
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Adds the specified number of days to the given date
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          addDays(selectedDate, 1, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Input values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date (selectedDate) = {dayToString(selectedDate, '/')}
                          <br />
                          days = 1
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result (Tomorrow):</strong>{' '}
                        {dayToString(addDays(selectedDate, 1, 'en'), '/')}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    addMonths
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Adds the specified number of months to the given date
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          addMonths(selectedDate, 1, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Input values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date (selectedDate) = {dayToString(selectedDate, '/')}
                          <br />
                          months = 1
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result (Next Month):</strong>{' '}
                        {dayToString(addMonths(selectedDate, 1, 'en'), '/')}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    addYears
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Adds the specified number of years to the given date
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          addYears(selectedDate, 1, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Input values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date (selectedDate) = {dayToString(selectedDate, '/')}
                          <br />
                          years = 1
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result (Next Year):</strong>{' '}
                        {dayToString(addYears(selectedDate, 1, 'en'), '/')}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    getDifferenceInDays
                  </h4>
                  <div className='mb-2 rounded overflow-hidden border border-border'>
                    <SyntaxHighlighter
                      language='typescript'
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
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    Calculates the number of days between two dates. Returns a
                    positive number if <code className='text-xs'>date1</code> is
                    after <code className='text-xs'>date2</code>, negative if{' '}
                    <code className='text-xs'>date1</code> is before{' '}
                    <code className='text-xs'>date2</code>, or 0 if they're the
                    same day.
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          getDifferenceInDays(selectedDate, today, 'en')
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Input values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) = {dayToString(getToday('en'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        {getDifferenceInDays(
                          selectedDate,
                          getToday('en'),
                          'en'
                        )}{' '}
                        days
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {(() => {
                            const diff = getDifferenceInDays(
                              selectedDate,
                              getToday('en'),
                              'en'
                            )
                            if (diff > 0) {
                              return `Selected date is ${diff} day${diff !== 1 ? 's' : ''} after today (positive = date1 is after date2)`
                            } else if (diff < 0) {
                              return `Selected date is ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''} before today (negative = date1 is before date2)`
                            } else {
                              return `Selected date is today (0 = same day)`
                            }
                          })()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      Select a date to see the result
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Conversion */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Calendar Conversion
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Convert dates between Gregorian and Jalali calendar systems.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  convertToJalali
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Convert Gregorian date to Jalali (Persian)
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        convertToJalali(selectedDate)
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        gregorianDate (selectedDate) ={' '}
                        {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (Jalali):</strong>{' '}
                      {dayToString(convertToJalali(selectedDate), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  convertToGregorian
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Convert Jalali date to Gregorian
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        convertToGregorian(jalaliDate)
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        jalaliDate ={' '}
                        {dayToString(convertToJalali(selectedDate), '/')}{' '}
                        (converted from selectedDate)
                        <br />
                        <span className='text-xs'>
                          Original: {dayToString(selectedDate, '/')}
                        </span>
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (Gregorian):</strong>{' '}
                      {dayToString(
                        convertToGregorian(convertToJalali(selectedDate)),
                        '/'
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Boundaries */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Date Boundaries
            </h2>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              These functions return boundary dates for a given time period.
              They help you get the first or last day of a day, month, or year.
              Useful for date range queries, filtering, and calculations.
            </p>
            <div className='bg-bg-tertiary border-l-4 border-accent p-4'>
              <p className='text-sm text-gray-200'>
                <strong>Example:</strong> If you have a date like{' '}
                <code>December 15, 2024</code>, <code>startOfMonth</code>{' '}
                returns <code>December 1, 2024</code> (first day of that month),
                and <code>endOfMonth</code> returns{' '}
                <code>December 31, 2024</code> (last day of that month).
              </p>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  startOfDay
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the same date but at the start of the day (00:00:00).
                  Useful for date range queries where you want to include the
                  entire day.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>startOfDay(selectedDate)</code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result:</strong>{' '}
                      {dayToString(startOfDay(selectedDate), '/')} 00:00:00
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        Same date, start of day
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  endOfDay
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the same date but at the end of the day (23:59:59).
                  Useful for inclusive date range queries.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>endOfDay(selectedDate)</code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result:</strong>{' '}
                      {dayToString(endOfDay(selectedDate), '/')} 23:59:59
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        Same date, end of day
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  startOfMonth
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the first day of the month for the given date.
                  Example:{' '}
                  <code className='text-xs'>
                    startOfMonth(December 15, 2024)
                  </code>{' '}
                  returns <code className='text-xs'>December 1, 2024</code>.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        startOfMonth(selectedDate, 'en')
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (First day of month):</strong>{' '}
                      {dayToString(startOfMonth(selectedDate, 'en'), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  endOfMonth
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the last day of the month for the given date. Example:{' '}
                  <code className='text-xs'>endOfMonth(December 15, 2024)</code>{' '}
                  returns <code className='text-xs'>December 31, 2024</code>.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        endOfMonth(selectedDate, 'en')
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (Last day of month):</strong>{' '}
                      {dayToString(endOfMonth(selectedDate, 'en'), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  startOfYear
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the first day of the year for the given date. Example:{' '}
                  <code className='text-xs'>
                    startOfYear(December 15, 2024)
                  </code>{' '}
                  returns <code className='text-xs'>January 1, 2024</code>.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>startOfYear(selectedDate)</code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (First day of year):</strong>{' '}
                      {dayToString(startOfYear(selectedDate), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  endOfYear
                </h4>
                <div className='mb-2 rounded overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='typescript'
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
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  Returns the last day of the year for the given date. Example:{' '}
                  <code className='text-xs'>endOfYear(December 15, 2024)</code>{' '}
                  returns <code className='text-xs'>December 31, 2024</code>.
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        endOfYear(selectedDate, 'en')
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Result (Last day of year):</strong>{' '}
                      {dayToString(endOfYear(selectedDate, 'en'), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    Select a date to see the result
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Usage Examples
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Common patterns and real-world usage examples.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Date Range Validation
              </h3>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='typescript'
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
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Calendar Conversion
              </h3>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='typescript'
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
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Age Calculation
              </h3>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='typescript'
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
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Function Reference
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Complete list of all available utility functions.
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
              <thead className='bg-bg-tertiary'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Function
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Parameters
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Returns
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className='bg-bg-secondary divide-y divide-border'>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isBefore</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if date1 is before date2
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isAfter</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if date1 is after date2
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isSameDay</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if dates are the same day
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isBetween</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, start, end, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if date is between start and end
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>addDays</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, days, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Add days to date
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>addMonths</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, months, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Add months to date
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>addYears</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, years, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Add years to date
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>getDifferenceInDays</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>number</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Returns number of days between date1 and date2. Positive if
                    date1 is after date2, negative if before, 0 if same day.
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>convertToJalali</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>gregorianDate</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Convert Gregorian to Jalali
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>convertToGregorian</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>jalaliDate</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Convert Jalali to Gregorian
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>startOfDay</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get start of day
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>endOfDay</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get end of day
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>startOfMonth</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get start of month
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>endOfMonth</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get end of month
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>startOfYear</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get start of year
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>endOfYear</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get end of year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
