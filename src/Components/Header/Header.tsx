import React from 'react'
// import jalaali from 'jalaali-js'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useViewActions } from '../../store/ViewProvider'
import { LOCAL_CONSTANT, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'

const Header = ({ local }: IHeaderProps) => {
  const dayState = useCalenderState()
  const { changeCalender } = useCalenderActions()
  const { changeView } = useViewActions()
  const { year, month, hours, minutes } = dayState

  const handelMonth = (action: string) => {
    const toSum = action === 'inc' ? 1 : -1
    let newMonthIndex = month + toSum
    let newYear = year
    if (newMonthIndex < 0) {
      newMonthIndex = 11
      newYear -= 1
    }

    if (newMonthIndex > 11) {
      newMonthIndex = 0
      newYear += 1
    }
    const newDate = {
      year: newYear,
      month: newMonthIndex,
      day: 1,
      hour: hours,
      minutes: minutes
    }
    changeCalender({ ...newDate })
  }
  return (
    <div className='header'>
      <button onClick={() => handelMonth('dec')}>prev</button>
      <div>
        <div onClick={() => changeView(YEARS_VIEW)}>{year}</div>
        <div onClick={() => changeView(MONTHS_VIEW)}>
          {LOCAL_CONSTANT[local].MONTHS[month]}
        </div>
      </div>
      <button onClick={() => handelMonth('inc')}>next</button>
    </div>
  )
}

export default Header
