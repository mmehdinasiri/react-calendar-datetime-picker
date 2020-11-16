import React, { useState } from 'react'

import { DtPicker } from 'react-datetime-picker'
import 'react-datetime-picker/dist/index.css'

const App = () => {
  // const day = new Date(1999, 1, 12)
  // const day = new Date(2015, 6, 15)
  // const day = new Date(1991, 5, 29)
  // const day = new Date(2015, 0, 15)
  // const day = new Date(2009, 11, 1)
  // const day = new Date(1984, 1, 25)
  // const day = new Date(2000, 11, 9)
  const [date, setDate] = useState()
  // const [date, setDate] = useState({ year: 1398, month: 8, day: 1 })
  // const [date, setDate] = useState({
  //   from: { year: 2000, month: 5, day: 2 },
  //   to: { year: 2000, month: 5, day: 25 }
  // })
  // const [date, setDate] = useState({
  //   from: { year: 2008, month: 8, day: 2, minutes: 33 },
  //   to: { year: 2008, month: 8, day: 6, hours: 12 }
  // })
  // const [date, setDate] = useState({
  //   from: null,
  //   to: null
  // })
  // const [date, setDate] = useState([
  //   {
  //     year: 2000,
  //     month: 5,
  //     day: 25,
  //     hours: 18,
  //     minutes: 11
  //   },
  //   {
  //     year: 2000,
  //     month: 5,
  //     day: 1,
  //     hours: 18,
  //     minutes: 11
  //   }
  // ])
  // const [date, setDate] = useState({
  //   year: 2000,
  //   month: 0,
  //   day: 25
  // })
  // const [date, setDate] = useState({
  //   year: 2000,
  //   month: 5,
  //   day: 25,
  //   hour: 12,
  //   minutes: 15
  // })
  // const [date, setDate] = useState()

  return (
    <>
      <DtPicker onChange={setDate} defaultValue={date} withTime local='en' />
      <br />
      <DtPicker onChange={setDate} defaultValue={date} withTime local='fa' />
      {/* <DtPicker onChange={setDate} defaultValue={date} /> */}
      {/* <div>
        {date.from && (
          <h1>{`${date.from.getFullYear()} / ${
            date.from.getMonth() + 1
          } / ${date.from.getDate()} - ${date.from.getHours()} : ${date.from.getMinutes()}`}</h1>
        )}
      </div>
      <div>
        {date.to && (
          <h1>{`${date.to.getFullYear()} / ${
            date.to.getMonth() + 1
          } / ${date.to.getDate()} - ${date.to.getHours()} : ${date.to.getMinutes()}`}</h1>
        )}
      </div> */}
      {JSON.stringify(date, null, 4)}
    </>
  )
}

export default App
