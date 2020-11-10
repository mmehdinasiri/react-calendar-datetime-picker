import * as React from 'react'
// import styles from './styles.module.css'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'
import ViewProvider from './store/ViewProvider'

export const DtPicker = () => {
  // const day = new Date(1999, 1, 12)
  // const day = new Date(2015, 6, 15)
  // const day = new Date(1991, 5, 29)
  // const day = new Date(2015, 0, 15)
  // const day = new Date(2009, 11, 1)
  // const day = new Date(1984, 1, 25)
  // const day = new Date(2000, 11, 9)
  return (
    <ViewProvider>
      <DayProvider>
        {/* <DayProvider initState={day}> */}
        <DtWrapper />
      </DayProvider>
    </ViewProvider>
  )
}
