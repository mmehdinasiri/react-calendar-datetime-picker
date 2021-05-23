import React, { FC, useEffect } from 'react'
import { DAYS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'
import { toPersianNumber } from '../../helpers/index'

interface IYearsProps {
  local: string
  yearsClass?: string
}
const years: FC<IYearsProps> = ({ local, yearsClass }) => {
  const { minDate, maxDate } = useMinMaxState()
  const { YEARS_RANGE_START, YEARS_RANGE_END } = useLangOption(local)
  const { changeView } = useViewActions()
  const { changeCalender } = useCalenderActions()
  const calenderState = useCalenderState()
  let { month, day, hour, minute } = calenderState
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
      hour: hour,
      minutes: minute
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
        <li
          key={i}
          className={`yearList_year ${
            i === calenderState.year ? 'is-selectedYearRef' : ''
          }`}
          onClick={() => changeYear(i)}
        >
          {local === 'fa' ? toPersianNumber(i) : i}
        </li>
      )
    return yearsList
  }
  useEffect(() => {
    const node: HTMLElement | null = document.querySelector(
      '.is-selectedYearRef'
    )
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }, [])
  return (
    <div className={`yearWrapper ${yearsClass}`}>
      <ul className={`yearList ${local === 'fa' ? 'is-rtl' : ''}`}>
        {yearsRange()}
      </ul>
    </div>
  )
}

export default years
