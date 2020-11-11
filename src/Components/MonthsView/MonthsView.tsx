import React from 'react'
import { DAYS_VIEW, MONTHS } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useDayActions, useDayState } from '../../store/DayProvider'

const MonthsView = () => {
  const { changeView } = useViewActions()
  const { changeDay } = useDayActions()
  const dayState = useDayState()
  const changeMonth = (month: number) => {
    const dateWithNewMonth: Date = new Date(
      dayState.getFullYear(),
      month,
      dayState.getDate(),
      dayState.getHours(),
      dayState.getMinutes()
    )
    changeDay(dateWithNewMonth)
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
