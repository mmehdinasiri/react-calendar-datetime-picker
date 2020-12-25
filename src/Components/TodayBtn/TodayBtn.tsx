import React, { Fragment } from 'react'
import { useCalenderActions } from '../../store/CalenderProvider'
import { useLangOption } from '../../hooks/useLangOption'
import { useMinMaxState } from '../../store/MinMaxProvider'
import { compareDateEN, compareDateFA } from '../../Helpers'

const TodayBtn = ({ local, todayBtn }: ITodayBtn) => {
  const { todayObject, todayBtnTL } = useLangOption(local)
  const { changeCalender } = useCalenderActions()
  const { minDate, maxDate } = useMinMaxState()
  const today = todayObject()
  const isShowTodayBtn = () => {
    const selectCompar = {
      en: compareDateEN,
      fa: compareDateFA
    }
    if (!todayBtn) return false
    if (maxDate && selectCompar[local](maxDate, today) === 2) {
      return false
    }
    if (minDate && selectCompar[local](minDate, today) === 1) {
      return false
    }
    return true
  }
  const goToday = () => {
    changeCalender({ ...today })
  }
  return (
    <Fragment>
      {isShowTodayBtn() && (
        <a className='todayBtn' onClick={goToday}>
          {todayBtnTL}
        </a>
      )}
    </Fragment>
  )
}

export default TodayBtn
