import type { ExampleConfig } from '../examplesConfig'
import { getThemeCSSVars } from '../utils/theme'

interface ThemeDisplayProps {
  config: ExampleConfig
}

export const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ config }) => {
  const themeVars = getThemeCSSVars(config)
  const wrapper = config.wrapper || ''
  const calenderModalClass = config.props?.calenderModalClass as
    | string
    | undefined

  if (!themeVars) return null

  return (
    <div className='example-theme'>
      <h3>CSS Variables</h3>
      <p className='theme-instruction'>
        You can override these CSS variables to customize the calendar theme.
        There are multiple ways to apply them:
      </p>
      <div className='theme-methods'>
        <div className='theme-method'>
          <strong>Option 1: Global CSS (Simplest)</strong>
          <p className='method-description'>
            Add these variables to your global CSS file - no props needed:
          </p>
          <code className='usage-example'>
            {calenderModalClass === 'calendar-dark-custom-theme'
              ? '/* styles.css - Override globally */\n.react-calendar-datetime-picker[data-theme="dark"] {\n  --calendar-bg: #2c1810;\n  --calendar-bg-hover: #3d2418;\n  --calendar-header-bg: #2c1810;\n  --calendar-border: #4a2e1f;\n}\n\n/* JSX - No extra props */\n<DtCalendar dark={true} />'
              : '/* styles.css - Override globally */\n.react-calendar-datetime-picker {\n  --calendar-primary: #0066cc;\n  --calendar-primary-hover: #0052a3;\n  --calendar-selected-day: #0066cc;\n}\n\n/* JSX - No extra props */\n<DtCalendar />'}
          </code>
        </div>

        <div className='theme-method'>
          <strong>Option 2: Using calenderModalClass (This example)</strong>
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
  )
}

