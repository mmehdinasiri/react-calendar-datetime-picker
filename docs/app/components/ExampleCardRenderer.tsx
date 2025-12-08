'use client'

import React, { useState, useRef } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import { ExampleCard } from './ExampleCard'
import { CodeBlock } from './CodeBlock'
import { Note } from './Note'
import type { ExampleConfig } from '../examples/examplesConfig'
import type { InitValueInput } from '../../../src/types'
import { useTheme } from '../contexts/ThemeContext'

interface ExampleCardRendererProps {
  config: ExampleConfig
  exampleKey: string
  category?: string
}

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export const ExampleCardRenderer: React.FC<ExampleCardRendererProps> = ({
  config,
  exampleKey,
  category
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

  // Automatically apply theme from context unless:
  // 1. The example explicitly sets the dark prop (allows override)
  // 2. It's a theme example with custom theme classes
  if (
    !isThemeExample &&
    !Object.prototype.hasOwnProperty.call(config.props || {}, 'dark')
  ) {
    componentProps.dark = theme === 'dark'
  }

  // Inject callbacks for examples that need them
  if (config.showConsoleLog) {
    if (config.title === 'View & Navigation Callbacks') {
      componentProps.onViewChange = (view: string) =>
        console.log('onViewChange:', view)
      componentProps.onMonthNavigate = (direction: string) =>
        console.log('onMonthNavigate:', direction)
      componentProps.onGoToToday = () => console.log('onGoToToday')
    } else if (config.title === 'onDateSelect Callback') {
      componentProps.onDateSelect = (day: unknown) => {
        console.log('onDateSelect - Raw day clicked:', day)
      }
    } else if (config.title === 'onMonthSelect Callback') {
      componentProps.onMonthSelect = (month: number) =>
        console.log('onMonthSelect:', month)
    } else if (config.title === 'onYearSelect Callback') {
      componentProps.onYearSelect = (year: number) =>
        console.log('onYearSelect:', year)
    }
  }

  // Generate code
  const generateCode = (): string => {
    // Use customCode if provided to completely override generated code
    if (config.customCode) {
      return config.customCode
    }

    // Helper function to safely stringify values
    const safeStringify = (val: unknown, key: string): string => {
      // Check if it's a React element
      if (React.isValidElement(val)) {
        // For triggerElement, provide a helpful placeholder
        if (key === 'triggerElement') {
          return `      ${key}={\n        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>\n          📅 Pick Date\n        </button>\n      }`
        }
        return `      ${key}={/* React element */}`
      }

      // Check if it's a function
      if (typeof val === 'function') {
        return `      ${key}={/* custom function */}`
      }

      // Check if it's an object (but not null or array)
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        try {
          // Try to stringify, but handle circular references
          const seen = new WeakSet()
          const formatted = JSON.stringify(
            val,
            (k, v) => {
              // Skip React elements and functions
              if (React.isValidElement(v)) {
                return '[React Element]'
              }
              if (typeof v === 'function') {
                return '[Function]'
              }
              // Handle circular references
              if (typeof v === 'object' && v !== null) {
                if (seen.has(v)) {
                  return '[Circular]'
                }
                seen.add(v)
              }
              return v
            },
            2
          )
            .split('\n')
            .map((line, index) => (index === 0 ? line : '        ' + line))
            .join('\n')
          return `      ${key}={${formatted}}`
        } catch (error) {
          // If stringification fails, provide a placeholder
          return `      ${key}={/* object with circular reference or unsupported types */}`
        }
      }

      // For arrays and primitives
      try {
        return `      ${key}={${JSON.stringify(val)}}`
      } catch (error) {
        return `      ${key}={/* cannot stringify */}`
      }
    }

    const propsCode = Object.entries(config.props || {})
      .filter(([key]) => key !== 'initValue')
      .map(([key, value]) => {
        // Use custom constraintsCode if available
        if (key === 'constraints' && config.constraintsCode) {
          return `      ${config.constraintsCode}`
        }

        return safeStringify(value, key)
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
  }

  const code = generateCode()

  // Generate utility results if available
  const utilityResults = config.getUtilityResults
    ? config.getUtilityResults(selectedValue as any)
    : null

  // Build result content
  const resultContent = utilityResults ? (
    <div className='space-y-1 text-sm'>
      {Object.entries(utilityResults).map(([key, value]) => (
        <div key={key} className='text-gray-700 dark:text-gray-200'>
          <span className='font-mono text-green-700 dark:text-accent-light'>
            {key}:
          </span>{' '}
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
        <CodeBlock
          language='json'
          code={selectedValue ? JSON.stringify(selectedValue, null, 2) : 'null'}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            padding: '0.75rem'
          }}
          className='border-0'
        />
      </div>
    </div>
  )

  // Build code content (may include utility code)
  const codeContent = (
    <>
      <CodeBlock language='tsx' code={code} />
      {config.utilityCode && (
        <div className='mt-4'>
          <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
            Utility Code
          </h4>
          <CodeBlock language='typescript' code={config.utilityCode} />
        </div>
      )}
    </>
  )

  // Build footer content (console log note)
  const footerContent = config.showConsoleLog ? (
    <Note>
      <p className='text-sm text-gray-200'>
        <strong>Note:</strong> Check the browser console to see onChange logs
      </p>
    </Note>
  ) : undefined

  const sectionId = category
    ? `${toKebabCase(category)}-${toKebabCase(exampleKey)}`
    : toKebabCase(exampleKey)

  return (
    <ExampleCard
      id={sectionId}
      title={config.title}
      description={config.description}
      component={
        <div ref={wrapperRef} className={wrapperClass}>
          <Component {...componentProps} onChange={handleChange} />
        </div>
      }
      code={codeContent}
      result={resultContent}
      wrapperClassName={wrapperClass}
      footerContent={footerContent}
      layout={numberOfMonths && numberOfMonths > 1 ? 'vertical' : 'grid'}
    />
  )
}
