import React from 'react'
import styles from './styles.module.css'
import { daysInMonth } from '../../helpers'

const DayList = () => {
  const today = new Date()
  const daysList = Array.from(
    Array(daysInMonth(today.getMonth() + 1, today.getFullYear())).keys()
  )
  return (
    <ul className={styles.daysList}>
      {daysList.map((day) => (
        <li key={day + 1} className={styles.daysList_day}>
          {day + 1}
        </li>
      ))}
    </ul>
  )
}

export default DayList
