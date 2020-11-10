import React, { ReactElement } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, YearsView, MonthsView, DaysView } from '../'
import styles from './styles.module.css'
// import { viewsSelector } from '../../Convertor'

import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
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
const Wrapper = () => {
  return (
    <div className={styles.dtWrapper}>
      <Header />
      {viewsSelector(useViewState())}
    </div>
  )
}

export default Wrapper
