import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import type { ExampleConfig } from '../examplesConfig'
import { useParsedProps } from '../hooks/useParsedProps'
import { useExampleValue } from '../hooks/useExampleValue'
import { PropsEditor } from './PropsEditor'
import { ThemeDisplay } from './ThemeDisplay'
import { ResultDisplay } from './ResultDisplay'
import { UtilityExamplesDisplay } from './UtilityExamplesDisplay'

interface ExampleRendererProps {
  config: ExampleConfig
  exampleKey: string
}

export const ExampleRenderer: React.FC<ExampleRendererProps> = ({ config }) => {
  const { propsString, setPropsString, props, propsError, resetProps } =
    useParsedProps(config)

  const locale =
    (props.local as 'en' | 'fa') || (config.props?.local as 'en' | 'fa') || 'en'
  const type =
    (props.type as 'single' | 'range' | 'multi' | 'week') ||
    (config.props?.type as 'single' | 'range' | 'multi' | 'week') ||
    'single'

  const { selectedValue, handleChange } = useExampleValue(
    props.initValue || config.props?.initValue,
    locale,
    type
  )

  // Use onCalenderChange to sync the value when initValue is provided
  const handleCalenderChange = (date: unknown) => {
    handleChange(date)
  }

  const Component = config.component === 'DtPicker' ? DtPicker : DtCalendar
  const wrapperClass = config.wrapper || 'calendar-container'

  // Explicitly extract boolean props to ensure false values are passed correctly
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
  Object.keys(props).forEach((key) => {
    if (!booleanPropNames.includes(key)) {
      componentProps[key] = props[key]
    }
  })

  // Explicitly pass boolean props if they exist in props (including false values)
  booleanPropNames.forEach((propName) => {
    if (Object.prototype.hasOwnProperty.call(props, propName)) {
      componentProps[propName] = props[propName]
    }
  })

  const content = (
    <Component
      {...componentProps}
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
          <ThemeDisplay config={config} />
          {config.utilityCode ? (
            <UtilityExamplesDisplay code={config.utilityCode} />
          ) : (
            <PropsEditor
              value={propsString}
              onChange={setPropsString}
              onReset={resetProps}
              error={propsError}
            />
          )}
          <ResultDisplay
            value={selectedValue}
            showConsoleLog={config.showConsoleLog}
            utilityResults={config.getUtilityResults?.(
              selectedValue &&
                !Array.isArray(selectedValue) &&
                !('from' in selectedValue)
                ? selectedValue
                : null
            )}
          />
        </div>
        <div className='example-calendar'>
          <div className={wrapperClass}>{content}</div>
        </div>
      </div>
    </section>
  )
}
