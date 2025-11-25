import { useState, useMemo, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
          onFocus={(e) => {
            // Prevent scroll when button gets focus
            e.target.blur()
          }}
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
  const calenderModalClass = config.props?.calenderModalClass as
    | string
    | undefined

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

  // Check for dark theme with custom background colors
  if (
    wrapper.includes('calendar-dark-custom-theme') ||
    calenderModalClass === 'calendar-dark-custom-theme'
  ) {
    return {
      '--calendar-bg': '#2c1810',
      '--calendar-bg-hover': '#3d2418',
      '--calendar-bg-selected': '#2c1810',
      '--calendar-header-bg': '#2c1810',
      '--calendar-border': '#4a2e1f'
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
        // Handle customization object with icons
        if (key === 'customization' && value && typeof value === 'object') {
          const custom = value as Record<string, unknown>
          const customFormatted: string[] = []
          if (custom.icons) {
            const icons = custom.icons as Record<string, unknown>
            customFormatted.push('icons: {')
            for (const [iconKey, iconValue] of Object.entries(icons)) {
              if (typeof iconValue === 'function') {
                customFormatted.push(`  ${iconKey}: React.Component`)
              } else {
                customFormatted.push(
                  `  ${iconKey}: ${JSON.stringify(iconValue)}`
                )
              }
            }
            customFormatted.push('}')
          }
          if (custom.classes) {
            customFormatted.push(
              `classes: ${JSON.stringify(custom.classes, null, 2)}`
            )
          }
          formatted.push(`${key}: {\n  ${customFormatted.join(',\n  ')}\n}`)
        } else {
          formatted.push(`${key}: ${JSON.stringify(value, null, 2)}`)
        }
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
    // Remove comments first (single-line comments starting with //)
    let cleaned = propsString
      .split('\n')
      .map((line) => {
        // Remove comments but preserve the line structure
        const commentIndex = line.indexOf('//')
        if (commentIndex >= 0) {
          // Check if // is inside a string
          const beforeComment = line.substring(0, commentIndex)
          const stringMatches = beforeComment.match(/"/g)
          if (stringMatches && stringMatches.length % 2 === 0) {
            // Even number of quotes means // is not inside a string
            return line.substring(0, commentIndex).trimRight()
          }
        }
        return line
      })
      .filter((line) => line.trim() !== '') // Remove empty lines
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .trim()

    // Try to parse as JSON
    const parsed = JSON.parse(cleaned)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      // Convert ISO strings back to Date objects
      const result: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          result[key] = new Date(value)
        } else {
          result[key] = value
        }
      }
      return result
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
        // If still fails, return empty object (don't try eval for security)
        return {}
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
  // Format JSX code for display
  const formatJSXForDisplay = (config: ExampleConfig): string => {
    const componentName =
      config.component === 'DtPicker' ? 'DtPicker' : 'DtCalendar'
    const wrapper = config.wrapper || ''
    const props = config.props || {}

    // Format props for JSX with full object structure
    const formatValueForJSX = (val: unknown, indent: number = 0): string => {
      const indentStr = '  '.repeat(indent)

      if (typeof val === 'string') {
        return JSON.stringify(val)
      } else if (typeof val === 'boolean') {
        return String(val)
      } else if (typeof val === 'number') {
        return String(val)
      } else if (val instanceof Date) {
        return `new Date('${val.toISOString()}')`
      } else if (typeof val === 'function') {
        // Show function code
        const funcStr = val.toString()
        // Format multi-line functions with proper indentation
        const lines = funcStr.split('\n')
        if (lines.length > 1) {
          // Multi-line function - indent each line
          const indentedLines = lines.map((line, idx) =>
            idx === 0 ? line : `${indentStr}  ${line}`
          )
          return indentedLines.join('\n')
        }
        return funcStr
      } else if (Array.isArray(val)) {
        if (val.length === 0) return '[]'
        const items = val
          .map((item) => `${indentStr}  ${formatValueForJSX(item, indent + 1)}`)
          .join(',\n')
        return `[\n${items}\n${indentStr}]`
      } else if (typeof val === 'object' && val !== null) {
        const obj = val as Record<string, unknown>
        const entries = Object.entries(obj).filter(
          ([_, v]) => v !== undefined && v !== null
        )
        if (entries.length === 0) return '{}'
        const props = entries
          .map(([k, v]) => {
            const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)
              ? k
              : JSON.stringify(k)
            return `${indentStr}  ${formattedKey}: ${formatValueForJSX(v, indent + 1)}`
          })
          .join(',\n')
        return `{\n${props}\n${indentStr}}`
      }
      return JSON.stringify(val)
    }

    const formatPropsForJSX = (props: Record<string, unknown>): string => {
      const entries = Object.entries(props).filter(
        ([_, val]) => val !== undefined && val !== null
      )

      if (entries.length === 0) return ''

      return entries
        .map(([key, val]) => {
          if (typeof val === 'string') {
            return `  ${key}="${val}"`
          } else if (typeof val === 'boolean') {
            return val ? `  ${key}` : `  ${key}={false}`
          } else {
            const formattedValue = formatValueForJSX(val, 1)
            // For functions, wrap in braces but don't add extra indentation
            if (typeof val === 'function') {
              return `  ${key}={${formattedValue}}`
            }
            return `  ${key}={${formattedValue}}`
          }
        })
        .join('\n')
    }

    const jsxProps = formatPropsForJSX(props)
    const componentTag = jsxProps
      ? `<${componentName}\n${jsxProps}\n/>`
      : `<${componentName} />`

    if (
      wrapper &&
      wrapper !== 'calendar-container' &&
      wrapper !== 'picker-container'
    ) {
      return `<div className="${wrapper}">\n  ${componentTag}\n</div>`
    }
    return componentTag
  }

  // Format props for display, handling functions (like icons) by creating valid JSON with comments
  const formatPropsForDisplay = (props: Record<string, unknown>): string => {
    // Create a copy of props without functions for JSON serialization
    const jsonProps: Record<string, unknown> = {}
    const functionNotes: string[] = []

    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === null) {
        continue
      }
      if (typeof value === 'function') {
        // Add helpful comment explaining the limitation
        if (key === 'isDateDisabled') {
          functionNotes.push(
            `// ${key}: function (cannot be edited in JSON - functions are not supported in JSON format)`
          )
        } else {
          functionNotes.push(
            `// ${key}: function (cannot be edited in JSON - functions are not supported in JSON format)`
          )
        }
        // Don't include functions in JSON
      } else if (typeof value === 'object') {
        if (value instanceof Date) {
          jsonProps[key] = value.toISOString()
        } else if (Array.isArray(value)) {
          jsonProps[key] = value
        } else {
          // Handle nested objects (like constraints, customization)
          if (key === 'constraints' && value && typeof value === 'object') {
            const constraints = value as Record<string, unknown>
            const jsonConstraints: Record<string, unknown> = {}

            for (const [constraintKey, constraintValue] of Object.entries(
              constraints
            )) {
              if (typeof constraintValue === 'function') {
                if (constraintKey === 'isDateDisabled') {
                  functionNotes.push(
                    `// constraints.${constraintKey}: function (cannot be edited in JSON - functions are not supported in JSON format)`
                  )
                } else {
                  functionNotes.push(
                    `// constraints.${constraintKey}: function (cannot be edited in JSON - functions are not supported in JSON format)`
                  )
                }
              } else {
                jsonConstraints[constraintKey] = constraintValue
              }
            }
            jsonProps[key] = jsonConstraints
          } else if (
            key === 'customization' &&
            value &&
            typeof value === 'object'
          ) {
            const custom = value as Record<string, unknown>
            const jsonCustom: Record<string, unknown> = {}

            if (custom.icons) {
              const icons = custom.icons as Record<string, unknown>
              const iconNotes: string[] = []
              for (const [iconKey, iconValue] of Object.entries(icons)) {
                if (typeof iconValue === 'function') {
                  iconNotes.push(
                    `//   ${iconKey}: React.Component (cannot be edited in JSON - functions are not supported in JSON format)`
                  )
                } else {
                  jsonCustom[iconKey] = iconValue
                }
              }
              if (iconNotes.length > 0) {
                functionNotes.push(`// customization.icons: {`)
                functionNotes.push(...iconNotes)
                functionNotes.push(`// }`)
              }
            }
            if (custom.classes) {
              jsonCustom.classes = custom.classes
            }
            jsonProps[key] = jsonCustom
          } else {
            jsonProps[key] = value
          }
        }
      } else {
        jsonProps[key] = value
      }
    }

    // Create JSON string
    const jsonString = JSON.stringify(jsonProps, null, 2)

    // Add function notes as comments at the top
    if (functionNotes.length > 0) {
      return functionNotes.join('\n') + '\n' + jsonString
    }

    return jsonString
  }

  const [propsString, setPropsString] = useState<string>(() => {
    // Format props for initial display, preserving function references as comments
    const props = config.props || {}
    return formatPropsForDisplay(props)
  })
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
      // Merge with original props to preserve functions/components (like icons)
      // Functions can't be serialized, so we need to preserve them from original config
      const merged = { ...config.props, ...parsed }

      // Deep merge for nested objects like customization
      if (config.props?.customization && parsed.customization) {
        const configCustom = config.props.customization as {
          icons?: Record<string, unknown>
          classes?: unknown
        }
        const parsedCustom = parsed.customization as {
          icons?: Record<string, unknown>
          classes?: unknown
        }
        merged.customization = {
          ...configCustom,
          ...parsedCustom,
          icons: {
            ...(configCustom.icons || {}),
            ...(parsedCustom.icons || {})
          }
        }
      }

      // Deep merge for constraints to preserve isDateDisabled function
      if (config.props?.constraints) {
        const configConstraints = config.props.constraints as Record<
          string,
          unknown
        >
        const parsedConstraints = parsed.constraints as
          | Record<string, unknown>
          | undefined

        if (parsedConstraints) {
          // Merge parsed constraints with config constraints, preserving functions from config
          merged.constraints = {
            ...configConstraints,
            ...parsedConstraints,
            // Always preserve isDateDisabled from config if it exists (functions can't be parsed from JSON)
            isDateDisabled:
              configConstraints.isDateDisabled ||
              parsedConstraints.isDateDisabled
          }
        } else {
          // If no parsed constraints, use config constraints (preserves functions)
          merged.constraints = configConstraints
        }
      }

      return merged
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
            const wrapper = config.wrapper || ''
            const calenderModalClass = config.props?.calenderModalClass as
              | string
              | undefined
            return (
              <>
                {themeVars && (
                  <div className='example-theme'>
                    <h3>CSS Variables</h3>
                    <p className='theme-instruction'>
                      You can override these CSS variables to customize the
                      calendar theme. There are multiple ways to apply them:
                    </p>
                    <div className='theme-methods'>
                      <div className='theme-method'>
                        <strong>Option 1: Global CSS (Simplest)</strong>
                        <p className='method-description'>
                          Add these variables to your global CSS file - no props
                          needed:
                        </p>
                        <code className='usage-example'>
                          {calenderModalClass === 'calendar-dark-custom-theme'
                            ? '/* styles.css - Override globally */\n.react-calendar-datetime-picker[data-theme="dark"] {\n  --calendar-bg: #2c1810;\n  --calendar-bg-hover: #3d2418;\n  --calendar-header-bg: #2c1810;\n  --calendar-border: #4a2e1f;\n}\n\n/* JSX - No extra props */\n<DtCalendar dark={true} />'
                            : '/* styles.css - Override globally */\n.react-calendar-datetime-picker {\n  --calendar-primary: #0066cc;\n  --calendar-primary-hover: #0052a3;\n  --calendar-selected-day: #0066cc;\n}\n\n/* JSX - No extra props */\n<DtCalendar />'}
                        </code>
                      </div>

                      <div className='theme-method'>
                        <strong>
                          Option 2: Using calenderModalClass (This example)
                        </strong>
                        <p className='method-description'>
                          Apply a custom class to a specific calendar instance:
                        </p>
                        <code className='usage-example'>
                          {calenderModalClass === 'calendar-dark-custom-theme'
                            ? '/* styles.css */\n.my-custom-class[data-theme="dark"] {\n  --calendar-bg: #2c1810;\n  --calendar-bg-hover: #3d2418;\n  --calendar-header-bg: #2c1810;\n  --calendar-border: #4a2e1f;\n}\n\n/* JSX */\n<DtCalendar\n  dark={true}\n  calenderModalClass="my-custom-class"\n/>'
                            : '/* styles.css */\n.my-custom-class {\n  --calendar-primary: #0066cc;\n  --calendar-primary-hover: #0052a3;\n  --calendar-selected-day: #0066cc;\n}\n\n/* JSX */\n<DtCalendar calenderModalClass="my-custom-class" />'}
                        </code>
                      </div>

                      {wrapper.includes('calendar-blue-theme') && (
                        <div className='theme-method'>
                          <strong>Option 3: Using Wrapper Element</strong>
                          <p className='method-description'>
                            Apply variables to a parent container:
                          </p>
                          <code className='usage-example'>
                            {
                              '/* styles.css */\n.my-wrapper {\n  --calendar-primary: #0066cc;\n  --calendar-primary-hover: #0052a3;\n  --calendar-selected-day: #0066cc;\n}\n\n/* JSX */\n<div className="my-wrapper">\n  <DtCalendar />\n</div>'
                            }
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className='example-props'>
                  <h3>Code Example</h3>
                  <div className='code-display'>
                    <SyntaxHighlighter
                      language='jsx'
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      {formatJSXForDisplay(config)}
                    </SyntaxHighlighter>
                  </div>

                  <h3 style={{ marginTop: '1.5rem' }}>Edit Props (JSON)</h3>
                  <div className='props-editor-container'>
                    <textarea
                      className={`props-editor ${propsError ? 'props-editor-error' : ''}`}
                      value={propsString}
                      onChange={(e) => handlePropsChange(e.target.value)}
                      spellCheck={false}
                      placeholder='Edit props as JSON... (Note: Functions like icons cannot be edited)'
                      onFocus={(e) => {
                        // Prevent auto-scroll when textarea gets focus
                        e.preventDefault()
                        e.target.focus({ preventScroll: true })
                      }}
                    />
                    {propsError && (
                      <div className='props-error'>{propsError}</div>
                    )}
                  </div>
                  <button
                    className='props-reset-btn'
                    onClick={() => {
                      setPropsString(formatPropsForDisplay(config.props || {}))
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
                  {config.showConsoleLog && (
                    <div className='console-log-info'>
                      <p>
                        <strong>💡 Tip:</strong> Open browser console to see
                        onChange callback logs
                      </p>
                    </div>
                  )}
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
