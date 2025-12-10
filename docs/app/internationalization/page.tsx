'use client'

import '../../../src/styles/index.scss'
import { examples } from '../examples/examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'
import { TranslationCustomizationContent } from './TranslationCustomizationContent'
import { CodeBlock } from '../components'
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

      {/* Locales Section */}
      <section className='bg-bg-secondary rounded-lg border border-border p-8 mb-12'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
            Locales
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            A locale determines the language and regional settings for the
            calendar component. When you set the <code>locale</code> prop, the
            calendar automatically adapts all UI text, including month names,
            weekday names, button labels, and number formatting to match the
            selected language. Each locale also configures the text direction
            (LTR or RTL) and number system (Latin or Persian numerals).
          </p>
          <div className='mt-4 mb-4'>
            <CodeBlock
              language='typescript'
              code={`type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'`}
            />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
            Supported Locales
          </h3>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            The calendar supports multiple locales out of the box:
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div className='bg-bg-tertiary rounded-lg p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                English (en) - Default
              </h4>
              <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                <li>• Latin numbers</li>
                <li>• Left-to-right (LTR)</li>
                <li>• English month/weekday names</li>
              </ul>
            </div>
            <div className='bg-bg-tertiary rounded-lg p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Persian/Farsi (fa)
              </h4>
              <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                <li>• Persian numbers</li>
                <li>• Right-to-left (RTL)</li>
                <li>• Persian month/weekday names</li>
              </ul>
            </div>
            <div className='bg-bg-tertiary rounded-lg p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                German (de)
              </h4>
              <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                <li>• Latin numbers</li>
                <li>• Left-to-right (LTR)</li>
                <li>• German month/weekday names</li>
              </ul>
            </div>
            <div className='bg-bg-tertiary rounded-lg p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Spanish (es)
              </h4>
              <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                <li>• Latin numbers</li>
                <li>• Left-to-right (LTR)</li>
                <li>• Spanish month/weekday names</li>
              </ul>
            </div>
            <div className='bg-bg-tertiary rounded-lg p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                French (fr)
              </h4>
              <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
                <li>• Latin numbers</li>
                <li>• Left-to-right (LTR)</li>
                <li>• French month/weekday names</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className='space-y-16'>
        {internationalizationGroups.map(([groupName, groupExamples]) => (
          <div key={groupName} id={toKebabCase(groupName)}>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
              {groupName === 'Locale' ? 'Locales' : groupName}
            </h2>
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
