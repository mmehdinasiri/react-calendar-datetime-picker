'use client'

import { CodeBlock, Breadcrumb, FeatureList, Note } from '../components'
import { installationContent } from './installationContent'

export default function Installation() {
  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-6 py-12'>
      <div className='prose prose-lg max-w-none'>
        <Breadcrumb>GET STARTED &gt;</Breadcrumb>
        <h1>{installationContent.title}</h1>

        <p>{installationContent.intro}</p>

        <h2>{installationContent.packageManagers.title}</h2>

        <p>{installationContent.packageManagers.description}</p>

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.npm}
          className='mb-4'
        />

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.yarn}
          className='mb-4'
        />

        <CodeBlock
          language='bash'
          code={installationContent.packageManagers.commands.pnpm}
          className='mb-4'
        />

        <h2>{installationContent.importStyles.title}</h2>

        <p>{installationContent.importStyles.description}</p>

        <CodeBlock
          language='tsx'
          code={installationContent.importStyles.code}
          className='mb-4'
        />

        <Note>
          <p className='text-sm text-gray-200'>
            <strong>{installationContent.importStyles.note.title}</strong>{' '}
            {installationContent.importStyles.note.content}
          </p>
        </Note>

        <FeatureList
          title='Next Steps'
          items={installationContent.nextSteps}
          variant='next-steps'
          headingLevel={2}
        />
      </div>
    </div>
  )
}
