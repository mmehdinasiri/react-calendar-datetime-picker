import React from 'react'
// import React, { useState } from 'react'
// import {
//   useSelectedDayState,
//   useSelectedDayActions
// } from '../../store/SelectedDaysProvider'
// import { useCalenderState } from '../../store/CalenderProvider'
// import useDidMountEffect from '../../hooks/useDidMountEffect'

const TimeView = ({ timeFor }: ITimeViewProps) => {
  console.log(timeFor)
  // const calender = useCalenderState()
  // let selectedDate = useSelectedDayState()
  // const { changeSelectedDay, changeSelectedDayRange } = useSelectedDayActions()
  // if (timeFor === 'from') {
  //   // @ts-ignore
  //   selectedDate = selectedDate.from
  // } else if (timeFor === 'to') {
  //   // @ts-ignore
  //   selectedDate = selectedDate.to
  // }
  // console.log(selectedDate)
  // const [hours, setHours] = useState<number>(
  //   // @ts-ignore
  //   selectedDate?.getHours() || calender.getHours()
  // )
  // const [minutes, setMinutes] = useState<number>(
  //   // @ts-ignore
  //   selectedDate?.getMinutes() || calender.getMinutes()
  // )
  // const actionSelector = (newDate: Date) => {
  //   if (timeFor === 'from') {
  //     changeSelectedDayRange({ from: newDate })
  //   } else if (timeFor === 'to') {
  //     changeSelectedDayRange({ to: newDate })
  //   } else {
  //     changeSelectedDay(newDate)
  //   }
  // }
  // const handelChangeHours = () => {
  //   // @ts-ignore
  //   const newDate: Date = new Date(selectedDate) || new Date(date)
  //   newDate.setHours(hours, minutes)
  //   actionSelector(newDate)
  // }
  // const handelChangeMinutes = () => {
  //   // @ts-ignore
  //   const newDate: Date = new Date(selectedDate) || new Date(date)
  //   newDate.setHours(hours, minutes)
  //   if (minutes === 60) {
  //     if (hours !== 24) {
  //       setHours(hours + 1)
  //     } else {
  //       setHours(0)
  //     }
  //   }
  //   actionSelector(newDate)
  // }
  // useDidMountEffect(() => {
  //   handelChangeHours()
  // }, [hours])
  // useDidMountEffect(() => {
  //   handelChangeMinutes()
  // }, [minutes])
  // return (
  //   <div>
  //     <input
  //       value={hours}
  //       type='number'
  //       max='24'
  //       min='0'
  //       onChange={(e) => setHours(Number(e.target.value))}
  //       disabled={!selectedDate || selectedDate === undefined}
  //     />
  //     :
  //     <input
  //       value={minutes}
  //       type='number'
  //       max='60'
  //       min='0'
  //       onChange={(e) => setMinutes(Number(e.target.value))}
  //       disabled={!selectedDate || selectedDate === undefined}
  //     />
  //   </div>
  // )
  return <div>time</div>
}

export default TimeView
