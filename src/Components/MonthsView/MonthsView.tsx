import React from 'react'
import { DAYS_VIEW, MONTHS } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'

const MonthsView = () => {
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  const changeMonth = (month: number) => {
    const dateWithNewMonth: Date = new Date(
      calenderState.getFullYear(),
      month,
      calenderState.getDate(),
      calenderState.getHours(),
      calenderState.getMinutes()
    )
    changeCalender(dateWithNewMonth)
    changeView(DAYS_VIEW)
  }
  return (
    <div>
      <ul className='monthList'>
        {MONTHS.map((month, index) => (
          <div
            key={index}
            className='monthList_month'
            onClick={() => changeMonth(index)}
          >
            {month}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default MonthsView
