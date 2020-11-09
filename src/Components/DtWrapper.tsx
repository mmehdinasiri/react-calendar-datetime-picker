import React, { useEffect } from 'react'
import { useDayState, useDayActions } from '../store/DayProvider'

const Wrapper = ({ text }: IDtPicker) => {
  const day = useDayState()
  const { changeDay } = useDayActions()
  useEffect(() => {
    setTimeout(() => {
      changeDay('25/1/1399')
    }, 2000)
  }, [])
  return (
    <div>
      DtWrapper Component: {text} : {day}
    </div>
  )
}

export default Wrapper
