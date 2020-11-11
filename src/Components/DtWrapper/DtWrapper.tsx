import React from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView, TimeView } from '../'
import styles from './styles.module.css'

import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
const viewsSelector = (currentView: string) => {
  let view: React.ReactElement | unknown
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
const Wrapper = () => {
  return (
    <div className={styles.dtWrapper}>
      <Header />
      {viewsSelector(useViewState())}
      <TimeView />
    </div>
  )
}

export default Wrapper
