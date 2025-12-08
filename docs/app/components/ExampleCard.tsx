'use client'

import React from 'react'
import { CodeBlock } from './CodeBlock'

interface ExampleCardProps {
  id?: string
  title: string
  description?: string
  component: React.ReactNode
  code: string | React.ReactNode
  result?: React.ReactNode | string
  headerContent?: React.ReactNode
  footerContent?: React.ReactNode
  codeLanguage?: string
  codeLabel?: string
  resultLabel?: string
  componentLabel?: string
  className?: string
  wrapperClassName?: string
  layout?: 'grid' | 'vertical'
}

export function ExampleCard({
  id,
  title,
  description,
  component,
  code,
  result,
  headerContent,
  footerContent,
  codeLanguage = 'tsx',
  codeLabel = 'Code',
  resultLabel = 'Result',
  componentLabel = 'Component',
  className = '',
  wrapperClassName = 'calendar-container',
  layout = 'grid'
}: ExampleCardProps) {
  return (
    <section
      id={id}
      className={`bg-bg-secondary rounded-lg border border-border p-8 mb-8 ${className}`}
    >
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          {title}
        </h2>
        {description && (
          <p className='text-gray-700 dark:text-gray-300'>{description}</p>
        )}
        {headerContent && <div className='mt-4'>{headerContent}</div>}
      </div>

      <div
        className={
          layout === 'vertical'
            ? 'space-y-8'
            : 'grid grid-cols-1 lg:grid-cols-2 gap-8'
        }
      >
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            {componentLabel}
          </h3>
          <div className={wrapperClassName}>{component}</div>
        </div>

        <div>
          {codeLabel && (
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              {codeLabel}
            </h3>
          )}
          {typeof code === 'string' ? (
            <CodeBlock language={codeLanguage} code={code} className='mb-4' />
          ) : (
            <div className='mb-4'>{code}</div>
          )}
          {result && (
            <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
              <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                {resultLabel}
              </h4>
              {typeof result === 'string' ? (
                <p className='text-sm text-gray-700 dark:text-gray-200'>
                  Selected value: <code className='text-xs'>{result}</code>
                </p>
              ) : (
                <div className='text-sm text-gray-700 dark:text-gray-200'>
                  {result}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {footerContent && <div className='mt-6'>{footerContent}</div>}
    </section>
  )
}
