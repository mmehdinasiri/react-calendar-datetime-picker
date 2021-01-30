import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Layout } from '..'
export interface IDocLayout {
  children: React.ReactElement | React.ReactElement[]
}
const DocLayout = ({ children }: IDocLayout) => {
  const pathname = useLocation().pathname.toLocaleLowerCase()
  const hash = useLocation().hash.toLocaleLowerCase()
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
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#selectsingleday') ? 'is-active' : ''
                    }`}
                    href='#selectSingleDay'
                  >
                    single day
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#singledaywithinitialdate') && 'is-active'
                    }`}
                    href='#SingleDayWithInitialDate'
                  >
                    Single day with initial date
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#selectsinglepersian') && 'is-active'
                    }`}
                    href='#selectSinglePersian(Jalali)day'
                  >
                    Persian(Jalali) day
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#selectalistofdaysbetweentwodays') &&
                      'is-active'
                    }`}
                    href='#selectAListOfDaysBetweenTwoDays'
                  >
                    Select a list of days between two days
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#rangeofdayswithinitialdate') &&
                      'is-active'
                    }`}
                    href='#rangeOfDaysWithInitialDate '
                  >
                    Range of days with initial date
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#selectmultidays') && 'is-active'
                    }`}
                    href='#selectMultiDays'
                  >
                    Select multi days
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#multidayswithinitialdate') && 'is-active'
                    }`}
                    href='#multiDaysWithInitialDate '
                  >
                    Multi days with initial date
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#singledaywithtime') && 'is-active'
                    }`}
                    href='#singleDayWithTime'
                  >
                    Single day with time
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#showweekendclearbtnandtodaybtnoptions') &&
                      'is-active'
                    }`}
                    href='#showWeekendClearBtnAndTodayBtnOptions'
                  >
                    ShowWeekend, clearBtn and todayBtn options
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#opencloseandchangecallbackapi') &&
                      'is-active'
                    }`}
                    href='#openCloseAndChangeCallbackApi'
                  >
                    Open, close and change callback api
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#setminimumandmaximumdate') && 'is-active'
                    }`}
                    href='#setMinimumAndMaximumDate'
                  >
                    Set minimum and maximum date
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#setalistofdisableddates') && 'is-active'
                    }`}
                    href='#setAListOfDisabledDates'
                  >
                    Set a list of disabled dates
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#withoutinput') && 'is-active'
                    }`}
                    href='#WithoutInput'
                  >
                    Without input
                  </a>
                  <a
                    className={`block pl-5 text-sm pb-2 hover:text-primary leading-snug ${
                      hash.includes('#customcalender') && 'is-active'
                    }`}
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
