import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' fixed w-full z-20'>
      <nav className='flex items-center justify-between flex-wrap bg-teal p-4 bg-primary text-text-lightest'>
        <div className='flex items-center flex-no-shrink text-text-lightest mr-6'>
          <span className='text-xl text-text-lightest font-medium'>
            <Link to='/'>
              React calendar date-time picker{' '}
              <span className='text-xs ml-2'>v1.2.6</span>
            </Link>
          </span>
        </div>
        {/* <div className='block lg:hidden'>
        <button className='flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-text-lightest hover:border-text-lightest'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
      </div> */}
        <div className='flex-grow flex items-center w-auto text-right'>
          <div className='text-sm flex-grow'>
            <NavLink
              className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'
              // activeClassName='is-active'
              to='/docs/get-started'
            >
              Docs
            </NavLink>
            <NavLink
              className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'
              // activeClassName='is-active'
              to='/docs/Examples'
            >
              Examples
            </NavLink>
            <a
              className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'
              href='https://github.com/mmehdinasiri/react-calendar-datetime-picker'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </div>
          <div>
            {/* <a
            href='#'
            className='inline-block text-sm px-4 py-2 leading-none border rounded text-text-lightest border-text-text  mt-4 lg:mt-0 '
          >
            Download
          </a> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
