import React, { useEffect, useRef } from 'react'
import './style/main.scss'
import { DtWrapper, InputPicker } from './Components'
import CalenderProvider from './store/CalenderProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'
import SelectedTimeProvider from './store/SelectedTimeProvider'
import MinMaxProvider from './store/MinMaxProvider'
import { checkInputValues, handelInitialValues } from './Helpers'
import useComponentVisible from './hooks/useComponentVisible'

export const DtPicker = ({
  defaultValue,
  onChange,
  type,
  withTime,
  local,
  showWeekend,
  clearBtn,
  isRequired,
  todayBtn,
  onCalenderHide,
  onCalenderShow,
  isDisabled,
  maxDate,
  minDate,
  placeholder,
  nextBtnLabel,
  previousBtnLabel,
  fromLabel,
  toLabel,
  clockFromLabel,
  clockToLabel,
  clockLabel,
  nextMonthBtnTitle,
  previousMonthBtnTitle
}: IDtPickerProps) => {
  const inputRef = useRef(null)
  const minMaxState = {
    minDate: minDate,
    maxDate: maxDate
  }
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false, onCalenderHide, inputRef)

  const handelComponentVisible = () => {
    if (isComponentVisible) return
    if (!isComponentVisible) {
      onCalenderShow()
    }
    setIsComponentVisible(!isComponentVisible)
  }
  const correctedType = type ? type.toLocaleLowerCase() : 'single'
  const correctedLocal = local ? local.toLocaleLowerCase() : 'en'
  const { initCalender, initTime } = handelInitialValues(
    defaultValue,
    correctedType,
    correctedLocal,
    maxDate
  )
  useEffect(() => {
    checkInputValues(
      defaultValue,
      correctedLocal,
      correctedType,
      maxDate,
      minDate
    )
  }, [])
  return (
    <ViewProvider>
      <CalenderProvider initCalender={initCalender} type={correctedType}>
        <MinMaxProvider initState={minMaxState}>
          <SelectedDaysProvider initState={defaultValue} type={correctedType}>
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
                />
                {isComponentVisible && (
                  <div ref={ref} className='calender-modal'>
                    <DtWrapper
                      onChange={onChange}
                      type={correctedType}
                      withTime={withTime}
                      local={correctedLocal}
                      hasDefaultVal={!!defaultValue}
                      showWeekend={!!showWeekend}
                      todayBtn={!!todayBtn}
                      nextBtnLabel={nextBtnLabel}
                      previousBtnLabel={previousBtnLabel}
                      clockFromLabel={clockFromLabel}
                      clockToLabel={clockToLabel}
                      clockLabel={clockLabel}
                      nextMonthBtnTitle={nextMonthBtnTitle}
                      previousMonthBtnTitle={previousMonthBtnTitle}
                    />
                  </div>
                )}
              </div>
            </SelectedTimeProvider>
          </SelectedDaysProvider>
        </MinMaxProvider>
      </CalenderProvider>
    </ViewProvider>
  )
}
