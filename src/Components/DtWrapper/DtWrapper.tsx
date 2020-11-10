import React from 'react'
import { DayList, Header } from '../'
import styles from './styles.module.css'

const Wrapper = () => {
  return (
    <div className={styles.dtWrapper}>
      <Header />
      <DayList />
    </div>
  )
}

export default Wrapper
