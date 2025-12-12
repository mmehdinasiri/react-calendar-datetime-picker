import React from 'react'
import { TypeDefinition, Note, Important } from '.'

interface CategoryContentDisplayProps {
  categoryName: string
  source?: 'examples' | 'internationalization' | 'accessibility'
  internationalizationContent: Record<string, any>
  examplesContent: Record<string, any>
}

/**
 * Component that renders educational content for a category.
 * Content is pulled from examplesContent.ts file.
 *
 * Generic component for data-driven content rendering.
 * For special layouts (like Basic), use dedicated components.
 */
export const CategoryContentDisplay: React.FC<CategoryContentDisplayProps> = ({
  categoryName,
  source = 'examples',
  internationalizationContent,
  examplesContent
}) => {
  // Select content source
  const contentMap =
    source === 'internationalization' || source === 'accessibility'
      ? internationalizationContent
      : examplesContent
  const content = contentMap[categoryName]

  if (!content) {
    return null
  }

  // Render a single line with code snippets
  const renderLineWithCode = (text: string) => {
    return text.split('`').map((part, i) =>
      i % 2 === 1 ? (
        <code
          key={i}
          className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'
        >
          {part}
        </code>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <div className='mb-8 space-y-4'>
      {/* Intro paragraph */}
      {content.intro && (
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          {renderLineWithCode(content.intro)}
        </p>
      )}

      {/* Type definitions */}
      {content.typeDefinitions && content.typeDefinitions.length > 0 && (
        <>
          {content.typeDefinitions.map((definition: string, idx: number) => (
            <TypeDefinition
              key={idx}
              definition={definition}
              className={idx === 0 ? 'mb-4' : ''}
            />
          ))}
        </>
      )}

      {/* Detailed content */}
      {content.details && content.details.length > 0 && (
        <div className='text-gray-600 dark:text-gray-400'>
          {content.details.map(
            (detail: { title?: string; content: string }, idx: number) => (
              <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
                {detail.title && (
                  <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                    {detail.title}
                  </p>
                )}
                <div className='space-y-2'>
                  {detail.content
                    .split('\n')
                    .map((line: string, lineIdx: number) => {
                      const trimmed = line.trim()

                      if (!trimmed) return null

                      // Count leading spaces for indentation
                      const indentMatch = line.match(/^(\s*)/)
                      const indentLevel = indentMatch
                        ? indentMatch[1].length / 2
                        : 0

                      // Check if it's a bullet point
                      if (trimmed.startsWith('•')) {
                        const bulletContent = trimmed.substring(1).trim()

                        // Check if the bullet point has a property name pattern: "propertyName - description"
                        const propertyMatch =
                          bulletContent.match(/^(\w+)\s*-\s*(.+)$/)

                        if (propertyMatch) {
                          const [, propertyName, description] = propertyMatch
                          return (
                            <div
                              key={lineIdx}
                              className='ml-4 text-gray-600 dark:text-gray-400'
                              style={{
                                marginLeft: `${indentLevel * 1.5 + 1}rem`
                              }}
                            >
                              •{' '}
                              <strong className='text-gray-900 dark:text-gray-100'>
                                {propertyName}
                              </strong>{' '}
                              - {renderLineWithCode(description)}
                            </div>
                          )
                        }

                        return (
                          <div
                            key={lineIdx}
                            className='ml-4 text-gray-600 dark:text-gray-400'
                            style={{
                              marginLeft: `${indentLevel * 1.5 + 1}rem`
                            }}
                          >
                            • {renderLineWithCode(bulletContent)}
                          </div>
                        )
                      }

                      // Regular paragraph
                      return (
                        <p
                          key={lineIdx}
                          className='text-gray-600 dark:text-gray-400'
                          style={{ marginLeft: `${indentLevel * 1.5}rem` }}
                        >
                          {renderLineWithCode(trimmed)}
                        </p>
                      )
                    })}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Extra content */}
      {content.extraContent && <div>{content.extraContent}</div>}

      {/* Special note for Constraints category */}
      {categoryName === 'Constraints' && (
        <Note>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>Note:</strong> All date inputs are automatically normalized
            to{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              Day
            </code>{' '}
            objects based on the calendar system. Disabled dates are visually
            distinct and cannot be selected.
          </p>
        </Note>
      )}

      {/* Special note for Display Options category */}
      {categoryName === 'Display Options' && (
        <Note>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>Note:</strong> To customize the labels of preset range
            buttons, see{' '}
            <a
              href='/internationalization#preset-ranges'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              Internationalization - Preset Ranges
            </a>
            .
          </p>
        </Note>
      )}

      {/* Special note for Multiple Months category */}
      {categoryName === 'Multiple Months' && (
        <Note>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>Note:</strong> Multiple months are especially useful for
            range selection, as users can easily see and select dates across
            month boundaries.
          </p>
        </Note>
      )}

      {/* Important note for Time category */}
      {categoryName === 'Time' && (
        <Important>
          <p className='text-sm text-gray-700 dark:text-gray-200'>
            <strong>Important:</strong> The time values in the{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              Day
            </code>{' '}
            type are always stored in 24-hour format (0-23), regardless of the
            display format specified in{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              dateFormat
            </code>
            . When using 12-hour format tokens (
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              hh
            </code>{' '}
            with{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              A
            </code>{' '}
            or{' '}
            <code className='px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm'>
              a
            </code>
            ), the component automatically converts between 12-hour display and
            24-hour storage.
          </p>
        </Important>
      )}
    </div>
  )
}
