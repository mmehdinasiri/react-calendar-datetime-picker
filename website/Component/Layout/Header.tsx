import React from 'react'
import Link from 'next/link'

const Header = () => {
	return (
		<div className=' fixed w-full z-20'>
			<nav className='flex items-center justify-between flex-wrap bg-teal p-4 bg-primary text-text-lightest'>
				<div className='flex items-center flex-no-shrink text-text-lightest mr-6'>
					<Link href='/'>
						<a className='w-9 mr-2'>
							<img src={`${process.env.prefix}/logo-w.png`} />
						</a>
					</Link>
					<span className='text-xl text-text-lightest font-medium'>
						<Link href='/'>
							<a className='cursor-pointer'>
								React calendar date-time picker{' '}
								<span className='text-xs ml-1'>v1.5.6</span>
							</a>
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
						<Link href='/docs/get-started'>
							<a className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'>
								Docs
							</a>
						</Link>
						<Link href='/docs/examples'>
							<a className='block inline-block mt-0 text-text-lightest hover:text-white mr-4 font-extralight'>
								Examples
							</a>
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
