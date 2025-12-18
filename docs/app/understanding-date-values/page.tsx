'use client'

import Link from 'next/link'
import {
  CodeBlock,
  InfoBox,
  Breadcrumb,
  FeatureList,
  Important
} from '../components'
import { understandingDateValuesContent } from './understandingDateValuesContent'

export default function UnderstandingDateValues() {
  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>GET STARTED &gt;</Breadcrumb>
        <h1>{understandingDateValuesContent.title}</h1>

        <p>{understandingDateValuesContent.description}</p>

        <h2>{understandingDateValuesContent.dateObjectFormat.title}</h2>

        <p>{understandingDateValuesContent.dateObjectFormat.description}</p>

        <CodeBlock
          language='typescript'
          code={understandingDateValuesContent.dateObjectFormat.code}
          className='mb-4'
        />

        <h2>{understandingDateValuesContent.singleDateExample.title}</h2>

        <p>{understandingDateValuesContent.singleDateExample.description}</p>

        <CodeBlock
          language='tsx'
          code={understandingDateValuesContent.singleDateExample.code}
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>
              {understandingDateValuesContent.singleDateExample.important.title}
            </strong>{' '}
            {understandingDateValuesContent.singleDateExample.important.content}
          </p>
        </Important>

        <h2>{understandingDateValuesContent.dateRangeFormat.title}</h2>

        <p>{understandingDateValuesContent.dateRangeFormat.description}</p>

        <CodeBlock
          language='typescript'
          code={understandingDateValuesContent.dateRangeFormat.code}
          className='mb-4'
        />

        <h2>{understandingDateValuesContent.multipleDatesFormat.title}</h2>

        <p>{understandingDateValuesContent.multipleDatesFormat.description}</p>

        <CodeBlock
          language='typescript'
          code={understandingDateValuesContent.multipleDatesFormat.code}
          className='mb-4'
        />

        <h2>{understandingDateValuesContent.customDisplayFormat.title}</h2>

        <p>{understandingDateValuesContent.customDisplayFormat.description}</p>

        <CodeBlock
          language='tsx'
          code={understandingDateValuesContent.customDisplayFormat.code}
          className='mb-4'
        />

        <InfoBox variant='tip'>
          <p className='text-sm text-gray-200'>
            <strong>
              {understandingDateValuesContent.customDisplayFormat.tip.title}
            </strong>{' '}
            {understandingDateValuesContent.customDisplayFormat.tip.content}{' '}
            <Link
              href='/types'
              className='text-accent-light hover:text-accent-light-hover underline'
            >
              Types
            </Link>{' '}
            documentation.
          </p>
        </InfoBox>

        <h2>{understandingDateValuesContent.jalaliConversion.title}</h2>

        <p>{understandingDateValuesContent.jalaliConversion.description}</p>

        <CodeBlock
          language='tsx'
          code={understandingDateValuesContent.jalaliConversion.code}
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>
              {understandingDateValuesContent.jalaliConversion.important.title}
            </strong>{' '}
            {understandingDateValuesContent.jalaliConversion.important.content}
          </p>
        </Important>

        <FeatureList
          title='Next Steps'
          items={understandingDateValuesContent.nextSteps}
          variant='next-steps'
          headingLevel={2}
        />
      </div>
    </div>
  )
}
