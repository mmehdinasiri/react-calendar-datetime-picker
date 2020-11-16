import React from 'react'
import { DAYS_VIEW, LOCAL_CONSTANT } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'

const years = ({ local }: IYearsProps) => {
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  const { month, day, hours, minutes } = calenderState
  const changeMonth = (newYear: number) => {
    const newDate = {
      year: newYear,
      month: month,
      day: day,
      hour: hours,
      minutes: minutes
    }
    changeCalender({ ...newDate })
    changeView(DAYS_VIEW)
  }
  const yearsRange = () => {
    const yearsList = []
    for (
      let i = LOCAL_CONSTANT[local].YEARS_RANGE_START;
      i <= LOCAL_CONSTANT[local].YEARS_RANGE_END;
      i++
    )
      yearsList.push(
        <li key={i} className='yearList_year' onClick={() => changeMonth(i)}>
          {i}
        </li>
      )
    return yearsList
  }
  return (
    <div className='yearWrapper'>
      <ul className={`yearList ${local === 'fa' ? 'is-rtl' : ''}`}>
        {yearsRange()}
      </ul>
    </div>
  )
}

export default years
