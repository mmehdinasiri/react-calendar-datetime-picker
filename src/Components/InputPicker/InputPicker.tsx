import React, { forwardRef, RefObject } from 'react'
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
      onChange,
      isDisabled,
      isRequired
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
        mergeProviders(onChange, type, null, selectedTime, withTime)
      } else if (type === 'range') {
        changeSelectedDayRange('from', null)
        changeSelectedDayRange('to', null)
        mergeProviders(
          onChange,
          type,
          { from: null, to: null },
          selectedTime,
          withTime
        )
      } else if (type === 'multi') {
        removeAllSelectedDayMulti()
        mergeProviders(onChange, type, [], selectedTime, withTime)
      }
    }

    return (
      <div className='input-picker'>
        <input
          ref={ref}
          className='input-picker--input'
          readOnly
          placeholder={placeholder}
          value={correctValue()}
          onClick={() => handelComponentVisible()}
          disabled={isDisabled}
          required={isRequired}
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
