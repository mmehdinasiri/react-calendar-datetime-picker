import React, { useRef } from 'react'
import './style/main.scss'
import { DtWrapper, InputPicker } from './Components'
import CalenderProvider from './store/CalenderProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'
import SelectedTimeProvider from './store/SelectedTimeProvider'
import { handelInitialValues } from './Helpers'
import useComponentVisible from './hooks/useComponentVisible'

export const DtPicker = ({
  defaultValue,
  onChange,
  type,
  withTime,
  local,
  showWeekend,
  clearBtn,
  onCalenderHide,
  onCalenderShow,
  isDisabled
}: IDtPickerProps) => {
  const inputRef = useRef(null)
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
    correctedLocal
  )

  return (
    <ViewProvider>
      <CalenderProvider initCalender={initCalender} type={correctedType}>
        <SelectedDaysProvider initState={defaultValue} type={correctedType}>
          <SelectedTimeProvider initState={initTime} type={correctedType}>
            <div style={{ position: 'relative' }}>
              <InputPicker
                ref={inputRef}
                clearBtn={clearBtn}
                type={correctedType}
                handelComponentVisible={handelComponentVisible}
                onChange={onChange}
                withTime={withTime}
                isDisabled={isDisabled}
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
                  />
                </div>
              )}
            </div>
          </SelectedTimeProvider>
        </SelectedDaysProvider>
      </CalenderProvider>
    </ViewProvider>
  )
}
