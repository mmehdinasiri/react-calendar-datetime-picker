import React, { ReactElement } from 'react'
import { useViewState } from '../../store/ViewProvider'
import { Header, Years, Months, Days } from '../'
import styles from './styles.module.css'
// import { viewsSelector } from '../../Convertor'

import { DAYS_VIEW, MONTHS_VIEW, YEARS_VIEW } from '../../Constant'
const viewsSelector = (currentView: string) => {
  let view: ReactElement | unknown
  switch (currentView) {
    case YEARS_VIEW:
      view = <Years />
      break
    case MONTHS_VIEW:
      view = <Months />
      break
    case DAYS_VIEW:
      view = <Days />
      break
    default:
      view = <Days />
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
