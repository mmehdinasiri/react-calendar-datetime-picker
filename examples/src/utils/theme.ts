import type { ExampleConfig } from '../examplesConfig'

export const getThemeCSSVars = (
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
