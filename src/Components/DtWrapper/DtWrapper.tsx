import React, { useEffect } from 'react'
import { useDayState, useDayActions } from '../../store/DayProvider'
import { DayList } from '../'
import styles from './styles.module.css'

const Wrapper = ({ text }: IDtPicker) => {
  const day = useDayState()
  const { changeDay } = useDayActions()
  useEffect(() => {
    setTimeout(() => {
      changeDay('25/1/1399')
    }, 2000)
  }, [])
  return (
    <div className={styles.dtWrapper}>
      DtWrapper Component: {text} : {day}
      <DayList />
    </div>
  )
}

export default Wrapper
