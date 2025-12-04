'use client'

import { useState, useRef } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { ExampleConfig } from '../examplesConfig'
import type { InitValueInput } from '../../../src/types'
import { useTheme } from '../contexts/ThemeContext'

interface ExampleRendererProps {
  config: ExampleConfig
  exampleKey: string
}

export const ExampleRenderer: React.FC<ExampleRendererProps> = ({
  config,
  exampleKey
}) => {
  const { theme } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<
    InitValueInput | undefined
  >(config.props?.initValue as InitValueInput | undefined)

  const handleChange = (date: unknown) => {
    setSelectedValue(date as InitValueInput | undefined)
    if (config.showConsoleLog) {
      if (config.title === 'onDateSelect Callback') {
        console.log('onChange - Final value:', date)
      } else {
        console.log('onChange:', date)
      }
    }
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const numberOfMonths = config.props?.numberOfMonths as number | undefined
  const baseWrapperClass = config.wrapper || 'calendar-container'
  // Add wider container class for multiple months
  let wrapperClass = baseWrapperClass
  if (numberOfMonths && numberOfMonths > 1) {
    if (numberOfMonths >= 3) {
      wrapperClass = `${baseWrapperClass} calendar-three-months`
    } else {
      wrapperClass = `${baseWrapperClass} calendar-multiple-months`
    }
  }

  // Check if this is a theme example (has custom theme classes)
  const isThemeExample =
    baseWrapperClass.includes('calendar-blue-theme') ||
    baseWrapperClass.includes('calendar-dark-custom-theme') ||
    (typeof config.props?.calenderModalClass === 'string' &&
      config.props.calenderModalClass.includes('calendar-dark-custom-theme'))

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

  const componentProps: Record<string, unknown> = {}

  // Copy all props except boolean ones
  Object.keys(config.props || {}).forEach((key) => {
    if (!booleanPropNames.includes(key)) {
      componentProps[key] = config.props![key]
    }
  })

  // Explicitly pass boolean props if they exist
  booleanPropNames.forEach((propName) => {
    if (Object.prototype.hasOwnProperty.call(config.props || {}, propName)) {
      componentProps[propName] = config.props![propName]
    }
  })

  // Inject callbacks for examples that need them
  if (config.showConsoleLog) {
    if (config.title === 'View & Navigation Callbacks') {
      componentProps.onViewChange = (view: string) =>
        console.log('View changed:', view)
      componentProps.onMonthNavigate = (dir: string) =>
        console.log('Month navigated:', dir)
      componentProps.onMonthSelect = (month: number) =>
        console.log('Month selected:', month)
      componentProps.onYearSelect = (year: number) =>
        console.log('Year selected:', year)
    } else if (config.title === 'onDateSelect Callback') {
      componentProps.onDateSelect = (day: any) =>
        console.log('onDateSelect - Raw day clicked:', day)
      // Also show onChange to demonstrate the difference
      const originalOnChange = componentProps.onChange as
        | ((value: any) => void)
        | undefined
      componentProps.onChange = (finalValue: any) => {
        console.log('onChange - Final value:', finalValue)
        if (originalOnChange) {
          originalOnChange(finalValue)
        }
      }
    } else if (config.title === 'onGoToToday Callback') {
      componentProps.onGoToToday = () =>
        console.log('Go to today button clicked')
    }
  }

  // Get utility results if available
  const utilityResults = config.getUtilityResults?.(
    selectedValue &&
      !Array.isArray(selectedValue) &&
      !('from' in (selectedValue as object))
      ? (selectedValue as any)
      : null
  )

  // Helper function to convert example key to URL-friendly format
  const toKebabCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

  return (
    <section
      id={toKebabCase(exampleKey)}
      className='bg-bg-secondary rounded-lg border border-border p-8 mb-8'
    >
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          {config.title}
        </h2>
        {config.description && (
          <p className='text-gray-700 dark:text-gray-300'>
            {config.description}
          </p>
        )}
      </div>

      <div
        className={
          numberOfMonths && numberOfMonths > 1
            ? 'space-y-8'
            : 'grid grid-cols-1 lg:grid-cols-2 gap-8'
        }
      >
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Component
          </h3>
          <div ref={wrapperRef} className={wrapperClass}>
            <Component {...componentProps} onChange={handleChange} />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Code
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
              {(() => {
                // Use customCode if provided to completely override generated code
                if (config.customCode) {
                  return config.customCode
                }

                const propsCode = Object.entries(config.props || {})
                  .filter(([key]) => key !== 'initValue')
                  .map(([key, value]) => {
                    // Use custom constraintsCode if available
                    if (key === 'constraints' && config.constraintsCode) {
                      return `      ${config.constraintsCode}`
                    }

                    if (typeof value === 'function') {
                      return `      ${key}={/* custom function */}`
                    }
                    if (
                      typeof value === 'object' &&
                      value !== null &&
                      !Array.isArray(value)
                    ) {
                      // Regular object without functions
                      const formatted = JSON.stringify(value, null, 2)
                        .split('\n')
                        .map((line, index) =>
                          index === 0 ? line : '        ' + line
                        )
                        .join('\n')
                      return `      ${key}={${formatted}}`
                    }
                    return `      ${key}={${JSON.stringify(value)}}`
                  })
                  .join('\n')

                return `import { ${config.component} } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(${
    config.props?.initValue ? JSON.stringify(config.props.initValue) : 'null'
  })

  return (
    <${config.component}
${propsCode ? propsCode + '\n' : ''}      onChange={setDate}
    />
  )
}`
              })()}
            </SyntaxHighlighter>
          </div>

          {config.utilityCode && (
            <div className='mt-4'>
              <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                Utility Code
              </h4>
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
                  {config.utilityCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
            <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
              Result
            </h4>
            {utilityResults ? (
              <div className='space-y-1 text-sm'>
                {Object.entries(utilityResults).map(([key, value]) => (
                  <div key={key} className='text-gray-700 dark:text-gray-200'>
                    <span className='font-mono text-accent-light'>{key}:</span>{' '}
                    <span className='font-mono'>
                      {typeof value === 'boolean'
                        ? value.toString()
                        : value === null
                          ? 'null'
                          : JSON.stringify(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className='text-sm text-gray-700 dark:text-gray-200 mb-2'>
                  Selected value:
                </p>
                <div className='rounded-lg overflow-hidden border border-border'>
                  <SyntaxHighlighter
                    language='json'
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      padding: '0.75rem'
                    }}
                  >
                    {selectedValue
                      ? JSON.stringify(selectedValue, null, 2)
                      : 'null'}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </div>

          {config.showConsoleLog && (
            <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
              <p className='text-sm text-gray-700 dark:text-gray-200'>
                <strong>Note:</strong> Check the browser console to see onChange
                logs
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
