'use client'

import '../../../src/styles/index.scss'
import { examples } from './examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { CategoryContentDisplay } from '../components/CategoryContentDisplay'
import { BasicCategoryContent } from './BasicCategoryContent'
import { examplesContent } from './examplesContent'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export default function Examples() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const exampleParam = searchParams.get('example')

  useEffect(() => {
    if (categoryParam && exampleParam) {
      // Scroll to the specific example after a brief delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        const elementId = `${toKebabCase(categoryParam)}-${exampleParam}`
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Highlight the element briefly
          element.classList.add('ring-2', 'ring-accent', 'ring-opacity-50')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-accent', 'ring-opacity-50')
          }, 2000)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [categoryParam, exampleParam])
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
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
                {groupName === 'Types' ? 'Calendar Modes' : groupName}
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
                {Object.entries(groupExamples).map(([exampleKey, config]) => (
                  <ExampleRenderer
                    key={exampleKey}
                    config={config}
                    exampleKey={exampleKey}
                    category={groupName}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
