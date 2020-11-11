import React, { useEffect, useState } from 'react'
import { useDayState, useDayActions } from '../../store/DayProvider'

const TimeView = () => {
  const date = useDayState()
  const [hours, setHours] = useState<number>(date.getHours())
  const [minutes, setMinutes] = useState<number>(date.getMinutes())
  const { changeDay } = useDayActions()
  const handelChange = () => {
    date.setHours(hours)
    date.setMinutes(minutes)
    changeDay(date)
  }
  useEffect(() => {
    handelChange()
  }, [hours, minutes])
  return (
    <div>
      <input
        value={hours}
        type='number'
        onChange={(e) => setHours(Number(e.target.value))}
      />
      :
      <input
        value={minutes}
        type='number'
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
    </div>
  )
}

export default TimeView
