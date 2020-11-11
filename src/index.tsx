import * as React from 'react'
// import styles from './styles.module.css'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'
import ViewProvider from './store/ViewProvider'

// { defaultValue: Date; onChange: Dispatch<SetStateAction<Date>>
export const DtPicker = ({ defaultValue, onChange }: any) => {
  return (
    <ViewProvider>
      <DayProvider initState={defaultValue}>
        <DtWrapper onChange={onChange} />
      </DayProvider>
    </ViewProvider>
  )
}
