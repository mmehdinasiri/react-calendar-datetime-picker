/**
 * Renders the Locale category introduction with supported locales
 */
import React from 'react'
import { TypeDefinition } from '../components'

export const LocaleContent: React.FC = () => {
  return (
    <div className='mb-8 space-y-4'>
      <p className='text-gray-600 dark:text-gray-400 text-lg'>
        A locale determines the language and regional settings for the calendar
        component. When you set the{' '}
        <code className='px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded'>
          locale
        </code>{' '}
        prop, the calendar automatically adapts all UI text, including month
        names, weekday names, button labels, and number formatting to match the
        selected language. Each locale also configures the text direction (LTR
        or RTL) and number system (Latin or Persian numerals).
      </p>
      <div className='text-gray-600 dark:text-gray-400'>
        <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
          Supported Locales:
        </p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>
            <strong>English (en)</strong> - Default locale with Latin numbers,
            LTR direction, and English month/weekday names
          </li>
          <li>
            <strong>Persian (fa)</strong> - Persian/Farsi locale with Persian
            numerals, RTL direction, and Persian month/weekday names. Uses
            Jalali calendar system.
          </li>
          <li>
            <strong>German (de)</strong> - German locale with Latin numbers, LTR
            direction, and German month/weekday names
          </li>
          <li>
            <strong>Spanish (es)</strong> - Spanish locale with Latin numbers,
            LTR direction, and Spanish month/weekday names
          </li>
          <li>
            <strong>French (fr)</strong> - French locale with Latin numbers, LTR
            direction, and French month/weekday names
          </li>
        </ul>
      </div>
      <div className='mt-6'>
        <TypeDefinition
          definition={`type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'`}
        />
      </div>
    </div>
  )
}
