import React from 'react'
import { genFullIDay } from '../../Helpers'
import { useSelectedDayState } from '../../store/SelectedDaysProvider'
import { ReactComponent as Close } from '../../Icons/close.svg'

const InputPicker = ({
  placeholder,
  type,
  handelComponentVisible,
  clearBtn
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
    <div className='input-picker'>
      <input
        className='input-picker--input'
        readOnly
        placeholder={placeholder}
        value={correctValue()}
        onClick={() => handelComponentVisible()}
      />
      {clearBtn && (
        <a className='input-picker--clearBtn'>
          <Close />
        </a>
      )}
    </div>
  )
}

export default InputPicker
