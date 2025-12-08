'use client'

import { useState } from 'react'
import { DtCalendar, DtPicker } from '../../../src/components'
import type { Day } from 'react-calendar-datetime-picker'
import '../../../src/styles/index.scss'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { CodeBlock, InfoBox, SectionHeader, FeatureList } from '../components'
import { CategoryContentDisplay } from '../components/CategoryContentDisplay'
import { useTheme } from '../contexts/ThemeContext'
import { CSSVariablesTables } from './CSSVariablesTables'
import { customizationExamples } from './customizationConfig'
import { customizationContent } from './customizationContent'
import { CustomExampleRenderer } from './CustomExampleRenderer'
import type { CustomizationExampleConfig } from './customizationConfig'

export default function Customization() {
  const { theme } = useTheme()
  const [customDate, setCustomDate] = useState<any>(null)
  const [darkDate, setDarkDate] = useState<Day | null>(null)
  const [styledInputDate, setStyledInputDate] = useState<Day | null>(null)
  const [smallCalendarDate, setSmallCalendarDate] = useState<Day | null>(null)
  const [largeCalendarDate, setLargeCalendarDate] = useState<Day | null>(null)

  // Helper to render text with inline code snippets
  const renderLineWithCode = (text: string) => {
    return text.split('`').map((part, i) =>
      i % 2 === 1 ? (
        <code
          key={i}
          className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'
        >
          {part}
        </code>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  // Helper to check if an example needs custom rendering
  const isCustomExample = (config: CustomizationExampleConfig) => {
    return (
      config.customComponent !== undefined ||
      config.codeOnly === true ||
      config.cssCode !== undefined
    )
  }

  // Helper to get result value for CSS examples
  const getResultValue = (exampleKey: string) => {
    switch (exampleKey) {
      case 'CustomStyledInput':
        return styledInputDate
      case 'BlueExample':
        return customDate
      case 'BrownExample':
        return darkDate
      case 'SmallerCalendarExample':
        return smallCalendarDate
      case 'LargerCalendarExample':
        return largeCalendarDate
      default:
        return null
    }
  }

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Customization</h1>

        <p>
          React Calendar DateTime Picker offers extensive customization options
          to match your application's design. You can customize themes, colors,
          icons, labels, and more.
        </p>
      </div>

      <div className='space-y-12'>
        {/* Custom Trigger Elements */}
        <section
          id='custom-trigger-elements'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom Trigger Elements</SectionHeader>
            <CategoryContentDisplay
              categoryName='Custom Trigger Elements'
              source='examples'
              examplesContent={customizationContent}
              internationalizationContent={{}}
            />
          </div>

          {/* Custom Trigger Examples */}
          <div className='space-y-6'>
            {Object.entries(
              customizationExamples['Custom Trigger Elements'] || {}
            ).map(([exampleKey, config]) => {
              if (isCustomExample(config)) {
                if (config.codeOnly) {
                  // Code-only examples go in Usage Examples section
                  return null
                }
                return (
                  <CustomExampleRenderer
                    key={exampleKey}
                    config={config}
                    exampleKey={exampleKey}
                    category='Custom Trigger Elements'
                    resultValue={
                      exampleKey === 'CustomStyledInput'
                        ? styledInputDate
                        : null
                    }
                    onResultValueChange={
                      exampleKey === 'CustomStyledInput'
                        ? setStyledInputDate
                        : undefined
                    }
                  />
                )
              }
              return (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                  category='Custom Trigger Elements'
                />
              )
            })}
          </div>

          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Usage Examples
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {Object.entries(
                customizationExamples['Custom Trigger Elements'] || {}
              )
                .filter(([_, config]) => config.codeOnly === true)
                .map(([exampleKey, config]) => (
                  <CustomExampleRenderer
                    key={exampleKey}
                    config={config}
                    exampleKey={exampleKey}
                    category='Custom Trigger Elements'
                  />
                ))}
            </div>
          </div>

          <div className='mt-6'>
            <FeatureList
              title='Key Benefits'
              items={[
                '• <strong>Flexible Design:</strong> Use any HTML element as a trigger',
                '• <strong>Backward Compatible:</strong> Default input behavior unchanged',
                '• <strong>Accessible:</strong> Proper ARIA attributes and keyboard navigation',
                '• <strong>Framework Integration:</strong> Works with React Hook Form, Formik, etc.'
              ]}
              variant='info'
            />
          </div>
        </section>

        {/* Themes */}
        <section
          id='themes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Themes</SectionHeader>
            <CategoryContentDisplay
              categoryName='Themes'
              source='examples'
              examplesContent={customizationContent}
              internationalizationContent={{}}
            />
          </div>

          {/* Theme Examples */}
          <div className='space-y-6'>
            {Object.entries(customizationExamples['Themes'] || {}).map(
              ([exampleKey, config]) => (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                  category='Themes'
                />
              )
            )}
          </div>
        </section>

        {/* CSS Variables */}
        <section
          id='css-variables'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>CSS Variables (Recommended)</SectionHeader>
            <CategoryContentDisplay
              categoryName='CSS Variables'
              source='examples'
              examplesContent={customizationContent}
              internationalizationContent={{}}
            />
          </div>

          <div className='space-y-6'>
            <CSSVariablesTables />

            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Using calenderModalClass Prop
              </h3>
              <InfoBox variant='tip'>
                <p className='text-sm text-gray-200'>
                  <strong>Tip:</strong> This approach applies the class directly
                  to the calendar component, making it cleaner and more direct.
                </p>
              </InfoBox>
            </div>
          </div>

          {/* CSS Variables Examples */}
          <div className='mt-8 space-y-6'>
            {Object.entries(customizationExamples['CSS Variables'] || {}).map(
              ([exampleKey, config]) => {
                const resultValue = getResultValue(exampleKey)
                const handleChange = (value: any) => {
                  switch (exampleKey) {
                    case 'BlueExample':
                      setCustomDate(value)
                      break
                    case 'BrownExample':
                      setDarkDate(value)
                      break
                    case 'SmallerCalendarExample':
                      setSmallCalendarDate(value)
                      break
                    case 'LargerCalendarExample':
                      setLargeCalendarDate(value)
                      break
                  }
                }

                // Render component based on config
                const Component =
                  config.component === 'DtPicker' ? DtPicker : DtCalendar

                // Extract props, ensuring boolean props are passed correctly
                const booleanPropNames = [
                  'todayBtn',
                  'showWeekend',
                  'withTime',
                  'dark',
                  'clearBtn',
                  'showTimeInput',
                  'enlargeSelectedDay'
                ]

                const componentProps: Record<string, any> = {}

                // Copy all props except boolean ones
                Object.keys(config.props || {}).forEach((key) => {
                  if (!booleanPropNames.includes(key)) {
                    componentProps[key] = config.props![key]
                  }
                })

                // Explicitly pass boolean props if they exist
                booleanPropNames.forEach((propName) => {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      config.props || {},
                      propName
                    )
                  ) {
                    componentProps[propName] = config.props![propName]
                  }
                })

                // Ensure type prop is set (defaults to 'single' if not specified)
                if (!componentProps.type) {
                  componentProps.type = 'single'
                }

                // Automatically apply theme from context unless explicitly set
                if (
                  !Object.prototype.hasOwnProperty.call(
                    config.props || {},
                    'dark'
                  )
                ) {
                  componentProps.dark = theme === 'dark'
                }

                componentProps.onChange = handleChange

                return (
                  <section
                    key={exampleKey}
                    id={`css-variables-${exampleKey.toLowerCase()}`}
                    className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
                  >
                    <div className='mb-6'>
                      <SectionHeader>{config.title}</SectionHeader>
                      {config.description && (
                        <p className='text-gray-700 dark:text-gray-300'>
                          {config.description}
                        </p>
                      )}
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                          Component
                        </h3>
                        <div className={config.wrapper || 'calendar-container'}>
                          {/* TypeScript needs a known prop shape to avoid type errors; cast as any */}
                          <Component {...(componentProps as any)} />
                        </div>
                      </div>

                      <div>
                        {config.cssCode && (
                          <>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                              CSS Styles
                            </h3>
                            <CodeBlock
                              language='css'
                              code={config.cssCode}
                              className='mb-4'
                            />
                          </>
                        )}
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                          Code
                        </h3>
                        <CodeBlock
                          language='tsx'
                          code={config.customCode || ''}
                          className='mb-4'
                        />
                        {resultValue !== null && resultValue !== undefined && (
                          <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                            <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                              Result
                            </h4>
                            <p className='text-sm text-gray-700 dark:text-gray-200'>
                              Selected value:{' '}
                              <code className='text-xs'>
                                {JSON.stringify(resultValue, null, 2)}
                              </code>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )
              }
            )}
          </div>
        </section>

        {/* Custom Classes */}
        <section
          id='custom-classes'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom CSS Classes</SectionHeader>
            <CategoryContentDisplay
              categoryName='Custom CSS Classes'
              source='examples'
              examplesContent={customizationContent}
              internationalizationContent={{}}
            />
          </div>

          {customizationContent['Custom CSS Classes']?.codeExample && (
            <div className='space-y-6'>
              <CodeBlock
                language='tsx'
                code={customizationContent['Custom CSS Classes'].codeExample}
              />

              {customizationContent['Custom CSS Classes']?.cssClasses && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                    Available CSS Classes
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                        Calendar Structure
                      </h4>
                      <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                        {customizationContent[
                          'Custom CSS Classes'
                        ].cssClasses.calendarStructure.map((item, idx) => (
                          <li key={idx}>
                            <code>{item.class}</code> - {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                        Interactive Elements
                      </h4>
                      <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                        {customizationContent[
                          'Custom CSS Classes'
                        ].cssClasses.interactiveElements.map((item, idx) => (
                          <li key={idx}>
                            <code>{item.class}</code> - {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Icons and Labels */}
        <section
          id='icons-labels'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Custom Icons</SectionHeader>
            <CategoryContentDisplay
              categoryName='Custom Icons'
              source='examples'
              examplesContent={customizationContent}
              internationalizationContent={{}}
            />
          </div>

          {/* Icons and Labels Examples */}
          <div className='mt-8 space-y-6'>
            {Object.entries(customizationExamples['Custom Icons'] || {}).map(
              ([exampleKey, config]) => (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                  category='Custom Icons'
                />
              )
            )}
          </div>
        </section>

        {/* Internationalization */}
        <section
          id='internationalization'
          className='bg-bg-secondary rounded-lg border border-border p-8'
        >
          <div className='mb-6'>
            <SectionHeader>Internationalization (i18n)</SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              Full internationalization support with locale-based translations,
              RTL support, and customizable text.
            </p>
          </div>

          <div className='space-y-8'>
            {/* Supported Locales */}
            {customizationContent.Internationalization?.supportedLocales && (
              <div id='locale-support'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                  Supported Locales
                </h3>
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  {
                    customizationContent.Internationalization.supportedLocales
                      .description
                  }
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                  {customizationContent.Internationalization.supportedLocales.locales.map(
                    (locale, idx) => (
                      <div key={idx} className='bg-bg-tertiary rounded-lg p-4'>
                        <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                          {locale.name}
                        </h4>
                        <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                          {locale.features.map((feature, featureIdx) => (
                            <li key={featureIdx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

                {customizationContent.Internationalization.supportedLocales
                  .codeExample && (
                  <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6'>
                    <CodeBlock
                      language='typescript'
                      code={
                        customizationContent.Internationalization
                          .supportedLocales.codeExample
                      }
                      className='bg-transparent border-0'
                    />
                  </div>
                )}
              </div>
            )}

            {/* Custom Translations */}
            {customizationContent.Internationalization?.customTranslations && (
              <div id='custom-translations'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                  Custom Translations
                </h3>
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  {
                    customizationContent.Internationalization.customTranslations
                      .description
                  }
                </p>

                {Object.entries(
                  customizationExamples['Internationalization'] || {}
                )
                  .filter(([key]) => key === 'CustomTranslations')
                  .map(([exampleKey, config]) => (
                    <ExampleRenderer
                      key={exampleKey}
                      config={config}
                      exampleKey={exampleKey}
                      category='Internationalization'
                    />
                  ))}

                {customizationContent.Internationalization.customTranslations
                  .interfaceCode && (
                  <div className='mt-6'>
                    <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                      CalendarTranslations Interface
                    </h4>
                    <div className='bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden'>
                      <CodeBlock
                        language='typescript'
                        code={
                          customizationContent.Internationalization
                            .customTranslations.interfaceCode
                        }
                        className='bg-transparent border-0'
                      />
                    </div>
                  </div>
                )}

                {customizationContent.Internationalization.customTranslations
                  .exampleCode && (
                  <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6'>
                    <CodeBlock
                      language='typescript'
                      code={
                        customizationContent.Internationalization
                          .customTranslations.exampleCode
                      }
                      className='bg-transparent border-0'
                    />
                  </div>
                )}
              </div>
            )}

            {/* RTL Support */}
            {customizationContent.Internationalization?.rtlSupport && (
              <div id='rtl-support'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                  RTL Support
                </h3>
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  {renderLineWithCode(
                    customizationContent.Internationalization.rtlSupport
                      .description
                  )}
                </p>

                {Object.entries(
                  customizationExamples['Internationalization'] || {}
                )
                  .filter(([key]) => key === 'PersianRTL')
                  .map(([exampleKey, config]) => (
                    <ExampleRenderer
                      key={exampleKey}
                      config={config}
                      exampleKey={exampleKey}
                      category='Internationalization'
                    />
                  ))}

                {customizationContent.Internationalization.rtlSupport
                  .features && (
                  <FeatureList
                    title='RTL Features:'
                    items={
                      customizationContent.Internationalization.rtlSupport
                        .features
                    }
                    variant='info'
                    className='mt-4'
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
