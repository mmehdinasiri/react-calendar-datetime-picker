import React, { FC, useState } from 'react'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { useSelectedTimeActions } from '../../store/SelectedTimeProvider'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { addZero } from '../../Helpers'
import { IRange } from '../../Types'
// import useDidMountEffect from '../../hooks/useDidMountEffect'
interface ITimeViewProps {
  initHour: number | undefined
  initMinutes: number | undefined
  timeFor?: string
  timeLabel?: string
  timeClass?: string
}
const TimeView: FC<ITimeViewProps> = ({
  timeFor,
  initHour,
  initMinutes,
  timeLabel,
  timeClass
}) => {
  const today = new Date()
  const selectedDate = useSelectedDayState()
  const {
    changeSelectedTime,
    changeSelectedTimeRange
  } = useSelectedTimeActions()
  const [hours, setHours] = useState<number>(initHour || today.getHours())
  const [minutes, setMinutes] = useState<number>(
    initMinutes || today.getMinutes()
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
  const handelChangeHours = () => {
    if (timeFor === 'from') {
      changeSelectedTimeRange('from', { hours, minutes })
    } else if (timeFor === 'to') {
      changeSelectedTimeRange('to', { hours, minutes })
    } else if (timeFor === 'single') {
      changeSelectedTime({ hours, minutes })
    }
  }
  const changeHours = (newHours: number) => {
    if (newHours > 23) newHours = 0
    if (newHours < 0) newHours = 23
    setHours(newHours)
  }
  const changeMinutes = (newMinutes: number) => {
    if (newMinutes > 59) newMinutes = 0
    if (newMinutes < 0) newMinutes = 59
    setMinutes(newMinutes)
  }
  useDidMountEffect(() => {
    handelChangeHours()
  }, [hours, minutes])
  const scrollEvent = (e: any) => {
    console.log(e)
  }
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
            onClick={() => changeHours(hours - 1)}
          />
          <input
            onScroll={(e) => scrollEvent(e)}
            className='time--input'
            value={addZero(hours).toString().slice(-2)}
            type='number'
            max='23'
            min='0'
            onChange={(e) => changeHours(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            className='time-fieldset--inc'
            onClick={() => changeHours(hours + 1)}
          />
        </fieldset>
        :
        <fieldset
          className={`time-fieldset ${checkIsDisabled() ? 'is-disabled' : ''}`}
        >
          <button
            type='button'
            title='Down'
            className='time-fieldset--dec'
            onClick={() => changeMinutes(minutes - 1)}
          />
          <input
            className='time--input'
            value={addZero(minutes).toString().slice(-2)}
            type='number'
            max='59'
            min='0'
            onChange={(e) => changeMinutes(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            title='Up'
            className='time-fieldset--inc'
            onClick={() => changeMinutes(minutes + 1)}
          />
        </fieldset>
      </div>
    </div>
  )
}

export default TimeView
