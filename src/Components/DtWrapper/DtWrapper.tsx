import React, { ReactElement } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView, TimeView } from '../'

import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
const viewsSelector = (currentView: string, type?: string) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <YearsView />
      break
    case MONTHS_VIEW:
      view = <MonthsView />
      break
    case DAYS_VIEW:
      view = <DaysView type={type} />
      break
    default:
      view = <DaysView type={type} />
  }
  return view
}
const Wrapper = ({ onChange, type }: any) => {
  const selectedDate = useSelectedDayState()
  React.useEffect(() => {
    onChange(selectedDate)
  }, [selectedDate])

  return (
    <div className='dtWrapper'>
      <Header />
      {viewsSelector(useViewState(), type)}
      {type === 'single' && <TimeView />}
      {type === 'range' && (
        <React.Fragment>
          <TimeView timeFor='from' />
          <TimeView timeFor='to' />
        </React.Fragment>
      )}
    </div>
  )
}

export default Wrapper
