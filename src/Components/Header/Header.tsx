import React from 'react'
import { monthConvertor } from '../../Convertor'
import { useDayState } from '../../store/DayProvider'

const Header = () => {
  const dayState = useDayState()
  const year = dayState.getFullYear()
  const month = dayState.getMonth()
  const day = dayState.getDate()
  return (
    <div>
      {year}/{monthConvertor(month)}/{day}
    </div>
  )
}

export default Header
