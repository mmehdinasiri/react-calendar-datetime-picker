import React, { forwardRef, RefObject } from 'react'
import { genFullIDay, mergeProviders } from '../../helpers'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
import { ReactComponent as Close } from '../../Icons/close.svg'
import { useSelectedTimeState } from '../../store/SelectedTimeProvider'
import { useLangOption } from '../../hooks/useLangOption'
import { useCalenderActions } from '../../store/CalenderProvider'
import { IDay, IRange, ITime, ITimeRange } from 'src/type'
interface IInputPicker {
  placeholder?: string
  type: string
  local: string
  handelComponentVisible: (foreClose?: boolean) => void
  onChange: (date: any) => void
  clearBtn?: boolean
  withTime?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  fromLabel?: string
  toLabel?: string
  inputClass?: string
  clearBtnClass?: string
  maxDate: IDay | null | undefined
  showTimeInput?: boolean
  inputId?: string
}
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
      inputId,
      toLabel,
      inputClass,
      clearBtnClass,
      maxDate,
      showTimeInput
    }: IInputPicker,
    ref: RefObject<HTMLInputElement>
  ) => {
    const { inputPlaceholder, fromLB, toLB, todayObject } = useLangOption(local)
    const { changeCalender } = useCalenderActions()
    const selectedDayState = useSelectedDayState()
    const selectedTime = useSelectedTimeState()
    const {
      removeSelectedDay,
      changeSelectedDayRange,
      removeAllSelectedDayMulti
    } = useSelectedDayActions()
    const correctValue = () => {
      if (type === 'single') {
        return genFullIDay(
          selectedDayState as IDay,
          true,
          withTime,
          showTimeInput,
          selectedTime as ITime
        )
      }
      if (
        type === 'range' &&
        (selectedDayState as IRange).from &&
        (selectedDayState as IRange).to
      ) {
        return `${fromLabel || fromLB} : ${genFullIDay(
          (selectedDayState as IRange).from,
          true,
          withTime,
          showTimeInput,
          (selectedTime as ITimeRange).from
        )}    ${toLabel || toLB} : ${genFullIDay(
          (selectedDayState as IRange).to,
          true,
          withTime,
          showTimeInput,
          (selectedTime as ITimeRange).to
        )}`
      } else if (type === 'multi') {
        const listDate = (selectedDayState as IDay[]).map((day) => {
          return genFullIDay(day, true)
        })
        return listDate.join(' , ')
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
      if (maxDate) {
        changeCalender({
          year: maxDate?.year,
          month: maxDate?.month,
          day: maxDate?.day
        })
      } else {
        const today = todayObject()
        changeCalender({
          year: today.year,
          month: today.month,
          day: today.day
        })
      }
    }
    return (
      <div className='input-picker'>
        <input
          ref={ref}
          className={`input-picker--input ${inputClass}`}
          readOnly
          placeholder={placeholder || inputPlaceholder}
          value={correctValue()}
          onFocus={() => handelComponentVisible(true)}
          disabled={isDisabled}
          required={isRequired}
          id={inputId}
        />
        {clearBtn && (
          <a
            className={`input-picker--clearBtn ${clearBtnClass}`}
            onClick={() => clearValue()}
          >
            <Close />
          </a>
        )}
      </div>
    )
  }
)
export default InputPicker
