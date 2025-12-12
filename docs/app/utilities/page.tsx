'use client'

import { useState } from 'react'
import { DtCalendar } from '../../../src/components/DtCalendar'
import { CodeBlock, InfoBox, SectionHeader } from '../components'
import {
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  isSameYear,
  isLeapYear,
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
  getStartOfWeek,
  getEndOfWeek,
  getDaysInRange,
  getToday,
  dayToString
} from '../../../src/utils'
import type { Day } from '../../../src/types'
import '../../../src/styles/index.scss'
import Link from 'next/link'
import { utilitiesContent } from './utilitiesContent'

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

  const content = utilitiesContent

  return (
    <div className='max-w-6xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>{content.title}</h1>

        <p>{content.intro}</p>

        <h2>{content.utilitiesOverview.title}</h2>

        <p>{content.utilitiesOverview.description}</p>

        <div className='space-y-6 mb-8'>
          <div>
            <h3>{content.utilitiesOverview.categories.dateConversion.title}</h3>
            <ul className='list-disc list-inside space-y-1'>
              {content.utilitiesOverview.categories.dateConversion.items.map(
                (item, idx) => (
                  <li key={idx}>
                    <code>{item.code}</code>
                    {item.description && ` - ${item.description}`}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3>{content.utilitiesOverview.categories.dateComparison.title}</h3>
            <ul className='list-disc list-inside space-y-1'>
              {content.utilitiesOverview.categories.dateComparison.items.map(
                (item, idx) => (
                  <li key={idx}>
                    <code>{item.code}</code>
                    {item.description && ` - ${item.description}`}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3>
              {content.utilitiesOverview.categories.dateManipulation.title}
            </h3>
            <ul className='list-disc list-inside space-y-1'>
              {content.utilitiesOverview.categories.dateManipulation.items.map(
                (item, idx) => (
                  <li key={idx}>
                    <code>{item.code}</code>
                    {item.description && ` - ${item.description}`}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3>{content.utilitiesOverview.categories.formatting.title}</h3>
            <ul className='list-disc list-inside space-y-1'>
              {content.utilitiesOverview.categories.formatting.items.map(
                (item, idx) => (
                  <li key={idx}>
                    <code>{item.code}</code>
                    {item.description && ` - ${item.description}`}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <InfoBox>
          <p className='text-sm text-gray-200'>
            <strong>Interactive Examples:</strong> Select a date in the calendar
            below to see how the utility functions work with real data.
          </p>
        </InfoBox>
      </div>

      {/* Interactive Demo */}
      <div className='bg-bg-secondary rounded-lg border border-border p-8 mb-12'>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            {content.interactiveDemo.title}
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            {content.interactiveDemo.description}
          </p>
          {!selectedDate && (
            <InfoBox>
              <p className='text-sm text-gray-200'>
                <strong>{content.interactiveDemo.tip}</strong>
              </p>
            </InfoBox>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              {content.interactiveDemo.selectDateTitle}
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
              {content.interactiveDemo.selectedDateTitle}
            </h3>
            <div className='bg-bg-tertiary p-4 rounded-lg'>
              {selectedDate ? (
                <>
                  <p className='text-sm text-gray-700 dark:text-gray-200 mb-2'>
                    <strong>Selected Date:</strong>{' '}
                    {dayToString(selectedDate, '/')}
                  </p>
                  <CodeBlock
                    language='json'
                    code={JSON.stringify(selectedDate, null, 2)}
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mt-2'
                  />
                </>
              ) : (
                <p className='text-sm text-gray-700 dark:text-gray-200'>
                  {content.interactiveDemo.noDateSelected}
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
            <SectionHeader>
              {content.sections.dateComparison.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.dateComparison.description}
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.dateComparison.basicComparisons.title}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isBefore
                        .title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons.isBefore
                        .code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isBefore
                        .description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isBefore.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isBefore(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isBefore(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? `Selected date is before today`
                            : `Selected date is not before today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons
                          .isBefore.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isAfter
                        .title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons.isAfter
                        .code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isAfter
                        .description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isAfter.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isAfter(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isAfter(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? `Selected date is after today`
                            : `Selected date is not after today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons.isAfter
                          .noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isSameDay
                        .title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons.isSameDay
                        .code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons.isSameDay
                        .description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isSameDay.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isSameDay(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isSameDay(
                            selectedDate,
                            getToday('gregorian'),
                            'gregorian'
                          )
                            ? `Selected date is today`
                            : `Selected date is not today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons
                          .isSameDay.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isSameMonth.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons
                        .isSameMonth.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isSameMonth.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isSameMonth.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isSameMonth(selectedDate, getToday('gregorian'))
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isSameMonth(selectedDate, getToday('gregorian'))
                            ? `Selected date is in the same month as today`
                            : `Selected date is not in the same month as today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons
                          .isSameMonth.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isSameYear.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons
                        .isSameYear.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isSameYear.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isSameYear.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        <code>
                          {isSameYear(selectedDate, getToday('gregorian'))
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {isSameYear(selectedDate, getToday('gregorian'))
                            ? `Selected date is in the same year as today`
                            : `Selected date is not in the same year as today`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons
                          .isSameYear.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isLeapYear.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateComparison.basicComparisons
                        .isLeapYear.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateComparison.basicComparisons
                        .isLeapYear.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateComparison.basicComparisons
                              .isLeapYear.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          year (selectedDate.year) = {selectedDate.year}
                          <br />
                          locale = 'gregorian'
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result (Gregorian):</strong>{' '}
                        <code>
                          {isLeapYear(selectedDate.year, 'gregorian')
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <strong>Result (Jalali):</strong>{' '}
                        <code>
                          {isLeapYear(selectedDate.year, 'jalali')
                            ? 'true'
                            : 'false'}
                        </code>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          Year {selectedDate.year} is{' '}
                          {isLeapYear(selectedDate.year, 'gregorian')
                            ? 'a leap year'
                            : 'not a leap year'}{' '}
                          in Gregorian calendar, and{' '}
                          {isLeapYear(selectedDate.year, 'jalali')
                            ? 'a leap year'
                            : 'not a leap year'}{' '}
                          in Jalali calendar
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateComparison.basicComparisons
                          .isLeapYear.noDateMessage
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.dateComparison.rangeChecking.title}
              </h3>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-white mb-2'>
                  {
                    content.sections.dateComparison.rangeChecking.isBetween
                      .title
                  }
                </h4>
                <CodeBlock
                  language='typescript'
                  code={
                    content.sections.dateComparison.rangeChecking.isBetween.code
                  }
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {
                    content.sections.dateComparison.rangeChecking.isBetween
                      .description
                  }
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateComparison.rangeChecking
                            .isBetween.functionCall
                        }
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input values:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        {(() => {
                          const today = getToday('gregorian')
                          const weekAgo = addDays(today, -7, 'gregorian')
                          const weekFromNow = addDays(today, 7, 'gregorian')
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
                          const today = getToday('gregorian')
                          const weekAgo = addDays(today, -7, 'gregorian')
                          const weekFromNow = addDays(today, 7, 'gregorian')
                          return isBetween(
                            selectedDate,
                            weekAgo,
                            weekFromNow,
                            'gregorian'
                          )
                            ? 'true'
                            : 'false'
                        })()}
                      </code>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        {(() => {
                          const today = getToday('gregorian')
                          const weekAgo = addDays(today, -7, 'gregorian')
                          const weekFromNow = addDays(today, 7, 'gregorian')
                          return isBetween(
                            selectedDate,
                            weekAgo,
                            weekFromNow,
                            'gregorian'
                          )
                            ? `Selected date is within the range`
                            : `Selected date is outside the range`
                        })()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {
                      content.sections.dateComparison.rangeChecking.isBetween
                        .noDateMessage
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Manipulation */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>
              {content.sections.dateManipulation.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.dateManipulation.description}
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.dateManipulation.addingTimePeriods.title}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addDays.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateManipulation.addingTimePeriods
                        .addDays.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addDays.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addDays.functionCall
                          }
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
                        <strong>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addDays.resultLabel
                          }
                        </strong>{' '}
                        {dayToString(
                          addDays(selectedDate, 1, 'gregorian'),
                          '/'
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateManipulation.addingTimePeriods
                          .addDays.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addMonths.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateManipulation.addingTimePeriods
                        .addMonths.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addMonths.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addMonths.functionCall
                          }
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
                        <strong>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addMonths.resultLabel
                          }
                        </strong>{' '}
                        {dayToString(
                          addMonths(selectedDate, 1, 'gregorian'),
                          '/'
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateManipulation.addingTimePeriods
                          .addMonths.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addYears.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateManipulation.addingTimePeriods
                        .addYears.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .addYears.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addYears.functionCall
                          }
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
                        <strong>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .addYears.resultLabel
                          }
                        </strong>{' '}
                        {dayToString(
                          addYears(selectedDate, 1, 'gregorian'),
                          '/'
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                      {
                        content.sections.dateManipulation.addingTimePeriods
                          .addYears.noDateMessage
                      }
                    </div>
                  )}
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .getDifferenceInDays.title
                    }
                  </h4>
                  <CodeBlock
                    language='typescript'
                    code={
                      content.sections.dateManipulation.addingTimePeriods
                        .getDifferenceInDays.code
                    }
                    customStyle={{
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      padding: '0.5rem'
                    }}
                    className='mb-2'
                  />
                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                    {
                      content.sections.dateManipulation.addingTimePeriods
                        .getDifferenceInDays.description
                    }
                  </p>
                  {selectedDate ? (
                    <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                      <div>
                        <strong>Function call:</strong>
                        <br />
                        <code className='text-xs'>
                          {
                            content.sections.dateManipulation.addingTimePeriods
                              .getDifferenceInDays.functionCall
                          }
                        </code>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Input values:</strong>
                        <br />
                        <span className='text-gray-700 dark:text-gray-300'>
                          date1 (selectedDate) ={' '}
                          {dayToString(selectedDate, '/')}
                          <br />
                          date2 (today) ={' '}
                          {dayToString(getToday('gregorian'), '/')}
                        </span>
                      </div>
                      <div className='mt-2 pt-2 border-t border-border'>
                        <strong>Result:</strong>{' '}
                        {getDifferenceInDays(
                          selectedDate,
                          getToday('gregorian'),
                          'gregorian'
                        )}{' '}
                        days
                        <br />
                        <span className='text-gray-700 dark:text-gray-300 text-xs'>
                          {(() => {
                            const diff = getDifferenceInDays(
                              selectedDate,
                              getToday('gregorian'),
                              'gregorian'
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
                      {
                        content.sections.dateManipulation.addingTimePeriods
                          .getDifferenceInDays.noDateMessage
                      }
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
            <SectionHeader>
              {content.sections.calendarConversion.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.calendarConversion.description}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.calendarConversion.convertToJalali.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={
                    content.sections.calendarConversion.convertToJalali.code
                  }
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {
                    content.sections.calendarConversion.convertToJalali
                      .description
                  }
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.calendarConversion.convertToJalali
                            .functionCall
                        }
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
                      <strong>
                        {
                          content.sections.calendarConversion.convertToJalali
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(convertToJalali(selectedDate), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {
                      content.sections.calendarConversion.convertToJalali
                        .noDateMessage
                    }
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.calendarConversion.convertToGregorian.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={
                    content.sections.calendarConversion.convertToGregorian.code
                  }
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {
                    content.sections.calendarConversion.convertToGregorian
                      .description
                  }
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.calendarConversion.convertToGregorian
                            .functionCall
                        }
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
                      <strong>
                        {
                          content.sections.calendarConversion.convertToGregorian
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(
                        convertToGregorian(convertToJalali(selectedDate)),
                        '/'
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {
                      content.sections.calendarConversion.convertToGregorian
                        .noDateMessage
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Date Boundaries */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>
              {content.sections.dateBoundaries.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              {content.sections.dateBoundaries.description}
            </p>
            <InfoBox>
              <p className='text-sm text-gray-200'>
                <strong>{content.sections.dateBoundaries.example}</strong>
              </p>
            </InfoBox>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.startOfDay.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.startOfDay.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.startOfDay.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.startOfDay
                            .functionCall
                        }
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
                      <strong>
                        {content.sections.dateBoundaries.startOfDay.resultLabel}
                      </strong>{' '}
                      {dayToString(startOfDay(selectedDate), '/')} 00:00:00
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        {content.sections.dateBoundaries.startOfDay.resultNote}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.startOfDay.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.endOfDay.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.endOfDay.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.endOfDay.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {content.sections.dateBoundaries.endOfDay.functionCall}
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
                      <strong>
                        {content.sections.dateBoundaries.endOfDay.resultLabel}
                      </strong>{' '}
                      {dayToString(endOfDay(selectedDate), '/')} 23:59:59
                      <br />
                      <span className='text-gray-700 dark:text-gray-300 text-xs'>
                        {content.sections.dateBoundaries.endOfDay.resultNote}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.endOfDay.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.startOfMonth.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.startOfMonth.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.startOfMonth.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.startOfMonth
                            .functionCall
                        }
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
                      <strong>
                        {
                          content.sections.dateBoundaries.startOfMonth
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(
                        startOfMonth(selectedDate, 'gregorian'),
                        '/'
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.startOfMonth.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.endOfMonth.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.endOfMonth.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.endOfMonth.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.endOfMonth
                            .functionCall
                        }
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
                      <strong>
                        {content.sections.dateBoundaries.endOfMonth.resultLabel}
                      </strong>{' '}
                      {dayToString(endOfMonth(selectedDate, 'gregorian'), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.endOfMonth.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.startOfYear.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.startOfYear.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.startOfYear.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.startOfYear
                            .functionCall
                        }
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
                      <strong>
                        {
                          content.sections.dateBoundaries.startOfYear
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(startOfYear(selectedDate), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.startOfYear.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.endOfYear.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.endOfYear.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.endOfYear.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {content.sections.dateBoundaries.endOfYear.functionCall}
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
                      <strong>
                        {content.sections.dateBoundaries.endOfYear.resultLabel}
                      </strong>{' '}
                      {dayToString(endOfYear(selectedDate, 'gregorian'), '/')}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.endOfYear.noDateMessage}
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.getStartOfWeek.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.getStartOfWeek.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.getStartOfWeek.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.getStartOfWeek
                            .functionCall
                        }
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                        <br />
                        weekStart = 0 (Sunday)
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>
                        {
                          content.sections.dateBoundaries.getStartOfWeek
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(
                        getStartOfWeek(selectedDate, 0, 'gregorian'),
                        '/'
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {
                      content.sections.dateBoundaries.getStartOfWeek
                        .noDateMessage
                    }
                  </div>
                )}
              </div>

              <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                  {content.sections.dateBoundaries.getEndOfWeek.title}
                </h4>
                <CodeBlock
                  language='typescript'
                  code={content.sections.dateBoundaries.getEndOfWeek.code}
                  customStyle={{
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    padding: '0.5rem'
                  }}
                  className='mb-2'
                />
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                  {content.sections.dateBoundaries.getEndOfWeek.description}
                </p>
                {selectedDate ? (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                    <div>
                      <strong>Function call:</strong>
                      <br />
                      <code className='text-xs'>
                        {
                          content.sections.dateBoundaries.getEndOfWeek
                            .functionCall
                        }
                      </code>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>Input value:</strong>
                      <br />
                      <span className='text-gray-700 dark:text-gray-300'>
                        date (selectedDate) = {dayToString(selectedDate, '/')}
                        <br />
                        weekStart = 0 (Sunday)
                      </span>
                    </div>
                    <div className='mt-2 pt-2 border-t border-border'>
                      <strong>
                        {
                          content.sections.dateBoundaries.getEndOfWeek
                            .resultLabel
                        }
                      </strong>{' '}
                      {dayToString(
                        getEndOfWeek(selectedDate, 0, 'gregorian'),
                        '/'
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                    {content.sections.dateBoundaries.getEndOfWeek.noDateMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Range Utilities */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>
              {content.sections.rangeUtilities.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.rangeUtilities.description}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
              <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                {content.sections.rangeUtilities.getDaysInRange.title}
              </h4>
              <CodeBlock
                language='typescript'
                code={content.sections.rangeUtilities.getDaysInRange.code}
                customStyle={{
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  lineHeight: '1.5',
                  padding: '0.5rem'
                }}
                className='mb-2'
              />
              <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                {content.sections.rangeUtilities.getDaysInRange.description}
              </p>
              {selectedDate ? (
                <div className='mt-2 p-2 bg-bg-secondary rounded text-xs space-y-1'>
                  <div>
                    <strong>Function call:</strong>
                    <br />
                    <code className='text-xs'>
                      {
                        content.sections.rangeUtilities.getDaysInRange
                          .functionCall
                      }
                    </code>
                  </div>
                  <div className='mt-2 pt-2 border-t border-border'>
                    <strong>Input values:</strong>
                    <br />
                    <span className='text-gray-700 dark:text-gray-300'>
                      {(() => {
                        const today = getToday('gregorian')
                        const weekAgo = addDays(today, -7, 'gregorian')
                        return (
                          <>
                            range.from (weekAgo) = {dayToString(weekAgo, '/')}
                            <br />
                            range.to (today) = {dayToString(today, '/')}
                          </>
                        )
                      })()}
                    </span>
                  </div>
                  <div className='mt-2 pt-2 border-t border-border'>
                    <strong>
                      {
                        content.sections.rangeUtilities.getDaysInRange
                          .resultLabel
                      }
                    </strong>
                    <br />
                    <div className='mt-1 max-h-32 overflow-y-auto'>
                      {(() => {
                        const today = getToday('gregorian')
                        const weekAgo = addDays(today, -7, 'gregorian')
                        const days = getDaysInRange(
                          { from: weekAgo, to: today },
                          'gregorian'
                        )
                        return (
                          <span className='text-gray-700 dark:text-gray-300 text-xs'>
                            {days.length} days: [
                            {days.map((d) => dayToString(d, '/')).join(', ')}]
                          </span>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-2 p-2 bg-bg-secondary rounded text-xs text-gray-700 dark:text-gray-300'>
                  {content.sections.rangeUtilities.getDaysInRange.noDateMessage}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>
              {content.sections.usageExamples.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.usageExamples.description}
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.usageExamples.dateRangeValidation.title}
              </h3>
              <CodeBlock
                language='typescript'
                code={content.sections.usageExamples.dateRangeValidation.code}
              />
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.usageExamples.calendarConversion.title}
              </h3>
              <CodeBlock
                language='typescript'
                code={content.sections.usageExamples.calendarConversion.code}
              />
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                {content.sections.usageExamples.ageCalculation.title}
              </h3>
              <CodeBlock
                language='typescript'
                code={content.sections.usageExamples.ageCalculation.code}
              />
            </div>
          </div>
        </section>

        {/* Function Reference */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>
              {content.sections.functionReference.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {content.sections.functionReference.description}
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
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isSameMonth</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if dates are in the same month and year
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isSameYear</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date1, date2</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if dates are in the same year
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>isLeapYear</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>year, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>boolean</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Check if a year is a leap year in the specified calendar
                    system
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>getStartOfWeek</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, weekStart, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get start of week (weekStart: 0-6, 0=Sunday)
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>getEndOfWeek</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, weekStart, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get end of week (weekStart: 0-6, 0=Sunday)
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>getDaysInRange</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Range')}, locale?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>{renderTypeWithLinks('Day')}[]</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Get all days in a date range (inclusive)
                  </td>
                </tr>
                <tr className='bg-bg-tertiary'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>dayToString</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>date, divider?</code>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>string</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Convert Day object to string format
                  </td>
                </tr>
                <tr id='parseandvalidatedate'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                    <code>parseAndValidateDate</code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    <div className='space-y-1'>
                      <div>
                        <code>dateString: string</code>
                      </div>
                      <div className='!my-4'>
                        <code>
                          calendarSystem:{' '}
                          {renderTypeWithLinks('CalendarLocale')}
                        </code>
                      </div>
                      <div>
                        <code>dateFormat: string?</code>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    <code>
                      ValidationResult&lt;{renderTypeWithLinks('Day')}&gt;
                    </code>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                    Parse and validate a date string. Without{' '}
                    <code>dateFormat</code>, accepts YYYY/MM/DD format with /,
                    -, or . separators. With <code>dateFormat</code>, parses
                    according to the pattern (separator auto-extracted). Also
                    validates year is within calendar range.
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
