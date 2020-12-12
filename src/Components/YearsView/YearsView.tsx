import React from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'

const years = ({ local, yearsClass }: IYearsProps) => {
  const { minDate, maxDate } = useMinMaxState()
  const { YEARS_RANGE_START, YEARS_RANGE_END } = useLangOption(local)
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  let { month, day, hours, minutes } = calenderState
  const changeYear = (newYear: number) => {
    // correct month after we changing year if we have min or date
    if (minDate) {
      while (minDate.year === newYear && minDate.month > month) {
        month++
      }
    }
    // correct month after we changing year if we have min or date
    if (maxDate) {
      while (maxDate.year === newYear && month > maxDate.month) {
        month--
      }
    }
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
  const fixedMinStartYear = () => {
    let startYear = YEARS_RANGE_START
    if (minDate) {
      startYear = minDate.year
    }
    return startYear
  }
  const fixedMaxEndYear = () => {
    let endYear = YEARS_RANGE_END
    if (maxDate) {
      endYear = maxDate.year
    }
    return endYear
  }
  const yearsRange = () => {
    const yearsList = []
    for (let i = fixedMinStartYear(); i <= fixedMaxEndYear(); i++)
      yearsList.push(
        <li key={i} className='yearList_year' onClick={() => changeYear(i)}>
          {i}
        </li>
      )
    return yearsList
  }
  return (
    <div className={`yearWrapper ${yearsClass}`}>
      <ul className={`yearList ${local === 'fa' ? 'is-rtl' : ''}`}>
        {yearsRange()}
      </ul>
    </div>
  )
}

export default years
