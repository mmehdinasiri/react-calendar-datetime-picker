import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
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

const ExampleRenderer: React.FC<ExampleRendererProps> = ({
  config,
  exampleKey
}) => {
  const [selectedValue, setSelectedValue] = useState<
    Day | Range | Multi | null
  >(null)

  const handleChange = (date: unknown) => {
    setSelectedValue(date as Day | Range | Multi | null)
    console.log(`${config.title}:`, date)
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const wrapperClass = config.wrapper || 'calendar-container'
  const props = config.props || {}

  const content = <Component {...props} onChange={handleChange} />

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
                  <pre className='props-code'>{formatProps(props)}</pre>
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
