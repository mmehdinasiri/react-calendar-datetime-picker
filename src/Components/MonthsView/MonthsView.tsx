import React from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'

const MonthsView = ({ local }: IMonthsProps) => {
  const { MONTHS } = useLangOption(local)
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  const { year, day, hours, minutes } = calenderState
  const changeMonth = (newMonth: number) => {
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
        {MONTHS.map((month: string, index: number) => (
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
