import React, { ReactElement } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView, TimeView } from '../'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
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
  const selectedTime = useSelectedTimeState()
  React.useEffect(() => {
    if (type === 'single' && (selectedDate as IDay)?.year) {
      onChange({ ...selectedDate, ...selectedTime })
    } else if (
      type === 'range' &&
      (selectedDate as IRange).from?.year &&
      (selectedDate as IRange).to?.year
    ) {
      onChange({
        from: {
          ...(selectedDate as IRange).from,
          ...(selectedTime as ITimeRange).from
        },
        to: {
          ...(selectedDate as IRange).to,
          ...(selectedTime as ITimeRange).to
        }
      })
    } else if (type === 'multi') {
      onChange(selectedDate)
    }
  }, [selectedDate, selectedTime])

  return (
    <div className='dtWrapper'>
      <Header />
      {viewsSelector(useViewState(), type)}
      {type === 'single' && (
        <TimeView
          timeFor='single'
          initHour={(selectedDate as IDay)?.hours}
          initMinutes={(selectedDate as IDay)?.minutes}
        />
      )}
      {type === 'range' && (
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
