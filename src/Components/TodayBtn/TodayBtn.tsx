import React, { FC, Fragment } from 'react'
import { useCalenderActions } from '@/store/CalenderProvider'
import { useMinMaxState } from '@/store/MinMaxProvider'
import { useLangOption } from '@/utils/hooks'
import { compareDateEN, compareDateFA } from '@/utils/helpers'
import { calendarLocal } from '@/types/type'
interface ITodayBtn {
  local: calendarLocal
  todayBtn: boolean
}
export const TodayBtn: FC<ITodayBtn> = React.memo(({ local, todayBtn }) => {
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
})
