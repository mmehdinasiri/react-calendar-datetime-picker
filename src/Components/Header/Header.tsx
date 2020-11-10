import React from 'react'
import { monthConvertor } from '../../Convertor'
import { useDayActions, useDayState } from '../../store/DayProvider'
import { useViewActions } from '../../store/ViewProvider'
import { MONTHS_VIEW } from '../../Constant'
import styles from './styles.module.css'

const Header = () => {
  const dayState = useDayState()
  const { changeDay } = useDayActions()
  const { changeView } = useViewActions()
  const year = dayState.getFullYear()
  const month = dayState.getMonth()
  const day = dayState.getDate()
  return (
    <div className={styles.header}>
      <button onClick={() => changeDay(new Date(year, month - 1, day))}>
        prev
      </button>
      <div onClick={() => changeView(MONTHS_VIEW)}>
        {year}/{monthConvertor(month + 1)}
      </div>
      <button onClick={() => changeDay(new Date(year, month + 1, day))}>
        next
      </button>
    </div>
  )
}

export default Header
