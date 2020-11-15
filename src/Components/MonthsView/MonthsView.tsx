import React from 'react'
import { DAYS_VIEW, LOCAL_CONSTANT } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'

const MonthsView = ({ local }: IMonthsProps) => {
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
        {LOCAL_CONSTANT[local].MONTHS.map((month: string, index: number) => (
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
