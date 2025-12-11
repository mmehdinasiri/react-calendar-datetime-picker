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
import { typesContent } from './typesContent'

export default function Types() {
  const { intro, sections, typeSafety, nextSteps } = typesContent

  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>LEARN REACT CALENDAR &gt;</Breadcrumb>
        <h1>{intro.title}</h1>

        <p>{intro.description}</p>

        <Important>
          <p className='text-sm text-gray-200'>
            <strong>Important:</strong> {intro.important}
          </p>
        </Important>

        {sections.map((section) => (
          <div key={section.id}>
            <h2 id={section.id}>{section.title}</h2>

            <p>{section.description}</p>

            {section.interfaceCode && (
              <CodeBlock
                language='typescript'
                code={section.interfaceCode}
                className='mb-4'
              />
            )}

            {section.exampleTitle && section.exampleCode && (
              <>
                <h3>{section.exampleTitle}</h3>
                <CodeBlock
                  language='typescript'
                  code={section.exampleCode}
                  className='mb-4'
                />
              </>
            )}

            {section.usageTitle && section.usageCode && (
              <>
                <h3>{section.usageTitle}</h3>
                <CodeBlock
                  language='tsx'
                  code={section.usageCode}
                  className='mb-4'
                />
              </>
            )}

            {section.note && (
              <>
                {section.noteVariant === 'warning' ? (
                  <InfoBox variant='warning'>
                    <p className='text-sm text-gray-200'>
                      <strong>Note:</strong> {section.note}
                    </p>
                  </InfoBox>
                ) : (
                  <Note>
                    <p className='text-sm text-gray-200'>
                      <strong>Note:</strong> {section.note}
                      {section.link && (
                        <>
                          {' '}
                          <Link
                            href={section.link.href}
                            className='text-accent-light hover:text-accent-light-hover'
                          >
                            {section.link.text}
                          </Link>
                          {section.linkSuffix && ` ${section.linkSuffix}`}
                        </>
                      )}
                    </p>
                  </Note>
                )}
              </>
            )}
          </div>
        ))}

        <h2>{typeSafety.title}</h2>

        <p>{typeSafety.description}</p>

        <CodeBlock
          language='typescript'
          code={typeSafety.code}
          className='mb-4'
        />

        <FeatureList
          title={nextSteps.title}
          items={nextSteps.items}
          variant='next-steps'
          headingLevel={2}
        />
      </div>
    </div>
  )
}
