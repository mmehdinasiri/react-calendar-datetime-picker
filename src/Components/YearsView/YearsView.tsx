import React, { FC, useEffect, useRef } from 'react'
import { MONTHS_VIEW } from '../../Constant'
import { useViewActions } from '../../store/ViewProvider'
import { useLangOption } from '../../hooks/useLangOption'
import {
  useCalenderActions,
  useCalenderState
} from '../../store/CalenderProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'
import { toPersianNumber } from '../../helpers/index'
import { calendarListStyle } from 'src/type'

interface IYearsProps {
  local: string
  yearsClass?: string
  yearListStyle?: calendarListStyle
}
const years: FC<IYearsProps> = ({ local, yearsClass, yearListStyle }) => {
  const { minDate, maxDate } = useMinMaxState()
  const ref = useRef<HTMLLIElement>(null)
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
    changeView(MONTHS_VIEW)
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
          ref={i === calenderState.year ? ref : null}
          className={`yearGrid_year ${
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
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }, [])
  return (
    <div className={`yearWrapper ${yearsClass} `}>
      <ul
        className={`yearGrid ${local === 'fa' ? 'is-rtl' : ''} ${
          yearListStyle === 'list' ? 'is-year-list' : ''
        }`}
      >
        {yearsRange()}
      </ul>
    </div>
  )
}

export default years
