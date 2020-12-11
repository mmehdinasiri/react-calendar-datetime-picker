import React, { ReactElement, useEffect } from 'react'
import { useViewActions, useViewState } from '../../store/ViewProvider'
import {
  Header,
  YearsView,
  MonthsView,
  DaysView,
  TimeView,
  TodayBtn
} from '../'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
import { mergeProviders } from '../../Helpers'

const viewsSelector = (
  hasDefaultVal: boolean,
  currentView: string,
  local: string,
  showWeekend: boolean,
  type?: string
) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <YearsView local={local} />
      break
    case MONTHS_VIEW:
      view = <MonthsView local={local} />
      break
    case DAYS_VIEW:
      view = (
        <DaysView
          type={type}
          local={local}
          hasDefaultVal={hasDefaultVal}
          showWeekend={showWeekend}
        />
      )
      break
    default:
      view = (
        <DaysView
          type={type}
          local={local}
          hasDefaultVal={hasDefaultVal}
          showWeekend={showWeekend}
        />
      )
  }
  return view
}
const Wrapper = ({
  onChange,
  type,
  withTime,
  local,
  hasDefaultVal,
  showWeekend,
  todayBtn
}: IWrapper) => {
  const selectedDayState = useSelectedDayState()
  const selectedTime = useSelectedTimeState()
  const { changeView } = useViewActions()
  useEffect(() => {
    mergeProviders(onChange, type, selectedDayState, selectedTime, withTime)
  }, [selectedDayState, selectedTime])

  useEffect(() => {
    return () => {
      changeView(DAYS_VIEW)
    }
  }, [])
  return (
    <div className='dtWrapper' dir={local === 'fa' ? 'rtl' : 'ltr'}>
      <Header local={local} />
      {viewsSelector(hasDefaultVal, useViewState(), local, showWeekend, type)}
      <TodayBtn local={local} todayBtn={todayBtn} />

      {withTime && type === 'single' && (
        <TimeView
          timeFor='single'
          initHour={(selectedDayState as IDay)?.hours}
          initMinutes={(selectedDayState as IDay)?.minutes}
        />
      )}
      {withTime && type === 'range' && (
        <React.Fragment>
          <TimeView
            timeFor='from'
            initHour={(selectedDayState as IRange).from?.hours}
            initMinutes={(selectedDayState as IRange).from?.minutes}
          />
          <TimeView
            timeFor='to'
            initHour={(selectedDayState as IRange).to?.hours}
            initMinutes={(selectedDayState as IRange).to?.minutes}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default Wrapper
