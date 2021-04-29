import React, { useState } from 'react'
import Link from 'next/link'
import { Layout } from '../Component'
import { DtCalendar } from 'react-calendar-datetime-picker'

const Home = () => {
	const [withoutInputEn, setWithoutInputEn] = useState(null)
	const [withoutInputFa, setWithoutInputFa] = useState(null)
	console.log(withoutInputFa, withoutInputEn)
	return (
		<Layout>
			<div className='mx-auto text-center '>
				<h1 className='text-4xl text-primary font-extrabold mb-2'>
					React Calendar Date-Time Picker
				</h1>
				<h2 className='text-lg text-primary font-medium '>
					The simple and fast Gregorian and Jalali calender for react
				</h2>
				<div className='md:flex justify-center	'>
					<div className='mx-auto md:mx-4 my-4 my-6'>
						<DtCalendar onChange={setWithoutInputEn} withTime />
					</div>
					<div className='mx-auto md:mx-4 my-4 my-6'>
						<DtCalendar
							onChange={setWithoutInputFa}
							withTime
							local='fa'
							type='range'
						/>
					</div>
				</div>
				<div>
					<Link href='/docs/get-started'>
						<a className='btn mr-2 font-bold'>Get Started</a>
					</Link>
					<a
						className='btn font-bold'
						target='_black'
						rel='noopener noreferrer'
						href='https://github.com/mmehdinasiri/react-calendar-datetime-picker'
					>
						Github
					</a>
				</div>
				<div className='mt-10'>
					<h3 className='text-3xl text-primary font-bold  mb-4'>Features</h3>
					<ul className='mx-auto table list-disc text-text'>
						<li className='text-left'>
							Supports Gregorian and Jalali calender
						</li>
						<li className='text-left'>Uses context api to share data</li>
						<li className='text-left'>
							Supports three types of calender: single day - date range -
							multiple dates
						</li>
						<li className='text-left'>Fully customizable</li>
						<li className='text-left'>Supports maximum and minimum dates </li>
						<li className='text-left'>
							Capability to add a list of disabled dates
						</li>
						<li className='text-left'>
							Supports time for single and range type
						</li>
						<li className='text-left'>Capability to mark weekends</li>
						<li className='text-left'>
							Function called for change, open and close events
						</li>
						<li className='text-left'>Supports Typescript</li>
					</ul>
				</div>
			</div>
		</Layout>
	)
}

export default Home
