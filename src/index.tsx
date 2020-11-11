import * as React from 'react'
// import styles from './styles.module.css'
import './style/main.scss'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'

// { defaultValue: Date; onChange: Dispatch<SetStateAction<Date>>
export const DtPicker = ({ defaultValue, onChange }: any) => {
  return (
    <ViewProvider>
      <DayProvider initState={defaultValue}>
        <SelectedDaysProvider initState={defaultValue}>
          <DtWrapper onChange={onChange} />
        </SelectedDaysProvider>
      </DayProvider>
    </ViewProvider>
  )
}
