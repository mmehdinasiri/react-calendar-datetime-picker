import * as React from 'react'
// import styles from './styles.module.css'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'

export const DtPicker = () => {
  return (
    <DayProvider>
      <DtWrapper />
    </DayProvider>
  )
}
