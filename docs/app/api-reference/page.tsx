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

        <h3>DtPicker</h3>

        <p>
          A date picker component with an input field that opens a calendar
          modal. Supports all calendar types, locales, and customization
          options.
        </p>

        <h4>Props</h4>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
            <thead className='bg-bg-tertiary'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Prop
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Type
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Default
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Description
                </th>
              </tr>
            </thead>
            <tbody className='bg-bg-secondary divide-y divide-border'>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  initValue
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>InitValueInput</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Initial value for the date picker
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  onChange
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>(date: unknown) =&gt; void</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <em>Required</em>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Callback function called when date changes
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  type
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarType</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'single'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Calendar selection type
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  withTime
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Enable time selection
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  showTimeInput
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show time in input field
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  local
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarLocale</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'en'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Calendar locale
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  showWeekend
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show weekend highlighting
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  clearBtn
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show clear button
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  isRequired
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Make input required
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  todayBtn
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show today button
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  presetRanges
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>PresetRangesConfig</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Preset range buttons configuration
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  isDisabled
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Disable the picker
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  constraints
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarConstraintsInput</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Date constraints
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  placeholder
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'Select date'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Placeholder text
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  inputClass
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Custom CSS class for input
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  calenderModalClass
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Custom CSS class for calendar modal
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  autoClose
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>true</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Auto-close calendar after selection
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  inputId
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Input element ID
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  dateFormat
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Custom date format string
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  timeFormat
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'12' | '24'</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'24'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>Time format</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  numberOfMonths
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>1 | 2 | 3</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>1</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Number of months to display
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  customization
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarCustomization</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Customization options
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>DtCalendar</h3>

        <p>
          A standalone calendar component without an input field. Provides
          direct calendar interaction and supports all the same features as
          DtPicker.
        </p>

        <h4>Props</h4>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-border border border-border rounded-lg'>
            <thead className='bg-bg-tertiary'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Prop
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Type
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Default
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                  Description
                </th>
              </tr>
            </thead>
            <tbody className='bg-bg-secondary divide-y divide-border'>
              {/* DtCalendar props - similar to DtPicker but without input-specific props */}
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  initValue
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>InitValueInput</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Initial value for the calendar
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  onChange
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>(date: unknown) =&gt; void</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <em>Required</em>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Callback function called when date changes
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  type
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarType</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'single'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Calendar selection type
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  withTime
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Enable time selection
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  timeFormat
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'12' | '24'</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'24'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>Time format</td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  local
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarLocale</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>'en'</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Calendar locale
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  showWeekend
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show weekend highlighting
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  todayBtn
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Show today button
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  presetRanges
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>PresetRangesConfig</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Preset range buttons configuration
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  enlargeSelectedDay
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>true</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Enlarge selected day text
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  dark
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>boolean</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>false</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Enable dark theme
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  constraints
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarConstraintsInput</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Date constraints
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  calenderModalClass
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>string</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Custom CSS class for calendar
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  customization
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>CalendarCustomization</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Customization options
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  onError
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>(errors: CalendarError[]) =&gt; void</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>undefined</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Error callback function
                </td>
              </tr>
              <tr className='bg-bg-tertiary'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-white'>
                  numberOfMonths
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>1 | 2 | 3</code>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <code>1</code>
                </td>
                <td className='px-6 py-4 text-sm text-gray-300'>
                  Number of months to display
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Types</h2>

        <h3>CalendarType</h3>
        <pre>
          <code>{`type CalendarType = 'single' | 'range' | 'multi' | 'week'`}</code>
        </pre>

        <h3>CalendarLocale</h3>
        <pre>
          <code>{`type CalendarLocale = 'en' | 'fa'`}</code>
        </pre>

        <h3>DateInput</h3>
        <pre>
          <code>{`type DateInput = Day | Date | string | number`}</code>
        </pre>

        <h3>InitValueInput</h3>
        <pre>
          <code>{`type InitValueInput =
  | DateInput
  | { from: DateInput; to: DateInput }
  | DateInput[]
  | null`}</code>
        </pre>

        <h3>Day</h3>
        <pre>
          <code>{`interface Day {
  year: number
  month: number
  day: number
  fullDay?: string
  hour?: number
  minute?: number
}`}</code>
        </pre>

        <h3>Range</h3>
        <pre>
          <code>{`interface Range {
  from: Day
  to: Day
}`}</code>
        </pre>

        <h3>CalendarConstraintsInput</h3>
        <pre>
          <code>{`interface CalendarConstraintsInput {
  maxDate?: DateInput
  minDate?: DateInput
  disabledDates?: DateInput[]
  isDateDisabled?: (date: Day) => boolean
}`}</code>
        </pre>

        <h3>CalendarCustomization</h3>
        <pre>
          <code>{`interface CalendarCustomization {
  classes?: CalendarClasses
  icons?: CalendarIcons
  labels?: CalendarLabels
  monthNames?: string[]
  weekdayNames?: string[]
}`}</code>
        </pre>

        <h2>Utilities</h2>

        <p>
          The library exports various utility functions for date manipulation
          and formatting:
        </p>

        <h3>Date Conversion</h3>
        <ul>
          <li>
            <code>gregorianToJalali(date: Day): Day</code> - Convert Gregorian
            to Jalali date
          </li>
          <li>
            <code>jalaliToGregorian(date: Day): Day</code> - Convert Jalali to
            Gregorian date
          </li>
          <li>
            <code>getToday(locale?: CalendarLocale): Day</code> - Get today's
            date
          </li>
        </ul>

        <h3>Date Comparison</h3>
        <ul>
          <li>
            <code>
              isBefore(date: Day, compareDate: Day, locale?: CalendarLocale):
              boolean
            </code>
          </li>
          <li>
            <code>
              isAfter(date: Day, compareDate: Day, locale?: CalendarLocale):
              boolean
            </code>
          </li>
          <li>
            <code>
              isSameDay(date: Day, compareDate: Day, locale?: CalendarLocale):
              boolean
            </code>
          </li>
          <li>
            <code>
              isBetween(date: Day, startDate: Day, endDate: Day, locale?:
              CalendarLocale): boolean
            </code>
          </li>
        </ul>

        <h3>Date Manipulation</h3>
        <ul>
          <li>
            <code>
              addDays(date: Day, days: number, locale?: CalendarLocale): Day
            </code>
          </li>
          <li>
            <code>
              addMonths(date: Day, months: number, locale?: CalendarLocale): Day
            </code>
          </li>
          <li>
            <code>
              addYears(date: Day, years: number, locale?: CalendarLocale): Day
            </code>
          </li>
          <li>
            <code>
              subtractDays(date: Day, days: number, locale?: CalendarLocale):
              Day
            </code>
          </li>
          <li>
            <code>
              subtractMonths(date: Day, months: number, locale?:
              CalendarLocale): Day
            </code>
          </li>
          <li>
            <code>
              subtractYears(date: Day, years: number, locale?: CalendarLocale):
              Day
            </code>
          </li>
        </ul>

        <h3>Formatting</h3>
        <ul>
          <li>
            <code>
              formatDateForInput(date: Day | null, format?: string): string
            </code>
          </li>
          <li>
            <code>dayToString(date: Day, divider?: string): string</code>
          </li>
          <li>
            <code>toPersianNumeral(num: number): string</code>
          </li>
        </ul>
      </div>
    </div>
  )
}
