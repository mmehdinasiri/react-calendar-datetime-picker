'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DtCalendar } from 'react-calendar-datetime-picker'
import type { InitValueInput } from 'react-calendar-datetime-picker'

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
      <div className='flex flex-col items-center justify-center min-h-[50vh] px-4 pb-8'>
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
            The library for web and native user interfaces with comprehensive calendar
            support
          </p>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
            Supports <strong>Jalali (Persian)</strong> and <strong>Gregorian</strong> calendar systems
            with <strong>single</strong>, <strong>range</strong>, <strong>multi-date</strong>, and <strong>week</strong> selection modes.
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
      <div className='max-w-6xl mx-auto px-6 pt-8 pb-8 home-page-calendar-container'>
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
                local='en'
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
                local='fa'
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
          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Enhanced TypeScript Support
            </h3>
            <p className='text-sm text-gray-300'>
              Better type definitions, improved IntelliSense, and stricter type
              checking for a more robust development experience.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Improved Accessibility
            </h3>
            <p className='text-sm text-gray-300'>
              Better keyboard navigation, ARIA labels, and screen reader support
              for inclusive user experiences.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              CSS Variables Support
            </h3>
            <p className='text-sm text-gray-300'>
              Easy theming with CSS custom properties for colors and styling,
              enabling seamless theme integration.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Better Performance
            </h3>
            <p className='text-sm text-gray-300'>
              Optimized rendering and reduced bundle size for faster loading and
              smoother interactions.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Extended Utility Functions
            </h3>
            <p className='text-sm text-gray-300'>
              More date manipulation utilities for complex use cases and
              advanced date operations.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Enhanced Customization
            </h3>
            <p className='text-sm text-gray-300'>
              More options for icons, labels, and component styling to match
              your design requirements.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Time Selection Support
            </h3>
            <p className='text-sm text-gray-300'>
              Full time picker integration with date selection, supporting hours
              and minutes for precise datetime input.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Dual Calendar Support
            </h3>
            <p className='text-sm text-gray-300'>
              Native support for both Gregorian and Jalali (Persian) calendars
              with automatic locale handling.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Flexible Selection Modes
            </h3>
            <p className='text-sm text-gray-300'>
              Single date, date range, and multi-date selection modes to
              accommodate various use cases.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Advanced Constraints
            </h3>
            <p className='text-sm text-gray-300'>
              Set minimum and maximum dates, disable specific dates, and control
              selectable date ranges.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Rich Event System
            </h3>
            <p className='text-sm text-gray-300'>
              Comprehensive callback system for open, close, and change events
              with full control over user interactions.
            </p>
          </div>

          <div className='border border-accent bg-bg-secondary p-6 rounded-lg'>
            <h3 className='text-lg font-semibold text-white mb-3'>
              Input-less Mode
            </h3>
            <p className='text-sm text-gray-300'>
              Display calendars without input fields for embedded or custom
              input scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
