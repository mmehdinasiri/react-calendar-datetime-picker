import { useState } from 'react'
import { DocLayout } from '../../Component'
import tomorrowNightEighties from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow-night-eighties'
import { convertToEnStr, convertToFaStr } from '../../Constant/sampleString'
import {
	DtPicker,
	convertToFa,
	convertToEn
} from 'react-calendar-datetime-picker'
import dynamic from 'next/dynamic'
const Light = dynamic(() => import('react-syntax-highlighter'), {
	ssr: false
})
const Utilities = () => {
	const [convertToEnDate, setConvertToEnDate] = useState(null)
	const [convertToFaDate, setConvertToFaDate] = useState(null)
	return (
		<DocLayout>
			<section className=''>
				<h1 className='text-3xl mb-6'>Utilities:</h1>
				<p className='text-lg'>
					One can import and use these two functions to convert Gregorian date
					to Jalali date and vice versa.
					<br />
					These functions accept date object as the first argument and divider
					sign as the second argument ('/' is the default value).
				</p>
				<div className='mt-10'>
					<div className='mb-10 pb-4 border-b border-primary border-opacity-50 '>
						<h3
							id='selectSingleDay'
							className='text-2xl font-bold mb-4 scroll-offset font-semibold'
						>
							convertToFa( dateObj, '/' )
						</h3>
						<div className='block xl:flex '>
							<div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
								<Light
									className='rounded'
									style={tomorrowNightEighties}
									language='javascript'
								>
									{convertToFaStr}
								</Light>
							</div>
							<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
								<DtPicker onChange={setConvertToEnDate} />
								value: <pre>{JSON.stringify(convertToEnDate, null, 2)}</pre>
								<br />
								converted value:
								<pre>
									{JSON.stringify(convertToFa(convertToEnDate), null, 2)}
								</pre>
							</div>
						</div>
					</div>
					<div className='mb-10 pb-4'>
						<h3
							id='selectSingleDay'
							className='text-2xl font-bold mb-4 scroll-offset font-semibold'
						>
							convertToEn(dateObj, '-')
						</h3>
						<div className='block xl:flex '>
							<div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
								<Light
									className='rounded'
									style={tomorrowNightEighties}
									language='javascript'
								>
									{convertToEnStr}
								</Light>
							</div>
							<div className='w-2/2 lg:w-1/4 xl:w-1/2'>
								<DtPicker onChange={setConvertToFaDate} withTime local='fa' />
								value: <pre>{JSON.stringify(convertToFaDate, null, 2)}</pre>
								<br />
								converted value:
								<pre>
									{JSON.stringify(convertToEn(convertToFaDate, '-'), null, 2)}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</section>
		</DocLayout>
	)
}

export default Utilities
