import React from 'react'
// import React, { useEffect, useState } from 'react'
// import {
//   useSelectedDayActions,
//   useSelectedDayState
// } from '../../store/SelectedDaysProvider'
// // import useDidMountEffect from '../../hooks/useDidMountEffect'

const TimeView = () => {
  // const TimeView = ({ timeFor, initHour, initMinutes }: ITimeViewProps) => {
  //   const today = new Date()

  //   const selectedDate = useSelectedDayState()
  //   const { changeSelectedDay, changeSelectedDayRange } = useSelectedDayActions()

  //   const [hours, setHours] = useState<number>(initHour || today.getHours())

  //   const [minutes, setMinutes] = useState<number>(
  //     initMinutes || today.getMinutes()
  //   )
  //   const handelChangeHours = () => {
  //     let newTime = selectedDate
  //     // @ts-ignore
  //     if (timeFor === 'from') {
  //       // @ts-ignore
  //       newTime = {
  //         from: {
  //           // @ts-ignore
  //           ...newTime.from,
  //           hours,
  //           minutes
  //         }
  //       }
  //       console.log('from')
  //       console.log(newTime)
  //       changeSelectedDayRange('from', (newTime as IRange).from)
  //     } else if (timeFor === 'to') {
  //       // @ts-ignore
  //       newTime = {
  //         to: {
  //           // @ts-ignore
  //           ...newTime.to,
  //           hours,
  //           minutes
  //         }
  //       }
  //       console.log('from')
  //       console.log(newTime)
  //       changeSelectedDayRange('to', (newTime as IRange).to)
  //     } else if (timeFor === 'single') {
  //       console.log('single')
  //       // @ts-ignore
  //       newTime = {
  //         ...newTime,
  //         hours,
  //         minutes
  //       }
  //       changeSelectedDay(newTime as IDay)
  //     }
  //   }
  //   useEffect(() => {
  //     handelChangeHours()
  //   }, [hours, minutes])

  //   return (
  //     <div>
  //       <input
  //         value={hours}
  //         type='number'
  //         max='24'
  //         min='0'
  //         onChange={(e) => setHours(Number(e.target.value))}
  //         disabled={!selectedDate || selectedDate === undefined}
  //       />
  //       :
  //       <input
  //         value={minutes}
  //         type='number'
  //         max='60'
  //         min='0'
  //         onChange={(e) => setMinutes(Number(e.target.value))}
  //         disabled={!selectedDate || selectedDate === undefined}
  //       />
  //     </div>
  //   )
  return <div>time</div>
}

export default TimeView
