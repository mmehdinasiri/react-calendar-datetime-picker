import React, { FC, useEffect } from 'react'
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
import { mergeProviders } from '../../helpers'
import { useLangOption } from '../../hooks/useLangOption'
import { useCalenderActions } from '../../store/CalenderProvider'

type local = 'fa' | 'en'
type type = 'single' | 'range' | 'multi'
interface IWrapper {
  onCalenderChange?: any
  onChange: (date: any) => void
  type: type
  withTime?: boolean
  local: local
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
  const currentView = useViewState()
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
      {YEARS_VIEW === currentView && (
        <YearsView local={local} yearsClass={yearsClass} />
      )}
      {MONTHS_VIEW === currentView && (
        <MonthsView local={local} monthsClass={monthsClass} />
      )}
      {DAYS_VIEW === currentView && (
        <DaysView
          type={type}
          local={local}
          hasDefaultVal={hasDefaultVal}
          showWeekend={showWeekend}
          daysClass={daysClass}
          disabledDates={disabledDates}
        />
      )}
      {useViewState() === DAYS_VIEW && (
        <TodayBtn local={local} todayBtn={todayBtn} />
      )}
      {withTime && type === 'single' && useViewState() === DAYS_VIEW && (
        <TimeView
          timeFor='single'
          initHour={(selectedTime as IDay)?.hour}
          initMinute={(selectedTime as IDay)?.minute}
          timeLabel={clockLabel || clockLB}
          timeClass={timeClass}
        />
      )}
      {withTime && type === 'range' && useViewState() === DAYS_VIEW && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TimeView
            timeFor='from'
            initHour={(selectedTime as IRange).from?.hour}
            initMinute={(selectedTime as IRange).from?.minute}
            timeLabel={clockFromLabel || clockFromLB}
            timeClass={timeClass}
          />
          <TimeView
            timeFor='to'
            initHour={(selectedTime as IRange).to?.hour}
            initMinute={(selectedTime as IRange).to?.minute}
            timeLabel={clockToLabel || clockToLB}
            timeClass={timeClass}
          />
        </div>
      )}
    </div>
  )
}

export default Wrapper
