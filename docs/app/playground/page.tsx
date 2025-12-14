'use client'

import { Sandpack } from '@codesandbox/sandpack-react'
import { useState } from 'react'
import { CURRENT_VERSION } from '../config/version'

// App.js file with DtPicker (default)
const appCodeWithPicker = `import React, { useState } from 'react'
import './styles.css'
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/style.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleChange = (normalizedValue, jsDate, formattedString) => {
    setSelectedDate({
      normalized: normalizedValue,
      jsDate: jsDate,
      formatted: formattedString
    })
    console.log('Date selected:', { normalizedValue, jsDate, formattedString })
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>React Calendar DateTime Picker</h1>
        <p>Select a date using the picker below</p>
      </div>
      
      <div className="picker-wrapper">
        <DtPicker
          onChange={handleChange}
          placeholder="Select a date"
          calendarSystem="gregorian"
          showWeekend={true}
          todayBtn={true}
        />
      </div>

      {selectedDate && (
        <div className="result">
          <h2>Selected Date:</h2>
          <div className="result-content">
            <p><strong>Normalized:</strong> {JSON.stringify(selectedDate.normalized, null, 2)}</p>
            <p><strong>JS Date:</strong> {selectedDate.jsDate?.toString()}</p>
            <p><strong>Formatted:</strong> {selectedDate.formatted}</p>
          </div>
        </div>
      )}

      <div className="info">
        <p>💡 Try selecting different dates to see the output change!</p>
      </div>
    </div>
  )
}

export default App
`

// App.js file with DtCalendar
const appCodeWithCalendar = `import React, { useState } from 'react'
import './styles.css'
import { DtCalendar } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/style.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  const handleChange = (normalizedValue, jsDate, formattedString) => {
    setSelectedDate({
      normalized: normalizedValue,
      jsDate: jsDate,
      formatted: formattedString
    })
    console.log('Date selected:', { normalizedValue, jsDate, formattedString })
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>React Calendar DateTime Picker</h1>
        <p>Select a date using the calendar below</p>
      </div>
      
      <div className="picker-wrapper">
        <DtCalendar
          onChange={handleChange}
          calendarSystem="gregorian"
          showWeekend={true}
          todayBtn={true}
          dark={true}
        />
      </div>

      {selectedDate && (
        <div className="result">
          <h2>Selected Date:</h2>
          <div className="result-content">
            <p><strong>Normalized:</strong> {JSON.stringify(selectedDate.normalized, null, 2)}</p>
            <p><strong>JS Date:</strong> {selectedDate.jsDate?.toString()}</p>
            <p><strong>Formatted:</strong> {selectedDate.formatted}</p>
          </div>
        </div>
      )}

      <div className="info">
        <p>💡 Try selecting different dates to see the output change!</p>
      </div>
    </div>
  )
}

export default App
`

// Custom styles.css file
const stylesCode = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: auto;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100%;
  padding: 20px;
}

.app-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  animation: fadeIn 0.5s ease-in;
  min-height: fit-content;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.picker-wrapper {
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #e0e0e0;
}

.result {
  margin-top: 30px;
  padding: 20px;
  background: #f0f4ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.result h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.result-content {
  background: white;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.result-content p {
  margin: 10px 0;
  color: #444;
}

.result-content strong {
  color: #667eea;
}

.info {
  margin-top: 30px;
  padding: 15px;
  background: #fff3cd;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  text-align: center;
}

.info p {
  color: #856404;
  font-size: 1rem;
}
`

export default function Playground() {
  const [componentType, setComponentType] = useState<'picker' | 'calendar'>(
    'calendar'
  )

  const currentAppCode =
    componentType === 'picker' ? appCodeWithPicker : appCodeWithCalendar

  return (
    <div className='w-full h-[calc(100vh-3.5rem-4rem)] flex flex-col mb-8'>
      <div className='px-4 sm:px-6 py-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                Playground
              </h1>
              <span className='text-xs sm:text-sm bg-accent text-white px-2 py-1 rounded'>
                v{CURRENT_VERSION}
              </span>
            </div>
            <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>
              Experiment with DtPicker and DtCalendar components
            </p>
          </div>

          {/* Component Toggle */}
          <div className='flex items-center gap-3'>
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Component:
            </span>
            <div className='inline-flex rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1'>
              <button
                onClick={() => setComponentType('picker')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  componentType === 'picker'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                DtPicker
              </button>
              <button
                onClick={() => setComponentType('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  componentType === 'calendar'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                DtCalendar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='flex-1 min-h-0 rounded-lg overflow-hidden border-t border-gray-200 dark:border-gray-700'
        style={{ height: '100%' }}
      >
        <div
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Sandpack
            template='react'
            theme='dark'
            options={{
              showLineNumbers: true,
              editorHeight: '100%',
              editorWidthPercentage: 50,
              resizablePanels: true,
              showNavigator: true,
              showTabs: true,
              closableTabs: false,
              wrapContent: true,
              classes: {
                'sp-wrapper': 'h-full !h-full',
                'sp-layout': 'h-full !h-full',
                'sp-stack': 'h-full !h-full',
                'sp-preview-container': 'h-full !h-full',
                'sp-preview-iframe': 'h-full !h-full'
              }
            }}
            customSetup={{
              dependencies: {
                react: '^18.2.0',
                'react-dom': '^18.2.0',
                'react-calendar-datetime-picker': `^${CURRENT_VERSION}`
              },
              entry: '/src/index.js'
            }}
            files={{
              '/src/index.js': {
                code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
                hidden: true
              },
              '/src/App.js': {
                code: currentAppCode,
                active: true
              },
              '/src/styles.css': {
                code: stylesCode
              },
              '/index.html': {
                code: `<!DOCTYPE html>
<html lang="en" style="height: 100%;">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Calendar Playground</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #root {
        height: 100%;
        width: 100%;
      }
    </style>
  </head>
  <body style="height: 100%; margin: 0; padding: 0;">
    <div id="root" style="height: 100%; width: 100%;"></div>
  </body>
</html>`,
                hidden: true
              }
            }}
            key={componentType} // Force re-render when component type changes
          />
        </div>
      </div>
    </div>
  )
}
