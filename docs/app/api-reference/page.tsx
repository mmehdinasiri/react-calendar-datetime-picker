import {
  sharedProps,
  dtPickerOnlyProps,
  dtCalendarOnlyProps,
  types
} from './apiReference'
import { CodeBlock, PropsTable } from '../components'
import { CategoryContentDisplay } from '../components/CategoryContentDisplay'
import { apiReferenceContent } from './apiReferenceContent'

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

        <CategoryContentDisplay
          categoryName='Components'
          source='examples'
          examplesContent={apiReferenceContent}
          internationalizationContent={{}}
        />

        <h3>Shared Props</h3>
        <p>{apiReferenceContent.Components.details[0].content}</p>
        <PropsTable props={sharedProps} typeLinks={typeLinks} />

        <h3>DtPicker Only</h3>
        <p>{apiReferenceContent.Components.details[1].content}</p>
        <PropsTable props={dtPickerOnlyProps} typeLinks={typeLinks} />

        {dtCalendarOnlyProps.length > 0 && (
          <>
            <h3>DtCalendar Only</h3>
            <p>{apiReferenceContent.Components.details[2].content}</p>
            <PropsTable props={dtCalendarOnlyProps} typeLinks={typeLinks} />
          </>
        )}

        <h2>Types</h2>

        <CategoryContentDisplay
          categoryName='Types'
          source='examples'
          examplesContent={apiReferenceContent}
          internationalizationContent={{}}
        />

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
