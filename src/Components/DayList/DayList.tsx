import React from 'react'
import styles from './styles.module.css'
import { daysInMonth } from '../../helpers'

const DayList = () => {
  const today = new Date()
  const daysList = Array.from(
    Array(daysInMonth(today.getMonth(), today.getFullYear())).keys()
  )
  return (
    <ul className={styles.daysList}>
      {daysList.map((day) => (
        <li key={day} className={styles.daysList_day}>
          {day}
        </li>
      ))}
    </ul>
  )
}

export default DayList
