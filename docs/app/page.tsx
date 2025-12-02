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
            The library for web and native user interfaces with dual calendar
            support
          </p>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
            The calendar supports both <strong>Jalali (Persian)</strong> and{' '}
            <strong>Gregorian</strong> calendar systems.
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
    </div>
  )
}
