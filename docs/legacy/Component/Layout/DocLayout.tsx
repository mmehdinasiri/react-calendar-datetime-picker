/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layout } from '..'
export interface IDocLayout {
  children: React.ReactElement | React.ReactElement[]
}
const DocLayout = ({ children }: IDocLayout) => {
  const pathname = usePathname()

  return (
    <Layout>
      <div className='flex '>
        <div className='w-2/6 2xl:w-1/6'>
          <div className='fixed' style={{ width: '240px' }}>
            <h2 className='font-bold text-text text-lg'>Usage</h2>
            <div className='pl-2'>
              <Link
                href='/legacy/docs/get-started'
                className='block text-text hover:text-primary  my-2'
              >
                Get started
              </Link>
              <Link
                href='/legacy/docs/props'
                className='block text-text hover:text-primary  my-2'
              >
                Props
              </Link>
              <Link
                href='/legacy/docs/customization'
                className='block text-text hover:text-primary  my-2'
              >
                Customization
              </Link>
              <Link
                href='/legacy/docs/utilities'
                className='block text-text hover:text-primary  my-2'
              >
                Utilities
              </Link>
              <Link
                href='/legacy/docs/typescript'
                className='block text-text hover:text-primary  my-2'
              >
                Typescript
              </Link>
              <Link
                href='/legacy/docs/examples'
                className='block text-text hover:text-primary  my-2'
              >
                Examples
              </Link>
              {pathname.includes('/examples') && (
                <div className='hidden md:block'>
                  <Link
                    href='#selectSingleDay'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#selectSingleDay') ? 'is-active' : ''
                    }`}
                  >
                    Single day
                  </Link>
                  <Link
                    href='#SingleDayWithInitialDate'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#SingleDayWithInitialDate')
                        ? 'is-active'
                        : ''
                    }`}
                  >
                    Single day with initial date
                  </Link>

                  <Link
                    href='#updateInitialDate'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#updateInitialDate') && 'is-active'
                    }`}
                  >
                    update initial date
                  </Link>

                  <Link
                    href='#selectSinglePersian(Jalali)day'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#selectSinglePersian(Jalali)day') &&
                      'is-active'
                    }`}
                  >
                    Jalali day
                  </Link>

                  <Link
                    href='#selectAListOfDaysBetweenTwoDays'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#selectAListOfDaysBetweenTwoDays') &&
                      'is-active'
                    }`}
                  >
                    Select a list of days between two days
                  </Link>

                  <Link
                    href='#rangeOfDaysWithInitialDate'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#rangeOfDaysWithInitialDate') &&
                      'is-active'
                    }`}
                  >
                    Range of days with initial date
                  </Link>

                  <Link
                    href='#selectMultiDays'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#selectMultiDays') && 'is-active'
                    }`}
                  >
                    Select multi days
                  </Link>

                  <Link
                    href='#multiDaysWithInitialDate'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#multiDaysWithInitialDate') &&
                      'is-active'
                    }`}
                  >
                    Multi days with initial date
                  </Link>

                  <Link
                    href='#singleDayWithTime'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#singleDayWithTime') && 'is-active'
                    }`}
                  >
                    Single day with time
                  </Link>

                  <Link
                    href='#showWeekendClearBtnAndTodayBtnOptions'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes(
                        '#showWeekendClearBtnAndTodayBtnOptions'
                      ) && 'is-active'
                    }`}
                  >
                    ShowWeekend, clearBtn and todayBtn options
                  </Link>

                  <Link
                    href='#openCloseAndChangeCallbackApi'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#openCloseAndChangeCallbackApi') &&
                      'is-active'
                    }`}
                  >
                    Open, close and change callback api
                  </Link>

                  <Link
                    href='#setMinimumAndMaximumDate'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#setMinimumAndMaximumDate') &&
                      'is-active'
                    }`}
                  >
                    Set minimum and maximum date
                  </Link>

                  <Link
                    href='#setAListOfDisabledDates'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#setAListOfDisabledDates') &&
                      'is-active'
                    }`}
                  >
                    Set a list of disabled dates
                  </Link>

                  <Link
                    href='#AutoClose'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#AutoClose') && 'is-active'
                    }`}
                  >
                    AutoClose
                  </Link>

                  <Link
                    href='#WithoutInput'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#WithoutInput') && 'is-active'
                    }`}
                  >
                    Without input
                  </Link>

                  <Link
                    href='#CustomCalender'
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      pathname.includes('#CustomCalender') && 'is-active'
                    }`}
                  >
                    Custom calendar
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
