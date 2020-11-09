import React from 'react'
import { useDayState } from '../../store/DayProvider'
import { DayList, Header } from '../'
import styles from './styles.module.css'

const Wrapper = () => {
  const day = useDayState()

  return (
    <div className={styles.dtWrapper}>
      DtWrapper Component: {day.year}
      <Header month={day.month} />
      <DayList year={day.year} month={day.month} day={day.day} />
    </div>
  )
}

export default Wrapper
