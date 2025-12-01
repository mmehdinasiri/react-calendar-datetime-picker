'use client'

import { useState, useEffect, useRef } from 'react'
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
      console.log('onChange:', date)
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

  // Add dark prop for DtCalendar based on theme (unless it's a theme example or explicitly set)
  if (
    Component === DtCalendar &&
    !isThemeExample &&
    !('dark' in componentProps)
  ) {
    componentProps.dark = theme === 'dark'
  }

  // For DtPicker, add data-theme="dark" to the calendar element when in dark mode
  // (DtPicker doesn't have a dark prop, so we need to set it via DOM)
  // DtPicker renders CalendarCore directly, which doesn't create the react-calendar-datetime-picker wrapper
  // So we need to wrap the CalendarCore's rendered DOM nodes
  useEffect(() => {
    if (Component === DtPicker && !isThemeExample && theme === 'dark') {
      const addDarkTheme = () => {
        // Search from document root since modal might be rendered outside wrapper
        const modal = document.querySelector(
          '.picker-container .calendar-picker-modal, .calendar-picker-modal'
        ) as HTMLElement

        if (
          modal &&
          wrapperRef.current?.contains(
            modal.closest('.picker-container') || modal
          )
        ) {
          // Check if react-calendar-datetime-picker wrapper already exists
          let calendarWrapper = modal.querySelector(
            '.react-calendar-datetime-picker'
          ) as HTMLElement

          // If no wrapper exists and modal has content, create one
          if (!calendarWrapper && modal.children.length > 0) {
            // Find the first actual DOM element (not text nodes)
            let firstElement: Element | null = null
            for (let i = 0; i < modal.children.length; i++) {
              if (modal.children[i].nodeType === Node.ELEMENT_NODE) {
                firstElement = modal.children[i]
                break
              }
            }

            // If we found an element and it's not already our wrapper, wrap it
            if (
              firstElement &&
              !firstElement.classList.contains('react-calendar-datetime-picker')
            ) {
              calendarWrapper = document.createElement('div')
              calendarWrapper.className = 'react-calendar-datetime-picker'
              calendarWrapper.setAttribute('data-theme', 'dark')

              // Insert wrapper before the first element
              modal.insertBefore(calendarWrapper, firstElement)
              // Move the first element into the wrapper
              calendarWrapper.appendChild(firstElement)
            }
          } else if (calendarWrapper) {
            // Wrapper exists, ensure data-theme is set
            calendarWrapper.setAttribute('data-theme', 'dark')
          }
        }
      }

      // Try immediately (in case modal is already open)
      addDarkTheme()

      // Also try after a short delay to catch modals that open after render
      const timeoutId = setTimeout(addDarkTheme, 100)

      // Watch for when modal appears (when picker opens)
      const observer = new MutationObserver(() => {
        // Use a small delay to ensure React has finished rendering
        setTimeout(addDarkTheme, 10)
      })

      // Observe the document body to catch modals rendered anywhere
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    }
  }, [Component, theme, isThemeExample])

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
                const propsCode = Object.entries(config.props || {})
                  .filter(([key]) => key !== 'initValue')
                  .map(([key, value]) => {
                    if (typeof value === 'function') {
                      return `      ${key}={/* custom function */}`
                    }
                    if (
                      typeof value === 'object' &&
                      value !== null &&
                      !Array.isArray(value)
                    ) {
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

                // Add dark prop to code if it was added programmatically
                let darkPropLine = ''
                if (
                  Component === DtCalendar &&
                  !isThemeExample &&
                  !('dark' in (config.props || {})) &&
                  'dark' in componentProps &&
                  componentProps.dark === true
                ) {
                  darkPropLine = '      dark={true}\n'
                }

                return `import { ${config.component} } from 'react-calendar-datetime-picker'
import React, { useState } from 'react'

function App() {
  const [date, setDate] = useState(${
    config.props?.initValue ? JSON.stringify(config.props.initValue) : 'null'
  })

  return (
    <${config.component}
${darkPropLine}${propsCode ? propsCode + '\n' : ''}      onChange={setDate}
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
              <p className='text-sm text-gray-700 dark:text-gray-200'>
                Selected value:{' '}
                <code className='text-xs'>
                  {selectedValue
                    ? JSON.stringify(selectedValue, null, 2)
                    : 'null'}
                </code>
              </p>
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
