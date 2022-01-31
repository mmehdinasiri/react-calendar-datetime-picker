import React, { useEffect, useState } from 'react'
import './style/tailwindPurge.scss'
import './style/main.scss'
import CenterLayout from './Component/Layout/CenterLayout'

// import DtPicker, {
//   DtCalendar,
//   convertToFa,
//   Range,
//   convertToEn
// } from 'react-calendar-datetime-picker'
import DtPicker, { Day, Range, Multi } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

export default function App() {
  const maxDate = {
    year: 2012,
    month: 6,
    day: 23
  }
  const minDate = {
    year: 2010,
    month: 2,
    day: 10
  }
  const [open, setOpen] = useState(0)
  const [close, setClose] = useState(0)
  const [change, setChange] = useState(0)
  const handleCalendarChange = (newDate: any) => {
    console.log('newDate', newDate)
    console.log('Calendar changed')
    setChange(change + 1)
  }
  const handleCalendarClose = () => {
    setClose(close + 1)
    console.log('Calendar closed')
  }
  const handleCalendarOpen = () => {
    setOpen(open + 1)
    console.log('Calendar opened')
  }
  const [main, setMain] = useState<Day>({
    year: 2010,
    month: 2,
    day: 22,
    hour: 11,
    minute: 2
  })
  // const [range, setRange] = useState<Range>(null)
  const [range, setRange] = useState<Range>({
    from: {
      year: 2010,
      month: 2,
      day: 22,
      hour: 11,
      minute: 2
    },
    to: {
      year: 2010,
      month: 5,
      day: 22,
      hour: 11,
      minute: 2
    }
  })

  const [multi, setMulti] = useState<Multi>([
    {
      year: 2010,
      month: 2,
      day: 22,
      hour: 11,
      minute: 2
    },
    {
      year: 2010,
      month: 2,
      day: 25,
      hour: 11,
      minute: 2
    },
    {
      year: 2010,
      month: 2,
      day: 1,
      hour: 11,
      minute: 2
    },
    {
      year: 2010,
      month: 3,
      day: 25,
      hour: 11,
      minute: 2
    }
  ])
  useEffect(() => {
    setTimeout(() => {
      // console.log('run')
      // setMain({
      //   year: 2014,
      //   month: 3,
      //   day: 22,
      //   hour: 11,
      //   minute: 2
      // })
    }, 2000)
  }, [])
  // console.log(main)
  return (
    <CenterLayout>
      <div className='my-20 mx-auto'>
        <div className=' w-56'>
          <DtPicker
            onChange={setMain}
            local='en'
            initValue={main}
            type='single'
            withTime
            showTimeInput
            yearListStyle='list'
            // autoClose={false}
            // onCalenderChange={handleCalendarChange}
            // onCalenderShow={handleCalendarOpen}
            // onCalenderHide={handleCalendarClose}
            // minDate={minDate}
            // maxDate={maxDate}
          />
        </div>
      </div>
      <button type='button' onClick={() => setMain(null)}>
        click
      </button>
      <hr />
      <button
        type='button'
        onClick={() =>
          setMain({
            year: 2020,
            month: 2,
            day: 22,
            hour: 11,
            minute: 2
          })
        }
      >
        click
      </button>
      <div>
        -------------------------------------------------------------------------------------
      </div>
      <div className='my-20 mx-auto'>
        <div className=' w-56'>
          <span className='block'>open: {open}</span>
          <span className='block'>change: {change}</span>
          <span className='block'>close: {close}</span>
          <DtPicker
            onChange={setRange}
            local='en'
            initValue={range}
            type='range'
            withTime
            showTimeInput
            yearListStyle='list'
            autoClose={false}
            onCalenderChange={handleCalendarChange}
            onCalenderShow={handleCalendarOpen}
            onCalenderHide={handleCalendarClose}
          />
        </div>
      </div>
      <pre>{JSON.stringify(range, null, 4)}</pre>
      <button type='button' onClick={() => setRange(null)}>
        click
      </button>
      <hr />
      <button
        type='button'
        onClick={() =>
          setRange({
            from: {
              year: 2020,
              month: 2,
              day: 22,
              hour: 11,
              minute: 2
            },
            to: {
              year: 2020,
              month: 5,
              day: 22,
              hour: 11,
              minute: 2
            }
          })
        }
      >
        click
      </button>
      <div>
        -------------------------------------------------------------------------------------
      </div>
      <div className='my-20 mx-auto'>
        <div className=' w-56'>
          <DtPicker
            onChange={setMulti}
            local='en'
            initValue={multi}
            type='multi'
            withTime
            showTimeInput
            yearListStyle='list'
            autoClose={false}
            // onCalenderChange={handleCalendarChange}
            // onCalenderShow={handleCalendarOpen}
            // onCalenderHide={handleCalendarClose}
          />
        </div>
      </div>
      <pre>{JSON.stringify(multi, null, 4)}</pre>
      <button type='button' onClick={() => setMulti(null)}>
        click
      </button>
      <hr />
      <button
        type='button'
        onClick={() =>
          setMulti([
            {
              year: 2019,
              month: 2,
              day: 22,
              hour: 11,
              minute: 2
            },
            {
              year: 2019,
              month: 2,
              day: 25,
              hour: 11,
              minute: 2
            },
            {
              year: 2019,
              month: 2,
              day: 1,
              hour: 11,
              minute: 2
            },
            {
              year: 2019,
              month: 3,
              day: 25,
              hour: 11,
              minute: 2
            }
          ])
        }
      >
        click
      </button>
    </CenterLayout>
  )
}
