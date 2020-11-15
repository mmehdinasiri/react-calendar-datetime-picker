import React, { ReactElement, useEffect } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView, TimeView } from '../'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
import { mergeProviders } from '../../Helpers'

const viewsSelector = (currentView: string, type?: string, local?: string) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <YearsView />
      break
    case MONTHS_VIEW:
      view = <MonthsView />
      break
    case DAYS_VIEW:
      view = <DaysView type={type} local={local} />
      break
    default:
      view = <DaysView type={type} local={local} />
  }
  return view
}
const Wrapper = ({ onChange, type, withTime, local }: any) => {
  const selectedDate = useSelectedDayState()
  const selectedTime = useSelectedTimeState()
  useEffect(() => {
    mergeProviders(type, selectedDate, selectedTime, withTime, onChange)
  }, [selectedDate, selectedTime])

  return (
    <div className='dtWrapper'>
      <Header />
      {viewsSelector(useViewState(), type, local)}
      {withTime && type === 'single' && (
        <TimeView
          timeFor='single'
          initHour={(selectedDate as IDay)?.hours}
          initMinutes={(selectedDate as IDay)?.minutes}
        />
      )}
      {withTime && type === 'range' && (
        <React.Fragment>
          <TimeView
            timeFor='from'
            initHour={(selectedDate as IRange).from?.hours}
            initMinutes={(selectedDate as IRange).from?.minutes}
          />
          <TimeView
            timeFor='to'
            initHour={(selectedDate as IRange).to?.hours}
            initMinutes={(selectedDate as IRange).to?.minutes}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default Wrapper
