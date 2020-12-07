import React, { useEffect } from 'react'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useViewState, useViewActions } from '../../store/ViewProvider'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useLangOption } from '../../hooks/useLangOption'
import { ReactComponent as Next } from '../../Icons/next.svg'
import { ReactComponent as Back } from '../../Icons/back.svg'

const Header = ({ local, minDate, maxDate }: IHeaderProps) => {
  const { MONTHS } = useLangOption(local)
  const dayState = useCalenderState()
  const viewState = useViewState()
  const { changeCalender } = useCalenderActions()
  const { changeView } = useViewActions()
  const { year, month, hours, minutes } = dayState

  const handelNextMonth = (action: string) => {
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
    return {
      year: newYear,
      month: newMonthIndex,
      day: 1,
      hour: hours,
      minutes: minutes
    }
  }
  const handelNextMonthState = (action: string) => {
    const newDate = handelNextMonth(action)
    changeCalender({ ...newDate })
  }
  const handelView = (view: string) => {
    if (viewState === MONTHS_VIEW || viewState === YEARS_VIEW) {
      changeView(DAYS_VIEW)
    } else {
      changeView(view)
    }
  }
  const isActiveBack = () => {
    const newDate = handelNextMonth('dec')
    if (minDate) {
      if (
        minDate.year > newDate.year ||
        (minDate.year === newDate.year && minDate.month > newDate.month)
      )
        return false
    }
    return true
  }
  const isActiveNext = () => {
    const newDate = handelNextMonth('inc')
    if (maxDate) {
      if (
        maxDate.year < newDate.year ||
        (maxDate.year === newDate.year && maxDate.month < newDate.month)
      )
        return false
    }
    return true
  }
  useEffect(() => {})
  return (
    <div className='header'>
      <a
        className={`header--btn ${!isActiveBack() ? 'is-disabled' : ''}`}
        onClick={() => handelNextMonthState('dec')}
      >
        <Back />
      </a>
      <div>
        <div onClick={() => handelView(YEARS_VIEW)}>{year}</div>
        <div onClick={() => handelView(MONTHS_VIEW)}>{MONTHS[month]}</div>
      </div>
      <a
        className={`header--btn ${!isActiveNext() ? 'is-disabled' : ''}`}
        onClick={() => handelNextMonthState('inc')}
      >
        <Next />
      </a>
    </div>
  )
}

export default Header
