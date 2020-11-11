import React, { useEffect, useState } from 'react'
import { useDayState, useDayActions } from '../../store/DayProvider'

const TimeView = () => {
  const date = useDayState()
  const [hours, setHours] = useState<number>(date.getHours())
  const [minutes, setMinutes] = useState<number>(date.getMinutes())
  const { changeDay } = useDayActions()

  const handelChangeHours = () => {
    const newDate = new Date(date.setHours(hours))
    changeDay(newDate)
  }
  const handelChangeMinutes = () => {
    const newDate = new Date(date.setMinutes(minutes))
    changeDay(newDate)
  }
  useEffect(() => {
    handelChangeHours()
  }, [hours])
  useEffect(() => {
    handelChangeMinutes()
  }, [minutes])

  return (
    <div>
      <input
        value={hours}
        type='number'
        max='24'
        min='0'
        onChange={(e) => setHours(Number(e.target.value))}
      />
      :
      <input
        value={minutes}
        type='number'
        max='60'
        min='0'
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
    </div>
  )
}

export default TimeView
