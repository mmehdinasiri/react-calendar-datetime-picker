import React, { forwardRef, RefObject } from 'react'
import { genFullIDay, mergeProviders } from '../../Helpers'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
import { ReactComponent as Close } from '../../Icons/close.svg'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
import { useLangOption } from '../../hooks/useLangOption'

const InputPicker = forwardRef(
  (
    {
      placeholder,
      type,
      local,
      handelComponentVisible,
      clearBtn,
      withTime,
      onChange,
      isDisabled,
      isRequired,
      fromLabel,
      toLabel
    }: IInputPicker,
    ref: RefObject<HTMLInputElement>
  ) => {
    const { inputPlaceholder, fromLB, toLB } = useLangOption(local)
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
        type === 'range' &&
        (selectedDayState as IRange).from &&
        (selectedDayState as IRange).to
      ) {
        return `${fromLabel || fromLB}:${genFullIDay(
          (selectedDayState as IRange).from
        )} ${toLabel || toLB}:${genFullIDay((selectedDayState as IRange).to)}`
      } else if (type === 'multi') {
        const listDate = (selectedDayState as IDay[]).map((day) => {
          return genFullIDay(day)
        })
        return listDate
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
          placeholder={placeholder || inputPlaceholder}
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
