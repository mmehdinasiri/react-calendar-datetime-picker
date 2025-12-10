'use client'

import '../../../src/styles/index.scss'
import { examples } from '../examples/examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { LocaleContent } from './LocaleContent'
import { TranslationCustomizationContent } from './TranslationCustomizationContent'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

export default function Internationalization() {
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

  const internationalizationGroups = Object.entries(examples).filter(
    ([groupName]) =>
      groupName === 'Locale' || groupName === 'Translation Customization'
  )

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Internationalization</h1>
        <p>
          React Calendar DateTime Picker supports multiple locales and allows
          you to customize translations to match your application's
          requirements. This page covers locale support and translation
          customization options.
        </p>
      </div>

      <div className='space-y-16'>
        {internationalizationGroups.map(([groupName, groupExamples]) => (
          <div key={groupName} id={toKebabCase(groupName)}>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
              {groupName === 'Locale' ? 'Locales' : groupName}
            </h2>
            {groupName === 'Locale' && <LocaleContent />}
            {groupName === 'Translation Customization' && (
              <TranslationCustomizationContent />
            )}
            <div className='space-y-8'>
              {Object.entries(groupExamples).map(([exampleKey, config]) => (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                  category={groupName}
                  showFullOutput={
                    groupName === 'Locale' && exampleKey === 'PersianCalendar'
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
