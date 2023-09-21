import { forwardRef, KeyboardEvent } from 'react'
import { genFullIDay, mergeProviders } from '@/utils/helpers'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '@/store/SelectedDaysProvider'
import { useCalenderActions } from '@/store/CalenderProvider'
import { useSelectedTimeState } from '@/store/SelectedTimeProvider'
import { useLangOption } from '@/utils/hooks/useLangOption'
import { ReactComponent as Close } from '@/assets/icons/close.svg'
import { IDay, IRange, ITime, ITimeRange, calendarLocal } from '@/types/type'

interface IInputPicker {
  placeholder?: string
  type: string
  local: calendarLocal
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
export const InputPicker = forwardRef<HTMLInputElement, IInputPicker>(
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
    },
    ref
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
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Space') {
        handelComponentVisible(true)
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
          onClick={() => handelComponentVisible(true)}
          onKeyDown={onKeyPress}
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
