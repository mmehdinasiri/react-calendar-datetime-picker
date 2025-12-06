import {
  sharedProps,
  dtPickerOnlyProps,
  dtCalendarOnlyProps,
  types
} from '../data/apiReference'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'

// Type links mapping
const typeLinks: Record<string, string> = {
  Day: '/types#day',
  Range: '/types#range',
  Multi: '/types#multi',
  Week: '/types#week',
  Time: '/types#time',
  TimeRange: '/types#timerange',
  CalendarLocale: '/types#calendarlocale',
  CalendarType: '/types#calendartype',
  DateInput: '/types#dateinput',
  InitValueInput: '/types#initvalueinput',
  CalendarConstraintsInput: '/types#calendarconstraintsinput',
  PresetRangesConfig: '/customization#preset-ranges'
}

// Function to render type with links
function renderTypeWithLinks(typeString: string) {
  // Split by common separators and punctuation
  const parts = typeString.split(/(\s+|[|&<>{}[\]()?,:=])/)

  return parts.map((part, index) => {
    const trimmedPart = part.trim()
    if (typeLinks[trimmedPart]) {
      return (
        <Link
          key={index}
          href={typeLinks[trimmedPart]}
          className='text-green-700 dark:text-accent-light hover:text-green-800 dark:hover:text-accent-light-hover underline'
        >
          {part}
        </Link>
      )
    }
    return part
  })
}

function PropsTable({ props }: { props: typeof sharedProps }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
        <thead className='bg-bg-tertiary'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Prop
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Default
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='bg-bg-secondary divide-y divide-border'>
          {props.map((prop, index) => (
            <tr
              key={prop.name}
              className={index % 2 === 0 ? '' : 'bg-bg-tertiary'}
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                {prop.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                <code>{renderTypeWithLinks(prop.type)}</code>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                {prop.default === 'Required' ? (
                  <em>Required</em>
                ) : (
                  <code>{renderTypeWithLinks(prop.default)}</code>
                )}
              </td>
              <td className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
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
        <PropsTable props={sharedProps} />

        <h3>DtPicker Only</h3>
        <p>
          These props are only available in <code>DtPicker</code>:
        </p>
        <PropsTable props={dtPickerOnlyProps} />

        {dtCalendarOnlyProps.length > 0 && (
          <>
            <h3>DtCalendar Only</h3>
            <p>
              These props are only available in <code>DtCalendar</code>:
            </p>
            <PropsTable props={dtCalendarOnlyProps} />
          </>
        )}

        <h2>Types</h2>

        {types.map((type) => (
          <div key={type.name}>
            <h3>{type.name}</h3>
            <div className='rounded-lg overflow-hidden border border-border'>
              <SyntaxHighlighter
                language='typescript'
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
              >
                {type.definition}
              </SyntaxHighlighter>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
