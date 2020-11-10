import React from 'react'
import { monthConvertor } from '../../Convertor'
import { useDayActions, useDayState } from '../../store/DayProvider'
import styles from './styles.module.css'

const Header = () => {
  const dayState = useDayState()
  const { changeDay } = useDayActions()
  const year = dayState.getFullYear()
  const month = dayState.getMonth()
  const day = dayState.getDate()
  return (
    <div className={styles.header}>
      <button onClick={() => changeDay(new Date(year, month + 1, day))}>
        next
      </button>
      {year}/{monthConvertor(month + 1)}
      <button onClick={() => changeDay(new Date(year, month - 1, day))}>
        prev
      </button>
    </div>
  )
}

export default Header
