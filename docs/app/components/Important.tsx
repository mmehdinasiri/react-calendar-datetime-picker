'use client'

import React from 'react'
import { InfoBox } from './InfoBox'

interface ImportantProps {
  children: React.ReactNode
  className?: string
}

export function Important({ children, className = '' }: ImportantProps) {
  return (
    <InfoBox variant='important' className={className}>
      {children}
    </InfoBox>
  )
}
