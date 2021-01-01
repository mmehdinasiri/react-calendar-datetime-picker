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
  // const [dateEn, setDateEn] = useState()
  const [dateEn2, setDateEn2] = useState(null)
  const [dateEn3, setDateEn3] = useState()
  const [dateFa1, setDateFa1] = useState()
  const [dateFa2, setDateFa2] = useState()
  // const [dateEn, setDateEn] = useState({ year: 1398, month: 8, day: 1 })
  // const [dateEn, setDateEn] = useState({
  //   from: { year: 2012, month: 5, day: 2 },
  //   to: { year: 2012, month: 5, day: 23 }
  // })
  // const [dateEn, setDateEn] = useState({
  //   from: { year: 2008, month: 8, day: 2, minutes: 33 },
  //   to: { year: 2008, month: 8, day: 6, hours: 12 }
  // })
  // const [dateFa, setDateFa] = useState({
  //   from: { year: 1395, month: 0, day: 2, minutes: 33 },
  //   to: { year: 1395, month: 0, day: 6, hours: 12 }
  // })
  // const [date, setDate] = useState({
  //   from: null,
  //   to: null
  // })
  // const [dateEn, setDateEn] = useState([
  //   {
  //     year: 2012,
  //     month: 5,
  //     day: 29,
  //     hours: 18,
  //     minutes: 11
  //   },
  //   {
  //     year: 2012,
  //     month: 5,
  //     day: 2,
  //     hours: 18,
  //     minutes: 11
  //   },
  //   {
  //     year: 2012,
  //     month: 6,
  //     day: 3,
  //     hours: 18,
  //     minutes: 11
  //   }
  // ])
  // const [dateFa, setDateFa] = useState([
  //   {
  //     year: 1399,
  //     month: 5,
  //     day: 25,
  //     hours: 18,
  //     minutes: 11
  //   },
  //   {
  //     year: 1399,
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
  // const [dateEn, setDateEn] = useState({
  //   year: 2010,
  //  month: 3,
  // 23
  // })
  // const maxDate = {
  //   year: 2012,
  //   month: 6,
  //   day: 23
  // }
  // const minDate = {
  //   year: 2012,
  //   month: 5,
  //   day: 2
  // }

  const [dateEn, setDateEn] = useState({ year: 2016, month: 6, day: 20 })
  const maxDate = {
    year: 2016,
    month: 6,
    day: 23
  }
  const minDate = {
    year: 2012,
    month: 5,
    day: 2
  }
  const disabledDates = [
    {
      year: 2015,
      month: 6,
      day: 23
    },
    {
      year: 2015,
      month: 6,
      day: 12
    },
    {
      year: 2015,
      month: 6,
      day: 10
    }
  ]
  const handleCalendarChange = (newDate: any) => {
    console.log('Calendar changed')
    setDateEn(newDate)
  }
  const handleCalendarClose = () => console.log('Calendar closed')
  const handleCalendarOpen = () => console.log('Calendar opened')
  return (
    <div style={{ margin: 'auto', width: '720px' }}>
      <p>
        Single type En with time and max-min date and disabled date also change
        icons
      </p>
      <DtPicker
        onChange={handleCalendarChange}
        defaultValue={dateEn}
        type='single'
        local='en'
        withTime
        showWeekend
        clearBtn
        isRequired
        todayBtn //if min or max date used, todayBtn will shows just when it's between min and max
        placeholder='seleccccccct'
        nextBtnLabel='next'
        previousBtnLabel='previous'
        fromLabel='from date'
        toLabel='to date'
        clockFromLabel='froom'
        clockToLabel='too'
        clockLabel='cloock'
        nextMonthBtnTitle='next btn Title'
        previousMonthBtnTitle='previous btn Title'
        inputClass='inputClass'
        clearBtnClass='clearBtnClass'
        calenderModalClass='calenderModalClass'
        headerClass='headerClass'
        timeClass='timeClass'
        daysClass='daysClass'
        monthsClass='monthClass'
        yearsClass='yearClass'
        onCalenderShow={handleCalendarOpen}
        onCalenderHide={handleCalendarClose}
        maxDate={maxDate}
        minDate={minDate}
        disabledDates={disabledDates}
        // isDisabled
      />
      {JSON.stringify(dateEn, null, 4)}
      <br />
      <p>Range En with time</p>
      <DtPicker
        onChange={setDateEn2}
        defaultValue={dateEn2}
        type='range'
        local='en'
        showWeekend
        clearBtn
        withTime
      />
      {JSON.stringify(dateEn2, null, 4)}
      <br />

      <p>Multi En no time</p>
      <DtPicker
        onChange={setDateEn3}
        defaultValue={dateEn3}
        type='multi'
        local='en'
        showWeekend
      />
      {JSON.stringify(dateEn3, null, 4)}
      <br />
      <br />
      <br />
      <p>Single Fa with time</p>
      <DtPicker
        onChange={setDateFa1}
        defaultValue={dateFa1}
        withTime
        type='single'
        local='fa'
        showWeekend
        clearBtn
      />
      {JSON.stringify(dateFa1, null, 4)}
      <br />
      <br />
      <br />
      <p>Range Fa with time</p>
      <DtPicker
        onChange={setDateFa2}
        defaultValue={dateFa2}
        withTime
        type='range'
        local='fa'
        showWeekend
        todayBtn
      />
      {JSON.stringify(dateFa2, null, 4)}
    </div>
  )
}

export default App
