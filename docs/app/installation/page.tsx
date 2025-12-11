'use client'

import Link from 'next/link'
import {
  CodeBlock,
  InfoBox,
  Breadcrumb,
  FeatureList,
  Note,
  Important
} from '../components'
import { installationContent } from './installationContent'

export default function Installation() {
  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>GET STARTED &gt;</Breadcrumb>
        <h1>{installationContent.title}</h1>

        <p>{installationContent.intro}</p>

        <h2>{installationContent.packageManagers.title}</h2>

        <p>{installationContent.packageManagers.description}</p>

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.npm}
          className='mb-4'
        />

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.yarn}
          className='mb-4'
        />

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.pnpm}
          className='mb-4'
        />

        <h2>{installationContent.importStyles.title}</h2>

        <p>{installationContent.importStyles.description}</p>

        <CodeBlock
          language='tsx'
          code={installationContent.importStyles.code}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>{installationContent.importStyles.note.title}</strong>{' '}
            {installationContent.importStyles.note.content}
          </p>
        </Note>

        <h2>{installationContent.understandingDateValues.title}</h2>

        <p>{installationContent.understandingDateValues.description}</p>

        <h3>
          {installationContent.understandingDateValues.dateObjectFormat.title}
        </h3>

        <p>
          {
            installationContent.understandingDateValues.dateObjectFormat
              .description
          }
        </p>

        <CodeBlock
          language='typescript'
          code={
            installationContent.understandingDateValues.dateObjectFormat.code
          }
          className='mb-4'
        />

        <h3>
          {installationContent.understandingDateValues.singleDateExample.title}
        </h3>

        <p>
          {
            installationContent.understandingDateValues.singleDateExample
              .description
          }
        </p>

        <CodeBlock
          language='tsx'
          code={
            installationContent.understandingDateValues.singleDateExample.code
          }
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>
              {
                installationContent.understandingDateValues.singleDateExample
                  .important.title
              }
            </strong>{' '}
            {
              installationContent.understandingDateValues.singleDateExample
                .important.content
            }
          </p>
        </Important>

        <h3>
          {installationContent.understandingDateValues.dateRangeFormat.title}
        </h3>

        <p>
          {
            installationContent.understandingDateValues.dateRangeFormat
              .description
          }
        </p>

        <CodeBlock
          language='typescript'
          code={
            installationContent.understandingDateValues.dateRangeFormat.code
          }
          className='mb-4'
        />

        <h3>
          {
            installationContent.understandingDateValues.multipleDatesFormat
              .title
          }
        </h3>

        <p>
          {
            installationContent.understandingDateValues.multipleDatesFormat
              .description
          }
        </p>

        <CodeBlock
          language='typescript'
          code={
            installationContent.understandingDateValues.multipleDatesFormat.code
          }
          className='mb-4'
        />

        <h3>
          {
            installationContent.understandingDateValues.customDisplayFormat
              .title
          }
        </h3>

        <p>
          {
            installationContent.understandingDateValues.customDisplayFormat
              .description
          }
        </p>

        <CodeBlock
          language='tsx'
          code={
            installationContent.understandingDateValues.customDisplayFormat.code
          }
          className='mb-4'
        />

        <InfoBox variant='tip'>
          <p className='text-sm text-gray-200'>
            <strong>
              {
                installationContent.understandingDateValues.customDisplayFormat
                  .tip.title
              }
            </strong>{' '}
            {
              installationContent.understandingDateValues.customDisplayFormat
                .tip.content
            }{' '}
            <Link
              href='/types'
              className='text-accent-light hover:text-accent-light-hover underline'
            >
              Types
            </Link>{' '}
            documentation.
          </p>
        </InfoBox>

        <h3>
          {installationContent.understandingDateValues.jalaliConversion.title}
        </h3>

        <p>
          {
            installationContent.understandingDateValues.jalaliConversion
              .description
          }
        </p>

        <CodeBlock
          language='tsx'
          code={
            installationContent.understandingDateValues.jalaliConversion.code
          }
          className='mb-4'
        />

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>
              {
                installationContent.understandingDateValues.jalaliConversion
                  .important.title
              }
            </strong>{' '}
            {
              installationContent.understandingDateValues.jalaliConversion
                .important.content
            }
          </p>
        </Important>

        <FeatureList
          title='Next Steps'
          items={installationContent.nextSteps}
          variant='next-steps'
          headingLevel={2}
        />
      </div>
    </div>
  )
}
