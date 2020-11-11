import React from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useDayActions, useDayState } from '../../store/DayProvider'
import { useViewActions } from '../../store/ViewProvider'
import styles from './styles.module.css'

const years = () => {
  const { changeView } = useViewActions()
  const { changeDay } = useDayActions()
  const dayState = useDayState()
  const changeMonth = (year: number) => {
    const dateWithNewMonth: Date = new Date(
      year,
      dayState.getMonth(),
      dayState.getDate()
    )
    changeDay(dateWithNewMonth)
    changeView(DAYS_VIEW)
  }
  const yearsRange = () => {
    const yearsList = []
    for (let i = 1900; i <= 2100; i++)
      yearsList.push(
        <li
          key={i}
          className={styles.yearList_year}
          onClick={() => changeMonth(i)}
        >
          {i}
        </li>
      )
    return yearsList
  }
  return (
    <div className={styles.yearWrapper}>
      <ul className={styles.yearList}>{yearsRange()}</ul>
    </div>
  )
}

export default years
