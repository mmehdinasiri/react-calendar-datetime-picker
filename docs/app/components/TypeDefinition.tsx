'use client'

import { CodeBlock } from './CodeBlock'

interface TypeDefinitionProps {
  definition: string
  language?: string
  className?: string
}

export function TypeDefinition({
  definition,
  language = 'typescript',
  className = ''
}: TypeDefinitionProps) {
  return (
    <div className={className}>
      <p className='font-semibold mb-2 text-gray-900 dark:text-gray-100'>
        Type Definition:
      </p>
      <CodeBlock language={language} code={definition} />
    </div>
  )
}
