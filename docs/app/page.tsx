export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
      <div className='max-w-4xl mx-auto px-4 py-16 text-center'>
        <div className='mb-8'>
          <h1 className='text-5xl font-bold text-gray-900 mb-4'>
            React Calendar DateTime Picker
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            A modern, fast and small calendar for React with English and Persian
            (Jalali) support
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Welcome to the New Documentation
          </h2>
          <p className='text-gray-600 mb-6'>
            This is the documentation for the latest version (v2.x) of
            react-calendar-datetime-picker. The new version includes improved
            performance, better TypeScript support, and enhanced features.
          </p>

          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
            <div className='flex'>
              <div className='ml-3'>
                <p className='text-sm text-yellow-700'>
                  <strong>Note:</strong> This documentation is currently under
                  development. For the complete documentation of the previous
                  version (v1.7.5), please visit the legacy docs.
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/legacy'
              className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
            >
              View Legacy Documentation (v1.7.5)
            </a>
          </div>
        </div>

        <div className='text-gray-500 text-sm'>
          <p>Current version: v2.0.0 | Legacy version: v1.7.5</p>
        </div>
      </div>
    </div>
  )
}
