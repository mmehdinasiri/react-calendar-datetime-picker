import React from 'react'
import { genFullIDay } from '../../Helpers'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
interface IInputPicker {
  placeholder?: string
  type: string
}
const InputPicker = ({ placeholder, type }: IInputPicker) => {
  const selectedDayState = useSelectedDayState()
  const correctValue = () => {
    if (type === 'single') {
      return genFullIDay(selectedDayState as IDay)
    }
    if ((selectedDayState as IRange).from && (selectedDayState as IRange).to) {
      return `from:${genFullIDay(
        (selectedDayState as IRange).from
      )} to:${genFullIDay((selectedDayState as IRange).to)}`
    }
    return ''
  }
  return (
    <div>
      <input readOnly placeholder={placeholder} value={correctValue()} />
    </div>
  )
}

export default InputPicker
