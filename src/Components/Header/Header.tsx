import React from 'react'
import { monthConvertor } from '../../Convertor'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useViewActions } from '../../store/ViewProvider'
import { MONTHS_VIEW, YEARS_VIEW } from '../../Constant'

const Header = () => {
  const dayState = useCalenderState()
  const { changeCalender } = useCalenderActions()
  const { changeView } = useViewActions()
  const year = dayState.getFullYear()
  const month = dayState.getMonth()
  const day = dayState.getDate()
  const hours = dayState.getHours()
  const minutes = dayState.getMinutes()
  return (
    <div className='header'>
      <button
        onClick={() =>
          changeCalender(new Date(year, month - 1, day, hours, minutes))
        }
      >
        prev
      </button>
      <div>
        <div onClick={() => changeView(YEARS_VIEW)}>{year}</div>
        <div onClick={() => changeView(MONTHS_VIEW)}>
          {monthConvertor(month + 1)}
        </div>
      </div>
      <button
        onClick={() =>
          changeCalender(new Date(year, month + 1, day, hours, minutes))
        }
      >
        next
      </button>
    </div>
  )
}

export default Header
