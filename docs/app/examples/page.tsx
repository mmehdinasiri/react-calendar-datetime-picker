'use client'

import React from 'react'
import '../../../src/styles/index.scss'
import { examples } from './examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { CategoryContentDisplay } from '../components/CategoryContentDisplay'
import { BasicCategoryContent } from './BasicCategoryContent'
import { examplesContent } from './examplesContent'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { Note } from '../components/Note'
import Link from 'next/link'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

function ExamplesContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const exampleParam = searchParams.get('example')

  useEffect(() => {
    if (categoryParam && exampleParam) {
      // Scroll to the specific example after a brief delay to ensure DOM is rendered
      const scrollToElement = () => {
        const elementId = `${toKebabCase(categoryParam)}-${toKebabCase(exampleParam)}`
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Highlight the element briefly
          element.classList.add('ring-2', 'ring-accent', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-accent', 'ring-opacity-50')
          }, 2000)
          return true
        }
        return false
      }

      // Try immediately, then retry with increasing delays if element not found
      let attempts = 0
      const maxAttempts = 5
      const attemptScroll = () => {
        if (scrollToElement() || attempts >= maxAttempts) {
          return
        }
        attempts++
        setTimeout(attemptScroll, 200 * attempts)
      }

      // Initial delay to ensure DOM is rendered
      const timer = setTimeout(attemptScroll, 100)

      return () => clearTimeout(timer)
    }
  }, [categoryParam, exampleParam])
  return (
    <div className='max-w-6xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Features</h1>

        <p>
          Interactive examples demonstrating the features and capabilities of
          React Calendar DateTime Picker. All examples are live and interactive
          - you can interact with them to see how they work.
        </p>
      </div>

      <div className='space-y-16'>
        {Object.entries(examples)
          .filter(
            ([groupName]) =>
              groupName !== 'Locale' &&
              groupName !== 'Translation Customization' &&
              groupName !== 'Date Utilities' &&
              groupName !== 'Customization'
          )
          .map(([groupName, groupExamples]) => (
            <div key={groupName} id={toKebabCase(groupName)}>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
                {groupName === 'Types' ? 'Calendar Types' : groupName}
              </h2>
              {groupName === 'Basic' ? (
                <BasicCategoryContent />
              ) : (
                <CategoryContentDisplay
                  categoryName={groupName}
                  source='examples'
                  examplesContent={examplesContent}
                  internationalizationContent={{}}
                />
              )}
              <div className='space-y-8'>
                {Object.entries(groupExamples).map(
                  ([exampleKey, config], index, array) => (
                    <React.Fragment key={exampleKey}>
                      <ExampleRenderer
                        config={config}
                        exampleKey={exampleKey}
                        category={groupName}
                        showFullOutput={
                          groupName === 'Basic' ||
                          groupName === 'Callbacks' ||
                          groupName === 'Date Formatting' ||
                          (groupName === 'Locale' &&
                            exampleKey === 'PersianCalendar')
                        }
                      />
                      {groupName === 'Basic' &&
                        exampleKey === 'SingleDatePicker' && (
                          <Note>
                            <p className='text-sm text-gray-700 dark:text-gray-300'>
                              <strong>Note:</strong> If you want to have an
                              input field where users can type dates directly,
                              you can use the{' '}
                              <Link
                                href='/customization#custom-trigger-elements-inputwithicontrigger'
                                className='text-blue-600 dark:text-blue-400 hover:underline'
                              >
                                Input with Icon Trigger
                              </Link>{' '}
                              example in the Customization section.
                            </p>
                          </Note>
                        )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default function Examples() {
  return (
    <Suspense
      fallback={
        <div className='max-w-6xl mx-auto px-2 sm:px-6 py-12'>
          <div className='prose prose-lg max-w-none mb-12'>
            <h1>Features</h1>
            <p>Loading examples...</p>
          </div>
        </div>
      }
    >
      <ExamplesContent />
    </Suspense>
  )
}
