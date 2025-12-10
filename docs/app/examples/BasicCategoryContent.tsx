/**
 * Renders the Basic category introduction with component descriptions
 */
import React from 'react'

export const BasicCategoryContent: React.FC = () => {
  return (
    <div className='mb-8 space-y-4'>
      <p className='text-gray-600 dark:text-gray-400 text-lg'>
        React Calendar DateTime Picker provides two main components for
        different use cases:
      </p>
      <div className='text-gray-600 dark:text-gray-400 space-y-4'>
        <div>
          <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
            <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
              DtPicker
            </code>
          </p>
          <p>
            A date picker component with an input field that opens a calendar in
            a modal/popup when clicked. Perfect for forms and scenarios where
            you need a compact input that reveals the calendar on demand. The
            input field displays the selected date in a formatted string, while
            the component internally works with{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              Day
            </code>{' '}
            objects.
          </p>
          <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
            <li>Includes an input field with placeholder</li>
            <li>Opens calendar in a modal/popup</li>
            <li>Supports clear button and validation</li>
            <li>Can show time in the input field</li>
            <li>Ideal for forms and compact UI spaces</li>
          </ul>
        </div>
        <div>
          <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
            <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
              DtCalendar
            </code>
          </p>
          <p>
            A standalone calendar component that displays the calendar directly
            in the page. Perfect for dashboards, calendar views, and scenarios
            where you want the calendar always visible. The component works
            directly with{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              Day
            </code>{' '}
            objects and provides full calendar functionality.
          </p>
          <ul className='list-disc list-inside space-y-1 ml-4 mt-2'>
            <li>Always visible calendar display</li>
            <li>No input field or modal</li>
            <li>Direct calendar interaction</li>
            <li>Perfect for dashboards and calendar views</li>
            <li>Supports all selection types and features</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
