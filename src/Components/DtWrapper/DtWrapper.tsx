import React, { ReactElement, useEffect } from 'react'
import { useViewActions, useViewState } from '../../store/ViewProvider'
import useDidMountEffect from '../../hooks/useDidMountEffect'
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
import { useLangOption } from '../../hooks/useLangOption'

const viewsSelector = (
  hasDefaultVal: boolean,
  currentView: string,
  local: string,
  showWeekend: boolean,
  type?: string,
  daysClass?: string,
  monthClass?: string,
  yearClass?: string,
  disabledDates?: IDay[]
) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <YearsView local={local} yearsClass={yearClass} />
      break
    case MONTHS_VIEW:
      view = <MonthsView local={local} monthsClass={monthClass} />
      break
    case DAYS_VIEW:
      view = (
        <DaysView
          type={type}
          local={local}
          hasDefaultVal={hasDefaultVal}
          showWeekend={showWeekend}
          daysClass={daysClass}
          disabledDates={disabledDates}
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
          daysClass={daysClass}
          disabledDates={disabledDates}
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
  todayBtn,
  nextBtnLabel,
  previousBtnLabel,
  clockFromLabel,
  clockToLabel,
  clockLabel,
  nextMonthBtnTitle,
  previousMonthBtnTitle,
  headerClass,
  timeClass,
  daysClass,
  monthsClass,
  yearsClass,
  disabledDates
}: IWrapper) => {
  const selectedDayState = useSelectedDayState()
  const selectedTime = useSelectedTimeState()
  const { clockFromLB, clockToLB, clockLB } = useLangOption(local)
  const { changeView } = useViewActions()
  useDidMountEffect(() => {
    mergeProviders(onChange, type, selectedDayState, selectedTime, withTime)
  }, [selectedDayState, selectedTime])

  useEffect(() => {
    return () => {
      changeView(DAYS_VIEW)
    }
  }, [])
  return (
    <div
      className={`dtWrapper ${local === 'fa' ? 'is-rtl' : 'is-ltr'} ${
        'is_' + useViewState()
      }`}
      dir={local === 'fa' ? 'rtl' : 'ltr'}
    >
      <Header
        local={local}
        nextBtnLabel={nextBtnLabel}
        previousBtnLabel={previousBtnLabel}
        nextMonthBtnTitle={nextMonthBtnTitle}
        previousMonthBtnTitle={previousMonthBtnTitle}
        headerClass={headerClass}
      />
      {viewsSelector(
        hasDefaultVal,
        useViewState(),
        local,
        showWeekend,
        type,
        daysClass,
        monthsClass,
        yearsClass,
        disabledDates
      )}
      {useViewState() === DAYS_VIEW && (
        <TodayBtn local={local} todayBtn={todayBtn} />
      )}
      {withTime && type === 'single' && useViewState() === DAYS_VIEW && (
        <TimeView
          timeFor='single'
          initHour={(selectedDayState as IDay)?.hours}
          initMinutes={(selectedDayState as IDay)?.minutes}
          timeLabel={clockLabel || clockLB}
          timeClass={timeClass}
        />
      )}
      {withTime && type === 'range' && useViewState() === DAYS_VIEW && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TimeView
            timeFor='from'
            initHour={(selectedDayState as IRange).from?.hours}
            initMinutes={(selectedDayState as IRange).from?.minutes}
            timeLabel={clockFromLabel || clockFromLB}
            timeClass={timeClass}
          />
          <TimeView
            timeFor='to'
            initHour={(selectedDayState as IRange).to?.hours}
            initMinutes={(selectedDayState as IRange).to?.minutes}
            timeLabel={clockToLabel || clockToLB}
            timeClass={timeClass}
          />
        </div>
      )}
    </div>
  )
}

export default Wrapper
