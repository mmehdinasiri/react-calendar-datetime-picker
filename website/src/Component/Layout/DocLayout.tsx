import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Layout } from '..'
export interface IDocLayout {
  children: React.ReactElement | React.ReactElement[]
}
const DocLayout = ({ children }: IDocLayout) => {
  const pathname = useLocation().pathname.toLocaleLowerCase()
  return (
    <Layout>
      <div className='flex '>
        <div className='w-2/6 2xl:w-1/6'>
          <div className='fixed' style={{ width: '240px' }}>
            <h2 className='font-bold text-text text-lg'>Usage</h2>
            <div className='pl-2'>
              <NavLink
                className='block  text-text hover:text-primary  my-2'
                activeClassName='is-active'
                to='/docs/quick-start'
              >
                Quick-start
              </NavLink>
              <NavLink
                className='block  text-text hover:text-primary  my-2'
                activeClassName='is-active'
                to='/docs/api'
              >
                Api
              </NavLink>
              <NavLink
                className='block  text-text hover:text-primary  my-2'
                activeClassName='is-active'
                to='/docs/customization'
              >
                Customization
              </NavLink>
              <NavLink
                className='block  text-text hover:text-primary  my-2'
                activeClassName='is-active'
                to='/docs/Examples'
              >
                Examples
              </NavLink>
              {pathname.includes('/examples') && (
                <div className='hidden md:block'>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#selectSingleDay'
                  >
                    single day
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#SingleDayWithInitialDate'
                  >
                    Single day with initial date
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#selectSinglePersian(Jalali)day'
                  >
                    Persian(Jalali) day
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#selectAListOfDaysBetweenTwoDays'
                  >
                    Select a list of days between two days
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#rangeOfDaysWithInitialDate'
                  >
                    Range of days with initial date
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#selectMultiDays'
                  >
                    Select multi days
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#selectMultiDaysWithInitialDate'
                  >
                    Select multi days with initial date
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#singleDayWithTime'
                  >
                    Single day with time
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#showWeekendClearBtnAndTodayBtnOptions'
                  >
                    ShowWeekend, clearBtn and todayBtn options
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#openCloseAndChangeCallbackApi'
                  >
                    Open, close and change callback api
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#setMinimumAndMaximumDate'
                  >
                    Set minimum and maximum date
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#setAListOfDisabledDates'
                  >
                    Set a list of disabled dates
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#WithoutInput'
                  >
                    Without input
                  </a>
                  <a
                    className='block pl-5 text-sm pb-2 hover:text-primary leading-snug'
                    href='#CustomCalender'
                  >
                    Custom calender
                  </a>
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
