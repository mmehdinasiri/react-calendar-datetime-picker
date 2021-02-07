import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './style/main.scss'
import { DtWrapper, InputPicker } from './Components'
import CalenderProvider from './store/CalenderProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'
import SelectedTimeProvider from './store/SelectedTimeProvider'
import MinMaxProvider from './store/MinMaxProvider'
import {
  checkInputValues,
  convertToEn,
  convertToFa,
  fixedMonth,
  fixedMonthInitValue,
  handelInitialValues,
  mergeProviders
} from './Helpers'
import useComponentVisible from './hooks/useComponentVisible'
import { IDay, IRange, Day, Range, Multi } from './Types'
interface IDtPickerProps {
  initValue?: IDay | Multi | IRange | null | undefined
  onChange: (date: any) => void
  onCalenderChange?: any
  onCalenderHide?: any
  onCalenderShow?: any
  type?: string
  withTime?: boolean
  local?: string
  showWeekend?: boolean
  clearBtn?: boolean
  isRequired?: boolean
  todayBtn?: boolean
  isDisabled?: boolean
  maxDate?: IDay
  minDate?: IDay
  placeholder?: string
  NextBtnIcon?: any
  PreviousBtnIcon?: any
  fromLabel?: string
  toLabel?: string
  clockFromLabel?: string
  clockToLabel?: string
  clockLabel?: string
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  inputClass?: string
  clearBtnClass?: string
  calenderModalClass?: string
  headerClass?: string
  daysClass?: string
  timeClass?: string
  monthsClass?: string
  yearsClass?: string
  disabledDates?: IDay[]
}
const DtPicker: FC<IDtPickerProps> = ({
  initValue,
  onChange,
  type,
  withTime,
  local,
  showWeekend,
  clearBtn,
  isRequired,
  todayBtn,
  onCalenderChange,
  onCalenderHide,
  onCalenderShow,
  isDisabled,
  maxDate,
  minDate,
  placeholder,
  NextBtnIcon,
  PreviousBtnIcon,
  fromLabel,
  toLabel,
  clockFromLabel,
  clockToLabel,
  clockLabel,
  nextMonthBtnTitle,
  previousMonthBtnTitle,
  inputClass,
  clearBtnClass,
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
  const inputRef = useRef(null)
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
  const correctedType = type ? type.toLocaleLowerCase() : 'single'
  const correctedLocal = local ? local.toLocaleLowerCase() : 'en'
  const [fixedInitValue, setFixedInitValue] = useState(
    fixedMonthInitValue(initValue, correctedType)
  )
  const { initCalender, initTime } = handelInitialValues(
    fixedMonthInitValue(initValue, correctedType),
    correctedType,
    correctedLocal,
    fixedMonth(maxDate)
  )
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false, onCalenderHide, inputRef)

  const handelComponentVisible = () => {
    if (isComponentVisible) return
    if (!isComponentVisible && onCalenderShow) {
      onCalenderShow()
    }
    setIsComponentVisible(!isComponentVisible)
  }
  useLayoutEffect(() => {
    if (!isComponentVisible) return
    const currentCalender: HTMLElement | null = ref.current
    const currentInput: HTMLElement | null = inputRef.current
    if (currentCalender) {
      const { clientWidth, clientHeight } = document.documentElement
      const {
        left,
        width,
        height,
        top
      } = currentCalender.getBoundingClientRect()
      const rightOverflow = width + left > clientWidth
      const bottomOverflow = top + height > clientHeight
      if (rightOverflow) {
        currentCalender.style.left = -(left + width + 10 - clientWidth) + 'px'
      }
      if (bottomOverflow) {
        if (currentInput) {
          const { height: inputHeight } = currentInput!.getBoundingClientRect()
          currentCalender.style.bottom = inputHeight + 'px'
        } else {
          currentCalender.style.bottom = 0 + 'px'
        }
      }
    }
  }, [isComponentVisible])
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
      const fixedInitVal = fixedMonthInitValue(initValue, correctedType)
      setPrevInitDate(initValue)
      setFixedInitValue(fixedInitVal)
      setIsUpdate(isUpdate + 1)
      if (isUpdate === 0) {
        mergeProviders(onChange, correctedType, fixedInitVal, initTime)
      } else {
        mergeProviders(
          onChange,
          correctedType,
          fixedInitVal,
          initTime,
          onCalenderChange
        )
      }
    }
  }, [initValue])

  return (
    <div className='react-calendar-datetime-picker' key={isUpdate}>
      <ViewProvider>
        <CalenderProvider initCalender={initCalender} type={correctedType}>
          <MinMaxProvider initState={minMaxState}>
            <SelectedDaysProvider
              initState={fixedInitValue}
              type={correctedType}
            >
              <SelectedTimeProvider initState={initTime} type={correctedType}>
                <div style={{ position: 'relative' }}>
                  <InputPicker
                    ref={inputRef}
                    placeholder={placeholder}
                    clearBtn={clearBtn}
                    type={correctedType}
                    local={correctedLocal}
                    handelComponentVisible={handelComponentVisible}
                    onChange={onChange}
                    withTime={withTime}
                    isDisabled={isDisabled}
                    isRequired={!!isRequired}
                    fromLabel={fromLabel}
                    toLabel={toLabel}
                    inputClass={inputClass}
                    clearBtnClass={clearBtnClass}
                    maxDate={maxDate}
                  />
                  {isComponentVisible && (
                    <div
                      ref={ref}
                      className={`calender-modal ${calenderModalClass}`}
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
                        initCalender={initCalender}
                        isComponentVisible={isComponentVisible}
                      />
                    </div>
                  )}
                </div>
              </SelectedTimeProvider>
            </SelectedDaysProvider>
          </MinMaxProvider>
        </CalenderProvider>
      </ViewProvider>
    </div>
  )
}
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
  const correctedType = type ? type.toLocaleLowerCase() : 'single'
  const correctedLocal = local ? local.toLocaleLowerCase() : 'en'
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
    <div className='react-calendar-datetime-picker' key={isUpdate}>
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

export { DtCalendar, Day, Range, Multi, convertToEn, convertToFa }
export default DtPicker
