'use client'

import React, { useState } from 'react'
import { CodeBlock } from '../components'
import { FeatureList } from '../components'
import type { CustomizationExampleConfig } from './customizationConfig'
import { SectionHeader } from '../components'

interface CustomExampleRendererProps {
  config: CustomizationExampleConfig
  exampleKey: string
  category?: string
  resultValue?: any
  onResultValueChange?: (value: any) => void
}

export const CustomExampleRenderer: React.FC<CustomExampleRendererProps> = ({
  config,
  exampleKey,
  category,
  resultValue,
  onResultValueChange
}) => {
  // Helper function to convert example key to URL-friendly format
  const toKebabCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

  // For code-only examples
  if (config.codeOnly) {
    return (
      <div>
        <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
          {config.title}
        </h4>
        <CodeBlock language='tsx' code={config.customCode || ''} />
      </div>
    )
  }

  // For custom component examples
  if (config.customComponent) {
    const CustomComponent = config.customComponent
    const [localResultValue, setLocalResultValue] = useState<any>(null)

    const handleChange = (value: any) => {
      setLocalResultValue(value)
      onResultValueChange?.(value)
    }

    return (
      <section
        id={
          category
            ? `${toKebabCase(category)}-${toKebabCase(exampleKey)}`
            : toKebabCase(exampleKey)
        }
        className='mb-8'
      >
        <div className='mb-6'>
          <SectionHeader>{config.title}</SectionHeader>
          {config.description && (
            <p className='text-gray-700 dark:text-gray-300'>
              {config.description}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Component
            </h3>
            <div className={config.wrapper || 'calendar-container'}>
              <CustomComponent
                {...(config.customComponentProps || {})}
                onChange={handleChange}
              />
            </div>
            {config.featureList && (
              <div className='mt-4'>
                <FeatureList
                  title={config.featureList.title}
                  items={config.featureList.items}
                  variant={config.featureList.variant || 'info'}
                />
              </div>
            )}
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Code
            </h3>
            <CodeBlock
              language='tsx'
              code={config.customCode || ''}
              className='mb-4'
            />
            {config.cssCode && (
              <>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-4'>
                  CSS Styles
                </h3>
                <CodeBlock
                  language='css'
                  code={config.cssCode}
                  className='mb-4'
                />
              </>
            )}
            {(localResultValue !== null || resultValue !== null) && (
              <div className='mt-4 p-4 bg-bg-tertiary rounded-lg'>
                <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                  Result
                </h4>
                <p className='text-sm text-gray-700 dark:text-gray-200'>
                  Selected value:{' '}
                  <code className='text-xs'>
                    {JSON.stringify(
                      localResultValue || resultValue || null,
                      null,
                      2
                    )}
                  </code>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // For CSS examples with both TSX and CSS code - these need ExampleRenderer for component
  // This case is handled separately in the page

  // Fallback to standard rendering (shouldn't happen, but just in case)
  return null
}
