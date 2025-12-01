'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const Header = () => {
	const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsVersionDropdownOpen(false)
			}
		}

		if (isVersionDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isVersionDropdownOpen])

	return (
		<div className=' fixed w-full z-20'>
			<nav className='flex items-center justify-between flex-wrap bg-teal p-4 bg-primary text-text-lightest'>
				<div className='flex items-center flex-no-shrink text-text-lightest mr-6'>
					<Link href='/legacy' className='w-9 mr-2'>
						<img src='/logo-w.png' />
					</Link>
					<span className='text-xl text-text-lightest font-medium'>
						<Link href='/legacy' className='cursor-pointer'>
							React calendar date-time picker{' '}
						</Link>
					</span>
					<div className='relative ml-2' ref={dropdownRef}>
						<button
							onClick={(e) => {
								e.stopPropagation()
								setIsVersionDropdownOpen(!isVersionDropdownOpen)
							}}
							className='text-xs bg-white bg-opacity-20 text-text-lightest px-1.5 py-0.5 rounded hover:bg-opacity-30 transition-colors flex items-center gap-1'
							aria-label='Select version'
						>
							1.7.5
							<svg
								className={`h-3 w-3 transition-transform ${
									isVersionDropdownOpen ? 'transform rotate-180' : ''
								}`}
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</button>
						{isVersionDropdownOpen && (
							<div className='absolute top-full left-0 mt-1 bg-primary border border-text-lightest border-opacity-30 rounded-md shadow-lg z-50 min-w-[100px]'>
								<button
									onClick={(e) => {
										e.stopPropagation()
										setIsVersionDropdownOpen(false)
									}}
									className='w-full text-left px-3 py-2 text-xs text-text-lightest hover:bg-white hover:bg-opacity-10 transition-colors rounded-t-md'
								>
									1.7.5
								</button>
								<Link
									href='/'
									onClick={(e) => {
										e.stopPropagation()
										setIsVersionDropdownOpen(false)
									}}
									className='block w-full text-left px-3 py-2 text-xs text-text-lightest hover:bg-white hover:bg-opacity-10 transition-colors rounded-b-md border-t border-text-lightest border-opacity-30'
								>
									2.0.0
								</Link>
							</div>
						)}
					</div>
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
						<Link
							href='/legacy/docs/get-started'
							className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'
						>
							Docs
						</Link>
						<Link
							href='/legacy/docs/examples'
							className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'
						>
							Examples
						</Link>
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
