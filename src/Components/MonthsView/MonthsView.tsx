import React, { FC } from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'
interface IMonthsProps {
  local: string
  monthsClass?: string
}
const MonthsView: FC<IMonthsProps> = ({ local, monthsClass }) => {
  const { minDate, maxDate } = useMinMaxState()
  const { MONTHS } = useLangOption(local)
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  const { year, month, day, hours, minutes } = calenderState
  const preSelectedMonth = month
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
  const isDisabled = (index: number) => {
    if (minDate) {
      if (minDate.year === year && minDate.month > index) {
        return true
      }
    }
    if (maxDate) {
      if (maxDate.year === year && maxDate.month < index) {
        return true
      }
    }
    return false
  }
  return (
    <div>
      <ul
        className={`monthList ${local === 'fa' ? 'is-rtl' : ''} ${monthsClass}`}
      >
        {MONTHS.map((month: string, index: number) => (
          <div
            key={index}
            className={`monthList_month ${
              isDisabled(index) ? 'is-disabled' : ''
            }
            ${index === preSelectedMonth ? 'is-selected-month' : ''}`}
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
