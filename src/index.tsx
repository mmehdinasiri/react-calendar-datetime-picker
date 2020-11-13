import * as React from 'react'
import './style/main.scss'
import { DtWrapper } from './Components'
import CalenderProvider from './store/CalenderProvider'
import ViewProvider from './store/ViewProvider'
import SelectedDaysProvider from './store/SelectedDaysProvider'

export const DtPicker = ({ defaultValue, onChange, type }: IDtPickerProps) => {
  const correctedType = type || 'single'
  let initCalender = new Date()
  if (correctedType === 'single' && (defaultValue as IDay).year) {
    initCalender = new Date(
      (defaultValue as IDay).year,
      (defaultValue as IDay).month,
      (defaultValue as IDay).day
    )
  }
  if (correctedType === 'range' && (defaultValue as IRange).from) {
    initCalender = new Date(
      (defaultValue as IRange).from!.year,
      (defaultValue as IRange).from!.month,
      (defaultValue as IRange).from!.day
    )
  }
  return (
    <ViewProvider>
      <CalenderProvider initCalender={initCalender} type={correctedType}>
        <SelectedDaysProvider initState={defaultValue} type={correctedType}>
          <DtWrapper onChange={onChange} type={correctedType} />
        </SelectedDaysProvider>
      </CalenderProvider>
    </ViewProvider>
  )
}
