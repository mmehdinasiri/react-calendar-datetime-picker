import type { ExampleConfig } from '../examplesConfig'

/**
 * Format props as a JavaScript object string for Monaco Editor
 * Monaco Editor can handle JavaScript natively, so we don't need complex JSX formatting
 */
export const formatPropsForEditor = (config: ExampleConfig): string => {
  const props = config.props || {}

  // Filter out undefined/null values
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([_, v]) => v !== undefined && v !== null)
  )

  if (Object.keys(filteredProps).length === 0) {
    return '{}'
  }

  // Format each property manually to handle functions and Dates
  const formatValue = (val: unknown, indent: number = 0): string => {
    const indentStr = '  '.repeat(indent)

    if (typeof val === 'string') {
      return JSON.stringify(val)
    } else if (typeof val === 'boolean' || typeof val === 'number') {
      return String(val)
    } else if (val instanceof Date) {
      return `new Date('${val.toISOString()}')`
    } else if (typeof val === 'function') {
      // Show function code with proper indentation
      const funcStr = val.toString()
      const lines = funcStr.split('\n')
      if (lines.length > 1) {
        const indentedLines = lines.map((line, idx) =>
          idx === 0 ? line : `${indentStr}  ${line}`
        )
        return indentedLines.join('\n')
      }
      return funcStr
    } else if (Array.isArray(val)) {
      if (val.length === 0) return '[]'
      const items = val
        .map((item) => `${indentStr}  ${formatValue(item, indent + 1)}`)
        .join(',\n')
      return `[\n${items}\n${indentStr}]`
    } else if (typeof val === 'object' && val !== null) {
      const obj = val as Record<string, unknown>
      const entries = Object.entries(obj).filter(
        ([_, v]) => v !== undefined && v !== null
      )
      if (entries.length === 0) return '{}'
      const formatted = entries
        .map(([k, v]) => {
          const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)
            ? k
            : JSON.stringify(k)
          return `${indentStr}  ${key}: ${formatValue(v, indent + 1)}`
        })
        .join(',\n')
      return `{\n${formatted}\n${indentStr}}`
    }
    return JSON.stringify(val)
  }

  const entries = Object.entries(filteredProps)
  const formatted = entries
    .map(([key, val]) => {
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key)
      return `  ${formattedKey}: ${formatValue(val, 1)}`
    })
    .join(',\n')

  return `{\n${formatted}\n}`
}

/**
 * Parse JavaScript object string back to props object
 * Much simpler than JSX parsing since Monaco Editor handles JavaScript natively
 */
export const parsePropsFromEditor = (
  propsString: string
): Record<string, unknown> => {
  if (!propsString.trim() || propsString.trim() === '{}') {
    return {}
  }

  try {
    // Try to evaluate as JavaScript
    // Wrap in parentheses to handle object literals
    const code = propsString.trim().startsWith('{')
      ? `(${propsString.trim()})`
      : propsString.trim()

    const parsed = new Function('return ' + code)()

    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, unknown>
    }

    return {}
  } catch (error) {
    // If parsing fails, return empty object
    return {}
  }
}
