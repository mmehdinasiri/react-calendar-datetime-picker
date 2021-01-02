import React from 'react'

const Header = () => {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-teal p-4 '>
      <div className='flex items-center flex-no-shrink text-white mr-6'>
        <span className='text-xl text-text-light font-medium'>
          React date-time picker
        </span>
      </div>
      <div className='block lg:hidden'>
        {/* <button className='flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button> */}
      </div>
      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-sm lg:flex-grow'>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-text-light hover:text-text mr-4 font-extralight'
          >
            Docs
          </a>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-text-light hover:text-text mr-4 font-extralight'
          >
            Examples
          </a>
          <a
            href='#responsive-header'
            className='block mt-4 lg:inline-block lg:mt-0 text-text-light hover:text-text font-extralight'
          >
            github
          </a>
        </div>
        <div>
          <a
            href='#'
            className='inline-block text-sm px-4 py-2 leading-none border rounded text-text-light border-text-text  mt-4 lg:mt-0 '
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
