import React, { useState } from 'react'
import './style/tailwindPurge.scss'
import './style/main.scss'
import CenterLayout from './Component/Layout/CenterLayout'

import DtPicker, { DtCalendar } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

export default function App() {
  const [ex1, setEx1] = useState(null)
  const [ex2, setEx2] = useState(null)

  const [ex3, setEx3] = useState(null)
  const [ex4, setEx4] = useState(null)

  const [ex5, setEx5] = useState(null)
  const [ex6, setEx6] = useState(null)
  return (
    <CenterLayout>
      <div className='flex justify-between my-10'>
        <div className='flex  my-10'>
          <DtCalendar
            onChange={setEx1}
            local='en'
            withTime
            calenderModalClass='mx-2'
            type='single'
          />
          <pre className='mt-4'>{JSON.stringify(ex1, null, 2)}</pre>
        </div>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex2, null, 2)}</pre>
          <DtCalendar
            onChange={setEx2}
            local='fa'
            withTime
            calenderModalClass='mx-2'
            type='single'
          />
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <div className='flex my-10'>
          <DtPicker
            onChange={setEx3}
            local='en'
            type='range'
            inputClass='mx-2'
          />
          <pre className='mt-4'>{JSON.stringify(ex3, null, 2)}</pre>
        </div>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex4, null, 2)}</pre>
          <DtPicker
            onChange={setEx4}
            local='fa'
            type='range'
            inputClass='mx-2'
          />
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <div className='flex my-10'>
          <DtPicker
            onChange={setEx5}
            local='en'
            type='multi'
            inputClass='mx-2'
          />
          <pre className='mt-4'>{JSON.stringify(ex5, null, 2)}</pre>
        </div>
        <div className='flex my-10'>
          <pre className='mt-4'>{JSON.stringify(ex6, null, 2)}</pre>
          <DtPicker
            onChange={setEx6}
            local='fa'
            type='multi'
            inputClass='mx-2'
          />
        </div>
      </div>
    </CenterLayout>
  )
}
