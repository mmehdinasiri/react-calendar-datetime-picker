import React, { useState } from 'react'
import {
  useSelectedDayState,
  useSelectedDayActions
} from '../../store/SelectedDaysProvider'
import { useDayState } from '../../store/DayProvider'
import useDidMountEffect from '../../hooks/useDidMountEffect'

const TimeView = () => {
  const date = useDayState()
  const selectedDate = useSelectedDayState()
  console.log(selectedDate)
  const [hours, setHours] = useState<number>(
    selectedDate?.getHours() || date.getHours()
  )
  const [minutes, setMinutes] = useState<number>(
    selectedDate?.getMinutes() || date.getMinutes()
  )
  const { changeSelectedDay } = useSelectedDayActions()

  const handelChangeHours = () => {
    const newDate = new Date(selectedDate?.setHours(hours) || date.getHours())
    changeSelectedDay(newDate)
  }
  const handelChangeMinutes = () => {
    const newDate = new Date(
      selectedDate?.setMinutes(minutes) || date.getMinutes()
    )
    changeSelectedDay(newDate)
  }
  useDidMountEffect(() => {
    handelChangeHours()
  }, [hours])
  useDidMountEffect(() => {
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
        disabled={selectedDate === undefined}
      />
      :
      <input
        value={minutes}
        type='number'
        max='60'
        min='0'
        onChange={(e) => setMinutes(Number(e.target.value))}
        disabled={selectedDate === undefined}
      />
    </div>
  )
}

export default TimeView
