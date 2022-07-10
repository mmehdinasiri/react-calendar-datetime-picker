import { FC } from 'react'
import { useMinMaxState } from '@/store/MinMaxProvider'
import { useViewActions } from '@/store/ViewProvider'
import { useCalenderActions, useCalenderState } from '@/store/CalenderProvider'
import { DAYS_VIEW } from '@/config/constants'
import { useLangOption } from '@/utils/hooks/useLangOption'

interface IMonthsProps {
  local: string
  monthsClass?: string
}
export const MonthsView: FC<IMonthsProps> = ({ local, monthsClass }) => {
  const { minDate, maxDate } = useMinMaxState()
  const { MONTHS } = useLangOption(local)
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  const { year, month, day, hour, minute } = calenderState
  const preSelectedMonth = month
  const changeMonth = (newMonth: number) => {
    const newDate = {
      year: year,
      month: newMonth,
      day: day,
      hour: hour,
      minutes: minute
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
        {MONTHS.map((monthTitle: string, index: number) => (
          <div
            key={index}
            className={`monthList_month ${
              isDisabled(index) ? 'is-disabled' : ''
            }
            ${index === preSelectedMonth ? 'is-selected-month' : ''}`}
            onClick={() => changeMonth(index)}
          >
            {monthTitle}
          </div>
        ))}
      </ul>
    </div>
  )
}
