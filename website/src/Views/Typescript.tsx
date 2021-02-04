import React, { useState } from 'react'
import { DocLayout } from '../Component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import DtPicker, { Day, Range, Multi } from 'react-calendar-datetime-picker'
import { typescriptStr } from '../Constant/sampleString'

const Typescript = () => {
  const [date, setDate] = useState<Day>()
  const [dateRange, setDateRange] = useState<Range>(null)
  const [dateMulti, setDateMulti] = useState<Multi>(null)
  return (
    <DocLayout>
      <section className=''>
        <h1 className='text-3xl mb-6'>Typescript:</h1>
        <p className='text-lg'>
          This package contains built-in TypeScript declarations.
        </p>
        <p className='text-lg'>
          <strong>Day</strong>, <strong>Range</strong> and{' '}
          <strong>Multi</strong> are the three types of value that you can
          initialize to your date picker based on the date picker type{' '}
          <span className='text-base'>( single, range, multi )</span> that you
          choose to use.
        </p>

        <div className='mt-10'>
          <div className='mb-10 pb-4 border-b border-primary border-opacity-50 '>
            <div className='block xl:flex '>
              <div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
                <SyntaxHighlighter
                  className='rounded'
                  style={tomorrowNightEighties}
                  language='javascript'
                >
                  {typescriptStr}
                </SyntaxHighlighter>
              </div>
              <div className='w-2/2 lg:w-1/4 xl:w-1/2'>
                <DtPicker
                  initValue={date}
                  onChange={setDate}
                  placeholder='select single day'
                  inputClass='mb-2'
                />
                <DtPicker
                  initValue={dateRange}
                  onChange={setDateRange}
                  type='range'
                  placeholder='select range of days'
                  inputClass='mb-2'
                />
                <DtPicker
                  initValue={dateMulti}
                  onChange={setDateMulti}
                  placeholder='select multi days'
                  type='multi'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </DocLayout>
  )
}

export default Typescript
