import React, { useEffect, useState } from 'react'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
// import useDidMountEffect from '../../hooks/useDidMountEffect'

const TimeView = ({ timeFor, initHour, initMinutes }: ITimeViewProps) => {
  const today = new Date()

  const selectedDate = useSelectedDayState()
  const { changeSelectedDay, changeSelectedDayRange } = useSelectedDayActions()

  const [hours, setHours] = useState<number>(initHour || today.getHours())

  const [minutes, setMinutes] = useState<number>(
    initMinutes || today.getMinutes()
  )
  const handelChangeHours = () => {
    const newTime = selectedDate
    if (timeFor === 'from') {
      // @ts-ignore
      newTime.from.hour = hours
      // @ts-ignore
      newTime.from.minutes = minutes
      changeSelectedDayRange('from', newTime as IDay)
    } else if (timeFor === 'to') {
      // @ts-ignore
      newTime.to.hour = hours
      // @ts-ignore
      newTime.to.minutes = minutes
      changeSelectedDayRange('to', newTime as IDay)
    } else {
      // @ts-ignore
      newTime.hour = hours
      // @ts-ignore
      newTime.minutes = minutes

      changeSelectedDay(newTime as IDay)
    }
  }
  useEffect(() => {
    handelChangeHours()
  }, [hours, minutes])

  return (
    <div>
      <input
        value={hours}
        type='number'
        max='24'
        min='0'
        onChange={(e) => setHours(Number(e.target.value))}
        disabled={!selectedDate || selectedDate === undefined}
      />
      :
      <input
        value={minutes}
        type='number'
        max='60'
        min='0'
        onChange={(e) => setMinutes(Number(e.target.value))}
        disabled={!selectedDate || selectedDate === undefined}
      />
    </div>
  )
}

export default TimeView
