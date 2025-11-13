import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import type { Day, CalendarError } from 'react-calendar-datetime-picker'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

function App() {
  const [singleDate, setSingleDate] = useState<Day | null>(null)
  const [errors, setErrors] = useState<CalendarError[]>([])

  const handleError = (errorList: CalendarError[]) => {
    setErrors(errorList)
    console.log('Calendar errors detected:', errorList)
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Calendar DateTime Picker</h1>
        <p>Examples and Playground</p>
      </header>

      <main className='app-main'>
        <section className='example-section'>
          <h2>Single Date Picker</h2>
          <DtPicker
            onChange={(date: unknown) => setSingleDate(date as Day | null)}
            local='en'
            placeholder='Select a date'
          />
          {singleDate && (
            <p>
              Selected: {singleDate.year}-{singleDate.month}-{singleDate.day}
            </p>
          )}
        </section>

        <section className='example-section'>
          <h2>Standalone Calendar</h2>
          <DtCalendar
            onChange={(date: unknown) => console.log(date)}
            // initValue={new Date()}
          />
        </section>

        <section className='example-section'>
          <h2>Persian (Jalali) Calendar</h2>
          <p className='description'>
            Calendar with Persian locale (fa) - displays Jalali calendar with
            Persian month names and RTL layout
          </p>
          <div className='calendar-container'>
            <DtCalendar
              onChange={(date: unknown) => console.log('Persian date:', date)}
              local='fa'
              showWeekend={true}
              todayBtn={true}
            />
          </div>
        </section>

        <section className='example-section'>
          <h2>Persian Date Picker</h2>
          <p className='description'>
            Date picker with Persian locale - input field with Jalali calendar
          </p>
          <div className='picker-container'>
            <DtPicker
              onChange={(date: unknown) =>
                console.log('Persian picker date:', date)
              }
              local='fa'
              placeholder='تاریخ را انتخاب کنید'
              showWeekend={true}
              todayBtn={true}
            />
          </div>
        </section>

        {/* Error Handling Examples */}
        <section className='example-section'>
          <h2>Error Handling Examples</h2>
          <p className='description'>
            These examples demonstrate how the calendar handles invalid inputs
            gracefully. Check the browser console for warnings in development
            mode.
          </p>

          {/* Invalid initValue */}
          <div className='example-item'>
            <h3>1. Invalid initValue</h3>
            <p>Calendar with invalid date string - will normalize to null</p>
            <div className='calendar-container'>
              <DtCalendar
                initValue='invalid-date-string'
                onChange={(date: unknown) => console.log(date)}
                local='en'
                onError={handleError}
              />
            </div>
          </div>

          {/* Invalid maxDate */}
          <div className='example-item'>
            <h3>2. Invalid maxDate</h3>
            <p>Calendar with invalid maxDate - validation will be ignored</p>
            <div className='calendar-container'>
              <DtCalendar
                onChange={(date: unknown) => console.log(date)}
                local='en'
                constraints={{
                  maxDate: 'not-a-valid-date'
                }}
                onError={handleError}
              />
            </div>
          </div>

          {/* Invalid disabledDates */}
          <div className='example-item'>
            <h3>3. Invalid disabledDates</h3>
            <p>
              Some dates in disabledDates array are invalid - only valid ones
              will be disabled
            </p>
            <div className='calendar-container'>
              <DtCalendar
                onChange={(date: unknown) => console.log(date)}
                local='en'
                constraints={{
                  disabledDates: [
                    { year: 2024, month: 12, day: 25 }, // Valid
                    'invalid-date', // Invalid - will be skipped
                    { year: 2024, month: 13, day: 1 }, // Invalid month - will be skipped
                    new Date(2024, 11, 31) // Valid Date object
                  ]
                }}
                onError={handleError}
              />
            </div>
          </div>

          {/* Multiple errors */}
          <div className='example-item'>
            <h3>4. Multiple Errors</h3>
            <p>
              Calendar with multiple invalid inputs - all errors are collected
            </p>
            <div className='calendar-container'>
              <DtCalendar
                initValue='bad-init-value'
                onChange={(date: unknown) => console.log(date)}
                local='en'
                constraints={{
                  maxDate: 'bad-max-date',
                  minDate: { year: 2024, month: 15, day: 1 }, // Invalid month
                  disabledDates: ['invalid-1', 'invalid-2']
                }}
                onError={handleError}
              />
            </div>
          </div>

          {/* Error Display */}
          {errors.length > 0 && (
            <div className='error-display'>
              <h3>Errors Detected:</h3>
              <div className='error-list'>
                {errors.map((error, index) => (
                  <div key={index} className='error-item'>
                    <strong>Field:</strong> {error.field}
                    <br />
                    <strong>Type:</strong> {error.type}
                    <br />
                    <strong>Message:</strong> {error.message}
                    <br />
                    <strong>Value:</strong>{' '}
                    <code>{JSON.stringify(error.value)}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
