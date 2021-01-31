import React from 'react'
import { DocLayout } from '../Component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  // dark,
  tomorrowNightEighties
  // atomOneDarkReasonable
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const usageString = `
import { DtPicker } from 'react-datetime-picker'
import 'react-datetime-picker/dist/index.css'

const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        initValue={date}
        type='single'
        local='en'
        withTime
        showWeekend
      />
  )
}
export default DatePicker
`

const QuickStart = () => {
  return (
    <DocLayout>
      <section className='my-10'>
        <h1 className='text-3xl my-3'>Installation:</h1>
        <p className='text-base mb-1'>The package can be installed via NPM:</p>
        <div className='w-2/3'>
          <SyntaxHighlighter style={tomorrowNightEighties} className='rounded'>
            {'npm install react-datetime-picker'}
          </SyntaxHighlighter>
        </div>
        <p className='text-base mb-1'>Or by using Yarn:</p>
        <div className='w-2/3'>
          <SyntaxHighlighter style={tomorrowNightEighties} className='rounded'>
            {'yarn add react-datetime-picker'}
          </SyntaxHighlighter>
        </div>
      </section>
      <section className='my-10'>
        <h1 className='text-3xl my-3'>Usage:</h1>
        <p className='text-base mb-1'>Here's an example of basic usage:</p>
        <div className='w-2/3'>
          <SyntaxHighlighter
            className='rounded'
            style={tomorrowNightEighties}
            language='javascript '
          >
            {usageString}
          </SyntaxHighlighter>
        </div>
      </section>
    </DocLayout>
  )
}

export default QuickStart
