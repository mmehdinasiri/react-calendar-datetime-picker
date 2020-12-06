import React, { forwardRef, RefObject, useEffect } from 'react'
import { genFullIDay, mergeProviders } from '../../Helpers'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
import { ReactComponent as Close } from '../../Icons/close.svg'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'

const InputPicker = forwardRef(
  (
    {
      placeholder,
      type,
      handelComponentVisible,
      clearBtn,
      withTime,
      onChange
    }: IInputPicker,
    ref: RefObject<HTMLInputElement>
  ) => {
    const selectedDayState = useSelectedDayState()
    const selectedTime = useSelectedTimeState()
    const {
      removeSelectedDay,
      changeSelectedDayRange,
      removeAllSelectedDayMulti
    } = useSelectedDayActions()
    const correctValue = () => {
      if (type === 'single') {
        return genFullIDay(selectedDayState as IDay)
      }
      if (
        (selectedDayState as IRange).from &&
        (selectedDayState as IRange).to
      ) {
        return `from:${genFullIDay(
          (selectedDayState as IRange).from
        )} to:${genFullIDay((selectedDayState as IRange).to)}`
      }
      return ''
    }
    const clearValue = () => {
      if (type === 'single') {
        removeSelectedDay()
      } else if (type === 'range') {
        changeSelectedDayRange('from', null)
        changeSelectedDayRange('to', null)
      } else if (type === 'multi') {
        removeAllSelectedDayMulti()
      }
    }
    useEffect(() => {
      mergeProviders(onChange, type, selectedDayState, selectedTime, withTime)
    }, [selectedDayState])

    return (
      <div className='input-picker'>
        <input
          ref={ref}
          className='input-picker--input'
          readOnly
          placeholder={placeholder}
          value={correctValue()}
          onClick={() => handelComponentVisible()}
        />
        {clearBtn && (
          <a className='input-picker--clearBtn' onClick={() => clearValue()}>
            <Close />
          </a>
        )}
      </div>
    )
  }
)
export default InputPicker
