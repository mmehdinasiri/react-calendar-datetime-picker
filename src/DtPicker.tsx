/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
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
  fixedMonth,
  fixedMonthInitValue,
  handelInitialValues,
  mergeProviders
} from './helpers'
import useComponentVisible from './hooks/useComponentVisible'
import { IDtPickerProps, calendarLocal, calendarType, IRange } from './type'

const DtPicker: FC<IDtPickerProps> = ({
  initValue,
  onChange,
  type,
  withTime,
  showTimeInput,
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
  disabledDates,
  yearListStyle,
  autoClose = true
}) => {
  const [prevInitDate, setPrevInitDate] = useState<any>(null)
  const [isUpdate, setIsUpdate] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
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
  const correctedType = (
    type ? type.toLocaleLowerCase() : 'single'
  ) as calendarType
  const correctedLocal = (
    local ? local.toLocaleLowerCase() : 'en'
  ) as calendarLocal
  const [fixedInitValue, setFixedInitValue] = useState(
    fixedMonthInitValue(initValue, correctedType)
  )
  const { initCalender, initTime } = handelInitialValues(
    fixedMonthInitValue(initValue, correctedType),
    correctedType,
    correctedLocal,
    fixedMonth(maxDate),
    fixedMonth(minDate)
  )
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, onCalenderHide, inputRef)

  const handelComponentVisible = (forceClose?: boolean) => {
    if (!forceClose && !autoClose && isComponentVisible) return
    if (!isComponentVisible && onCalenderShow) {
      onCalenderShow()
    }
    if (forceClose) {
      setIsComponentVisible(!isComponentVisible)
      return
    }
    setTimeout(() => {
      setIsComponentVisible(!isComponentVisible)
    }, 300)
  }
  useLayoutEffect(() => {
    if (!isComponentVisible) return
    const currentCalender: HTMLElement | null = ref.current
    const currentInput: HTMLInputElement | null = inputRef.current
    if (currentCalender) {
      const { clientWidth, clientHeight } = document.documentElement
      const { left, width, height, top } =
        currentCalender.getBoundingClientRect()
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
  checkInputValues(
    initValue,
    correctedLocal,
    correctedType,
    maxDate,
    minDate,
    disabledDates
  )
  useEffect(() => {
    if (correctedType === 'single' || correctedType === 'multi') {
      if (
        (initValue &&
          JSON.stringify(prevInitDate) !== JSON.stringify(initValue)) ||
        !initValue
      ) {
        setPrevInitDate(initValue)
        setFixedInitValue(fixedMonthInitValue(initValue, correctedType))
        setIsUpdate(isUpdate + 1)
      }
    }
    if (correctedType === 'range') {
      if (
        (initValue &&
          (initValue as IRange).from &&
          (initValue as IRange).to &&
          JSON.stringify(prevInitDate) !== JSON.stringify(initValue)) ||
        !initValue
      ) {
        setPrevInitDate(initValue)
        setFixedInitValue(fixedMonthInitValue(initValue, correctedType))
        setIsUpdate(isUpdate + 1)
      }
    }
  }, [initValue])
  useEffect(() => {
    if (isUpdate === 0) {
      mergeProviders(onChange, correctedType, fixedInitValue, initTime)
    } else {
      mergeProviders(
        onChange,
        correctedType,
        fixedInitValue,
        initTime,
        onCalenderChange
      )
    }
  }, [fixedInitValue])

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
                  showTimeInput={showTimeInput}
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
                      yearListStyle={yearListStyle}
                      handelComponentVisible={handelComponentVisible}
                      autoClose={autoClose}
                    />
                  </div>
                )}
              </SelectedTimeProvider>
            </SelectedDaysProvider>
          </MinMaxProvider>
        </CalenderProvider>
      </ViewProvider>
    </div>
  )
}

export default React.memo(DtPicker)
