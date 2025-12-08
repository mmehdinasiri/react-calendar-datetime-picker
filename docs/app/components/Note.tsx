'use client'

import React from 'react'
import { InfoBox } from './InfoBox'

interface NoteProps {
  children: React.ReactNode
  className?: string
}

export function Note({ children, className = '' }: NoteProps) {
  return (
    <InfoBox variant='info' className={className}>
      {children}
    </InfoBox>
  )
}
