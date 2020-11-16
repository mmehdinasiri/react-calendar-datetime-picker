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
  const { year, month, day, hours, minutes } = calenderState
  console.log(month)
  const changeMonth = (newMonth: number) => {
    // console.log(index)
    const newDate = {
      year: year,
      month: newMonth,
      day: day,
      hour: hours,
      minutes: minutes
    }
    changeCalender({ ...newDate })
    changeView(DAYS_VIEW)
  }
  return (
    <div>
      <ul className={`monthList ${local === 'fa' ? 'is-rtl' : ''}`}>
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
