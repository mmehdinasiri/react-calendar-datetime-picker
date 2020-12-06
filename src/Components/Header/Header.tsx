import React from 'react'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useViewState, useViewActions } from '../../store/ViewProvider'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useLangOption } from '../../hooks/useLangOption'
import { ReactComponent as Next } from '../../Icons/next.svg'
import { ReactComponent as Back } from '../../Icons/back.svg'

const Header = ({ local }: IHeaderProps) => {
  const { MONTHS } = useLangOption(local)
  const dayState = useCalenderState()
  const viewState = useViewState()
  const { changeCalender } = useCalenderActions()
  const { changeView } = useViewActions()
  const { year, month, hours, minutes } = dayState

  const handelMonth = (action: string) => {
    const toSum = action === 'inc' ? 1 : -1
    let newMonthIndex = month + toSum
    let newYear = year
    if (newMonthIndex < 0) {
      newMonthIndex = 11
      newYear -= 1
    }

    if (newMonthIndex > 11) {
      newMonthIndex = 0
      newYear += 1
    }
    const newDate = {
      year: newYear,
      month: newMonthIndex,
      day: 1,
      hour: hours,
      minutes: minutes
    }
    changeCalender({ ...newDate })
  }
  const handelView = (view: string) => {
    if (viewState === MONTHS_VIEW || viewState === YEARS_VIEW) {
      changeView(DAYS_VIEW)
    } else {
      changeView(view)
    }
  }
  return (
    <div className='header'>
      <a className='header--btn' onClick={() => handelMonth('dec')}>
        <Back />
      </a>
      <div>
        <div onClick={() => handelView(YEARS_VIEW)}>{year}</div>
        <div onClick={() => handelView(MONTHS_VIEW)}>{MONTHS[month]}</div>
      </div>
      <a className='header--btn' onClick={() => handelMonth('inc')}>
        <Next />
      </a>
    </div>
  )
}

export default Header
