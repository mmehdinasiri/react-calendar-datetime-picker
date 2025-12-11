'use client'

import { useState } from 'react'
import { DtPicker } from '../../../src/components/DtPicker'
import type { InitValueInput } from '../../../src/types'
import '../../../src/styles/index.scss'
import { accessibilityExamples } from './accessibilityConfig'
import { accessibilityContent } from './accessibilityContent'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { CategoryContentDisplay } from '../components/CategoryContentDisplay'
import {
  CodeBlock,
  InfoBox,
  SectionHeader,
  KeyboardShortcutsCard
} from '../components'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export default function Accessibility() {
  const [accessibleDate, setAccessibleDate] = useState<
    InitValueInput | undefined
  >(undefined)

  return (
    <div className='max-w-6xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Accessibility</h1>

        <p>
          React Calendar DateTime Picker is built with accessibility in mind,
          following WCAG 2.1 guidelines and providing comprehensive keyboard
          navigation and screen reader support.
        </p>

        <InfoBox>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>✓ WCAG 2.1 AA Compliant</strong> - Full keyboard navigation,
            ARIA labels, focus management, and screen reader support.
          </p>
        </InfoBox>
      </div>

      <div className='space-y-16'>
        {Object.entries(accessibilityExamples).map(
          ([sectionName, examples]) => (
            <section
              key={sectionName}
              id={toKebabCase(sectionName)}
              className='bg-bg-secondary rounded-lg border border-border p-8'
            >
              <div className='mb-6'>
                <SectionHeader id={toKebabCase(sectionName)}>
                  {sectionName}
                </SectionHeader>
                {/* Skip CategoryContentDisplay for ARIA Support section - we render it custom below */}
                {sectionName !== 'ARIA Support and Screen Readers' && (
                  <CategoryContentDisplay
                    categoryName={sectionName}
                    source='accessibility'
                    examplesContent={{}}
                    internationalizationContent={accessibilityContent}
                  />
                )}
                {/* Show only intro for ARIA Support section */}
                {sectionName === 'ARIA Support and Screen Readers' &&
                  accessibilityContent[sectionName]?.intro && (
                    <p className='text-gray-600 dark:text-gray-400 text-lg mb-6'>
                      {accessibilityContent[sectionName].intro}
                    </p>
                  )}
              </div>

              {/* Keyboard Navigation section has special layout */}
              {sectionName === 'Keyboard Navigation' &&
                accessibilityContent[sectionName]?.keyboardShortcuts && (
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                        Try Keyboard Navigation
                      </h3>
                      <div className='picker-container'>
                        <DtPicker
                          initValue={accessibleDate}
                          onChange={(date) =>
                            setAccessibleDate(
                              date as InitValueInput | undefined
                            )
                          }
                          placeholder='Tab here and press Enter to open'
                          showWeekend={true}
                          todayBtn={true}
                          clearBtn={true}
                        />
                      </div>
                      <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                        <p className='text-sm text-gray-700 dark:text-gray-200'>
                          <strong>How to test:</strong> Tab to the input field,
                          press Enter to open the calendar, then use arrow keys
                          to navigate dates.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                        Keyboard Shortcuts
                      </h3>
                      <div className='space-y-4'>
                        <KeyboardShortcutsCard
                          title='Date Picker Input'
                          shortcuts={
                            accessibilityContent[sectionName].keyboardShortcuts
                              .datePickerInput
                          }
                        />
                        <KeyboardShortcutsCard
                          title='Calendar Navigation'
                          shortcuts={
                            accessibilityContent[sectionName].keyboardShortcuts
                              .calendarNavigation
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

              {/* ARIA Support section has additional table content */}
              {sectionName === 'ARIA Support and Screen Readers' &&
                accessibilityContent[sectionName]?.ariaAttributesTable && (
                  <div className='space-y-8 mb-8'>
                    {/* ARIA Attributes and Screen Reader Announcements Cards */}
                    {accessibilityContent[sectionName]?.details && (
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {accessibilityContent[sectionName].details.map(
                          (detail, index) => {
                            // Parse bullet points from content
                            const lines = detail.content
                              .split('\n')
                              .filter((line) => line.trim().startsWith('•'))
                            const items = lines.map((line) =>
                              line.replace(/^•\s*/, '').trim()
                            )

                            return (
                              <div
                                key={index}
                                className='bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl border border-blue-200/50 dark:border-blue-800/50 p-6 shadow-sm'
                              >
                                <div className='flex items-center gap-3 mb-4'>
                                  <div className='w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                                    <svg
                                      className='w-6 h-6 text-blue-600 dark:text-blue-400'
                                      fill='none'
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                                      />
                                    </svg>
                                  </div>
                                  <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                                    {detail.title}
                                  </h3>
                                </div>
                                <ul className='space-y-2.5'>
                                  {items.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className='flex items-start gap-2.5 text-blue-800 dark:text-blue-200 text-sm'
                                    >
                                      <span className='mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400' />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }
                        )}
                      </div>
                    )}

                    {/* ARIA Attributes Table */}
                    <div className='bg-bg-secondary rounded-xl border border-border p-6 shadow-sm'>
                      <div className='flex items-center gap-3 mb-6'>
                        <div className='w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-purple-600 dark:text-purple-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                            />
                          </svg>
                        </div>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                          ARIA Attributes Reference
                        </h3>
                      </div>
                      <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-border'>
                          <thead>
                            <tr className='bg-bg-tertiary'>
                              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                                Element
                              </th>
                              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                                ARIA Attribute
                              </th>
                              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-bg-secondary divide-y divide-border'>
                            {accessibilityContent[
                              sectionName
                            ].ariaAttributesTable.map((row, index) => (
                              <tr
                                key={index}
                                className='hover:bg-bg-tertiary/50 transition-colors'
                              >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                                  {row.element}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                  <code className='px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-mono'>
                                    {row.attribute}
                                  </code>
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                                  {row.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

              <div className='space-y-8'>
                {Object.entries(examples).map(([exampleKey, config]) => (
                  <ExampleRenderer
                    key={exampleKey}
                    config={config}
                    exampleKey={exampleKey}
                    category={sectionName}
                  />
                ))}
              </div>
            </section>
          )
        )}

        {/* Focus Management */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>Focus Management</SectionHeader>
            <CategoryContentDisplay
              categoryName='Focus Management'
              source='accessibility'
              examplesContent={{}}
              internationalizationContent={accessibilityContent}
            />
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
              <CodeBlock
                language='tsx'
                code={`// Focus trap is automatically enabled
<DtPicker
  showWeekend={true}
  todayBtn={true}
  clearBtn={true}
/>`}
              />
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
            <SectionHeader>RTL (Right-to-Left) Support</SectionHeader>
            <CategoryContentDisplay
              categoryName='RTL (Right-to-Left) Support'
              source='accessibility'
              examplesContent={{}}
              internationalizationContent={accessibilityContent}
            />
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Persian Calendar (RTL)
              </h3>
              <CodeBlock
                language='tsx'
                code={`<DtPicker
  calendarSystem="jalali"
  placeholder="تاریخ را انتخاب کنید"
/>`}
              />
              <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                <p className='text-sm text-gray-700 dark:text-gray-200'>
                  <strong>RTL Navigation:</strong> In RTL mode, arrow keys are
                  reversed - right arrow moves backward in time, left arrow
                  moves forward. This matches user expectations in right-to-left
                  languages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* High Contrast Support */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>High Contrast Mode</SectionHeader>
            <CategoryContentDisplay
              categoryName='High Contrast Mode'
              source='accessibility'
              examplesContent={{}}
              internationalizationContent={accessibilityContent}
            />
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
              <CodeBlock
                language='css'
                code={`/* High contrast theme */
.calendar-high-contrast {
  --calendar-bg: white;
  --calendar-text: black;
  --calendar-border: black;
  --calendar-selected: black;
  --calendar-selected-text: white;
}`}
              />
            </div>
          </div>
        </section>

        {/* Testing */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader>Testing Accessibility</SectionHeader>
            {/* Show only intro for Testing Accessibility section */}
            {accessibilityContent['Testing Accessibility']?.intro && (
              <p className='text-gray-600 dark:text-gray-400 text-lg mb-6'>
                {accessibilityContent['Testing Accessibility'].intro}
              </p>
            )}
          </div>

          <div className='space-y-8'>
            {/* Recommended Testing Tools */}
            <div className='bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-200/50 dark:border-green-800/50 p-6 shadow-sm'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-green-600 dark:text-green-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Recommended Testing Tools
                </h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-white/50 dark:bg-gray-800/30 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30'>
                  <div className='flex items-center gap-2 mb-3'>
                    <svg
                      className='w-5 h-5 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                      />
                    </svg>
                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                      Automated Tools
                    </h4>
                  </div>
                  <ul className='space-y-2.5'>
                    {[
                      'axe-core (Chrome extension)',
                      'WAVE (Web Accessibility Evaluation Tool)',
                      'Lighthouse (Chrome DevTools)',
                      'axe DevTools'
                    ].map((tool, index) => (
                      <li
                        key={index}
                        className='flex items-start gap-2.5 text-green-800 dark:text-green-200 text-sm'
                      >
                        <span className='mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400' />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='bg-white/50 dark:bg-gray-800/30 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30'>
                  <div className='flex items-center gap-2 mb-3'>
                    <svg
                      className='w-5 h-5 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                      />
                    </svg>
                    <h4 className='font-semibold text-gray-900 dark:text-white'>
                      Manual Testing
                    </h4>
                  </div>
                  <ul className='space-y-2.5'>
                    {[
                      'Keyboard-only navigation',
                      'Screen reader testing (NVDA, JAWS, VoiceOver)',
                      'High contrast mode',
                      'Zoomed viewing (200%+)'
                    ].map((method, index) => (
                      <li
                        key={index}
                        className='flex items-start gap-2.5 text-green-800 dark:text-green-200 text-sm'
                      >
                        <span className='mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400' />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Keyboard Testing Checklist */}
            <div className='bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200/50 dark:border-amber-800/50 p-6 shadow-sm'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-amber-600 dark:text-amber-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Keyboard Testing Checklist
                </h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[
                  'Tab order follows logical sequence',
                  'All interactive elements are keyboard accessible',
                  'Focus indicators are visible',
                  'Escape key closes modals',
                  'Enter/Space activate buttons',
                  'Arrow keys navigate dates appropriately'
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 bg-white/50 dark:bg-gray-800/30 rounded-lg p-3 border border-amber-200/30 dark:border-amber-800/30'
                  >
                    <svg
                      className='w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-amber-800 dark:text-amber-200 text-sm'>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
