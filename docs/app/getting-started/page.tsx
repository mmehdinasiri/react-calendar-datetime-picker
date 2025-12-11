'use client'

import {
  CodeBlock,
  InfoBox,
  Breadcrumb,
  FeatureList,
  Note,
  Important
} from '../components'
import { gettingStartedContent } from './gettingStartedContent'

export default function GettingStarted() {
  const content = gettingStartedContent

  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>LEARN REACT CALENDAR &gt;</Breadcrumb>
        <h1>Quick Start</h1>
        <p>{content.basicUsageIntro}</p>

        <h2>{content.basicUsage.title}</h2>
        <p>{content.basicUsage.intro}</p>

        <h3>{content.basicUsage.dtPicker.title}</h3>
        <p>{content.basicUsage.dtPicker.description}</p>
        <CodeBlock
          language='tsx'
          code={content.basicUsage.dtPicker.code}
          className='mb-4'
        />

        <h3>{content.basicUsage.dtCalendar.title}</h3>
        <p>{content.basicUsage.dtCalendar.description}</p>
        <CodeBlock
          language='tsx'
          code={content.basicUsage.dtCalendar.code}
          className='mb-4'
        />

        <h2>{content.calendarTypes.title}</h2>
        <p>{content.calendarTypes.intro}</p>

        {content.calendarTypes.types.map((type, idx) => (
          <div key={idx}>
            <h3>{type.title}</h3>
            <CodeBlock language='tsx' code={type.code} className='mb-4' />
          </div>
        ))}

        <h2>{content.calendarLocales.title}</h2>
        <p>{content.calendarLocales.intro}</p>

        <h3>{content.calendarLocales.gregorian.title}</h3>
        <CodeBlock
          language='tsx'
          code={content.calendarLocales.gregorian.code}
          className='mb-4'
        />

        <h3>{content.calendarLocales.jalali.title}</h3>
        <CodeBlock
          language='tsx'
          code={content.calendarLocales.jalali.code}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>Note:</strong> {content.calendarLocales.note}
          </p>
        </Note>

        <h2>{content.timeSelection.title}</h2>
        <p>{content.timeSelection.intro}</p>
        <CodeBlock
          language='tsx'
          code={content.timeSelection.code}
          className='mb-4'
        />

        <h2>{content.dateConstraints.title}</h2>
        <p>{content.dateConstraints.intro}</p>
        <CodeBlock
          language='tsx'
          code={content.dateConstraints.code}
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>Important:</strong> {content.dateConstraints.important}
          </p>
        </Important>

        <FeatureList
          title='Next Steps'
          items={content.nextSteps}
          variant='next-steps'
          headingLevel={2}
        />

        <InfoBox variant='tip'>
          <p className='text-sm text-gray-200'>
            <strong>Tip:</strong> {content.tip}
          </p>
        </InfoBox>
      </div>
    </div>
  )
}
