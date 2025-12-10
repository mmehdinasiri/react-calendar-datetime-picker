/**
 * Renders the Translation Customization category introduction with detailed table
 */
import React from 'react'
import { TypeDefinition, ExampleRenderer } from '../components'

export const TranslationCustomizationContent: React.FC = () => {
  return (
    <div className='mb-8 space-y-4'>
      <p className='text-gray-600 dark:text-gray-400 text-lg'>
        While the built-in locales provide comprehensive translations for common
        languages, you may need to customize specific translations to match your
        application's requirements. You can override any part of the
        translations by providing a partial{' '}
        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
          translations
        </code>{' '}
        object through the{' '}
        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
          customization
        </code>{' '}
        prop. This allows you to customize specific labels, month names, or
        weekday names while keeping the rest of the locale defaults intact.
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
        interface defines all customizable translation properties. You can
        override any of these properties partially using{' '}
        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
          Partial&lt;CalendarTranslations&gt;
        </code>
        , and the component will merge your customizations with the default
        locale translations.
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
                Weekday names (7 elements, starting from first day of week)
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
                Next month navigation button <strong>title (tooltip)</strong>
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
                Input field from label (for date range display in DtPicker)
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
                Input field to label (for date range display in DtPicker)
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
                Time selector from label (for time input in range selection)
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
                Time selector to label (for time input in range selection)
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
    </div>
  )
}
