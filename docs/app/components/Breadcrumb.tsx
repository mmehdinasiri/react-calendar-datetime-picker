'use client'

import React from 'react'

interface BreadcrumbProps {
  children: React.ReactNode
  className?: string
}

export function Breadcrumb({ children, className = '' }: BreadcrumbProps) {
  return (
    <div
      className={`mb-4 text-sm text-gray-400 uppercase tracking-wider ${className}`}
    >
      {children}
    </div>
  )
}

