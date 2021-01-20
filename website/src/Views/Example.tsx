import React, { useState } from 'react'
import { DtPicker } from 'react-datetime-picker'
import 'react-datetime-picker/dist/index.css'
import { DocLayout } from '../Component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
// import { ReactComponent as arrowLeft } from '../Component/Icons/arrow-left.svg'
import {
  singleExampleStr,
  singlePersianExampleStr,
  rangeExampleStr,
  multiExampleStr
} from '../Constant/sampleString'

// import { ReactComponent as arrowRight } from '../Component/Icons/arrow-right.svg'

const App = () => {
  const [singleExample, setSingleExample] = useState(null)
  const [singlePersianExample, setSinglePersianExample] = useState(null)
  const [rangeExample, setRangeExample] = useState(null)
  const [multiExample, setMultiExample] = useState(null)
  return (
    <DocLayout>
      <div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
        <h3 id='SimpleExample' className='font-lg font-bold mb-4'>
          Select single day
        </h3>
        <div className='bloc md:flex '>
          <div className='w-2/2 md:w-3/4 lg:w-1/2 pr-10 mb-4 md:mb-0'>
            <SyntaxHighlighter
              class='rounded'
              style={tomorrowNightEighties}
              language='javascript'
            >
              {singleExampleStr}
            </SyntaxHighlighter>
          </div>
          <div className='w-2/2 md:w-1/4 lg:w-1/2'>
            <DtPicker
              defaultValue={singleExample}
              onChange={setSingleExample}
            />
            {JSON.stringify(singleExample, null, 2)}
          </div>
        </div>
      </div>
      <div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
        <h3 id='SimpleExample' className='font-lg font-bold mb-4'>
          Select single Persian(Jalali) day
        </h3>
        <div className='bloc md:flex '>
          <div className='w-2/2 md:w-3/4 lg:w-1/2 pr-10 mb-4 md:mb-0'>
            <SyntaxHighlighter
              class='rounded'
              style={tomorrowNightEighties}
              language='javascript'
            >
              {singlePersianExampleStr}
            </SyntaxHighlighter>
          </div>
          <div className='w-2/2 md:w-1/4 lg:w-1/2'>
            <DtPicker
              defaultValue={singlePersianExample}
              onChange={setSinglePersianExample}
              local='fa'
            />
            {JSON.stringify(singlePersianExample, null, 2)}
          </div>
        </div>
      </div>
      <div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
        <h3 id='SimpleExample' className='font-lg font-bold mb-4'>
          Select a list of days between two days
        </h3>
        <div className='bloc md:flex '>
          <div className='w-2/2 md:w-3/4 lg:w-1/2 pr-10 mb-4 md:mb-0'>
            <SyntaxHighlighter
              class='rounded'
              style={tomorrowNightEighties}
              language='javascript'
            >
              {rangeExampleStr}
            </SyntaxHighlighter>
          </div>
          <div className='w-2/2 md:w-1/4 lg:w-1/2'>
            <DtPicker
              defaultValue={rangeExample}
              onChange={setRangeExample}
              type='range'
            />
            {JSON.stringify(rangeExample, null, 2)}
          </div>
        </div>
      </div>
      <div className='my-10 pb-4 border-b border-primary border-opacity-50 '>
        <h3 id='SimpleExample' className='font-lg font-bold mb-4'>
          Select multi days
        </h3>
        <div className='bloc md:flex '>
          <div className='w-2/2 md:w-3/4 lg:w-1/2 pr-10 mb-4 md:mb-0'>
            <SyntaxHighlighter
              class='rounded'
              style={tomorrowNightEighties}
              language='javascript'
            >
              {multiExampleStr}
            </SyntaxHighlighter>
          </div>
          <div className='w-2/2 md:w-1/4 lg:w-1/2'>
            <DtPicker
              defaultValue={multiExample}
              onChange={setMultiExample}
              type='multi'
            />
            {JSON.stringify(multiExample, null, 2)}
          </div>
        </div>
      </div>
    </DocLayout>
  )
}

export default App
