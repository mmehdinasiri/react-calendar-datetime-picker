import React from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useDayActions, useDayState } from '../../store/DayProvider'
import { useViewActions } from '../../store/ViewProvider'

const years = () => {
  const { changeView } = useViewActions()
  const { changeDay } = useDayActions()
  const dayState = useDayState()
  const changeMonth = (year: number) => {
    const dateWithNewMonth: Date = new Date(
      year,
      dayState.getMonth(),
      dayState.getDate(),
      dayState.getHours(),
      dayState.getMinutes()
    )
    changeDay(dateWithNewMonth)
    changeView(DAYS_VIEW)
  }
  const yearsRange = () => {
    const yearsList = []
    for (let i = 1900; i <= 2100; i++)
      yearsList.push(
        <li key={i} className='yearList_year' onClick={() => changeMonth(i)}>
          {i}
        </li>
      )
    return yearsList
  }
  return (
    <div className='yearWrapper'>
      <ul className='yearList'>{yearsRange()}</ul>
    </div>
  )
}

export default years
