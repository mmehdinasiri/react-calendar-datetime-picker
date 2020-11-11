import React from 'react'
import { monthConvertor } from '../../Convertor'
import { useDayActions, useDayState } from '../../store/DayProvider'
import { useViewActions } from '../../store/ViewProvider'
import { MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import styles from './styles.module.css'

const Header = () => {
  const dayState = useDayState()
  const { changeDay } = useDayActions()
  const { changeView } = useViewActions()
  const year = dayState.getFullYear()
  const month = dayState.getMonth()
  const day = dayState.getDate()
  const hours = dayState.getHours()
  const minutes = dayState.getMinutes()
  return (
    <div className={styles.header}>
      <button
        onClick={() =>
          changeDay(new Date(year, month - 1, day, hours, minutes))
        }
      >
        prev
      </button>
      <div>
        <div onClick={() => changeView(YEARS_VIEW)}>{year}</div>
        <div onClick={() => changeView(MONTHS_VIEW)}>
          {monthConvertor(month + 1)}
        </div>
      </div>
      <button
        onClick={() =>
          changeDay(new Date(year, month + 1, day, hours, minutes))
        }
      >
        next
      </button>
    </div>
  )
}

export default Header
