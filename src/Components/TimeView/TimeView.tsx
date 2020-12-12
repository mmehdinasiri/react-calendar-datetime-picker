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
    <div dir={`ltr ${timeClass}`}>
      <span>{timeLabel}</span>
      <div>
        <input
          value={addZero(hours)}
          type='number'
          max='23'
          min='0'
          onChange={(e) => setHours(Number(e.target.value))}
          disabled={checkIsDisabled()}
        />
        :
        <input
          value={addZero(minutes)}
          type='number'
          max='59'
          min='0'
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={checkIsDisabled()}
        />
      </div>
    </div>
  )
}

export default TimeView
