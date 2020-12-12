import React from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'

const MonthsView = ({ local, monthsClass }: IMonthsProps) => {
  const { minDate, maxDate } = useMinMaxState()
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
            }`}
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
