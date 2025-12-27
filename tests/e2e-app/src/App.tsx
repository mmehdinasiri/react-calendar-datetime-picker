/**
 * E2E Test App for React Calendar DateTime Picker
 *
 * This is a dedicated test application for E2E tests.
 * It provides stable test scenarios and test IDs for reliable testing.
 *
 * IMPORTANT: This app should remain stable and not be modified for development purposes.
 * Use the examples/ directory for development and experimentation.
 */

import { useState } from 'react'
import {
  DtPicker,
  DtCalendar,
  Day,
  Range
} from 'react-calendar-datetime-picker'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

function App() {
  // DtPicker states
  const [pickerDate, setPickerDate] = useState<Day | null>(null)
  const [pickerDateGregorian, setPickerDateGregorian] = useState<Day | null>(
    null
  )
  const [pickerDateJalali, setPickerDateJalali] = useState<Day | null>(null)
  const [pickerRange, setPickerRange] = useState<Range | null>(null)

  // DtCalendar states
  const [calendarDate, setCalendarDate] = useState<Day | null>(null)
  const [calendarDateGregorian, setCalendarDateGregorian] =
    useState<Day | null>(null)
  const [calendarDateJalali, setCalendarDateJalali] = useState<Day | null>(null)

  return (
    <div className='e2e-test-app'>
      <header className='test-header'>
        <h1>E2E Test App</h1>
        <p>Stable test environment for React Calendar DateTime Picker</p>
      </header>

      <main className='test-main'>
        {/* DtPicker - Basic */}
        <section className='test-section' data-testid='dtpicker-basic-section'>
          <h2 data-testid='dtpicker-basic-title'>DtPicker Basic</h2>
          <p className='test-description'>
            Basic DtPicker with Jalali calendar system, clear button, and today
            button.
          </p>
          <div
            className='test-container'
            data-testid='dtpicker-basic-container'
          >
            <DtPicker
              data-testid='dtpicker-basic'
              initValue={pickerDate}
              onChange={setPickerDate}
              placeholder='Select a date'
              calendarSystem='jalali'
              clearBtn
              todayBtn
            />
          </div>
          {pickerDate && (
            <div className='test-result' data-testid='dtpicker-basic-result'>
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtpicker-basic-result-value'>
                {JSON.stringify(pickerDate, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtPicker - Gregorian */}
        <section
          className='test-section'
          data-testid='dtpicker-gregorian-section'
        >
          <h2 data-testid='dtpicker-gregorian-title'>DtPicker Gregorian</h2>
          <p className='test-description'>
            DtPicker with Gregorian calendar system.
          </p>
          <div
            className='test-container'
            data-testid='dtpicker-gregorian-container'
          >
            <DtPicker
              data-testid='dtpicker-gregorian'
              initValue={pickerDateGregorian}
              onChange={setPickerDateGregorian}
              placeholder='Select a date'
              calendarSystem='gregorian'
              clearBtn
            />
          </div>
          {pickerDateGregorian && (
            <div
              className='test-result'
              data-testid='dtpicker-gregorian-result'
            >
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtpicker-gregorian-result-value'>
                {JSON.stringify(pickerDateGregorian, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtPicker - Jalali */}
        <section className='test-section' data-testid='dtpicker-jalali-section'>
          <h2 data-testid='dtpicker-jalali-title'>DtPicker Jalali</h2>
          <p className='test-description'>
            DtPicker with Jalali calendar system.
          </p>
          <div
            className='test-container'
            data-testid='dtpicker-jalali-container'
          >
            <DtPicker
              data-testid='dtpicker-jalali'
              initValue={pickerDateJalali}
              onChange={setPickerDateJalali}
              placeholder='Select a date'
              calendarSystem='jalali'
              clearBtn
            />
          </div>
          {pickerDateJalali && (
            <div className='test-result' data-testid='dtpicker-jalali-result'>
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtpicker-jalali-result-value'>
                {JSON.stringify(pickerDateJalali, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtPicker - Range */}
        <section className='test-section' data-testid='dtpicker-range-section'>
          <h2 data-testid='dtpicker-range-title'>DtPicker Range</h2>
          <p className='test-description'>
            DtPicker with range selection type.
          </p>
          <div
            className='test-container'
            data-testid='dtpicker-range-container'
          >
            <DtPicker
              data-testid='dtpicker-range'
              type='range'
              initValue={pickerRange}
              onChange={setPickerRange}
              placeholder='Select date range'
              calendarSystem='gregorian'
            />
          </div>
          {pickerRange && (
            <div className='test-result' data-testid='dtpicker-range-result'>
              <strong>Selected Range:</strong>{' '}
              <span data-testid='dtpicker-range-result-value'>
                {JSON.stringify(pickerRange, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtCalendar - Basic */}
        <section
          className='test-section'
          data-testid='dtcalendar-basic-section'
        >
          <h2 data-testid='dtcalendar-basic-title'>DtCalendar Basic</h2>
          <p className='test-description'>
            Basic DtCalendar with today button enabled.
          </p>
          <div
            className='test-container'
            data-testid='dtcalendar-basic-container'
          >
            <DtCalendar
              data-testid='dtcalendar-basic'
              initValue={calendarDate}
              onChange={setCalendarDate}
              todayBtn
            />
          </div>
          {calendarDate && (
            <div className='test-result' data-testid='dtcalendar-basic-result'>
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtcalendar-basic-result-value'>
                {JSON.stringify(calendarDate, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtCalendar - Gregorian */}
        <section
          className='test-section'
          data-testid='dtcalendar-gregorian-section'
        >
          <h2 data-testid='dtcalendar-gregorian-title'>DtCalendar Gregorian</h2>
          <p className='test-description'>
            DtCalendar with Gregorian calendar system.
          </p>
          <div
            className='test-container'
            data-testid='dtcalendar-gregorian-container'
          >
            <DtCalendar
              data-testid='dtcalendar-gregorian'
              initValue={calendarDateGregorian}
              onChange={setCalendarDateGregorian}
              calendarSystem='gregorian'
              todayBtn
              showWeekend
            />
          </div>
          {calendarDateGregorian && (
            <div
              className='test-result'
              data-testid='dtcalendar-gregorian-result'
            >
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtcalendar-gregorian-result-value'>
                {JSON.stringify(calendarDateGregorian, null, 2)}
              </span>
            </div>
          )}
        </section>

        {/* DtCalendar - Jalali */}
        <section
          className='test-section'
          data-testid='dtcalendar-jalali-section'
        >
          <h2 data-testid='dtcalendar-jalali-title'>DtCalendar Jalali</h2>
          <p className='test-description'>
            DtCalendar with Jalali calendar system (RTL).
          </p>
          <div
            className='test-container'
            data-testid='dtcalendar-jalali-container'
          >
            <DtCalendar
              data-testid='dtcalendar-jalali'
              initValue={calendarDateJalali}
              onChange={setCalendarDateJalali}
              calendarSystem='jalali'
              todayBtn
              showWeekend
            />
          </div>
          {calendarDateJalali && (
            <div className='test-result' data-testid='dtcalendar-jalali-result'>
              <strong>Selected Date:</strong>{' '}
              <span data-testid='dtcalendar-jalali-result-value'>
                {JSON.stringify(calendarDateJalali, null, 2)}
              </span>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
