import React, { useState } from 'react'
import { DtPicker, DtCalendar } from 'react-calendar-datetime-picker'
import type { Day } from 'react-calendar-datetime-picker'

function CustomTriggersExample() {
  const [date1, setDate1] = useState<Day | null>(null)
  const [date2, setDate2] = useState<Day | null>(null)
  const [date3, setDate3] = useState<Day | null>(null)
  const [date4, setDate4] = useState<Day | null>(null)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Custom Trigger Elements Example</h1>
      <p>
        The DtPicker now supports custom trigger elements instead of just input
        fields!
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h2>1. Default Input (unchanged behavior)</h2>
        <DtPicker
          onChange={setDate1}
          placeholder='Select a date...'
          calendarSystem='gregorian'
        />
        <p>Selected: {date1 ? date1.toString() : 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>2. Custom Button Trigger</h2>
        <DtPicker
          onChange={setDate2}
          triggerElement={
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              📅 Pick Date
            </button>
          }
          calendarSystem='gregorian'
        />
        <p>Selected: {date2 ? date2.toString() : 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>3. Custom Div with Icon</h2>
        <DtPicker
          onChange={setDate3}
          triggerElement={
            <div
              style={{
                padding: '12px',
                border: '2px solid #ccc',
                borderRadius: '6px',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '200px'
              }}
            >
              <span>🗓️</span>
              <span>{date3 ? date3.toString() : 'Click to select date'}</span>
              <span style={{ marginLeft: 'auto' }}>▼</span>
            </div>
          }
          calendarSystem='gregorian'
        />
        <p>Selected: {date3 ? date3.toString() : 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>4. Custom Styled Input</h2>
        <DtPicker
          onChange={setDate4}
          triggerElement={
            <input
              type='text'
              placeholder='Custom styled input...'
              style={{
                padding: '10px',
                border: '2px solid #28a745',
                borderRadius: '20px',
                fontSize: '16px',
                width: '250px',
                outline: 'none'
              }}
              readOnly
            />
          }
          calendarSystem='gregorian'
        />
        <p>Selected: {date4 ? date4.toString() : 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>5. Integration with Form Libraries</h2>
        <p>
          You can now easily integrate with form libraries like React Hook Form:
        </p>
        <pre
          style={{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderRadius: '4px'
          }}
        >
          {`// Example with React Hook Form
const { control, setValue } = useForm()

<DtPicker
  onChange={(date) => setValue('birthDate', date)}
  triggerElement={
    <Controller
      name="birthDate"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          placeholder="Birth date"
          style={{ padding: '8px', border: '1px solid #ccc' }}
        />
      )}
    />
  }
/>`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>6. Advanced Custom Trigger with State</h2>
        <DtPicker
          onChange={setDate1}
          triggerElement={<CustomTriggerButton selectedDate={date1} />}
          calendarSystem='gregorian'
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>7. Still works with DtCalendar (unchanged)</h2>
        <DtCalendar onChange={setDate2} calendarSystem='gregorian' />
      </div>
    </div>
  )
}

// Custom component example
function CustomTriggerButton({ selectedDate }: { selectedDate: Day | null }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s'
      }}
    >
      <span style={{ fontSize: '20px' }}>📅</span>
      <div>
        <div style={{ fontWeight: 'bold' }}>Select Date</div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          {selectedDate ? selectedDate.toString() : 'No date selected'}
        </div>
      </div>
      <span style={{ marginLeft: 'auto', fontSize: '12px' }}>▼</span>
    </div>
  )
}

export default CustomTriggersExample
