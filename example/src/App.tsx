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
  const [date, setDate] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  })
  // const handelState = (date: Date) => {
  //   setDate((oldState) => ({
  //     ...oldState,
  //     date
  //   }))
  // }
  return (
    <>
      <DtPicker onChange={setDate} type='range' defaultValue={date} />
      <div>
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
      </div>
      {/* {date && (
        <h1>{`${date.getFullYear()} / ${
          date.getMonth() + 1
        } / ${date.getDate()} - ${date.getHours()} : ${date.getMinutes()}`}</h1>
      )} */}
    </>
  )
}

export default App
