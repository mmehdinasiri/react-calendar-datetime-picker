import * as React from 'react'
// import styles from './styles.module.css'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'

export const DtPicker = () => {
  const day = new Date(2015, 6, 15)
  return (
    <DayProvider initState={day}>
      <DtWrapper />
    </DayProvider>
  )
}
