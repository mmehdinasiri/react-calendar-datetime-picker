import { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'
import './App.css'

function App() {
  const [singleDate, setSingleDate] = useState<Day | null>(null)

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Calendar DateTime Picker</h1>
        <p>Examples and Playground</p>
      </header>

      <main className="app-main">
        <section className="example-section">
          <h2>Single Date Picker</h2>
          <DtPicker
            onChange={(date: unknown) => setSingleDate(date as Day | null)}
            local="en"
            placeholder="Select a date"
          />
          {singleDate && (
            <p>
              Selected: {singleDate.year}-{singleDate.month}-{singleDate.day}
            </p>
          )}
        </section>

        <section className="example-section">
          <h2>Standalone Calendar</h2>
          <DtCalendar
            onChange={(date: unknown) => console.log(date)}
            local="en"
          />
        </section>
      </main>
    </div>
  )
}

export default App

