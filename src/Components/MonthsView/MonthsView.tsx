import React from 'react'
import { DAYS_VIEW, MONTHS } from '../../Constant'
import styles from './styles.module.css'
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
      dayState.getDate()
    )
    changeDay(dateWithNewMonth)
    changeView(DAYS_VIEW)
  }
  return (
    <div>
      <ul className={styles.monthList}>
        {MONTHS.map((month, index) => (
          <div
            key={index}
            className={styles.monthList_month}
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
