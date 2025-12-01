'use client'

import { useState } from 'react'
import { DtPicker } from '../../../src/components/DtPicker'
import { DtCalendar } from '../../../src/components/DtCalendar'
import type { InitValueInput } from '../../../src/types'
import '../../../src/styles/index.scss'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Accessibility() {
  const [accessibleDate, setAccessibleDate] = useState<
    InitValueInput | undefined
  >(undefined)

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Accessibility</h1>

        <p>
          React Calendar DateTime Picker is built with accessibility in mind,
          following WCAG 2.1 guidelines and providing comprehensive keyboard
          navigation and screen reader support.
        </p>

        <div className='bg-bg-tertiary border-l-4 border-accent p-4 my-6'>
          <div className='flex'>
            <div className='ml-3'>
              <p className='text-sm text-gray-200'>
                <strong>✓ WCAG 2.1 AA Compliant</strong> - Full keyboard
                navigation, ARIA labels, focus management, and screen reader
                support.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-12'>
        {/* Keyboard Navigation */}
        <section
          id='keyboard'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Keyboard Navigation
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Full keyboard support allows users to navigate and interact with
              the calendar without using a mouse.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Try Keyboard Navigation
              </h3>
              <div className='picker-container'>
                <DtPicker
                  initValue={accessibleDate}
                  onChange={(date) =>
                    setAccessibleDate(date as InitValueInput | undefined)
                  }
                  placeholder='Tab here and press Enter to open'
                  showWeekend={true}
                  todayBtn={true}
                  clearBtn={true}
                />
              </div>
              <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                <p className='text-sm text-gray-200'>
                  <strong>How to test:</strong> Tab to the input field, press
                  Enter to open the calendar, then use arrow keys to navigate
                  dates.
                </p>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Keyboard Shortcuts
              </h3>
              <div className='space-y-4'>
                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Date Picker Input
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Tab
                      </kbd>{' '}
                      - Focus input field
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Enter
                      </kbd>{' '}
                      or{' '}
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Space
                      </kbd>{' '}
                      - Open calendar
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Escape
                      </kbd>{' '}
                      - Close calendar
                    </li>
                  </ul>
                </div>

                <div className='border border-border rounded-lg p-4 bg-bg-tertiary'>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Calendar Navigation
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Arrow Keys
                      </kbd>{' '}
                      - Navigate between dates
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Enter
                      </kbd>{' '}
                      or{' '}
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Space
                      </kbd>{' '}
                      - Select date
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        T
                      </kbd>{' '}
                      - Jump to today
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Page Up/Down
                      </kbd>{' '}
                      - Navigate months
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Home/End
                      </kbd>{' '}
                      - First/last day of month
                    </li>
                    <li>
                      <kbd className='px-2 py-1 bg-bg-primary border border-border rounded text-xs text-gray-200'>
                        Escape
                      </kbd>{' '}
                      - Close calendar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Navigation Examples */}
          <div className='mt-8 space-y-6'>
            <ExampleRenderer
              config={{
                title: 'Keyboard Navigation - Basic',
                description:
                  'Use arrow keys to navigate dates, Enter/Space to select, Escape to close modal',
                component: 'DtCalendar',
                props: {
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='KeyboardNavigationBasic'
            />
            <ExampleRenderer
              config={{
                title: 'Keyboard Navigation - Date Picker',
                description:
                  'Tab to focus input, Enter to open, arrow keys to navigate, Enter/Space to select',
                component: 'DtPicker',
                props: {
                  placeholder: 'Try keyboard navigation',
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'picker-container'
              }}
              exampleKey='KeyboardNavigationPicker'
            />
            <ExampleRenderer
              config={{
                title: 'Keyboard Shortcuts - Today (T key)',
                description:
                  'Press "T" key when calendar is focused to jump to today\'s date',
                component: 'DtCalendar',
                props: {
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='KeyboardShortcutsToday'
            />
            <ExampleRenderer
              config={{
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
              }}
              exampleKey='FocusTrapPicker'
            />
          </div>
        </section>

        {/* ARIA Support */}
        <section
          id='aria'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              ARIA Labels and Roles
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Comprehensive ARIA attributes ensure screen readers can properly
              announce the calendar state and available actions.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                ARIA Attributes
              </h3>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
                  <thead className='bg-bg-tertiary'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                        Element
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                        ARIA Attribute
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-bg-secondary divide-y divide-border'>
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Input field
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-haspopup</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Indicates the input opens a popup
                      </td>
                    </tr>
                    <tr className='bg-bg-tertiary'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Input field
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-expanded</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Indicates if calendar is open
                      </td>
                    </tr>
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Calendar modal
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>role="dialog"</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Identifies the calendar as a dialog
                      </td>
                    </tr>
                    <tr className='bg-bg-tertiary'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Calendar modal
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-modal</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Indicates modal behavior
                      </td>
                    </tr>
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Calendar modal
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-label</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Descriptive label for the calendar
                      </td>
                    </tr>
                    <tr className='bg-bg-tertiary'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Navigation buttons
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-label</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Descriptive labels for prev/next buttons
                      </td>
                    </tr>
                    <tr>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Date cells
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-selected</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Indicates selected state
                      </td>
                    </tr>
                    <tr className='bg-bg-tertiary'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                        Disabled dates
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                        <code>aria-disabled</code>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                        Indicates disabled state
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ARIA Example */}
            <div className='mt-8'>
              <ExampleRenderer
                config={{
                  title: 'ARIA Labels and Roles',
                  description:
                    'Calendar includes comprehensive ARIA labels, roles, and states for screen reader compatibility',
                  component: 'DtCalendar',
                  props: {
                    showWeekend: true,
                    todayBtn: true
                  },
                  wrapper: 'calendar-container'
                }}
                exampleKey='AriaLabelsExample'
              />
            </div>
          </div>
        </section>

        {/* Focus Management */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Focus Management
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Proper focus management ensures keyboard users can navigate
              naturally through the interface.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Focus Trap
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                When the calendar modal is open, focus is trapped within the
                calendar. Users can tab through interactive elements and use
                Escape to close.
              </p>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='tsx'
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`// Focus trap is automatically enabled
<DtPicker
  showWeekend={true}
  todayBtn={true}
  clearBtn={true}
/>`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Focus Restoration
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                When the calendar closes, focus returns to the trigger element
                (input field).
              </p>
            </div>
          </div>
        </section>

        {/* RTL Support */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              RTL (Right-to-Left) Support
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Full RTL support for Persian and other right-to-left languages,
              including proper keyboard navigation.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Persian Calendar (RTL)
              </h3>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='tsx'
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`<DtPicker
  local="fa"
  placeholder="تاریخ را انتخاب کنید"
/>`}
                </SyntaxHighlighter>
              </div>
              <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                <p className='text-sm text-gray-200'>
                  <strong>RTL Navigation:</strong> In RTL mode, arrow keys are
                  reversed - right arrow moves backward in time, left arrow
                  moves forward. This matches user expectations in right-to-left
                  languages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screen Reader Announcements */}
        <section
          id='screen-readers'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Screen Reader Support
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Screen readers receive comprehensive information about the
              calendar state, selected dates, and available actions.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Announcements
              </h3>
              <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
                <li>Calendar opening/closing state</li>
                <li>Currently focused date</li>
                <li>Selected date changes</li>
                <li>Navigation between months/years</li>
                <li>Disabled date information</li>
                <li>Available keyboard shortcuts</li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Live Regions
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                Dynamic content changes are announced using ARIA live regions,
                ensuring screen reader users are informed of updates.
              </p>
            </div>
          </div>

          {/* Screen Reader Example */}
          <div className='mt-8'>
            <ExampleRenderer
              config={{
                title: 'ARIA Labels for Screen Readers',
                description:
                  'Calendar includes comprehensive ARIA labels, roles, and states for screen reader compatibility',
                component: 'DtCalendar',
                props: {
                  showWeekend: true,
                  todayBtn: true
                },
                wrapper: 'calendar-container'
              }}
              exampleKey='AriaLabelsScreenReader'
            />
          </div>
        </section>

        {/* High Contrast Support */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              High Contrast Mode
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              The calendar respects system high contrast settings and works well
              with high contrast themes.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                CSS Variables for Customization
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                Use CSS variables to ensure proper contrast ratios in different
                themes:
              </p>
              <div className='rounded-lg overflow-hidden border border-border'>
                <SyntaxHighlighter
                  language='css'
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}
                >
                  {`/* High contrast theme */
.calendar-high-contrast {
  --calendar-bg: white;
  --calendar-text: black;
  --calendar-border: black;
  --calendar-selected: black;
  --calendar-selected-text: white;
}`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              Testing Accessibility
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Tools and methods for testing the calendar's accessibility
              features.
            </p>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Recommended Testing Tools
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Automated Tools
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>• axe-core (Chrome extension)</li>
                    <li>• WAVE (Web Accessibility Evaluation Tool)</li>
                    <li>• Lighthouse (Chrome DevTools)</li>
                    <li>• axe DevTools</li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Manual Testing
                  </h4>
                  <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                    <li>• Keyboard-only navigation</li>
                    <li>• Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                    <li>• High contrast mode</li>
                    <li>• Zoomed viewing (200%+)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Keyboard Testing Checklist
              </h3>
              <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
                <li>Tab order follows logical sequence</li>
                <li>All interactive elements are keyboard accessible</li>
                <li>Focus indicators are visible</li>
                <li>Escape key closes modals</li>
                <li>Enter/Space activate buttons</li>
                <li>Arrow keys navigate dates appropriately</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
