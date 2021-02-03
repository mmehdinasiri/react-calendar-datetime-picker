import React, { useState } from 'react'
import { DocLayout } from '../Component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { convertToEnStr, convertToFaStr } from '../Constant/sampleString'
import DtPicker, {
  convertToFa,
  convertToEn
} from 'react-calendar-datetime-picker'

const Utilities = () => {
  const [convertToEnDate, setConvertToEnDate] = useState(null)
  const [convertToFaDate, setConvertToFaDate] = useState(null)
  return (
    <DocLayout>
      <section className=''>
        <h1 className='text-3xl mb-6'>Utilities:</h1>
        <p className='text-lg'>
          You can import and use these two function to convert En date to jalali
          date and vice versa.
          <br />
          These functions accept date object as first argument and divider sign
          as second argument('/' is default value)
        </p>
        <hr />
        <div className='mt-10'>
          <div className='mb-10 pb-4 border-b border-primary border-opacity-50 '>
            <h3
              id='selectSingleDay'
              className='text-2xl font-bold mb-4 scroll-offset font-semibold'
            >
              convertToFa( dateObj, '/' )
            </h3>
            <div className='block xl:flex '>
              <div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
                <SyntaxHighlighter
                  className='rounded'
                  style={tomorrowNightEighties}
                  language='javascript'
                >
                  {convertToFaStr}
                </SyntaxHighlighter>
              </div>
              <div className='w-2/2 lg:w-1/4 xl:w-1/2'>
                <DtPicker
                  initValue={convertToEnDate}
                  onChange={setConvertToEnDate}
                />
                value: <pre>{JSON.stringify(convertToEnDate, null, 2)}</pre>
                <br />
                converted value:
                <pre>
                  {JSON.stringify(convertToFa(convertToEnDate), null, 2)}
                </pre>
              </div>
            </div>
          </div>
          <div className='mb-10 pb-4'>
            <h3
              id='selectSingleDay'
              className='text-2xl font-bold mb-4 scroll-offset font-semibold'
            >
              convertToEn(dateObj, '-')
            </h3>
            <div className='block xl:flex '>
              <div className='w-2/2 lg:w-3/4 xl:w-1/2 pr-10 mb-4 xl:mb-0'>
                <SyntaxHighlighter
                  className='rounded'
                  style={tomorrowNightEighties}
                  language='javascript'
                >
                  {convertToEnStr}
                </SyntaxHighlighter>
              </div>
              <div className='w-2/2 lg:w-1/4 xl:w-1/2'>
                <DtPicker
                  initValue={convertToFaDate}
                  onChange={setConvertToFaDate}
                  withTime
                  local='fa'
                />
                value: <pre>{JSON.stringify(convertToFaDate, null, 2)}</pre>
                <br />
                converted value:
                <pre>
                  {JSON.stringify(convertToEn(convertToFaDate, '-'), null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DocLayout>
  )
}

export default Utilities
