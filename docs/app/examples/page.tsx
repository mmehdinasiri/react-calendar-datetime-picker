'use client'

import '../../../src/styles/index.scss'
import { examples } from '../examplesConfig'
import { ExampleRenderer } from '../components/ExampleRenderer'

// Helper function to convert string to kebab case for IDs
const toKebabCase = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

export default function Examples() {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='prose prose-lg max-w-none mb-12'>
        <h1>Examples</h1>

        <p>
          Interactive examples demonstrating the features and capabilities of
          React Calendar DateTime Picker. All examples are live and interactive -
          you can interact with them to see how they work.
        </p>
      </div>

      <div className='space-y-16'>
        {Object.entries(examples).map(([groupName, groupExamples]) => (
          <div key={groupName} id={toKebabCase(groupName)}>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-border'>
              {groupName}
            </h2>
            <div className='space-y-8'>
              {Object.entries(groupExamples).map(([exampleKey, config]) => (
                <ExampleRenderer
                  key={exampleKey}
                  config={config}
                  exampleKey={exampleKey}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
