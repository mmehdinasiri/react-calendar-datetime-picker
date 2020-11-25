import React from 'react'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
interface IInputPicker {
  placeholder?: string
}
const InputPicker = ({ placeholder }: IInputPicker) => {
  const selectedDayState = useSelectedDayState()
  console.log(selectedDayState)
  return (
    <div>
      <input readOnly placeholder={placeholder} />
    </div>
  )
}

export default InputPicker
