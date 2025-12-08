import {
  sharedProps,
  dtPickerOnlyProps,
  dtCalendarOnlyProps,
  types
} from '../data/apiReference'
import { CodeBlock, PropsTable } from '../components'

// Type links mapping
const typeLinks: Record<string, string> = {
  Day: '/types#day',
  Range: '/types#range',
  Multi: '/types#multi',
  Week: '/types#week',
  Time: '/types#time',
  TimeRange: '/types#timerange',
  CalendarLocale: '/types#calendarlocale',
  CalendarSystem: '/types#calendarsystem',
  CalendarType: '/types#calendartype',
  DateInput: '/types#dateinput',
  InitValueInput: '/types#initvalueinput',
  CalendarConstraintsInput: '/types#calendarconstraintsinput',
  PresetRangesConfig: '/customization#preset-ranges'
}

export default function APIReference() {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <h1>API Reference</h1>

        <p>
          Complete API documentation for React Calendar DateTime Picker
          components, types, and utilities.
        </p>

        <h2>Components</h2>

        <p>
          Both <code>DtCalendar</code> and <code>DtPicker</code> share most of
          their API. The props are organized into shared props (available in
          both components) and component-specific props.
        </p>

        <h3>Shared Props</h3>
        <p>
          These props are available in both <code>DtCalendar</code> and{' '}
          <code>DtPicker</code>:
        </p>
        <PropsTable props={sharedProps} typeLinks={typeLinks} />

        <h3>DtPicker Only</h3>
        <p>
          These props are only available in <code>DtPicker</code>:
        </p>
        <PropsTable props={dtPickerOnlyProps} typeLinks={typeLinks} />

        {dtCalendarOnlyProps.length > 0 && (
          <>
            <h3>DtCalendar Only</h3>
            <p>
              These props are only available in <code>DtCalendar</code>:
            </p>
            <PropsTable props={dtCalendarOnlyProps} typeLinks={typeLinks} />
          </>
        )}

        <h2>Types</h2>

        {types.map((type) => (
          <div key={type.name}>
            <h3>{type.name}</h3>
            <CodeBlock language='typescript' code={type.definition} />
          </div>
        ))}
      </div>
    </div>
  )
}
