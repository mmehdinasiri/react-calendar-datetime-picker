import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-bg-primary'>
      {/* Hero Section */}
      <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
        <div className='text-center max-w-3xl'>
          {/* Logo */}
          <div className='mb-8 flex justify-center'>
            <img
              src='/favicon/android-chrome-96x96.png'
              alt='React Calendar DateTime Picker Logo'
              className='w-24 h-24'
            />
          </div>

          {/* Title */}
          <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-4'>
            React Calendar DateTime Picker
          </h1>

          {/* Tagline */}
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
            The library for web and native user interfaces with dual calendar
            support
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

      {/* Main Content Section */}
      <div className='max-w-4xl mx-auto px-6 py-16'>
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
