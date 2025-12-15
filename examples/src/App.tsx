import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
// Import the library styles
import 'react-calendar-datetime-picker/style.css'
import './App.css'

function App() {
  const [pickerDate, setPickerDate] = useState(null)
  const [calendarDate, setCalendarDate] = useState(null)

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>React Calendar DateTime Picker</h1>
        <p>Examples and Playground</p>
      </header>

      <main className='app-main'>
        {/* DtPicker Example */}
        <section className='example-section'>
          <h2>DtPicker Example</h2>
          <p className='description'>
            DtPicker is a date picker component with an input field that opens a
            calendar modal when clicked.
          </p>
          <div className='picker-container'>
            <DtPicker
              initValue={pickerDate}
              onChange={setPickerDate}
              placeholder='Select a date'
              clearBtn
              todayBtn
            />
          </div>
          {pickerDate && (
            <div className='result-display'>
              <strong>Selected Date:</strong>{' '}
              {JSON.stringify(pickerDate, null, 2)}
            </div>
          )}
        </section>

        {/* DtCalendar Example */}
        <section className='example-section'>
          <h2>DtCalendar Example</h2>
          <p className='description'>
            DtCalendar is a standalone calendar component without an input
            field.
          </p>
          <div className='calendar-container'>
            <DtCalendar
              initValue={calendarDate}
              onChange={setCalendarDate}
              todayBtn
            />
          </div>
          {calendarDate && (
            <div className='result-display'>
              <strong>Selected Date:</strong>{' '}
              {JSON.stringify(calendarDate, null, 2)}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
