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
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Accessibility</h1>

        <p>
          React Calendar DateTime Picker is built with accessibility in mind,
          following WCAG 2.1 guidelines and providing comprehensive keyboard
          navigation and screen reader support.
        </p>

        <InfoBox>
          <p className='text-sm text-gray-200'>
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
                <SectionHeader>{sectionName}</SectionHeader>
                <CategoryContentDisplay
                  categoryName={sectionName}
                  source='accessibility'
                  examplesContent={{}}
                  internationalizationContent={accessibilityContent}
                />
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
                        <p className='text-sm text-gray-200'>
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
                  <div className='space-y-6 mb-8'>
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
                            {accessibilityContent[
                              sectionName
                            ].ariaAttributesTable.map((row, index) => (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 1 ? 'bg-bg-tertiary' : ''
                                }
                              >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                                  {row.element}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                                  <code>{row.attribute}</code>
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
            <CategoryContentDisplay
              categoryName='Testing Accessibility'
              source='accessibility'
              examplesContent={{}}
              internationalizationContent={accessibilityContent}
            />
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
