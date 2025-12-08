'use client'

import '../../../src/styles/index.scss'
import { examples } from '../examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { TypeDefinition } from '../components'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export default function Internationalization() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const exampleParam = searchParams.get('example')

  useEffect(() => {
    if (categoryParam && exampleParam) {
      // Scroll to the specific example after a brief delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        const elementId = `${toKebabCase(categoryParam)}-${exampleParam}`
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Highlight the element briefly
          element.classList.add('ring-2', 'ring-accent', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-accent', 'ring-opacity-50')
          }, 2000)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [categoryParam, exampleParam])

  // Filter to only show Locale and Translation Customization groups
  const internationalizationGroups = Object.entries(examples).filter(
    ([groupName]) =>
      groupName === 'Locale' || groupName === 'Translation Customization'
  )

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Internationalization</h1>

        <p>
          React Calendar DateTime Picker supports multiple locales and allows
          you to customize translations to match your application's
          requirements. This page covers locale support and translation
          customization options.
        </p>
      </div>

      <div className='space-y-16'>
        {internationalizationGroups.map(([groupName, groupExamples]) => (
          <div key={groupName} id={toKebabCase(groupName)}>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
              {groupName === 'Locale' ? 'Locales' : groupName}
            </h2>
            {groupName === 'Locale' && (
              <div className='mb-8 space-y-4'>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  A locale determines the language and regional settings for the
                  calendar component. When you set the{' '}
                  <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                    locale
                  </code>{' '}
                  prop, the calendar automatically adapts all UI text, including
                  month names, weekday names, button labels, and number
                  formatting to match the selected language. Each locale also
                  configures the text direction (LTR or RTL) and number system
                  (Latin or Persian numerals).
                </p>
                <div className='text-gray-600 dark:text-gray-400'>
                  <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                    Supported Locales:
                  </p>
                  <ul className='list-disc list-inside space-y-1 ml-4'>
                    <li>
                      <strong>English (en)</strong> - Default locale with Latin
                      numbers, LTR direction, and English month/weekday names
                    </li>
                    <li>
                      <strong>Persian (fa)</strong> - Persian/Farsi locale with
                      Persian numerals, RTL direction, and Persian month/weekday
                      names. Uses Jalali calendar system.
                    </li>
                    <li>
                      <strong>German (de)</strong> - German locale with Latin
                      numbers, LTR direction, and German month/weekday names
                    </li>
                    <li>
                      <strong>Spanish (es)</strong> - Spanish locale with Latin
                      numbers, LTR direction, and Spanish month/weekday names
                    </li>
                    <li>
                      <strong>French (fr)</strong> - French locale with Latin
                      numbers, LTR direction, and French month/weekday names
                    </li>
                  </ul>
                </div>
                <div className='mt-6'>
                  <TypeDefinition
                    definition={`type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'`}
                  />
                </div>
              </div>
            )}
            {groupName === 'Translation Customization' && (
              <div className='mb-8 space-y-4'>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  While the built-in locales provide comprehensive translations
                  for common languages, you may need to customize specific
                  translations to match your application's requirements. You can
                  override any part of the translations by providing a partial{' '}
                  <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                    translations
                  </code>{' '}
                  object through the{' '}
                  <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                    customization
                  </code>{' '}
                  prop. This allows you to customize specific labels, month
                  names, or weekday names while keeping the rest of the locale
                  defaults intact.
                </p>
                <div className='mt-6'>
                  <TypeDefinition
                    definition={`interface CalendarTranslations {
  months: string[]
  weekdays: string[]
  direction: 'ltr' | 'rtl'
  numbers: 'latin' | 'persian'
  labels: {
    today: string
    clear: string
    ok: string
    nextMonth: string
    previousMonth: string
    selectMonth: string
    selectYear: string
    from: string
    to: string
    timeFrom?: string
    timeTo?: string
    am?: string
    pm?: string
  }
  presetRanges: {
    yesterday: string
    last7days: string
    last30days: string
    thisMonth: string
    lastMonth: string
  }
}

// Usage in customization prop:
customization?: {
  translations?: Partial<CalendarTranslations>
}`}
                    className='mb-4'
                  />
                </div>
                <p className='text-gray-600 dark:text-gray-400 text-lg'>
                  The{' '}
                  <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                    CalendarTranslations
                  </code>{' '}
                  interface defines all customizable translation properties. You
                  can override any of these properties partially using{' '}
                  <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
                    Partial&lt;CalendarTranslations&gt;
                  </code>
                  , and the component will merge your customizations with the
                  default locale translations.
                </p>
                <div className='overflow-x-auto'>
                  <table className='min-w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4'>
                    <thead>
                      <tr className='bg-gray-100 dark:bg-gray-800'>
                        <th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100'>
                          Property
                        </th>
                        <th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100'>
                          Type
                        </th>
                        <th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100'>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 dark:text-gray-400'>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          months
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string[]
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Month names (12 elements, index 0-11 for months 1-12)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          weekdays
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string[]
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Weekday names (7 elements, starting from first day of
                          week)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          direction
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          'ltr' | 'rtl'
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Text direction (Left-to-Right or Right-to-Left)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          numbers
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          'latin' | 'persian'
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Number system (Latin or Persian numerals)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.today
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Today button text
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.clear
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Clear button text{' '}
                          <strong>aria-label (accessibility only)</strong> -{' '}
                          <em>DtPicker only</em>
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.ok
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          OK/Confirm button text
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.nextMonth
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Next month navigation button{' '}
                          <strong>title (tooltip)</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.previousMonth
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Previous month navigation button{' '}
                          <strong>title (tooltip)</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.selectMonth
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Month selection view{' '}
                          <strong>aria-label (accessibility only)</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.selectYear
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Year selection view{' '}
                          <strong>aria-label (accessibility only)</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.from
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Input field from label (for date range display in
                          DtPicker)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.to
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Input field to label (for date range display in
                          DtPicker)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.timeFrom
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Time selector from label (for time input in range
                          selection)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.timeTo
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Time selector to label (for time input in range
                          selection)
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.am
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          AM indicator
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          labels.pm
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          PM indicator
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          presetRanges.yesterday
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Yesterday preset range label
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          presetRanges.last7days
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Last 7 days preset range label
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          presetRanges.last30days
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Last 30 days preset range label
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          presetRanges.thisMonth
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          This month preset range label
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-sm'>
                          presetRanges.lastMonth
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          string
                        </td>
                        <td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
                          Last month preset range label
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {groupName === 'Translation Customization' && (
              <section
                id='preset-ranges'
                className='bg-bg-secondary rounded-lg border border-border p-8 mt-8'
              >
                <ExampleRenderer
                  config={{
                    title: 'Custom Preset Labels',
                    description:
                      'Preset ranges with custom labels for localization or branding',
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
                      customization: {
                        translations: {
                          presetRanges: {
                            yesterday: 'Yesterday',
                            last7days: 'Past Week',
                            last30days: 'Past Month',
                            thisMonth: 'Current Month',
                            lastMonth: 'Previous Month'
                          }
                        }
                      },
                      showWeekend: true,
                      todayBtn: true
                    },
                    wrapper: 'calendar-container',
                    customCode: `import { DtCalendar } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [range, setRange] = useState(null)

  return (
    <DtCalendar
      type="range"
      presetRanges={{
        yesterday: true,
        last7days: true,
        last30days: true,
        thisMonth: true,
        lastMonth: true
      }}
      customization={{
        translations: {
          presetRanges: {
            yesterday: 'Yesterday',
            last7days: 'Past Week',
            last30days: 'Past Month',
            thisMonth: 'Current Month',
            lastMonth: 'Previous Month'
          }
        }
      }}
      showWeekend={true}
      todayBtn={true}
      onChange={setRange}
    />
  )
}`
                  }}
                  exampleKey='CustomPresetLabels'
                />
              </section>
            )}
            <div className='space-y-8'>
              {Object.entries(groupExamples).map(([exampleKey, config]) => (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                  category={groupName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
