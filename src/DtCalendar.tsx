import React, { FC, useEffect, useState } from 'react'
import './style/main.scss'
import { DtWrapper } from './Components'
import CalenderProvider from './store/CalenderProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'
import SelectedTimeProvider from './store/SelectedTimeProvider'
import MinMaxProvider from './store/MinMaxProvider'
import {
  checkInputValues,
  fixedMonth,
  fixedMonthInitValue,
  handelInitialValues,
  mergeProviders
} from './helpers'

const DtCalendar: FC<IDtPickerProps> = ({
  initValue,
  onCalenderChange,
  onChange,
  type,
  withTime,
  local,
  showWeekend,
  todayBtn,
  maxDate,
  minDate,
  NextBtnIcon,
  PreviousBtnIcon,
  clockFromLabel,
  clockToLabel,
  clockLabel,
  nextMonthBtnTitle,
  previousMonthBtnTitle,
  calenderModalClass,
  headerClass,
  daysClass,
  timeClass,
  monthsClass,
  yearsClass,
  disabledDates
}) => {
  const [prevInitDate, setPrevInitDate] = useState<any>(null)
  const [isUpdate, setIsUpdate] = useState<number>(0)
  const minMaxState = {
    minDate: fixedMonth(minDate),
    maxDate: fixedMonth(maxDate)
  }
  let fixedDisabledDates: any
  if (disabledDates?.length) {
    fixedDisabledDates = disabledDates?.map((date) => {
      return fixedMonth(date)
    })
  }
  const correctedType = (type ? type.toLocaleLowerCase() : 'single') as type
  const correctedLocal = (local ? local.toLocaleLowerCase() : 'en') as local
  const [fixedInitValue, setFixedInitValue] = useState(
    fixedMonthInitValue(initValue, correctedType)
  )
  const { initCalender, initTime } = handelInitialValues(
    fixedMonthInitValue(initValue, correctedType),
    correctedType,
    correctedLocal,
    fixedMonth(maxDate)
  )
  useEffect(() => {
    checkInputValues(
      initValue,
      correctedLocal,
      correctedType,
      maxDate,
      minDate,
      disabledDates
    )
  }, [])
  useEffect(() => {
    if (
      isUpdate === 0 ||
      (initValue && JSON.stringify(prevInitDate) !== JSON.stringify(initValue))
    ) {
      setPrevInitDate(initValue)
      setFixedInitValue(fixedMonthInitValue(initValue, correctedType))
      setIsUpdate(isUpdate + 1)
      if (isUpdate === 0) {
        mergeProviders(onChange, correctedType, initValue, initTime)
      } else {
        mergeProviders(
          onChange,
          correctedType,
          initValue,
          initTime,
          onCalenderChange
        )
      }
    }
  }, [initValue])

  return (
    <div
      className={`react-calendar-datetime-picker ${
        local === 'fa' ? 'is-jalali' : ''
      }`}
      key={isUpdate}
    >
      <ViewProvider>
        <CalenderProvider initCalender={initCalender} type={correctedType}>
          <MinMaxProvider initState={minMaxState}>
            <SelectedDaysProvider
              initState={fixedInitValue}
              type={correctedType}
            >
              <SelectedTimeProvider initState={initTime} type={correctedType}>
                <div
                  className={`calender-modal  is-calender ${calenderModalClass}`}
                >
                  <DtWrapper
                    onCalenderChange={onCalenderChange}
                    onChange={onChange}
                    type={correctedType}
                    withTime={withTime}
                    local={correctedLocal}
                    hasDefaultVal={!!initValue}
                    showWeekend={!!showWeekend}
                    todayBtn={!!todayBtn}
                    NextBtnIcon={NextBtnIcon}
                    PreviousBtnIcon={PreviousBtnIcon}
                    clockFromLabel={clockFromLabel}
                    clockToLabel={clockToLabel}
                    clockLabel={clockLabel}
                    nextMonthBtnTitle={nextMonthBtnTitle}
                    previousMonthBtnTitle={previousMonthBtnTitle}
                    headerClass={headerClass}
                    daysClass={daysClass}
                    timeClass={timeClass}
                    monthsClass={monthsClass}
                    yearsClass={yearsClass}
                    disabledDates={fixedDisabledDates}
                  />
                </div>
              </SelectedTimeProvider>
            </SelectedDaysProvider>
          </MinMaxProvider>
        </CalenderProvider>
      </ViewProvider>
    </div>
  )
}

export default DtCalendar
