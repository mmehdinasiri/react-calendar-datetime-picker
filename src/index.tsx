import * as React from 'react'
// import styles from './styles.module.css'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'

export const DtPicker = ({ text }: IDtPicker) => {
  return (
    <DayProvider initState='25/1/1367'>
      <DtWrapper text={text} />
    </DayProvider>
  )
}
