import * as React from 'react'
// import styles from './styles.module.css'
import './style/main.scss'
import { DtWrapper } from './Components'
import DayProvider from './store/DayProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'

// { defaultValue: Date; onChange: Dispatch<SetStateAction<Date>>

export const DtPicker = ({ defaultValue, onChange, type }: IDtPickerProps) => {
  const correctedType = type || 'single'
  return (
    <ViewProvider>
      <DayProvider initState={defaultValue} type={correctedType}>
        <SelectedDaysProvider initState={defaultValue} type={correctedType}>
          <DtWrapper onChange={onChange} type={correctedType} />
        </SelectedDaysProvider>
      </DayProvider>
    </ViewProvider>
  )
}
