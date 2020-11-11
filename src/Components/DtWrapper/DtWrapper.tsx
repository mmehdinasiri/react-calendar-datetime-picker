import React, { ReactElement } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView, TimeView } from '../'
import styles from './styles.module.css'

import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
import { useDayState } from '../../store/DayProvider'
const viewsSelector = (currentView: string) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <YearsView />
      break
    case MONTHS_VIEW:
      view = <MonthsView />
      break
    case DAYS_VIEW:
      view = <DaysView />
      break
    default:
      view = <DaysView />
  }
  return view
}
const Wrapper = ({ onChange }: any) => {
  const date = useDayState()
  React.useEffect(() => {
    onChange(date)
  }, [date])

  return (
    <div className={styles.dtWrapper}>
      <Header />
      {viewsSelector(useViewState())}
      <TimeView />
    </div>
  )
}

export default Wrapper
