import { useState, useMemo, useEffect } from 'react'
import {
  DtPicker,
  DtCalendar,
  normalizeInitValue
} from 'react-calendar-datetime-picker'
import type { Day, Range, Multi } from 'react-calendar-datetime-picker'
import { examples, type ExampleConfig } from './examplesConfig'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

// Tab component
interface TabProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

const Tabs: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='tabs'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// Example renderer component
interface ExampleRendererProps {
  config: ExampleConfig
  exampleKey: string
}

const formatDay = (day: Day): string => {
  const timeStr =
    day.hour !== undefined && day.minute !== undefined
      ? ` ${day.hour.toString().padStart(2, '0')}:${day.minute.toString().padStart(2, '0')}`
      : ''
  return `${day.year}/${day.month.toString().padStart(2, '0')}/${day.day.toString().padStart(2, '0')}${timeStr}`
}

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return 'null'
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      // Multi type - array of Day objects
      if (value.length === 0) {
        return '[]'
      }
      const formatted = value.map((day) => formatDay(day as Day))
      return `[\n  ${formatted.join(',\n  ')}\n]`
    }
    // Check if it's a Day object
    if (
      'year' in value &&
      'month' in value &&
      'day' in value &&
      !('from' in value)
    ) {
      return formatDay(value as Day)
    }
    // Check if it's a Range object
    if ('from' in value && 'to' in value) {
      const range = value as { from: Day | null; to: Day | null }
      const fromStr = range.from ? formatDay(range.from) : 'null'
      const toStr = range.to ? formatDay(range.to) : 'null'
      return `{\n  from: ${fromStr},\n  to: ${toStr}\n}`
    }
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

const getThemeCSSVars = (
  config: ExampleConfig
): Record<string, string> | null => {
  const wrapper = config.wrapper || ''

  // Check for blue theme
  if (wrapper.includes('calendar-blue-theme')) {
    return {
      '--calendar-primary': '#0066cc',
      '--calendar-primary-hover': '#0052a3',
      '--calendar-primary-light': '#b3d9ff',
      '--calendar-selected-day': '#0066cc',
      '--calendar-today': '#004d99',
      '--calendar-selected-range': '#b3d9ff',
      '--calendar-selected-range-color': '#0052a3',
      '--calendar-header-bg': '#0066cc'
    }
  }

  // Check for dark theme
  if (config.props?.dark === true) {
    return {
      '--calendar-primary': '#16a34a',
      '--calendar-primary-hover': '#15803d',
      '--calendar-primary-light': '#14532d',
      '--calendar-selected-day': '#16a34a',
      '--calendar-today': '#15803d',
      '--calendar-selected-range': '#14532d',
      '--calendar-selected-range-color': '#4ade80',
      '--calendar-bg': '#1f2937',
      '--calendar-bg-hover': '#374151',
      '--calendar-bg-selected': '#1f2937',
      '--calendar-header-bg': '#1f2937',
      '--calendar-text': '#f3f4f6',
      '--calendar-text-light': '#e5e7eb',
      '--calendar-text-lighter': '#9ca3af',
      '--calendar-border': '#374151',
      '--calendar-border-focus': '#16a34a',
      '--calendar-border-selected': '#16a34a'
    }
  }

  return null
}

const formatProps = (props: Record<string, unknown>): string => {
  const formatted: string[] = []
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) {
      continue
    }
    if (typeof value === 'function') {
      formatted.push(`${key}: function`)
    } else if (typeof value === 'object') {
      if (value instanceof Date) {
        formatted.push(`${key}: new Date(${value.toISOString()})`)
      } else if (Array.isArray(value)) {
        formatted.push(`${key}: [${value.length} items]`)
      } else {
        formatted.push(`${key}: ${JSON.stringify(value, null, 2)}`)
      }
    } else {
      formatted.push(`${key}: ${JSON.stringify(value)}`)
    }
  }
  return formatted.join('\n')
}

const parsePropsString = (propsString: string): Record<string, unknown> => {
  if (!propsString.trim() || propsString.trim() === '{}') {
    return {}
  }

  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(propsString)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return parsed
    }
    return {}
  } catch {
    // If JSON parsing fails, try to handle common cases
    try {
      // Remove comments and clean up
      let cleaned = propsString
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .trim()

      // Handle new Date() calls - convert to ISO string for JSON
      cleaned = cleaned.replace(/new Date\(([^)]+)\)/g, (match, dateStr) => {
        try {
          const date = new Date(dateStr.replace(/['"]/g, ''))
          return JSON.stringify(date.toISOString())
        } catch {
          return match
        }
      })

      // Try JSON parse again after Date conversion
      try {
        const parsed = JSON.parse(cleaned)
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          !Array.isArray(parsed)
        ) {
          // Convert ISO strings back to Date objects
          const result: Record<string, unknown> = {}
          for (const [key, value] of Object.entries(parsed)) {
            if (
              typeof value === 'string' &&
              /^\d{4}-\d{2}-\d{2}T/.test(value)
            ) {
              result[key] = new Date(value)
            } else {
              result[key] = value
            }
          }
          return result
        }
      } catch {
        // If still fails, try evaluating as JavaScript (less safe but more flexible)
        const func = new Function(`return ${cleaned}`)
        const result = func()
        return typeof result === 'object' &&
          result !== null &&
          !Array.isArray(result)
          ? result
          : {}
      }
    } catch {
      return {}
    }
  }
  return {}
}

const ExampleRenderer: React.FC<ExampleRendererProps> = ({
  config,
  exampleKey
}) => {
  const [propsString, setPropsString] = useState<string>(
    JSON.stringify(config.props || {}, null, 2)
  )
  const [propsError, setPropsError] = useState<string | null>(null)

  // Parse props from string
  const props = useMemo(() => {
    try {
      const parsed = parsePropsString(propsString)
      if (
        Object.keys(parsed).length === 0 &&
        propsString.trim() !== '' &&
        propsString.trim() !== '{}'
      ) {
        setPropsError('Invalid JSON format')
        return config.props || {}
      }
      setPropsError(null)
      return parsed
    } catch (error) {
      // Only show error if the string is not empty and not just whitespace
      if (propsString.trim() !== '' && propsString.trim() !== '{}') {
        setPropsError(
          error instanceof Error ? error.message : 'Invalid props format'
        )
      } else {
        setPropsError(null)
      }
      return config.props || {}
    }
  }, [propsString, config.props])

  // Initialize selectedValue from initValue prop
  const [selectedValue, setSelectedValue] = useState<
    Day | Range | Multi | null
  >(() => {
    const initValue = config.props?.initValue
    const locale = (config.props?.local as 'en' | 'fa') || 'en'
    const type =
      (config.props?.type as 'single' | 'range' | 'multi') || 'single'
    if (initValue) {
      return normalizeInitValue(initValue, locale, type) as
        | Day
        | Range
        | Multi
        | null
    }
    return null
  })

  // Update selectedValue when initValue prop changes
  useEffect(() => {
    const initValue = props.initValue || config.props?.initValue
    const locale =
      (props.local as 'en' | 'fa') ||
      (config.props?.local as 'en' | 'fa') ||
      'en'
    const type =
      (props.type as 'single' | 'range' | 'multi') ||
      (config.props?.type as 'single' | 'range' | 'multi') ||
      'single'
    if (initValue) {
      const normalized = normalizeInitValue(initValue, locale, type) as
        | Day
        | Range
        | Multi
        | null
      setSelectedValue(normalized)
    } else {
      setSelectedValue(null)
    }
  }, [
    props.initValue,
    config.props?.initValue,
    props.local,
    config.props?.local,
    props.type,
    config.props?.type
  ])

  const handleChange = (date: unknown) => {
    setSelectedValue(date as Day | Range | Multi | null)
    console.log(`${config.title}:`, date)
  }

  // Use onCalenderChange to sync the value when initValue is provided
  // This will be called when the component initializes with initValue
  const handleCalenderChange = (date: unknown) => {
    setSelectedValue(date as Day | Range | Multi | null)
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const wrapperClass = config.wrapper || 'calendar-container'

  const handlePropsChange = (newPropsString: string) => {
    setPropsString(newPropsString)
  }

  const content = (
    <Component
      {...props}
      onChange={handleChange}
      onCalenderChange={props.initValue ? handleCalenderChange : undefined}
    />
  )

  return (
    <section className='example-section'>
      <h2>{config.title}</h2>
      {config.description && (
        <p className='description'>{config.description}</p>
      )}
      <div className='example-content'>
        <div className='example-sidebar'>
          {(() => {
            const themeVars = getThemeCSSVars(config)
            return (
              <>
                {themeVars && (
                  <div className='example-theme'>
                    <h3>CSS Variables</h3>
                    <p className='theme-instruction'>
                      Override these CSS variables in your CSS file or inline
                      styles to customize the calendar theme:
                    </p>
                    <pre className='theme-code'>
                      {Object.entries(themeVars)
                        .map(([key, value]) => `${key}: ${value};`)
                        .join('\n')}
                    </pre>
                    <p className='theme-usage'>
                      <strong>Usage:</strong> Add a custom class to your
                      calendar wrapper and override the variables:
                      <br />
                      <code className='usage-example'>
                        {
                          '// CSS\n.my-custom-theme {\n  --calendar-primary: #0066cc;\n  --calendar-primary-hover: #0052a3;\n  --calendar-selected-day: #0066cc;\n}\n\n// JSX\n<DtCalendar\n  calenderModalClass="my-custom-theme"\n  onChange={(value) => console.log(value)}\n/>'
                        }
                      </code>
                    </p>
                  </div>
                )}
                <div className='example-props'>
                  <h3>Props</h3>
                  <div className='props-editor-container'>
                    <textarea
                      className={`props-editor ${propsError ? 'props-editor-error' : ''}`}
                      value={propsString}
                      onChange={(e) => handlePropsChange(e.target.value)}
                      spellCheck={false}
                      placeholder='Edit props as JSON...'
                    />
                    {propsError && (
                      <div className='props-error'>{propsError}</div>
                    )}
                  </div>
                  <button
                    className='props-reset-btn'
                    onClick={() => {
                      setPropsString(
                        JSON.stringify(config.props || {}, null, 2)
                      )
                      setPropsError(null)
                    }}
                    type='button'
                  >
                    Reset to Default
                  </button>
                </div>
                <div className='example-result'>
                  <h3>Result Value</h3>
                  <pre className='result-code'>
                    {formatValue(selectedValue)}
                  </pre>
                </div>
              </>
            )
          })()}
        </div>
        <div className='example-calendar'>
          <div className={wrapperClass}>{content}</div>
          {config.renderExtra &&
            config.renderExtra(
              selectedValue &&
                !Array.isArray(selectedValue) &&
                !('from' in selectedValue)
                ? selectedValue
                : null
            )}
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('Basic')

  const tabs = Object.keys(examples)

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Calendar DateTime Picker</h1>
        <p>Examples and Playground</p>
      </header>

      <main className='app-main'>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className='tab-content'>
          {activeTab &&
            examples[activeTab] &&
            Object.entries(examples[activeTab]).map(([key, config]) => (
              <ExampleRenderer key={key} exampleKey={key} config={config} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default App
