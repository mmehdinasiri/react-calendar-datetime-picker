'use client'

import React from 'react'

interface SectionHeaderProps {
  children: React.ReactNode
  level?: 1 | 2 | 3
  className?: string
}

const levelStyles = {
  1: 'text-4xl font-bold text-gray-900 dark:text-white mb-6',
  2: 'text-2xl font-bold text-gray-900 dark:text-white mb-2',
  3: 'text-xl font-semibold text-gray-900 dark:text-white mb-4'
}

export function SectionHeader({
  children,
  level = 2,
  className = ''
}: SectionHeaderProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'

  return React.createElement(
    Tag,
    { className: `${levelStyles[level]} ${className}` },
    children
  )
}

