import React, { FC } from 'react'
import { useCalenderActions, useCalenderState } from '@/store/CalenderProvider'
import { useMinMaxState } from '@/store/MinMaxProvider'
import { useViewState, useViewActions } from '@/store/ViewProvider'
import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '@/config/constants'
import { useLangOption } from '@/utils/hooks/useLangOption'
import { toPersianNumber } from '@/utils/helpers'
import { ReactComponent as Next } from '@/assets/icons/next.svg'
import { ReactComponent as Back } from '@/assets/icons/back.svg'
import { ReactComponent as Close } from '@/assets/icons/close.svg'

interface IHeaderProps {
  local: string
  NextBtnIcon?: any
  PreviousBtnIcon?: any
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  headerClass?: string
  autoClose?: boolean
  handelComponentVisible?: (foreClose?: boolean) => void
}
export const Header: FC<IHeaderProps> = React.memo(
  ({
    local,
    NextBtnIcon,
    PreviousBtnIcon,
    nextMonthBtnTitle,
    previousMonthBtnTitle,
    headerClass,
    autoClose,
    handelComponentVisible
  }) => {
    console.log('--header--')
    const { minDate, maxDate } = useMinMaxState()
    const { MONTHS } = useLangOption(local)
    const dayState = useCalenderState()
    const viewState = useViewState()
    const { changeCalender } = useCalenderActions()
    const { changeView } = useViewActions()
    const { year, month, hour, minute } = dayState

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
        hour: hour,
        minutes: minute
      }
    }
    const handelNextMonthState = (action: string) => {
      const newDate = handelNextMonth(action)
      changeCalender({ ...newDate })
    }
    const handelView = (view: string) => {
      if (
        (view === MONTHS_VIEW && viewState === MONTHS_VIEW) ||
        (view === YEARS_VIEW && viewState === YEARS_VIEW)
      ) {
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
    return (
      <div className={`header ${headerClass}`}>
        <a
          className={`header--btn ${!isActiveBack() ? 'is-disabled' : ''}`}
          title={
            previousMonthBtnTitle || MONTHS[month - 1 < 0 ? 11 : month - 1]
          }
          onClick={() => handelNextMonthState('dec')}
        >
          {PreviousBtnIcon ? <PreviousBtnIcon /> : <Back />}
        </a>
        <div className='header-date'>
          <div
            className='header-date--year'
            onClick={() => handelView(YEARS_VIEW)}
          >
            {local === 'fa' ? toPersianNumber(year) : year}
          </div>
          <div
            className='header-date--month'
            onClick={() => handelView(MONTHS_VIEW)}
          >
            {MONTHS[month]}
          </div>
        </div>
        <a
          className={`header--btn ${!isActiveNext() ? 'is-disabled' : ''}`}
          title={nextMonthBtnTitle || MONTHS[month + 1 > 11 ? 0 : month + 1]}
          onClick={() => handelNextMonthState('inc')}
        >
          {NextBtnIcon ? <NextBtnIcon /> : <Next />}
        </a>
        {!autoClose && handelComponentVisible && (
          <a
            className='header--clearBtn'
            onClick={() => handelComponentVisible(true)}
          >
            <Close />
          </a>
        )}
      </div>
    )
  }
)
