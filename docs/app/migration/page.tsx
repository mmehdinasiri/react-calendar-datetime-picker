'use client'

import { CodeBlock, InfoBox, SectionHeader } from '../components'
import { migrationContent } from './migrationContent'

export default function MigrationGuide() {
  const {
    intro,
    quickMigration,
    breakingChanges,
    whatsNew,
    migrationExamples,
    enhancedInitValue,
    utilityFunctions,
    needHelp
  } = migrationContent

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>{intro.title}</h1>

        <p>{intro.description}</p>

        <InfoBox variant='warning'>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>Minimal Breaking Changes:</strong> {intro.warning}
          </p>
        </InfoBox>
      </div>

      <div className='space-y-12'>
        {/* Quick Migration */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {quickMigration.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {quickMigration.description}
            </p>
          </div>

          <div className='space-y-4'>
            {quickMigration.items.map((item, index) => (
              <div key={index} className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center w-8 h-8 bg-bg-tertiary border border-accent rounded-full'>
                    <span className='text-sm font-medium text-accent'>
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className='text-gray-700 dark:text-gray-300 mt-1'>
                      {item.description}
                    </p>
                  )}
                  {item.code && (
                    <CodeBlock
                      language='bash'
                      code={item.code}
                      customStyle={{
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        padding: '0.75rem'
                      }}
                      className='mt-2'
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Breaking Changes */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {breakingChanges.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {breakingChanges.description}
            </p>
          </div>

          <div className='space-y-6'>
            {breakingChanges.changes.map((change, index) => (
              <div
                key={index}
                className={`border-l-4 ${change.borderColor || 'border-accent'} bg-bg-tertiary p-4`}
              >
                <div className='flex'>
                  <div className='ml-3'>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                      {change.title}
                    </h3>
                    <p className='text-sm text-gray-700 dark:text-gray-200 mt-1'>
                      {change.description}
                    </p>
                    {change.codeExamples && (
                      <div className='mt-3 space-y-3'>
                        {change.codeExamples.map((example, exIndex) => (
                          <div key={exIndex}>
                            <code className='text-sm bg-bg-primary border border-orange-500 px-2 py-1 rounded text-gray-900 dark:text-gray-200'>
                              {example.old}
                            </code>
                            <span className='text-gray-700 dark:text-gray-300 mx-2'>
                              →
                            </span>
                            <code className='text-sm bg-bg-primary border border-accent px-2 py-1 rounded text-gray-900 dark:text-gray-200'>
                              {example.new}
                            </code>
                            {example.note && (
                              <span className='text-sm text-gray-700 dark:text-gray-300 ml-2'>
                                ({example.note})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {change.details && (
                      <div className='mt-3 space-y-2'>
                        {change.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className='text-sm'>
                            {detail.startsWith('`') ? (
                              <>
                                <code className='bg-bg-primary border border-accent px-2 py-1 rounded text-gray-900 dark:text-gray-200'>
                                  {detail.replace(/`/g, '')}
                                </code>
                                {detail.includes(' - ') && (
                                  <span className='text-gray-700 dark:text-gray-300'>
                                    {' '}
                                    - {detail.split(' - ')[1]}
                                  </span>
                                )}
                              </>
                            ) : (
                              <p className='text-sm text-gray-700 dark:text-gray-200'>
                                {detail}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's New in v2.x */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {whatsNew.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              {whatsNew.description}
            </p>
            <div className='text-center'>
              <a
                href={whatsNew.linkHref}
                className='inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white dark:text-white bg-accent hover:bg-accent-hover transition-colors'
              >
                {whatsNew.linkText}
              </a>
            </div>
          </div>
        </section>

        {/* Migration Examples */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {migrationExamples.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {migrationExamples.description}
            </p>
          </div>

          <div className='space-y-8'>
            {migrationExamples.examples.map((example, index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  {example.title}
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                      Before (v1.x)
                    </h4>
                    <CodeBlock
                      language='tsx'
                      code={example.beforeCode}
                      className={example.beforeClassName}
                    />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                      After (v2.x)
                    </h4>
                    <CodeBlock
                      language='tsx'
                      code={example.afterCode}
                      className={example.afterClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced initValue Support */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {enhancedInitValue.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {enhancedInitValue.description}
            </p>
          </div>

          <div className='space-y-8'>
            {enhancedInitValue.examples.map((example, index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  {example.title}
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                      Before (v1.x)
                    </h4>
                    <CodeBlock
                      language='tsx'
                      code={example.beforeCode}
                      className={example.beforeClassName}
                    />
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                      After (v2.x)
                    </h4>
                    <CodeBlock
                      language='tsx'
                      code={example.afterCode}
                      className={example.afterClassName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Utility Functions */}
        <section className='bg-bg-secondary rounded-lg border border-border p-8'>
          <div className='mb-6'>
            <SectionHeader className='text-gray-900 dark:text-white mb-2'>
              {utilityFunctions.title}
            </SectionHeader>
            <p className='text-gray-700 dark:text-gray-300'>
              {utilityFunctions.description}
            </p>
          </div>

          <div className='space-y-6'>
            {utilityFunctions.sections.map((section, index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  {section.title}
                </h3>
                {section.description && (
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    {section.description}
                  </p>
                )}
                {section.code && (
                  <CodeBlock language='typescript' code={section.code} />
                )}
                {section.items && (
                  <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.split('`').map((part, partIndex) =>
                          partIndex % 2 === 1 ? (
                            <code
                              key={partIndex}
                              className='px-1 py-0.5 bg-bg-primary border border-accent rounded text-sm text-gray-900 dark:text-gray-200'
                            >
                              {part}
                            </code>
                          ) : (
                            <span key={partIndex}>{part}</span>
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Need Help */}
        <section className='bg-bg-tertiary border border-border rounded-lg p-8'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              {needHelp.title}
            </h2>
            <p className='text-gray-700 dark:text-gray-300 mb-6'>
              {needHelp.description}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              {needHelp.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                    link.variant === 'primary'
                      ? 'border-transparent bg-accent hover:bg-accent-hover text-white'
                      : 'border-border bg-bg-secondary hover:bg-bg-tertiary text-gray-900 dark:text-white'
                  }`}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
