import React from 'react'
import { genFullIDay } from '../../Helpers'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
interface IInputPicker {
  placeholder?: string
  type: string
  handelComponentVisible: () => void
}
const InputPicker = ({
  placeholder,
  type,
  handelComponentVisible
}: IInputPicker) => {
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
    <input
      readOnly
      placeholder={placeholder}
      value={correctValue()}
      onClick={() => handelComponentVisible()}
    />
  )
}

export default InputPicker
