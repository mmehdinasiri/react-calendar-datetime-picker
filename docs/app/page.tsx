'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DtCalendar } from 'react-calendar-datetime-picker'
import type { InitValueInput } from 'react-calendar-datetime-picker'

const features = [
  {
    title: 'Dual Calendar Support',
    description:
      'Native support for both Gregorian and Jalali (Persian) calendars with automatic locale handling and seamless switching.'
  },
  {
    title: 'Flexible Selection Modes',
    description:
      'Single date, date range, multi-date, and week selection modes to accommodate various use cases and workflows.'
  },
  {
    title: 'Time Selection Support',
    description:
      'Full time picker integration with 12-hour and 24-hour formats, supporting hours and minutes for precise datetime input.'
  },

  {
    title: 'Preset Date Ranges',
    description:
      'Built-in preset buttons for common ranges (Yesterday, Last 7/30 days, This/Last month) with support for custom presets.'
  },
  {
    title: 'Advanced Constraints',
    description:
      'Set minimum and maximum dates, disable specific dates, and use custom validation functions for precise date control.'
  },
  {
    title: 'Multiple Months Display',
    description:
      'Display multiple calendar months side by side for better range selection and improved user experience.'
  },
  {
    title: 'Week Customization',
    description:
      'Customize week start day (Sunday-Saturday), weekend highlighting, and weekday names for different regional preferences.'
  },

  {
    title: 'Enhanced TypeScript Support',
    description:
      'Better type definitions, improved IntelliSense, and stricter type checking for a more robust development experience.'
  },
  {
    title: 'CSS Variables Support',
    description:
      'Easy theming with CSS custom properties for colors and styling, enabling seamless theme integration and customization.'
  },
  {
    title: 'Dark Mode Support',
    description:
      'Built-in dark theme with automatic detection and seamless integration with your application theme.'
  },

  {
    title: 'Internationalization (i18n)',
    description:
      'Full locale support for English, Persian, German, Spanish, and French with RTL support, custom translations, and localized formatting.'
  },
  {
    title: 'Extended Utility Functions',
    description:
      'Comprehensive date manipulation utilities for complex use cases, calendar conversions, and advanced date operations.'
  },
  {
    title: 'Better Performance',
    description:
      'Optimized rendering, memoization, and reduced bundle size for faster loading and smoother interactions.'
  },
  {
    title: 'Enhanced Customization',
    description:
      'Custom icons, labels, translations, CSS classes, and component styling to match your exact design requirements.'
  },

  {
    title: 'Rich Event System',
    description:
      'Comprehensive callback system for date selection, month/year navigation, view changes, and user interactions.'
  },

  {
    title: 'Custom Trigger Elements',
    description:
      'Use any React element as a trigger for the date picker, enabling complete control over input styling and behavior.'
  },

  {
    title: 'Improved Accessibility',
    description:
      'Full keyboard navigation, ARIA labels, focus management, and screen reader support for WCAG 2.1 Level AA compliance.'
  },
  {
    title: 'Input-less Mode',
    description:
      'Display standalone calendars without input fields for embedded scenarios, dashboards, and custom UI designs.'
  }
]

export default function Home() {
  const [lightDate, setLightDate] = useState<InitValueInput | undefined>(
    undefined
  )
  const [darkDate, setDarkDate] = useState<InitValueInput | undefined>(
    undefined
  )
  return (
    <div className='min-h-screen bg-bg-primary'>
      {/* Hero Section */}
      <div className='flex flex-col items-center justify-center min-h-[42vh] px-4 pb-6'>
        <div className='text-center max-w-3xl'>
          {/* Logo */}
          <div className='mb-8 flex justify-center'>
            <img
              src='/next-logo.png'
              alt='React Calendar DateTime Picker Logo'
              className='w-24 h-24'
            />
          </div>

          {/* Title */}
          <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-4 whitespace-nowrap'>
            React Calendar DateTime Picker
          </h1>

          {/* Tagline */}
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-4'>
            The library for web and native user interfaces with comprehensive
            calendar support
          </p>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
            Supports <strong>Jalali (Persian)</strong> and{' '}
            <strong>Gregorian</strong> calendar systems with{' '}
            <strong>single</strong>, <strong>range</strong>,{' '}
            <strong>multi-date</strong>, and <strong>week</strong> selection
            modes.
          </p>

          {/* CTA Buttons */}
          <div className='flex items-center justify-center gap-4'>
            <Link
              href='/getting-started'
              className='bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-md font-medium transition-colors'
            >
              Learn React Calendar
            </Link>
            <Link
              href='/api-reference'
              className='bg-transparent border border-border hover:border-accent text-gray-900 dark:text-white px-6 py-3 rounded-md font-medium transition-colors'
            >
              API Reference
            </Link>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className='max-w-6xl mx-auto px-6 pb-10 home-page-calendar-container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Example 1: Basic Light Calendar with EN locale */}
          <div className='bg-bg-secondary rounded-lg border border-border p-6'>
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
              Basic Light Calendar (EN)
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              A simple calendar component with light theme and English locale
            </p>
            <div className='calendar-container mb-4'>
              <DtCalendar
                initValue={lightDate}
                onChange={setLightDate}
                calendarSystem='gregorian'
                showWeekend={true}
                todayBtn={true}
              />
            </div>
          </div>

          {/* Example 2: Basic Dark Theme with FA locale */}
          <div className='bg-bg-secondary rounded-lg border border-border p-6'>
            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
              Basic Dark Calendar (FA)
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>
              A calendar component with dark theme and Persian (Jalali) locale
            </p>
            <div className='calendar-container mb-4'>
              <DtCalendar
                initValue={darkDate}
                onChange={setDarkDate}
                dark={true}
                calendarSystem='jalali'
                locale='fa'
                showWeekend={true}
                todayBtn={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='max-w-4xl mx-auto px-6 pt-8 pb-16'>
        <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-6'>
          Create user interfaces from components
        </h2>
        <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
          React Calendar DateTime Picker lets you build date and time selection
          interfaces out of individual pieces called components. Create your own
          calendar components like{' '}
          <span className='bg-bg-tertiary px-2 py-1 rounded text-accent-light'>
            DtPicker
          </span>
          ,
          <span className='bg-bg-tertiary px-2 py-1 rounded text-accent-light'>
            DtCalendar
          </span>
          , and
          <span className='bg-bg-tertiary px-2 py-1 rounded text-accent-light'>
            DateRange
          </span>
          . Then combine them into entire screens, pages, and apps.
        </p>
      </div>

      {/* New Features in v2.x Section */}
      <div id='new-features-v2x' className='max-w-6xl mx-auto px-6 pb-16'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            New Features in v2.x
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Discover the enhanced capabilities and improvements in the latest
            version
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='border border-accent bg-bg-secondary p-6 rounded-lg'
            >
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
