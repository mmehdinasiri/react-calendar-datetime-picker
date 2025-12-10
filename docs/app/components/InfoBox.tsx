'use client'

import React from 'react'

interface InfoBoxProps {
  children: React.ReactNode
  variant?: 'info' | 'warning' | 'tip' | 'important'
  className?: string
}

const variantStyles = {
  info: 'border-accent',
  warning: 'border-yellow-500',
  tip: 'border-accent',
  important: 'border-yellow-500'
}

export function InfoBox({
  children,
  variant = 'info',
  className = ''
}: InfoBoxProps) {
  return (
    <div
      className={`bg-bg-tertiary border-l-4 ${variantStyles[variant]} p-4 my-6 ${className}`}
    >
      <div className='flex'>
        <div className='ml-3'>{children}</div>
      </div>
    </div>
  )
}
