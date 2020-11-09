import React from 'react'
import styles from './styles.module.css'
import { daysInMonth, monthLength } from '../../Helpers'
import { WEEK_DAY_SHORT } from '../../Constant/month'

const DayList = ({ year, month, day }: IMonthList) => {
  console.log(day)
  const prevMonthDays = daysInMonth(month - 1, year)
  console.log(prevMonthDays % 7)
  const daysList = monthLength(daysInMonth(month, year), 'day')
  console.log(daysInMonth(month, year) % 7)
  return (
    <ul className={styles.daysList}>
      {WEEK_DAY_SHORT.map((day) => (
        <li key={day} className={styles.daysList_day}>
          {day}
        </li>
      ))}
      {daysList.map((day) => (
        <li key={day.id} className={`${styles.daysList_day} ${styles.pointer}`}>
          {day.value}
        </li>
      ))}
    </ul>
  )
}

export default DayList
