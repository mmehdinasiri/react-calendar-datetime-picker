import React, { FC, useEffect, useRef } from 'react'
import { useViewState } from '../../store/ViewProvider'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import {
  Header,
  YearsView,
  MonthsView,
  DaysView,
  TodayBtn,
  TimeDeterminer
} from '../'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
import { mergeProviders } from '../../helpers'
import { useCalenderActions } from '../../store/CalenderProvider'
import { calendarListStyle, IDay, IRange, Multi } from 'src/type'

type local = 'fa' | 'en'
type type = 'single' | 'range' | 'multi'
interface IWrapper {
  onCalenderChange?: any
  onChange: (date: any) => void
  type: type
  withTime?: boolean
  local: local
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
  yearListStyle?: calendarListStyle
  handelComponentVisible: (foreClose?: boolean) => void
  autoClose: boolean
}
const Wrapper: FC<IWrapper> = ({
  onCalenderChange,
  onChange,
  type,
  withTime,
  local,
  showWeekend,
  todayBtn,
  NextBtnIcon,
  PreviousBtnIcon,
  clockFromLabel,
  clockToLabel,
  clockLabel,
  timeClass,
  nextMonthBtnTitle,
  previousMonthBtnTitle,
  headerClass,
  daysClass,
  monthsClass,
  yearsClass,
  disabledDates,
  initCalender,
  isComponentVisible,
  yearListStyle,
  handelComponentVisible,
  autoClose
}) => {
  console.log('===wrapper===')
  const currentView = useViewState()
  const selectedDayState = useSelectedDayState()
  const lastSelectedDate = useRef(selectedDayState)
  const { changeCalender } = useCalenderActions()
  const selectedTime = useSelectedTimeState()
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
    if (
      isComponentVisible &&
      initCalender &&
      (!selectedDayState ||
        (Array.isArray(selectedDayState) && !selectedDayState.length))
    ) {
      changeCalender({ ...initCalender })
    }
  }, [isComponentVisible])
  useEffect(() => {
    lastSelectedDate.current = selectedDayState
  }, [selectedDayState])
  useEffect(() => {
    // reset calendar view to selected view after closing modal
    return () => {
      if (type === 'single' && lastSelectedDate.current) {
        changeCalender({
          year: (lastSelectedDate.current as IDay).year,
          month: (lastSelectedDate.current as IDay).month,
          day: (lastSelectedDate.current as IDay).day
        })
      }
      if (type === 'range' && (lastSelectedDate.current as IRange).from) {
        changeCalender({
          year: (lastSelectedDate.current as IRange).from!.year,
          month: (lastSelectedDate.current as IRange).from!.month,
          day: (lastSelectedDate.current as IRange).from!.day
        })
      }
      if (type === 'multi' && (lastSelectedDate.current as Multi)?.length) {
        changeCalender({
          year: (lastSelectedDate.current as Multi)![0].year,
          month: (lastSelectedDate.current as Multi)![0].month,
          day: (lastSelectedDate.current as Multi)![0].day
        })
      }
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
        NextBtnIcon={NextBtnIcon}
        PreviousBtnIcon={PreviousBtnIcon}
        nextMonthBtnTitle={nextMonthBtnTitle}
        previousMonthBtnTitle={previousMonthBtnTitle}
        headerClass={headerClass}
        handelComponentVisible={handelComponentVisible}
        autoClose={autoClose}
      />
      {YEARS_VIEW === currentView && (
        <YearsView
          local={local}
          yearsClass={yearsClass}
          yearListStyle={yearListStyle}
        />
      )}
      {MONTHS_VIEW === currentView && (
        <MonthsView local={local} monthsClass={monthsClass} />
      )}
      {DAYS_VIEW === currentView && (
        <DaysView
          type={type}
          local={local}
          showWeekend={showWeekend}
          daysClass={daysClass}
          disabledDates={disabledDates}
          handelComponentVisible={handelComponentVisible}
        />
      )}
      {useViewState() === DAYS_VIEW && (
        <TodayBtn local={local} todayBtn={todayBtn} />
      )}
      {withTime && (
        <TimeDeterminer
          clockFromLabel={clockFromLabel}
          clockToLabel={clockToLabel}
          clockLabel={clockLabel}
          timeClass={timeClass}
          type={type}
          local={local}
          currentView={currentView}
        />
      )}
    </div>
  )
}

export default Wrapper
