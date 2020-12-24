import React, { useState } from 'react'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { useSelectedTimeActions } from '../../store/SelectedTimeProvider'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { addZero } from '../../Helpers'
// import useDidMountEffect from '../../hooks/useDidMountEffect'

const TimeView = ({
  timeFor,
  initHour,
  initMinutes,
  timeLabel,
  timeClass
}: ITimeViewProps) => {
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
  useDidMountEffect(() => {
    handelChangeHours()
  }, [hours, minutes])

  return (
    <div dir='ltr' className={`time ${timeClass}`}>
      <span className='time--title'>{timeLabel}</span>
      <div className='field-wrapper'>
        <fieldset
          className={`time-fieldset ${checkIsDisabled() ? 'is-disabled' : ''}`}
        >
          <button
            type='button'
            title='Down'
            className='time-fieldset--dec'
            onClick={() => setHours(hours - 1)}
          />
          <input
            className='time--input'
            value={addZero(hours)}
            type='number'
            max='23'
            min='0'
            onChange={(e) => setHours(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            title='Up'
            className='time-fieldset--inc'
            onClick={() => setHours(hours + 1)}
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
            onClick={() => setMinutes(minutes - 1)}
          />
          <input
            className='time--input'
            value={addZero(minutes)}
            type='number'
            max='59'
            min='0'
            onChange={(e) => setMinutes(Number(e.target.value))}
            disabled={checkIsDisabled()}
          />
          <button
            type='button'
            title='Up'
            className='time-fieldset--inc'
            onClick={() => setMinutes(minutes + 1)}
          />
        </fieldset>
      </div>
    </div>
  )
}

export default TimeView
