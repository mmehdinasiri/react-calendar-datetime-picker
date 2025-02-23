import { FC, useState } from 'react'
import { useSelectedTimeActions } from '@/store/SelectedTimeProvider'
import { useSelectedDayState } from '@/store/SelectedDaysProvider'
import { addZero, isNotUndefined } from '@/utils/helpers'
import { useDidMountEffect } from '@/utils/hooks'
import { ChevronDown, ChevronUp } from '@/assets/icons'
import { IRange } from '@/types/type'

interface ITimeViewProps {
  initHour: number | undefined
  initMinute: number | undefined
  timeFor?: string
  timeLabel?: string
  timeClass?: string
}
export const TimeView: FC<ITimeViewProps> = ({
  timeFor,
  initHour,
  initMinute,
  timeLabel,
  timeClass
}) => {
  console.log('--time--')
  const today = new Date()
  const selectedDate = useSelectedDayState()
  const { changeSelectedTime, changeSelectedTimeRange } =
    useSelectedTimeActions()
  const [hour, setHour] = useState<number>(
    isNotUndefined(initHour, today.getHours())
  )
  const [minute, setMinute] = useState<number>(
    isNotUndefined(initMinute, today.getMinutes())
  )
  const checkIsDisabled = () => {
    let isDisabled = false
    if (timeFor === 'from') {
      isDisabled = !(selectedDate as IRange).from
    } else if (timeFor === 'to') {
      isDisabled = !(selectedDate as IRange).to
    } else if (timeFor === 'single') {
      isDisabled = !selectedDate || selectedDate === undefined
    }
    return isDisabled
  }
  const handelChangeHour = () => {
    if (timeFor === 'from') {
      changeSelectedTimeRange('from', { hour, minute })
    } else if (timeFor === 'to') {
      changeSelectedTimeRange('to', { hour, minute })
    } else if (timeFor === 'single') {
      changeSelectedTime({ hour, minute })
    }
  }
  const changeHour = (newHour: number) => {
    if (newHour > 23) newHour = 0
    if (newHour < 0) newHour = 23
    setHour(newHour)
  }
  const changeMinute = (newMinute: number) => {
    if (newMinute > 59) newMinute = 0
    if (newMinute < 0) newMinute = 59
    setMinute(newMinute)
  }
  useDidMountEffect(() => {
    handelChangeHour()
  }, [hour, minute])

  return (
    <div dir='ltr' className={`time ${timeClass}`}>
      <span className='time--title'>{timeLabel}</span>
      <div className='field-wrapper'>
        <fieldset
          className={`time-fieldset ${checkIsDisabled() ? 'is-disabled' : ''}`}
        >
          <button
            type='button'
            className='time-fieldset--dec'
            onClick={() => changeHour(hour - 1)}
          >
            <ChevronDown />
          </button>
          <input
            className='time--input'
            value={addZero(hour).toString().slice(-2)}
            type='number'
            max='23'
            min='0'
            onChange={(e) => changeHour(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            className='time-fieldset--inc'
            onClick={() => changeHour(hour + 1)}
          >
            <ChevronUp />
          </button>
        </fieldset>
        :
        <fieldset
          className={`time-fieldset ${checkIsDisabled() ? 'is-disabled' : ''}`}
        >
          <button
            type='button'
            title='Down'
            className='time-fieldset--dec'
            onClick={() => changeMinute(minute - 1)}
          >
            <ChevronDown />
          </button>
          <input
            className='time--input'
            value={addZero(minute).toString().slice(-2)}
            type='number'
            max='59'
            min='0'
            onChange={(e) => changeMinute(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            title='Up'
            className='time-fieldset--inc'
            onClick={() => changeMinute(minute + 1)}
          >
            <ChevronUp />
          </button>
        </fieldset>
      </div>
    </div>
  )
}
