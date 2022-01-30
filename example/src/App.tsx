import React, { useState } from 'react'
import './style/tailwindPurge.scss'
import './style/main.scss'
import CenterLayout from './Component/Layout/CenterLayout'

// import DtPicker, {
//   DtCalendar,
//   convertToFa,
//   Range,
//   convertToEn
// } from 'react-calendar-datetime-picker'
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

export default function App() {
  // const [ex1, setEx1] = useState(null)
  // const [ex1init, setEx1init] = useState({
  //   year: 2021,
  //   month: 1,
  //   day: 22,
  //   hour: 0,
  //   minute: 22
  // })
  // const [ex2, setEx2] = useState(null)
  // const [ex2init, setEx2init] = useState<Range>({
  //   from: {
  //     year: 1396,
  //     month: 1,
  //     day: 22,
  //     hour: 0,
  //     minute: 22
  //   },
  //   to: {
  //     year: 1398,
  //     month: 2,
  //     day: 22,
  //     hour: 11,
  //     minute: 2
  //   }
  // })

  // const [ex3, setEx3] = useState(null)
  // const [ex4, setEx4] = useState(null)

  // const [ex5, setEx5] = useState(null)
  // const [ex6, setEx6] = useState(null)
  const [main, setMain] = useState(null)
  console.log(main)
  return (
    <CenterLayout>
      <div className='my-20 mx-auto'>
        <div className=' w-56'>
          <DtPicker
            onChange={setMain}
            local='en'
            type='single'
            withTime
            showTimeInput
            yearListStyle='list'
            autoClose={false}
          />
        </div>
      </div>
      {/* <div className='flex justify-between my-10'>
        <div className='flex  my-10'>
          <DtCalendar
            initValue={ex1init}
            onChange={setEx1}
            local='en'
            withTime
            type='single'
          />

          <pre className='mt-4'>{JSON.stringify(ex1, null, 2)}</pre>
          <pre className='mt-4'>{convertToEn(ex1)}</pre>
        </div>
        <button
          onClick={() =>
            setEx1init({ year: 1398, month: 11, day: 22, hour: 22, minute: 10 })
          }
        >
          update1
        </button>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex2, null, 2)}</pre>
          <DtPicker
            initValue={ex2init}
            onChange={setEx2}
            local='fa'
            withTime
            type='range'
            todayBtn
            maxDate={{
              year: 1402,
              month: 1,
              day: 22,
              hour: 0,
              minute: 22
            }}
            minDate={{
              year: 1395,
              month: 10,
              day: 12,
              hour: 0,
              minute: 22
            }}
          />
          <button
            onClick={() =>
              setEx2init({
                from: {
                  year: 1400,
                  month: 1,
                  day: 22,
                  hour: 0,
                  minute: 22
                },
                to: {
                  year: 1401,
                  month: 2,
                  day: 22,
                  hour: 11,
                  minute: 2
                }
              })
            }
          >
            update2
          </button>
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <div className='flex my-10'>
          <DtPicker onChange={setEx3} local='en' type='single' withTime />
          <pre className='mt-4'>{convertToFa(ex3)}</pre>
          <pre className='mt-4'>{JSON.stringify(ex3, null, 2)}</pre>
        </div>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex4, null, 2)}</pre>
          <DtPicker onChange={setEx4} local='fa' type='range' withTime />
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <div className='flex my-10'>
          <DtPicker onChange={setEx5} local='en' type='multi' />
          <pre className='mt-4'>{JSON.stringify(ex5, null, 2)}</pre>
        </div>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex6, null, 2)}</pre>
          <DtPicker onChange={setEx6} local='fa' type='multi' />
        </div>
      </div> */}
    </CenterLayout>
  )
}
