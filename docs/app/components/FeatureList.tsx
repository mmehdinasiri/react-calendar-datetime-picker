'use client'

import React from 'react'
import Link from 'next/link'

interface ListItem {
  text: string | React.ReactNode
  href?: string
  description?: string | React.ReactNode
}

interface FeatureListProps {
  title: string
  items: (string | React.ReactNode | ListItem)[]
  variant?: 'default' | 'info' | 'next-steps'
  className?: string
  headingLevel?: 2 | 3 | 4
}

export function FeatureList({
  title,
  items,
  variant = 'default',
  className = '',
  headingLevel = 4
}: FeatureListProps) {
  const HeadingTag = `h${headingLevel}` as 'h2' | 'h3' | 'h4'

  const variantStyles = {
    default: 'bg-bg-secondary rounded-lg border border-border p-4',
    info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4',
    'next-steps': ''
  }

  const headingStyles = {
    default: 'text-gray-900 dark:text-white font-semibold mb-2',
    info: 'text-blue-900 dark:text-blue-100 font-semibold mb-2',
    'next-steps': 'text-gray-900 dark:text-white mb-2'
  }

  const listStyles = {
    default: 'text-gray-700 dark:text-gray-300 text-sm space-y-1',
    info: 'text-blue-800 dark:text-blue-200 text-sm space-y-1',
    'next-steps': 'text-gray-700 dark:text-gray-300 space-y-1'
  }

  const renderItem = (
    item: string | React.ReactNode | ListItem,
    index: number
  ) => {
    if (typeof item === 'string') {
      return <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
    }

    if (React.isValidElement(item)) {
      return <li key={index}>{item}</li>
    }

    const listItem = item as ListItem
    const { text, href, description } = listItem

    if (href) {
      return (
        <li key={index}>
          <Link
            href={href}
            className='text-accent-light hover:text-accent-light-hover'
          >
            {text}
          </Link>
          {description && (
            <>
              {' '}
              {typeof description === 'string' ? (
                <span dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                description
              )}
            </>
          )}
        </li>
      )
    }

    return (
      <li key={index}>
        {typeof text === 'string' ? (
          <span dangerouslySetInnerHTML={{ __html: text }} />
        ) : (
          text
        )}
        {description && (
          <>
            {' '}
            {typeof description === 'string' ? (
              <span dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              description
            )}
          </>
        )}
      </li>
    )
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <HeadingTag className={headingStyles[variant]}>{title}</HeadingTag>
      <ul className={listStyles[variant]}>{items.map(renderItem)}</ul>
    </div>
  )
}

