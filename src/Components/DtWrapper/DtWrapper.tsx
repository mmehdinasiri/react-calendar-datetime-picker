import React, { FC, ReactElement, useEffect } from 'react'
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
import { IDay, IRange } from '../../Types'
import { useCalenderActions } from '../../store/CalenderProvider'
interface IWrapper {
  onCalenderChange?: any
  onChange: (date: any) => void
  type: string
  withTime?: boolean
  local: string
  hasDefaultVal: boolean
  showWeekend: boolean
  todayBtn: boolean
  NextBtnIcon?: any
  PreviousBtnIcon?: any
  clockFromLabel?: string
  clockToLabel?: string
  clockLabel?: string
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  headerClass?: string
  daysClass?: string
  timeClass?: string
  monthsClass?: string
  yearsClass?: string
  disabledDates?: IDay[]
  initCalender?: IDay
  isComponentVisible?: boolean
}
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
const Wrapper: FC<IWrapper> = ({
  onCalenderChange,
  onChange,
  type,
  withTime,
  local,
  hasDefaultVal,
  showWeekend,
  todayBtn,
  NextBtnIcon,
  PreviousBtnIcon,
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
  disabledDates,
  initCalender,
  isComponentVisible
}) => {
  const selectedDayState = useSelectedDayState()
  const { changeCalender } = useCalenderActions()
  const selectedTime = useSelectedTimeState()
  const { clockFromLB, clockToLB, clockLB } = useLangOption(local)
  const { changeView } = useViewActions()
  useDidMountEffect(() => {
    mergeProviders(
      onChange,
      type,
      selectedDayState,
      selectedTime,
      onCalenderChange,
      withTime
    )
  }, [selectedDayState, selectedTime])

  useEffect(() => {
    return () => {
      changeView(DAYS_VIEW)
    }
  }, [])
  useEffect(() => {
    if (
      isComponentVisible &&
      initCalender &&
      (!selectedDayState ||
        (Array.isArray(selectedDayState) && !selectedDayState.length))
    ) {
      changeCalender({ ...initCalender })
    }
  }, [isComponentVisible])
  return (
    <div
      className={`dtWrapper ${local === 'fa' ? 'is-rtl' : 'is-ltr'} ${
        'is_' + useViewState()
      }`}
      dir={local === 'fa' ? 'rtl' : 'ltr'}
    >
      <Header
        local={local}
        NextBtnIcon={NextBtnIcon}
        PreviousBtnIcon={PreviousBtnIcon}
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
