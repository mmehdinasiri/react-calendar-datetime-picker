import type { Day } from 'react-calendar-datetime-picker'

export const formatDay = (day: Day): string => {
  const timeStr =
    day.hour !== undefined && day.minute !== undefined
      ? ` ${day.hour.toString().padStart(2, '0')}:${day.minute.toString().padStart(2, '0')}`
      : ''
  return `${day.year}/${day.month.toString().padStart(2, '0')}/${day.day.toString().padStart(2, '0')}${timeStr}`
}

export const formatValue = (value: unknown): string => {
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

export const formatProps = (props: Record<string, unknown>): string => {
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
