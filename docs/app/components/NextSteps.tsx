'use client'

import Link from 'next/link'

interface NextStep {
  href: string
  text: string
  description?: string
}

interface NextStepsProps {
  steps: NextStep[]
  className?: string
}

export function NextSteps({ steps, className = '' }: NextStepsProps) {
  return (
    <div className={className}>
      <h2>Next Steps</h2>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>
            <Link
              href={step.href}
              className='text-accent-light hover:text-accent-light-hover'
            >
              {step.text}
            </Link>
            {step.description && ` ${step.description}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
