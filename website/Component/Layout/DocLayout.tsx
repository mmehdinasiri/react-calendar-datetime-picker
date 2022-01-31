/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '..'
export interface IDocLayout {
	children: React.ReactElement | React.ReactElement[]
}
const DocLayout = ({ children }: IDocLayout) => {
	const router = useRouter()

	return (
		<Layout>
			<div className='flex '>
				<div className='w-2/6 2xl:w-1/6'>
					<div className='fixed' style={{ width: '240px' }}>
						<h2 className='font-bold text-text text-lg'>Usage</h2>
						<div className='pl-2'>
							<Link href='/docs/get-started'>
								<a className='block text-text hover:text-primary  my-2'>
									Get started
								</a>
							</Link>
							<Link href='/docs/props'>
								<a className='block text-text hover:text-primary  my-2'>
									Props
								</a>
							</Link>
							<Link href='/docs/customization'>
								<a className='block text-text hover:text-primary  my-2'>
									Customization
								</a>
							</Link>
							<Link href='/docs/utilities'>
								<a className='block text-text hover:text-primary  my-2'>
									Utilities
								</a>
							</Link>
							<Link href='/docs/typescript'>
								<a className='block text-text hover:text-primary  my-2'>
									Typescript
								</a>
							</Link>
							<Link href='/docs/examples'>
								<a className='block text-text hover:text-primary  my-2'>
									Examples
								</a>
							</Link>
							{router.pathname.includes('/examples') && (
								<div className='hidden md:block'>
									<Link href='#selectSingleDay'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#selectSingleDay')
													? 'is-active'
													: ''
											}`}
										>
											Single day
										</a>
									</Link>
									<Link href='#SingleDayWithInitialDate'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#SingleDayWithInitialDate')
													? 'is-active'
													: ''
											}`}
										>
											Single day with initial date
										</a>
									</Link>
									<Link href='#updateInitialDate'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#updateInitialDate') &&
												'is-active'
											}`}
										>
											update initial date
										</a>
									</Link>
									<Link href='#selectSinglePersian(Jalali)day'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes(
													'#selectSinglePersian(Jalali)day'
												) && 'is-active'
											}`}
										>
											Jalali day
										</a>
									</Link>
									<Link href='#selectAListOfDaysBetweenTwoDays'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes(
													'#selectAListOfDaysBetweenTwoDays'
												) && 'is-active'
											}`}
										>
											Select a list of days between two days
										</a>
									</Link>
									<Link href='#rangeOfDaysWithInitialDate'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#rangeOfDaysWithInitialDate') &&
												'is-active'
											}`}
										>
											Range of days with initial date
										</a>
									</Link>
									<Link href='#selectMultiDays'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#selectMultiDays') &&
												'is-active'
											}`}
										>
											Select multi days
										</a>
									</Link>
									<Link href='#multiDaysWithInitialDate'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#multiDaysWithInitialDate') &&
												'is-active'
											}`}
										>
											Multi days with initial date
										</a>
									</Link>
									<Link href='#singleDayWithTime'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#singleDayWithTime') &&
												'is-active'
											}`}
										>
											Single day with time
										</a>
									</Link>
									<Link href='#showWeekendClearBtnAndTodayBtnOptions'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes(
													'#showWeekendClearBtnAndTodayBtnOptions'
												) && 'is-active'
											}`}
										>
											ShowWeekend, clearBtn and todayBtn options
										</a>
									</Link>
									<Link href='#openCloseAndChangeCallbackApi'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes(
													'#openCloseAndChangeCallbackApi'
												) && 'is-active'
											}`}
											href='#openCloseAndChangeCallbackApi'
										>
											Open, close and change callback api
										</a>
									</Link>
									<Link href='#setMinimumAndMaximumDate'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#setMinimumAndMaximumDate') &&
												'is-active'
											}`}
										>
											Set minimum and maximum date
										</a>
									</Link>
									<Link href='#setAListOfDisabledDates'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#setAListOfDisabledDates') &&
												'is-active'
											}`}
										>
											Set a list of disabled dates
										</a>
									</Link>
									<Link href='#AutoClose'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#AutoClose') && 'is-active'
											}`}
										>
											AutoClose
										</a>
									</Link>
									<Link href='#WithoutInput'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#WithoutInput') && 'is-active'
											}`}
										>
											Without input
										</a>
									</Link>
									<Link href='#CustomCalender'>
										<a
											className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
												router.asPath.includes('#CustomCalender') && 'is-active'
											}`}
										>
											Custom calendar
										</a>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					className='w-4/6 2xl:w-5/6 pl-4 2xl:pl-12  xl:pl-6'
					// style={{ width: 'clac(100% - 240px)', marginLeft: '240px' }}
				>
					{children}
				</div>
			</div>
		</Layout>
	)
}

export default DocLayout
